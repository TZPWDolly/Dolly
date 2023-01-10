const fnErr = require('./fnErr');
const serviceModal = require('../models/clinicbyorgproj');

//....................GET village by org proj....................//
exports.getClinicByOrgProj = fnErr(async(req, res, next) => {
    
    //getClinicByOrgProj
    const getClinicByOrgProj = await serviceModal.getClinicByOrgProj(req.body)
    if(!getClinicByOrgProj) {next(new custErr("No Data Fount.", 404))}
    console.log('getClinicByOrgProj req query: ', req.body); 

    
return res.status(200).json({
    status: 200,
    data: {getClinicByOrgProj }
  });
})