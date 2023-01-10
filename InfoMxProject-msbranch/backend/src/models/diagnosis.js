//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getDiagnosis = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);

        sql = await  `select dxCode,diagnosis from tbl_diagnosis WHERE   dxicd11='gm' order by diagnosis`
       
        console.log('getdiagnosis in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getdiagnosis result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getIMCI = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);

        sql = await `select dxCode,diagnosis from tbl_diagnosis WHERE  dxicd11='imci'  order by diagnosis`


        console.log('IMCI in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('IMCI result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}