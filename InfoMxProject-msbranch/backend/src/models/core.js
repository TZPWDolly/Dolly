//Module
const oracledb = require('oracledb');
//Models
const {apidb, db} = require('../models/database');
//Helper
const ct = require('../helper/checkTbl');



//...........................GET PROJECT...........................//
exports.project = async () => {
  try{
    const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
         const sql = await `select Max( tbl_project.project_id) project_id,Max(tbl_project.project_name) project_name from  tbl_village_org_proj,tbl_project where tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 GROUP BY tbl_project.project_id ORDER BY project_name` // from core-api (user table) if will be application URL correct   //and tbl_village_org_proj.vop_infomx=1
        const result = await connection.execute(sql, [],{
          outFormat: oracledb.OBJECT
        });
        console.log('getProject result: ', result.rows);
        await connection.close(); 
        return result.rows;
  }catch (error) {
    throw (error);
  }
}

//...........................GET All Tsp...........................//
exports.getAllTownship = async () => {
  try{
    const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
         const sql = await `select * from tbl_township`
         const result = await connection.execute(sql, [],{
          outFormat: oracledb.OBJECT
        });
        console.log('getAllTownship result: ', result.rows);
        await connection.close(); 
        return result.rows;
  }catch (error) {
    throw (error);
  }
}


//...........................GET STATE(DIVISION)...........................//
exports.state = async (a) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          let sql = ''
           /* const sql = await `select Max( tbl_division.div_id) div_Id,Max(tbl_division.div_name) div_Name from  
           tbl_village_org_proj,tbl_township,tbl_division where tbl_village_org_proj.tsp_code=tbl_township.tsp_id 
           and tbl_township.div_id=tbl_division.div_id and tbl_village_org_proj.proj_code in 
           (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)}) and tbl_village_org_proj.vop_infomx=1 
           and tbl_village_org_proj.vop_status=1 GROUP by tbl_division.div_id order by div_name` */
          
            sql = await `select Max( tbl_division.div_id) div_Id,Max(tbl_division.div_name) div_Name from  
            tbl_village_org_proj,tbl_township,tbl_division where tbl_village_org_proj.tsp_code=tbl_township.tsp_id
             and tbl_township.div_id=tbl_division.div_id and tbl_village_org_proj.proj_code in 
             (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)}) and tbl_village_org_proj.vop_status=1 GROUP by tbl_division.div_id order by div_name` // from core-api (user table) if will be application URL correct
           
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getState result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

//...........................GET All Division...........................//
exports.divsion = async (a) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          let sql = ''
           /* const sql = await `select Max( tbl_division.div_id) div_Id,Max(tbl_division.div_name) div_Name from  
           tbl_village_org_proj,tbl_township,tbl_division where tbl_village_org_proj.tsp_code=tbl_township.tsp_id 
           and tbl_township.div_id=tbl_division.div_id and tbl_village_org_proj.proj_code in 
           (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)}) and tbl_village_org_proj.vop_infomx=1 
           and tbl_village_org_proj.vop_status=1 GROUP by tbl_division.div_id order by div_name` */
          
            sql = await `select * from tbl_division order by div_name` // from core-api (user table) if will be application URL correct
           
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getAllDivision result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

//...........................GET Township by A Division...........................//
exports.getTspByDiv = async (b) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          console.log("b from gettspbydiv => ",b.divID)
          let sql =  await `select * from tbl_township where div_id='${b.divID}' order by tsp_name` 
          console.log("getTspbyDiv query =>",sql)
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getTspByDiv result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

//...........................GET Village by A Township...........................//
exports.getVillageByTsp = async (b) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          console.log("b from getVillageByTsp => ",b.divID)
          let sql =  await `select * from tbl_village where tsp_id='${b.tspID}' order by village_name` 
          console.log("getVillageByTsp query =>",sql)
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getVillageByTsp result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

//...........................GET Clinic by A tsp (but with project id)..........................//
exports.getClinicByTsp = async (b) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          console.log("b from getClinicByVillage => ",b.project)
          let sql =  await ` select * from view_clinicdata where proj_code='${b.project}'` 
          console.log("getClinicByTsp query =>",sql)
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getClinicByTsp result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

//...........................GET All Org (no filter)..........................//
exports.getAllOrg = async (b) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          console.log("b from getAllOrg => ",b.project)
          let sql =  await ` select * from tbl_org order by org_shortname` 
          console.log("getAllOrg query =>",sql)
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getAllOrg result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}


//...........................GET TWONSHIP...........................//
exports.tsp = async (a) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
           const sql = await `select  Max( tbl_township.tsp_id) tsp_Id,Max(tbl_township.tsp_name) tsp_Name from  
           tbl_village_org_proj,tbl_township,tbl_division where tbl_village_org_proj.tsp_code=tbl_township.tsp_id 
           and tbl_village_org_proj.proj_code in 
           (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)})and tbl_division.div_id in 
           (${typeof a.state === 'string' ? `'${a.state}'` : ct.datastr(a.state)}) 
           and tbl_village_org_proj.vop_status=1 group by tbl_township.tsp_id order by tsp_name` // from core-api (user table) if will be application URL correct  
           console.log('tsp sql: ', sql); 
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getTsp result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}


//...........................GET ORGANIZATION...........................//
exports.org = async (a) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
          let sql = ''
           /* const sql = await `select  Max(tbl_org.org_id) org_id,Max(tbl_org.org_name) org_name from  
           tbl_village_org_proj,tbl_township,tbl_division,tbl_org,tbl_clinic where  
           tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and tbl_village_org_proj.proj_code in 
           (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)}) and tbl_division.div_id in 
           (${typeof a.state === 'string' ? `'${a.state}'` : ct.datastr(a.state)}) and tbl_township.tsp_id in 
           (${typeof a.tsp === 'string' ? `'${a.tsp}'` : ct.datastr(a.tsp)}) and tbl_village_org_proj.vop_infomx=1 
           and tbl_village_org_proj.vop_status=1 group by tbl_org.org_id order by org_name` */
           sql = await `select  Max(tbl_org.org_id) org_id,Max(tbl_org.org_name) org_name from  
           tbl_village_org_proj,tbl_township,tbl_division,tbl_org,tbl_clinic where  
           tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and tbl_village_org_proj.proj_code in 
           (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)}) and tbl_division.div_id in 
           (${typeof a.state === 'string' ? `'${a.state}'` : ct.datastr(a.state)}) and tbl_township.tsp_id in 
           (${typeof a.tsp === 'string' ? `'${a.tsp}'` : ct.datastr(a.tsp)}) 
           and tbl_village_org_proj.vop_status=1 group by tbl_org.org_id order by org_name` // from core-api (user table) if will be application URL correct   
          
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getTsp result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}


//...........................GET CLINIC...........................//
exports.clinic = async (a) => {
  try{
    const connection = await oracledb.getConnection(apidb);
          console.log('db connected: ', connection);
           /* const sql = await `select  Max( tbl_clinic.cln_id) cln_Id,Max(tbl_clinic.cln_name) 
           cln_Name from  tbl_village_org_proj,tbl_township,tbl_division,tbl_org,tbl_clinic where 
            tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id 
            and tbl_village_org_proj.proj_code in (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)}) 
            and tbl_division.div_id in (${typeof a.state === 'string' ? `'${a.state}'` : ct.datastr(a.state)}) 
            and tbl_township.tsp_id in (${typeof a.tsp === 'string' ? `'${a.tsp}'` : ct.datastr(a.tsp)}) 
            and tbl_village_org_proj.org_code in (${typeof a.org === 'string' ? `'${a.org}'` : ct.datastr(a.org)}) 
            and tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1 group by tbl_clinic.cln_id  order by cln_name` */
            const sql = await `select  Max( tbl_clinic.cln_id) cln_Id,Max(tbl_clinic.cln_name) 
           cln_Name from  tbl_village_org_proj,tbl_township,tbl_division,tbl_org,tbl_clinic where 
            tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id 
            and tbl_village_org_proj.proj_code in (${typeof a.proj === 'string' ? `'${a.proj}'` : ct.datastr(a.proj)}) 
            and tbl_division.div_id in (${typeof a.state === 'string' ? `'${a.state}'` : ct.datastr(a.state)}) 
            and tbl_township.tsp_id in (${typeof a.tsp === 'string' ? `'${a.tsp}'` : ct.datastr(a.tsp)}) 
            and tbl_village_org_proj.org_code in (${typeof a.org === 'string' ? `'${a.org}'` : ct.datastr(a.org)}) 
            and tbl_village_org_proj.vop_status=1 group by tbl_clinic.cln_id  order by cln_name` // from core-api (user table) if will be application URL correct   
          console.log("SQL from GetClinic ====> line no.89 ===> "+ sql);
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getTsp result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

//...........................GET INTI...........................//
exports.indi = async (a) => {
  try{
    const connection = await oracledb.getConnection(db);
          console.log('db connected: ', connection);
           const sql = await `select ID,RPT_NAME,RPT_INDICATOR_SERVICE from tbl_rpt_indicator WHERE RPT_INDICATOR_SERVICE= '${a.indi}'` // from core-api (user table) if will be application URL correct   
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getIndi result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

//...........................GET SERVICE...........................//
exports.service = async () => {
  try{
    const connection = await oracledb.getConnection(db);
          console.log('db connected: ', connection);
           const sql = await `SELECT RPT_INDICATOR_SERVICE  from tbl_rpt_indicator group by rpt_indicator_service order by rpt_indicator_service` // from core-api (user table) if will be application URL correct   
          const result = await connection.execute(sql,[],{
            outFormat: oracledb.OBJECT
          });
          console.log('getService result: ', result.rows);
          await connection.close(); 
          return result.rows;
  } catch (error) {
    throw (error);
  }
}

