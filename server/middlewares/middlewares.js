'use strict';

const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요'); }
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.verifyToken = (req, res, next) => {
    //return next();
    console.log(req.headers.authorization);
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next() ;
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효기간 초과
            return res.status(this.errorCode.unauthorized).json({
                code: this.errorCode.unauthorized,
                message: '토큰이 만료되었습니다',
            });
        }

        return res.status(this.errorCode.unauthorized).json({
            code: this.errorCode.unauthorized,
            message: '유효하지 않은 토큰입니다',
        });
    }
};

let last_name;
exports.upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'upload/temp');
        },
        filename(req, file, cb) {
            let datenow = Date.now();
            let hrtime = process.hrtime();
            let temp_name = datenow.toString() + hrtime[1].toString();;
            // console.log(file);
            // const ext = path.extname(file.originalname);
            // cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
            cb(null, temp_name);
        },
    }),
    limits: {
        files: 10,
        fileSize: 50 * 1024 * 1024
    },
});

exports.makedir = (path) => {
    if (!fs.existsSync(path)) {
        mkdirp.sync(path, (error) => {
            if (error) {
                console.error(error);
            }
        });
    }
}

exports.errorCode = {
    ok: 200,
    created: 201,
    noContent: 204,
    resetContent: 205,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    methodNotAllowed: 405,
    notAcceptable: 406,
    internalServerError: 500,
    serviceUnavailable: 503
};

exports.authLevel = {
    user : 1,
    partner : 10,
    scheduler : 50,
    manager : 70,
    superAdmin : 90,
    system : 100
};

exports.getErrMsg = (errors) => {
    let err = {};
    switch (errors.validatorKey) {
        case "not_unique":
            err.message = { message : errors.value + "가(이) 이미 등록되어 있습니다." };
            err.code = this.errorCode.badRequest;
            break;
        default:
            err.message = { message : errors.value };
            err.code = this.errorCode.internalServerError;
            break;
    }

    return err;
};

exports.SendMail = async(email, subject, content) => {
    /*
    console.log('send-mail');
    console.log(email);
    console.log(subject);
    console.log(content);
    */
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
        !OAUTH_REFRESH_TOKEN || 
        !OAUTH_ACCESS_TOKEN
    ){
        throw Error('OAuth 인증에 필요한 환경변수가 없습니다.');
    }
    
    /*let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SYSTEM_EMAIL, // gmail id
            pass: process.env.SYSTEM_EMAILPW // gmail pw
        }
    });*/
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
    const message = {
        from : OAUTH_USER,
        to: receiverEmail,
        subject: '[DID 기술융합공작소] ' + subject,
        text: content,
    };
    try{
        await transporter.sendMail(message);
        logger.http('http message, 메일을 성공적으로 발송했습니다');
        //console.log('메일을 성공적으로 발송했습니다.');
    }
    catch(e){
        console.log(e);
    }
    }main(email)
    /*let mailOptions = {
        from: process.env.SYSTEM_EMAIL,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: '[DID 기술융합공작소] ' + subject ,   // 제목
        text: content  // 내용
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });*/
    
}
