'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/middlewares');
const { Device }= require('../models');

const router = express.Router();

function genRandomId(prefix) {
    let width = 11;
    let min = Math.pow(10, width - 1) + 1;
    let max = Math.pow(10, width) - 1;
    //console.log(min);
    //console.log(max);
    let n = Math.floor(Math.random() * (max - min)) + min;
    n = n.toString();
    return prefix + ((n.length >= width) ? n : new Array(width - n.length + 1).join('0') + n);
}

var generator = require('generate-password');
function genRandomPassword() {
    return generator.generate({
        length: 32,
        numbers: true,
        symbols: true,
        stric: true,
    });
}

router.post('/gateway', (req, res, next) => {
    const { serialNo }  = req.body;
    let result = {
        success: false,
    };

    try {
        Device.findAll({
            where: { serialNo }
        })
        .then(exUser => {
            if (exUser.length == 0) {
                let deviceId = genRandomId('D');
                let deviceKey = genRandomPassword();
                Device.create({
                    deviceId,
                    deviceKey,
                    serialNo,
                }).then(done => {
                    result.success = true;
                    res.json(result);
                });
            } else {
                res.json(result);
            }
        })
    } catch (error) {
        console.error('error');
        next(error);
    }
});

module.exports = router;