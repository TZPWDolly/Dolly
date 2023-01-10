//Module
const oracledb = require('oracledb');
const moment = require('moment');
//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert PNC information//....................//
exports.insertPNC = merr(async (data) => {
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
  const sql = await `INSERT INTO TBL_PNC (${val.join(', ')}) VALUES (${idata.join(', ')})`;
  console.log("SQL from PNCINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
})

//....................//Update PNC information//....................//
exports.updatePNC = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'ID' || o === 'PNREGID' || o === 'PNORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } else if (moment(data[o], moment.ISO_8601, true).isValid() && o!='PNPROVIDEDDATE') {
        
        if (o === 'ID' || o === 'PNREGID' || o === 'PNORG') {
          wData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
        }
        else { qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`) }

      }
      else if(moment(data[o], moment.ISO_8601, true).isValid() && o==='PNPROVIDEDDATE')
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD')`)
      }
      else {
        
        if (o === 'ID' || o === 'PNREGID' || o === 'PNORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_PNC SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from PNCUpdate=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});


//....................//Delete PNC information//....................//
const date = require('date-and-time')
exports.deletePNC = merr(async (a) => {
  console.log("a from models reg => ", a)
  const pdate = new Date()
  const pTime = date.format(pdate, 'YYYY/MM/DD HH:mm:ss');
  console.log('PNC Date ============> ', pdate)
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_PNC SET PNUSRLOGIN='${a.PNUSRLOGIN}', PNUPDATE=TO_DATE('${pTime}','YYYY-MM-DD HH24:MI:SS'), 
    PNSTATUS=3 WHERE PNORG='${a.ORGID}' and PNREGID='${a.PNREGID}' and ID=${a.ID} `;

  console.log("PNC DELETE QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('UPDATE Delete status model result: ', result);
  await connection.close();
  return result;
});
