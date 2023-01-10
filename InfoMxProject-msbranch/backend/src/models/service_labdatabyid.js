//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

//////////////Get Service Data and Lab Data by ID(edit btn click)////////////////


///////////////////////Service Data///////////////////////// 
exports.getServiceData = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getServiceData parameter in database ===> " + a)

        sql = await `select * from tbl_rh where rhStatus < 3 and rhOrg='${a.orgID}'  and id='${a.RHID}' and rhRegId='${a.regID}'`

        console.log('getServiceData in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getServiceData result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

///////////////////////Lab Data///////////////////////// 
exports.getLabData = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getLabData parameter in database ===> " + a)

      sql = await  `select *  from tbl_lab where labStatus < 3 and labOrg='${a.orgID}'  and id='${a.RHID}' and labSSource='${a.sn}'`
        console.log('getLabData in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getLabData result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

///////////////////////Patient Data/////////////////////////
exports.getPatient = async (a) => {
  try {
      let sql = await '';
      const connection = await oracledb.getConnection(db);
      console.log('db connected: ', connection);
      console.log("Patient Data parameter in database ===> " + a.RHID)

    sql = await  `select * from tbl_reg where regid='${a.RHID}'`
      console.log('Patient Data in sql =====> ' + sql)
      const result = await connection.execute(sql, [], {
          outFormat: oracledb.OBJECT
      });
      console.log('Patient Data result: ', result.rows);
      await connection.close();
      return result.rows;
  } catch (error) {
      throw (error);
  }
}

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