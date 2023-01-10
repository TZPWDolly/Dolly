//Module
const oracledb = require('oracledb');

//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');

//....................// deleteLabService//....................//
exports.deleteLabService = merr(async (a) => {

    console.log("a from models reg => ", a)

    const connection = await oracledb.getConnection(db);
    let sql = `delete from tbl_lab where laborg='${a.orgID}' and labregid='${a.regID}'  and id=${a.ID} and labssource='${a.sn}'`

    console.log("deleteLabService QUERY => ", sql)
    const result = await connection.execute(sql, {}, { autoCommit: true });
    console.log('deleteLabService model result: ', result);
    await connection.close();
    return result;
});