'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');
const { User ,Company, EquipmentElement,EquipmentCategory,Space } = require('../../models');
const { Op } = require("sequelize");

const router = express.Router();


router.get('/list', verifyToken, async(res,req,next)=>{
    
    const { space_no,space_name,space_part } = req.body; 
    
    let spacelist ;
    try{
        spacelist = await Space.findAll(({
            attributes:['space_no','space_name','space_info','location'],
            order:[
                ['created_at','DESC']
            ],
            required:false,
            raw:true,
        }))
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
   
});


module.exports = router;