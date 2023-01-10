const fnErr = require('./fnErr');
const serviceLab = require('../models/service_labdatabyid');

//....................GET ALL edit show Data....................//
exports.serviceLabDataByID = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.body);

        //getPatient
        const getPatient = await serviceLab.getPatient(req.body)
        if(!getPatient) {next(new custErr("No Data Fount.", 404))}

    return res.status(200).json({
        status: 200,
        data: {getPatient }
      });
})
