const express = require('express');
const router = express.Router();
const dash = require('../controllers/dashboard');
const { authanticate } = require('../models/auth');

router.get('/api/v1/indi/FP', dash.fp);
router.get('/api/v1/indi/HC', dash.hc);
router.get('/api/v1/indi/GM', dash.gm);
router.get('/api/v1/indi/PNC', dash.pnc);
router.get('/api/v1/indi/DELI', dash.deli);
router.get('/api/v1/indi/CHILD', dash.child);
router.get('/api/v1/indi/FPRH', dash.fprh);
router.get('/api/v1/indi/ANC', dash.anc);
router.get('/api/v1/indi/RH', dash.rh);


module.exports = router;