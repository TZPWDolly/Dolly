const express = require('express');
const router = express.Router();
const service = require('../controllers/clinicbyorgproj');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getclinicbyorgproj', service.getClinicByOrgProj);


module.exports = router;