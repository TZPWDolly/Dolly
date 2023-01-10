//Module
const oracledb = require('oracledb');
const moment = require('moment');

//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert LAB information//....................//
exports.insertLab = merr(async (data) => {
  let val = [];
  let idata = [];
  Object.keys(data).forEach((o) => {
    if(data[o]){
      val.push(o);
      if(!isNaN(data[o])){
          idata.push(data[o])
      } else if(moment(data[o], moment.ISO_8601, true).isValid()) {
          idata.push(`TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`);
      } else {
          idata.push(`'${data[o]}'`)
      }
    }
     
  });
  const connection = await oracledb.getConnection(db);
  const sql = await `INSERT INTO TBL_LAB (${val.join(', ')}) VALUES (${idata.join(', ')})`;
  console.log("SQL from LABINFO =>",sql)
  const result = await connection.execute(sql, [],{autoCommit: true});
  await connection.close();
  return result;
})
/* exports.insertLab = merr(async (b) => {

  let a = await JSON.parse(b)
  console.log("a from models ", a)
  const connection = await oracledb.getConnection(db);
  const sql = `INSERT INTO TBL_LAB VALUES (:LABREGID, :LABPROVIDEDDATE, :LABPLACE, :LABVILLAGE, :LABRDT, :LABMICROSCOPIC,:LABHB, :LABBG, :LABRH, :LABUCG, :LABUSUGAR, :LABUPROTEIN,:LABGONO, :LABTRICHO, :LABCANDIDA,:LABRPR, :LABTPHA,:LABVDRL,:LABHIV, :LABHBV, :LABHCV, :LABSSOURCE,:LABOTHER,:LABRBS, :LABORG, :LABINSERT, :LABUPDATE, :LABSTATUS, :LABSYNC, :ID, :LABTEST)`; 

  const data = [ {labRegId:a.LABREGID,labProvidedDate:new Date(a.LABPROVIDEDDATE),labPlace:Number(a.LABPLACE),labVillage:a.LABVILLAGE,labRDT:Number(a.LABRDT),labMicroscopic:Number(a.LABMICROSCOPIC),labHb:Number(a.LABHB),
    labBG:Number(a.LABBG),labRh:Number(a.LABRH),labUCG:Number(a.LABUCG),labUSugar:Number(a.LABUSUGAR),labUProtein:Number(a.LABUPROTEIN),labGono:Number(a.LABGONO),labTricho:Number(a.LABTRICHO),labCandida:Number(a.LABCANDIDA),labRPR:Number(a.LABRPR),labTPHA:Number(a.LABTPHA),
    labVDRL:Number(a.LABVDRL),labHIV:Number(a.LABHIV),labHBV:Number(a.LABHBV),labHCV:Number(a.LABHCV),labSSource:a.LABSSOURCE,labOther:a.LABOTHER,labRBS:Number(a.LABRBS) || 99.99,labOrg:a.LABORG,labInsert:new Date(),labUpdate:new Date(),labStatus:1,labSync:0,id:a.ID,labTest:Number(a.LABTEST)} ];
     

  console.log("bind data ===== ", data);

  const options = {
    autoCommit: true,
    bindDefs: {
        "labRegId": { type: oracledb.STRING,maxSize: 20 },
        "labProvidedDate": { type: oracledb.DATE },
        "labPlace": { type: oracledb.NUMBER },
        "labVillage": { type: oracledb.STRING,maxSize: 20 },
        "labRDT": { type: oracledb.NUMBER },
        "labMicroscopic": { type: oracledb.NUMBER },
        "labHb": { type: oracledb.NUMBER },
        "labBG": { type: oracledb.NUMBER },
        "labRh": { type: oracledb.NUMBER },
        "labUCG": { type: oracledb.NUMBER },
        "labUSugar": { type: oracledb.NUMBER },
        "labUProtein": { type: oracledb.NUMBER },
        "labGono": { type: oracledb.NUMBER },
        "labTricho": { type: oracledb.NUMBER },
        "labCandida": { type: oracledb.NUMBER },
        "labRPR": { type: oracledb.NUMBER },
        "labTPHA": { type: oracledb.NUMBER },
        "labVDRL": { type: oracledb.NUMBER },
        "labHIV": { type: oracledb.NUMBER },
        "labHBV": { type: oracledb.NUMBER },
        "labHCV": { type: oracledb.NUMBER },
        "labSSource": { type: oracledb.STRING,maxSize: 20 },
        "labOther": { type: oracledb.STRING,maxSize: 1000 },
        "labRBS": { type: oracledb.NUMBER },
        "labOrg": { type: oracledb.STRING,maxSize: 10 },
        "labInsert": { type: oracledb.DATE },
        "labUpdate": { type: oracledb.DATE },
        "labStatus": { type: oracledb.NUMBER },
        "labSync": { type: oracledb.NUMBER },
        "id": { type: oracledb.NUMBER },
        "labTest": { type: oracledb.NUMBER }   
    }
  };
  const result = await connection.executeMany(sql, data, options);
  console.log('insert Lab info model result: ', result);
  await connection.close();
  return result;
}); */


//....................//Update LAB information//....................//
exports.updateLab = merr(async (a) => {
  console.log("a from models reg => ", a)
  const connection = await oracledb.getConnection(db);
  const sql = "UPDATE TBL_LAB SET LABPROVIDEDDATE=:labProvidedDate,LABPLACE=:labPlace,LABVILLAGE=:labVillage,LABRDT=:labRDT,LABMICROSCOPIC=:labMicroscopic,LABHB=:labHb,LABBG=:labBG,LABRH=:labRh,LABUCG=:labUCG,LABUSUGAR=:labUSugar,LABUPROTEIN=:labUProtein,LABGONO=:labGono,LABTRICHO=:labTricho,LABCANDIDA=:labCandida,LABRPR=:labRPR,LABTPHA=:labTPHA,LABVDRL=:labVDRL,LABHIV=:labHIV,LABHBV=:labHBV,LABHCV=:labHCV,LABOTHER=:labOther,LABRBS=:labRBS,LABUPDATE=:labUpdate,LABSTATUS=:labStatus,LABTEST=:labTest WHERE LABORG=:ogId and LABREGID=:rId and ID=:id  AND LABSSOURCE=:lbs";
  const binds = {labProvidedDate:new Date(a.LABPROVIDEDDATE),labPlace:a.LABPLACE,
    labVillage:a.LABVILLAGE,labRDT:a.LABRDT,labMicroscopic:a.LABMICROSCOPIC,labHb:a.LABHB,
    labBG:a.LABBG,labRh:a.LABRH,labUCG:a.LABUCG,labUSugar:a.LABUSUGAR,labUProtein:a.LABUPROTEIN,
    labGono:a.LABGONO,labTricho:Number(a.LABTRICHO),labCandida:a.LABCANDIDA,labRPR:a.LABRPR,labTPHA:a.LABTPHA,
    labVDRL:a.LABVDRL,labHIV:a.LABHIV,labHBV:a.LABHBV,labHCV:a.LABHCV,labOther:a.LABOTHER,
    labRBS:a.LABRBS,labUpdate:new Date(),labStatus:2,labTest:a.LABTEST,ogId:a.LABORG,rId:a.LABREGID,id:a.ID,lbs:a.LABSSOURCE} ; 


  const result = await connection.execute(sql, binds, { autoCommit: true });
  console.log('update lab model result: ', result);
  await connection.close();
  return result;
});

//....................//Delete lAB information//....................//

  const date = require('date-and-time')
  exports.deleteLab = merr(async (a) => {
    console.log("a from models reg => ", a)
    const labDate = new Date()
    const labTime = date.format(labDate,'YYYY/MM/DD HH:mm:ss');
    const connection = await oracledb.getConnection(db);
    let sql = await '';
    if(a.gmgmtype==='3')
    {
      sql = await `UPDATE TBL_LAB SET  LABSTATUS=3 , labUpdate=TO_DATE('${labTime}','YYYY-MM-DD HH24:MI:SS') WHERE LABORG='${a.LABORG}' 
      and LABSSOURCE='medopd' and ID=${a.ID}`;     
    }
    else if(a.gmgmtype==='2')
    {
      sql = await `UPDATE TBL_LAB SET  LABSTATUS=3 , labUpdate=TO_DATE('${labTime}','YYYY-MM-DD HH24:MI:SS') WHERE LABORG='${a.LABORG}' 
      and LABSSOURCE='surgopd' and ID=${a.ID}`;     
    }
    else 
    {
      sql = await `UPDATE TBL_LAB SET  LABSTATUS=3 , labUpdate=TO_DATE('${labTime}','YYYY-MM-DD HH24:MI:SS') WHERE LABORG='${a.LABORG}' 
      and LABSSOURCE='${a.LABSSOURCE}' and ID=${a.ID}`;     
    }
     
    //const labbinds= await {  laborg:a.LABORG, labssource:a.LABSSOURCE, id:a.ID};
    console.log("LAB DELETE QUERY => ",sql)
    const result = await connection.execute(sql, [], { autoCommit: true });
    console.log('UPDATE Delete status model result: ', result);
    await connection.close();
    return result;
  });