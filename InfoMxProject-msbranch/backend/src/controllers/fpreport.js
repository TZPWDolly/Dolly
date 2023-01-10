const fnErr = require('./fnErr');
const fp = require('../models/fpreport');

//....................GET ALL fp report data....................//
exports.fpReport = fnErr(async(req, res, next) => {
    console.log('fpReport req query: ', req.body);
    
        //1)
        const fpReportOne = await fp.fpReportOne(req.body)
        if(!fpReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //2)
        const fpReportTwo = await fp.fpReportTwo(req.body)
        if(!fpReportTwo) {next(new custErr("No Data Fount.", 404))}

        //3)
        const fpReportThree = await fp.fpReportThree(req.body)
        if(!fpReportThree) {next(new custErr("No Data Fount.", 404))}

        //4)
        const fpReportFour = await fp.fpReportFour(req.body)
        if(!fpReportFour) {next(new custErr("No Data Fount.", 404))}

        //5)
        const fpReportFive = await fp.fpReportFive(req.body)
        if(!fpReportFive) {next(new custErr("No Data Fount.", 404))}

        //6)
        const fpReportSix = await fp.fpReportSix(req.body)
        if(!fpReportSix) {next(new custErr("No Data Fount.", 404))}

        //7)
        const fpReportSeven = await fp.fpReportSeven(req.body)
        if(!fpReportSeven) {next(new custErr("No Data Fount.", 404))}

        //8)
        const fpReportEight = await fp.fpReportEight(req.body)
        if(!fpReportEight) {next(new custErr("No Data Fount.", 404))} 

        //9)
        const fpReportNine = await fp.fpReportNine(req.body)
        if(!fpReportNine) {next(new custErr("No Data Fount.", 404))}

        //10)
        const fpReportTen = await fp.fpReportTen(req.body)
        if(!fpReportTen) {next(new custErr("No Data Fount.", 404))}

        //11)
        const fpReportEleven = await fp.fpReportEleven(req.body)
        if(!fpReportEleven) {next(new custErr("No Data Fount.", 404))} 

        //12)
        const fpReportTwelve = await fp.fpReportTwelve(req.body)
        if(!fpReportTwelve) {next(new custErr("No Data Fount.", 404))}

        //13)
        const fpReportThirteen = await fp.fpReportThirteen(req.body)
        if(!fpReportThirteen) {next(new custErr("No Data Fount.", 404))} 
 
    return res.status(200).json({
        status: 200,
         data: {fpReportOne,fpReportTwo,fpReportThree,fpReportFour,fpReportFive,fpReportSix,fpReportSeven,fpReportEight,fpReportNine,fpReportTen,fpReportEleven,
            fpReportTwelve,fpReportThirteen}
      });
})