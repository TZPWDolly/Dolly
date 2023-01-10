const express = require('express');
const router = express.Router();
const cov = require('../controllers/coverage');
const { authanticate } = require('../models/auth');

router.get('/api/v1/coverage', cov.coverage);

module.exports = router;
