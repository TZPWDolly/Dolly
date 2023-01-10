const fnErr = require('./fnErr');
const exportTable = require('../models/exportbyproject');

//....................GET ALL edit show Data....................//
exports.exportAllTable = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.body);
    
        

        //getANCTable
        const getANCTable = await exportTable.exportANCTable(req.body)
        if(!getANCTable) {next(new custErr("No Data Fount.", 404))}

        //getDeliTable
        const getDeliTable = await exportTable.exportDeliTable(req.body)
        if(!getDeliTable) {next(new custErr("No Data Fount.", 404))}

        //getPNCTable
        const getPNCTable = await exportTable.exportPNCTable(req.body)
        if(!getPNCTable) {next(new custErr("No Data Fount.", 404))}

        //getFPTable
        const getFPTable = await exportTable.exportFPTable(req.body)
        if(!getFPTable) {next(new custErr("No Data Fount.", 404))}

        //getRHTable
        const getRHTable = await exportTable.exportRHTable(req.body)
        if(!getRHTable) {next(new custErr("No Data Fount.", 404))}

        //getRegTable
        const getRegTable = await exportTable.exportRegTable(req.body)
        if(!getRegTable) {next(new custErr("No Data Fount.", 404))}

        //getORegTable
        const getORegTable = await exportTable.exportORegTable(req.body)
        if(!getORegTable) {next(new custErr("No Data Fount.", 404))}

        //getGMTable
        const getGMTable = await exportTable.exportGMTable(req.body)
        if(!getGMTable) {next(new custErr("No Data Fount.", 404))}

        //getGMTable
        const getOPDMedTable = await exportTable.exportOPDMedTable(req.body)
        if(!getOPDMedTable) {next(new custErr("No Data Fount.", 404))}

        //getGMTable
        const getOPDSurTable = await exportTable.exportOPDSurTable(req.body)
        if(!getOPDSurTable) {next(new custErr("No Data Fount.", 404))}

        //getIPDTable
        const getIPDTable = await exportTable.exportIPDTable(req.body)
        if(!getIPDTable) {next(new custErr("No Data Fount.", 404))}

        //getLabTable
        const getLabTable = await exportTable.exportLabTable(req.body)
        if(!getLabTable) {next(new custErr("No Data Fount.", 404))}

        //getImamTable
        const getIMAMTable = await exportTable.exportIMAMTable(req.body)
        if(!getIMAMTable) {next(new custErr("No Data Fount.", 404))}
 

        //getImamsfpTable
        const getIMAMSFPTable = await exportTable.exportIMAMSFPTable(req.body)
        if(!getIMAMSFPTable) {next(new custErr("No Data Fount.", 404))}
 
 
    return res.status(200).json({
        status: 200,
         data: {getANCTable, getDeliTable, getPNCTable, getFPTable, getRHTable,getRegTable,getORegTable,  getGMTable,getOPDMedTable ,getOPDSurTable, getIPDTable, getLabTable,getIMAMTable, getIMAMSFPTable}
      });
})