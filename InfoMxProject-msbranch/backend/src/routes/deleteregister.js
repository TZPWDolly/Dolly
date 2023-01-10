const express = require('express');
const router = express.Router();
const del = require('../controllers/deleteregister');
const { authanticate } = require('../models/auth');

router.put('/api/v1/deleteregister',  del.deleteRegister);


module.exports = router;