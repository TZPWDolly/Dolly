const fnErr = require('./fnErr');
const anc = require('../models/ancreport');

//....................GET ALL anc report data....................//
exports.ancReport = fnErr(async(req, res, next) => {
    console.log('ancReport req query: ', req.body);
    
        //1)
        const ancReportOne = await anc.ancReportOne(req.body)
        if(!ancReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //2)
        const ancReportTwo = await anc.ancReportTwo(req.body)
        if(!ancReportTwo) {next(new custErr("No Data Fount.", 404))}

        //3)
        const ancReportThree = await anc.ancReportThree(req.body)
        if(!ancReportThree) {next(new custErr("No Data Fount.", 404))}

        //4)
        const ancReportFour = await anc.ancReportFour(req.body)
        if(!ancReportFour) {next(new custErr("No Data Fount.", 404))}

        //5)
        const ancReportFive = await anc.ancReportFive(req.body)
        if(!ancReportFive) {next(new custErr("No Data Fount.", 404))}

        //6)
        const ancReportSix = await anc.ancReportSix(req.body)
        if(!ancReportSix) {next(new custErr("No Data Fount.", 404))}

        //7)
        const ancReportSeven = await anc.ancReportSeven(req.body)
        if(!ancReportSeven) {next(new custErr("No Data Fount.", 404))}

        //8)
        const ancReportEight = await anc.ancReportEight(req.body)
        if(!ancReportEight) {next(new custErr("No Data Fount.", 404))} 

        //9)
        const ancReportNine = await anc.ancReportNine(req.body)
        if(!ancReportNine) {next(new custErr("No Data Fount.", 404))}

        //10)
        const ancReportTen = await anc.ancReportTen(req.body)
        if(!ancReportTen) {next(new custErr("No Data Fount.", 404))}

        //11)
        const ancReportEleven = await anc.ancReportEleven(req.body)
        if(!ancReportEleven) {next(new custErr("No Data Fount.", 404))} 

        //12)
        const ancReportTwelve = await anc.ancReportTwelve(req.body)
        if(!ancReportTwelve) {next(new custErr("No Data Fount.", 404))}

        //13)
        const ancReportThirteen = await anc.ancReportThirteen(req.body)
        if(!ancReportThirteen) {next(new custErr("No Data Fount.", 404))}

        //14)
        const ancReportFourteen = await anc.ancReportFourteen(req.body)
        if(!ancReportFourteen) {next(new custErr("No Data Fount.", 404))}

        //15)
        const ancReportFifteen = await anc.ancReportFifteen(req.body)
        if(!ancReportFifteen) {next(new custErr("No Data Fount.", 404))}

        //16)
        const ancReportSixteen = await anc.ancReportSixteen(req.body)
        if(!ancReportSixteen) {next(new custErr("No Data Fount.", 404))}

        //17)
        const ancReportSeventeen = await anc.ancReportSeventeen(req.body)
        if(!ancReportSeventeen) {next(new custErr("No Data Fount.", 404))}

        //18)
        const ancReportEighteen = await anc.ancReportEighteen(req.body)
        if(!ancReportEighteen) {next(new custErr("No Data Fount.", 404))} 

        //19)
        const ancReportNineteen = await anc.ancReportNineteen(req.body)
        if(!ancReportNineteen) {next(new custErr("No Data Fount.", 404))}

        //20)
        const ancReportTwenty = await anc.ancReportTwenty(req.body)
        if(!ancReportTwenty) {next(new custErr("No Data Fount.", 404))}
 
    return res.status(200).json({
        status: 200,
         data: {ancReportOne,ancReportTwo,ancReportThree,ancReportFour,ancReportFive,ancReportSix,ancReportSeven,ancReportEight,ancReportNine,ancReportTen,ancReportEleven,
        ancReportTwelve,ancReportThirteen,ancReportFourteen,ancReportFifteen,ancReportSixteen,ancReportSeventeen,ancReportEighteen,ancReportNineteen,ancReportTwenty}
      });
})