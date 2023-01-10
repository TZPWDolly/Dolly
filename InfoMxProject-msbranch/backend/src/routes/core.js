const express = require('express');
const router = express.Router();
const core = require('../controllers/core');
const { authanticate } = require('../models/auth');

router.get('/api/v1/project', core.project);
router.get('/api/v1/org', core.org);
router.get('/api/v1/state', core.state);
router.get('/api/v1/division', core.division);
router.post('/api/v1/tspdiv', core.getTspByDiv);
router.post('/api/v1/villagetsp', core.getVillageByTsp);
router.post('/api/v1/clinictsp', core.getClinicByTsp);
router.post('/api/v1/allorg', core.getAllOrg);
router.get('/api/v1/getAllTownship', core.getAllTownship);
router.get('/api/v1/tsp', core.tsp);
router.get('/api/v1/clinic', core.clinic);
router.get('/api/v1/indi', core.indi)
router.get('/api/v1/service', core.service)

module.exports = router;