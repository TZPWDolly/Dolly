const del = require('../models/deleteservice');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');

//....................//deleteService//....................//
exports.deleteService = fnErr(async(req, res, next) => {
    console.log('deleteService req body: ', req.body);
    const result = await del.deleteService(req.body);
    console.log('deleteService Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})