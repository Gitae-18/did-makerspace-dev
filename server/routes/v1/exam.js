'use strict';

const express = require('express');

const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');

const { User ,Company, EquipmentCategory,UserEquipmentTestPass,ExamChoice,ExamQuestion} = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const moment = require('moment');
const { token } = require('morgan');
const { sequelize } = require('../../models/index');

const router = express.Router();

router.get("/examlist"/* ,verifyToken */, async(req,res,next) =>{
    let body=req.body;
    const examtype=req.query.examtype;
    let item;
    
    try{
        item = await ExamQuestion.findAll({
            attributes:['question_no','question_title','answer','pic_src'],
            where:{exam_type:examtype},
            /* order:sequelize.random(), */
            raw:true,
           // required:false,
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(item);
})
router.get('/bogilist',async(req,res,next)=>{
    const examtype = req.query.examtype;

    let answer;
    try{
        answer = await ExamChoice.findAll({
            attributes:['choice_no','content','question_no','exam_type'],
            where:{exam_type:examtype},
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(answer);
})
module.exports = router;