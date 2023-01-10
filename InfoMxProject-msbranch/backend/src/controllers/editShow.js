const fnErr = require('./fnErr');
const editShowModal = require('../models/editShow');

//....................GET ALL edit show Data....................//
exports.editShow = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.body);
    
       /*  //getAllRegPatitent
        const getAllRegPatitent = await editShowModal.getAllRegPatient(req.body)
        if(!getAllRegPatitent) {next(new custErr("No Data Fount.", 404))} */

        //getPatientByRegID
        const getPatientByID = await editShowModal.getPatientByID(req.body)
        if(!getPatientByID) {next(new custErr("No Data Fount.", 404))}

        //getPatientForSearch
        const getPatientForSearch = await editShowModal.getPatientForSearch(req.body)
        if(!getPatientForSearch) {next(new custErr("No Data Fount.", 404))}

        //getSearchPatient
        const getSearchPatient = await editShowModal.getSearchPatient(req.body)
        if(!getSearchPatient) {next(new custErr("No Data Fount.", 404))}

    return res.status(200).json({
        status: 200,
        data: {getPatientByID, getPatientForSearch, getSearchPatient}
      });
})




