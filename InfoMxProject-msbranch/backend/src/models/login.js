//Module
const oracledb = require('oracledb');

//Models
const { apidb } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getAllProjectInLogIn = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("getAllProjectInLogIn parameter in database ===> " + JSON.stringify(a))
        if (_.isEmpty(a)) {
            sql = await `SELECT PROJECT_ID,PROJECT_NAME,DONOR_ID FROM TBL_PROJECT ORDER BY PROJECT_NAME `}
        else {
            sql = await `SELECT PROJECT_ID,PROJECT_NAME,DONOR_ID FROM TBL_PROJECT ORDER BY PROJECT_NAME `}

        console.log('getAllProjectInLogIn in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getAllProjectInLogIn result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getDonor = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("getDonor parameter in database ===> " + JSON.stringify(a))
        if (_.isEmpty(a)) {
            sql = await `select DONOR_ID,DONOR_NAME,DONOR_SHORTNAME FROM TBL_DONOR ORDER BY DONOR_NAME `}
        else {
            sql = await `select DONOR_ID,DONOR_NAME,DONOR_SHORTNAME FROM TBL_DONOR ORDER BY DONOR_NAME `}

        console.log('getDonor in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getDonor result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getAllTownship = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("getAllTownship parameter in database ===> " + JSON.stringify(a))
        if (_.isEmpty(a)) {
            sql = await `SELECT TSP_ID,TSP_NAME,TSP_SHORTNAME FROM TBL_TOWNSHIP `}
        else {
            sql = await `SELECT TSP_ID,TSP_NAME,TSP_SHORTNAME FROM TBL_TOWNSHIP `
        }

        console.log('getAllTownship in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getAllTownship result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

