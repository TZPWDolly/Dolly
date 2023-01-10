const express = require('express');
const router = express.Router();
const deli = require('../controllers/delireport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/delireport', deli.deliReport);

module.exports = router;