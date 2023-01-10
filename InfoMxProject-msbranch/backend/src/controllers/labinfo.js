const lab = require('../models/labinfo');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');


//....................//Insert Lab//....................//
exports.insertLab = fnErr(async(req, res, next) => {
    console.log('insert lab req body: ', req.body);
    const result = await lab.insertLab(JSON.stringify(req.body) );
    console.log('Insert lab Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})

//....................//Update Lab //....................//
exports.updateLab = fnErr(async(req, res, next) => {
    console.log('update patient lab req body: ', req.body);
    const result = await lab.updateLab(req.body);
    console.log('update lab Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})
//....................//DELETE Lab//....................//
exports.deleteLab = fnErr(async(req, res, next) => {
    console.log('update patient lab req body: ', req.body);
    const result = await lab.deleteLab(req.body);
    console.log('update Lab Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})