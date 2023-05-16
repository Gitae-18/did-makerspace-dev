'use strict';

const express = require('express');

const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');

const { User ,Company, EquipmentElement, EquipmentCategory, Space ,EquipmentReservation,UserEquipmentTestPass} = require('../../models');
const { Op } = require("sequelize");
const path = require('path');

const moment = require('moment');
const { token } = require('morgan');

const router = express.Router();


router.post('/testflag',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let inputResult;
    try{
        inputResult = await UserEquipmentTestPass.create({
            user_no : user_no,
            type : body.type,
            pass_flag : body.passflag,
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


router.get('/testresult',verifyToken,async(req,res,next)=>{
     let user_no = req.decoded.user_no;

     let result;
     try{
        result = await UserEquipmentTestPass.findAll({
            attributes:['pass_flag','type','user_no'],
            where:{user_no},
            raw:true,
        })
     }
     catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
     }
     console.log(result);
     res.status(errorCode.ok).json(result);
})



module.exports = router;