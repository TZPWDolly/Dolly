const express = require('express');
const router = express.Router();
const exportAll = require('../controllers/exportbyproject');
const { authanticate } = require('../models/auth');

router.post('/api/v1/exportbyproject', exportAll.exportAllTable);

module.exports = router;