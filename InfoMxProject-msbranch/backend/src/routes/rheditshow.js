const express = require('express');
const router = express.Router();
const edit = require('../controllers/rheditshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/rheditshow', edit.RHEditShow);

module.exports = router;