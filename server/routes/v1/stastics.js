'use strict';

const { User, Company, MaterialItem, Service, ConsultingApplication, MaterialUsage, EquipmentCategory, MaterialCategory } = require('../../models');
const jwt = require('jsonwebtoken');
const { verifyToken, errorCode, authLevel } = require('../../middlewares/middlewares');
const express = require('express');
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({extended:true}));
const router = express.Router();
//임시데이터
router.get("/com", async (req, res, next) => {
    try {

        const findCompany = await Company.findAll({
            attributes: ['company_no', 'name', 'business_field', 'telephone_number']
        }); res.json(findCompany);

    } catch (e) {
        console.log(e);
    }
    return;
});
router.get("/mat", async (req, res, next) => {
    
});
router.get("/eqi", async (req, res, next) => {
    try {
        const findEquipment = await EquipmentCategory.findAll({
            attributes: ['equipment_category_no', 'service_category_no', 'model_name', 'model_number', 'purpose', 'created_at']
        }); res.json({ data: findEquipment });

    } catch (e) {
        console.log(e);
    }
});
router.get("/matuse", async (req, res, next) => {
    try {
        const findMaterialUse = await MaterialUsage.findAll({
        }); res.json({ data: findMaterialUse });

    } catch (e) {
        console.log(e);
    }
});
router.get("/", async (req, res, next) => {
    try {
        const findMaterial = await MaterialItem.findAll({
        }); res.json(findMaterial);

    } catch (e) {
        console.log(e);
    }
});
router.get("/consult", async (req, res, next) => {
    try {
        const findConsultingApplication = await ConsultingApplication.findAll({
            attributes: ["service_no", "content", "created_at"]
        }); res.json(findConsultingApplication);

    } catch (e) {
        console.log(e);
    }
});
router.get("/ser", async (req, res, next) => {
    try {
        const findService = await Service.findAll({
            attributes: ['service_no', 'title', 'progress', 'created_at', 'status']
        }); res.json(findService);

    } catch (e) {
        console.log(e);
    }
});
router.get("/use", async (req, res, next) => {
    //let test = req.body.test;
    try {
        const findUser = await User.findAll({
            attributes: ['user_no', 'name', 'email', 'address'],

        }); res.json(findUser);

    } catch (e) {
        console.log(e);
    }
    return;
});



module.exports = router;