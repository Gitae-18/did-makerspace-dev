'use strict';

const express = require('express');
const { verifyToken, errorCode } = require('../../middlewares/middlewares');
const {Archive} = require('../../models');
const { Op, or } = require("sequelize");
//const multer = require('multer');
//const path = require('path');
//const fs = require('fs');

const router = express.Router();



router.get('/list',async(req,res,next)=>{
 let body = req.body;
 let file_type = req.query.file_type;

 let inputResult;
 try{
    inputResult = await Archive.findAll({
        attributes:['file_no','content','title','created_at','src','url','hit'],
        where:{file_type},
        order:[['created_at','DESC']],
        raw:true,
    })
 }
 catch(error){
    console.log(error);
    return res.status(errorCode.internalServerError).json({});
 }
  res.json(inputResult);
})
router.get('/onlist',async(req,res,next)=>{
    let body = req.body;
    let file_no = req.query.file_no;
   
    let inputResult;
    try{
       inputResult = await Archive.findOne({
           attributes:['file_no','content','title','created_at','src','url','hit'],
           where:{file_no},
           order:[['created_at','DESC']],
           raw:true,
       })
    }
    catch(error){
       console.log(error);
       return res.status(errorCode.internalServerError).json({});
    }
     res.json(inputResult);
   })
router.put('/archive_cnt',async(req,res,next)=>{
    const {hit,file_no} = req.body;
    let hit_update
    try {
        hit_update = await Archive.update({
            hit:hit+1,
        },
        {
            where:{file_no:file_no}
        })
        return res.send(hit_update);
    } catch (error) {
        console.log(error);
    }
})
/* 
router.get('/list', async(req,res,next)=>{
    let file_type = req.query.file_type;

    let result;
    try{
        result = await Archive.findAll({
            attributes:['file_no','content','title','url','hit','created_at'],
            where:{file_type},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
 */

module.exports = router;