'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, upload, makedir, SendMail } = require('../../middlewares/middlewares');
const {User ,Company,Notice,Faq} = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
/* const jwt = require('jsonwebtoken');
const { FindMaterialItem, AddMaterialUsage, UpdateMaterialUsage, AddServiceElementAttempt, 
    AddEquipAndMaterialUsage, RemoveEquipAndMaterialUsage} = require('../../middlewares/dbapi'); */
const { raw } = require('body-parser');

const router = express.Router();

router.post('/faqs',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

    let result;
    try{
        result = await Faq.create({
            title:body.title,
            content:body.content,
            created_user_no: user_no,
            updated_user_no: user_no,
    })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }

})
router.get('/faqlist',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let result;

    try{
        result = await Faq.findAll({
            attributes:['faq_no','title','created_at','hit'],
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.put('/faq_cnt',async(req,res,next)=>{
    const {hit,faq_no} = req.body;
    let hit_update
    try {
        hit_update = await Faq.update({
            hit:hit+1,
        },
        {
            where:{faq_no}
        })
        return res.send(hit_update);
    } catch (error) {
        console.log(error);
    }
})

router.get('/:faq_no/detail',verifyToken,async(req,res,next)=>{
    let faq_no = req.params.faq_no;

    let result;
    try{
        result = await Faq.findOne({
            attributes:["title","content","attached_file"],
            where:{faq_no},
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
module.exports = router;