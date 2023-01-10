const fnErr = require('./fnErr');
const serviceLab = require('../models/rhlabdatabyid');

//....................GET ALL edit show Data....................//
exports.rhlabdatabyid = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.body);
    
        //getLabData
        const getLabData = await serviceLab.getLabData(req.body)
        if(!getLabData) {next(new custErr("No Data Fount.", 404))}

        

    return res.status(200).json({
        status: 200,
        data: {getLabData}
      });
})