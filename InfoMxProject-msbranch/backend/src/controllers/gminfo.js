const GM = require('../models/gminfo');
const Lab = require('../models/labinfo');
const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert GM//....................//
exports.insertGM = async(req, res, next) => {
    let rhInsertedId = '';
    let rhlabInsertedId = '';
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {GMForm, GMLabForm} = req.body;
        console.log('insert patient reg req body: ', req.body);
       
        console.log("GM LAB Form from Controller => ", GMLabForm)
        const rhres = await GM.insertGM(GMForm);
        console.log("GM res => ", rhres)
        rhInsertedId = rhres.lastRowid;
        const labres = await Lab.insertLab(GMLabForm);
        rhlabInsertedId = labres.lastRowid;
        console.log('Insert GM Result ====== ', rhres);
        console.log('Insert GM Lab Result ====== ', labres);
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        rhInsertedId ? await deletedata.deleteData({table: 'TBL_GM', Id: rhInsertedId}) : null;
        rhlabInsertedId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: rhlabInsertedId}) : null;
        return next(error);
    }
   
};

//....................//Update GM //....................//
exports.updateGM = fnErr(async(req, res, next) => {
    let rhUpdateId = '';
     let rhlabUpdateId = '';
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {GMForm, GMLabForm} = req.body;
         console.log('update patient reg req body: ', req.body);
        
         console.log("GM LAB Form from Controller => ", GMLabForm)
         const rhres = await GM.updateGM(GMForm);
         console.log("GM rhres => ", rhres)
         rhUpdateId = rhres.lastRowid;
         const labres = await Lab.updateLab(GMLabForm);
         rhlabUpdateId = labres.lastRowid;
         console.log('Update GM Result ====== ', rhres);
         console.log('Update GM Lab Result ====== ', labres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         rhUpdateId ? await deletedata.deleteData({table: 'TBL_GM', Id: rhUpdateId}) : null;
         rhlabUpdateId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: rhlabUpdateId}) : null;
         return next(error);
     }
 })
//....................//DELETE GM//....................//
exports.deleteGM = fnErr(async(req, res, next) => {
    console.log('delete GM reg req body: ', req.body);
    const result = await GM.deleteGM(req.body);
    console.log('delete GM Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})