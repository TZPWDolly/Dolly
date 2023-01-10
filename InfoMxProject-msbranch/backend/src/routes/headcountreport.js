const express = require('express');
const router = express.Router();
const hc = require('../controllers/headcountreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/hcreport', hc.hcReport);

module.exports = router;