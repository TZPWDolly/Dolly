//Module
const oracledb = require('oracledb');
const moment = require('moment');
//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert IMAM information//....................//
exports.insertIMAM = merr(async (data) => {
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
  const sql = await `INSERT INTO TBL_IMAM (${val.join(', ')}) VALUES (${idata.join(', ')})`;
  console.log("SQL from IMAMINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
})

//....................//Update IMAM information//....................//
exports.updateIMAM = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'ID' || o === 'IMAMPROJECT' || o === 'IMAMORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } else if (moment(data[o], moment.ISO_8601, true).isValid() && o!='IMAMPROVIDEDDATE') {
        
        if (o === 'ID' || o === 'IMAMPROJECT' || o === 'IMAMORG') {
          wData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
        }
        else { qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`) }

      }
      else if(moment(data[o], moment.ISO_8601, true).isValid() && o==='IMAMPROVIDEDDATE')
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD')`)
      }
      else {
        
        if (o === 'ID' || o === 'IMAMPROJECT' || o === 'IMAMORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_IMAM SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from IMAMINSERT=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});


//....................//Delete IMAM information//....................//
const date = require('date-and-time')
exports.deleteIMAM = merr(async (a) => {
  console.log("a from models reg => ", a)
  const imamDate = new Date()
  const imamTime = date.format(imamDate, 'YYYY/MM/DD HH:mm:ss');
  console.log('IMAM Date ============> ', imamDate)
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_IMAM SET IMAMUSRLOGIN='${a.IMAMUSRLOGIN}', IMAMUPDATE=TO_DATE('${imamTime}','YYYY-MM-DD HH24:MI:SS'), 
    IMAMSTATUS=3 WHERE IMAMORG='${a.ORGID}'  and ID=${a.ID} `;

  console.log("IMAM DELETE QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('UPDATE Delete status model result: ', result);
  await connection.close();
  return result;
});




/*

Name             Null?    Type              
---------------- -------- ----------------- 
ID               NOT NULL NUMBER(10)   --- AUTO GENERATE     
IMAMDONOR                 VARCHAR2(10 CHAR) 
IMAMORG                   VARCHAR2(10 CHAR) 
IMAMPROJECT               VARCHAR2(10 CHAR) 
IMAMCLNID                 VARCHAR2(15 CHAR) 
IMAMDIVID                 VARCHAR2(10 CHAR) 
IMAMTSPID                 VARCHAR2(25 CHAR) 
IMAMPROVIDEDDATE          DATE              
IMAMB                     NUMBER(10)       လ အစတွင်ရှိသော လူနာဦးရေ   ===> TYPE MANUAL
IMAMNEWCASE               NUMBER(10)        လူနာ အသစ် ( IMAMC1+IMAMC2)
IMAMC1                    NUMBER(10)       WFH < -3 Z/ MUAC < 115 mm ===> TYPE MANUAL
IMAMC2                    NUMBER(10)        Oedema +/++  ===> TYPE MANUAL
IMAMD                     NUMBER(10)        နောက်ထပ် အာဟာရ ပြန်ချို့တဲ့ သော လူနာ   ===> TYPE MANUAL
IMAME                     NUMBER(10)        ပျက်ကွက်ရာမှ စာရင်း ပြန်သွင်းသော လူနာ ===> TYPE MANUAL
IMAMF                     NUMBER(10)        SFP/အခြားOTP/ITP မှ လွှဲပို့လာသူ ===> TYPE MANUAL
IMAMG                     NUMBER(10)        ကျန်းမာရေးဌာန စာရင်းသွင်း ဝင်ခွင့် ပြုသူ စုစုပေါင်း ( IMAMC1+ IMAMC2 + IMAMD + IMAME + IMAMF)
IMAMH                     NUMBER(10)        အစီအစဉ်မှ ထွက်ခွင့်ပြုသူ စုစုပေါင်း (IMAMH1 + IMAMH2 + IMAMH3 + IMAMH4 + IMAMH5)
IMAMH1                    NUMBER(10)        ကုသပျောက်ကင်းသောသူ ===> TYPE MANUAL
IMAMH2                    NUMBER(10)        အာဟာရချို့တဲ့ခြင်းနှင့် ဆက်နွယ်၍ သေဆုံးသူ  ===> TYPE MANUAL
IMAMH3                    NUMBER(10)        အခြားအကြောင်းကြောင့် သေဆုံးသူ ===> TYPE MANUAL
IMAMH4                    NUMBER(10)        ကုသရန် ပျက်ကွက်သူ===> TYPE MANUAL
IMAMH5                    NUMBER(10)        ကုသ၍ မပျောက်ကင်းသူ===> TYPE MANUAL
IMAMI                     NUMBER(10)        အခြားOTP/ ITP သို့ လွှဲပို့စေလွှတ်သူ===> TYPE MANUAL
IMAMJ                     NUMBER(10)        ကျန်းမာရေးဌာန စာရင်းမှ နုတ်ပါယ်သူ စုစုပေါင်း ( IMAMH1 + IMAMH2 + IMAMH3 + IMAMH4 + IMAMH5 + IMAMI)
IMAMK                     NUMBER(10)        လကုန် တွင် ရှိသော လူနာ ( IMAMB + IMAMG ) - IMAMJ
IMAMAVGRATE               NUMBER(10)        ကုသပျောက်ကင်းသွားသည့် ကလေးများ အတွက် ပျှမ်းမျှ ကိုယ်အလေး ချိန် တိုးတက်မှုနှုန်း (g/kg/d) (၆ - ၅၉ လနှင့် ဖောရောင်ခြင်းမရှိသူများသာ) ===> TYPE MANUAL
IMAMAVGTRMT               NUMBER(10)        ကုသပျောက်ကင်းသွားသော ကလေးများ၏ ပျှမ်းမျှကုသချိန် (၆ -၅၉ လ ကလေးများသာ)===> TYPE MANUAL
IMAMUSRLOGIN              VARCHAR2(25 CHAR) 
IMAMINSERT                TIMESTAMP(6)      
IMAMUPDATE                TIMESTAMP(6)      
IMAMSTATUS                NUMBER(10)        
IMAMSYNC                  NUMBER(10)       
*/