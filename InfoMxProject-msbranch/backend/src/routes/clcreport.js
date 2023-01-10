const express = require('express');
const router = express.Router();
const icd = require('../controllers/clcreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/clcreport', icd.clcReport);

module.exports = router;