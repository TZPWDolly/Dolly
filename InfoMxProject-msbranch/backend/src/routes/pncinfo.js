const express = require('express');
const router = express.Router();
const PNC = require('../controllers/pncinfo');
const { authanticate } = require('../models/auth');

router.post('/api/v1/insertPNC',  PNC.insertPNC);
router.put('/api/v1/updatePNC',  PNC.updatePNC);
router.put('/api/v1/deletePNC',  PNC.deletePNC);

module.exports = router;