//Module
const oracledb = require('oracledb');
const { db } = require('./database');
//Models
const merr = require('../controllers/merr');

//....................//Delete Function//....................//
exports.deleteData = merr(async (data) => {
    const connection = await oracledb.getConnection(db);
    const sql = `Delete from ${data.table} where Rowid ='${data.Id}'`;
    const result = await connection.execute(sql, [], {autoCommit: true});
    await connection.close(); 
    return result;
  })