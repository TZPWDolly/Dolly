const ANC = require('../models/ancinfo');
const Lab = require('../models/labinfo');
const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert ANC//....................//
exports.insertANC = async(req, res, next) => {
    let anInsertedId = '';
    let anlabInsertedId = '';
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {ANCForm, ANCLabForm} = req.body;
        console.log('insert patient reg req body: ', req.body);
       
        console.log("ANC LAB Form from Controller => ", ANCLabForm)
        const anres = await ANC.insertANC(ANCForm);
        console.log("ANC anres => ", anres)
        anInsertedId = anres.lastRowid;
        const labres = await Lab.insertLab(ANCLabForm);
        anlabInsertedId = labres.lastRowid;
        console.log('Insert ANC Result ====== ', anres);
        console.log('Insert ANC Lab Result ====== ', labres);
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        anInsertedId ? await deletedata.deleteData({table: 'TBL_ANC', Id: anInsertedId}) : null;
        anlabInsertedId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: anlabInsertedId}) : null;
        return next(error);
    }
   
};

//....................//Update ANC //....................//
exports.updateANC = fnErr(async(req, res, next) => {
    let anUpdateId = '';
     let anlabUpdateId = '';
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {ANCForm, ANCLabForm} = req.body;
         console.log('update patient reg req body: ', req.body);
        
         console.log("ANC LAB Form from Controller => ", ANCLabForm)
         const anres = await ANC.updateANC(ANCForm);
         console.log("ANC anres => ", anres)
         anUpdateId = anres.lastRowid;
         const labres = await Lab.updateLab(ANCLabForm);
         anlabUpdateId = labres.lastRowid;
         console.log('Update ANC Result ====== ', anres);
         console.log('Update ANC Lab Result ====== ', labres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         anUpdateId ? await deletedata.deleteData({table: 'TBL_ANC', Id: anUpdateId}) : null;
         anlabUpdateId ? await await deletedata.deleteData({table: 'TBL_LAB', Id: anlabUpdateId}) : null;
         return next(error);
     }
 })
//....................//DELETE ANC//....................//
exports.deleteANC = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await ANC.deleteANC(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})