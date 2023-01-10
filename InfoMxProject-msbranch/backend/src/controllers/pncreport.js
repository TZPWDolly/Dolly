const fnErr = require('./fnErr');
const pnc = require('../models/pncreport');

//....................GET ALL pnc report data....................//
exports.pncReport = fnErr(async(req, res, next) => {
    console.log('pncReport req query: ', req.body);
    
        //1)Number of women who received at least one PNC provided by skilled providers within 2 days after delivery
        const pncReportOne = await pnc.pncReportOne(req.body)
        if(!pncReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //2)Total number of women received at least one PNC within 42 days after delivery
        const pncReportTwo = await pnc.pncReportTwo(req.body)
        if(!pncReportTwo) {next(new custErr("No Data Fount.", 404))}

        //3)Total number of women received at least one PNC within 42 days after delivery provided by skilled providers
        const pncReportThree = await pnc.pncReportThree(req.body)
        if(!pncReportThree) {next(new custErr("No Data Fount.", 404))}

        //4)Total number of PNC services provided by health workers within 42 days after delivery
        const pncReportFour = await pnc.pncReportFour(req.body)
        if(!pncReportFour) {next(new custErr("No Data Fount.", 404))}

        //5)Total number of PNC services provided by Health Workers within 42 days after delivery
        const pncReportFive = await pnc.pncReportFive(req.body)
        if(!pncReportFive) {next(new custErr("No Data Fount.", 404))}

        //6)Total number of PNC services provided by Skilled providers within 42 days after delivery
        const pncReportSix = await pnc.pncReportSix(req.body)
        if(!pncReportSix) {next(new custErr("No Data Fount.", 404))}

        //7)Total number of Health Education services provided by health workers during PNC services
        const pncReportSeven = await pnc.pncReportSeven(req.body)
        if(!pncReportSeven) {next(new custErr("No Data Fount.", 404))}

        //8)Total number of women who received vitamin B1 supplementation during PNC services
        const pncReportEight = await pnc.pncReportEight(req.body)
        if(!pncReportEight) {next(new custErr("No Data Fount.", 404))} 

        //9)Total number of women who received vitamin A supplementation during PNC services
        const pncReportNine = await pnc.pncReportNine(req.body)
        if(!pncReportNine) {next(new custErr("No Data Fount.", 404))}

        //10)Total number of referral cases to higher facilities due to any complications within 42 days after delivery
        const pncReportTen = await pnc.pncReportTen(req.body)
        if(!pncReportTen) {next(new custErr("No Data Fount.", 404))}

        //11)Total number of referral cases to Government Health facilities due to any complications within 42 days after delivery
        const pncReportEleven = await pnc.pncReportEleven(req.body)
        if(!pncReportEleven) {next(new custErr("No Data Fount.", 404))} 
 
    return res.status(200).json({
        status: 200,
         data: {pncReportOne,pncReportTwo,pncReportThree,pncReportFour,pncReportFive,pncReportSix,pncReportSeven,pncReportEight,pncReportNine,pncReportTen,pncReportEleven}
      });
})