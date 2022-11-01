'use strict';

const express = require('express');
const { verifyToken, errorCode, authLevel } = require('../../middlewares/middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AttachedFile } = require('../../models');

const router = express.Router();

router.get('/:file_no/download', verifyToken, async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let attached_file_no = req.params.file_no;


    let file_info;
    try {
        file_info = await AttachedFile.findOne({
            attributes: ['attached_file_no', 'original_name', 'name', 'path', 'filesize'],
            where: { 
                attached_file_no
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    const file = file_info.dataValues.path + '/' + file_info.dataValues.name;

    res.download(file, file_info.dataValues.original_name, function(err) {
        if (err) {
            res.json({err:err});
        } else {
            res.end();
        }
    });

    //res.status(errorCode.ok).json({});
});


router.delete('/:file_no', verifyToken, async (req, res, next) => {
    //let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let attached_file_no = req.params.file_no;

    // if (authority_level && authority_level == 1) {}

    let findResult;
    try {
        findResult = await AttachedFile.findOne({
            where: { attached_file_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json();
    }

    const filePath = path.join(findResult.dataValues.path, '/', findResult.dataValues.name);
    const result = fs.access(filePath, fs.constants.F_OK, (err) => { 
        if (err) { 
            return console.log('삭제할 수 없는 파일입니다');
        }

        const result = fs.unlink(filePath, (err) => { 
            if (err) {
                return console.log(err);
            }
        });
    });

    let deleteResult = 0;
    try {
        deleteResult = await AttachedFile.destroy({
            where: { attached_file_no }
        });
    } catch (error) {
        console.error('error');
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});

module.exports = router;
