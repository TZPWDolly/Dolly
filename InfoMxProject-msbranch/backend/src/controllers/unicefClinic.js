const fnErr = require('./fnErr');
const model = require('../models/unicefClinic');

//....................GET village by org proj....................//
exports.getUnicefClinic = fnErr(async(req, res, next) => {
    
    //getUnicefClinic
    const getUnicefClinic = await model.getUnicefClinic(req.body)
    if(!getUnicefClinic) {next(new custErr("No Data Fount.", 404))}
    console.log('getUnicefClinic req query: ', req.body); 

    
return res.status(200).json({
    status: 200,
    data: {getUnicefClinic }
  });
})