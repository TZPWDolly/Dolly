const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const { authanticate } = require('../models/auth');

router.post('/api/v1/login', user.userLogin);
//router.post('/api/v1/resetPassword', authanticate, user.userResetPassword);
router.post('/api/v1/resetPassword', user.userResetPassword);

module.exports = router;