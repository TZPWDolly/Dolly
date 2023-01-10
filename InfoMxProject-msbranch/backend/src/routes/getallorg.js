const express = require('express');
const router = express.Router();
const org = require('../controllers/getallorg');
const { authanticate } = require('../models/auth');


router.post('/api/v1/getallorg',  org.getAllOrg);

module.exports = router;