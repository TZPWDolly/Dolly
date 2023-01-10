const IMAMSFP = require('../models/imamsfpinfo');

const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert IMAMSFP//....................//
exports.insertIMAMSFP = async(req, res, next) => {
    let imamsfpInsertedId = '';
    
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {formData} = req.body;
       
       
        const imamsfpres = await IMAMSFP.insertIMAMSFP(formData);
        console.log("IMAMSFP imamres => ", imamsfpres)
       
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        imamsfpInsertedId ? await deletedata.deleteData({table: 'TBL_IMAMSFP', Id: imamsfpInsertedId}) : null;
       
        return next(error);
    }
   
};

//....................//Update IMAMSFP //....................//
exports.updateIMAMSFP = fnErr(async(req, res, next) => {
    let imamsfpUpdateId = '';
     
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {formData} = req.body;
         console.log('update patient reg req body: ', req.body);
         const imamsfpres = await IMAMSFP.updateIMAMSFP(formData);
         console.log("IMAMSFP imamres => ", imamsfpres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         imamsfpUpdateId ? await deletedata.deleteData({table: 'TBL_IMAMSFP', Id: imamsfpUpdateId}) : null;
         
         return next(error);
     }
 })
//....................//DELETE IMAMSFP//....................//
exports.deleteIMAMSFP = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await IMAMSFP.deleteIMAMSFP(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})