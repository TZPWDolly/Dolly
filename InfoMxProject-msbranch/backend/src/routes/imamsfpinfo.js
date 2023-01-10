const express = require('express');
const router = express.Router();
const IMAMSFP = require('../controllers/imamsfpinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertIMAMSFP',  IMAMSFP.insertIMAMSFP);
router.put('/api/v1/updateIMAMSFP',  IMAMSFP.updateIMAMSFP);
router.put('/api/v1/deleteIMAMSFP',  IMAMSFP.deleteIMAMSFP);

module.exports = router;