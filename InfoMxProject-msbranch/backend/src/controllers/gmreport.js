const fnErr = require('./fnErr');
const gm = require('../models/gmreport');

//....................GET ALL GM report data....................//
exports.gmReport = fnErr(async(req, res, next) => {
    console.log('gmReport req query: ', req.body);
    
        const gmReport1 = await gm.gmReport1(req.body)
        if(!gmReport1) {next(new custErr("No Data Fount.", 404))}

        const gmReport2 = await gm.gmReport2(req.body)
        if(!gmReport2) {next(new custErr("No Data Fount.", 404))}

        const gmReport3 = await gm.gmReport3(req.body)
        if(!gmReport3) {next(new custErr("No Data Fount.", 404))}

        const gmReport4 = await gm.gmReport4(req.body)
        if(!gmReport4) {next(new custErr("No Data Fount.", 404))}

        const gmReport5 = await gm.gmReport5(req.body)
        if(!gmReport5) {next(new custErr("No Data Fount.", 404))}
 
        const gmReport6 = await gm.gmReport6(req.body)
        if(!gmReport6) {next(new custErr("No Data Fount.", 404))}

        const gmReport7 = await gm.gmReport7(req.body)
        if(!gmReport7) {next(new custErr("No Data Fount.", 404))}

        const gmReport8 = await gm.gmReport8(req.body)
        if(!gmReport8) {next(new custErr("No Data Fount.", 404))}

        const gmReport9 = await gm.gmReport9(req.body)
        if(!gmReport9) {next(new custErr("No Data Fount.", 404))}

        const gmReport10 = await gm.gmReport10(req.body)
        if(!gmReport10) {next(new custErr("No Data Fount.", 404))}

        const gmReport11 = await gm.gmReport11(req.body)
        if(!gmReport11) {next(new custErr("No Data Fount.", 404))}

        const gmReport12 = await gm.gmReport12(req.body)
        if(!gmReport12) {next(new custErr("No Data Fount.", 404))}

        const gmReport13 = await gm.gmReport13(req.body)
        if(!gmReport13) {next(new custErr("No Data Fount.", 404))}

        const gmReport14 = await gm.gmReport14(req.body)
        if(!gmReport14) {next(new custErr("No Data Fount.", 404))}

        const gmReport15 = await gm.gmReport15(req.body)
        if(!gmReport15) {next(new custErr("No Data Fount.", 404))}
 
        const gmReport16 = await gm.gmReport16(req.body)
        if(!gmReport16) {next(new custErr("No Data Fount.", 404))}

        const gmReport17 = await gm.gmReport17(req.body)
        if(!gmReport17) {next(new custErr("No Data Fount.", 404))}

        const gmReport18 = await gm.gmReport18(req.body)
        if(!gmReport18) {next(new custErr("No Data Fount.", 404))}

        const gmReport19 = await gm.gmReport19(req.body)
        if(!gmReport19) {next(new custErr("No Data Fount.", 404))}

        const gmReport20 = await gm.gmReport20(req.body)
        if(!gmReport20) {next(new custErr("No Data Fount.", 404))}

        const gmReport21 = await gm.gmReport21(req.body)
        if(!gmReport21) {next(new custErr("No Data Fount.", 404))}

        const gmReport22 = await gm.gmReport22(req.body)
        if(!gmReport22) {next(new custErr("No Data Fount.", 404))}

        const gmReport23 = await gm.gmReport23(req.body)
        if(!gmReport23) {next(new custErr("No Data Fount.", 404))}

        const gmReport24 = await gm.gmReport24(req.body)
        if(!gmReport24) {next(new custErr("No Data Fount.", 404))}

        const gmReport25 = await gm.gmReport25(req.body)
        if(!gmReport25) {next(new custErr("No Data Fount.", 404))}
 
        const gmReport26 = await gm.gmReport26(req.body)
        if(!gmReport26) {next(new custErr("No Data Fount.", 404))}

        const gmReport27 = await gm.gmReport27(req.body)
        if(!gmReport27) {next(new custErr("No Data Fount.", 404))}

        const gmReport28 = await gm.gmReport28(req.body)
        if(!gmReport28) {next(new custErr("No Data Fount.", 404))}

        const gmReport29 = await gm.gmReport29(req.body)
        if(!gmReport29) {next(new custErr("No Data Fount.", 404))}

        const gmReport30 = await gm.gmReport30(req.body)
        if(!gmReport30) {next(new custErr("No Data Fount.", 404))}

        const gmReport31 = await gm.gmReport31(req.body)
        if(!gmReport31) {next(new custErr("No Data Fount.", 404))}

        const gmReport32 = await gm.gmReport32(req.body)
        if(!gmReport32) {next(new custErr("No Data Fount.", 404))}

        const gmReport33 = await gm.gmReport33(req.body)
        if(!gmReport33) {next(new custErr("No Data Fount.", 404))}

        const gmReport34 = await gm.gmReport34(req.body)
        if(!gmReport34) {next(new custErr("No Data Fount.", 404))}

        const gmReport35 = await gm.gmReport35(req.body)
        if(!gmReport35) {next(new custErr("No Data Fount.", 404))}
 
        const gmReport36 = await gm.gmReport36(req.body)
        if(!gmReport36) {next(new custErr("No Data Fount.", 404))}

        const gmReport37 = await gm.gmReport37(req.body)
        if(!gmReport37) {next(new custErr("No Data Fount.", 404))}

        const gmReport38 = await gm.gmReport38(req.body)
        if(!gmReport38) {next(new custErr("No Data Fount.", 404))}

        const gmReport39 = await gm.gmReport39(req.body)
        if(!gmReport39) {next(new custErr("No Data Fount.", 404))}

        const gmReport40 = await gm.gmReport40(req.body)
        if(!gmReport40) {next(new custErr("No Data Fount.", 404))}

        const gmReport41 = await gm.gmReport41(req.body)
        if(!gmReport41) {next(new custErr("No Data Fount.", 404))}

        const gmReport42 = await gm.gmReport42(req.body)
        if(!gmReport42) {next(new custErr("No Data Fount.", 404))}

        const gmReport43 = await gm.gmReport43(req.body)
        if(!gmReport43) {next(new custErr("No Data Fount.", 404))}

        const gmReport44 = await gm.gmReport44(req.body)
        if(!gmReport44) {next(new custErr("No Data Fount.", 404))}

        const gmReport45 = await gm.gmReport45(req.body)
        if(!gmReport45) {next(new custErr("No Data Fount.", 404))}
 
        const gmReport46 = await gm.gmReport46(req.body)
        if(!gmReport46) {next(new custErr("No Data Fount.", 404))}

        const gmReport47 = await gm.gmReport47(req.body)
        if(!gmReport47) {next(new custErr("No Data Fount.", 404))}

        const gmReport48 = await gm.gmReport48(req.body)
        if(!gmReport48) {next(new custErr("No Data Fount.", 404))}

        const gmReport49 = await gm.gmReport49(req.body)
        if(!gmReport49) {next(new custErr("No Data Fount.", 404))}

        const gmReport50 = await gm.gmReport50(req.body)
        if(!gmReport50) {next(new custErr("No Data Fount.", 404))}

        const gmReport51 = await gm.gmReport51(req.body)
        if(!gmReport51) {next(new custErr("No Data Fount.", 404))}

        const gmReport52 = await gm.gmReport52(req.body)
        if(!gmReport52) {next(new custErr("No Data Fount.", 404))}
 
    return res.status(200).json({
        status: 200,
         data: {gmReport1,gmReport2,gmReport3,gmReport4,gmReport5,gmReport6,gmReport7,gmReport8,gmReport9,gmReport10,
            gmReport11,gmReport12,gmReport13,gmReport14,gmReport15,gmReport16,gmReport17,gmReport18,gmReport19,gmReport20,
            gmReport21,gmReport22,gmReport23,gmReport24,gmReport25,gmReport26,gmReport27,gmReport28,gmReport29,gmReport30,
            gmReport31,gmReport32,gmReport33,gmReport34,gmReport35,gmReport36,gmReport37,gmReport38,gmReport39,gmReport40,
            gmReport41,gmReport42,gmReport43,gmReport44,gmReport45,gmReport46,gmReport47,gmReport48,gmReport49,gmReport50,
            gmReport51,gmReport52}
      });
})