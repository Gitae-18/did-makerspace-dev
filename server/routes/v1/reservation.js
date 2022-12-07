'use strict';

const express = require('express');

const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');

const { User ,Company, EquipmentElement, EquipmentCategory, Space ,EquipmentReservation} = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const { token } = require('morgan');

const router = express.Router();

router.post('/datetime',async(req,res,next)=>{
    const {resrevation_date,reservation_status} = req.body
    let user_no = req.decoded.user_no;
    

    if (user_no === undefined || user_no < 1) {
        return res.status(errorCode.notAcceptable).json({});
    }
    let inputResult;
    try{
        inputResult = await EquipmentReservation.create({
            equipment_reservation_no:req.reservation_no,
            equipment_element_no:req.element_no,
            user_no,
        })
    }
    catch{

    }
})

// 예약 내역 GET
router.get('/equipment',verifyToken, async(req,res,next)=>{   
    /*
    const date = (req.query.date === undefined) ? moment(new Date()).format("YYYY-MM-DD") : (req.query.date);
   // let user_no = req.decoded.user_no;
    
    let result ;
    try{
        result = await EquipmentReservation.findOne({
            attributes:['equipment_reservation_no','reservation_status','reservation_date'],
            where:{reservation_date:{[Op.like]:`${date}%`}},
            raw:true
        })
        //res.json({result})
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    
    console.log(result)
    */
    res.status(errorCode.ok).json({});
})


// 장비 예약 내역 POST
router.post('/equipment_reserv', verifyToken, async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    console.log(body.reservation_date)
    console.log(body.reservation_status)

    
  /*   let userInfo 
    try{
        userInfo = await User.findOne({
            attributes:['']
        })
    }
    catch(error){
        console.log(error);
    } */
    let inpurtResult
    try{
        inpurtResult  = await EquipmentReservation.create({
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

    res.status(errorCode.ok).json({});
})

module.exports = router;