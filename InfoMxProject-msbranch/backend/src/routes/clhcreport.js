const express = require('express');
const router = express.Router();
const icd = require('../controllers/clhcreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/clhcreport', icd.clhcReport);

module.exports = router;