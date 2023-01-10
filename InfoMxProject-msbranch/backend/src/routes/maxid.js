const express = require('express');
const router = express.Router();
const max = require('../controllers/maxid');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getmaxid',  max.maxid);

module.exports = router;