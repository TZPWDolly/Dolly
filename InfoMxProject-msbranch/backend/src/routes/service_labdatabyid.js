const express = require('express');
const router = express.Router();
const serviceLab = require('../controllers/service_labdatabyid');
const { authanticate } = require('../models/auth');

router.post('/api/v1/servicelabdatabyid', serviceLab.serviceLabDataByID);

module.exports = router;