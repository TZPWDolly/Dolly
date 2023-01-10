const fnErr = require('./fnErr');
const serviceLab = require('../models/imamservicedatabyid');

//....................GET ALL edit show Data....................//
exports.imamservicedatabyid = fnErr(async(req, res, next) => {
    console.log('imamservicedatabyid req query: ', req.body);
    
        //getServiceData
        const getServiceData = await serviceLab.getServiceData(req.body)
        if(!getServiceData) {next(new custErr("No Data Fount.", 404))}

        
    return res.status(200).json({
        status: 200,
        data: {getServiceData}
      });
})