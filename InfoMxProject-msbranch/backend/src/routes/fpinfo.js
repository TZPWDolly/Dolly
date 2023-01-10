const express = require('express');
const router = express.Router();
const RH = require('../controllers/fpinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertFP',  RH.insertFP);
router.put('/api/v1/updateFP',  RH.updateFP);
router.put('/api/v1/deleteFP',  RH.deleteFP);

module.exports = router;