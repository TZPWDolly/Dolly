const express = require('express');
const router = express.Router();
const background = require('../controllers/background');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getvillageorg', authanticate, background.getVillageByOrg);


module.exports = router;