//Module
const oracledb = require('oracledb');

//Models
const { apidb } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.villageByOrg = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        if (_.isEmpty(a)) {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(divName)divName,Max(tspName)tspName,count(tcln) totalClinic , sum(tvll) totalVillage from (
                select orgcode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Mpop,tbl_village_org_proj.vop_FPop,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_Name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id) a 
                group by a.orgcode,clncode) b group by orgcode`}
        else {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(divName)divName,Max(tspName)tspName,count(tcln) totalClinic , sum(tvll) totalVillage from (
                select orgcode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Mpop,tbl_village_org_proj.vop_FPop,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_Name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id) a 
                group by a.orgcode,clncode) b group by orgcode`
        }

        console.log('sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('villageByOrg result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}
