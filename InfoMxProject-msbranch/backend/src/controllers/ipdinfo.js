const IPD = require('../models/ipdinfo');
const Lab = require('../models/labinfo');
const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert IPD//....................//
exports.insertIPD = async(req, res, next) => {
    let rhInsertedId = '';
    let rhlabInsertedId = '';
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {formData, IPDLabForm} = req.body;
        console.log('insert patient reg req body: ', req.body);
       
        console.log("IPD LAB Form from Controller => ", IPDLabForm)
        const rhres = await IPD.insertIPD(formData);
        console.log("IPD res => ", rhres)
        rhInsertedId = rhres.lastRowid;
        const labres = await Lab.insertLab(IPDLabForm);
        rhlabInsertedId = labres.lastRowid;
        console.log('Insert IPD Result ====== ', rhres);
        console.log('Insert IPD Lab Result ====== ', labres);
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        rhInsertedId ? await deletedata.deleteData({table: 'TBL_IPD', Id: rhInsertedId}) : null;
        rhlabInsertedId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: rhlabInsertedId}) : null;
        return next(error);
    }
   
};

//....................//Update IPD //....................//
exports.updateIPD = fnErr(async(req, res, next) => {
    let rhUpdateId = '';
     let rhlabUpdateId = '';
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {formData, IPDLabForm} = req.body;
         console.log('update patient reg req body: ', req.body);
        
         console.log("IPD LAB Form from Controller => ", IPDLabForm)
         const rhres = await IPD.updateIPD(formData);
         console.log("IPD rhres => ", rhres)
         rhUpdateId = rhres.lastRowid;
         const labres = await Lab.updateLab(IPDLabForm);
         rhlabUpdateId = labres.lastRowid;
         console.log('Update IPD Result ====== ', rhres);
         console.log('Update IPD Lab Result ====== ', labres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         rhUpdateId ? await deletedata.deleteData({table: 'TBL_IPD', Id: rhUpdateId}) : null;
         rhlabUpdateId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: rhlabUpdateId}) : null;
         return next(error);
     }
 })
//....................//DELETE IPD//....................//
exports.deleteIPD = fnErr(async(req, res, next) => {
    console.log('delete IPD reg req body: ', req.body);
    const result = await IPD.deleteIPD(req.body);
    console.log('delete IPD Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})