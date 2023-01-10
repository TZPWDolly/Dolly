
const fnErr = require('../controllers/fnErr');
const delSer = require('../models/deleteregshow');

//...................get deleteRegShow....................//
exports.deleteRegShow = fnErr(async(req, res, next) => {
    console.log('deleteRegShow req query: ', req.body);

        const deleteRegShow = await delSer.deleteRegShow(req.body)
        if(!deleteRegShow) {next(new custErr("No Data Fount.", 404))}
 
    return res.status(200).json({
        status: 200,
         data: {deleteRegShow}
      });
})