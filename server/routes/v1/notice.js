'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken, errorCode, getErrMsg, authLevel, makedir, SendMail  } = require('../../middlewares/middlewares');
const {User ,Company,Notice,NoticeFile,ClassEduFile } = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
/* const jwt = require('jsonwebtoken');
const { FindMaterialItem, AddMaterialUsage, UpdateMaterialUsage, AddServiceElementAttempt, 
    AddEquipAndMaterialUsage, RemoveEquipAndMaterialUsage} = require('../../middlewares/dbapi'); */
const { raw } = require('body-parser');

const router = express.Router();



async function InsertFileInfo(user_no, notice_no, files) {

    const filepath = 'upload/newnotice';
    if (files.length > 0) {
        makedir(filepath);
    }
   
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file.originalname);
        const filename = 'u' + user_no + 's' + notice_no + 'os' + file.filename + ext;
        fs.renameSync(file.path, filepath + '/' + filename, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
        });

        let inputResult;
        try {
            inputResult = await NoticeFile.create({
                notice_no,
                original_name: file.originalname,
                name: filename,
                type: file.mimetype,
                path: filepath,
                filesize: file.size,
                created_user_no: user_no,
                updated_user_no: user_no,
            });
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return true;
}


async function SelectFileInfo(notice_no) {
    let files;

    try {
        files = await NoticeFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                notice_no,
            }
        });
    } catch (error) {
        console.error(error);
        return null;
        //return res.status(errorCode.internalServerError).json({});
    }

    return files;
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/newnotice')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const upload = multer({
    storage:storage,
    limits:{files:10,fileSize: 20*1024*1024}
})

router.post('/:notice_no/images',upload.array('files'),async(req,res,)=>{
    let notice_no = req.params.notice_no; 
 if(req.files.length>0)
    {
        makedir('upload/newnotice');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await NoticeFile.create({
                notice_no,
                original_name: req.files[i].originalname,
                name: req.files[i].filename,
                type: req.files[i].mimetype,
                path: req.files[i].path,
                filesize:req.files[i].size,
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }
    //InsertFileInfo(user_no,notice_no,req.files)
    res.status(errorCode.ok).json({});
})
router.post('/:notice_no/files',upload.array('imageFiles'), async(req, res, next) =>{
    let notice_no = req.params.notice_no; 


    
    console.log(req.files);
    if(req.files.length>0)
    {
        makedir('upload/newnotice');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await NoticeFile.create({
                notice_no,
                original_name: req.files[i].originalname,
                name: req.files[i].filename,
                type: req.files[i].mimetype,
                path: req.files[i].path,
                filesize:req.files[i].size,
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }
    //InsertFileInfo(user_no,notice_no,req.files)
    res.status(errorCode.ok).json({});
    
})
router.put('/:notice_no/files',verifyToken,upload.array('imageFiles'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let notice_no = req.params.notice_no;

    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await NoticeFile.update({
                notice_no,
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
router.get('/:notice_no/files'/* ,verifyToken */,async (req, res, next) => {
    let notice_no = req.params.notice_no;

   

/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */
    
    let files = await SelectFileInfo(notice_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }


    res.json(files);

});

router.get('/:notice_no/file/:file_no',verifyToken,async (req, res, next) => {
    let notice_no = req.params.notice_no;
    let user_no = req.decoded.user_no;
    let attached_file_no = req.params.file_no;

    let file_info;
    try {
        file_info = await NoticeFile.findOne({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: { 
                notice_no
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const path = "upload/newnotice/";
    const file = path + file_info.dataValues.name;
    console.log(file)
    res.download(file, file_info.dataValues.original_name, function(err) {
        if (err) {
            res.json({err:err.path});
        } else {
            res.end();
        }
    });
});
router.post('/notices',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

    let result;
    console.log(body.content)
    try{
        result = await Notice.create({
            title:body.title,
            content:body.content,
            popup:body.popup,
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
router.put('/:notice_no/notices',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let notice_no = req.params.notice_no;
    let result;

    try{
        result = await Notice.update({
            title:body.title,
            content:body.content,
            created_user_no: user_no,
            updated_user_no: user_no,
        },{
            where:{notice_no}
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok);
})
router.put('/notice_cnt',async(req,res,next)=>{
    const {hit,notice_no} = req.body;
    let hit_update
    try {
        hit_update = await Notice.update({
            hit:hit+1,
        },
        {
            where:{notice_no}
        })
        return res.send(hit_update);
    } catch (error) {
        console.log(error);
    }
})
router.get('/noticelist',async(req,res,next)=>{
    let body = req.body;

    let result;
    try{
        result = await Notice.findAll({
            attributes:['notice_no','title','created_at','hit'],
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.get('/recentnotice',async(req,res,next)=>{
    let body = req.body;

    let result;
    try{
        result = await Notice.findOne({
            attributes:['notice_no'],
            where:{popup:"Y"},
            order:[['created_at','DESC']],
            limit:1,
            raw:false,
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    console.log(result);
    res.status(errorCode.ok).json(result);
})
router.get('/:notice_no/detail',async(req,res,next)=>{
    let body = req.body;
    let notice_no = req.params.notice_no;

    let result;
    try{
        result = await Notice.findOne({
            attributes:["title","content","attached_file"],
            where:{notice_no},
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.get('/:notice_no/filesno',async (req, res, next) => {
    let notice_no = req.params.notice_no;
   
/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */let files
    try{
     files= await NoticeFile.findAll({
        attributes:['attached_file_no','original_name','path','type','filesize'],
        where:{notice_no}
    });
    }  
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 
    
    

    res.status(errorCode.ok).json(files);

});
router.get('/noticehome',async(req,res,next)=>{
    let body = req.body;
    let result;
    try{
        result = await Notice.findAll({
            attributes:['notice_no','title','created_at','hit'],
            order:[['created_at','DESC']],
            limit:4,
            raw:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
module.exports = router;