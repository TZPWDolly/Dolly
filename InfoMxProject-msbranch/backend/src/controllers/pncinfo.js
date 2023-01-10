const PNC = require('../models/pncinfo');
const Lab = require('../models/labinfo');
const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert PNC//....................//
exports.insertPNC = async(req, res, next) => {
    let insertedId = '';
    let labInsertedId = '';
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {PNCForm, PNCLabForm} = req.body;
        console.log('insert patient reg req body: ', req.body);
       
        console.log("PNC LAB Form from Controller => ", PNCLabForm)
        const rhres = await PNC.insertPNC(PNCForm);
        console.log("PNC rhres => ", rhres)
        insertedId = rhres.lastRowid;
        const labres = await Lab.insertLab(PNCLabForm);
        labInsertedId = labres.lastRowid;
        console.log('Insert PNC Result ====== ', rhres);
        console.log('Insert PNC Lab Result ====== ', labres);
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        insertedId ? await deletedata.deleteData({table: 'TBL_PNC', Id: insertedId}) : null;
        labInsertedId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: labInsertedId}) : null;
        return next(error);
    }
   
};

//....................//Update PNC //....................//
exports.updatePNC = fnErr(async(req, res, next) => {
    let updateId = '';
     let labUpdateId = '';
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {PNCForm, PNCLabForm} = req.body;
         console.log('update patient reg req body: ', req.body);
        
         console.log("PNC LAB Form from Controller => ", PNCLabForm)
         const rhres = await PNC.updatePNC(PNCForm);
         console.log("PNC rhres => ", rhres)
         updateId = rhres.lastRowid;
         const labres = await Lab.updateLab(PNCLabForm);
         labUpdateId = labres.lastRowid;
         console.log('Update PNC Result ====== ', rhres);
         console.log('Update PNC Lab Result ====== ', labres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         updateId ? await deletedata.deleteData({table: 'TBL_PNC', Id: updateId}) : null;
         labUpdateId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: labUpdateId}) : null;
         return next(error);
     }
 })
//....................//DELETE PNC//....................//
exports.deletePNC = fnErr(async(req, res, next) => {
    console.log('update PNC patient reg req body: ', req.body);
    const result = await PNC.deletePNC(req.body);
    console.log('update PNC patient ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})