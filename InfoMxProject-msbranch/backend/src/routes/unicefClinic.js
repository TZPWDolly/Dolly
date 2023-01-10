const express = require('express');
const router = express.Router();
const service = require('../controllers/unicefClinic');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getunicefclinic', service.getUnicefClinic);


module.exports = router;