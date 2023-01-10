const fnErr = require('./fnErr');
const rh = require('../models/rhreport');

//....................GET ALL RH data....................//
exports.rhReport = fnErr(async(req, res, next) => {
    console.log('rhReport req query: ', req.body);
    
        //Number of Post Abortion Care services delivered during reporting period
        const rhReportOne = await rh.rhReportOne(req.body)
        if(!rhReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //Number of GBV Related services delivered during reporting period
        const rhReportTwo = await rh.rhReportTwo(req.body)
        if(!rhReportTwo) {next(new custErr("No Data Fount.", 404))}

        //Number of Other RH cases during reporting period
        const rhReportThree = await rh.rhReportThree(req.body)
        if(!rhReportThree) {next(new custErr("No Data Fount.", 404))}

        //Number of HIV Testing and Counseling forRH cases during reporting period
        const rhReportFour = await rh.rhReportFour(req.body)
        if(!rhReportFour) {next(new custErr("No Data Fount.", 404))}

        //Number of Referral Cases to higher facilities
        const rhReportFive = await rh.rhReportFive(req.body)
        if(!rhReportFive) {next(new custErr("No Data Fount.", 404))}

        //Number of Referral Cases to Government health facilities
        const rhReportSix = await rh.rhReportSix(req.body)
        if(!rhReportSix) {next(new custErr("No Data Fount.", 404))}

        
 
    return res.status(200).json({
        status: 200,
         data: {rhReportOne,rhReportTwo,rhReportThree,rhReportFour,rhReportFive,rhReportSix}
      });
})