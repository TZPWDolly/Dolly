
const fnErr = require('../controllers/fnErr');
const delSer = require('../models/deleteserviceshow');

//...................get deleteServiceShow....................//
exports.deleteServiceShow = fnErr(async(req, res, next) => {
    console.log('deleteServiceShow req query: ', req.body);

        const deleteServiceShow = await delSer.deleteServiceShow(req.body)
        if(!deleteServiceShow) {next(new custErr("No Data Fount.", 404))}
 
    return res.status(200).json({
        status: 200,
         data: {deleteServiceShow}
      });
})