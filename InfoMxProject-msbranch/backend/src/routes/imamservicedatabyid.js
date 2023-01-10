const express = require('express');
const router = express.Router();
const serviceLab = require('../controllers/imamservicedatabyid');
const { authanticate } = require('../models/auth');

router.post('/api/v1/imamservicedatabyid', serviceLab.imamservicedatabyid);

module.exports = router;