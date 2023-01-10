const RH = require('../models/rhinfo');
const Lab = require('../models/labinfo');
const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert RH//....................//
exports.insertRH = async(req, res, next) => {
    let rhInsertedId = '';
    let rhlabInsertedId = '';
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {RHForm, RHLabForm} = req.body;
        console.log('insert patient reg req body: ', req.body);
       
        console.log("RH LAB Form from Controller => ", RHLabForm)
        const rhres = await RH.insertRH(RHForm);
        console.log("RH rhres => ", rhres)
        rhInsertedId = rhres.lastRowid;
        const labres = await Lab.insertLab(RHLabForm);
        rhlabInsertedId = labres.lastRowid;
        console.log('Insert RH Result ====== ', rhres);
        console.log('Insert RH Lab Result ====== ', labres);
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        rhInsertedId ? await deletedata.deleteData({table: 'TBL_RH', Id: rhInsertedId}) : null;
        rhlabInsertedId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: rhlabInsertedId}) : null;
        return next(error);
    }
   
};

//....................//Update RH //....................//
exports.updateRH = fnErr(async(req, res, next) => {
    let rhUpdateId = '';
     let rhlabUpdateId = '';
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {RHForm, RHLabForm} = req.body;
         console.log('update patient reg req body: ', req.body);
        
         console.log("RH LAB Form from Controller => ", RHLabForm)
         const rhres = await RH.updateRH(RHForm);
         console.log("RH rhres => ", rhres)
         rhUpdateId = rhres.lastRowid;
         const labres = await Lab.updateLab(RHLabForm);
         rhlabUpdateId = labres.lastRowid;
         console.log('Update RH Result ====== ', rhres);
         console.log('Update RH Lab Result ====== ', labres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         rhUpdateId ? await deletedata.deleteData({table: 'TBL_RH', Id: rhUpdateId}) : null;
         rhlabUpdateId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: rhlabUpdateId}) : null;
         return next(error);
     }
 })
//....................//DELETE RH//....................//
exports.deleteRH = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await RH.deleteRH(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})