//Module
const oracledb = require('oracledb');

//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');

//....................// deleteRegister//....................//
exports.deleteRegister = merr(async (a) => {

    console.log("a from models reg => ", a)

    const connection = await oracledb.getConnection(db);
    const sql = `delete from tbl_reg where regOrg ='${a.orgID}' and RegId = '${a.regID}'`

    console.log("deleteRegister QUERY => ", sql)
    const result = await connection.execute(sql, {}, { autoCommit: true });
    console.log('deleteRegister model result: ', result);
    await connection.close();
    return result;
});