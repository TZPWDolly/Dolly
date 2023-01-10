const fnErr = require('./fnErr');
const org = require('../models/getallorg');

//....................GET ALL Org....................//
exports.getAllOrg = fnErr(async(req, res, next) => {
    console.log('getAllOrg req query: ', req.body);
    
        //getAllOrg
        const getAllOrg = await org.getAllOrg(req.body)
        if(!getAllOrg) {next(new custErr("No Data Fount.", 404))}

        //getAllClinic
        const getAllClinic = await org.getAllClinic(req.body)
        if(!getAllClinic) {next(new custErr("No Data Fount.", 404))}


    return res.status(200).json({
        status: 200,
        data: {getAllOrg, getAllClinic}
      });
})