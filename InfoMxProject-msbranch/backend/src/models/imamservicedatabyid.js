//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

///////////////////////Get Imam Service Data by ID(edit btn click)///////////////////////// 
exports.getServiceData = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getServiceData parameter in database ===> " + a)

        sql = `  Select * from ${a.tblName} where ${a.sn}Status <> 3 and ${a.sn}Org='${a.orgID}' and id=${a.ID}`

        console.log('getServiceData in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getServiceData result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}