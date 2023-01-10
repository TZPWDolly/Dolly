const DELI = require('../models/deliinfo');
const Lab = require('../models/labinfo');
const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert DELI//....................//
exports.insertDELI = async(req, res, next) => {
    let deliInsertedId = '';
    let delilabInsertedId = '';
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {deliForm, deliLabForm} = req.body;
        console.log('insert patient reg req body: ', req.body);
       
        console.log("DELI LAB Form from Controller => ", deliLabForm)
        const rhres = await DELI.insertDELI(deliForm);
        console.log("DELI rhres => ", rhres)
        deliInsertedId = rhres.lastRowid;
        const labres = await Lab.insertLab(deliLabForm);
        delilabInsertedId = labres.lastRowid;
        console.log('Insert DELI Result ====== ', rhres);
        console.log('Insert DELI Lab Result ====== ', labres);
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        deliInsertedId ? await deletedata.deleteData({table: 'TBL_DELIVERY', Id: deliInsertedId}) : null;
        delilabInsertedId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: delilabInsertedId}) : null;
        return next(error);
    }
   
};

//....................//Update DELI //....................//
exports.updateDELI = fnErr(async(req, res, next) => {
    let deliUpdateId = '';
     let delilabUpdateId = '';
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {deliForm, deliLabForm} = req.body;
         console.log('update patient reg req body: ', req.body);
        
         console.log("DELI LAB Form from Controller => ", deliLabForm)
         const rhres = await DELI.updateDELI(deliForm);
         console.log("DELI rhres => ", rhres)
         deliUpdateId = rhres.lastRowid;
         const labres = await Lab.updateLab(deliLabForm);
         delilabUpdateId = labres.lastRowid;
         console.log('Update DELI Result ====== ', rhres);
         console.log('Update DELI Lab Result ====== ', labres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         deliUpdateId ? await deletedata.deleteData({table: 'TBL_DELIVERY', Id: deliUpdateId}) : null;
         delilabUpdateId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: delilabUpdateId}) : null;
         return next(error);
     }
 })
//....................//DELETE DELI//....................//
exports.deleteDELI = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await DELI.deleteDELI(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})