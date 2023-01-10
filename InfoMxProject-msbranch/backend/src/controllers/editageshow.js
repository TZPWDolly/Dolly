
const fnErr = require('../controllers/fnErr');
const editAge = require('../models/editageshow');

//...................get editageshow....................//
exports.editAgeShow = fnErr(async(req, res, next) => {
    console.log('editAgeShow req query: ', req.body);

        const editAgeShow = await editAge.editAgeShow(req.body)
        if(!editAgeShow) {next(new custErr("No Data Fount.", 404))}
 
    return res.status(200).json({
        status: 200,
         data: {editAgeShow}
      });
})