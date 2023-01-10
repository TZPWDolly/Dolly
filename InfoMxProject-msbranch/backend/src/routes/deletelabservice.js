const express = require('express');
const router = express.Router();
const del = require('../controllers/deletelabservice');
const { authanticate } = require('../models/auth');

router.put('/api/v1/deletelabservice',  del.deleteLabService);


module.exports = router;