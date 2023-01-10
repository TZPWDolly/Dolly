const fnErr = require('./fnErr');
const fprh = require('../models/fprhreport');

//....................GET ALL fprh report data....................//
exports.fprhReport = fnErr(async(req, res, next) => {
    console.log('fprhReport req query: ', req.body);
    
        //1)
        const fprhReportOne = await fprh.fprhReportOne(req.body)
        if(!fprhReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //2)
        const fprhReportTwo = await fprh.fprhReportTwo(req.body)
        if(!fprhReportTwo) {next(new custErr("No Data Fount.", 404))}

        //3)
        const fprhReportThree = await fprh.fprhReportThree(req.body)
        if(!fprhReportThree) {next(new custErr("No Data Fount.", 404))}

        //4)
        const fprhReportFour = await fprh.fprhReportFour(req.body)
        if(!fprhReportFour) {next(new custErr("No Data Fount.", 404))}

        //5)
        const fprhReportFive = await fprh.fprhReportFive(req.body)
        if(!fprhReportFive) {next(new custErr("No Data Fount.", 404))}

        //6)
        const fprhReportSix = await fprh.fprhReportSix(req.body)
        if(!fprhReportSix) {next(new custErr("No Data Fount.", 404))}

        //7)
        const fprhReportSeven = await fprh.fprhReportSeven(req.body)
        if(!fprhReportSeven) {next(new custErr("No Data Fount.", 404))}

        //8)
        const fprhReportEight = await fprh.fprhReportEight(req.body)
        if(!fprhReportEight) {next(new custErr("No Data Fount.", 404))} 

        //9)
        const fprhReportNine = await fprh.fprhReportNine(req.body)
        if(!fprhReportNine) {next(new custErr("No Data Fount.", 404))}

        //10)
        const fprhReportTen = await fprh.fprhReportTen(req.body)
        if(!fprhReportTen) {next(new custErr("No Data Fount.", 404))}

        //11)
        const fprhReportEleven = await fprh.fprhReportEleven(req.body)
        if(!fprhReportEleven) {next(new custErr("No Data Fount.", 404))} 

        //12)
        const fprhReportTwelve = await fprh.fprhReportTwelve(req.body)
        if(!fprhReportTwelve) {next(new custErr("No Data Fount.", 404))}

        //13)
        const fprhReportThirteen = await fprh.fprhReportThirteen(req.body)
        if(!fprhReportThirteen) {next(new custErr("No Data Fount.", 404))}

       
 
    return res.status(200).json({
        status: 200,
         data: {fprhReportOne,fprhReportTwo,fprhReportThree,fprhReportFour,fprhReportFive,fprhReportSix,fprhReportSeven,fprhReportEight,fprhReportNine,fprhReportTen,fprhReportEleven,
        fprhReportTwelve,fprhReportThirteen}
      });
})