const fnErr = require('./fnErr');
const coverageModal = require('../models/coverage');
const orgModal = require('../models/villagebyOrg')

//....................GET ALL COV Table Data....................//
exports.coverage = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.query);
    
        //VillageByTsp
        const villageByTsp = await coverageModal.villageByTsp(req.query)
        if(!villageByTsp) {next(new custErr("No Data Fount.", 404))}

        //ClinicDetail
        const clinicDetailTable = await coverageModal.clinicDetailTable(req.query)
        if(!clinicDetailTable) {next(new custErr("No Data Fount.", 404))}

        //DuplicateClinic
        const duplicateClinic = await coverageModal.duplicateClinic(req.query)
        if(!duplicateClinic) {next(new custErr("No Data Fount.", 404))}

        //VillageByOrg
        const villageByOrg = await coverageModal.villageByOrg(req.query)
        if(!villageByOrg) {next(new custErr("No Data Fount.", 404))}
        
        //CoverageTable
        const coverageTable = await coverageModal.coverageTable(req.query)
        if(!coverageTable) {next(new custErr("No Data Fount.", 404))}

        //ClinicbyPop
        const clinciByPop = await coverageModal.clinicByPop(req.query)
        if(!clinciByPop) {next(new custErr("No Data Fount.", 404))}

        //PopandHouseholdbyTsp
        const popHhByTsp = await coverageModal.popHhByTsp(req.query)
        if(!popHhByTsp) {next(new custErr("No Data Fount.", 404))}

        //CoverageMap
        const coverageMap = await coverageModal.coverageMap(req.query)
        if(!coverageMap) {next(new custErr("No Data Fount.", 404))}
        

    return res.status(200).json({
        status: 200,
        data: {coverageTable , clinicDetailTable, duplicateClinic, villageByOrg, popHhByTsp, villageByTsp, clinciByPop, coverageMap}
      });
})




