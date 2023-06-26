'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, makedir, SendMail } = require('../../middlewares/middlewares');
const { User, Company, Mentoring ,MentoringApplication, MentoringFile} = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
const jwt = require('jsonwebtoken');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/newmentoring')
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
        files = await MentoringFile.findAll({
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

router.get('/getlist',async(req,res,next)=>{
    let body = req.body;
    let itemList;
    try{
        itemList = await MentoringApplication.findAll({
            attributes:['mentoring_application_no','user_no','requirement','purpose','application_title','specific_content','created_at'],
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(itemList);
})

router.post('/addmentoring',verifyToken,async(req,res,nex)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let result;
    try{
        result = await MentoringApplication.create({
            application_title:body.application_title,
            user_no:user_no,
            requirement:body.requirement,
            specific_content:body.specific_content,
            email:body.email,
            usermail: body.usermail,
            represent: body.represent,
            sub: body.sub,
            name: body.name,
            part: body.part,
            purpose: body.purpose,
            company_name: body.cname,
            tel_num: body.pnum,
            p_num : body.num,
            address: body.address,
            address_detail: body.address_detail,
            mentor: body.mentor,
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
//이미지 파일 업로드
/* router.post('/:mentoring_no/files',verifyToken,upload.array('imageFiles'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let mentoring_no = req.params.mentoring_no;

    if(req.files.length>0)
    {
        makedir('upload/newmentoring');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await MentoringFile.create({
                archive_no:archive_no,
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
}) */
//통합파일 업로드
router.post('/:mentoring_no/nofiles',verifyToken,upload.array('files'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let mentoring_no = req.params.mentoring_no;
    if(req.files.length>0)
    {
        makedir('upload/newmentoring');
    }
    console.log(req.files);
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await MentoringFile.create({
                mentoring_application_no:mentoring_no,
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
});
router.get('/list',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

    let inputResult;
    try{
       inputResult = await MentoringApplication.findAll({
           attributes:['mentoring_application_no','user_no','application_title','mentor','status','created_at'],
           where:{user_no},
           order:[['created_at','DESC']],
           raw:true,
       })
    }
    catch(error){
       console.log(error);
       return res.status(errorCode.internalServerError).json({});
    }
     res.status(errorCode.ok).json(inputResult);
   })

router.get('/:mentoring_no/files',async (req, res, next) => {
    let mentoring_no = req.params.mentoring_no;
   

/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */
    
    let files = await SelectFileInfo(mentoring_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }
    

    res.json(files);

});

module.exports = router;