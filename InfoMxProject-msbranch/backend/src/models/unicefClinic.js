//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getUnicefClinic = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("getUnicefClinic parameter in database ===> " + a.orgID, a.projID)
        if (a.orgID == 'CPI-06') {
            sql = `select tbl_CLINIC.CLN_ID,tbl_CLINIC.CLN_NAME ,tbl_TOWNSHIP.tsp_Name,tbl_DIVISION.div_Name,tbl_TOWNSHIP.tsp_Id,tbl_DIVISION.div_Id from tbl_CLINIC,tbl_TOWNSHIP ,tbl_DIVISION  where tbl_CLINIC.CLN_TSP=tbl_TOWNSHIP.TSP_ID and tbl_TOWNSHIP.DIV_ID=tbl_DIVISION.DIV_ID and tbl_CLINIC.CLN_ID in ('BMA-042','BMA-048','BMA-012','BMA-013')  order by tbl_CLINIC.CLN_NAME`
        }
        else if (a.orgID == 'CPI-08') {
            sql = `select tbl_CLINIC.CLN_ID,tbl_CLINIC.CLN_NAME ,tbl_TOWNSHIP.tsp_Name,tbl_DIVISION.div_Name, tbl_TOWNSHIP.tsp_Id,tbl_DIVISION.div_Id from tbl_CLINIC, tbl_TOWNSHIP ,tbl_DIVISION  where tbl_CLINIC.CLN_TSP=tbl_TOWNSHIP.TSP_ID and tbl_TOWNSHIP.DIV_ID=tbl_DIVISION.DIV_ID and tbl_CLINIC.CLN_ID in ('MNHC-001','MNHC-002','MNHC-005','MNHC-003','MNHC-004','MNHC-006','MNHC-007','MNHC-008','MNHC-011','MNHC-010','MNHC-012','MNHC-009','MNHC-013','MNHC-015','MNHC-014','MNHC-017','MNHC-016','MNHC-018','MNHC-027','MNHC-028')  order by tbl_CLINIC.CLN_NAME`
        }
        else if (a.orgID == 'CPI-15') {
            sql = `select tbl_CLINIC.CLN_ID,tbl_CLINIC.CLN_NAME ,tbl_TOWNSHIP.tsp_Name,tbl_DIVISION.div_Name, tbl_TOWNSHIP.tsp_Id,tbl_DIVISION.div_Id from tbl_CLINIC, tbl_TOWNSHIP , tbl_DIVISION  where tbl_CLINIC.CLN_TSP=tbl_TOWNSHIP.TSP_ID and tbl_TOWNSHIP.DIV_ID=tbl_DIVISION.DIV_ID and tbl_CLINIC.CLN_ID in ('KDHW-127','YSDA-215')  order by tbl_CLINIC.CLN_NAME`
        }
        else if (a.orgID == 'CPI-19') {
            sql = `select tbl_CLINIC.CLN_ID,tbl_CLINIC.CLN_NAME ,tbl_TOWNSHIP.tsp_Name,tbl_DIVISION.div_Name, tbl_TOWNSHIP.tsp_Id,tbl_DIVISION.div_Id from tbl_CLINIC, tbl_TOWNSHIP , tbl_DIVISION  where tbl_CLINIC.CLN_TSP=tbl_TOWNSHIP.TSP_ID and tbl_TOWNSHIP.DIV_ID=tbl_DIVISION.DIV_ID and tbl_CLINIC.CLN_ID in ('THC-031','THC-032','THC-033','THC-034','THC-035')  order by tbl_CLINIC.CLN_NAME`
        }
        else if (a.orgID == 'CPI-21') {
            sql = `select tbl_CLINIC.CLN_ID,tbl_CLINIC.CLN_NAME ,tbl_TOWNSHIP.tsp_Name,tbl_DIVISION.div_Name, tbl_TOWNSHIP.tsp_Id,tbl_DIVISION.div_Id from tbl_CLINIC, tbl_TOWNSHIP ,tbl_DIVISION  where tbl_CLINIC.CLN_TSP=tbl_TOWNSHIP.TSP_ID and tbl_TOWNSHIP.DIV_ID=tbl_DIVISION.DIV_ID and tbl_CLINIC.CLN_ID in ('KCHBP-009','KCHBP-008','KCHBP-010')  order by tbl_CLINIC.CLN_NAME`
        }
        else if (a.orgID == 'CPI-05') {
            sql = `select tbl_CLINIC.CLN_ID,tbl_CLINIC.CLN_NAME ,tbl_TOWNSHIP.tsp_Name,tbl_DIVISION.div_Name, tbl_TOWNSHIP.tsp_Id,tbl_DIVISION.div_Id from tbl_CLINIC, tbl_TOWNSHIP , tbl_DIVISION  where tbl_CLINIC.CLN_TSP=tbl_TOWNSHIP.TSP_ID and tbl_TOWNSHIP.DIV_ID=tbl_DIVISION.DIV_ID and tbl_CLINIC.CLN_ID in ('KDHW-003','KDHW-035','KDHW-028','KDHW-062','KDHW-019','KDHW-018','KDHW-005','KDHW-017','KDHW-126','KDHW-066')  order by tbl_CLINIC.CLN_NAME`
        }
        else if (a.orgID == 'CPI-56') {
            sql = `select tbl_CLINIC.CLN_ID,tbl_CLINIC.CLN_NAME , tbl_TOWNSHIP.tsp_Name,tbl_DIVISION.div_Name, tbl_TOWNSHIP.tsp_Id,tbl_DIVISION.div_Id from tbl_CLINIC, tbl_TOWNSHIP , tbl_DIVISION  where tbl_CLINIC.CLN_TSP=tbl_TOWNSHIP.TSP_ID and tbl_TOWNSHIP.DIV_ID=tbl_DIVISION.DIV_ID and tbl_CLINIC.CLN_ID in ('KDG-209','KDG-210','KDG-211','KDG-212','KDG-213','KDG-214')  order by tbl_CLINIC.CLN_NAME`
        }
        console.log('getUnicefClinic in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getUnicefClinic result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}