const express = require('express');
const router = express.Router();
const edit = require('../controllers/editage');
const { authanticate } = require('../models/auth');

router.put('/api/v1/editage',  edit.editAge);


module.exports = router;