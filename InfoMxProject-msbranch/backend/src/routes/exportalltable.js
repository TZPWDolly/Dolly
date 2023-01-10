const express = require('express');
const router = express.Router();
const exportAll = require('../controllers/exportalltable');
const { authanticate } = require('../models/auth');

router.post('/api/v1/exportalltable', exportAll.exportAllTable);

module.exports = router;
