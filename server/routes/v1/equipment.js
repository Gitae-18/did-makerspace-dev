'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');
const { Company, EquipmentCategory, EquipmentElement } = require('../../models');
const { Op } = require("sequelize");

const router = express.Router();

/* 
 * GET : /equipment/category
 * 기능설명 : 기자재 전체 품목 조회
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
    if (req.query.search) { my_where["model_name"] = { [Op.like]: "%" + req.query.search + "%"} }

    if (authority_level == 1) {
        return res.status(errorCode.internalServerError).json({});
    }

    let findResult;
    try {
        findResult = await EquipmentCategory.findAll({
            attributes: [[EquipmentCategory.sequelize.fn('count', '*'), 'count']],
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
         items = await EquipmentCategory.findAll({
            attributes: ['equipment_category_no', 'service_category_no', 'model_name', 'model_number', 'model_specification', 'purpose', 'created_at'],
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

router.get('/list/category', verifyToken, async (req, res, next) => {
    let find;
    try {
         find = await EquipmentCategory.findAll({
            attributes: ['equipment_category_no', 'service_category_no', 'model_name' ],
        });
    } catch (error) {
        console.error(error);
        const errMsg = getErrMsg(error.errors[0]);
        return res.status(errMsg.code).json(errMsg.message);
    }

    res.status(errorCode.ok).json({
        count: find.length,
        items: find
    });
});

/* 
 * post : /equipment/category
 * 기능설명 : 신규 기자재 품목 등록
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
        inputResult = await EquipmentCategory.create({
            model_name: body.model_name,
            model_number: body.model_number,
            service_category_no: body.service_category_no,
            model_specification: body.model_specification,
            purpose: body.purpose,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
    }
        
    if (!(inputResult instanceof EquipmentCategory)) {
        return res.status(errorCode.internalServerError).json({
            message: '생성 실패'
        });
    }

    return res.status(errorCode.ok).json({});
});

/* 
 * get : /equipment/category/:id
 * 기능설명 : 기자재 품목 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/category/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let equipment_category_no = req.params.id;

    let findResult;
    try {
        findResult = await EquipmentCategory.findOne({
            where: { equipment_category_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!findUser || findUser.length === 0) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 품목입니다.'
            });
        }
    }

    res.json(findResult.dataValues);
});

/* 
 * put : /equipment/category/:id
 * 기능설명 : 기자재 품목 수정
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.put('/category/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let equipment_category_no = req.params.id;

    console.log(body);

    let updateResult;
    try {
        updateResult = await EquipmentCategory.update({
            //model_name: body.model_name,
            service_category_no: body.service_category_no,
            //model_number: body.model_number,
            model_specification: body.model_specification,
            purpose: body.purpose,
            updated_user_no: user_no,
        }, {
            where: { equipment_category_no },
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!updateResult || updateResult == 0) {
            next(error);
        }
    }

    return res.status(errorCode.ok).json();
});

/* 
 * delete : /equipment/category/:id
 * 기능설명 : 기자재 품목 삭제
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.delete('/category/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let equipment_category_no = req.params.id;

    let deleteResult;
    try {
        deleteResult = await EquipmentCategory.destroy({
            where: { equipment_category_no }
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

router.get('/list/category', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    let find;
    try {
        find = await EquipmentCategory.findAll({
            attributes: ['equipment_category_no', 'model_name'],
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 

    res.status(errorCode.ok).json({
        count: find.length,
        items: find
    });
});

/* 
 * GET : /equipment/element
 * 기능설명 : 기자재 전체 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/element/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);

    let my_where = { };
    if (req.query.search) { my_where["serial_number"] = { [Op.like]: "%" + req.query.search + "%"} }

    if (authority_level == 1) {
        return res.status(errorCode.internalServerError).json({});
    }

    let findResult;
    try {
        findResult = await EquipmentElement.findAll({
            attributes: [[EquipmentElement.sequelize.fn('count', '*'), 'count']],
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
    EquipmentElement.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
    EquipmentElement.hasOne(EquipmentCategory, {foreignKey: 'equipment_category_no', sourceKey: 'equipment_category_no'});
    try {
         items = await EquipmentElement.findAll({
            attributes: ['equipment_element_no', 'equipment_category_no', 'company_no', 'serial_number', 'asset_flag', 'note_content', 'created_at', 'updated_at'],
            include: [{
                model: EquipmentCategory, 
                attributes: ['model_name'],
                required:false   // left outer join
            },{
                model: Company, 
                attributes: ['name'],
                required:false   // left outer join
            }],
            order: [
                ['created_at', 'DESC'],
            ],
            where:my_where,
            offset: offset,
            limit: limit,
            raw: true
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    for (let i = 0; i < items.length; i++) {
        items[i]['model_name'] = items[i]['equipment_category.model_name'];
        delete items[i]['equipment_category.model_name'];
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

    res.status(errorCode.ok).json(result);
});

/* 
 * post : /equipment/element
 * 기능설명 : 신규 기자재 등록
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.post('/element/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    let inputResult;
    try {
        inputResult = await EquipmentElement.create({
            equipment_category_no: body.equipment_category_no,
            company_no: body.company_no,
            serial_number: body.serial_number,
            asset_flag: body.asset_flag,
            ip: body.ip,
            port: body.port,
            note_content: body.note_content,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!(inputResult instanceof EquipmentElement)) {
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});

/* 
 * get : /equipment/element/:id
 * 기능설명 : 기자재 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/element/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let equipment_element_no = req.params.id;

    let findResult;
    try {
        findResult = await EquipmentElement.findOne({
            where: { equipment_element_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!findUser || findUser.length === 0) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 기업입니다.'
            });
        }
    }

    res.json(findResult.dataValues);
});

/* 
 * put : /equipment/element/:id
 * 기능설명 : 기자재 수정
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.put('/element/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let equipment_element_no = req.params.id;

    let updateResult;
    try {
        updateResult = await EquipmentElement.update({
            //model_name: body.model_name,
            company_no: body.company_no,
            serial_number: body.serial_number,
            asset_flag: body.asset_flag,
            ip: body.ip,
            port: body.port,
            note_content: body.note_content,
            updated_user_no: user_no,
        }, {
            where: { equipment_element_no },
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
 * delete : /equipment/element/:id
 * 기능설명 : 기자재 삭제
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.delete('/element/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let equipment_element_no = req.params.id;

    let deleteResult;
    try {
        deleteResult = await EquipmentElement.destroy({
            where: { equipment_element_no }
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

router.get ('/equipmentlist',async(req,res,next)=>{
    let body = req.body;
    let equipment_category_no = req.params.equipment_category_no;
    

    
    let equipment_list;
    try{
        equipment_list = await EquipmentCategory.findAll({
            attributes:['model_name','equipment_category_no','model_number','model_specification','reservation_available','location'],
            where:{
                reservation_available : 'Y' 
            },
            order:[
                ['created_at','ASC']
            ],
            required:false,
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    return res.json(equipment_list);
})

router.get ('/categorylist',verifyToken, async(req,res,next)=>{
    let body = req.body;
    let equipment_category_no = req.params.equipment_category_no;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);

    let my_where = { };
    if (req.query.search) { my_where["model_name"] = { [Op.like]: "%" + req.query.search + "%"} }

  
  

    let findResult;
    try {
        findResult = await EquipmentCategory.findAll({
            attributes: [[EquipmentCategory.sequelize.fn('count', '*'), 'count']],
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
         items = await EquipmentCategory.findAll({
            attributes: ['model_name','equipment_category_no','model_number','model_specification','reservation_available','location'],
            order: [
                ['equipment_category_no','ASC'],
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

    let result = {
        total_count,
        total_page,
        current_page: offset/limit+1,
        offset,
        limit,
        items,
    } 
 
    return res.status(errorCode.ok).json(result);



    /* let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);

    let my_where = { };
    if (req.query.search) { my_where["model_name"] = { [Op.like]: "%" + req.query.search + "%"} }

    if (authority_level == 1) {
        return res.status(errorCode.internalServerError).json({});
    }

    let findResult;
    try {
        findResult = await EquipmentCategory.findAll({
            attributes: [[EquipmentCategory.sequelize.fn('count', '*'), 'count']],
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
         items = await EquipmentCategory.findAll({
            attributes: ['equipment_category_no', 'service_category_no', 'model_name', 'model_number', 'model_specification', 'purpose', 'created_at'],
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

    let result = {
        total_count,
        total_page,
        current_page: offset/limit+1,
        offset,
        limit,
        items,
    } */

    //return res.status(errorCode.ok).json(result);

   /* let equipment_list;
    try{
        equipment_list = await EquipmentCategory.findAll({
            attributes:['model_name','equipment_category_no','model_number','model_specification','reservation_available','location'],
            order:[
                ['equipment_category_no','ASC']
            ],
            required:false,
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    } */
     /*  const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 20 : Number(req.query.limit);
    let totalCount = equipment_list[0].datavalues.count;
    let totalPage = Math.ceil(totalCount / limit);
    let offset = ((page > totalPage ? totalPage : page) -1 ) * limit; */


})

module.exports = router;
