'use strict';

const { Service} = require('../../../models');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3006;
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();
//임시데이터
app.get("/api/v1/stastics", async (req, res, next) => {
    try {
        res.set({ 'access-control-allow-origin': '*' });
        res.req.method = req.header['access-control-request-method'];
        const findService = await Service.findAll({
            attributes: ['service_no','title', 'progress','created_at']
        }); res.json(findService);

    } catch (e) {
        console.log(e);
    }
});
app.use(cors());
app.listen(port, () => console.log(`http://localhost: ${port}`));

