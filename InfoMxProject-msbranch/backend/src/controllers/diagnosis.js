const fnErr = require('./fnErr');
const diagnosis = require('../models/diagnosis');

//....................GET Diagnosis Data & IMCI....................//
exports.getDiagnosis = fnErr(async(req, res, next) => {
    
    
    //getDiagnosis
    const getDiagnosis = await diagnosis.getDiagnosis(req.body)
    if(!getDiagnosis) {next(new custErr("No Data Fount.", 404))}
    console.log('getDiagnosis req query: ', req.body);

    //getIMCI
    const getIMCI = await diagnosis.getIMCI(req.body)
    if(!getIMCI) {next(new custErr("No Data Fount.", 404))}
    console.log('getIMCI req query: ', req.body);
    
return res.status(200).json({
    status: 200,
    data: {getDiagnosis, getIMCI}
  });
})