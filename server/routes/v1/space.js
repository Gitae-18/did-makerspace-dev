'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');
const { User ,Company, EquipmentElement,EquipmentCategory,Space } = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const router = express.Router();


router.get("/floor",async(req,res,next)=>{
    let FloorInfo;

    try{
        FloorInfo = await Space.findAll({
            attributes:['location','space_no'],
            order:[
                ['created_at','DESC']
            ],
            required:false,
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(FloorInfo);
})
router.get("/list", async(req,res,next)=>{
    const body = req.body; 
    const floor = req.query.floor;
    console.log(floor);
    
    let query 
  
    if(floor)
    {
       query = {
            attributes:['space_no','space_name','space_info','location','src'],
            where:{location:floor},
            order:[
                    ['created_at','DESC']
                ],
                required:false,
        }
    }
    else{
        query = {
            attributes:['space_no','space_name','space_info','location','src'],
            order:[
                    ['created_at','DESC']
                ],
                required:false,
        }
    }
    

    let spacelist ;
    try{
        spacelist = await Space.findAll(query);  
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(spacelist);
});
router.get('/:space_no/detail', async(req,res,next)=>{
    const space_no = req.params.space_no;

    console.log(space_no);
    let spacelist ;
    try{
        spacelist = await Space.findOne({
            attributes:['space_no','space_name','space_info','location','src'],
            where:{space_no:space_no},
            order:[
                ['created_at','DESC']
            ],
            required:false,
            raw:true,
            
        });  
       
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.json(spacelist);
});
router.get('/reservation',async(req,res,next)=>{
    const body = req.body;


    // 공간정보 불러오기
    let spacelist  = {
        attributes:['space_name','space_info','location','src'],
     order:[
        ['created_at','DESC']
     ],
     required:false,
     raw:true,
    }
    try{
    let space = await Space.findAll(spacelist);
    res.json(space);
    }
    catch(error){
         console.error(error);
         return res.status(errorCode.internalServerError);
    }
    
})

module.exports = router;