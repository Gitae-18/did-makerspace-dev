'use strict';

const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken, errorCode, authLevel } = require('../../middlewares/middlewares');
const { User, Company }= require('../../models');
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


const router = express.Router();

const{
    OAUTH_USER,
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REFRESH_TOKEN,
    OAUTH_ACCESS_TOKEN
} = process.env;
if(
    !OAUTH_USER ||
    !OAUTH_CLIENT_ID ||
    !OAUTH_CLIENT_SECRET ||
    !OAUTH_REFRESH_TOKEN||
    !OAUTH_ACCESS_TOKEN
){
    throw Error('OAuth 인증에 필요한 환경변수가 없습니다.');
}
function generatePass(pwLength) {
    let keylist="abcdefghijklmnopqrstuvwxyz123456789";
    let temp='';
    for (let i = 0; i < pwLength; i++) {
        temp += keylist.charAt(Math.floor(Math.random() * keylist.length));
    }

    return temp;
}

async function findUser(email) {
    let findResult;
    try {
        findResult = await User.findOne({
            attributes: [ 'user_no' ],
            where: { email:email },
            paranoid: false // deleted_at 포함해서 검사
        });
    } catch (error) {
        console.error(error);
        findResult = undefined;
    } 

    return findResult;
}

/* 
 * GET : /user
 * 기능설명 : 내 정보
 * 작성자 : 이승민
 * 작성일 : 2020.06.28
 */
router.get('/', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    const page = (req.query.page === undefined) ? 1 : Number(req.query.page);
    const limit = (req.query.limit === undefined) ? 7 : Number(req.query.limit);

    let my_where = { authority_level : { [Op.lt] : authLevel.system } };
    if (req.query.search) { my_where["name"] = { [Op.like]: "%" + req.query.search + "%"} }

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let findResult;
    try {
        findResult = await User.findAll({
            attributes: [[User.sequelize.fn('count', '*'), 'count']],
            //where: { authority_level : { [Op.lt] : authLevel.system } }
            where: my_where,
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    let total_count = findResult[0].dataValues.count;
    if (total_count <= 0) {
        return res.status(errorCode.ok).json({
            total_count: 0,
            total_page: 0,
            current_page: 0,
            offset: 0,
            limit,
            items: [],
        });
    }

    let total_page = Math.ceil(total_count / limit);
    let offset = ((page > total_page ? total_page : page) - 1) * limit;
    if (offset < 0) { offset = 0; }

    let items;
    //Company.hasMany(User, {foreignKey: 'company_no', sourceKey: 'company_no'});
    User.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
    try {
         items = await User.findAll({
            attributes: ['user_no', 'company_no', 'email', 'name', 'phone_number', 'authority_level', 'company_no', 'address', 'email_confirm_flag', 'created_at', 'updated_at'],
            include: [{
                model: Company, 
                attributes: ['name'],
                required:false   // left outer join
            }],
            order: [
                ['created_at', 'DESC'],
            ],
            //where: { authority_level : { [Op.lt] : authLevel.system } },
            where: my_where,
            offset: offset,
            limit: limit,
            raw: true
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    for (let i = 0; i < items.length; i++) {
        items[i]['co_name'] = items[i]['company.name'];
        delete items[i]['company.name'];
    }

    let result = {
        total_count,
        total_page,
        current_page: offset/limit+1,
        offset,
        limit,
        items,
    }

    return res.status(errorCode.ok).json(result);
});

router.post('/checkId', async (req, res, next) => {
    let body = req.body;

    if (body.email == undefined) {
        return res.status(errorCode.badRequest).json({});
    }

    const findResult = await findUser(body.email);
    if (findResult === undefined) {
        return res.status(errorCode.internalServerError).json({});
    }

    return res.status(errorCode.ok).json({
        result: (findResult) ? 'fail' : 'success'
    });
})

/* 
 * POST : /user/join
 * 기능설명 : 회원가입
 * 작성자 : 이승민
 * 작성일 : 2020.05.21
 */
router.post('/join', async (req, res, next) => {
    let body = req.body;
    //let user_no = req.decoded.user_no
    //let authority_level = req.decoded.authority_level;

    const findResult = await findUser(body.email);
    if (findResult) {
        return res.status(errorCode.badRequest).json({
            message: "이미 가입된 이메일입니다"
        });
    } else if (findResult === undefined) {
        return res.status(errorCode.internalServerError).json({});
    }

    let inputPassword = body.password;
    let salt = Math.round((Math.random() * 100000000));// + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt.toString()).digest("hex");

    let company_no;
    if (body.co_add !== undefined && body.co_add === true) {
        let inputResult;
        try {
            inputResult = await Company.create({
                name: body.co_name,
                registration_number: body.co_number,
                telephone_number: body.co_telephone,
                business_field: body.co_business,
                zip: body.co_zip,
                address: body.co_address,
                address_detail: body.co_address_detail,
                created_user_no: 1,
                updated_user_no: 1,
            });
        } catch (error) {
            console.error(error);
        }

        if (!(inputResult instanceof Company)) {
            return res.status(errorCode.internalServerError).json({});
        }

        company_no = inputResult.dataValues.company_no;
        if (!company_no || company_no <= 0) {
            return res.status(errorCode.internalServerError).json({});
        }
    }

    //console.log("compay_no = ", company_no);
    let inputResult;
    try {
        inputResult = await User.create({
            email: body.email,
            password: hashPassword,
            salt,
            name: body.name,
            phone_number: body.phone_number,
            zip: body.zip,
            address: body.address,
            address_detail: body.address_detail,
            authority_level: 1,
            policy_agree_flag: body.policy_agree_flag,
            privacy_agree_flag: body.privacy_agree_flag,
            company_no,
            company_position: body.co_position,
        });
    } catch (error) {
        console.error(error);
    }

    //console.log(createdUser.toJSON());
    if (!(inputResult instanceof User)) {
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});


router.post('/join/partner', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    
    console.log(body);

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    const findResult = await findUser(body.email);
    if (findResult) {
        return res.status(errorCode.badRequest).json({
            message: "이미 가입된 이메일입니다"
        });
    } else if (findResult === undefined) {
        return res.status(errorCode.internalServerError).json({});
    }

    let inputPassword = body.password;
    let salt = Math.round((Math.random() * 100000000));// + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt.toString()).digest("hex");

    let inputResult;
    try {
        inputResult = await User.create({
            email: body.email,
            password: hashPassword,
            salt,
            name: body.name,
            phone_number: body.phone_number,
            zip: '000000',
            address: 'no',
            authority_level: body.authority_level,
            policy_agree_flag: 'Y',
            privacy_agree_flag: 'Y',
            company_no: body.company_no
        });
    } catch (error) {
        console.error(error);
    }

    //console.log(createdUser.toJSON());
    if (!(inputResult instanceof User)) {
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});

/* 
 * DELETE : /user/drop
 * 기능설명 : 회원탈퇴
 * 작성자 : 이승민
 * 작성일 : 2020.05.21
 */
router.delete('/drop', verifyToken, async (req, res, next) => {
    const user_no = req.decoded.user_no;
    const body  = req.body;

    if (body.password === undefined) {
        return res.status(errorCode.badRequest).json({
            message: '데이터가 부족합니다.'
        });
    }

    let findResult;
    try {
        findResult = await User.findOne({
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json();
    }

    if (!findResult) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }

    let dbPassword = findResult.dataValues.password;
    let inputPassword = body.password;
    let salt = findResult.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt.toString()).digest("hex");
    if (dbPassword != hashPassword) {
        return res.status(errorCode.badRequest).json({
            message: '비밀번호가 잘못되었습니다.'
        });
    }

    let deleteResult = 0;
    try {
        deleteResult = await User.destroy({
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});

/* 
 * GET : /user/myinfo
 * 기능설명 : 내 정보
 * 작성자 : 이승민
 * 작성일 : 2020.06.28
 */
router.get('/myinfo', verifyToken, async (req, res, next) => {
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    if (user_no === undefined || user_no < 1) {
        return res.status(errorCode.notAcceptable).json({});
    }

    //console.log(user_no);
    let findResult;
    try {
        User.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
        //Company.hasMany(User, {foreignKey: 'company_no', sourceKey: 'company_no'});
        findResult = await User.findOne({
            attributes: ['email', 'name', 'phone_number', 'zip',
                         'address', 'address_detail', 'authority_level',
                         'company_no', 'company_position'],
            include: [{
                model: Company, 
                attributes: ['name', 'registration_number', 'telephone_number',
                             'business_field', 'zip', 'address', 'address_detail', 'partner_flag'],
                required:false   // left outer join
            }],
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
    }

    if (!findResult || findResult.length === 0) {
        return res.status(errorCode.internalServerError).json({});
    };

    res.status(errorCode.ok).json(findResult.dataValues);
});

router.put('/myinfo', verifyToken, async (req, res, next) => {
    const user_no = req.decoded.user_no;
    const body = req.body;
    console.log(body);

    let findResult;
    try {
        findResult = await User.findOne({
            //attributes: ['user_no', 'login_jwt', 'login_jwt_exfire'],
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json();
    }

    if (!findResult || findResult.length == 0) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }

    const company_no = findResult.dataValues.company_no;
    const isAddCompany = body.co_add;

    let dbPassword = findResult.dataValues.password;
    let inputPassword = body.password;
    let salt = findResult.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt.toString()).digest("hex");
    if (dbPassword != hashPassword) {
        return res.status(errorCode.badRequest).json({
            message: '비밀번호가 잘못되었습니다.'
        });
    }

    let userQuery = {
        phone_number: body.phone_number,
        zip: body.zip,
        address: body.address,
        address_detail: body.address_detail,
        updated_user_no: user_no,
    }

    if (company_no) {
        if (isAddCompany) { // Update Company
            let updateResult;
            try {
                updateResult = await Company.update({
                    name: body.co_name,
                    registration_number: body.co_number,
                    telephone_number: body.co_telephone,
                    business_field: body.co_business,
                    zip: body.co_zip,
                    address: body.co_address,
                    address_detail: body.co_address_detail,
                    updated_user_no: user_no,
                }, {
                    where: { company_no }
                });
            } catch (error) {
                console.error(error);
                return res.status(errorCode.internalServerError).json({});
            }

            if (updateResult == 0) {
                return res.status(errorCode.badRequest).json({});
            }

            userQuery.company_position = body.co_position;

        } else {    // Remove Company
            let deleteResult = 0;
            try {
                deleteResult = await Company.destroy({
                    where: { company_no }
                });
            } catch (error) {
                console.error('error');
                return res.status(errorCode.internalServerError).json({});
            }

            userQuery.company_no = null;
            userQuery.company_position = null;
        }
    } else {    
        if (isAddCompany) { // Create Company
            let inputResult;
            try {
                inputResult = await Company.create({
                    name: body.co_name,
                    registration_number: body.co_number,
                    telephone_number: body.co_telephone,
                    business_field: body.co_business,
                    zip: body.co_zip,
                    address: body.co_address,
                    address_detail: body.co_address_detail,
                    created_user_no: 1,
                    updated_user_no: 1,
                });
            } catch (error) {
                console.error(error);
            }

            if (!(inputResult instanceof Company)) {
                return res.status(errorCode.internalServerError).json({});
            }

            const new_company_no = inputResult.dataValues.company_no;
            if (!new_company_no || new_company_no <= 0) {
                return res.status(errorCode.internalServerError).json({});
            }

            userQuery.company_no = new_company_no;
            userQuery.company_position = body.co_position;
        }
    }

    let updateResult;
    try {
        updateResult = await User.update(userQuery, {
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (updateResult == 0) {
        return res.status(errorCode.badRequest).json({});
    }

    res.status(errorCode.ok).json({});
});


router.put('/password', verifyToken, async (req, res, next) => {
    const user_no = req.decoded.user_no;
    const body = req.body;

    if (body.password === undefined || body.new_password === undefined) {
        return res.status(errorCode.badRequest).json({
            message: '데이터가 부족합니다.'
        });
    }

    let findResult;
    try {
        findResult = await User.findOne({
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json();
    }

    if (!findResult || findResult.length == 0) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }

    let dbPassword = findResult.dataValues.password;
    let inputPassword = body.password;
    let salt = findResult.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt.toString()).digest("hex");
    if (dbPassword != hashPassword) {
        return res.status(errorCode.badRequest).json({
            message: '비밀번호가 잘못되었습니다.'
        });
    }


    let newInputPassword = body.new_password;
    let newSalt = Math.round((Math.random() * 100000000));// + "";
    let newHashPassword = crypto.createHash("sha512").update(newInputPassword + newSalt.toString()).digest("hex");

    let updateResult;
    try {
        updateResult = await User.update({
            password : newHashPassword,
            salt: newSalt,
            updated_user_no: user_no,
        }, {
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (updateResult == 0) {
        return res.status(errorCode.badRequest).json({});
    }

    res.status(errorCode.ok).json({});
});

/* 
 * GET : /user/:id
 * 기능설명 : 정보
 * 작성자 : 이승민
 * 작성일 : 2020.05.21
 */
router.get('/:id', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let target_user_no = req.params.id;

    console.log(req.params.id);
    let findResult;
    try {
        User.hasOne(Company, {foreignKey: 'company_no', sourceKey: 'company_no'});
        //Company.hasMany(User, {foreignKey: 'company_no', sourceKey: 'company_no'});
        findResult = await User.findOne({
            attributes: ['email', 'name', 'phone_number', 'zip',
                         'address', 'address_detail', 'authority_level',
                         'company_no', 'company_position'],
            include: [{
                model: Company, 
                attributes: ['name', 'registration_number', 'telephone_number',
                             'business_field', 'zip', 'address', 'address_detail', 'partner_flag'],
                required:false   // left outer join
            }],
            where: { user_no: req.params.id }
        });
    } catch (error) {
        console.error(error);
    }

    if (!findResult || findResult.length === 0) {
        return res.status(errorCode.internalServerError).json({});
    };

    res.status(errorCode.ok).json(findResult.dataValues);
});

/* 
 * PUT : /user/:id
 * 기능설명 : 정보
 * 작성자 : 이승민
 * 작성일 : 2020.05.21
 */
/*
router.put('/:id', async (req, res, next) => {
    const { phone_number, zip, address, address_detail }  = req.body;

    console.log(req.params.id);
    
    let updateResult;
    try {
        updateResult = await User.update({
            phone_number,
            zip,
            address,
            address_detail,
        }, {
            where: { user_no: req.params.id }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (updateResult == 0) {
        return res.status(errorCode.badRequest).json({});
    }

    console.log(updateResult);
    res.status(errorCode.ok).json({});
});
*/

/* 
 * POST : /user/login/
 * 기능설명 : 로그인
 * 작성자 : 이승민
 * 작성일 : 2020.03.24
 */
router.post('/login', async (req, res, next) => {
    let {user_id, password} = req.body;
    //let user_no = req.decoded.user_no;
    //let authority_level = req.decoded.authority_level;
    //let target_user_no = req.params.id;

    if (!user_id || !password) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }

    let findResult;
    try {
        findResult = await User.findOne({
            attributes: ['user_no', 'login_jwt', 'login_jwt_exfire','email','salt','name','zip','address','company_no','created_user_no','updated_user_no','authority_level',
            'email_confirm_flag','created_at','updated_at','deleted_at','address_detail','password'],
            where: { email: user_id }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json();
    }

    if (!findResult || findResult.length == 0) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }

    let authority_level = findResult.authority_level;
    let name = findResult.name;
    let dbPassword = findResult.dataValues.password;
    let inputPassword = password;
    let salt = findResult.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt.toString()).digest("hex");
    if (dbPassword != hashPassword) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }
 
    /*
    let token = jwt.sign({
        user_no: findResult.dataValues.user_no,
        email: user_id,
        authority_level
    }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        issuer: 'feelink',
    });
    */

    let token;
    if (!findResult.dataValues.login_jwt) {
        token = jwt.sign({
            user_no: findResult.dataValues.user_no,
            email: user_id,
            authority_level
        }, process.env.JWT_SECRET, {
            //expiresIn: '1m',
            issuer: 'feelink',
        });
        res.send(token);
        await User.update({
            login_jwt: token,
        }, {
            where: { user_no: findResult.dataValues.user_no }
        });
    } else {
        token = findResult.dataValues.login_jwt;
    }

    /*  cookie
    res.cookie('user_id', user_id , {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
    });
    */
    res.status(errorCode.ok).json({
        name,
        authority_level,
        token
    });
});

/* 
 * POST : /auth/logout/
 * 기능설명 : 로그아웃
 * 작성자 : 이승민
 * 작성일 : 2020.03.24
 */
router.post('/logout', (req, res) => {

});

router.put('/partner/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    //const target_user_no = req.query.userno;
    const target_user_no = req.params.no;
    if (!target_user_no) {
        return res.status(errorCode.badRequest).json({});
    }

    console.log(authority_level, body.authority_level);
    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    if (body.authority_level && authority_level < body.authority_level) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let findResult;
    try {
        findResult = await User.findOne({
            where: { user_no : target_user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!findResult) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }

    const user = findResult.dataValues;
    if (authority_level < user.authority_level) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let result;
    try {
        result = await User.update({
            authority_level: body.authority_level
        }, {
            where: { user_no : target_user_no }
        });

    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});

router.delete('/partner/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;

    const target_user_no = req.params.no;
    if (!target_user_no) {
        return res.status(errorCode.badRequest).json({});
    }

    if (authority_level < authLevel.manager) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let findResult;
    try {
        findResult = await User.findOne({
            where: { user_no : target_user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!findResult) {
        return res.status(errorCode.badRequest).json({
            message: '사용자 정보가 잘못되었습니다.'
        });
    }

    const user = findResult.dataValues;
    if (authority_level < user.authority_level) {
        return res.status(errorCode.notAcceptable).json({});
    }

    let deleteResult = 0;
    try {
        deleteResult = await User.destroy({
            where: { user_no: target_user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json({});
});


router.get('/partner/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let company_no = req.params.no;

    let findResult;
    try {
        findResult = await User.findAll({
            attributes: ['user_no', 'name', ],
            where: { company_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    res.status(errorCode.ok).json(
        findResult
    );
});

router.get('/represent/:no', verifyToken, async (req, res, next) => {
    let body = req.body;
    let user_no = req.decoded.user_no;
    let authority_level = req.decoded.authority_level;
    let company_no = req.params.no;

    Company.hasOne(User, {foreignKey: 'user_no', sourceKey: 'user_no'});
    let item;
    try {
         item = await Company.findOne({
             attributes: ['company_no', 'user_no', 'name'],
             include: [{
                 model: User, 
                 attributes: ['email', 'name', 'phone_number' ],
                 required:false   // left outer join
             }],
             raw: true,
             where: { company_no }
         });
     } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }

    if (!item) {
        return res.status(errorCode.badRequest).json({
            message: '회사 정보가 없습니다.'
        });
    }

    res.status(errorCode.ok).json({
        company_no: item['company_no'],
        user_no: item['user_no'],
        co_name: item['name'],
        email: item['user.email'], 
        name: item['user.name'],
        phone_number: item['user.phone_number'] 
    });
});


router.post('/findpassword', async (req, res, next) => {
    let body = req.body;

    if (!body.name || !body.email || !body.phone_number) {
        return res.status(errorCode.badRequest).json();
    }

    
    async function main(receiverEmail) {
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                type: 'OAuth2',
                user: process.env.OAUTH_USER,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                accessToken: process.env.OAUTH_ACCESS_TOKEN,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                expires: 1484314697598,
            },
        });
        
    let find;
    try {
        find = await User.findOne({
            attributes: ['user_no'],
            where: { 
                name: body.name,
                email: body.email,
                phone_number: body.phone_number
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json();
    }

    if (!find) {
        return res.status(errorCode.noContent).json();
    }

    const user_no = find.dataValues.user_no;
    let newPassword = generatePass(8);

    let newSalt = Math.round((Math.random() * 100000000));// + "";
    let newHashPassword = crypto.createHash("sha512").update(newPassword + newSalt.toString()).digest("hex");

    let updateResult;
    try {
        updateResult = await User.update({
            password : newHashPassword,
            salt: newSalt,
            updated_user_no: 1, // system
        }, {
            where: { user_no }
        });
    } catch (error) {
        console.error(error);
        return res.status(errorCode.internalServerError).json({});
    }
    const message = {
            from : OAUTH_USER,
            to: receiverEmail,
            subject: '[DID 기술융합공작소] 임시 비밀번호가 발송되었습니다.',
            text:'임시 비밀번호입니다 [ ' + newPassword + ' ] 확인 후 변경 바랍니다.',
        };
        try{
            await transporter.sendMail(message);
            console.log('메일을 성공적으로 발송했습니다.');
        }
        catch(e){
            console.log(e);
        }
    }main(body.email)

   /* let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SYSTEM_EMAIL, // gmail id
            pass: process.env.SYSTEM_EMAILPW // gmail pw
        }
    });*/

    /*let mailOptions = {
        from: process.env.SYSTEM_EMAIL,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: body.email ,                     // 수신 메일 주소
        subject: '[DID 기술융합공작소] 임시 비밀번호가 발송되었습니다.',   // 제목
        text: '임시 비밀번호입니다 [ ' + newPassword + ' ] 확인 후 변경 바랍니다.'  // 내용
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });*/

    res.status(errorCode.ok).json({});
});



router.get('/test',  (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.json(req.decoded);
    res.status(errorCode.ok).json({});
});

module.exports = router;
