'use strict';

const express = require('express');

const { verifyToken, errorCode, getErrMsg, authLevel } = require('../../middlewares/middlewares');

const {Worker} = require('../../models');
const { Op } = require("sequelize");
const path = require('path');
const moment = require('moment');
const { sequelize } = require('../../models/index');

const router = express.Router();

router.get('/workers', async(req,res,next)=>{
    const body = req.body; 
    let result;
    try{
        result = await Worker.findAll({
            attributes:['worker_no','indp','name','info'],
            required:false,
        })
    }
    catch(error)
    {
        console.error(error);
        return res.status(errorCode.internalServerError).json({}); 
    }
    res.status(errorCode.ok).json(result);
})

module.exports = router;