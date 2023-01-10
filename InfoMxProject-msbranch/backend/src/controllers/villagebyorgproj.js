const fnErr = require('./fnErr');
const villageModel = require('../models/villagebyorgproj');

//....................GET village by org proj....................//
exports.getVillageByOrgProj = fnErr(async(req, res, next) => {
    
    //getClinicByOrgProj
    const getVillageByOrgProj = await villageModel.getVillageByOrgProj(req.body)
    if(!getVillageByOrgProj) {next(new custErr("No Data Fount.", 404))}
    console.log('getClinicByOrgProj req query: ', req.body); 

    
return res.status(200).json({
    status: 200,
    data: {getVillageByOrgProj }
  });
})