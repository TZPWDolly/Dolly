const fnErr = require('./fnErr');
const serviceModal = require('../models/service');

//....................GET ALL edit show Data....................//
exports.getPatient = fnErr(async(req, res, next) => {
    
    
        //getPatient
        const getPatient = await serviceModal.getPatient(req.body)
        if(!getPatient) {next(new custErr("No Data Fount.", 404))}
        console.log('getPatient req query: ', req.body);

        //getPatientType
        const getPatientType = await serviceModal.getPatientType(req.body)
        if(!getPatientType) {next(new custErr("No Data Fount.", 404))}
        console.log('getPatientType req query: ', req);

     

        
    return res.status(200).json({
        status: 200,
        data: {getPatient, getPatientType }
      });
})




