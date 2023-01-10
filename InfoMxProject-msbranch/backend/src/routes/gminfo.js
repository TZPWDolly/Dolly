const express = require('express');
const router = express.Router();
const GM = require('../controllers/gminfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertGM',  GM.insertGM);
router.put('/api/v1/updateGM',  GM.updateGM);
router.put('/api/v1/deleteGM',  GM.deleteGM);

module.exports = router;