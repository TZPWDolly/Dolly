const express = require('express');
const router = express.Router();
const rh = require('../controllers/rhreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/rhreport', rh.rhReport);

module.exports = router;