'use strict';

const { User,Company} = require('../../../models');
const jwt = require('jsonwebtoken');
const { verifyToken, errorCode, authLevel } = require('../../../middlewares/middlewares');
const express = require('express');
const app =  express();
const cors = require('cors');
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
const router = express.Router();
//임시데이터
app.get("/stastics/test",async(req,res,next) =>{
//let test = req.body.test;
try{
res.set({'access-control-allow-origin': '*'});
res.req.method = req.header['access-control-request-method'];
const findUser = await User.findAll({
    attributes:['user_no','name','email','address'],
                                                                                                                                                           
});res.json(findUser); 

} catch (e){
    console.log(e);
}
return;
});
app.use(cors());



