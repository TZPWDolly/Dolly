const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getpatient', service.getPatient);
router.post('/api/v1/getpatienttype', service.getPatient);


module.exports = router;
