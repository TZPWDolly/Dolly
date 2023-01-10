//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

////////////Edit Show Table
exports.getAllRHPatient = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("editShowTable(RH) parameter in database ===> " + a.orgID)

           //Local
        sql = await `select a.id, a.rhregid as regid ,a.rhProvidedDate as ProvidedDate,b.regName,
        (CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
        THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.rhType WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from tbl_rh a join tbl_reg  b on a.rhregid=b.regid  join C##APIUSER.tbl_village  
        c on a.rhvillage=c.village_code join C##APIUSER.tbl_CLINIC  d on a.rhclnId=d.cln_id join C##APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
        where rownum<=50 and a.rhStatus < 3 and a.rhOrg ='${a.orgID}'  order by a.rhProvidedDate DESC`   
      
          /*  //Server
        sql = await `select a.id, a.rhregid as regid ,a.rhProvidedDate as ProvidedDate,b.regName,
        (CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
        THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.rhType WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from tbl_rh a join tbl_reg  b on a.rhregid=b.regid  join APIUSER.tbl_village  
        c on a.rhvillage=c.village_code join APIUSER.tbl_CLINIC  d on a.rhclnId=d.cln_id join APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
        where rownum<=50 and a.rhStatus < 3 and a.rhOrg ='${a.orgID}'  order by a.rhProvidedDate DESC`    
       */
        console.log('editShowTable(RH) in sql =====> ' + sql)
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
        console.log("getPatientByID parameter in database ===> " + a.regID)

          //Local
          sql = await `select a.id, a.rhregid as regid ,a.rhProvidedDate as ProvidedDate,b.regName,
        (CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
        THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.rhType WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from tbl_rh a join tbl_reg  b on a.rhregid=b.regid  join C##APIUSER.tbl_village  
        c on a.rhvillage=c.village_code join C##APIUSER.tbl_CLINIC  d on a.rhclnId=d.cln_id join C##APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
        where rownum<=50 and a.rhStatus < 3 and a.rhOrg ='${a.orgID}' and a.rhregId='${a.regID}' order by a.rhProvidedDate DESC`   
      
         /*    //Server
        sql = await `select a.id, a.rhregid as regid ,a.rhProvidedDate as ProvidedDate,b.regName,
        (CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
        THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.rhType WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from tbl_rh a join tbl_reg  b on a.rhregid=b.regid  join APIUSER.tbl_village  
        c on a.rhvillage=c.village_code join APIUSER.tbl_CLINIC  d on a.rhclnId=d.cln_id join APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
        where rownum<=50 and a.rhStatus < 3 and a.rhOrg ='${a.orgID}' and a.rhregId='${a.regID}' order by a.rhProvidedDate DESC`  
       */
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
    console.log("getPatientForSearch(RH) parameter in database ===> " + a.orgID)

    //Local
    sql = await `select rhregid  from tbl_rh  where rhStatus < 3 and rhOrg ='${a.orgID}'  order by rhProvidedDate DESC` 

    console.log('getPatientForSearch(RH) in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
        outFormat: oracledb.OBJECT
    });
    console.log('getPatientForSearch(RH) result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
      throw (error);
  }
}

/* 
`select a.id, a.rhregid as regid ,a.rhProvidedDate as ProvidedDate,b.regName,
        (CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/365,0) WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 
        THEN TRUNC(((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit))/30,0) ELSE TRUNC((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit),0) END) Age,(CASE WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=365 THEN 'Year' WHEN ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) <365 AND ((a.rhprovideddate-b.regDate) + (b.regAge * b.regAgeUnit)) >=30 THEN 'Month' ELSE 'Day'  END) AgeUnit, (case when b.regSex=1 then 'Male' else 'Female 'end) as Sex,(CASE a.rhType WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END) as VisityType, d.cln_Name,e.tsp_Name  from tbl_rh a join tbl_reg  b on a.rhregid=b.regid  join C##APIUSER.tbl_village  
        c on a.rhvillage=c.village_code join C##APIUSER.tbl_CLINIC  d on a.rhclnId=d.cln_id join C##APIUSER.tbl_TOWNSHIP  e on d.cln_tsp=e.tsp_id 
        where rownum<=50 and a.rhStatus < 3 and a.rhOrg ='${a.orgID}' and a.rhregId='${a.regID}' and a.rhprovidedDate=To_Date('','YYYY-MM-DD') order by a.rhProvidedDate DESC` */

/* if(a.tblName=='tbl_anc'){
    sn='an';
  }else if(a.tblName=='tbl_delivery'){
    sn='deli';
  }else if(a.tblName=='tbl_pnc'){
    sn='pn';
  }else if(a.tblName=='tbl_gm'){
    sn='gm';
  }else if(a.tblName=='tbl_fp'){
    sn='fp';
  }else if(a.tblName=='tbl_rh'){
    sn='rh';
  }else if(a.tblName=='tbl_ipd'){
    sn='ipd';
  }else if(a.tblName=='tbl_imci1'){
    sn='c1';
  }else if(a.tblName=='tbl_imci2'){
    sn='c2';
  }else if(a.tblName=='tbl_muac'){
    sn='muac';
  } */






