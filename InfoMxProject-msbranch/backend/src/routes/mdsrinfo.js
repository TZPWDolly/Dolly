const express = require('express');
const router = express.Router();
const MDSR = require('../controllers/mdsrinfo');
const { authanticate } = require('../models/auth');

router.post('/api/v1/insertMDSR',  MDSR.insertMDSR);
router.put('/api/v1/updateMDSR',  MDSR.updateMDSR);
router.put('/api/v1/deleteMDSR',  MDSR.deleteMDSR);

module.exports = router;