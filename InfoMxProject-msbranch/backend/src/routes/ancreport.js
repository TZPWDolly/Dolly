const express = require('express');
const router = express.Router();
const anc = require('../controllers/ancreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/ancreport', anc.ancReport);

module.exports = router;