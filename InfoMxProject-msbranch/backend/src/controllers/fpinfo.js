const FP = require('../models/fpinfo');
const Lab = require('../models/labinfo');
const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert FP//....................//
exports.insertFP = async(req, res, next) => {
    let fpInsertedId = '';
    let fplabInsertedId = '';
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {FPForm, FPLabForm} = req.body;
        console.log('insert patient reg req body: ', req.body);
       
        console.log("FP LAB Form from Controller => ", FPLabForm)
        const fpres = await FP.insertFP(FPForm);
        console.log("FP fpres => ", fpres)
        fpInsertedId = fpres.lastRowid;
        const labres = await Lab.insertLab(FPLabForm);
        fplabInsertedId = labres.lastRowid;
        console.log('Insert FP Result ====== ', fpres);
        console.log('Insert FP Lab Result ====== ', labres);
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        fpInsertedId ? await deletedata.deleteData({table: 'TBL_FP', Id: fpInsertedId}) : null;
        fplabInsertedId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: fplabInsertedId}) : null;
        return next(error);
    }
   
};


//....................//Update FP //....................//
exports.updateFP = fnErr(async(req, res, next) => {
    let fpUpdateId = '';
     let fplabUpdateId = '';
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {FPForm, FPLabForm} = req.body;
         console.log('update patient reg req body: ', req.body);
        
         console.log("FP LAB Form from Controller => ", FPLabForm)
         const fpres = await FP.updateFP(FPForm);
         console.log("FP fpres => ", fpres)
         fpUpdateId = fpres.lastRowid;
         const labres = await Lab.updateLab(FPLabForm);
         fplabUpdateId = labres.lastRowid;
         console.log('Update FP Result ====== ', fpres);
         console.log('Update FP Lab Result ====== ', labres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         fpUpdateId ? await deletedata.deleteData({table: 'TBL_FP', Id: fpUpdateId}) : null;
         fplabUpdateId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: fplabUpdateId}) : null;
         return next(error);
     }
})
//....................//DELETE FP//....................//
exports.deleteFP = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await FP.deleteFP(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})