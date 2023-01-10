const fnErr = require('./fnErr');
const dashboardLinkModel = require('../models/dashboardLink');

//....................GET ALL edit show Data....................//
exports.getDashboardLink = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.body);
    
        //getAllRegPatitent
        const getDashboardLink = await dashboardLinkModel.getDashboardLink(req.body)
        if(!getDashboardLink) {next(new custErr("No Data Fount.", 404))}

    return res.status(200).json({
        status: 200,
        data: {getDashboardLink}
      });
})
