'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, upload, makedir, SendMail } = require('../../middlewares/middlewares');
const { User, Service, Company, ConsultingApplication, ServiceApplication, ServiceSurvey,
    ConsultingResult, ServiceApplicationConfirm, ServiceElement, ServiceElementAttempt, ServiceCategory,
    EquipmentCategory, EquipmentElement,
    MaterialItem, MaterialUsage, AttachedFile } = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { FindMaterialItem, AddMaterialUsage, UpdateMaterialUsage, AddServiceElementAttempt, 
    AddEquipAndMaterialUsage, RemoveEquipAndMaterialUsage} = require('../../middlewares/dbapi');
const service = require('../../models/service');
const service_category = require('../../models/service_category');
const { raw } = require('body-parser');

const router = express.Router();

async function InsertFileInfo(user_no, service_no, files, added_position, service_element_no) {
    const word = {
        CA: 'ca_',
        CR: 'cr_',
        SA: 'sa_',
        SC: 'sc_',
        SE: 'se_',
    };

    const filepath = 'upload/' + service_no;
    if (files.length > 0) {
        makedir(filepath);
    }
   
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const ext = path.extname(file.originalname);
        const filename = 'u'+user_no + 's' + service_no + word[added_position] + file.filename + ext;
            fs.renameSync(file.path, filepath + '/' + filename, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
        });

        let inputResult;
        try {
            inputResult = await AttachedFile.create({
                service_no,
                added_position,
                original_name: file.originalname,
                name: filename,
                type: file.mimetype,
                path: filepath,
                filesize: file.size,
                service_element_no,
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return true;
}

async function SelectFileInfo(service_no, added_position) {
    let files;

    try {
        files = await AttachedFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                service_no,
                added_position,
            }
        });
    } catch (error) {
        console.error(error);
        return null;
        //return res.status(errorCode.internalServerError).json({});
    }

    return files;
}

async function UpdateStatus(user_no, service_no, progress, status, check_user_no) {
    let upResult;

    let where = { service_no, }
    if (check_user_no) { where.user_no }
    try {
        upResult = await Service.update({
            updated_user_no: user_no,
            progress,
            status
        }, {
            where
        });
    } catch (error) {
        console.error(error);
        return false;
        /*
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: '이미 등록된 내용입니다.'
            })
        } else {
            console.error(error);
            return false;
        }
        */
    }

    return true; 
};


router.post('/:service_no/running', verifyToken, async (req, res, next) => {
    const body = req.body;
    const user_no = req.decoded.user_no;
    const service_no = req.params.service_no;
    const authority_level = req.decoded.authority_level;

    let service_element_no = Number(body.service_element_no);
    if (service_element_no > 0) {
        // 1.1 내용 수정
        let updateResult;
        try {
            updateResult = await ServiceElement.update({
                start_date: body.start_date,
                end_date: body.end_date,
                support_content: body.support_content,
                support_result: body.support_result,
                updated_user_no: user_no,
            }, {
                where: { service_element_no },
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    } else {
        // 2.1 신규생성 service element
        let inputResult;
        try {
            inputResult = await ServiceElement.create({
                service_no,
                service_category_no: body.service_category_no,
                start_date: body.start_date,
                end_date: body.end_date,
                support_content: body.support_content,
                support_result: body.support_result,
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }

        if (!(inputResult instanceof ServiceElement)) {
            return res.status(errorCode.internalServerError).json({});
        }

        service_element_no = inputResult.dataValues.service_element_no;
    }

    // 2.2 n차시도 등록
    const attempt_data = body.service_element_attempts;
    if (attempt_data && service_element_no > 0) {
        for (let i = 0; i < attempt_data.length; i++) {
            const attemptResult = await AddServiceElementAttempt(user_no, service_element_no, attempt_data[i]);
            if (!attemptResult) {
                return res.status(errorCode.internalServerError).json({});
            }

            // 2.3 n차시도 안에 장비/재료사용 등록
            const service_element_attempt_no = attemptResult;
            const equip_data = attempt_data[i].material_usages;
            if (equip_data) {
                for (let j = 0; j < equip_data.length; j++) {
                    if (equip_data[j].equipment_category_no > 0) {
                        const emResult = await AddEquipAndMaterialUsage(user_no, service_element_attempt_no, 'USE', equip_data[j]);
                        if (emResult !== errorCode.ok) {
                            return res.status(errorCode.internalServerError).json({});
                        }
                    } else {
                        if (equip_data[j].material_usage_no > 0) {
                            const result = await RemoveEquipAndMaterialUsage(user_no, equip_data[j].material_usage_no);
                            if (result !== errorCode.ok) {
                                return res.status(errorCode.internalServerError).json({});
                            }
                        }
                    }
                }
            }
        }
    }
    
    res.status(errorCode.ok).json({ service_element_no });
});
router.delete('/:service_no/dropitem', verifyToken, async (req, res, next) => {
    const service_no  = req.params.service_no;

    let deleteservice;
    try{
          deleteservice = await Service.destroy({
           where:{service_no:service_no},
       })
    }
    catch (error) {
        console.error(error);
    } 
   res.status(errorCode.ok).json({deleteservice});
})
router.post('/:service_no/element/:element_no/files', verifyToken, upload.array('files'), async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let service_element_no = req.params.element_no;
    let authority_level = req.decoded.authority_level;

    // 첨부파일
    //console.log('service_element_no =', service_element_no);
    //console.log('files len =', req.files.length);
    if (service_element_no && req.files.length > 0) {
        if (!await InsertFileInfo(user_no, service_no, req.files, 'SE', service_element_no)) {
            return res.status(errorCode.internalServerError).json({
                message: '파일정보 등록 실패'
            });
        }
    }

    res.status(errorCode.ok).json({});
});

/* 
 * GET : /service
 * 기능설명 : 서비스 항목 전체 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.26
 */

router.get('/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.decoded.service_no;
    let authority_level = req.decoded.authority_level;
    let decode = req.decoded;
    /*
    const offset = (req.query.offset === undefined) ? 0 : Number(req.query.offset);
     */
    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 20 : Number(req.query.limit);
    const company = (req.query.company === undefined) ? 0 : Number(req.query.company);
    const startDate = req.query.sdate ? new Date(req.query.sdate) : undefined;
    const endDate = req.query.edate ? new Date(req.query.edate) : undefined;

 
    Service.hasOne(ServiceApplication, { foreignKey: 'service_no', sourceKey: 'service_no' });
    ServiceCategory.hasOne(Company, { foreignKey: 'company_no', sourceKey: 'company_no' });
   //필터링 쿼리
   ServiceApplication.hasOne(User,{ foreignKey: 'service_no', sourceKey:'service_no'});
    ServiceApplication.hasOne(Service, { foreignKey: 'service_no', sourceKey: 'service_no' });
    ServiceApplication.hasOne(ServiceCategory, { foreignKey: 'service_category_no', sourceKey: 'service_categories_no' });
    let servicen;
    let categoryNumQuery = {
        attributes: ['service_category_no'],
        order: [
            ['created_at', 'DESC'],
        ],
        where: {
            company_no: company
        },

        raw: true,
    }
    let categoryNumber;
    try {
        categoryNumber = await ServiceCategory.findAll(categoryNumQuery)
        categoryNumber = categoryNumber.map(i => i.service_category_no)

    }
    catch (error) {
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    try {
        servicen = await ServiceApplication.findAll({
            attributes: ['service_no'],
            where: {
                service_categories_no: { [Op.or]: categoryNumber }
            },
            required: false,
            order: [
                ['created_at', 'DESC']
            ],
            raw: true
        })
        servicen = servicen.map(i => i.service_no)
    } catch (error) {
        console.error(error); return res.status(errorCode.internalServerError).json({});
    }
    let query = {
        attributes: [[Service.sequelize.fn('count', '*'), 'count']],
    }


    if (startDate && endDate) {
        endDate.setDate(endDate.getDate() + 1);
        endDate.setMilliseconds(endDate.getMilliseconds() - 1);

        if (startDate > endDate) {
            return res.status(errorCode.badRequest).json({});
        }

        query.where = { created_at: { [Op.between]: [startDate, endDate] } }
    }
    if (company > 1) {
        query.where = {
            ...query.where,
            service_no: { [Op.or]: [servicen] }
        };

    }
    if (req.query.step) {
        const progress = 'STEP_0' + req.query.step;
        query.where = {
            ...query.where,
            progress,
        };
    }

    if (authority_level < authLevel.partner) {
        query.where = {
            ...query.where,
            user_no,
        };
    }

    let findResult;
    try {
        findResult = await Service.findAll(query);

    } catch (error) {
        console.error(error); return res.status(errorCode.internalServerError).json({});
    }

    let total_count = findResult[0].dataValues.count;

    if (total_count <= 0) {
        return res.status(errorCode.ok).json({
            total_count: 0,
            total_page: 0,
            current_page: 0,
            offset: 0,
            limit,
            categories: [],
            items: [],
        });
    }



    let total_page = Math.ceil(total_count / limit);

    let offset = ((page > total_page ? total_page : page) - 1) * limit;

    ServiceApplication.hasOne(Service, { foreignKey: 'service_no', sourceKey: 'service_no' });





    if (query.where) { categoryNumQuery.where = query.where; }
    if (query.include) { categoryNumQuery.include.push(query.include); }
   
    
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ServiceApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    let itemsQuery = {
        attributes: ['service_no', 'user_no', 'title', 'progress', 'status', 'created_at', 'updated_at'],
        include: [{
            model: User, 
            attributes: ['name'],
            required:false   // left outer join
        },{
            model: ServiceApplication, 
            attributes: ['service_categories_no'],
            required:false   // left outer join
        }],
 
        order: [
            ['created_at', 'DESC'],
        ],
        offset: offset,
        limit: limit,
        raw: true,

    }
  
    if (query.where) { itemsQuery.where = query.where; }
    if (query.include) { itemsQuery.include.push(query.include); }
   
    let items;
  
    try {
        items = await Service.findAll(itemsQuery);
    } catch (error) {
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }

    for (let i = 0; i < items.length; i++) {
        items[i]['username'] = items[i]['user.name'];
        delete items[i]['user.name'];
    }
    for (let i = 0; i < items.length; i++) {
        items[i]['category'] = items[i]['service_application.service_categories_no'];
        delete items[i]['service_application.service_categories_no'];
    }
   
    
    let result = {
        total_count,
        total_page,
        current_page: offset/limit+1,
        offset,
        limit, items, }
        
    return res.status(errorCode.ok).json(result);
   
});


/* 
 * GET : /service/:service_no
 * 기능설명 : 서비스 항목 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.26
 */
router.get('/:service_no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;

    let query = {
        attributes: ['service_no', 'user_no', 'title', 'consulting_flag', 'progress', 'status', 'created_at', 'updated_at'],
    }

    /*
    if (user_no && authority_level && authority_level == 1) {
       query.where = { user_no }; 
    }
    */
    //console.log(query);
    let result;
    try {
        result = await Service.findOne(query);
        //console.log(result);
    } catch (error) {
        console.error(error);
    }

    return res.json(result);
});

/* 
 * PUT : /service/:service_no/satus
 * 기능설명 : 서비스 상태 변경
 * 작성자 : 이승민
 * 작성일 : 2020.05.26
 */
router.put('/:service_no/status', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;

    let updateQuery = {
        progress: body.progress,
        status: body.status,
        updated_user_no: user_no
    }

    try {
        let result = await Service.update(updateQuery, {
            where: { service_no },
        });

        if (!result || result == 0) {
            return res.status(400).json({
                code: 400,
                message: "실패"
            });
        }
        //console.log(result);
        return res.json({
            code: 200,
            message: "성공"
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/* 
 * POST : /consulting
 * 기능설명 : 서비스 상담 신청
 * 작성자 : 이승민
 * 작성일 : 2020.05.26
 */
router.post('/consulting', verifyToken, upload.array('files'), async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    //let authority_level = req.decoded.authority_level;

    if (user_no === undefined || user_no < 1) {
        return res.status(errorCode.notAcceptable).json({});
    }

    if (!body.title || !body.content /*|| !body.reservation*/) {
        return res.status(errorCode.badRequest).json({});
    }

    /*
    User.hasMany(Service, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ConsultingApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    Service.hasOne(ServiceApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    Service.hasOne(ServiceApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    Service.hasOne(ServiceSurvey, {foreignKey: 'service_no', sourceKey: 'service_no'});
    Service.hasMany(ServiceElement, {foreignKey: 'service_no', sourceKey: 'service_no'});
    ConsultingApplication.hasOne(ConsultingApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    */

    let inputResult;
    try {
        inputResult = await Service.create({
            user_no,
            title: body.title,
            consulting_flag: 'Y',
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
    }

    if (!(inputResult instanceof Service)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 생성 실패'
        });
    }

 //   console.log(body);

    const service_no = inputResult.dataValues.service_no;
    try {
        inputResult = await ConsultingApplication.create({
            service_no,
            content: body.content,
            attached_file_flag: (req.files.length > 0) ? 'Y' : 'N',
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
    }

    if (!(inputResult instanceof ConsultingApplication)) {
        return res.status(errorCode.internalServerError).json({
            message: '상담신청서 생성 실패'
        });
    }

    if (req.files.length > 0) {
        InsertFileInfo(user_no, service_no, req.files, 'CA');
    }

    //---- email
    let find_email;
    try {
        find_email = await User.findAll({
            attributes: ['email'],
            where: { authority_level: { [Op.between]: [authLevel.scheduler, authLevel.manager] } }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let find_user;
    try {
        find_user = await User.findOne({
            attributes: ['name'],
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_email.length > 0) {
        let email = [];
        for (let i = 0; i < find_email.length; i++) {
            email.push(find_email[i].dataValues.email);
        }

        SendMail(email,
            '상담신청 예약 안내', 
            find_user.name + '님께서 [ ' + body.title + ' ](으)로 상담신청을 예약하였습니다.\n');
            //'희망 예약일시 [ ' + body.reservation + ' ]');
    }

    res.status(errorCode.ok).json({});
});

/* 
 * POST : /no_consulting
 * 기능설명 : 서비스 상담 없이 서비스 생성 진행
 * 작성자 : 이승민
 * 작성일 : 2020.05.26
 */
router.post('/no_consulting', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    //let authority_level = req.decoded.authority_level;

    if (user_no === undefined || user_no < 1) {
        return res.status(errorCode.notAcceptable).json({});
    }

    if (!body.title) {
        return res.status(errorCode.badRequest).json({});
    }

    let result;
    try {
        result = await Service.create({
            user_no,
            title: body.title,
            consulting_flag: 'N',
            progress: 'STEP_02',
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
    }

    if (!(result instanceof Service)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 생성 실패'
        });
    }

    const service_no = result.dataValues.service_no;
    try {
        result = await ServiceApplication.create({
            service_no,
            service_categories_no: body.service_categories_no,
            product_name: body.product_name,
            content: body.content,
            business_plan: body.business_plan,
            requirement: body.requirement,
            created_user_no: user_no,
            updated_user_no: user_no,
            memo:body.memo,
        });

    } catch (error) {
        console.error(error);
    }

    if (!(result instanceof ServiceApplication)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 신청서 생성 실패'
        });
    }

    //---- email
    let find_category;
    let find_partner;
    if (body.service_categories_no) {
        const split = body.service_categories_no.split(',');
        try {
            find_category = await ServiceCategory.findAll({
                attributes: ['company_no'],
                where: {
                    service_category_no : split,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    if (find_category && find_category.length > 0) {
        let company_no = [];
        for (let i = 0; i < find_category.length; i++) {
            company_no.push(find_category[i].dataValues.company_no);
        }

        company_no = [...new Set(company_no)];
        if (company_no.length > 0) {
            try {
                find_partner = await User.findAll({
                    attributes: ['email'],
                    where: { company_no : company_no }
                });
            } catch (error) {
                console.error(error);
                return res.status(errorCode.internalServerError).json({});
            }
        }
    }

    let find_manager;
    try {
        find_manager = await User.findAll({
            attributes: ['email'],
            where: { authority_level: authLevel.manager }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let find_user;
    try {
        find_user = await User.findOne({
            attributes: ['name'],
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let user_name = find_user ? find_user.dataValues.name : 'Unknown';

    if (find_manager.length > 0 || find_partner > 0) {
        let email = [];
        for (let i = 0; i < find_manager.length; i++) {
            email.push(find_manager[i].dataValues.email);
        }

        for (let i = 0; i < find_partner.length; i++) {
            email.push(find_partner[i].dataValues.email);
        }

        email = [...new Set(email)];
        SendMail(email,
            '신규 서비스 신청 안내', 
            user_name + '님께서 [ ' + body.title + ' ]에 대해 서비스 신청을 하였습니다.\n' +
            '자세한 내용은 홈페이지를 통해 확인할 수 있습니다.');
    }

    res.status(errorCode.ok).json({
        service_no,
    });
});



/* 
 * GET : /service/:service_no/counsulting/
 * 기능설명 : 서비스 상담 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.27
 */

router.get('/:service_no/consulting', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    //User.hasMany(Service, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    //Service.hasOne(ConsultingApplication, {foreignKey: 'service_no', sourceKey: 'service_no', as: 'consulting'});
    Service.hasOne(ConsultingApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});

    let query = {
        attributes: ['service_no', 'user_no', 'title', 'progress', 'status', 'created_at', 'updated_at'],
        include: [{
                model: User, 
                attributes: ['name', 'email', 'company_no', 'phone_number', 'company_position'],
                required:false   // left outer join
            },{
                model: ConsultingApplication, 
                attributes: ['content', 'attached_file_flag'],
                //as: 'consulting',
                required:false   // left outer join
            }],
        order: [
            ['created_at', 'DESC'],
        ],
        //raw: true
    }

    if (user_no && authority_level && authority_level == 1) {
        query.where = { user_no, service_no };
    } else {
        query.where = { service_no };
    }

    let find;
    try {
        //find = await Service.findAll(query);
        find = await Service.findOne(query);
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const item = find.dataValues;
    let co_name;
    let co_reg;
    let co_business;
    let co_address;
    if (item.user.company_no != null) {
        let company
        try {
            company = await Company.findOne({
                attributes: ['name', 'registration_number', 'business_field', 'address', 'address_detail'],
                where: { company_no : item.user.company_no }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }

        co_name = company.dataValues.name;
        co_reg  = company.dataValues.registration_number;
        co_business = company.dataValues.business_field;
        co_address = company.dataValues.address + ', ' + company.dataValues.address_detail;
    }

    let files;
    if (item.consulting_application && item.consulting_application.attached_file_flag == 'Y') {
        files = await SelectFileInfo(service_no, 'CA');
        if (!files) {
            return res.status(errorCode.internalServerError).json({});
        }
    }

    /* 신청서 게시물을 읽으면 자동으로 진행중 상태로 변경하는 것 삭제
     * 2021-02-25
     * by minx
    if (item.progress == 'STEP_01' && item.status == 'URD') {
        if (!await UpdateStatus(user_no, service_no, 'STEP_01', 'RUN')) {
            return res.status(errorCode.internalServerError).json({
                message: '서비스 상태 업데이트 실패'
            });
        }
    }
    */

    return res.status(errorCode.ok).json({
        service_no,
        progress: item.progress,
        status: item.status,
        name: item.user.name,
        email: item.user.email,
        phone_number: item.user.phone_number,
        co_position: item.user.company_position,
        co_name,
        co_reg,
        co_business,
        co_address,
        title: item.title,
        created_at: item.created_at,
        updated_at: item.updated_at,
        content: item.consulting_application ? item.consulting_application.content : '',
        attached_file_flag : item.consulting_application ? item.consulting_application.attached_file_flag : 'N',
        attached_file: files
    });
});

/* 
 * PUT : /service/:service_no/consulting
 * 기능설명 : 신청서 수정
 * 작성자 : 이승민
 * 작성일 : 2021.11.23
 */
router.put('/:service_no/consulting', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    let find;
    try {
        find = await Service.findOne({
            attributes: ['service_no', 'user_no', 'title', 'progress', 'status', 'created_at', 'updated_at'],
            where: (user_no && authority_level && authority_level == 1) ? { user_no, service_no } : { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const item = find.dataValues;
    if (item.progress !== 'STEP_01' || item.status !== 'URD') {
        return res.status(errorCode.badRequest).json({});
    }

  
    if (body.title) {
        try {
            let result = await Service.update({
                title: body.title,
                updated_user_no: user_no
            }, {
                where: { service_no },
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    if (body.content) {
        try {
            let result = await ConsultingApplication.update({
                content: body.content,
                updated_user_no: user_no
            }, {
                where: { service_no },
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    return res.status(errorCode.ok).json({});

});

router.post('/:service_no/consulting/files', verifyToken, upload.array('files'), async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;

    // 첨부파일
    //console.log('service_element_no =', service_element_no);
    //console.log('files len =', req.files.length);
    if (req.files.length > 0) {
        if (!await InsertFileInfo(user_no, service_no, req.files, 'CA')) {
            return res.status(errorCode.internalServerError).json({
                message: '파일정보 등록 실패'
            });
        }
    }

    res.status(errorCode.ok).json({});
});
/* put:
   기능설명: 서비스 신청서 메모
   작성일 : 2022.02.28
*/
router.put('/:service_no/memo', async (req, res, next) => {
    const { memo, service_categories_no, product_name, content, business_plan } = req.body;
    // let user_no = req.decoded.user_no;
    // let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    try {
        memo = await ServiceApplication.update({
            memo,
            service_categories_no,
            product_name,
            content,
            business_plan,
        },
        {
          where: { service_no }
        })
        return res.send(memo);
    } catch (error) {
        console.log(error);
    }
    res.status(errorCode.ok).json({});
});
/*router.put('/:service_no/memo',async(req,res,next)=>{
 console.log(req.body);
 let body = req.body;
    let service_no = req.params.service_no;
    let memo;
    try{
        memo = ServiceApplication.update({
           memo:req.body.memo,
           where:{service_no}
           
    })
    const result = await res.send(memo);
}
    catch(error){
    console.log(error);
}
});*/

router.get('/:service_no/memolize',async(req,res,next)=>{
    //let body = req.body;
   // let user_no = req.decoded.user_no;
    //let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;
    let memo_list;
    try{
       memo_list= await ServiceApplication.findOne({
            attributes:['memo'],
            where:{ service_no },
        })
       
    }catch(error){
        console.log(error);
    }
    return res.json(memo_list);
});
/* POST:
 * 기능설명 : 컨설팅 예약 확인
 * 작성자 : 이승민
 * 작성일 : 2021.02.25
 */
router.post('/:service_no/consulting/reserv', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ConsultingApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    let find;
    try {
        find = await Service.findOne({
            attributes: ['title', 'progress', 'status', 'user_no'],
            include: [{
                model: User, 
                attributes: ['email', 'name'],
                required:false   // left outer join
            },{
                model: ConsultingApplication, 
                attributes: ['content'],
                required:false   // left outer join
            }],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const item = find.dataValues;
    if (item.progress != 'STEP_01' || item.status != 'URD') {
        return res.status(errorCode.badRequest).json();
    }

    //---- email
    if (body.confirm_flag === 'Y') {
        if (!await UpdateStatus(user_no, service_no, 'STEP_01', 'RUN')) {
            return res.status(errorCode.internalServerError).json({
                message: '서비스 상태 업데이트 실패'
            });
        }

        SendMail(item.user.email,
            '상담신청 안내', 
            item.user.name + '님께서 신청하신 [ '+ item.title + ' ]에 대한 상담신청이 접수되었습니다.');
    } else {
        let inputResult;
        try {
            inputResult = await ConsultingResult.create({
                service_no,
                consulting_done_flag: 'N',
                content: body.content,
                attached_file_flag: 'N',
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } catch (error) {
            console.error(error);
        }

        if (!(inputResult instanceof ConsultingResult)) {
            return res.status(errorCode.internalServerError).json({
                message: '상담신청서 결과서 생성 실패'
            });
        }

        if (!await UpdateStatus(user_no, service_no, 'STEP_01', 'REJ')) {
            return res.status(errorCode.internalServerError).json({
                message: '서비스 상태 업데이트 실패'
            });
        }

        SendMail(item.user.email,
            '상담신청 예약취소 안내', 
            item.user.name + '님께서 신청하신 [ '+ item.title + ' ]에 대한 상담신청 예약이 취소되었습니다.\n' + 
            '취소사유 [ ' + body.content + ' ]'
        );
    }

    res.status(errorCode.ok).json({});
});


// 고객이 상담만 하고 종료
router.post('/:service_no/consulting/drop', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    /* DID 요청에 의해 관리자가 취소할 수 있게 수정
    if (authority_level > authLevel.user) {
        return res.status(errorCode.notAcceptable).json({});
    }
    */

    /////////////////////////////
    let find;
    try {
        find = await Service.findOne({
            attributes: ['progress', 'status'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }


    const service = find.dataValues;
    if (service.progress != 'STEP_01' || service.status != 'RES') {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////


    if (!await UpdateStatus(user_no, service_no, 'STEP_01', 'DRP', true)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    res.status(errorCode.ok).json({});
});

/* 
 * POST : /service/counsulting/usercancel
 * 기능설명 : 고객이 상담예약을 취소함
 * 작성자 : 이승민
 * 작성일 : 2020.05.27
 */
router.post('/:service_no/consulting/usercancel', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    /*
    if (authority_level >= authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }
    */

    ////////////////////////
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ConsultingApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    let find;
    try {
        find = await Service.findOne({
            attributes: ['title', 'progress', 'status'],
            include: [{
                model: User, 
                attributes: ['email', 'name'],
                required:false   // left outer join
            },{
                model: ConsultingApplication, 
                attributes: ['content'],
                required:false   // left outer join
            }],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const item = find.dataValues;
    if (item.progress != 'STEP_01' || !(item.status == 'URD' || item.status == 'RUN')) {
        return res.status(errorCode.badRequest).json();
    }
    ////////////////////

    if (!await UpdateStatus(user_no, service_no, 'STEP_01', 'CXL', true)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    //---- email
    let find_email;
    try {
        find_email = await User.findAll({
            attributes: ['email'],
            where: { authority_level: { [Op.between]: [authLevel.scheduler, authLevel.manager] } }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_email.length > 0) {
        let email = [];
        for (let i = 0; i < find_email.length; i++) {
            email.push(find_email[i].dataValues.email);
        }

        SendMail(email,
            '상담신청 예약취소 안내', 
            item.user.name + '님께서 [ ' + item.title + ' ]에 대한 상담신청을 취소하였습니다.');
    }

    res.status(errorCode.ok).json({});
});

/* 
 * POST : /service/:service_no/counsulting/result/
 * 기능설명 : 컨설팅 결과 작성
 * 작성자 : 이승민
 * 작성일 : 2020.05.27
 */
router.post('/:service_no/consulting/result', verifyToken, upload.array('files'), async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    if (authority_level < authLevel.scheduler) {
        return res.status(errorCode.notAcceptable).json({});
    }

    /////////////////////////////
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ConsultingApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});
    let find;
    try {
        find = await Service.findOne({
            attributes: ['title', 'progress', 'status', 'user_no'],
            include: [{
                model: User, 
                attributes: ['email', 'name'],
                required:false   // left outer join
            },{
                model: ConsultingApplication, 
                attributes: ['content'],
                required:false   // left outer join
            }],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const item = find.dataValues;
    if (item.progress != 'STEP_01' || !(item.status == 'URD' || item.status == 'RUN')) {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////

    let createQuery = {
        service_no,
        consulting_done_flag: body.result_flag,
        content: body.content,
        attached_file_flag: (req.files.length > 0) ? 'Y' : 'N',
        created_user_no: user_no,
        updated_user_no: user_no,
    }

    let inputResult;
    try {
        inputResult = await ConsultingResult.create(createQuery);
    } catch (error) {
        console.error(error);
    }

    if (!(inputResult instanceof ConsultingResult)) {
        return res.status(errorCode.internalServerError).json({
            message: '상담신청서 결과서 생성 실패'
        });
    }

    if (!await UpdateStatus(user_no, service_no, 'STEP_01', (body.result_flag === 'Y') ? 'RES' : 'REJ')) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    if (req.files.length > 0) {
        if (!await InsertFileInfo(user_no, service_no, req.files, 'CR')) {
            return res.status(errorCode.internalServerError).json({
                message: '파일정보 등록 실패'
            });
        }
    }

    //---- email
    if (body.result_flag) {
        SendMail(item.user.email,
            '상담 완료 안내', 
            item.user.name + '님께서 신청하신 [ '+ item.title + ' ]에 대한 상담이 완료되었습니다.\n' + 
            '자세한 내용은 홈페이지에서 확인하신 후 서비스 신청을 바랍니다.');
    } else {
        SendMail(item.user.email,
            '상담 취소 안내', 
            item.user.name + '님께서 신청하신 [ '+ item.title + ' ]에 대한 상담이 취소되었습니다.\n' + 
            '자세한 내용은 홈페이지에서 확인 바랍니다.');
   }

    res.status(errorCode.ok).json({});
});

/* 
 * GET : /service/:service_no/counsulting/result/
 * 기능설명 : 컨설팅 결과 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.27
 */
router.get('/:service_no/consulting/result', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;

    let item;
    try {
        item = await ConsultingResult.findOne({
            attributes: ['service_no', 'consulting_done_flag', 'content', 'attached_file_flag', 'updated_at'],
            where: { service_no },
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!item || item.length === 0) {
        return res.status(400).json({message: '없는 서비스입니다.'});
    }

    let files;
    if (item.attached_file_flag == 'Y') {
        files = await SelectFileInfo(service_no, 'CR');
        if (!files) {
            return res.status(errorCode.internalServerError).json({});
        }
        //console.log(files);
    }

    return res.status(errorCode.ok).json({
        service_no,
        result_flag: item.consulting_done_flag,
        content: item.content,
        attached_file_flag : item.attached_file_flag,
        attached_file: files,
        updated_at: item.dataValues.updated_at
    });
});

/* 
 * POST : /service/:service_no/service_application
 * 기능설명 : 서비스 신청서 작성(사용자)
 * 작성자 : 이승민
 * 작성일 : 2020.05.27
 */
router.post('/:service_no/service_application/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    /////////////////////////////
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    let find;
    try {
        find = await Service.findOne({
            attributes: ['title', 'progress', 'status'],
            include: [{
                model: User, 
                attributes: ['email', 'name'],
                required:false   // left outer join
            }],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const service = find.dataValues;
    if (service.progress != 'STEP_01' || service.status != 'RES') {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////

    let result;
    try {
        result = await ServiceApplication.create({
            service_no,
            service_categories_no: body.service_categories_no,
            product_name: body.product_name,
            content: body.content,
            business_plan: body.business_plan,
            requirement: body.requirement,
            created_user_no: user_no,
            updated_user_no: user_no,
            memo:body.memo,
        });

    } catch (error) {
        console.error(error);
    }
   
    if (!(result instanceof ServiceApplication)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 신청서 생성 실패'
        });
    }

    if (!await UpdateStatus(user_no, service_no, 'STEP_02', 'URD')) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    /*  삭제, 별도의 pos api로 둠
    if (req.files.length > 0) {
        if (!await InsertFileInfo(user_no, service_no, req.files, 'SA')) {
            return res.status(errorCode.internalServerError).json({
                message: '파일정보 등록 실패'
            });
        }
    }
    */

    //---- email
    let find_category;
    let find_partner;
    if (body.service_categories_no) {
        const split = body.service_categories_no.split(',');
        try {
            find_category = await ServiceCategory.findAll({
                attributes: ['company_no'],
                where: {
                    service_category_no : split,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    if (find_category && find_category.length > 0) {
        let company_no = [];
        for (let i = 0; i < find_category.length; i++) {
            company_no.push(find_category[i].dataValues.company_no);
        }

        company_no = [...new Set(company_no)];
        /* 수정번호 : 20210413-01
         * company table에 있는 대표 user를 가져옴
        Company.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
        if (company_no.length > 0) {
            try {
                find_partner = await Company.findAll({
                    attributes: ['user_no'],
                    include: [{
                        model: User, 
                        attributes: ['email'],
                        required:false   // left outer join
                    }],
                    where: { company_no : company_no }
                });
            } catch (error) {
                console.error(error);
                return res.status(errorCode.internalServerError).json({});
            }
        }
        */

        /* 수정번호 : 20210413-01
         * ser table에 해당 company_no가 등록된 email을 가져옴 
         * 2021-03-24 : IPHEART 수정 요청사항
         */
        if (company_no.length > 0) {
            try {
                find_partner = await User.findAll({
                    attributes: ['email'],
                    where: { company_no : company_no }
                });
            } catch (error) {
                console.error(error);
                return res.status(errorCode.internalServerError).json({});
            }
        }
    }

    let find_manager;
    try {
        find_manager = await User.findAll({
            attributes: ['email'],
            where: { authority_level: authLevel.manager }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_manager.length > 0 || find_partner > 0) {
        let email = [];
        for (let i = 0; i < find_manager.length; i++) {
            email.push(find_manager[i].dataValues.email);
        }

        for (let i = 0; i < find_partner.length; i++) {
            /* 수정번호 : 20210413-01
            email.push(find_partner[i].dataValues.user.email);
            */
            email.push(find_partner[i].dataValues.email);
        }

        email = [...new Set(email)];
        SendMail(email,
            '신규 서비스 신청 안내', 
            service.user.name + '님께서 [ ' + service.title + ' ]에 대해 서비스 신청을 하였습니다.\n' +
            '자세한 내용은 홈페이지를 통해 확인할 수 있습니다.');
    }

    res.status(errorCode.noContent).json();
});

router.post('/:service_no/service_application/files', verifyToken, upload.array('files'), async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;

    // 첨부파일
    if (req.files.length > 0) {
        if (!await InsertFileInfo(user_no, service_no, req.files, 'SA')) {
            return res.status(errorCode.internalServerError).json({
                message: '파일정보 등록 실패'
            });
        }
    }

    res.status(errorCode.ok).json({});
});

/* 
 * PUT : /service/:service_no/service_application
 * 기능설명 : 서비스 신청서 수정
 * 작성자 : 이승민
 * 작성일 : 2020.11.23
 */
router.put('/:service_no/service_application/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    if (!body.service_categories_no || !body.product_name || !body.content || !body.business_plan) {
        return res.status(errorCode.badRequest).json();
    }

    /////////////////////////
    let find;
    try {
        find = await Service.findOne({
            attributes: ['progress', 'status'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    if (!find) {
        return res.status(errorCode.badRequest).json();
    }

    const service = find.dataValues;
    if (service.progress != 'STEP_02' || service.status != 'URD') {
        return res.status(errorCode.badRequest).json();
    }
    ////////////////////////

    let result;
    try {
        result = await ServiceApplication.update({
            service_categories_no: body.service_categories_no,
            product_name: body.product_name,
            content: body.content,
            business_plan: body.business_plan,
            requirement: body.requirement,
            updated_user_no: user_no
        }, {
            where : {
                service_no,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    res.status(result > 0 ? errorCode.ok : errorCode.badRequest).json({});
})


/* 
 * GET : /service/:service_no/service_application/
 * 기능설명 : 서비스 신청서 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.27
 */
router.get('/:service_no/service_application', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;

    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ServiceApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});

    let query = {
        attributes: ['service_no', 'user_no', 'title', 'progress', 'status'],
        include: [{
                model: User, 
                attributes: ['name', 'email', 'company_no', 'phone_number', ],
                required:false   // left outer join
            },{
                model: ServiceApplication, 
                attributes: ['service_categories_no', 'product_name', 'content', 'business_plan', 'requirement', 'created_at'],
                required:false   // left outer join
            }],
        order: [
            ['created_at', 'DESC'],
        ],
        where: { service_no }
    }

    let find;
    try {
        find = await Service.findOne(query);
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const item = find.dataValues;
    let co_name;
    if (item.user.company_no != null) {
        let company
        try {
            company = await Company.findOne({
                attributes: ['name'],
                where: { company_no : item.user.company_no }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }

        co_name = company.dataValues.name;
    }

    let category;
    if (item.service_application.service_categories_no) {
        const split = item.service_application.service_categories_no.split(',');

        try {
            category = await ServiceCategory.findAll({
                attributes: ['service_category_no', 'company_no', 'service_name'],
                where : {
                    service_category_no : split
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    const files = await SelectFileInfo(service_no, 'SA');
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }


    /* 신청서 게시물을 읽으면 자동으로 진행중 상태로 변경하는 것 삭제
     * 2021-11-22
     * by minx
    if (item.progress == 'STEP_02' && item.status == 'URD') {
        if (!await UpdateStatus(user_no, service_no, 'STEP_02', 'RUN')) {
            return res.status(errorCode.internalServerError).json({
                message: '서비스 상태 업데이트 실패'
            });
        }
    }
     */

    return res.status(errorCode.ok).json({
        service_no,
        progress: item.progress,
        status: item.status,
        name: item.user.name,
        email: item.user.email,
        phone_number: item.user.phone_number,
        co_name: co_name,
        title: item.title,
        product_name: item.service_application.product_name,
        content: item.service_application.content,
        business_plan: item.service_application.business_plan,
        requirement: item.service_application.requirement,
        categories: item.service_application.service_categories_no,
        created_at: item.service_application.dataValues.created_at,
        category_items: category,
        attached_file: files
    });
});

/* 
 * POST : /:service_no/service_application/check
 * 기능설명 : 서비스 신청서 신청내용 확인[운영자]
 * 작성자 : 이승민
 * 작성일 : 2021.11.22
 */
router.post('/:service_no/service_application/check', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let result
    try {
        result = await Service.update({
            updated_user_no: user_no,
            status: 'RUN'
        }, {
            where : {
                service_no,
                progress: 'STEP_02',
                status: 'URD'
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    res.status(result > 0 ? errorCode.ok : errorCode.badRequest).json({});
});

/* 
 * POST : /:service_no/service_application/usercancel
 * 기능설명 : 서비스 신청서 사용자 취소
 * 작성자 : 이승민
 * 작성일 : 2020.05.28
 */
router.post('/:service_no/service_application/usercancel', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let service_no = req.params.service_no;

    if (authority_level > authLevel.user) {
        return res.status(errorCode.notAcceptable).json({});
    }
    
    /////////////////////////////////
    let find;
    try {
        find = await Service.findOne({
            attributes: ['progress', 'status'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const service = find.dataValues;
    if (service.progress != 'STEP_02' || !(service.status == 'URD' || service.status == 'RUN' || service.status == 'EVA')) {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////////////////////

    if (!await UpdateStatus(user_no, service_no, 'STEP_02', 'CXL', true)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    res.status(errorCode.ok).json({});
});

/* 
 * POST : /:service_no/service_confirm
 * 기능설명 : 서비스 신청서 산정평가 요청
 * 작성자 : 이승민
 * 작성일 : 2020.05.28
 */
router.post('/:service_no/service_confirm', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    /////////////////////////////
    let find;
    try {
        find = await Service.findOne({
            attributes: ['progress', 'status'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const service = find.dataValues;
    if (service.progress != 'STEP_02' || !(service.status == 'URD' || service.status == 'RUN')) {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////

    let result;
    try {
        result = await ServiceApplicationConfirm.create({
            service_no,
            request_content: body.content,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(errorCode.internalServerError).json({
                message: '이미 등록된 내용입니다.'
            })
        } else {
            console.error(error);
        }
    }

    if (!(result instanceof ServiceApplicationConfirm)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 신청서 산정평가 생성 실패'
        });
    }

    if (!await UpdateStatus(user_no, service_no, 'STEP_02', 'EVA')) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    return res.status(errorCode.ok).json({});
});

/* 
 * GET : /service/:service_no/service_confirm/
 * 기능설명 : 서비스 신청서 산정평가 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.28
 */
router.get('/:service_no/service_confirm', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;

    let find;
    try {
        find = await ServiceApplicationConfirm.findOne({
            attributes: ['service_no', 'confirm_flag', 'request_content', 'reject_content', 'attached_file_flag', 'updated_at'],
            where: { service_no },
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    return res.status(errorCode.ok).json(find);
});

/* 
 * POST : /service/:service_no/service_confirm/response
 * 기능설명 : 서비스 신청서 산정평가 응답
 * 작성자 : 이승민
 * 작성일 : 2020.05.28
 */
router.post('/:service_no/service_confirm/response', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;


    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    /////////////////////////////
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    let find;
    try {
        find = await Service.findOne({
            attributes: ['title', 'progress', 'status'],
            include: [{
                model: User, 
                attributes: ['email', 'name'],
                required:false   // left outer join
            }],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const service = find.dataValues;
    if (service.progress != 'STEP_02' || service.status == 'REJ' || service.status =='CXL') {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////

    let result;
    try {
        if (service.status == 'URD' || service.status == 'RUN') {
            result = await ServiceApplicationConfirm.create({
                service_no,
                confirm_flag: body.confirm_flag,
                request_content: body.request_content,
                reject_content: body.reject_content,
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } else {
            result = await ServiceApplicationConfirm.update({
                confirm_flag: body.confirm_flag,
                reject_content: body.reject_content,
                updated_user_no: user_no
            }, {
                where: { service_no },
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!await UpdateStatus(user_no, service_no,
            (body.confirm_flag === 'Y') ? 'STEP_03' : 'STEP_02',
            (body.confirm_flag === 'Y') ? 'RUN' : 'REJ')) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    //---- email
    let find_service_category;
    let find_category;
    let find_partner;

    try {
        find_service_category = await ServiceApplication.findOne({
            attributes: ['service_categories_no'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_service_category) {
        const split = find_service_category.service_categories_no.split(',');
        try {
            find_category = await ServiceCategory.findAll({
                attributes: ['company_no'],
                where: {
                    service_category_no : split,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    if (find_category.length > 0) {
        let company_no = [];
        for (let i = 0; i < find_category.length; i++) {
            company_no.push(find_category[i].dataValues.company_no);
        }

        company_no = [...new Set(company_no)];
        Company.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
        if (company_no.length > 0) {
            try {
                find_partner = await Company.findAll({
                    attributes: ['user_no'],
                    include: [{
                        model: User, 
                        attributes: ['email'],
                        required:false   // left outer join
                    }],
                    where: { company_no : company_no }
                });
            } catch (error) {
                console.error(error);
                return res.status(errorCode.internalServerError).json({});
            }
        }
    }

    let find_email;
    try {
        find_email = await User.findAll({
            attributes: ['email'],
            where: { authority_level: authLevel.manager }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_email.length > 0 || find_partner > 0) {
        let email = [];
        for (let i = 0; i < find_email.length; i++) {
            email.push(find_email[i].dataValues.email);
        }

        for (let i = 0; i < find_partner.length; i++) {
            email.push(find_partner[i].dataValues.user.email);
        }

        email = [...new Set(email)];
        email.push(service.user.email);
        if (body.confirm_flag === 'Y') {
            SendMail(email,
                '서비스 신청 승인 안내', 
                service.user.name + '님의 [ ' + service.title + ' ]에 대한 서비스 신청이 승인 되었습니다.\n' + 
                '자세한 내용은 홈페이지를 통해 확인할 수 있습니다.');
        } else {
            SendMail(email,
                '서비스 신청 취소 안내', 
                service.user.name + '님의 [ ' + service.title + ' ]에 대한 서비스 신청이 \'운영자\'에 의해 취소 되었습니다.\n' + 
                '자세한 내용은 홈페이지를 통해 확인할 수 있습니다.');
        }
    }

    return res.json({});
});

/* 
 * POST : /:service_no/service_confirm/accept
 * 기능설명 : 서비스 신청서 확인
 * 작성자 : 이승민
 * 작성일 : 2021.01.19
 */
router.post('/:service_no/service_confirm/accept', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    /////////////////////////////
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    let find;
    try {
        find = await Service.findOne({
            attributes: ['title', 'progress', 'status'],
            include: [{
                model: User, 
                attributes: ['email', 'name'],
                required:false   // left outer join
            }],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const service = find.dataValues;
    if (service.progress != 'STEP_02' || !(service.status == 'URD' || service.status == 'RUN')) {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////

    let result;
    try {
        result = await ServiceApplicationConfirm.create({
            service_no,
            confirm_flag: 'P',
            request_content: '산정평가 없는 서비스 신청서 수락',
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(errorCode.internalServerError).json({
                message: '이미 등록된 내용입니다.'
            })
        } else {
            console.error(error);
        }
    }

    if (!(result instanceof ServiceApplicationConfirm)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 신청서 산정평가 생성 실패'
        });
    }

    if (!await UpdateStatus(user_no, service_no, 'STEP_03', 'RUN')) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    //---- email
    let find_service_category;
    let find_category;
    let find_partner;

    try {
        find_service_category = await ServiceApplication.findOne({
            attributes: ['service_categories_no'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_service_category) {
        const split = find_service_category.service_categories_no.split(',');
        try {
            find_category = await ServiceCategory.findAll({
                attributes: ['company_no'],
                where: {
                    service_category_no : split,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    if (find_category.length > 0) {
        let company_no = [];
        for (let i = 0; i < find_category.length; i++) {
            company_no.push(find_category[i].dataValues.company_no);
        }

        company_no = [...new Set(company_no)];
        Company.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
        if (company_no.length > 0) {
            try {
                find_partner = await Company.findAll({
                    attributes: ['user_no'],
                    include: [{
                        model: User, 
                        attributes: ['email'],
                        required:false   // left outer join
                    }],
                    where: { company_no : company_no }
                });
            } catch (error) {
                console.error(error);
                return res.status(errorCode.internalServerError).json({});
            }
        }
    }

    let find_email;
    try {
        find_email = await User.findAll({
            attributes: ['email'],
            where: { authority_level: authLevel.manager }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_email.length > 0 || find_partner > 0) {
        let email = [];
        for (let i = 0; i < find_email.length; i++) {
            email.push(find_email[i].dataValues.email);
        }

        for (let i = 0; i < find_partner.length; i++) {
            email.push(find_partner[i].dataValues.user.email);
        }

        email = [...new Set(email)];
        email.push(service.user.email);
        SendMail(email,
            '서비스 신청 승인 안내', 
            service.user.name + '님의 [ ' + service.title + ' ]에 대한 서비스 신청이 승인 되었습니다.\n' + 
            '자세한 내용은 홈페이지를 통해 확인할 수 있습니다.');
    }

    return res.status(errorCode.ok).json({});
});

router.post('/:service_no/service_element', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;

    try {
        let result = await ServiceElement.create({
            service_no,
            service_category_no: body.service_category_no,
            start_date: body.start_date,
            end_date: body.end_date,
            attempt_number: body.attempt_number,
            time_required: body.time_required,
            production_method: body.production_method,
            equipment_item_no: body.equipment_item_no,
            used_material_flag: body.used_material_flag,
            production_specification: body.production_specification,
            support_effect: body.support_effect,
            support_content: body.support_content,
            support_result: body.support_result,
            created_user_no: user_no,
            updated_user_no: user_no,
        });

        if (!(result instanceof ServiceElement)) {
            return res.status(400).json({
                code: 400,
                message: '서비스 신청서 산정평가 생성 실패'
            });
        }

        return res.status(200).json({
            code: 200
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put('/:service_no/service_element/:element_no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let element_no = req.params.element_no;
    let authority_level = req.decoded.authority_level;

    try {
        let result = await ServiceElement.update({
            start_date: body.start_date,
            end_date: body.end_date,
            attempt_number: body.attempt_number,
            time_required: body.time_required,
            production_method: body.production_method,
            equipment_item_no: body.equipment_item_no,
            //used_material_flag: body.used_material_flag,
            production_specification: body.production_specification,
            support_effect: body.support_effect,
            support_content: body.support_content,
            support_result: body.support_result,
            updated_user_no: user_no,
        }, {
            where: { element_no },
        });

        if (!result || result == 0) {
            return res.status(400).json({
                code: 400,
                message: "실패"
            });
        }

        return res.json({
            code: 200,
            message: "성공"
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:service_no/service_element/:element_no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let element_no = req.params.element_no;
    let authority_level = req.decoded.authority_level;

    try {
        let result = await ServiceElement.fineOne({
            where: element_no,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/* 
 * GET : /service/category/
 * 기능설명 : 서비스 카테고리 조회
 * 작성자 : 이승민
 * 작성일 : 2020.07.21
 */

router.get('/category/list/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7: Number(req.query.limit);

    let my_where = { };
    if (req.query.search) { my_where["service_name"] = { [Op.like]: "%" + req.query.search + "%"} }

    if (authority_level == 1) {
        return res.status(errorCode.internalServerError).json({});
    }

    let findResult;
    try {
        findResult = await ServiceCategory.findAll({
            attributes: [[ServiceCategory.sequelize.fn('count', '*'), 'count']],
            where: my_where,
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let total_count = findResult[0].dataValues.count;
    if (total_count <= 0) {
        return res.status(errorCode.ok).json({
            total_count: 0,
            total_page: 0,
            current_page: 0,
            offset: 0,
            limit,
            items: [],
        });
    }

    let total_page = Math.ceil(total_count / limit);
    let offset = ((page > total_page ? total_page : page) - 1) * limit;

    let items;
    ServiceCategory.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
    try {
         items = await ServiceCategory.findAll({
            attributes: ['service_category_no', 'service_name', 'company_no', 'created_at', 'updated_at'],
            include: [{
                model: Company, 
                attributes: ['name'],
                required:false   // left outer join
            }],
            order: [
                ['created_at', 'DESC'],
            ],
            where: my_where,
            offset: offset,
            limit: limit,
            raw: true
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    for (let i = 0; i < items.length; i++) {
        items[i]['co_name'] = items[i]['company.name'];
        delete items[i]['company.name'];
    }

    let result = {
        total_count,
        total_page,
        current_page: offset/limit+1,
        offset,
        limit,
        items,
    }

    return res.status(errorCode.ok).json(result);
});

/* 
 * POST : /service/category/
 * 기능설명 : 서비스 카테고리 등록
 * 작성자 : 이승민
 * 작성일 : 2020.07.21
 */
router.post('/category', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < 10) {
        return res.status(400).json({ message:"권한없음" });
    }
    
    let inputResult;
    try {
        inputResult = await ServiceCategory.create({
            service_name: body.service_name,
            company_no: body.company_no,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
    }

    if (!(inputResult instanceof ServiceCategory)) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 카테고리 생성 실패'
        });
    }

    res.status(errorCode.ok).json({});
});

router.put('/category/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_category_no = req.params.no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < 10) {
        return res.status(400).json({ message:"권한없음" });
    }
    
    let updateResult;
    try {
        updateResult = await ServiceCategory.update({
            //service_name: body.service_name,
            company_no: body.company_no,
            //created_user_no: user_no,
            updated_user_no: user_no,
        }, {
            where: { service_category_no },
        });
    } catch (error) {
        console.error(error);
    }

    if (!updateResult || updateResult == 0) {
        next(error);
    }


    res.status(errorCode.ok).json({});
});


router.get('/category/all', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let authority_level = req.decoded.authority_level;

    let find;
    try {
        find = await ServiceCategory.findAll({ attributes: ['service_category_no', 'service_name'],
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    
    res.status(errorCode.ok).json({
        count: find.length,
        items: find,
    });
});

router.get('/:service_no/running', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ServiceApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});


    let find;
    // 0. 조회자의 company_no 조회
    try {
        find = await User.findOne({
            attributes: ['company_no'],
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const my_company_no = find.dataValues.company_no;

    // 1. service + service 신청서 조회
    let query = {
        attributes: ['service_no', 'user_no', 'title', 'progress', 'status'],
        include: [{
            model: User, 
            attributes: ['name', 'email', 'company_no', 'phone_number', ],
            required:false   // left outer join
        },{
            model: ServiceApplication, 
            attributes: ['service_categories_no', 'product_name', 'content', 'business_plan', 'requirement', 'created_at'],
            required:false   // left outer join
        }],
        order: [
            ['created_at', 'DESC'],
        ],
        where: { service_no }
    }

    try {
        find = await Service.findOne(query);
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const item = find.dataValues;   // service + service 신청서 정보

    //2. 회사명 조회
    let co_name;
    if (item.user.company_no != null) {
        let company
        try {
            company = await Company.findOne({
                attributes: ['name'],
                where: { company_no : item.user.company_no }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }

        co_name = company.dataValues.name;
    }

    //3. 서비스 신청서에 포함된 카테고리 목록 조회
    let category;
    if (item.service_application.service_categories_no) {
        const split = item.service_application.service_categories_no.split(',');
        let query = {
            attributes: ['service_category_no', 'company_no', 'service_name'],
        }

        /* 사용자 레벨이 파트너 일 경우 자신이 속해있는 카테고리만 보임
         * - 2020-09-02 운영자 요청에 의해 삭제하고 모든 파트너가 동일한 진행내역을 볼 수 있게 수정
        if (authority_level < authLevel.scheduler) {
            ServiceCategory.hasOne(User, {foreignKey: 'company_no', sourceKey: 'company_no'});
            query.where = { 
                service_category_no : split,
                '$user.user_no$' : user_no
            };
            query.include = {
                model: User, 
                attributes: ['company_no'],
                required:false   // left outer join
            };
        } else {    // 관리자 스케줄러 이상만 전체 봄
            query.where = { 
                service_category_no : split,
            };
        }
        */
        
        /* 위 내용에 의해 변경됨 */
        query.where = { 
            service_category_no : split,
        };

        try {
            category = await ServiceCategory.findAll(query);
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    // 4. 사용장비 (기자재 항목 카테고리) 조회
    let equipCategory;
    try {
        equipCategory = await EquipmentCategory.findAll({
            attributes: ['equipment_category_no', 'service_category_no', 'model_name', 'model_number', 'model_specification'],
         });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
 
    /*
    // 4.1 기자재 항목 조회 (UI에서 사용하지는 않음)
    let equipElement;
    try {
        equipElement = await EquipmentElement.findAll({
            attributes: ['equipment_element_no', 'equipment_category_no', 'serial_number' ],
         });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    */
 
    // 5. 자재 조회
    let material;
    try {
         material = await MaterialItem.findAll({
             attributes: ['material_item_no', 'equipment_category_no', 'name'],
         });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    // 6. 서비스 신청서 포함된  파일 조회
    let files;
    if (item.service_application.attached_file_flag == 'Y') {
        files = await SelectFileInfo(service_no, 'SA');
        if (!files) {
            return res.status(errorCode.internalServerError).json({});
        }
    }

    // 6. 서비스 신청서에 작성된 서비스 작업물 조회
    ServiceElement.hasMany(AttachedFile, {foreignKey: 'service_element_no', sourceKey: 'service_element_no'});
    ServiceElement.hasMany(ServiceElementAttempt, {foreignKey: 'service_element_no', sourceKey: 'service_element_no'});
    ServiceElementAttempt.hasMany(MaterialUsage, {foreignKey: 'service_element_attempt_no', sourceKey: 'service_element_attempt_no'});
    let serviceElement;
    try {
        serviceElement = await ServiceElement.findAll({
            attributes: ['service_element_no', 'service_category_no', 'service_no',
                'start_date', 'end_date', 'support_content', 'support_result'],
            include: [{ 
                model: ServiceElementAttempt, 
                attributes: ['service_element_attempt_no', 'attempt_number', 'time_required', 'production_method',
                    'production_specification', 'support_effect'], 
                include: [{
                    model: MaterialUsage, 
                    attributes: ['material_usage_no', 'equipment_category_no', 'material_item_no', 'quantity'],
                    required:false   // left outer join
                }],
                required:false   // left outer join
            },{
                model: AttachedFile, 
                attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
                required:false   // left outer join
            }],
            order: [
                ['service_category_no', 'ASC'],
                [ServiceElementAttempt, 'attempt_number', 'ASC'],
            ],
            where : { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    /*
    console.log(serviceElement.length);
    for (let i = 0; i < serviceElement.length; i++) {
        let attempts;
        try {
            attempts = await ServiceElementAttempt.findAll({
                attributes: ['service_element_attempt_no', 'attempt_number', 'time_required', 'production_method',
                    'production_specification', 'support_effect'], 
                include: [{
                    model: MaterialUsage, 
                    attributes: ['material_usage_no', 'equipment_category_no', 'material_item_no', 'quantity'],
                    required:false   // left outer join
                }],
                order: [
                    ['attempt_number', 'ASC'],
                ],
                where : { service_element_no : serviceElement[i].dataValues.service_element_no }
            })
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
        serviceElement[i].dataValues.service_element_attempts = attempts.dataValues;
    }
    */

    if (item.progress == 'STEP_03' && item.status == 'URD') {
        if (!await UpdateStatus(user_no, service_no, 'STEP_03', 'RUN')) {
            return res.status(errorCode.internalServerError).json({
                message: '서비스 상태 업데이트 실패'
            });
        }
    }

    for (let i = 0; i < category.length; i++) {
        if (authority_level < authLevel.manager) {
            if (category[i].dataValues.company_no == my_company_no) {
                category[i].dataValues.readonly = false;
            } else {
                category[i].dataValues.readonly = true;
            }
        } else {
            category[i].dataValues.readonly = false;
        }
    } 


    return res.status(errorCode.ok).json({
        service_no,
        progress: item.progress,
        status: item.status,
        name: item.user.name,
        email: item.user.email,
        phone_number: item.user.phone_number,
        co_name: co_name,
        title: item.title,
        product_name: item.service_application.product_name,
        categories: item.service_application.service_categories_no,
        created_at: item.service_application.dataValues.created_at,
        category_items: category,
        equip_category: equipCategory,
        //equip_element: equipElement,
        material_items: material,
        service_element: serviceElement,
        attached_file: files
    });
});

router.delete('/:service_no/element/:element_no/attempt/:attempt_no', verifyToken, async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let element_no = req.params.element_no;
    let attempt_no = req.params.attempt_no;
    let authority_level = req.decoded.authority_level;

    let find;
    try {
        find = await ServiceElementAttempt.findOne({
            where:{service_element_attempt_no: attempt_no}
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const attemptItem = find.dataValues;

    let find2;
    try {
        find2 = await MaterialUsage.findAll({
            where:{service_element_attempt_no: attempt_no}
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const usageItems = find2;
    for (let i = 0; i < usageItems.length; i++) {
        if (usageItems[i].material_usage_no > 0) {
            const result = await RemoveEquipAndMaterialUsage(user_no, usageItems[i].material_usage_no) ;
            if (result != errorCode.ok) {
                return res.status(errorCode.internalServerError).json({});
            }
        }
    }

    let deleteResult;
    try {
        deleteResult = await ServiceElementAttempt.destroy({
            where:{service_element_attempt_no: attempt_no}
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    return res.status(errorCode.ok).json();
});

router.delete('/:service_no/element/:element_no/attempt/:attempt_no/material_usage/:material_usage_no', verifyToken, async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let service_no = req.params.service_no;
    let element_no = req.params.element_no;
    let attempt_no = req.params.attempt_no;
    let material_usage_no = req.params.material_usage_no;
    let authority_level = req.decoded.authority_level;

    /*
    let find;
    try {
        find = await MaterialUsage.findAll({
            where:{material_usage_no}
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    if (!find) {
        return res.status(errorCode.noContent).json({});
    }*/

    const result = await RemoveEquipAndMaterialUsage(user_no, material_usage_no) ;

    return res.status(result).json();
});
 

router.get('/:service_no/done', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    Service.hasOne(ServiceApplication, {foreignKey: 'service_no', sourceKey: 'service_no'});

    // 1. service + service 신청서 조회
    let query = {
        attributes: ['service_no', 'user_no', 'title', 'progress', 'status', 'updated_at', 'updated_user_no'],
        include: [{
            model: User, 
            attributes: ['name', 'email', 'company_no', 'phone_number', 'company_position'],
            required:false   // left outer join
        },{
            model: ServiceApplication, 
            /*attributes: ['service_categories_no', 'content', '''attached_file_flag'],*/
            attributes: ['service_categories_no', 'product_name', 'content', 'business_plan', 'requirement', 'created_at'],
            required:false   // left outer join
        }],
        order: [
            ['created_at', 'DESC'],
        ],
        where: { service_no }
    }

    let find;
    try {
        find = await Service.findOne(query);
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const item = find.dataValues;   // service + service 신청서 정보

    //1.5 담당 지원 회사명 조회
    let support_partner = undefined;
    if (item.progress === 'STEP_04' && item.status ==='END') {
        try {
            User.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
            find = await User.findOne({
                attributes: ['company_no'],
                include: [{
                    model: Company, 
                    attributes: ['name'],
                    required:false   // left outer join
                }],
                where: { user_no: item.updated_user_no },
                paranoid: false // 소프트 삭제도 사용할 수 있게
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }

        if (!find) {
            return res.status(errorCode.noContent).json();
        }

        support_partner = find.dataValues.company ? find.dataValues.company.name : 'Unknown';
    }

    //2. 회사명 조회
    let co_name;
    let co_reg;
    let co_business;
    let co_address;
    if (item.user.company_no != null) {
        let company
        try {
            company = await Company.findOne({
                // attributes: ['name'],
                attributes: ['name', 'registration_number', 'business_field', 'address', 'address_detail'],
                where: { company_no : item.user.company_no }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }

        co_name = company.dataValues.name;
        co_reg  = company.dataValues.registration_number;
        co_business = company.dataValues.business_field;
        co_address = company.dataValues.address + ', ' + company.dataValues.address_detail;
    }

    //3. 서비스 신청서에 포함된 카테고리 목록 조회
    let category;
    if (item.service_application.service_categories_no) {
        const split = item.service_application.service_categories_no.split(',');
        let query = {
            attributes: ['service_category_no', 'company_no', 'service_name'],
            where: {
                service_category_no : split,
            }
        }

        try {
            category = await ServiceCategory.findAll(query);
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    /*
    // 4. 사용장비 (기자재 항목 카테고리) 조회
    let equipCategory;
    try {
        equipCategory = await EquipmentCategory.findAll({
            attributes: ['equipment_category_no', 'model_name', 'model_number', 'model_specification'],
         });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    */

    /*
    // 4.1 기자재 항목 조회 (UI에서 사용하지는 않음)
    let equipElement;
    try {
        equipElement = await EquipmentElement.findAll({
            attributes: ['equipment_element_no', 'equipment_category_no', 'serial_number' ],
         });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    */
 
    /*
    // 5. 자재 조회
    let material;
    try {
         material = await MaterialItem.findAll({
             attributes: ['material_item_no', 'name'],
         });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    */

    // 6. 서비스 신청서 포함된  파일 조회
    let files;
    if (item.service_application.attached_file_flag == 'Y') {
        files = await SelectFileInfo(service_no, 'SA');
        if (!files) {
            return res.status(errorCode.internalServerError).json({});
        }
    }

    // 6. 서비스 신청서에 작성된 서비스 작업물 조회
    ServiceElement.hasMany(AttachedFile, {foreignKey: 'service_element_no', sourceKey: 'service_element_no'});
    ServiceElement.hasMany(ServiceElementAttempt, {foreignKey: 'service_element_no', sourceKey: 'service_element_no'});
    ServiceElementAttempt.hasMany(MaterialUsage, {foreignKey: 'service_element_attempt_no', sourceKey: 'service_element_attempt_no'});
    MaterialUsage.hasOne(EquipmentCategory, {foreignKey: 'equipment_category_no', sourceKey: 'equipment_category_no'});
    MaterialUsage.hasOne(MaterialItem, {foreignKey: 'material_item_no', sourceKey: 'material_item_no'});
    let serviceElement;
    try {
        serviceElement = await ServiceElement.findAll({
            attributes: ['service_element_no', 'service_category_no', 'service_no',
                'start_date', 'end_date', 'support_content', 'support_result'],
            include: [{ 
                model: ServiceElementAttempt, 
                attributes: ['service_element_attempt_no', 'attempt_number', 'time_required', 'production_method',
                    'production_specification', 'support_effect'], 
                include: [{
                    model: MaterialUsage, 
                    attributes: ['material_usage_no', 'equipment_category_no', 'material_item_no', 'quantity'],
                    required:false,   // left outer join
                    include: [{
                        model: EquipmentCategory,
                        attributes: [['model_name', 'name']],
                        required:false,
                    },{
                        model: MaterialItem,
                        attributes: ['name'],
                        required:false,
                    }]
                }],
                required:false   // left outer join
            },{
                model: AttachedFile, 
                attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
                required:false   // left outer join
            }],
            order: [
                ['service_category_no', 'ASC'],
                [ServiceElementAttempt, 'attempt_number', 'ASC'],
            ],
            where : { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    return res.status(errorCode.ok).json({
        service_no,
        progress: item.progress,
        status: item.status,
        name: item.user.name,
        email: item.user.email,
        phone_number: item.user.phone_number,
        co_position: item.user.company_position,
        co_name,
        co_reg,
        co_business,
        co_address,
        title: item.title,
        product_name: item.service_application.product_name,
        content: item.service_application.content,
        business_plan: item.service_application.business_plan,
        requirement: item.service_application.requirement,
        categories: item.service_application.service_categories_no,
        created_at: item.service_application.dataValues.created_at,
        category_items: category,
        //equip_category: equipCategory,
        //equip_element: equipElement,
        //material_items: material,
        service_element: serviceElement,
        attached_file: files,
        updated_at: item.updated_at,
        support_partner
    });
});

router.post('/:service_no/running/confirm', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    /////////////////////////////
    Service.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    let find;
    try {
        find = await Service.findOne({
            attributes: ['title', 'progress', 'status'],
            include: [{
                model: User, 
                attributes: ['email', 'name'],
                required:false   // left outer join
            }],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const service = find.dataValues;
    if (service.progress != 'STEP_03' || service.status != 'RUN') {
        return res.status(errorCode.badRequest).json();
    }
    /////////////////

    if (body.confirm_flag != 'Y') {
        return res.status(errorCode.badRequest).json({});
    }

    if (!await UpdateStatus(user_no, service_no, 'STEP_04', 'END')) {
        return res.status(errorCode.internalServerError).json({
            message: '서비스 상태 업데이트 실패'
        });
    }

    //---- email
    let find_service_category;
    let find_category;
    let find_partner;

    try {
        find_service_category = await ServiceApplication.findOne({
            attributes: ['service_categories_no'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_service_category) {
        const split = find_service_category.service_categories_no.split(',');
        try {
            find_category = await ServiceCategory.findAll({
                attributes: ['company_no'],
                where: {
                    service_category_no : split,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }

    if (find_category.length > 0) {
        let company_no = [];
        for (let i = 0; i < find_category.length; i++) {
            company_no.push(find_category[i].dataValues.company_no);
        }

        company_no = [...new Set(company_no)];
        Company.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
        if (company_no.length > 0) {
            try {
                find_partner = await Company.findAll({
                    attributes: ['user_no'],
                    include: [{
                        model: User, 
                        attributes: ['email'],
                        required:false   // left outer join
                    }],
                    where: { company_no : company_no }
                });
            } catch (error) {
                console.error(error);
                return res.status(errorCode.internalServerError).json({});
            }
        }
    }

    let find_email;
    try {
        find_email = await User.findAll({
            attributes: ['email'],
            where: { authority_level: authLevel.manager }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (find_email.length > 0 || find_partner > 0) {
        let email = [];
        for (let i = 0; i < find_email.length; i++) {
            email.push(find_email[i].dataValues.email);
        }

        for (let i = 0; i < find_partner.length; i++) {
            email.push(find_partner[i].dataValues.user.email);
        }

        email = [...new Set(email)];
        email.push(service.user.email);
        SendMail(email,
            '서비스 완료 안내', 
            service.user.name + '님의 [ ' + service.title + ' ]에 대한 서비스가 완료되었습니다.\n' + 
            '서비스 이용에 대한 설문을 작성해 주시면 감사하겠습니다.\n' + 
            '자세한 내용은 홈페이지를 통해 확인할 수 있습니다.');
    }

    res.status(errorCode.ok).json({});
});


router.post('/:service_no/survey', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level != authLevel.user) {
        return res.status(errorCode.notAcceptable).json({});
    }

//    console.log(body);

    let inputResult;
    try {
        inputResult = await ServiceSurvey.create({
            service_no,
            answer_numbers: body.answer_numbers,
            answer_text: body.answer_text,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        const errMsg = getErrMsg(error.errors[0]);
        return res.status(errMsg.code).json(errMsg.message);
    }

    res.status(errorCode.ok).json({});
});


router.get('/:service_no/survey', verifyToken, async (req, res, next) => {
    let body = req.body;
    let service_no = req.params.service_no;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    let find;
    try {
        find = await ServiceSurvey.findOne({
            attributes: ['answer_numbers', 'answer_text', 'updated_at'],
            where: { service_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }


    if (find) {
        res.status(errorCode.ok).json(find);
    } else {
        res.status(errorCode.noContent).json(find);
    }
});



module.exports = router;