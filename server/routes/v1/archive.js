'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, makedir, SendMail } = require('../../middlewares/middlewares');
const {Archive,ArchiveFile} = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
//const path = require('path');
//const fs = require('fs');

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/newarchive')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  const upload = multer({
    storage:storage,
    limits:{fileSize: 20*1024*1024}
})
async function SelectFileInfo(archive_no) {
    let files;

    try {
        files = await ArchiveFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                archive_no,
            }
        });
    } catch (error) {
        console.error(error);
        return null;
        //return res.status(errorCode.internalServerError).json({});
    }

    return files;
}
router.get('/list',async(req,res,next)=>{
 let body = req.body;
 let file_type = req.query.file_type;

 let inputResult;
 try{
    inputResult = await Archive.findAll({
        attributes:['archive_no','content','title','created_at','src','url','hit'],
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
router.post('/archives',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let result;
    console.log(body.content)
    try{
        result = await Archive.create({
            title:body.title,
            content:body.content,
            url: body.url,
            file_type:body.file_type,
            created_user_no: user_no,
            updated_user_no: user_no,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.get('/onlist',async(req,res,next)=>{
    let body = req.body;
    let file_no = req.query.file_no;
   
    let inputResult;
    try{
       inputResult = await Archive.findOne({
           attributes:['archive_no','content','title','created_at','src','url','hit'],
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
    const {hit,archive_no} = req.body;
    let hit_update
    try {
        hit_update = await Archive.update({
            hit:hit+1,
        },
        {
            where:{archive_no:archive_no}
        })
        return res.send(hit_update);
    } catch (error) {
        console.log(error);
    }
})
router.post('/:archive_no/files',verifyToken,upload.array('imageFiles'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    console.log(user_no);
    let archive_no = req.params.archive_no;

    if(req.files.length>0)
    {
        makedir('upload/newarchive');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await ArchiveFile.create({
                archive_no,
                original_name: req.files[i].originalname,
                name: req.files[i].filename,
                type: req.files[i].mimetype,
                path: req.files[i].path,
                filesize:req.files[i].size,
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }


    res.status(errorCode.ok).json({});
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
router.get('/:archive_no/files',verifyToken,async (req, res, next) => {
    let archive_no = req.params.archive_no;
    let user_no = req.decoded.user_no;
   

/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */
    
    let files = await SelectFileInfo(archive_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }
    

    res.json(files);

});
router.get('/:archive_no/filesno',async (req, res, next) => {
    let archive_no = req.params.archive_no;
   

/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */let files
    try{
     files= await ClassEduFile.findAll({
        attributes:['attached_file_no','original_name','path','type','filesize'],
        where:{archive_no}
    });
    }  
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 
    
    

    res.status(errorCode.ok).json(files);

});
module.exports = router;