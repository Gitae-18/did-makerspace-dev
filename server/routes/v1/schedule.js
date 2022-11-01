'use strict';

const express = require('express');
const { verifyToken, errorCode, authLevel } = require('../../middlewares/middlewares');
const { User, Company, Schedule } = require('../../models');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/date/:date', verifyToken, async (req, res, next) => {
    const body = req.body;
    const user_no = req.decoded.user_no;
    const authority_level = req.decoded.authority_level;
    const targetDate = req.params.date;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    const date = new Date(targetDate);
    date.setDate(15);
    const startDate = date.setMonth(date.getMonth() - 1);
    const endDate = date.setMonth(date.getMonth() + 2);

    Schedule.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    User.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
    
    let findResult;
    try {
        findResult = await Schedule.findAll({
            attributes:[['schedule_no', 'id'], 'user_no', 'title', 
                [sequelize.fn('date_format', sequelize.col('start_date'), '%Y-%m-%d'), 'start'],
                [sequelize.fn('date_format', sequelize.col('end_date'), '%Y-%m-%d'), 'end']],
            include: [{
                model: User, 
                attributes: ['company_no'],
                required:false,   // left outer join
                /*
                include: [{
                    model: Company, 
                    attributes: ['name'],
                    required:false   // left outer join
                }]
                */
            }],
            where: { start_date: { [Op.between]: [startDate, endDate] } },
            order: [['start_date', 'ASC']],
            raw: false 
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(findResult);
});

router.post('/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    if (body.title.length < 1) {
        return res.status(errorCode.badRequest).json({
            message: '내용이 없습니다.'
        });
    }

    let inputResult;
    try {
        inputResult = await Schedule.create({
            user_no,
            title: body.title,
            start_date: body.start_date,
            end_date: body.end_date,
            created_user_no: user_no,
            updated_user_no: user_no,
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!(inputResult instanceof Schedule)) {
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({
        schedule_no: inputResult.dataValues.schedule_no, 
        user_no
    });
});

router.get('/id/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let schedule_no = req.params.no;

    res.status(errorCode.ok).json();
});

router.put('/id/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let schedule_no = req.params.no;

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    if (isNaN(schedule_no) || schedule_no < 1) {
        return res.status(errorCode.badRequest).json({
            message: '수정할 수 없습니다.'
        });
    }

    if (body.title.length < 1) {
        return res.status(errorCode.badRequest).json({
            message: '내용이 없습니다.'
        });
    }

    let query = {};
    if (authority_level < authLevel.scheduler) {
        query.where = { schedule_no, user_no };
    } else {
        query.where = { schedule_no };
    }

    let updateResult;
    try {
        updateResult = await Schedule.update({
            title: body.title,
            updated_user_no: user_no
        }, query);
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json();
});

router.delete('/id/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let schedule_no = Number(req.params.no);

    if (authority_level < authLevel.partner) {
        return res.status(errorCode.notAcceptable).json({});
    }

    if (isNaN(schedule_no) || schedule_no < 1) {
        return res.status(errorCode.badRequest).json({
            message: '삭제할 수 없습니다.'
        });
    }

    let query = {};
    if (authority_level < authLevel.scheduler) {
        query.where = { schedule_no, user_no };
    } else {
        query.where = { schedule_no };
    }

    let deleteResult = 0;
    try {
        deleteResult = await Schedule.destroy(query);
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (deleteResult == 0) {
        return res.status(errorCode.badRequest).json({
            message: '다른 사용자가 등록한 내용입니다.'
        });
    }

    res.status(errorCode.ok).json();
});


module.exports = router;
