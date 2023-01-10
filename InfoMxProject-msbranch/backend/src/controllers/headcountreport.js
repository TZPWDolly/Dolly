const fnErr = require('./fnErr');
const hc = require('../models/headcountreport');

//....................GET ALL head count data....................//
exports.hcReport = fnErr(async(req, res, next) => {
    console.log('hcReport req query: ', req.body);
    
        //Number of paitents who registered in this reporting periods
        const hcReportOne = await hc.hcReportOne(req.body)
        if(!hcReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //Number of patients who received health care services in this reporting periods
        const hcReportTwo = await hc.hcReportTwo(req.body)
        if(!hcReportTwo) {next(new custErr("No Data Fount.", 404))}

        //Number of Pregnant Women who received ANC services in this reporting periods
        const hcReportThree = await hc.hcReportThree(req.body)
        if(!hcReportThree) {next(new custErr("No Data Fount.", 404))}

        //Number of Delivery (still birth + live birth) in this reporting periods
        const hcReportFour = await hc.hcReportFour(req.body)
        if(!hcReportFour) {next(new custErr("No Data Fount.", 404))}

        //Number of Women who received PNC services after delivery in this reporting periods
        const hcReportFive = await hc.hcReportFive(req.body)
        if(!hcReportFive) {next(new custErr("No Data Fount.", 404))}

        //Number of women who received FP services in this reporting periods
        const hcReportSix = await hc.hcReportSix(req.body)
        if(!hcReportSix) {next(new custErr("No Data Fount.", 404))}

        //Number of women who received Reproductive Health Care services in this reporting periods
        const hcReportSeven = await hc.hcReportSeven(req.body)
        if(!hcReportSeven) {next(new custErr("No Data Fount.", 404))}

        //Number of patients who received General health care services in this reporting periods
        const hcReportEight = await hc.hcReportEight(req.body)
        if(!hcReportEight) {next(new custErr("No Data Fount.", 404))} 
 
    return res.status(200).json({
        status: 200,
         data: {hcReportOne,hcReportTwo,hcReportThree,hcReportFour,hcReportFive,hcReportSix,hcReportSeven,hcReportEight}
      });
})