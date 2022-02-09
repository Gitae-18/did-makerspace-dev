'use strict';

const { MaterialItem } = require('../../../models');
const express = require('express');
const app = express();
const cors = require('cors');

const { Op } = require("sequelize");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();
//임시데이터
app.get("/stastics/materialchart", async (req, res, next) => {
    try {
        res.set({ 'access-control-allow-origin': '*' });
        res.req.method = req.header['access-control-request-method'];
        const findMaterial = await MaterialItem.findAll({
            attributes: ['material_item_no', 'name', 'quantity']
        }); res.json({ data: findMaterial });

    } catch (e) {
        console.log(e);
    }
});
app.use(cors());


