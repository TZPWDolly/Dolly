//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getAllRegPatient = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("editShow parameter in database ===> " + a.orgID)

        sql = await `Select * from view_regsearch where org='${a.orgID}' and ROWNUM<=50 order by PROVIDEDDATE desc`


        console.log('editShow in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('editShow result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getPatientByID = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getPatientByID parameter in database ===> " + a.regID)

        sql = await `select * from tbl_reg where regid='${a.regID}'`


        console.log('getPatientByID in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getPatientByID result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getPatientForSearch = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getPatientForSearch parameter in database ===> " + a.orgID)

        /* sql = await `Select PATIENTNAME,REGID from view_regsearch where org='${a.orgID}'` */
        sql = await `Select PATIENTNAME,REGID from view_regsearch`


        console.log('getPatientForSearch in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getPatientForSearch result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getSearchPatient = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getSearchPatient parameter in database ===> " + a.regID)

        sql = await `Select * from view_regsearch where regid='${a.regID}'`


        console.log('getSearchPatient in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getSearchPatient result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



