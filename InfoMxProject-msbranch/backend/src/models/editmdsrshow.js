//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.editMDSRShow = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("editMDSRShow parameter in database ===> " + a.orgID)

       //local 
         sql = await ` select MDNO,MDNAME from tbl_mdsr where MDSTATUS < 3`

        console.log('editMDSRShow in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('editMDSRShow result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getMDSR = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getMDSR parameter in database ===> " + a.orgID)

       //local 
         sql = await ` select * from tbl_mdsr where MDNO='${a.ID}' where MDSTATUS < 3`

        console.log('getMDSR in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getMDSR result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getMDSRPatient = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getMDSRPatient parameter in database ===> " + a.orgID)

       //local 
         sql = await `select MDRY,(CASE MDRQ WHEN 1 THEN 'Q1' WHEN 2 THEN 'Q2' WHEN 3 THEN 'Q3' WHEN 4 THEN 'Q4' ELSE '' END)MDRQ,(CASE MDRM WHEN 1 THEN 'JAN' WHEN 2 THEN 'FEB' WHEN 3 THEN 'MAR' WHEN 4 THEN 'APR' WHEN 5 THEN 'MAY' WHEN 6 THEN 'JUN' WHEN 7 THEN 'JUL' WHEN 8 THEN 'AUG' WHEN 9 THEN 'SEP' WHEN 10 THEN 'OCT' WHEN 11 THEN 'NOV' WHEN 12 THEN 'DEC' ELSE '' END) MDRM,
         C##APIUSER.TBL_PROJECT.PROJECT_NAME,C##APIUSER.TBL_ORG.ORG_shortNAME,C##APIUSER.TBL_DIVISION.DIV_NAME,C##APIUSER.TBL_TOWNSHIP.TSP_NAME,C##APIUSER.TBL_VILLAGE.VILLAGE_NAME,C##APIUSER.TBL_CLINIC.CLN_NAME,
         MDNAME,MDAGE,(CASE MDAGEU WHEN 365 THEN 'Year' WHEN 30 THEN 'Month' WHEN 1 THEN 'Day' ELSE '' END) AGEUNIT,MDNO
         from tbl_mdsr,C##APIUSER.TBL_ORG,C##APIUSER.TBL_PROJECT,C##APIUSER.TBL_DIVISION,C##APIUSER.TBL_TOWNSHIP,C##APIUSER.TBL_CLINIC,C##APIUSER.TBL_VILLAGE
         WHERE tbl_mdsr.MDNO='${a.ID}' AND tbl_mdsr.mdstatus<3 AND tbl_mdsr.MDORGID=c##APIUSER.TBL_ORG.ORG_ID AND TBL_MDSR.MDPJID=C##APIUSER.TBL_PROJECT.PROJECT_ID AND TBL_MDSR.MDST=C##APIUSER.TBL_DIVISION.DIV_ID AND TBL_MDSR.MDTSP=C##APIUSER.TBL_TOWNSHIP.TSP_ID 
         AND TBL_MDSR.MDVIL=C##APIUSER.TBL_VILLAGE.VILLAGE_CODE AND TBL_MDSR.MDNCL=C##APIUSER.TBL_CLINIC.CLN_ID`
        /*      //server
         sql = await `select MDRY,(CASE MDRQ WHEN 1 THEN 'Q1' WHEN 2 THEN 'Q2' WHEN 3 THEN 'Q3' WHEN 4 THEN 'Q4' ELSE '' END)MDRQ,(CASE MDRM WHEN 1 THEN 'JAN' WHEN 2 THEN 'FEB' WHEN 3 THEN 'MAR' WHEN 4 THEN 'APR' WHEN 5 THEN 'MAY' WHEN 6 THEN 'JUN' WHEN 7 THEN 'JUL' WHEN 8 THEN 'AUG' WHEN 9 THEN 'SEP' WHEN 10 THEN 'OCT' WHEN 11 THEN 'NOV' WHEN 12 THEN 'DEC' ELSE '' END) MDRM,
 APIUSER.TBL_PROJECT.PROJECT_NAME, APIUSER.TBL_ORG.ORG_shortNAME, APIUSER.TBL_DIVISION.DIV_NAME, APIUSER.TBL_TOWNSHIP.TSP_NAME, APIUSER.TBL_VILLAGE.VILLAGE_NAME, APIUSER.TBL_CLINIC.CLN_NAME,
MDNAME,MDAGE,(CASE MDAGEU WHEN 365 THEN 'Year' WHEN 30 THEN 'Month' WHEN 1 THEN 'Day' ELSE '' END) AGEUNIT,MDNO
from tbl_mdsr, APIUSER.TBL_ORG, APIUSER.TBL_PROJECT, APIUSER.TBL_DIVISION, APIUSER.TBL_TOWNSHIP, APIUSER.TBL_CLINIC, APIUSER.TBL_VILLAGE
WHERE tbl_mdsr.MDNO='${a.ID}' AND tbl_mdsr.MDORGID= APIUSER.TBL_ORG.ORG_ID AND TBL_MDSR.MDPJID= APIUSER.TBL_PROJECT.PROJECT_ID AND TBL_MDSR.MDST= APIUSER.TBL_DIVISION.DIV_ID AND TBL_MDSR.MDTSP= APIUSER.TBL_TOWNSHIP.TSP_ID 
AND TBL_MDSR.MDVIL= APIUSER.TBL_VILLAGE.VILLAGE_CODE AND TBL_MDSR.MDNCL= APIUSER.TBL_CLINIC.CLN_ID`
    */

        console.log('getMDSRPatient in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getMDSRPatient result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}