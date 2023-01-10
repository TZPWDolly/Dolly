const express = require('express');
const router = express.Router();
const lg = require('../controllers/login');
const { authanticate } = require('../models/auth');

router.get('/api/v1/login', lg.login);

module.exports = router;