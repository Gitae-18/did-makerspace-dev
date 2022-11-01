'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/middlewares');
const { User }= require('../models');

const router = express.Router();

/* 
 * POST : /user/login/
 * 기능설명 : 로그인
 * 작성자 : 이승민
 * 작성일 : 2020.03.24
 */
router.post('/login', async (req, res, next) => {
    let { user_id, password } = req.body;
    let result = {
        success: false,
    };
    
    try {
        let findUser = await User.findOne({
            attributes: ['user_no', 'login_jwt', 'login_jwt_exfire'],
            where: { email: user_id, password }
        });

        if (!findUser || findUser.length === 0) {
            return res.status(401).json({
                code: 401,
                message: '가입되지 않은 이메일입니다. 먼저 가입하세요.'
            })
            //res.json(result);
            //return;
        };
        let token;
        if (!findUser.dataValues.login_jwt) {
            console.log('undefined login_jwt');
            token = jwt.sign({
                user_no: findUser.dataValues.user_no,
                user_id: user_id,
            }, process.env.JWT_SECRET, {
                expiresIn: '1m',
                issuer: 'feelink',
            });

            await User.update({
                login_jwt: token,
            }, {
                where: { user_no: findUser.dataValues.user_no }
            });
        } else {
            token = findUser.dataValues.login_jwt;
        }

        result.success = true;
        result.token = token;
        res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }

});

/* 
 * POST : /auth/logout/
 * 기능설명 : 로그아웃
 * 작성자 : 이승민
 * 작성일 : 2020.03.24
 */
router.post('/logout', (req, res) => {

});




module.exports = router;