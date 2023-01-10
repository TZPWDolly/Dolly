const fnErr = require('./fnErr');
const icd = require('../models/clcreport');

//....................GET ALL icd report data....................//
exports.clcReport = fnErr(async(req, res, next) => {
    console.log('clcReport req query: ', req.body);
    
        const icdReport1 = await icd.icdReport1(req.body)
        if(!icdReport1) {next(new custErr("No Data Fount.", 404))}

        const icdReport2 = await icd.icdReport2(req.body)
        if(!icdReport2) {next(new custErr("No Data Fount.", 404))}

        const icdReport3 = await icd.icdReport3(req.body)
        if(!icdReport3) {next(new custErr("No Data Fount.", 404))}

        const icdReport4 = await icd.icdReport4(req.body)
        if(!icdReport4) {next(new custErr("No Data Fount.", 404))}

        const icdReport5 = await icd.icdReport5(req.body)
        if(!icdReport5) {next(new custErr("No Data Fount.", 404))}
 
        const icdReport6 = await icd.icdReport6(req.body)
        if(!icdReport6) {next(new custErr("No Data Fount.", 404))}

        const icdReport7 = await icd.icdReport7(req.body)
        if(!icdReport7) {next(new custErr("No Data Fount.", 404))}
       
        const icdReport8 = await icd.icdReport8(req.body)
        if(!icdReport8) {next(new custErr("No Data Fount.", 404))}

        const icdReport9 = await icd.icdReport9(req.body)
        if(!icdReport9) {next(new custErr("No Data Fount.", 404))}

        const icdReport10 = await icd.icdReport10(req.body)
        if(!icdReport10) {next(new custErr("No Data Fount.", 404))}

        const icdReport11 = await icd.icdReport11(req.body)
        if(!icdReport11) {next(new custErr("No Data Fount.", 404))}

        const icdReport12 = await icd.icdReport12(req.body)
        if(!icdReport12) {next(new custErr("No Data Fount.", 404))}

        const icdReport13 = await icd.icdReport13(req.body)
        if(!icdReport13) {next(new custErr("No Data Fount.", 404))}

        const icdReport14 = await icd.icdReport14(req.body)
        if(!icdReport14) {next(new custErr("No Data Fount.", 404))}

        const icdReport15 = await icd.icdReport15(req.body)
        if(!icdReport15) {next(new custErr("No Data Fount.", 404))}
 
        const icdReport16 = await icd.icdReport16(req.body)
        if(!icdReport16) {next(new custErr("No Data Fount.", 404))}

        const icdReport17 = await icd.icdReport17(req.body)
        if(!icdReport17) {next(new custErr("No Data Fount.", 404))}
       
        const icdReport18 = await icd.icdReport18(req.body)
        if(!icdReport18) {next(new custErr("No Data Fount.", 404))}

        const icdReport19 = await icd.icdReport19(req.body)
        if(!icdReport19) {next(new custErr("No Data Fount.", 404))}

        const icdReport20 = await icd.icdReport20(req.body)
        if(!icdReport20) {next(new custErr("No Data Fount.", 404))}

        const icdReport21 = await icd.icdReport21(req.body)
        if(!icdReport21) {next(new custErr("No Data Fount.", 404))}

        const icdReport22 = await icd.icdReport22(req.body)
        if(!icdReport22) {next(new custErr("No Data Fount.", 404))}

        const icdReport23 = await icd.icdReport23(req.body)
        if(!icdReport23) {next(new custErr("No Data Fount.", 404))}

        const icdReport24 = await icd.icdReport24(req.body)
        if(!icdReport24) {next(new custErr("No Data Fount.", 404))}

        const icdReport25 = await icd.icdReport25(req.body)
        if(!icdReport25) {next(new custErr("No Data Fount.", 404))}
 
    return res.status(200).json({
        status: 200,
         data: {icdReport1,icdReport2,icdReport3,icdReport4,icdReport5,icdReport6,icdReport7,icdReport8,icdReport9,icdReport10,
            icdReport11,icdReport12,icdReport13,icdReport14,icdReport15,icdReport16,icdReport17,icdReport18,icdReport19,icdReport20,
            icdReport21,icdReport22,icdReport23,icdReport24,icdReport25}
      });
})