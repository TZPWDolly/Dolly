
//Module
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
//Models
const {apidb, db, connectdb} = require('../models/database');
const merr = require('../controllers/merr');
//Controller
const fnErr = require('../controllers/fnErr');


//....................USER LOGIN....................//
exports.userLogin = async(userName) =>{
        //console.log('modle user parameter: ', connectdb(userName));
        //const result = await connectdb(userName);
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
         const sql = await `select * from TBL_USER where user_name=:username`;
        const result = await connection.execute(sql,[userName],{
          outFormat: oracledb.OBJECT
        });
        console.log('login models result: ', result.rows);
        console.log('login query : ',sql)
        await connection.close(); 
        return result.rows;
};


//....................GET USER ORG....................//
exports.getUserOrg = async(orgid) =>{
  //console.log('modle user parameter: ', connectdb(userName));
  //const result = await connectdb(userName);
  const connection = await oracledb.getConnection(apidb);
  console.log('db connected: ', connection);
   const sql = await `select * from TBL_ORG where org_id=:orgId`;
  const result = await connection.execute(sql,[orgid],{
    outFormat: oracledb.OBJECT
  });
  console.log('get user org models result: ', result.rows);
  await connection.close(); 
  return result.rows;
};

//....................USER UPDATE PASSWORD....................//
/* exports.userResetPassword = async(a) =>{
  const connection = await oracledb.getConnection(apidb);
  console.log('db connected: ', connection);
   const sql = await `UPDATE TBL_USER SET USER_PASSWORD=:up WHERE  USER_NAME=:ulg and USER_ID=:usrId`;
  const result = await connection.execute(sql,[a],{
    outFormat: oracledb.OBJECT
  });
  console.log('login models result: ', result);
  await connection.close(); 
  return result;
}; */
const date = require('date-and-time')
exports.userResetPassword = merr(async (a) => {

  const rhDate = new Date()
  const rhTime = date.format(rhDate, 'YYYY/MM/DD HH:mm:ss');

  console.log("a from resetpw => ", a)
  const connection = await oracledb.getConnection(apidb);
  console.log('db connected: ', connection);
  const sql = await `UPDATE TBL_USER SET USER_PASSWORD='${a.up}',USER_EXPIRED=TO_DATE('${rhTime}','YYYY-MM-DD HH24:MI:SS')+30 WHERE  USER_NAME='${a.ulg}' and USER_ID=${a.usrId}`;

  console.log("userResetPassword QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('userResetPassword status model result: ', result);
  await connection.close();
  return result;
});



