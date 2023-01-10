//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

////////////Edit Show Table
exports.getAllServicePatient = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("editShowTable parameter in database ===> " + a)
        if ((a.gmgmtype === '3' || a.gmgmtype === '2') && (a.orgID === 'CPI-16')) {
               //Local
             sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
  (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
  THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join C##APIUSER.tbl_village  
  c on a.${a.serviceName}village=c.village_code join C##APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join C##APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
  where rownum<=50 and a.${a.serviceName}Status < 3 and a.gmgmtype=${a.gmgmtype} and a.${a.serviceName}Org ='${a.orgID}'  order by a.${a.serviceName}ProvidedDate DESC`
     
           /*    //Server
            sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
             (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
             THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join APIUSER.tbl_village  
             c on a.${a.serviceName}village=c.village_code join APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
             where rownum<=50 and a.${a.serviceName}Status < 3 and a.gmgmtype=${a.gmgmtype} and  a.${a.serviceName}Org ='${a.orgID}'  order by a.${a.serviceName}ProvidedDate DESC`
    */
        }
        else {
            {
                   //Local
                 sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
      (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
      THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join C##APIUSER.tbl_village  
      c on a.${a.serviceName}village=c.village_code join C##APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join C##APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
      where rownum<=50 and a.${a.serviceName}Status < 3 and a.${a.serviceName}Org ='${a.orgID}'  order by a.${a.serviceName}ProvidedDate DESC`
     
                /*   //Server
                sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
                 (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
                 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join APIUSER.tbl_village  
                 c on a.${a.serviceName}village=c.village_code join APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
                 where rownum<=50 and a.${a.serviceName}Status < 3 and  a.${a.serviceName}Org ='${a.orgID}'  order by a.${a.serviceName}ProvidedDate DESC`
   */
            }
        }

        console.log('editShowTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('editShow result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

////////Search by id (name မပါ)
exports.getPatientByID = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getPatientByID parameter in database ===> " + a)
        if ((a.gmgmtype === '3' || a.gmgmtype === '2') && (a.orgID === 'CPI-16')) {
                 //Local
             sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
             (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
             THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join C##APIUSER.tbl_village  
             c on a.${a.serviceName}village=c.village_code join C##APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join C##APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
             where rownum<=50 and a.${a.serviceName}Status < 3 and a.gmgmtype=${a.gmgmtype} and a.${a.serviceName}Org ='${a.orgID}' and a.${a.serviceName}regId='${a.regID}' order by a.${a.serviceName}ProvidedDate DESC`
         
           /*  //Server
            sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
         (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
         THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join APIUSER.tbl_village  
         c on a.${a.serviceName}village=c.village_code join APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
         where rownum<=50 and a.${a.serviceName}Status < 3 and a.gmgmtype=${a.gmgmtype} and a.${a.serviceName}Org ='${a.orgID}' and a.${a.serviceName}regId='${a.regID}' order by a.${a.serviceName}ProvidedDate DESC`
    */
        }
        else {
             //Local
            sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
            (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
            THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join C##APIUSER.tbl_village  
            c on a.${a.serviceName}village=c.village_code join C##APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join C##APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
            where rownum<=50 and a.${a.serviceName}Status < 3 and a.${a.serviceName}Org ='${a.orgID}' and a.${a.serviceName}regId='${a.regID}' order by a.${a.serviceName}ProvidedDate DESC`
          
           /*     //Server
            sql = await `select a.id, a.${a.serviceName}regid as regid ,a.${a.serviceName}ProvidedDate as ProvidedDate,b.regName,
 (CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
 THEN TRUNC(((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.${a.serviceName}provideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.${a.serviceName}Type WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from ${a.tblName} a join tbl_reg  b on a.${a.serviceName}regid=b.regid  join APIUSER.tbl_village  
 c on a.${a.serviceName}village=c.village_code join APIUSER.tbl_CLINIC  d on a.${a.serviceName}clnId=d.cln_id join APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
 where rownum<=50 and a.${a.serviceName}Status < 3 and a.${a.serviceName}Org ='${a.orgID}' and a.${a.serviceName}regId='${a.regID}' order by a.${a.serviceName}ProvidedDate DESC`
    */
        }

        console.log('getPatientByID in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getPatientByID result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getPatientForSearch = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getPatientForSearch parameter in database ===> " + a)

        //Local
        sql = await `select ${a.serviceName}regid  from ${a.tblName}  where ${a.serviceName}Status < 3 and ${a.serviceName}Org ='${a.orgID}'  order by ${a.serviceName}ProvidedDate DESC`

        console.log('getPatientForSearch in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getPatientForSearch result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}







