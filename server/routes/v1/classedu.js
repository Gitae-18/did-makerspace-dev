'use strict';

const express = require('express');

const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');

const { User ,Company, EquipmentElement, EquipmentCategory, Space , ClasseduProgram ,ClasseduApplication, ClassEduFile} = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const moment = require('moment');
const { token } = require('morgan');

const router = express.Router();






async function InsertFileInfo(user_no, program_no,files) {
    console.log(program_no)
    console.log(user_no)
    const filepath = 'upload/newprogram';
    if (files.length > 0) {
        makedir(filepath);
    }
   
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname,ext);
        const filename = 'u' + user_no + 's' + program_no + 'os' + file.filename + ext;
        fs.renameSync(file.path, filepath + '/' + filename, (err) => {
            if (err) {
                console.error(err);
                return false;
            }
        });
      
        let inputResult;
        try {
            inputResult = await ClassEduFile.create({
                program_no,
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
async function SelectFileInfo(program_no) {
    let files;

    try {
        files = await ClassEduFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                program_no,
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
      cb(null, 'upload/newprogram')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const upload = multer({
    storage:storage,
    limits:{files:10,fileSize: 50*1024*1024}
})



router.post('/:program_no/files',verifyToken,upload.array('imageFiles'), async(req, res, next) => {
     let user_no = req.decoded.user_no;
     let program_no = req.params.program_no;
     console.log(req.files);
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await ClassEduFile.create({
                program_no,
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
   
   
    // 첨부파일
    //console.log('files len =', req.files.length);
/*   if (req.files.length > 0) {
        InsertFileInfo(user_no, program_no, req.files);
    } */
    res.status(errorCode.ok).json({});
})



router.put('/:program_no/files',verifyToken,upload.array('imageFiles'), async(req, res, next) => {
    const program_no = req.params.program_no;
    let user_no = req.decoded.user_no;

    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await ClassEduFile.update({
                program_no,
                original_name: req.files[i].originalname,
                name: req.files[i].filename,
                type: req.files[i].mimetype,
                path: req.files[i].path,
                filesize:req.files[i].size,
                created_user_no: user_no,
                updated_user_no: user_no,
            },{
                where:{program_no:program_no}
            });
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }
    res.status(errorCode.ok).json({});
})
router.post('/:program_no/nofiles',verifyToken,upload.array('Files'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let program_no = req.params.program_no;

    if(req.files.length>0)
    {
        makedir('upload/newprogram');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await ClassEduFile.create({
                program_no,
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
router.put('/:program_no/nofiles',verifyToken,upload.array('Files'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let program_no = req.params.program_no;

    if(req.files.length>0)
    {
        makedir('upload/newprogram');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await ClassEduFile.update({
                program_no:program_no,
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
router.get('/edulist',async(req,res,next)=>{
    let body = req.body;
    const type = req.query.type;
   
    let result ;
    try{
        result = await ClasseduProgram.findAll({
            attributes:['program_no','type','hit','content','title','cost','pay_flag','place','class_period_start','class_period_end','application_period_start','application_period_end','limit_number','popup_flag','attached_file'],
            where:{type:type},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(result);
})

router.get('/classedulist',async(req,res,next)=>{
    let body = req.body;
   
    let result ;
    try{
        result = await ClasseduProgram.findAll({
            attributes:['program_no','type','hit','content','title','cost','pay_flag','place','class_period_start','class_period_end','application_period_start','application_period_end','limit_number','popup_flag'],
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(result);
})
/* router.post('/classadd',async(req,res,next)=>{
    let body = req.body;
    const input = req.body;
    let inputResult
    try{
        inputResult  = await ClasseduProgram.create({
           title:body.title,
           type:body.type,
           content:body.content,
           pay_flag:body.pay_flag,
           class_period_start:body.class_period_start,
           class_period_end:body.class_period_end,
           application_preiod_start :body.application_period_start,
           application_period_end: body.application_period_end,
           place:body.place,
           limit_number:body.limit_number,
           cost : body.cost,
           map_url : body.map,
           hit : body.hit,
           popup_flag : body.popup_flag,
        })
    }
    catch(error){
        console.log(error)
    }

}) */
/* router.post('/classadd',async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;



    let inputResult
    try{
        inputResult  = await ClasseduProgram.create({
           title:1,
           type:1,
           content:1,
           pay_flag:1,
           class_period_start:1,
           class_period_end:1,
           application_preiod_start :1,
           application_period_end: 1,
           place:1,
           limit_number:1,
           cost : 1,
           map_url : 1,
           hit : 1,
           popup_flag : 1,
           created_user_no: user_no,
           updated_user_no: user_no,
        })
    }
    catch(error){
        console.log(error)
       /*  return res.status(errorCode.internalServerError).json({}); */
/*     }
})  */
router.post('/class_application',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let inpurtResult
    console.log(body)
    try{
        inpurtResult  = await ClasseduApplication.create({
           user_no,
           program_no:body.program_no,
           classedu_type:body.type,
           title:body.title,
           flag:body.flag,
           created_user_no: user_no,
           updated_user_no: user_no,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
})

router.post('/addprogram',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let inputResult;
    try{
        inputResult  = await ClasseduProgram.create({
           title:body.title,
           type:body.type,
           content:body.content,
           pay_flag:body.pay_flag,
           class_period_start:body.class_period_start,
           class_period_end:body.class_period_end,
           application_period_start:body.application_period_end,
           application_period_end:body.application_period_end,
           place:body.place,
           limit_number:body.limit_number,
           cost : body.cost,
           map_url : body.map,
           attached_file : body.attached_file,
           popup_flag : body.popup_flag,
           created_user_no:user_no,
           updated_user_no:user_no,
        })
    }
   
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(inputResult);
})
router.put('/:program_no/update_program',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let program_no = req.params.program_no;

    let inputResult;
    try{
        inputResult  = await ClasseduProgram.update({
           title:body.title,
           type:body.type,
           content:body.content,
           pay_flag:body.pay_flag,
           class_period_start:body.class_period_start,
           class_period_end:body.class_period_end,
           application_period_start:body.application_period_end,
           application_period_end:body.application_period_end,
           place:body.place,
           limit_number:body.limit_number,
           cost : body.cost,
           map_url : body.map,
           attached_file:body.attached_file,
           popup_flag : body.popup_flag,
           created_user_no:user_no,
           updated_user_no:user_no,
        },
         {where:{program_no}})
    }
   
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(inputResult);
})
/* router.post('/addprogram_attachfile',verifyToken,async(req,res,next)=>{
    let body = req.body;
    console.log(body)
    let result;
    try{
        result = await ClasseduProgram.create({
            attached_file:body
        })
        console.log(result)
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok)
}) */
router.put('/classedu_cnt',async(req,res,next)=>{
    const {hit,program_no} = req.body;
    let hit_update
    try {
        hit_update = await ClasseduProgram.update({
            hit:hit+1,
        },
        {
            where:{program_no}
        })
        return res.send(hit_update);
    } catch (error) {
        console.log(error);
    }
})
router.get('/recentprogram',async(req,res,next)=>{
    let body = req.body;

    let result;
    try{
        result = await ClasseduProgram.findOne({
            attributes:['program_no'],
            where:{popup_flag:"Y"},
            order:[['created_at','DESC']],
            limit:1,
            raw:false,
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.get('/:program_no/class_receive',async(req,res,next)=>{
    const no = req.params.program_no;
    let result ;
    try{
        result = await ClasseduProgram.findOne({
            attributes:['content','title','cost','pay_flag','place','class_period_start','class_period_end','application_period_start','application_period_end','limit_number','attached_file','popup_flag'],
            where:{program_no:no},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})

router.get('/class_application',async(req,res,next)=>{
    const title = req.query.title;
    let result;
    try{
        result = await ClasseduApplication.findAll({
            attributes:['application_no'],
            where:{title:title},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }   
     res.status(errorCode.ok).json(result);
})

router.get('/myclass_application',verifyToken,async(req,res,next)=>{
    const title = req.query.title;
    let user_no = req.decoded.user_no
    let result;
    try{
        result = await ClasseduApplication.findAll({
            attributes:['application_no','classedu_type','title','flag','created_at'],
            where:{created_user_no:user_no},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.log(error)
        return res.status(errorCode.internalServerError).json({});
    }    
    res.status(errorCode.ok).json(result);
})
router.get('/:program_no/getimage',async(req,res,next)=>{
    let program_no = req.params.program_no;
    
    let file_info;
    try{
        file_info = await ClassEduFile.findOne({
            attributes:['attached_file_no','original_name','name','path','filesize'],
            where:{program_no}
        });
    }
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
 
    res.send(file_info)
})
router.get('/:program_no/files',async (req, res, next) => {
    let program_no = req.params.program_no;

/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */
    
    let files = await SelectFileInfo(program_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }
    

    res.json(files);

});
router.delete('/:program_no/dropitem', verifyToken, async (req, res, next) => {
    const program_no  = req.params.program_no;
    
    let deleteservice;
    try{
          deleteservice = await ClasseduProgram.destroy({
           where:{program_no:program_no},
           raw:true
       })
    }
    catch (error) {
        console.error(error);
    } 
   res.status(errorCode.ok).json({});
})

module.exports = router;
router.get('/:program_no/filesno',async (req, res, next) => {
    let program_no = req.params.program_no;
   

    let files
    try{
     files= await ClassEduFile.findAll({
        attributes:['attached_file_no','original_name','path','type','filesize'],
        where:{program_no}
    });
    }  
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 
    

    res.status(errorCode.ok).json(files);

});

router.get('/reservlist',verifyToken,async(req, res, next)=>{
        let program_no = req.query.program_no;
        let user_no = req.decoded.user_no;
        ClasseduApplication.hasOne(User,{ foreignKey: 'user_no' , sourceKey: 'user_no'})
        let result;
        try{
            result = await ClasseduApplication.findAll({
                attributes:['application_no','user_no','classedu_type','title','created_at','deleted_at'],
                include:[{model:User,
                    attributes:['name','phone_number','email'],
                }],
                where:{program_no:program_no},
                order:[['created_at','DESC']],
                required:false,
                paranoid:false,
                raw:true,
        })
        }
        catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
        }
        for (let i = 0; i < result.length; i++) {
            result[i]['name'] = result[i]['user.name'];
            delete result[i]['user.name'];
        }
            for (let i = 0; i < result.length; i++) {
            result[i]['phone'] = result[i]['user.phone_number'];
            delete result[i]['user.phone_number'];
        }
            for (let i = 0; i < result.length; i++) {
            result[i]['email'] = result[i]['user.email'];
            delete result[i]['user.email'];
        }
        res.status(errorCode.ok).json(result);
})
router.get('/reserv',async(req, res, next)=>{
    let program_no = req.query.program_no;

    ClasseduApplication.hasOne(User,{ foreignKey: 'user_no' , sourceKey: 'user_no'})
    let result;
    try{
        result = await ClasseduApplication.findAll({
            attributes:['application_no','user_no','classedu_type','title','created_at'],
            include:[{model:User,
                attributes:['name'],
            }],
            where:{program_no:program_no},
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
        result[i]['name'] = result[i]['user.name'];
        delete result[i]['user.name'];
    }
        /* for (let i = 0; i < result.length; i++) {
        result[i]['phone'] = result[i]['user.phone_number'];
        delete result[i]['user.phone_number'];
    }
        for (let i = 0; i < result.length; i++) {
        result[i]['email'] = result[i]['user_email'];
        delete result[i]['user_email'];
    } */
    res.status(errorCode.ok).json(result);
})
router.post('/submit',async(req,res,next)=>{
    let body = req.body;

    //const {content} = req.body;
    //const newContent = new ClasseduProgram({content:content});
    //newContent.save();
    try{
         newContent = await ClasseduProgram.create({
            content:body.content,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})
//예약삭제
router.delete('/:program_no/drop',verifyToken,async(req, res , next)=>{
    const program_no = req.params.program_no;

    let deleteservice;
    try{
          deleteservice = await ClasseduApplication.destroy({
           where:{application_no:program_no},
           raw:true
       })
    }
    catch (error) {
        console.error(error);
    } 
   res.status(errorCode.ok).json({});
})
module.exports = router;