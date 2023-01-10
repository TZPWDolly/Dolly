const del = require('../models/deleteregister');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');

//....................//deleteRegister//....................//
exports.deleteRegister = fnErr(async(req, res, next) => {
    console.log('deleteRegister req body: ', req.body);
    const result = await del.deleteRegister(req.body);
    console.log('deleteRegister Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})