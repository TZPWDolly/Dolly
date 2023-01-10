const fnErr = require('./fnErr');
const editShowModal = require('../models/editmdsrshow');

//....................GET ALL editMDSRShow Data....................//
exports.editMDSRShow = fnErr(async(req, res, next) => {
    console.log('editMDSRShow req query: ', req.body);
    
        //getAllImamPatitent
        const editMDSRShow = await editShowModal.editMDSRShow(req.body)
        if(!editMDSRShow) {next(new custErr("No Data Fount.", 404))} 

    return res.status(200).json({
        status: 200,
        data: {editMDSRShow}
      });
})

//....................GET ALL editMDSRShow Data....................//
exports.getMDSRPatient = fnErr(async(req, res, next) => {
    console.log('getMDSRPatient req query: ', req.body);
    
        //getMDSRPatient
        const getMDSRPatient = await editShowModal.getMDSRPatient(req.body)
        if(!getMDSRPatient) {next(new custErr("No Data Fount.", 404))} 

    return res.status(200).json({
        status: 200,
        data: {getMDSRPatient}
      });
})

//....................GET MDSR Data....................//
exports.getMDSR = fnErr(async(req, res, next) => {
    console.log('getMDSR req query: ', req.body);
    
        //getMDSR
        const getMDSR = await editShowModal.getMDSR(req.body)
        if(!getMDSR) {next(new custErr("No Data Fount.", 404))} 

    return res.status(200).json({
        status: 200,
        data: {getMDSR}
      });
})