'use strict';

const express = require('express');

const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');

const { User ,Company, EquipmentElement, EquipmentCategory, Space , ClasseduProgram } = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const { token } = require('morgan');

const router = express.Router();


router.post('/classedu_add',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    
    let inpurtResult
    try{
        inpurtResult  = await ClasseduProgram.create({
           reservation_no : body.reservation_no,
           reservation_status:body.reservation_status,
           reservation_date:body.reservation_date,
           equipment_category_no:body.equipment_category_no,
           created_user_no: user_no,
           updated_user_no: user_no,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
})

module.exports = router;