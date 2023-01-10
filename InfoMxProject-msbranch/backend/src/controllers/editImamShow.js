const fnErr = require('./fnErr');
const editShowModal = require('../models/editImamShow');

//....................GET ALL editImamShow Data....................//
exports.editImamShow = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.body);
    
        //getAllImamPatitent
        const editImamShow = await editShowModal.editImamShow(req.body)
        if(!editImamShow) {next(new custErr("No Data Fount.", 404))} 

    return res.status(200).json({
        status: 200,
        data: {editImamShow}
      });
})