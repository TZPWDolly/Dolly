const del = require('../models/deletelabservice');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');

//....................//deleteLabService//....................//
exports.deleteLabService = fnErr(async(req, res, next) => {
    console.log('deleteLabService req body: ', req.body);
    const result = await del.deleteLabService(req.body);
    console.log('deleteLabService Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})