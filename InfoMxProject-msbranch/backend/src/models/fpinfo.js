//Module
const oracledb = require('oracledb');
const moment = require('moment');
//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert FP information//....................//
exports.insertFP = merr(async (data) => {
  let val = [];
  let idata = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      val.push(o);
      if (!isNaN(data[o])) {
        idata.push(data[o])
      } else if (moment(data[o], moment.ISO_8601, true).isValid()) {
        idata.push(`TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`);
      } else {
        idata.push(`'${data[o]}'`)
      }
    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  const connection = await oracledb.getConnection(db);
  const sql = await `INSERT INTO TBL_FP (${val.join(', ')}) VALUES (${idata.join(', ')})`;
  console.log("SQL from FPINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
})

//....................//Update FP information//....................//
exports.updateFP = merr(async (data) => {

  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'ID' || o === 'FPREGID' || o === 'FPORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } else if (moment(data[o], moment.ISO_8601, true).isValid() && o!='FPPROVIDEDDATE') {
        
        if (o === 'ID' || o === 'FPREGID' || o === 'FPORG') {
          wData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
        }
        else { qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`) }

      }
      else if(moment(data[o], moment.ISO_8601, true).isValid() && o==='FPPROVIDEDDATE')
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD')`)
      }
      else {
        
        if (o === 'ID' || o === 'FPREGID' || o === 'FPORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_FP SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from FPINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});

//....................//Update FP information//....................//
const date = require('date-and-time')
exports.deleteFP = merr(async (a) => {
  console.log("a from models reg => ", a)
  const fpDate = new Date()
  const fpTime = date.format(fpDate, 'YYYY/MM/DD HH:mm:ss');
  console.log('FP Date ============> ', fpDate)
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_FP SET FPUSRLOGIN='${a.FPUSRLOGIN}', FPUPDATE=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), 
    FPSTATUS=3 WHERE FPORG='${a.ORGID}' and FPREGID='${a.FPREGID}' and ID=${a.ID} `;

  console.log("FP DELETE QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('UPDATE Delete status model result: ', result);
  await connection.close();
  return result;
});