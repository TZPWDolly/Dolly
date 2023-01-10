const express = require('express');
const router = express.Router();
const edit = require('../controllers/editmdsrshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/editmdsrshow', edit.editMDSRShow);
router.post('/api/v1/getmdsrpatient', edit.getMDSRPatient);
router.post('/api/v1/getmdsr', edit.getMDSR);
/* router.post('/api/v1/getpatientbyid', edit.editShow);
router.post('/api/v1/getpatientforsearch', edit.editShow);
router.post('/api/v1/getsearchpatient', edit.editShow);
 */
module.exports = router;
