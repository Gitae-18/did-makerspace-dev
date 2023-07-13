'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, makedir, SendMail } = require('../../middlewares/middlewares');
const {User ,Company,Notice,Faq,FaqFile} = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
/* const jwt = require('jsonwebtoken');
const { FindMaterialItem, AddMaterialUsage, UpdateMaterialUsage, AddServiceElementAttempt, 
    AddEquipAndMaterialUsage, RemoveEquipAndMaterialUsage} = require('../../middlewares/dbapi'); */
const { raw } = require('body-parser');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/newfaq')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const upload = multer({
    storage:storage,
    limits:{fileSize: 20*1024*1024}
})

async function SelectFileInfo(faq_no) {
    let files;

    try {
        files = await FaqFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                faq_no,
            }
        });
    } catch (error) {
        console.error(error);
        return null;
        //return res.status(errorCode.internalServerError).json({});
    }

    return files;
}
router.post('/:faq_no/files',verifyToken,upload.array('imageFiles'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let faq_no = req.params.faq_no;

    if(req.files.length>0)
    {
        makedir('upload/newfaq');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await FaqFile.create({
                faq_no,
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
router.put('/:faq_no/files',verifyToken,upload.array('imageFiles'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let faq_no = req.params.faq_no;


    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await FaqFile.update({
                faq_no,
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
/* router.put('/:faq_no/filesurl',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let faq_no = req.params.faq_no;

    console.log(req.files)
    let result;
    try{
        result = await FaqFile.update({
            filesurl:req.files.filesurl,
            created_user_no: user_no,
            updated_user_no: user_no,
    },{ 
        where: { faq_no },
    }
    )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({result});
}) */
router.post('/faqs',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

    let result;
    try{
        result = await Faq.create({
            title:body.title,
            content:body.content,
            filesurl:body.filesurl,
            created_user_no: user_no,
            updated_user_no: user_no,
    })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})

router.put('/:faq_no/faqupdate',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let faq_no = req.params.faq_no;

    let result;
    try{
        result = await Faq.update({
            title:body.title,
            content:body.content,
            created_user_no: user_no,
            updated_user_no: user_no,},
            {where:{faq_no}}
            )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok);
})
router.get('/faqlist',async(req,res,next)=>{
    let body = req.body;
    let result;

    try{
        result = await Faq.findAll({
            attributes:['faq_no','title','created_at','hit'],
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
router.put('/faq_cnt',async(req,res,next)=>{
    const {hit,faq_no} = req.body;
    let hit_update
    try {
        hit_update = await Faq.update({
            hit:hit+1,
        },
        {
            where:{faq_no}
        })
        return res.send(hit_update);
    } catch (error) {
        console.log(error);
    }
})

router.get('/:faq_no/detail',async(req,res,next)=>{
    let faq_no = req.params.faq_no;

    let result;
    try{
        result = await Faq.findOne({
            attributes:["title","content","attached_file"],
            where:{faq_no},
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
});
router.get('/:faq_no/files',async (req, res, next) => {
    let faq_no = req.params.faq_no;
   
/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */
    
    let files = await SelectFileInfo(faq_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }
    

    res.json(files);

});

router.get('/:faq_no/filesno',async (req, res, next) => {
    let faq_no = req.params.faq_no;
   
    let files
    try{
     files= await FaqFile.findAll({
        attributes:['attached_file_no','original_name','path','type','filesize'],
        where:{faq_no}
    });
    }  
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 
    
    

    res.status(errorCode.ok).json(files);

});
router.get('/:faq_no/fileurl/:file_no',verifyToken,async (req, res, next) => {
    let faq_no = req.params.faq_no;
    let user_no = req.decoded.user_no;
    let attached_file_no = req.params.file_no;

    let file_info;
    try {
        file_info = await FaqFile.findOne({
            attributes: ['attached_file_no', 'filesurl'],
            where: { 
                attached_file_no
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(file_info);
});
router.get('/:faq_no/file/:file_no',async (req, res, next) => {
    let faq_no = req.params.faq_no;
    let attached_file_no = req.params.file_no;

    let file_info;
    try {
        file_info = await FaqFile.findOne({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: [{ 
                faq_no
            },
            {
                attached_file_no,
            }
        ]   
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    const path = "upload/newfaq/";
    const file = path + file_info.dataValues.name;

    res.download(file, file_info.dataValues.original_name, function(err) {
        if (err) {
            res.json({err:err});
        } else {
            res.end();
        }
    });
});

router.get('/:faq_no/fileinfo',async (req, res, next) => {
    let faq_no = req.params.faq_no;
    let files = await SelectFileInfo(faq_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }
    
    
    let file_data= files[0].dataValues;
    
    const path = "upload/newfaq/";
    console.log(path)
    const file_name = path + file_data.name ;
    console.log(file_name)
    let file = fs.readFileSync(file_name,{encoding:'utf8',flag:'r'})
    let encode = fs.readFile(file_name,'utf8',(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
        }
    })
    //console.log(encode);
    res.setHeader('Content-Length',file.length);
    res.write(file,'binary');
    res.end();
    //res.json(file)
});
module.exports = router;