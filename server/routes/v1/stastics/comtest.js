'use strict';

const { User, Company } = require('../../../models');
const { verifyToken, errorCode, getErrMsg, authLevel, upload, makedir, SendMail } = require('../../middlewares/middlewares');
const express = require('express');
const app = express();
const cors = require('cors');
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//임시데이터
app.get("/stastics/comtest", async (req, res, next) => {
    try {
        res.set({ 'access-control-allow-origin': '*' });
        res.req.method = req.header['access-control-request-method'];
        const findCompany = await Company.findAll({
            attributes: ['company_no', 'name', 'business_field', 'telephone_number']
        }); res.json(findCompany);

    } catch (e) {
        console.log(e);
    }
    return;
});
app.use(cors())
app.listen(port, () => console.log(`http://localhost: ${port}`));

