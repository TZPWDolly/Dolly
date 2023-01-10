//Module
const oracledb = require('oracledb');
const moment = require('moment');
//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert IMAMSFP information//....................//
exports.insertIMAMSFP = merr(async (data) => {
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
  const sql = await `INSERT INTO TBL_IMAMSFP (${val.join(', ')}) VALUES (${idata.join(', ')})`;
  console.log("SQL from IMAMSFPINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
})

//....................//Update IMAM information//....................//
exports.updateIMAMSFP = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'ID' || o === 'IMAMSFPPROJECT' || o === 'IMAMSFPORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } else if (moment(data[o], moment.ISO_8601, true).isValid() && o!='IMAMSFPPROVIDEDDATE') {
        
        if (o === 'ID' || o === 'IMAMSFPPROJECT' || o === 'IMAMSFPORG') {
          wData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
        }
        else { qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`) }

      }
      else if(moment(data[o], moment.ISO_8601, true).isValid() && o==='IMAMSFPPROVIDEDDATE')
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD')`)
      }
      else {
        
        if (o === 'ID' || o === 'IMAMSFPPROJECT' || o === 'IMAMSFPORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_IMAMSFP SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from IMAMSFPINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});


//....................//Delete IMAMSFP information//....................//
const date = require('date-and-time')
exports.deleteIMAMSFP = merr(async (a) => {
  console.log("a from models reg => ", a)
  const imamsfpDate = new Date()
  const imamsfpTime = date.format(imamDate, 'YYYY/MM/DD HH:mm:ss');
  console.log('IMAMSFP Date ============> ', imamDate)
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_IMAMSFP SET IMAMSFPUSRLOGIN='${a.IMAMSFPUSRLOGIN}', IMAMSFPUPDATE=TO_DATE('${imamTime}','YYYY-MM-DD HH24:MI:SS'), 
    IMAMSFPSTATUS=3 WHERE IMAMSFPORG='${a.ORGID}'  and ID=${a.ID} `;

  console.log("IMAM DELETE QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('UPDATE Delete status model result: ', result);
  await connection.close();
  return result;
});




/*
Name                Null?    Type              
------------------- -------- ----------------- 
ID                  NOT NULL NUMBER(10)        
IMAMSFPDONOR                 VARCHAR2(10 CHAR) 
IMAMSFPORG                   VARCHAR2(10 CHAR) 
IMAMSFPPROJECT               VARCHAR2(10 CHAR) 
IMAMSFPCLNID                 VARCHAR2(15 CHAR) 
IMAMSFPDIVID                 VARCHAR2(10 CHAR) 
IMAMSFPTSPID                 VARCHAR2(25 CHAR) 
IMAMSFPPROVIDEDDATE          DATE              
IMAMSFPB                     NUMBER(10)        လ အစတွင်ရှိသော လူနာဦးရေ===> TYPE MANUAL
IMAMSFPNEWCASEC              NUMBER(10)        လူနာ အသစ်===> TYPE MANUAL
IMAMSFPD                     NUMBER(10)        နောက်ထပ် အာဟာရ ပြန်ချို့တဲ့ သော လူနာ===> TYPE MANUAL
IMAMSFPE                     NUMBER(10)        ပျက်ကွက်ရာမှ စာရင်း ပြန်သွင်းသော လူနာ===> TYPE MANUAL
IMAMSFPF                     NUMBER(10)        အခြားSFP မှ လွှဲပို့လာသူ===> TYPE MANUAL
IMAMSFPG                     NUMBER(10)        ကျန်းမာရေးဌာန စာရင်းသွင်း ဝင်ခွင့် ပြုသူ စုစုပေါင်း  (IMAMSFPNEWCASEC + IMAMSFPD + IMAMSFPE + IMAMSFPF)
IMAMSFPH                     NUMBER(10)        အစီအစဉ်မှ ထွက်ခွင့်ပြုသူ စုစုပေါင်း (IMAMSFPH1 + IMAMSFPH2 + IMAMSFPH3 + IMAMSFPH4  +IMAMSFPH5)
IMAMSFPH1                    NUMBER(10)        ကုသပျောက်ကင်းသောသူ===> TYPE MANUAL
IMAMSFPH2                    NUMBER(10)        အာဟာရချို့တဲ့ခြင်းနှင့် ဆက်နွယ်၍ သေဆုံးသူ===> TYPE MANUAL
IMAMSFPH3                    NUMBER(10)        အခြားအကြောင်းကြောင့် သေဆုံးသူ===> TYPE MANUAL
IMAMSFPH4                    NUMBER(10)        ကုသရန် ပျက်ကွက်သူ===> TYPE MANUAL
IMAMSFPH5                    NUMBER(10)        ကုသ၍ မပျောက်ကင်းသူ===> TYPE MANUAL
IMAMSFPI                     NUMBER(10)        အခြားSFP/OTP/ITP သို့ လွှဲပို့စေလွှတ်သူ ===> TYPE MANUAL
IMAMSFPJ                     NUMBER(10)        ကျန်းမာရေးဌာန စာရင်းမှ နုတ်ပါယ်သူ စုစုပေါင်း(IMAMSFPH1 + IMAMSFPH2 + IMAMSFPH3 + IMAMSFPH4  +IMAMSFPH5 + IMAMSFPI)
IMAMSFPK                     NUMBER(10)        လကုန် တွင် ရှိသော လူနာ  (IMAMSFPB + IMAMSFPG ) - IMAMSFPJ
IMAMSFPAVGRATE               NUMBER(10)        
IMAMSFPAVGTRMT               NUMBER(10)        
IMAMSFPUSRLOGIN              VARCHAR2(25 CHAR) 
IMAMSFPINSERT                TIMESTAMP(6)      
IMAMSFPUPDATE                TIMESTAMP(6)      
IMAMSFPSTATUS                NUMBER(10)        
IMAMSFPSYNC                  NUMBER(10)       
*/