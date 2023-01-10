const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');
const background = require('../models/background');


//....................GET VILLAGE BY ORG AND PROJECT....................//
exports.getVillageByOrg = fnErr(async(req, res, next) => {

    console.log('project req query: ', req.body);
    if(!req.body.orgID || !req.body.projID) {
        return next(new custErr('Not found Organization and Project.', 404));
    }
    const result = await background.getVillageByOrg(req.body);
    return res.status(200).json({
        status: 201,
        data: result,
      });
});