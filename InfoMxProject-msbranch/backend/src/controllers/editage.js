const edit = require('../models/editage');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');

//....................//Edit Age//....................//
exports.editAge = fnErr(async(req, res, next) => {
    console.log('editAge req body: ', req.body);
    const result = await edit.editAge(req.body);
    console.log('editAge Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})