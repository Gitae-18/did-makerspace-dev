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

/* router.post('/datetime',async(req,res,next)=>{
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
}) */

// 예약 내역 GET
router.get('/equipment',verifyToken, async(req,res,next)=>{   
    
    const date = (req.query.date === undefined) ? moment(new Date()).format("YYYY-MM-DD") : (req.query.date);
    console.log(req.query.date)
    const category = (req.query.category === undefined) ? 0 : (req.query.category);
    let result ;
    try{
        result = await EquipmentReservation.findOne({
            attributes:['equipment_reservation_no','reservation_status','reservation_date','reservation_time'],
            where:{equipment_category_no:category,reservation_date:{[Op.like]:`${date}%`}},
            raw:true
        })
        
            res.json(result);
       
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    
   // res.status(errorCode.ok).json({});
})

//내 예약정보 GET
router.get('/myreserv',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    EquipmentReservation.hasOne(EquipmentCategory,{ foreignKey: 'equipment_category_no' , sourceKey: 'equipment_category_no'})
    let result ;
    try{
        result = await EquipmentReservation.findAll({
            attributes:['created_at','created_user_no','reservation_date','reservation_time'],
            include:[{model:EquipmentCategory,attributes:['model_name','model_specification','location']}],
            where:{created_user_no:user_no},
            order:[['created_at','DESC']],
            required:false,
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    for (let i = 0; i < result.length; i++) {
        result[i]['model_name'] = result[i]['equipment_category.model_name'];
        delete result[i]['equipment_category.model_name'];
    }
        for (let i = 0; i < result.length; i++) {
        result[i]['specification'] = result[i]['equipment_category.model_specification'];
        delete result[i]['equipment_category.model_specification'];
    }
        for (let i = 0; i < result.length; i++) {
        result[i]['location'] = result[i]['equipment_category.location'];
        delete result[i]['equipment_category.location'];
    }
  
    res.json(result);
})

// 장비 예약 내역 POST
router.post('/equipment_reserv', verifyToken, async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

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
           user_no:user_no,
           reservation_status:body.reservation_status,
           reservation_date:body.reservation_date,
           reservation_time:body.reservation_time,
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
router.get('/reserv_list',verifyToken,async(req,res,next)=>{
    let user_no = req.decoded.user_no;

    
   EquipmentReservation.hasOne(User, { foreignKey: 'user_no', sourceKey: 'user_no' });
   EquipmentReservation.hasOne(EquipmentCategory,{foreignKey:'equipment_category_no', sourceKey:'equipment_category_no'});
    let reservlist;

    try{
        reservlist = await EquipmentReservation.findAll({
            attributes:['equipment_reservation_no','user_no','equipment_category_no','reservation_time','created_at'],
            include:[{
                model: User, 
                attributes: ['name'],
                required:false   // left outer join
            },
            {
                model: EquipmentCategory, 
                attributes: ['model_name'],
                required:false   // left outer join
            },
            ],
            order: [
                ['created_at', 'DESC'],
            ],
            raw:true,
        })
    }
    
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    for (let i = 0; i < reservlist.length; i++) {
        reservlist[i]['username'] = reservlist[i]['user.name'];
        delete reservlist[i]['user.name'];
    }
    for(let i = 0; i<reservlist.length; i++){
        reservlist[i]['modelname'] = reservlist[i]['equipment_category.model_name'];
        delete reservlist[i]['equipment_category.model_name'];
    }
    return res.status(errorCode.ok).json(reservlist);
})
module.exports = router;