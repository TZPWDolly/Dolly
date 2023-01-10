const express = require('express');
const router = express.Router();
const pnc = require('../controllers/pncreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/pncreport', pnc.pncReport);

module.exports = router;