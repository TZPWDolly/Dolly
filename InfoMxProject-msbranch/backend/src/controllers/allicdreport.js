const fnErr = require('./fnErr');
const icd = require('../models/allicdreport');

//....................GET ALL icd report data....................//
exports.allicdreport = fnErr(async(req, res, next) => {
    console.log('allicdreport req query: ', req.body);
    
        //1)
        const icdReportOne = await icd.icdReportOne(req.body)
        if(!icdReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //2)
        const icdReportTwo = await icd.icdReportTwo(req.body)
        if(!icdReportTwo) {next(new custErr("No Data Fount.", 404))}

        //3)
        const icdReportThree = await icd.icdReportThree(req.body)
        if(!icdReportThree) {next(new custErr("No Data Fount.", 404))}

        //4)
        const icdReportFour = await icd.icdReportFour(req.body)
        if(!icdReportFour) {next(new custErr("No Data Fount.", 404))}

        //5)
        const icdReportFive = await icd.icdReportFive(req.body)
        if(!icdReportFive) {next(new custErr("No Data Fount.", 404))}

        //6)
        const icdReportSix = await icd.icdReportSix(req.body)
        if(!icdReportSix) {next(new custErr("No Data Fount.", 404))}

        //7)
        const icdReportSeven = await icd.icdReportSeven(req.body)
        if(!icdReportSeven) {next(new custErr("No Data Fount.", 404))}

        //8)
        const icdReportEight = await icd.icdReportEight(req.body)
        if(!icdReportEight) {next(new custErr("No Data Fount.", 404))} 

        //9)
        const icdReportNine = await icd.icdReportNine(req.body)
        if(!icdReportNine) {next(new custErr("No Data Fount.", 404))}

        //10)
        const icdReportTen = await icd.icdReportTen(req.body)
        if(!icdReportTen) {next(new custErr("No Data Fount.", 404))}

        //11)
        const icdReportEleven = await icd.icdReportEleven(req.body)
        if(!icdReportEleven) {next(new custErr("No Data Fount.", 404))} 

        //12)
        const icdReportTwelve = await icd.icdReportTwelve(req.body)
        if(!icdReportTwelve) {next(new custErr("No Data Fount.", 404))}

        //13)
        const icdReportThirteen = await icd.icdReportThirteen(req.body)
        if(!icdReportThirteen) {next(new custErr("No Data Fount.", 404))}

        //14)
        const icdReportFourteen = await icd.icdReportFourteen(req.body)
        if(!icdReportFourteen) {next(new custErr("No Data Fount.", 404))}

        //15)
        const icdReportFifteen = await icd.icdReportFifteen(req.body)
        if(!icdReportFifteen) {next(new custErr("No Data Fount.", 404))}

        //16)
        const icdReportSixteen = await icd.icdReportSixteen(req.body)
        if(!icdReportSixteen) {next(new custErr("No Data Fount.", 404))}

        //17)
        const icdReportSeventeen = await icd.icdReportSeventeen(req.body)
        if(!icdReportSeventeen) {next(new custErr("No Data Fount.", 404))}

        //18)
        const icdReportEighteen = await icd.icdReportEighteen(req.body)
        if(!icdReportEighteen) {next(new custErr("No Data Fount.", 404))} 

       
 
    return res.status(200).json({
        status: 200,
         data: {icdReportOne,icdReportTwo,icdReportThree,icdReportFour,icdReportFive,icdReportSix,icdReportSeven,icdReportEight,icdReportNine,icdReportTen,icdReportEleven,
        icdReportTwelve,icdReportThirteen,icdReportFourteen,icdReportFifteen,icdReportSixteen,icdReportSeventeen,icdReportEighteen}
      });
})