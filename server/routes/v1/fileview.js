'use strict';

const express = require('express');
const { verifyToken, errorCode } = require('../../middlewares/middlewares');
const { Archive, Faq, FaqFile, NoticeFile, ClassEduFile ,ArchiveFile} = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
//const mime = require('mime/lite');
//const path = require('path');
const fs = require('fs');
const router = express.Router();


router.get('/:fileview_no/faqfile', async (req, res, next) => {
    let faq_no = req.params.fileview_no;


    let files;
    try {
        files = await FaqFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: {
                faq_no
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let file_data = files[0].dataValues;

    const path = "upload/newfaq/";
    const file_name = path + file_data.name;

    let file = fs.readFileSync(`${file_name}`, 'binary')
    let encode = Buffer.from(file).toString('base64');

    let params = [file, encode];
  /*   if(file.length>0)
    {
    return res.set({ "Content-Type": "image/*" }).send({ file });
    }
    else{
        return null;
    } */

});
router.get('/:fileview_no/noticefile',async (req, res, next) => {
    let notice_no = req.params.fileview_no;
    let files;
    try {
        files = await NoticeFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: {
                notice_no
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

   /*  let file_data = files[0].dataValues;
  
    const path = "upload/newnotice/";
    const file_name = path + file_data.name;

    let file = fs.readFileSync(`${file_name}`, 'binary')
    let encode = Buffer.from(file).toString('base64');
    let params = [file, encode]; */
   /*  if(file.length>0)
    {
    return res.set({ "Content-Type": "image/*" }).send({ file });
    }
    else{
        return null;
    } */
    res.status(errorCode.ok).json({});
});
router.get('/:fileview_no/classedufile'/* ,verifyToken */, async (req, res, next) => {
    let program_no = req.params.fileview_no;

    let files;
    try {
        files = await ClassEduFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: {
                program_no
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    let file_data
    if(file_data)
    {
    file_data = files[0].dataValues;
    console.log(file_data);
    const path = "upload/newprogram/";
    const file_name = path + file_data.name;
    let file = fs.readFileSync(`${file_name}`, 'binary')
    return res.set({ "Content-Type": "image/*" }).send({ file });
    }
    else{
        res.status(errorCode.ok).json({});
    }
    //res.status(errorCode.ok).json({});
});



router.get('/:fileview_no/classeducontent', async (req, res, next) => {
    let program_no = req.params.fileview_no;
    let files;
    try {
        files = await ClassEduFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: {
                program_no
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let file_data = [];
    const path = "upload/newprogram/";
    file_data = files.map((item,index)=>(
       path + item.dataValues.name
    ))
    console.log(file_data)
    let file = [];
    file = file_data.map((item, index) => {
      const data = fs.readFileSync(item, 'binary');
      return data
    });
   /*  console.log(file);
    if(file.length>0)
    {
    return res.set({ "Content-Type": "image/*" }).send({ file });
    }
    else{
        return null;
    } */
});


router.get('/:fileview_no/archivefile', async (req, res, next) => {
    let archive_no = req.params.fileview_no;


    let files;
    try {
        files = await ArchiveFile.findAll({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: {
                archive_no
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let file_data = files[0].dataValues;

    const path = "upload/newarchive/";
    const file_name = path + file_data.name;
 
    let file = fs.readFileSync(`${file_name}`, 'binary')
    let encode = Buffer.from(file).toString('base64');

    let params = [file, encode];
   /*  if(file_data !== undefined)
    {
    return res.set({ "Content-Type": "image/*" }).send({ file });
    }
    else{
        return null;
    } */
});
module.exports = router;