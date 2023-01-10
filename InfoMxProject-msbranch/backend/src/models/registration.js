//Module
const oracledb = require('oracledb');

//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');


//....................//Insert Patient Registration//....................//
exports.insertReg = merr(async (b) => {

  let a = await JSON.parse(b)
  console.log("a from models ", a)
  const connection = await oracledb.getConnection(db);
  const sql = `INSERT INTO TBL_REG VALUES (:REGID,:REGNAME,:REGDATE,:REGORG,:REGPLACE,:REGVILLAGE,:REGAGE,:REGAGEUNIT,:REGSEX,:REGTYPE,:REGEDU,:REGJOB,:REGMARITAL,:REGSPOUSE,:REGMOTHER,:REGFATHER,:REGADDRESS,:REGPH,:REGETHNIC,:REGREFFROM,:REGREMARK,:REGUSRLOGIN,:REGINSERT,:REGUPDATE,:REGSTATUS,:REGSYNC)`;

  const data = [{ regId: a.REGID, regName: a.REGNAME, regDate: new Date(a.REGDATE), regOrg: a.REGORG, regPlace: Number(a.REGPLACE), regVillage: a.REGVILLAGE, regAge: Number(a.REGAGE), regAgeUnit: Number(a.REGAGEUNIT), regSex: Number(a.REGSEX), regType: Number(a.REGTYPE), regEdu: Number(a.REGEDU), regJob: a.REGJOB || null, regMarital: Number(a.REGMARITAL), regSpouse: a.REGSPOUSE || null, regMother: a.REGMOTHER, regFather: a.REGFATHER, regAddress: a.REGADDRESS, regPh: a.REGPH || null, regEthnic: a.REGETHNIC, regReffrom: a.REGREFFROM, regRemark: a.REGREMARK, regUsrLogin: a.REGUSRLOGIN, regInsert: new Date(), regUpdate: new Date(), regStatus: 1, regSync: 0 }];
  console.log("bind data ===== ", data);

  const options = {
    autoCommit: true,
    bindDefs: {
      "regId": { type: oracledb.STRING, maxSize: 20 },
      "regName": { type: oracledb.STRING, maxSize: 20 },
      "regDate": { type: oracledb.DATE },
      "regOrg": { type: oracledb.STRING, maxSize: 10 },
      "regPlace": { type: oracledb.NUMBER },
      "regVillage": { type: oracledb.STRING, maxSize: 20 },
      "regAge": { type: oracledb.NUMBER },
      "regAgeUnit": { type: oracledb.NUMBER },
      "regSex": { type: oracledb.NUMBER },
      "regType": { type: oracledb.NUMBER },
      "regEdu": { type: oracledb.NUMBER },
      "regJob": { type: oracledb.STRING, maxSize: 30 },
      "regMarital": { type: oracledb.NUMBER },
      "regSpouse": { type: oracledb.STRING, maxSize: 30 },
      "regMother": { type: oracledb.STRING, maxSize: 30 },
      "regFather": { type: oracledb.STRING, maxSize: 30 },
      "regAddress": { type: oracledb.STRING, maxSize: 100 },
      "regPh": { type: oracledb.STRING, maxSize: 30 },
      "regEthnic": { type: oracledb.STRING, maxSize: 100 },
      "regReffrom": { type: oracledb.STRING, maxSize: 1000 },
      "regRemark": { type: oracledb.STRING, maxSize: 255 },
      "regUsrLogin": { type: oracledb.STRING, maxSize: 100 },
      "regInsert": { type: oracledb.DATE },
      "regUpdate": { type: oracledb.DATE },
      "regStatus": { type: oracledb.NUMBER },
      "regSync": { type: oracledb.NUMBER },
    }
  };
  const result = await connection.executeMany(sql, data, options);
  console.log('insert reg model result: ', result);
  await connection.close();
  return result;
});


//....................//Update Patient Registration//....................//
exports.updateReg = merr(async (a) => {
  console.log("a from models reg => ", a)
  const connection = await oracledb.getConnection(db);
  const sql = "UPDATE TBL_REG SET REGNAME=:regName, REGDATE=:regDate, REGORG=:regOrg, REGPLACE=:regPlace, REGVILLAGE=:regVillage, REGAGE=:regAge, REGAGEUNIT=:regAgeUnit, REGSEX=:regSex, REGTYPE=:regType, REGEDU=:regEdu, REGJOB=:regJob, REGMARITAL=:regMarital, REGSPOUSE=:regSpouse, REGMOTHER=:regMother, REGFATHER=:regFather, REGADDRESS=:regAddress, REGPH=:regPh, REGETHNIC=:regEthnic, REGREFFROM=:regReffrom, REGREMARK=:regRemark, REGUSRLOGIN=:regUsrLogin, REGUPDATE=:regUpdate, REGSTATUS=:regStatus  WHERE REGID=:regid ";
  const binds = { regName: a.REGNAME, regDate: new Date(a.REGDATE), regOrg: a.REGORG, regPlace: a.REGPLACE, regVillage: a.REGVILLAGE,
     regAge: a.REGAGE, regAgeUnit: a.REGAGEUNIT, regSex: a.REGSEX, regType: a.REGTYPE, regEdu: a.REGEDU,
      regJob: a.REGJOB || null, regMarital: a.REGMARITAL, regSpouse: a.REGSPOUSE || null, regMother: a.REGMOTHER,
       regFather: a.REGFATHER, regAddress: a.REGADDRESS, regPh: a.REGPH || null, regEthnic: a.REGETHNIC, regReffrom: a.REGREFFROM,
        regRemark: a.REGREMARK, regUsrLogin: a.REGUSRLOGIN, regUpdate: new Date(), regStatus: 2, regid: a.REGID };

  const result = await connection.execute(sql, binds, { autoCommit: true });
  console.log('update reg model result: ', result);
  await connection.close();
  return result;
});