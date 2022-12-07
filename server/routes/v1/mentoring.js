'use strict';

const express = require('express');
const { verifyToken, errorCode, getErrMsg, authLevel, upload, makedir, SendMail } = require('../../middlewares/middlewares');
const { User, Service, Company, ConsultingApplication, ServiceApplication, ServiceSurvey,
    ConsultingResult, ServiceApplicationConfirm, ServiceElement, ServiceElementAttempt, ServiceCategory,
    EquipmentCategory, EquipmentElement,
    MaterialItem, MaterialUsage, AttachedFile } = require('../../models');
const { Op, or } = require("sequelize");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { FindMaterialItem, AddMaterialUsage, UpdateMaterialUsage, AddServiceElementAttempt, 
    AddEquipAndMaterialUsage, RemoveEquipAndMaterialUsage} = require('../../middlewares/dbapi');
const { raw } = require('body-parser');

const router = express.Router();

