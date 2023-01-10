const express = require('express');
const router = express.Router();
const icd = require('../controllers/clrreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/clrreport', icd.clrReport);

module.exports = router;