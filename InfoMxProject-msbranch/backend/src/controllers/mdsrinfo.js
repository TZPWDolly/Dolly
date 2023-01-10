const MDSR = require('../models/mdsrinfo');

const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');

//....................//Insert MDSR//....................//
exports.insertMDSR = async(req, res, next) => {
    let mdsrInsertedId = '';
    
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {mommy} = req.body;
       
        const mdsrres = await MDSR.insertMDSR(mommy);
        console.log("MDSR mdsrres => ", mdsrres)
       
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        mdsrInsertedId ? await deletedata.deleteData({table: 'TBL_MDSR', Id: mdsrInsertedId}) : null;
       
        return next(error);
    }
   
};

//....................//update MDSR//....................//
exports.updateMDSR = async(req, res, next) => {
    let mdsrInsertedId = '';
    
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {mommy} = req.body;
       
        const mdsrres = await MDSR.updateMDSR(mommy);
        console.log("MDSR mdsrres => ", mdsrres)
       
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        mdsrInsertedId ? await deletedata.deleteData({table: 'TBL_MDSR', Id: mdsrInsertedId}) : null;
       
        return next(error);
    }
   
};

 //....................//DELETE MDSR//....................//
exports.deleteMDSR = fnErr(async(req, res, next) => {
    console.log('delete MDSR reg req body: ', req.body);
    const result = await MDSR.deleteMDSR(req.body);
    console.log('delete MDSR Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})