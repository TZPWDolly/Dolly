const express = require('express');
const router = express.Router();
const diagnosis = require('../controllers/diagnosis');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getdiagnosis', diagnosis.getDiagnosis);
router.post('/api/v1/getimci', diagnosis.getDiagnosis);


module.exports = router;