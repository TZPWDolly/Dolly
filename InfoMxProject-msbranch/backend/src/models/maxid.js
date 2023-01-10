//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getMaxID = async (a) => {
  try {
    let sql = await '';
    let sn = await '';
    const connection = await oracledb.getConnection(db);
    console.log('db connected: ', connection);
    console.log("getMaxID parameter in database ===> " + a.tblName, a.orgID)


    if (a.tblName == 'tbl_anc') {
      sn = await 'an';
    } else if (a.tblName == 'tbl_delivery') {
      sn = await 'deli';
    } else if (a.tblName == 'tbl_pnc') {
      sn = await 'pn';
    } else if (a.tblName == 'tbl_gm') {
      sn = await 'gm';
    } else if (a.tblName == 'tbl_fp') {
      sn = await 'fp';
    } else if (a.tblName == 'tbl_rh') {
      sn = await 'rh';
    } else if (a.tblName == 'tbl_ipd') {
      sn = await 'ipd';
    } else if (a.tblName == 'tbl_imci1') {
      sn = await 'c1';
    } else if (a.tblName == 'tbl_imci2') {
      sn = await 'c2';
    } else if (a.tblName == 'tbl_muac') {
      sn = await 'muac';
    }

    sql = `select max(id) as max  from ${a.tblName} where  ${sn + "org"}  = '${a.orgID}' `
    //select max(id) as max from tbl_rh where rhorg='CPI-05';

    console.log('getMaxID in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('getMaxID result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}