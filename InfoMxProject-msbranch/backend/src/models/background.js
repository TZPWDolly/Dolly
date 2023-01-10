//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash')


//...........................GET Village By Org...........................//
exports.getVillageByOrg = merr(async (a,b) => {
  console.log("a from getVillageByOrg ===> ",a)
    try{
      const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          console.log('orgID and projID from UI : ', a.projID, a.orgID)
           const sql = await `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
           tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code
           from  tbl_village_org_proj,tbl_village,tbl_clinic
           where tbl_village_org_proj.village_code=tbl_village.village_code
           and tbl_village_org_proj.cln_code=tbl_clinic.cln_id
           and tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1 and tbl_village_org_proj.org_code in ('${a.orgID}')
           and tbl_village_org_proj.proj_code in ('${a.projID}')
            order by tbl_village.village_name asc` // from core-api (user table) if will be application URL correct   //and tbl_village_org_proj.vop_infomx=1
            console.log('a from backend : ', sql)
            const result = await connection.execute(sql, [],{
            outFormat: oracledb.OBJECT
          });
          console.log('get village by org result: ', result.rows);
          await connection.close(); 
          return result.rows;
    }catch (error) {
      throw (error);
    }
  });