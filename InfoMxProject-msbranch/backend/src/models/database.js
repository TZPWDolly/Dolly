/* 
const {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = process.env;



const mysqlm = require('mysqlm');

module.exports = mysqlm.connect({
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
}) */

require('dotenv').config();
const oracledb = require('oracledb');
/* ////InfoMx Database

   exports.db = {
    user : 'C##CPIUSER1',
    password : 'Adm!nDB@2023',
    connectString : '183.88.216.109:1521/ORCLCDB'
   };
////Common Database
exports.apidb = {
    user : 'C##APIUSER',
    password : 'Adm!nDB@2023',
    connectString : '183.88.216.109:1521/ORCLCDB'
   };    */


/*    ////InfoMx Database Connection OCI
   exports.db = {
    user : 'INFOMXDB',
    password : 'Adm!nDB@2022',
    connectString : '10.0.1.2:1521/db0721_pdb1.sub07211140541.cpintlvcn.oraclevcn.com'
   };
////Common Database
exports.apidb = {
    user : 'APIUSER',
    password : 'Adm!nDB@2022',
    connectString : '10.0.1.2:1521/db0721_pdb1.sub07211140541.cpintlvcn.oraclevcn.com'
   };    */

  /*  ////InfoMx Local Database
  exports.db = {
  user : 'C##INFOMXDB',
  password : 'Adm!nDB@2022',
  connectString : 'localhost:1521/ORCL'
 };
 ////Common Database
 exports.apidb = {
  user : 'C##APIUSER',
  password : 'Adm!nDB@2022',
   connectString : 'localhost:1521/ORCL'
 };    */

   ////MS Branch DB
 exports.db = {
  user : 'C##INFOMXDB',
  password : 'Adm!nDB@2022',
  connectString : '192.168.1.202:1521/ORCLCDB'
 };
 ////Common Database
 exports.apidb = {
  user : 'C##APIUSER',
  password : 'Adm!nDB@2022',
   connectString : '192.168.1.202:1521/ORCLCDB'
 };  
    
/* exports.connectdb = async(userName) => {
  const connection = await oracledb.getConnection(apidb);
  const sql = await "select * from TBL_USER where user_name=:username"; // from core-api (user table) if will be application URL correct   
        const result = await connection.execute(sql,[userName],{
          outFormat: oracledb.OBJECT
        });
        console.log('connect result: ', result);
        //await connection.close();
        return result;
} */




/* oracledb.getConnection( apidb ,
    function(err, connection) {
      console.log('Starting to establish a connection apidb. . . . . ');
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('Connection was successful apidb!');
  
      connection.close(
        function(err) {
          if (err) {
            console.error(err.message);
            return;
          }
        });
    });

    oracledb.getConnection( db ,
      function(err, connection) {
        console.log('Starting to establish a connection db. . . . . ');
        if (err) {
          console.error(err.message);
          return;
        }
        console.log('Connection was successful db!');
    
        connection.close(
          function(err) {
            if (err) {
              console.error(err.message);
              return;
            }
          });
      }); */

//module.exports ={db, apidb, connectdb}

