'use strict';

const express = require('express');
const { verifyToken, upload, makedir } = require('../../middlewares/middlewares');
const fs = require('fs');

const router = express.Router();

const verifyDir = (req, res, next) => {
    let user_no = req.decoded.user_no;
    fs.readdir('uploads/' + user_no, async (error) => {
        if (error) {
            console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
            await fs.mkdirSync('uploads/' + user_no);
        }
        next();
    });
}



/*
router.post('/', verifyToken, upload.single('file'), async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    console.log('1. user no = ', body);

    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
    //res.json(findResult.dataValues);
});
*/
router.post('/', verifyToken, upload.array('files'), async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    console.log(req.files);

    if (req.files.length > 0) {
        makedir('upload/' + user_no);

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            fs.renameSync(file.path, 'upload/' + user_no + '/' + file.filename, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    }

    res.json({});
    //res.json(findResult.dataValues);
});

module.exports = router;
