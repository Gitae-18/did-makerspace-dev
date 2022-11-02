'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');
const { User ,Company, EquipmentElement,EquipmentCategory,Space } = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const router = express.Router();


router.get("/list", async(req,res,next)=>{
    const body = req.body; 
    
    let spacelist ;
    try{
        spacelist = await Space.findAll(({
            attributes:['space_no','space_name','space_info','location'],
            order:[
                ['created_at','DESC']
            ],
            required:false,
            raw:true,
            
        }));  
        res.json(spacelist);
    }
    catch(error){
        console.log(error);
    }
    next();
    return 
    
});


module.exports = router;