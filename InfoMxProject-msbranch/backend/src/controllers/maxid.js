const max = require('../models/maxid');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');

//....................//Get MaxID//....................//

exports.maxid = fnErr(async(req, res, next) => {
    
    
    //getMaxID
    const getMaxID = await max.getMaxID(req.body)
    if(!getMaxID) {next(new custErr("No Data Fount.", 404))}
    console.log('getMaxID req query: ', req.body);

    
    
return res.status(200).json({
    status: 200,
    data: {getMaxID }
  });
})