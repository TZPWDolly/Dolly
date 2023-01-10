const IMAM = require('../models/imaminfo');

const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert IMAM//....................//
exports.insertIMAM = async(req, res, next) => {
    let imamInsertedId = '';
    
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {formData} = req.body;
       
       
        const imamres = await IMAM.insertIMAM(formData);
        console.log("IMAM imamres => ", imamres)
       
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        imamInsertedId ? await deletedata.deleteData({table: 'TBL_IMAM', Id: imamInsertedId}) : null;
       
        return next(error);
    }
   
};

//....................//Update IMAM //....................//
exports.updateIMAM = fnErr(async(req, res, next) => {
    let imamUpdateId = '';
     
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {formData} = req.body;
         console.log('update patient reg req body: ', req.body);
         const imamres = await IMAM.updateIMAM(formData);
         console.log("IMAM imamres => ", imamres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         imamUpdateId ? await deletedata.deleteData({table: 'TBL_IMAM', Id: imamUpdateId}) : null;
         
         return next(error);
     }
 })
//....................//DELETE IMAM//....................//
exports.deleteIMAM = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await IMAM.deleteIMAM(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})