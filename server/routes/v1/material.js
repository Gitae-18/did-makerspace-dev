'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, SendMail } = require('../../middlewares/middlewares');
const { MaterialCategory, MaterialItem, MaterialUsage, Company, User }= require('../../models');
const { Op } = require("sequelize");

const router = express.Router();

const { FindMaterialItem, AddMaterialUsage } = require('../../middlewares/dbapi');

/* 
 * GET : /material
 * 기능설명 : 자재 전체 목록 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/item/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level == 1) {
        return res.status(errorCode.internalServerError).json({});
    }

    /*
    let page = undefined;
    let limit = undefined;

    if (req.query.page) {
        page = Number(req.query.page);
        limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);
    }
    */

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);
    const material_category_no = (req.query.category) ? Number(req.query.category) : undefined;

    let my_where = { };
    if (req.query.search) { my_where["name"] = { [Op.like]: "%" + req.query.search + "%"} }
    if (material_category_no > -1) {
        my_where["material_category_no"] = material_category_no === 0 ? null : material_category_no;
    }

    let findResult;
    try {
        findResult = await MaterialItem.findAll({
            attributes: [[MaterialItem.sequelize.fn('count', '*'), 'count']],
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

    let total_page = undefined;
    let offset = undefined;
    let current_page = undefined;

    if (req.query.page) {
        total_page = Math.ceil(total_count / limit);
        offset = ((page > total_page ? total_page : page) - 1) * limit;
        current_page = offset / limit+1;
    }

    let items;
    MaterialItem.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
    MaterialItem.hasOne(MaterialCategory, {foreignKey: 'material_category_no', sourceKey: 'material_category_no'});
    try {
         items = await MaterialItem.findAll({
            attributes: ['material_item_no', 'material_category_no', 'equipment_category_no', 'quantity', 'unit', 'name', 'company_no', 'seller', 'phone_number', 'comment', 'created_at', 'updated_at'],
            include: [{
                model: Company, 
                attributes: ['name'],
                required:false   // left outer join
            },{
                model: MaterialCategory, 
                attributes: ['name'],
                required:false   // left outer join
            }],
            order: [
                ['created_at', 'DESC'],
            ],
            where: my_where,
            offset: offset,
            limit: limit,
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let result = {
        total_count,
        total_page,
        current_page,
        offset,
        limit,
        items,
    }

    return res.status(errorCode.ok).json(result);
});

/* 
 * post : /material/item/
 * 기능설명 : 신규 자재 등록
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.post('/item/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let inputResult;
    try {
        inputResult = await MaterialItem.create({
            name: body.name,
            material_category_no: body.material_category_no,    // 2021-03-29 추가
            equipment_category_no: body.equipment_category_no,
            quantity: body.quantity,
            unit: body.unit,
            company_no: body.company_no,
            seller: body.seller,
            phone_number: body.phone_number,
            comment: body.comment,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error.errors);
        const errMsg = getErrMsg(error.errors[0]);
        return res.status(errMsg.code).json(errMsg.message);
    }

    if (!(inputResult instanceof MaterialItem)) {
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});

/* 
 * get : /material/item/:id
 * 기능설명 : 자재 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/item/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_item_no = req.params.id;

    let findResult;
    try {
        findResult = await MaterialItem.findOne({
            where: { material_item_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!findResult) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 자재입니다.'
            });
        }
    }

    res.json(findResult.dataValues);
});

/* 
 * put : /material/item/:id
 * 기능설명 : 자재 정보 수정
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.put('/item/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_item_no = req.params.id;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let updateResult;
    console.log('no = ', material_item_no, body);
    try {
        updateResult = await MaterialItem.update({
            name: body.name,
            material_category_no: body.material_category_no ? body.material_category_no : null,    // 2021-03-29 추가
            equipment_category_no: body.equipment_category_no ? body.equipment_category_no : null,
            quantity: body.quantity,
            unit: body.unit,
            company_no: body.company_no,
            seller: body.seller,
            phone_number: body.phone_number,
            comment: body.comment,
            updated_user_no: user_no,
        }, {
            where: { material_item_no },
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!updateResult || updateResult == 0) {
            next(error);
        }
    }

    res.status(errorCode.ok).json({});
});

/* 
 * delete : /material/item/:id
 * 기능설명 : 자재 정보 삭제
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.delete('/item/:id', verifyToken, async (req, res, next) => {
    let body = req.body; let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_item_no = req.params.id;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let deleteResult;
    try {
        deleteResult = await MaterialItem.destroy({
            where: { material_item_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!deleteResult || deleteResult == 0) {
            next(error);
        }
    }

    res.json({
        code: 200,
    });
});

/* 
 * GET : /material/usage/
 * 기능설명 : 자재 전체 목록 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/usage/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    let query = {
        /*
        attributes: ['equipment_category_no', 'model_name', 'model_number',
                     'model_specification', 'purpose', 'created_at'],
                     */
        order: [
            ['equipment_category_no', 'DESC'],
        ],
        limit: 10
    }

    query.offset = 0;

    let findResult;
    try {
        findResult = await MaterialUsage.findAll(query);
    } catch (error) {
        console.error(error);
    } finally {
        if (!findResult) {
            next(error);
        }
    }

    res.json(findResult.dataValues);
});

/* 
 * post : /material/usage/
 * 기능설명 : 신규 자재 등록
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.post('/usage/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json();
    }

    const result = await AddMaterialUsage(user_no, undefined, body.material_item_no, 'BUY',
                                          body.quantity, body.request_content);

    //---- email
    if (result === errorCode.noContent) {

        let findMaterialItem;
        try {
            findMaterialItem = await MaterialItem.findOne({
                where: { material_item_no: body.material_item_no }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json();
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

        if (find_email.length > 0 && findMaterialItem) {
            let email = [];
            for (let i = 0; i < find_email.length; i++) {
                email.push(find_email[i].dataValues.email);
            }

            SendMail(email,
                '자재 구매요청 안내', 
                '자재 [ ' + findMaterialItem.name + ' ]를 ' + body.quantity + '(' + findMaterialItem.unit + ') 만큼 구매요청 하였습니다.\n');
        }
    }

    res.status(result).json();
});

/* 
 * get : /material/usage/:id
 * 기능설명 : 자재 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/usage/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_usage_no = req.params.id;

    let findResult;
    try {
        findResult = await MaterialUsage.findOne({
            where: { material_usage_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!findResult) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 자재이용입니다.'
            });
        }
    }

    res.json(findResult.dataValues);
});

/* 
 * put : /material/usage/:id
 * 기능설명 : 자재 정보 수정
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.put('/usage/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_usage_no = req.params.id;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let updateResult;
    try {
        updateResult = await MaterialUsage.update({
            material_item_no: body.material_item_no,
            sortation: body.sortation,
            service_element_attempt_no: body.service_element_attempt_no,
            quantity: body.quantity,
            status: body.status,
            request_content: body.request_content,
            reject_content: body.reject_content,
            updated_user_no: user_no,
        }, {
            where: { material_usage_no },
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 

    /*
    if (!updateResult || updateResult == 0) {
        return res.status(errorCode.internalServerError).json({});
    }
    */

    return res.status(errorCode.ok).json(result);
});

/* 
 * delete : /material/usage/:id
 * 기능설명 : 자재 정보 삭제
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.delete('/usage/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_usage_no = req.params.id;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let deleteResult;
    try {
        deleteResult = await MaterialUsage.destroy({
            where: { material_usage_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!deleteResult || deleteResult == 0) {
            next(error);
        }
    }

    res.json({
        code: 200,
    });
});

router.get('/list/item/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level == 1) {
        return res.status(errorCode.internalServerError).json({});
    }

    let find;
    try {
        find = await MaterialItem.findAll({
            attributes: [['material_item_no', 'item_no'], ['material_category_no', 'category_no'], /*'unit',*/ 'name'],
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 

    res.status(errorCode.ok).json(find);
});

/* 
 * get : /material/usage/item/:id
 * 기능설명 : 자재 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/usage/item/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_item_no = req.params.id;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);

    if (authority_level == 1) {
        return res.status(errorCode.internalServerError).json({});
    }

    let my_where = { material_item_no }
    const startDate = req.query.sdate ? new Date(req.query.sdate) : undefined;
    const endDate = req.query.edate ? new Date(req.query.edate) : undefined;
    if (startDate && endDate) {
        endDate.setDate(endDate.getDate() + 1);
        endDate.setMilliseconds(endDate.getMilliseconds() - 1);

        if (startDate > endDate) {
            return res.status(errorCode.badRequest).json({});
        }

        my_where["created_at"] = { [Op.between]: [startDate, endDate] };
    }

    let findResult;
    try {
        findResult = await MaterialUsage.findAll({
            attributes: [[MaterialUsage.sequelize.fn('count', '*'), 'count']],
            //where: { material_item_no }
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
    MaterialUsage.hasOne(Company, {foreignKey: 'material_item__no', sourceKey: 'material_item_no'});
    MaterialUsage.hasOne(User, {foreignKey: 'user_no', sourceKey: 'created_user_no'});
    User.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
    //MaterialItem.hasOne(User, {foreignKey: 'created_user_no', sourceKey: 'created_user_no'});
    try {
        items = await MaterialUsage.findAll({
            attributes: ['material_usage_no', 'material_item_no', 'sortation', 'service_element_attempt_no', 'quantity', 'status', 'request_content', 'reject_content', 'created_at', 'updated_at', 'created_user_no'],
            include: [{
                model: User, 
                attributes: ['name', 'company_no'],
                required:false,   // left outer join
                include: [{
                    model: Company, 
                    attributes: ['name'],
                    required:false,   // left outer join
                }]
            }],
            order: [
                ['created_at', 'DESC'],
            ],

            //where: { material_item_no },
            where: my_where,
            offset: offset,
            limit: limit,
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

router.post('/usage/:id/confirm', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_usage_no = req.params.id;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    if (body.confirm === 'END') {
        let findResult;
        try {
            findResult = await MaterialUsage.findOne({
                attributes: ['material_item_no' ],
                where: { material_usage_no }
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json();
        }

        const material_item_no = findResult.material_item_no;
        console.log(material_item_no);

        findResult = await FindMaterialItem(material_item_no);
        if (!findResult) { return errorCode.internalServerError; }

        const oldStock = findResult.dataValues.quantity;
        const newStock = oldStock + body.quantity;

        let updateResult;
        try {
            updateResult = await MaterialItem.update({
                quantity: newStock,
                updated_user_no: user_no,
            }, {
                where: { material_item_no },
            });
        } catch (error) {
            console.error(error);
            return errorCode.internalServerError;
        }
    }

    let updateResult;
    try {
        updateResult = await MaterialUsage.update({
            status: body.confirm,
            reject_content: body.reject_content,
            quantity: body.confirm === 'END' ? body.quantity : undefined,
            updated_user_no: user_no,
        }, {
            where: { material_usage_no },
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 

    return res.status(errorCode.ok).json({});
});

/*------------------*/

/* 
 * GET : /material/category
 * 기능설명 : 자재 전체 목록 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/category/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);

    let my_where = { };
    if (req.query.search) { my_where["name"] = { [Op.like]: "%" + req.query.search + "%"} }

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let findResult;
    try {
        findResult = await MaterialCategory.findAll({
            attributes: [[MaterialCategory.sequelize.fn('count', '*'), 'count']],
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
    try {
         items = await MaterialCategory.findAll({
            attributes: ['material_category_no', 'name', 'code', 'created_at', 'updated_at'],
            order: [
                ['created_at', 'DESC'],
            ],
            where: my_where,
            offset: offset,
            limit: limit,
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
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
 * post : /material/category/
 * 기능설명 : 신규 자재 분류 등록
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.post('/category/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let inputResult;
    try {
        inputResult = await MaterialCategory.create({
            name: body.name,
            code: body.code,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error.errors);
        const errMsg = getErrMsg(error.errors[0]);
        return res.status(errMsg.code).json(errMsg.message);
    }

    if (!(inputResult instanceof MaterialCategory)) {
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.created).json({});
});

/* 
 * get : /material/cateogry/:id
 * 기능설명 : 자재 분류 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/category/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_category_no = req.params.no;

    let findResult;
    try {
        findResult = await MaterialCategory.findOne({
            where: { material_category_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!findResult) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 자재분류 입니다.'
            });
        }
    }

    res.status(errorCode.ok).json(findResult.dataValues);
});

/* 
 * put : /material/category/:no
 * 기능설명 : 자재 분류 수정
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.put('/category/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_category_no = req.params.no;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let updateResult;
    try {
        updateResult = await MaterialCategory.update({
            name: body.name,
            updated_user_no: user_no,
        }, {
            where: { material_category_no },
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!updateResult || updateResult == 0) {
            next(error);
        }
    }

    res.status(errorCode.noContent).json({});
});

/* 
 * delete : /material/cateogry/:no
 * 기능설명 : 자재 분류 삭제
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.delete('/category/:no', verifyToken, async (req, res, next) => {
    let body = req.body; let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let material_category_no = req.params.no;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let deleteResult;
    try {
        deleteResult = await MaterialCategory.destroy({
            where: { material_category_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!deleteResult || deleteResult == 0) {
            next(error);
        }
    }

    res.status(errorCode.noContent).json({});
});

router.get('/list/category/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    let find;
    try {
        find = await MaterialCategory.findAll({
            attributes: ['material_category_no', 'name', 'code' ],
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 

    res.status(errorCode.ok).json(find);
});

module.exports = router;
