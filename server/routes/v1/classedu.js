'use strict';

const express = require('express');

const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');

const { User ,Company, EquipmentElement, EquipmentCategory, Space , ClasseduProgram ,ClasseduApplication } = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const { token } = require('morgan');

const router = express.Router();


router.get('/edulist',verifyToken,async(req,res,next)=>{
    let body = req.body;
    const type = req.query.type;
   
    let result ;
    try{
        result = await ClasseduProgram.findAll({
            attributes:['program_no','type','hit','content','title','cost','pay_flag','place','class_period_start','class_period_end','application_period_start','application_period_end','limit_number','popup_flag'],
            where:{type:type},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(result);
})

router.get('/classedulist',verifyToken,async(req,res,next)=>{
    let body = req.body;
   
    let result ;
    try{
        result = await ClasseduProgram.findAll({
            attributes:['program_no','type','hit','content','title','cost','pay_flag','place','class_period_start','class_period_end','application_period_start','application_period_end','limit_number','popup_flag'],
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(result);
})
/* router.post('/classadd',async(req,res,next)=>{
    let body = req.body;
    const input = req.body;
    let inputResult
    try{
        inputResult  = await ClasseduProgram.create({
           title:body.title,
           type:body.type,
           content:body.content,
           pay_flag:body.pay_flag,
           class_period_start:body.class_period_start,
           class_period_end:body.class_period_end,
           application_preiod_start :body.application_period_start,
           application_period_end: body.application_period_end,
           place:body.place,
           limit_number:body.limit_number,
           cost : body.cost,
           map_url : body.map,
           hit : body.hit,
           popup_flag : body.popup_flag,
        })
    }
    catch(error){
        console.log(error)
    }

}) */
/* router.post('/classadd',async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;



    let inputResult
    try{
        inputResult  = await ClasseduProgram.create({
           title:1,
           type:1,
           content:1,
           pay_flag:1,
           class_period_start:1,
           class_period_end:1,
           application_preiod_start :1,
           application_period_end: 1,
           place:1,
           limit_number:1,
           cost : 1,
           map_url : 1,
           hit : 1,
           popup_flag : 1,
           created_user_no: user_no,
           updated_user_no: user_no,
        })
    }
    catch(error){
        console.log(error)
       /*  return res.status(errorCode.internalServerError).json({}); */
/*     }
})  */
router.post('/class_application',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let inpurtResult
    console.log(body)
    try{
        inpurtResult  = await ClasseduApplication.create({
           classedu_type:body.type,
           title:body.title,
           flag:body.flag,
           created_user_no: user_no,
           updated_user_no: user_no,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
})

router.post('/addprogram',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

    let inputResult
    try{
        inputResult  = await ClasseduProgram.create({
           title:body.title,
           type:body.type,
           content:body.text,
           pay_flag:body.pay_flag,
           class_period_start:body.class_period_start,
           class_period_end:body.class_period_end,
           application_preiod_start :body.application_period_start,
           application_period_end: body.application_period_end,
           place:body.place,
           limit_number:body.limit_number,
           cost : body.cost,
           map_url : body.map,
           popup_flag : body.popup_flag,
           created_user_no:user_no,
           updated_user_no:user_no,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
})
router.put('/classedu_cnt',async(req,res,next)=>{
    const {hit,program_no} = req.body;
    let hit_update
    try {
        hit_update = await ClasseduProgram.update({
            hit:hit+1,
        },
        {
            where:{program_no}
        })
        return res.send(hit_update);
    } catch (error) {
        console.log(error);
    }
})
router.get('/class_receive',verifyToken,async(req,res,next)=>{
    const no = req.query.no;
    let result ;
    try{
        result = await ClasseduProgram.findOne({
            attributes:['content','title','cost','pay_flag','place','class_period_start','class_period_end','application_period_start','application_period_end','limit_number'],
            where:{program_no:no},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})

router.get('/class_application',verifyToken,async(req,res,next)=>{
    const title = req.query.title;
    let result;
    try{
        result = await ClasseduApplication.findAll({
            attributes:['application_no'],
            where:{title:title},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }    res.status(errorCode.ok).json(result);
})

router.get('/myclass_application',verifyToken,async(req,res,next)=>{
    const title = req.query.title;
    let user_no = req.decoded.user_no
    let result;
    try{
        result = await ClasseduApplication.findAll({
            attributes:['application_no','classedu_type','title','flag','created_at'],
            where:{created_user_no:user_no},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }    res.status(errorCode.ok).json(result);
})
module.exports = router;