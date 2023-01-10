//Module
const oracledb = require('oracledb');
const moment = require('moment');
//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert ANC information//....................//
exports.insertANC = merr(async (data) => {
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
  const sql = await `INSERT INTO TBL_ANC (${val.join(', ')}) VALUES (${idata.join(', ')})`;
  console.log("SQL from RHINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
})

//....................//Update ANC information//....................//
exports.updateANC = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'ID' || o === 'ANREGID' || o === 'ANORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } else if (moment(data[o], moment.ISO_8601, true).isValid() && o!='ANPROVIDEDDATE') {
        
        if (o === 'ID' || o === 'ANREGID' || o === 'ANORG') {
          wData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
        }
        else { qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`) }

      }
      else if(moment(data[o], moment.ISO_8601, true).isValid() && o==='ANPROVIDEDDATE')
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD')`)
      }
      else {
        
        if (o === 'ID' || o === 'ANREGID' || o === 'ANORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_ANC SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from ANCINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});


//....................//Delete ANC information//....................//
const date = require('date-and-time')
exports.deleteANC = merr(async (a) => {
  console.log("a from models reg => ", a)
  const anDate = new Date()
  const anTime = date.format(anDate, 'YYYY/MM/DD HH:mm:ss');
  console.log('AN Date ============> ', anDate)
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_ANC SET ANUSRLOGIN='${a.ANUSRLOGIN}', ANUPDATE=TO_DATE('${anTime}','YYYY-MM-DD HH24:MI:SS'), 
    ANSTATUS=3 WHERE ANORG='${a.ORGID}' and ANREGID='${a.ANREGID}' and ID=${a.ID} `;

  console.log("AN DELETE QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('UPDATE Delete status model result: ', result);
  await connection.close();
  return result;
});

