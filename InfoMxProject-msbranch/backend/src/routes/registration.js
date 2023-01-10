const express = require('express');
const router = express.Router();
const reg = require('../controllers/registration');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertreg',  reg.insertReg);
router.put('/api/v1/updatereg',  reg.updateReg);


module.exports = router;