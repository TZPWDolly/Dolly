//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.deleteServiceShow = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("deleteServiceShow parameter in database ===> " + a.regID) 

        sql = `select * from view_delallservicesview where regid='${a.regID}'`

        console.log('deleteServiceShow in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('deleteServiceShow result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}