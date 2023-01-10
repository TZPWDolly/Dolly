const express = require('express');
const router = express.Router();
const edit = require('../controllers/editImamShow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/editimamshow', edit.editImamShow);
/* router.post('/api/v1/getpatientbyid', edit.editShow);
router.post('/api/v1/getpatientforsearch', edit.editShow);
router.post('/api/v1/getsearchpatient', edit.editShow);
 */
module.exports = router;
