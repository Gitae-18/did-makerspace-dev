'use strict';

const express = require('express');
const { verifyToken, errorCode, authLevel } = require('../../middlewares/middlewares');
const { User, Company }= require('../../models');
const { Op } = require("sequelize");

const router = express.Router();

/* 
 * GET : /company
 * 기능설명 : 기업 전체 목록 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 5 : Number(req.query.limit);

    let my_where = { partner_flag: 'Y' };
    if (req.query.search) { my_where["name"] = { [Op.like]: "%" + req.query.search + "%"} }

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let findResult;
    try {
        findResult = await Company.findAll({
            attributes: [[Company.sequelize.fn('count', '*'), 'count']],
            //where: { partner_flag: 'Y' },
            where: my_where
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

    Company.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    let items;
    try {
        items = await Company.findAll({
            attributes: ['company_no', 'name', 'address', 'address_detail', 'user_no',
                'registration_number', 'telephone_number', 'created_at', 'updated_at'],
            order: [
                ['created_at', 'DESC'],
            ],
            include: [{
                model: User, 
                attributes: ['name'],
                required:false   // left outer join
            }],
            //where: { partner_flag: 'Y' },
            where: my_where,
            offset: offset,
            limit: limit,
            raw: false 
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

// 회사명 가져오기
router.get('/companyno', verifyToken, async(req,res) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let company_no = req.params.company_no;
    let query = {
        attributes: ['company_no', 'name'],
        where: { partner_flag: 'Y' },
    }
    let companyInfo;
    try{
        companyInfo= await Company.findAll(query);
       
    }
    catch(error){
        console.log(error);return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({
        items: companyInfo
    });
   //return   res.json(companyInfo);
})
router.get('/list/partner/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    let query = {
        attributes: ['company_no', 'name'],
        where: { partner_flag: 'Y' },
    }

    let find;
    try {
        find = await Company.findAll(query);
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
 * post : /company
 * 기능설명 : 신규 기업 등록
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.post('/', verifyToken, async (req, res, next) => {
    const body = req.body;
    const user_no = req.decoded.user_no;
    const authority_level = req.decoded.authority_level;

    let inputResult;
    try {
        inputResult = await Company.create({
            name: body.co_name,
            registration_number: body.co_number,
            telephone_number: body.co_telephone,
            business_field: body.co_business,
            zip: body.co_zip,
            address: body.co_address,
            address_detail: body.co_address_detail,
            partner_flag: 'Y',
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
    }

    if (!(inputResult instanceof Company)) {
        return res.status(errorCode.internalServerError).json({});
    }


    res.status(errorCode.ok).json({});
});

/* 
 * get : /company/:id
 * 기능설명 : 기업 개별 조회
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.get('/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let company_no = req.params.id;


    let findResult;
    try {
        findResult = await Company.findOne({
            where: { company_no }
        });
    } catch (error) {
        console.error(error);
    } finally {
        if (!findResult || findResult.length === 0) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 기업입니다.'
            });
        }
    }

    res.json(findResult.dataValues);
});

/* 
 * put : /company/:id
 * 기능설명 : 기업 정보 수정
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.put('/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let company_no = req.params.id;

    let updateResult;
    try {
        updateResult = await Company.update({
            name: body.co_name,
            registration_number: body.co_number,
            telephone_number: body.co_telephone,
            business_field: body.co_business,
            zip: body.co_zip,
            address: body.co_address,
            address_detail: body.co_address_detail,
            user_no: body.partner_user_no,
            updated_user_no: user_no,
        }, {
            where: { company_no },
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
 * delete : /company/:id
 * 기능설명 : 기업 정보 삭제
 * 작성자 : 이승민
 * 작성일 : 2020.05.30
 */
router.delete('/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let company_no = req.params.id;

    let deleteResult;
    try {
        deleteResult = await Company.destroy({
            where: { company_no }
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

module.exports = router;
