const Reg = require('../models/registration');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');


//....................//Insert Patient Registration//....................//
exports.insertReg = fnErr(async(req, res, next) => {
    console.log('insert patient reg req body: ', req.body);
    const result = await Reg.insertReg(JSON.stringify(req.body) );
    console.log('Insert Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})

//....................//Update Patient Registration//....................//
exports.updateReg = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await Reg.updateReg(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})