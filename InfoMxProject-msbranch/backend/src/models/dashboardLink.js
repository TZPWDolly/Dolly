//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getDashboardLink = async () => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);

        sql = await `SELECT  ID,DASHBOARD_NAME,dashboard_url FROM TBL_DASHBOARDDATA`


        console.log('getDashboardLink in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getDashboardLink result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}
