//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getPatient = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getPatient parameter in database ===> " + a.regID, a.orgID)

        /* sql = await `Select * from tbl_reg where regStatus <>3 and regOrg='${a.orgID}' and regId ='${a.regID}'` */
        sql = await `Select * from tbl_reg where regStatus <>3 and regId ='${a.regID}'`


        console.log('getPatient in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getPatient result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getPatientType = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getPatientType parameter in database ===> " + a.regID)

        sql = await `SELECT  max(rownum) 
        serCnt FROM ( SELECT gmRegId AS regid,gmProvidedDate AS provideddate,gmOrg AS org,
        gmProject AS project,gmDonor AS donor, gmTsp AS tspid,gmClnId AS clnid,gmVillage AS villagecode, 
        gmPlace AS place,'gm' AS serv FROM tbl_gm WHERE gmStatus <3  AND 
        gmGMtype = 1 union all  SELECT fpRegId AS regid,fpProvidedDate AS provideddate,fpOrg AS org,
        fpProject AS project,fpDonor AS donor, fpTsp AS tspid,fpClnId AS clnid,fpVillage AS villagecode, 
        fpPlace AS place,'fp' AS serv FROM tbl_fp WHERE fpStatus <3
        UNION ALL  SELECT rhRegId AS regid,rhProvidedDate AS provideddate,rhOrg AS org, rhProject AS project,rhDonor AS donor, rhTsp AS tspid,rhClnId AS clnid,rhVillage AS villagecode, rhPlace AS place,'rh' AS serv FROM tbl_rh WHERE rhStatus <3  
        UNION ALL  SELECT anRegId AS regid,anProvidedDate AS provideddate,anOrg AS org, anProject AS project,anDonor AS donor, anTsp AS tspid,anClnId AS clnid,anVillage AS villagecode, anPlace AS place,'an' AS serv FROM tbl_anc WHERE anStatus <3 
        UNION ALL  SELECT pnRegId AS regid,pnProvidedDate AS provideddate,pnOrg AS org, pnProject AS project,pnDonor AS donor, pnTsp AS tspid,pnClnId AS clnid,pnVillage AS villagecode, pnPlace AS place,'pn' AS serv FROM tbl_pnc WHERE pnStatus <3   
        UNION ALL  SELECT deliRegId AS regid,deliProvidedDate AS provideddate,deliOrg AS org, deliProject AS project,deliDonor AS donor, deliTsp AS tspid,deliClnId AS clnid,deliVillage AS villagecode, deliPlace AS place,'deli' AS serv FROM tbl_delivery WHERE deliStatus <3       
        UNION ALL  SELECT ipdRegId AS regid,ipdProvidedDate AS provideddate,ipdOrg AS org, ipdProject AS project,ipdDonor AS donor, ipdTsp AS tspid,ipdClnId AS clnid,ipdVillage AS villagecode, ipdPlace AS place,'ipd' AS serv FROM tbl_ipd WHERE ipdStatus <3  )      
        a where a.regid='${a.regID}'`


        console.log('getPatientType in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getPatientType result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


