const coreModal = require('../models/core');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');


//....................GET ALL PROJECT....................//
exports.project = fnErr(async(req, res, next) => {
    console.log('project req query: ', req.query);
    const result = await coreModal.project();
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})

//....................GET ALL Division....................//
exports.division = fnErr(async(req, res, next) => {
    console.log('division req query: ', req.query);
    const result = await coreModal.divsion();
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})

//....................GET ALL Township by a division....................//
exports.getTspByDiv = fnErr(async(req, res, next) => {
    console.log('getTspByDiv req query: ', req);
    const result = await coreModal.getTspByDiv(req.body);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})


//....................GET ALL Village by a division....................//
exports.getVillageByTsp = fnErr(async(req, res, next) => {
    console.log('getVillageByTsp req query: ', req);
    const result = await coreModal.getVillageByTsp(req.body);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})

//....................GET ALL Clinic by a tsp....................//
exports.getClinicByTsp = fnErr(async(req, res, next) => {
    console.log('getClinicByTsp req query: ', req);
    const result = await coreModal.getClinicByTsp(req.body);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})

//....................GET ALL Org (no Filter)....................//
exports.getAllOrg = fnErr(async(req, res, next) => {
    console.log('getAllOrg req query: ', req);
    const result = await coreModal.getAllOrg(req.body);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})

//....................GET ALL STATE BY PROJECT....................//
exports.state = fnErr(async(req, res, next) => {
    console.log('state req query: ', req.query);
    const result = await coreModal.state(req.query);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})


//....................GET ALL TOWNSHIP BY PROJECT AND STATE....................//
exports.tsp = fnErr(async(req, res, next) => {
    console.log('tsp req query: ', req.query);
    const result = await coreModal.tsp(req.query);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})


//....................GET ALL ORGANIZATION BY PROJECT, STATE AND TOWNSHIP....................//
exports.org = fnErr(async(req, res, next) => {
    console.log('org req query: ', req.query);
    const result = await coreModal.org(req.query);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})

//....................GET ALL CLINIC BY PROJECT, STATE, TOWNSHIP AND ORGANIZATION....................//
exports.clinic = fnErr(async(req, res, next) => {
    console.log('clinic req query: ', req.query);
    const result = await coreModal.clinic(req.query);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})


//....................GET INTICATOR BY SERVICE....................//
exports.indi = fnErr(async(req, res, next) => {
    console.log('indi req query: ', req.query);
    const result = await coreModal.indi(req.query);
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})

//....................GET SERVICE....................//
exports.service = fnErr(async(req, res, next) => {
    //console.log('serivce req query: ', req.query);
    const result = await coreModal.service();
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
}) 

//....................GET ALL Tsp....................//
exports.getAllTownship = fnErr(async(req, res, next) => {
    console.log('getAllTownship req query: ', req.query);
    const result = await coreModal.getAllTownship();
    if(!result) {
        next(new custErr("No Data Fount.", 404))
    }
    return res.status(200).json({
        status: 201,
        data: result,
      });
})