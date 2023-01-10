const fnErr = require('./fnErr');
const deli = require('../models/delireport');

//....................GET ALL deli report data....................//
exports.deliReport = fnErr(async(req, res, next) => {
    console.log('deliReport req query: ', req.body);
    
        //1)Total number of deliveries (live births+still births) during reporting period
        const deliReportOne = await deli.deliReportOne(req.body)
        if(!deliReportOne) {next(new custErr("No Data Fount.", 404))}
 
        //2)Total number of live birth during reporting period
        const deliReportTwo = await deli.deliReportTwo(req.body)
        if(!deliReportTwo) {next(new custErr("No Data Fount.", 404))}

        //3)Total number of home deliverieduring reporting period
        const deliReportThree = await deli.deliReportThree(req.body)
        if(!deliReportThree) {next(new custErr("No Data Fount.", 404))}

        //4)Total number of deliveries by skilled birth attendants during reporting period
        const deliReportFour = await deli.deliReportFour(req.body)
        if(!deliReportFour) {next(new custErr("No Data Fount.", 404))}

        //5)Total number of institutional (clinic) deliveries by skilled birth attendants during reporting period
        const deliReportFive = await deli.deliReportFive(req.body)
        if(!deliReportFive) {next(new custErr("No Data Fount.", 404))}

        //6)Number of new born baby who receive early initiation of breast feeding within 30 minutes after delivery
        const deliReportSix = await deli.deliReportSix(req.body)
        if(!deliReportSix) {next(new custErr("No Data Fount.", 404))}

        //7)Total number of deliveries with Low Birth Weight baby (<2.5 kg)
        const deliReportSeven = await deli.deliReportSeven(req.body)
        if(!deliReportSeven) {next(new custErr("No Data Fount.", 404))}

        //8)Total number of referral cases during delivery processes to higher facilities due to any complications
        const deliReportEight = await deli.deliReportEight(req.body)
        if(!deliReportEight) {next(new custErr("No Data Fount.", 404))} 

        //9)Total number of referral cases during delivery processes to Government health facilities due to any complications
        const deliReportNine = await deli.deliReportNine(req.body)
        if(!deliReportNine) {next(new custErr("No Data Fount.", 404))}

        //10)Number of women who received ANC at least 4 times selfreported at the time of delivery
        const deliReportTen = await deli.deliReportTen(req.body)
        if(!deliReportTen) {next(new custErr("No Data Fount.", 404))}

        //11)Number of newborn with low birth weight (<2.5kg)
        const deliReportEleven = await deli.deliReportEleven(req.body)
        if(!deliReportEleven) {next(new custErr("No Data Fount.", 404))} 
 
    return res.status(200).json({
        status: 200,
         data: {deliReportOne,deliReportTwo,deliReportThree,deliReportFour,deliReportFive,deliReportSix,deliReportSeven,deliReportEight,deliReportNine,deliReportTen,deliReportEleven}
      });
})