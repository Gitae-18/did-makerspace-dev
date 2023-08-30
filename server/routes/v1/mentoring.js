'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, makedir, SendMail } = require('../../middlewares/middlewares');
const { User, Company, Mentoring ,MentoringApplication, MentoringFile, MentoringReport ,MentoringReportFile, Mentor, MentorFile, MentorApplication} = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
const jwt = require('jsonwebtoken');
const mentoring_application = require('../../models/mentoring_application');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/newmentoring')
    },
    destination: function (req, file, cb) {
        cb(null, 'upload/newmentor')
      },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  const upload = multer({
    storage:storage,
    limits:{fileSize: 20*1024*1024}
})

async function SelectFileInfo(mentoring_application_no) {
    let files;

    try {
        files = await MentoringFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                mentoring_application_no,
            }
        });
    } catch (error) {
        console.error(error);
        return null;
        //return res.status(errorCode.internalServerError).json({});
    }

    return files;
}
async function SelectMentorFileInfo(mentor_application_no) {
    let files;

    try {
        files = await MentorFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'type', 'path', 'filesize'],
            where: { 
                mentor_application_no,
            }
        });
    } catch (error) {
        console.error(error);
        return null;
        //return res.status(errorCode.internalServerError).json({});
    }

    return files;
}

router.get('/mentoring_specific',async(req,res,next)=>{
   let item;
   const mentoring_no  = req.query.mentoring_no;
   console.log(mentoring_no);
   try{
    item = await MentoringApplication.findOne({
        attributes: ['mentoring_application_no','user_no','requirement','purpose','application_title','specific_content','part','represent','sub','company_name','email','name','tel_num','p_num','securitynum','usermail','address','address_detail','mentor','status','reject_content','created_at'],
        where:{mentoring_application_no:mentoring_no},
    })
   }
   catch(error){
    console.log(error);
    return res.status(errorCode.internalServerError).json({});
   }
   res.status(errorCode.ok).json(item);
})
router.get('/mentor_specific',async(req,res,next)=>{
    let item;
    const mentoring_no  = req.query.mentoring_no;
 
    try{
     item = await MentorApplication.findOne({
         attributes: ['mentor_application_no','address','user_no','name','department','status','reject','major','final_education','specialization','email','phone_number','text','created_at'],
         where:{mentor_application_no:mentoring_no},
     })
    }
    catch(error){
     console.log(error);
     return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(item);
 })
router.put('/reject',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let item;
    try{
        item = await MentoringApplication.update({
            reject_content:body.reject_content
        },
        {
            where:{mentoring_application_no:body.mentoring_application_no}
        }
        )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})
router.put('/mentor_reject',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let item;
    try{
        item = await MentorApplication.update({
            reject:body.reject_content
        },
        {
            where:{mentor_application_no:body.mentor_application_no}
        }
        )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})
router.post('/mentorstore',verifyToken,async(req,res,next)=>{
    let body = req.body;
    const mentor_no = req.query.mentor_no;
    const keywords = body.keyword.join();
    let user_no = req.decoded.user_no;
    let item;
    try{
        item = await Mentor.create({
            user_no:mentor_no,
            permission_flag:body.permission_flag,
            keyword:keywords,
            mentor_profile:body.mentor_profile,
            introduction:body.introduction,
            field:body.field,
            name:body.name,
            created_user_no:user_no,
            updated_user_no:user_no,
        }
        )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({item});
})
router.put('/status_change',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    const mentoring_no = req.query.mentoring_no;
    let status;
    try{
        status = await MentorApplication.update({
           status:body.status
        },
        {
            where:{mentor_application_no:mentoring_no}
        }
        )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})
router.put('/change_status',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    const mentoring_no = req.params.mentoring_no;
    let status;
    try{
        status = await MentoringApplication.update({
           status:body.status
        },
        {
            where:{mentoring_application_no:body.mentoring_application_no}
        }
        )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})
router.put('/:mentor_no/update_authority',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    const mentor_no = req.params.mentor_no;
    console.log(mentor_no)
    let status;
    try{
        status = await Mentor.update({
           permission_flag:body.permission_flag
        },
        {
            where:{user_no:mentor_no}   
        }
        )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})

router.put('/finish',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

    let item;
    try{
        item = await MentoringApplication.update({
            status:body.status,
            memo:body.memo,
        },
        {
            where:{mentoring_application_no:body.mentoring_application_no}
        }
        )
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json({});
})
router.get('/getlist',async(req,res,next)=>{
    let body = req.body;
    const name = req.query.name;
    console.log(name);
    let itemList;
    if(name!==undefined)
    {
    try{
        itemList = await MentoringApplication.findAll({
            attributes:['mentoring_application_no','user_no','mentor','requirement','purpose','status','application_title','specific_content','created_at'],
            where:{mentor:name},
            order:[['created_at','DESC']],
            raw:true,
        })
        
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    }
    else{
        try{
            itemList = await MentoringApplication.findAll({
                attributes:['mentoring_application_no','user_no','mentor','requirement','purpose','status','application_title','specific_content','created_at'],
                order:[['created_at','DESC']],
                raw:true,
            })
            
        }
        catch(error){
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }
    res.status(errorCode.ok).send(itemList);
})
router.get('/mylist',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let itemList;
    try{
        itemList = await MentoringApplication.findAll({
            attributes:['mentoring_application_no','user_no','mentor','requirement','purpose','status','application_title','specific_content','created_at'],
            order:[['created_at','DESC']],
            where:{user_no},
            raw:true,
        })
        res.status(errorCode.ok).json(itemList);
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
   
})
router.post('/mentorapplication',verifyToken,async(req,res,nex)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let result;
    try{
        result = await MentorApplication.create({
            user_no : user_no,
            name : body.name,
            department : body.sub,
            final_education : body.final_education,
            major : body.major,
            specialization : body.specialization,
            email:body.email,
            phone_number:body.num,
            status:'A',
            address:body.address_detail,
            text:body.text,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.put('/:mentoring_no/mentorapplication',verifyToken,async(req,res,nex)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    const no = req.params.mentoring_no;
    let result;
    try{
        result = await MentorApplication.update({
            user_no : user_no,
            name : body.name,
            department : body.part,
            final_education : body.final_education,
            major : body.major,
            specialization : body.specialization,
            email:body.email,
            phone_number:body.num,
            text:body.text,
            status:'R',
            created_user_no:user_no,
            updated_user_no:user_no,
        },
        {where:{mentor_application_no:no}}
        )
        
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.post('/addmentoring',verifyToken,async(req,res,nex)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;
    let result;
    console.log(typeof(body.securitynum));
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
            securitynum:body.securitynum,
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

router.post('/addmentor',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let result;
    const no = body.no;
    try{
        result = await Mentor.create({
            user_no:no,
            name:body.name,
            keyword:body.keyword,
            mentor_profile:body.profile,
            career:body.career,
            field:body.field,
            introduction:body.introduction,
            created_user_no: no,
            updated_user_no: no,
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
});
router.get('/:mentoring_no/mentor', verifyToken,async(req,res,next)=>{
    let user_no = req.params.mentoring_no;
    let query = {
        attributes: ['user_no','email','phone_number','address','address_detail','name'],
    }
    query.where = { user_no };
    let result;
    try {
        result = await User.findOne(query);
    } catch (error) {
        console.error(error);
    }

    return res.json(result);
})
router.get('/:mentoring_no/mentorinfo', verifyToken,async(req,res,next)=>{
    let mentor_application_no= req.params.mentoring_no;
    let user_no = req.decoded.user_no;
    let query = {
        attributes: ['user_no','email','phone_number','address','final_education','major','department','text','specialization','name'],
    }
    query.where = { user_no };
    let result;
    try {
        result = await MentorApplication.findOne(query);
    } catch (error) {
        console.error(error);
    }

    return res.json(result);
})
router.get('/user_list', async( req, res, next ) => {
    let result;
    try{
        result = await User.findAll({
            attributes:['user_no','name','email','phone_number','address','address_detail','company_position','created_at'],
            order:[['created_at','DESC']],
            raw:true
        })
        res.status(errorCode.ok).json(result);
    }
    catch(error){
        console.error(error);
        res.status(errorCode.internalServerError).json({ error: 'Internal server error' });
    }
   
})
router.get('/mentorlist',verifyToken,async(req,res,next)=>{
    let result;
    try{
        result = await Mentor.findAll({
            attributes:['mentor_no','user_no','name','permission_flag','keyword','mentor_profile','career','field'],
            order:[['created_at','DESC']],
        })
    }
    catch(error){
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(result);
})
router.get('/:mentoring_no/file/:file_no',async (req, res, next) => {
    let mentoring_application_no = req.params.mentoring_no;
    let attached_file_no = req.params.file_no;

    let file_info;
    try {
        file_info = await MentoringFile.findOne({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: [{ 
                mentoring_application_no
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

    const path = "upload/newmentoring/";
    const file = path + file_info.dataValues.name;
    console.log(file);
    res.download(file, file_info.dataValues.original_name, function(err) {
        if (err) {
            res.json({err:err.path});
        } else {
            res.end();
        }
    });
});
router.get('/:mentoring_no/mentorfile/:file_no',async (req, res, next) => {
    let mentor_application_no = req.params.mentoring_no;
    let attached_file_no = req.params.file_no;

    let file_info;
    try {
        file_info = await MentorFile.findOne({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: [{ 
                mentor_application_no
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

    const path = "upload/newmentor/";
    const file = path + file_info.dataValues.name;
    console.log(file);
    res.download(file, file_info.dataValues.original_name, function(err) {
        if (err) {
            res.json({err:err.path});
        } else {
            res.end();
        }
    });
});
router.post('/savereport',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.user_no;

    let result;
    try{
        result = await MentoringReport.create({
            mentoring_application_no:body.mentoring_application_no,
            user_no,
            report_content:body.report_content,
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
//통합파일 업로드
router.post('/:mentoring_no/nofiles',verifyToken,upload.array('files'), async(req, res, next) =>{
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
//통합파일 업로드2
router.post('/:mentoring_no/mentorfiles',verifyToken,upload.array('files'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let mentoring_no = req.params.mentoring_no;
    if(req.files.length>0)
    {
        makedir('upload/newmentor');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await MentorFile.create({
                mentor_application_no:mentoring_no,
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
router.put('/:mentoring_no/mentorfiles',verifyToken,upload.array('files'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let mentoring_no = req.params.mentoring_no;
    let attached_file_no = req.query.no;
    if(req.files.length>0)
    {
        makedir('upload/newmentor');
    }
    let inputResult;
    for(let i = 0; i<req.files.length;i++){
        let attached_file_no = i + 1;
        try {
            inputResult = await MentorFile.update({
                mentoring_application_no:mentoring_no,
                original_name: req.files[i].originalname,
                name: req.files[i].filename,
                type: req.files[i].mimetype,
                path: req.files[i].path,
                filesize:req.files[i].size,
                created_user_no: user_no,
                updated_user_no: user_no,
            },
            {where:[{mentor_application_no:mentoring_no},{attached_file_no:attached_file_no}
            ]}
            );
      
        } catch (error) {
            console.error(error);
            return res.status(errorCode.internalServerError).json({});
        }
    }
    res.status(errorCode.ok).json({});
});
router.post('/:mentoring_no/reportfiles',verifyToken,upload.array('files'), async(req, res, next) =>{
    let user_no = req.decoded.user_no;
    let mentoring_no = req.params.mentoring_no;
    if(req.files.length>0)
    {
        makedir('upload/newmentoring');
    }
    for(let i = 0; i<req.files.length;i++){
        let inputResult;
        try {
            inputResult = await MentoringReportFile.create({
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
router.get('/:mentoring_no/filesno',async (req, res, next) => {
    let mentoring_application_no = req.params.mentoring_no;
   
    let files
    try{
     files= await MentoringFile.findAll({
        attributes:['attached_file_no','original_name','name','path','type','filesize'],
        where:{mentoring_application_no:mentoring_application_no}
    });
    }  
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 
   
    res.status(errorCode.ok).json(files);

})
router.get('/:mentoring_no/mentorfilesno',async (req, res, next) => {
    let mentor_application_no = req.params.mentoring_no;
   

    let files
    try{
     files= await MentorFile.findAll({
        attributes:['attached_file_no','original_name','name','path','type','filesize'],
        where:{mentor_application_no:mentor_application_no}
    });
    }  
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    } 
    console.log(mentor_application_no)
    res.status(errorCode.ok).json(files);

})
router.get('/:mentoring_no/files',async (req, res, next) => {
    let mentoring_application_no = req.params.mentoring_no;
   
    
    let files = await SelectFileInfo(mentoring_application_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }
    
    if(files.length>0)
    {
    res.json(files);
    }

});
router.get('/:mentoring_no/mentorfiles',async (req, res, next) => {
    let mentor_application_no = req.params.mentoring_no;

    let files = await SelectMentorFileInfo(mentor_application_no);
    if (!files) {
        return res.status(errorCode.internalServerError).json({});
    }
    
    if(files.length>0)
    {
    res.json(files);
    }

});
router.get('/mentorapplist',async(req,res,next) => {
    let results;
    try{
        results = await MentorApplication.findAll({
            attributes:['mentor_application_no','name','department','specialization','email','phone_number','status','created_at'],
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(results);
})
router.get('/myapplication',async(req,res,next) => {
    let results;
    const name = req.query.name;
    try{
        results = await MentorApplication.findOne({
            attributes:['mentor_application_no','name','department','status','reject','specialization','created_at'],
            where:{name},
            order:[['created_at','DESC']],
            raw:true,
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(results);
})
router.get('/mentor_no',async(req,res,next) => {
    let results;
    try{
        results = await MentorApplication.findAll({
            attributes:['mentor_application_no'],
            order:[['created_at','DESC']],
            limit:1,
            raw:true,
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(results);
})
router.get('/getmentor',async (req, res, next) => {

/*     if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    } */
    
    let results;
    try{
        results = await Mentor.findAll({
            attributes:['name','keyword'],
            where:{permission_flag:"Y"},
            order:[['created_at','DESC']]
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    res.status(errorCode.ok).json(results);
});
router.get('/reportnumber',verifyToken,async(req,res,next)=>{
    let body = req.body;
    let user_no = req.decoded.uesr_no;
    let items ;

    try{
        items = await MentoringReport.findOne({
            attributes:['mentoring_report_no'],
            order:[['created_at','DESC']]
        })

      /*   if (!items) {
            throw new Error('No items found');
          } */
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(items);
})
router.get('/:mentoring_no/mentoring_result',verifyToken,async(req,res,next)=>{
    let body = req.body;
    const mentoring_no = req.params.mentoring_no;
    let user_no = req.decoded.uesr_no;
    let items ;
    try{
        items = await MentoringReport.findOne({
            attributes:['mentoring_report_no','report_content'],
            where:{mentoring_application_no:mentoring_no},
            raw:true,
        })
    }
    catch(error){
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(items);
})
router.get('/report',verifyToken,async(req,res,next)=>{
    let body = req.body;

   /*  let query= {
        attributes: ['mentoring_application_no','mentor'],
        order: [
            ['created_at', 'DESC'],
        ],
        raw: true,
    }; 
    let report;
    try{
        report = await MentoringApplication.findAll(query)
        report = report.map(i => i.mentoring_application_no);
    }
  
     catch (error) {
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }

    console.log(report.length); */
    let items;
    MentoringReport.hasOne(MentoringApplication,{foreignKey:'mentoring_application_no', sourceKey:'mentoring_application_no'});
    try{
        items = await MentoringReport.findAll({
            attributes:['mentoring_report_no','mentoring_application_no','user_no','report_content','created_at'], 
            include:[
            {
                model : MentoringApplication,
                attributes: ['application_title'],
                required:false,
            },
            {
                model : MentoringApplication,
                attributes: ['mentor'],
                required:false,
            }
            ],
            order: [
                ['created_at', 'DESC'],
            ],
            raw:true,

        })
        if (!items) {
            throw new Error('No items found');
          }
    }
    catch(error)
    {
        console.log(error);
        return res.status(errorCode.internalServerError).json({});
    }

    for (let i = 0; i < items.length; i++) {
        items[i]['title'] = items[i]['mentoring_application.application_title'];
        delete items[i]['mentoring_application.application_title'];
    }
    for(let i = 0; i<items.length; i++){
        items[i]['mentor'] = items[i]['mentoring_application.mentor'];
        delete items[i]['mentoring_application.mentor'];
    }
    res.status(errorCode.ok).json(items);
})
module.exports = router;