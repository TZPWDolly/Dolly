const fnErr = require('./fnErr');
const loginModal = require('../models/login.js');

//....................GET ALL LOGIN Data....................//
exports.login = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.query);

        //getAllProjectInLogin
        const getAllProjectInLogIn = await loginModal.getAllProjectInLogIn(req.query)
        if(!getAllProjectInLogIn) {next(new custErr("No Data Fount.", 404))}
    
        //getDonor
        const getDonor = await loginModal.getDonor(req.query)
        if(!getDonor) {next(new custErr("No Data Fount.", 404))}

        //getAllTownship
        const getAllTownship = await loginModal.getAllTownship(req.query)
        if(!getAllTownship) {next(new custErr("No Data Fount.", 404))}

    return res.status(200).json({
        status: 200,
        data: { getAllProjectInLogIn, getDonor, getAllTownship}
      });
})




