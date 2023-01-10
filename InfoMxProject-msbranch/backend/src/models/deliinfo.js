//Module
const oracledb = require('oracledb');
const moment = require('moment');
//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert DELI information//....................//
exports.insertDELI = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      val.push(o);
      if (!isNaN(data[o])) {
        idata.push(data[o])
        qData.push(o + '=' + data[o])
      } else if (moment(data[o], moment.ISO_8601, true).isValid()) {
        idata.push(`TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`);
      } else {
        idata.push(`'${data[o]}'`)
        qData.push(o + '=' + `'${data[o]}'`)
      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  const connection = await oracledb.getConnection(db);
  const sql = await `INSERT INTO TBL_DELIVERY (${val.join(', ')},DELITIME) VALUES (${idata.join(', ')},TO_TIMESTAMP('1970-01-01 05:45:00.271000000', 'YYYY-MM-DD HH24:MI:SS.FF'))`;
  console.log("SQL from DELIINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
})

//....................//Update DELI information//....................//
exports.updateDELI = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'ID' || o === 'DELIREGID' || o === 'DELIORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } else if (moment(data[o], moment.ISO_8601, true).isValid() && o!='DELIPROVIDEDDATE') {
        
        if (o === 'ID' || o === 'DELIREGID' || o === 'DELIORG') {
          wData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
        }
        else { qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`) }

      }
      else if(moment(data[o], moment.ISO_8601, true).isValid() && o==='DELIPROVIDEDDATE')
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD')`)
      }
      else {
        
        if (o === 'ID' || o === 'DELIREGID' || o === 'DELIORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_DELIVERY SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from DELIINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});


//....................//Delete DELI information//....................//
const date = require('date-and-time')
exports.deleteDELI = merr(async (a) => {
  console.log("a from models reg => ", a)
  const deliDate = new Date()
  const deliTime = date.format(deliDate, 'YYYY/MM/DD HH:mm:ss');
  console.log('DELI Date ============> ', deliDate)
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_DELIVERY SET DELIUSRLOGIN='${a.DELIUSRLOGIN}', DELIUPDATE=TO_DATE('${deliTime}','YYYY-MM-DD HH24:MI:SS'), 
    DELISTATUS=3 WHERE DELIORG='${a.ORGID}' and DELIREGID='${a.DELIREGID}' and ID=${a.ID} `;

  console.log("DELI DELETE QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('UPDATE Delete status model result: ', result);
  await connection.close();
  return result;
});