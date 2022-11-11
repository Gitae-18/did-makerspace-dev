'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');
const { User ,Company, EquipmentElement, EquipmentCategory, Space ,EquipmentReservation} = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const router = express.Router();



router.post('/datetime',async(req,res,next)=>{
    const {resrevation_date,reservation_state} = req.body
    let reservation_no = req.params.reservation_no;
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

























module.exports = router;