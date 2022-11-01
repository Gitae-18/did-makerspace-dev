'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, upload, makedir } = require('../../middlewares/middlewares');
const { OldService, OldServiceFile,  Company,  } = require('../../models');

const { Op } = require("sequelize");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
async function InsertFileInfo(user_no, old_service_no, files) {

    const filepath = 'upload/old_service/' + old_service_no;
    if (files.length > 0) {
        makedir(filepath);
    }
   
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file.originalname);
        const filename = 'u' + user_no + 's' + old_service_no + 'os' + file.filename + ext;
        fs.renameSync(file.path, filepath + '/' + filename, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
        });

        let inputResult;
        try {
            inputResult = await OldServiceFile.create({
                old_service_no,
                original_name: file.originalname,
                name: filename,
                type: file.mimetype,
                path: filepath,
                filesize: file.size,
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

async function SelectFileInfo(old_service_no) {
    let files;

    try {
        files = await OldServiceFile.findAll({
            attributes: ['old_service_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                old_service_no,
            }
        });
    } catch (error) {
        console.error(error);
        return null;
        //return res.status(errorCode.internalServerError).json({});
    }

    return files;
}

/* 
 * GET : /oldservice
 * 기능설명 : 구 서비스 항목 전체 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.26
 */
router.get('/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    /*
    const offset = (req.query.offset === undefined) ? 0 : Number(req.query.offset);
     */
    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);

    const dateType = req.query.datetype;
    const startDate = req.query.sdate ? new Date(req.query.sdate) : undefined;
    const endDate = req.query.edate ? new Date(req.query.edate) : undefined;

    OldService.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});

    let query = {
        attributes: [[OldService.sequelize.fn('count', '*'), 'count']],
        include: [{
            model: Company, 
            attributes: ['name'],
            required:false   // left outer join
        }],
    }

    if (dateType && startDate && endDate) {
        endDate.setDate(endDate.getDate() + 1);
        endDate.setMilliseconds(endDate.getMilliseconds() - 1);

        if (startDate > endDate) {
            return res.status(errorCode.badRequest).json({});
        }

        switch (dateType) {
            case '1' :  query.where = { registration_date : { [Op.between]: [startDate, endDate] } }; break;
            case '2' :  query.where = { completion_date : { [Op.between]: [startDate, endDate] } }; break;
            default: break;
        }
    }

    if (req.query.search) {
        query.where = { 
            ...query.where,
            [Op.or] : [
                { application_title : { [Op.like]: "%" + req.query.search + "%"} },
                { application_field : { [Op.like]: "%" + req.query.search + "%"} },
                { customer : { [Op.like]: "%" + req.query.search + "%"} },
                OldService.sequelize.literal("`company`.`name`" + " LIKE '%" + req.query.search + "%'")
            ]
        }
    }

    let findResult;
    try {
        findResult = await OldService.findAll(query);
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
            items: [],
        });
    }

    let total_page = Math.ceil(total_count / limit);
    let offset = ((page > total_page ? total_page : page) - 1) * limit;

    let itemsQuery = {
        attributes: ['old_service_no', 'application_title', 'application_field', 'customer', 'company_no', 'registration_date', 'completion_date', 'created_at', 'updated_at'],
        order: [
            ['created_at', 'DESC'],
        ],
        offset: offset,
        limit: limit,
        //raw: true
    }

    if (query.where) { itemsQuery.where = query.where; }
    if (query.include) { itemsQuery.include = query.include; }
    
    let items;
    try {
        items = await OldService.findAll(itemsQuery);
    } catch (error) {
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let result = {
        total_count,
        total_page,
        current_page: offset/limit+1,
        offset,
        limit, 
        items, }

    return res.status(errorCode.ok).json(result);
});

/* 
 * POST : /oldservice/:oldservice_no
 * 기능설명 : 구 서비스 항목 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2021.01.14
 */
router.post('/new', verifyToken, async (req, res, next) => {
    const body = req.body;
    const user_no = req.decoded.user_no;
    const authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let inputResult;
    try {
        inputResult = await OldService.create({
            application_title: body.application_title,
            application_field: body.application_field,
            customer: body.customer,
            company_no: body.company_no,
            registration_date: body.registration_date,
            completion_date: body.completion_date,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        const errMsg = getErrMsg(error.errors[0]);
        return res.status(errMsg.code).json(errMsg.message);
    }

    if (!(inputResult instanceof OldService)) {
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.created).json({
        old_service_no: inputResult.dataValues.old_service_no
    });
});

/* 
 * GET : /oldservice/:old_service_no
 * 기능설명 : 구 서비스 항목 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2021.01.14
 */
router.get('/:old_service_no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let old_service_no = req.params.old_service_no;
    let authority_level = req.decoded.authority_level;

    OldService.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
    let result;
    try {
        result = await OldService.findOne({
            attributes: ['old_service_no', 'application_title', 'application_field', 'customer', 
                         'company_no', 'registration_date', 'completion_date', 'created_at', 'updated_at'],
            include: [{
                model: Company, 
                attributes: ['name'],
                required:false   // left outer join
            }],
        },{
            where: { old_service_no },
        });
    } catch (error) {
        console.error(error);
    }

    return res.json(result);
});

/* 
 * PUT : /oldservice/:oldservice_no
 * 기능설명 : 구 서비스 항목 내용 변경 
 * 작성자 : 이승민
 * 작성일 : 2020.01.14
 */
router.put('/:old_service_no', verifyToken, async (req, res, next) => {
    const body = req.body;
    const user_no = req.decoded.user_no;
    const old_service_no = req.params.old_service_no;
    const authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let updateResult;
    try {
        updateResult = await OldService.update({
            application_title: body.application_title,
            application_field: body.application_field,
            customer: body.customer,
            company_no: body.company_no,
            registration_date: body.registration_date,
            completion_date: body.completion_date,
            updated_user_no: user_no,
        }, {
            where: { old_service_no },
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }


    return res.status(errorCode.ok).json({});
});

router.post('/:old_service_no/files', verifyToken, upload.array('files'), async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let old_service_no = req.params.old_service_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    // 첨부파일
    //console.log('files len =', req.files.length);
    if (req.files.length > 0) {
        InsertFileInfo(user_no, old_service_no, req.files);
    }

    res.status(errorCode.ok).json({});
});

router.get('/:old_service_no/files', verifyToken, async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let old_service_no = req.params.old_service_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }
    
    let files = await SelectFileInfo(old_service_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }

    if (files.length > 0) {
        res.status(errorCode.ok).json({
            attached_file: files,
        });
    } else {
        res.status(errorCode.noContent).json({});
    }
});

router.get('/:old_service_no/file/:file_no', verifyToken, async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let old_service_no = req.params.old_service_no;
    let old_service_file_no = req.params.file_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let file_info;
    try {
        file_info = await OldServiceFile.findOne({
            attributes: ['old_service_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: { 
                old_service_file_no
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const file = file_info.dataValues.path + '/' + file_info.dataValues.name;

    res.download(file, file_info.dataValues.original_name, function(err) {
        if (err) {
            res.json({err:err});
        } else {
            res.end();
        }
    });
});

router.delete('/:old_service_no/file/:file_no', verifyToken, async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let old_service_no = req.params.old_service_no;
    let old_service_file_no = req.params.file_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let findResult;
    try {
        findResult = await OldServiceFile.findOne({
            where: { old_service_file_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json();
    }

    const filePath = path.join(findResult.dataValues.path, '/', findResult.dataValues.name);
    const result = fs.access(filePath, fs.constants.F_OK, (err) => { 
        if (err) { 
            return console.log('삭제할 수 없는 파일입니다');
        }

        const result = fs.unlink(filePath, (err) => { 
            if (err) {
                return console.log(err);
            }
        });
    });

    let deleteResult = 0;
    try {
        deleteResult = await OldServiceFile.destroy({
            where: { old_service_file_no }
        });
    } catch (error) {
        console.error('error');
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});




module.exports = router;
