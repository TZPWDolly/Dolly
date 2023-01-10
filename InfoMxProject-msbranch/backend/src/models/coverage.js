//Module
const oracledb = require('oracledb');

//Models
const { apidb } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.coverageTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("coverage parameter in database ===> " + JSON.stringify(a))
        if (_.isEmpty(a)) {
            sql = await `select  Max(projectname) projectName,Max(b.org_Name) orgName,CASE count(b.clncode) WHEN 1 THEN 0 ELSE count(b.clncode) END  as totalClinic,sum(vc) as totalVillage,Sum(totalPoP) totalPoP,Sum(vop_Hhold)totalHhold from (
                select count(a.village_code) vc,Max(a.org_Name) org_Name,Max(a.clncode) clncode,Max(a.cln_name) cln_name,Max(a.orgcode) orgcode,Max(tspcode) tspcode,Max(projectCode) projectCode,Max(project_name) projectName,
                sum(a.totalPoP) totalPoP,sum(a.vop_Hhold) vop_Hhold from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectCode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,tbl_division.div_id divcode,tbl_project.project_name,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) totalPoP 
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id
                and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 )  a
                group by a.orgcode,a.projectcode,a.clncode) b
                group by b.orgcode,b.projectcode order by orgName`}
        else {
            sql = await `select  Max(projectname) projectName,Max(b.org_Name) orgName,CASE count(b.clncode) WHEN 1 THEN 0 ELSE count(b.clncode) END  as totalClinic,sum(vc) as totalVillage,Sum(totalPoP) totalPoP,Sum(vop_Hhold)totalHhold from (
                select count(a.village_code) vc,Max(a.org_Name) org_Name,Max(a.clncode) clncode,Max(a.cln_name) cln_name,Max(a.orgcode) orgcode,Max(tspcode) tspcode,Max(projectCode) projectCode,Max(project_name) projectName,
                sum(a.totalPoP) totalPoP,sum(a.vop_Hhold) vop_Hhold from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectCode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,tbl_division.div_id divcode,tbl_project.project_name,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) totalPoP 
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id
                and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 )a
                where ${ck.covFilter(a)} 
                group by a.orgcode,a.projectcode,a.clncode) b
                group by b.orgcode,b.projectcode order by orgName`
        }

        console.log('Coveragetable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('coverageTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.clinicDetailTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("Cllinic Detail Table in database ===> " + JSON.stringify(a))
        if (_.isEmpty(a)) {
            sql = await `select orgName,projectname,clnName,vc TotalVillage,TotalPop,vophhold TotalHHold from (
                select count(a.village_code) vc,Max(a.org_Name) orgName,Max(a.clncode) clncode,Max(a.cln_name) clnname,Max(a.orgcode) orgcode,Max(tspcode) tspcode,Max(projectCode) projectCode,Max(project_name) projectName,
                sum(a.totalPoP) totalPoP,sum(a.vop_Hhold) vopHhold from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectCode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,tbl_division.div_id divcode,tbl_project.project_name,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) totalPoP 
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id
                and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 )a
                group by a.orgcode,a.clncode) b`}
        else {
            sql = await `select orgName,projectname,clnName,vc TotalVillage,TotalPop,vophhold TotalHHold from (
                select count(a.village_code) vc,Max(a.org_Name) orgName,Max(a.clncode) clncode,Max(a.cln_name) clnname,Max(a.orgcode) orgcode,Max(tspcode) tspcode,Max(projectCode) projectCode,Max(project_name) projectName,
                sum(a.totalPoP) totalPoP,sum(a.vop_Hhold) vopHhold from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectCode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,tbl_division.div_id divcode,tbl_project.project_name,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) totalPoP 
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id
                and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 )a
                where ${ck.covFilter(a)}
                group by a.orgcode,a.clncode) b`
        }

        console.log('Coveragetable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('coverageTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.duplicateClinic = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("duplicateClinic Table in database ===> " + JSON.stringify(a))
        if (_.isEmpty(a)) {
            sql = await `select Max(orgName)orgName,Max(projectName)projectName,Max(clnName) clnName,Max(projectCode)projectCode,Max(clncode)clncode,Max(tspCode)tspCode,Max(orgcode)orgcode from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectCode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName orgName,tbl_division.div_id divcode,tbl_project.project_name projectName,
                tbl_clinic.cln_name clnName,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) totalPoP 
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id
                and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a
                group by clncode,projectcode`}
        else {
            sql = await `select Max(orgName)orgName,Max(projectName)projectName,Max(clnName) clnName,Max(projectCode)projectCode,Max(clncode)clncode,Max(tspCode)tspCode,Max(orgcode)orgcode from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectCode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName orgName,tbl_division.div_id divcode,tbl_project.project_name projectName,
                tbl_clinic.cln_name clnName,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) totalPoP 
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id
                and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a
                group by clncode,projectcode`
        }

        console.log('duplicateClinic in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('duplicateClinic result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.villageByOrg = async (a) => {
    try {
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("coverage parameter in database ===> " + JSON.stringify(a))
        if (_.isEmpty(a)) {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(divName)divName,Max(tspName)tspName,count(tcln) totalClinic , sum(tvll) totalVillage from (
                select orgcode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Mpop,tbl_village_org_proj.vop_FPop,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortname org_name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a 
                group by a.orgcode,clncode) b group by orgcode`}
        else {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(divName)divName,Max(tspName)tspName,count(tcln) totalClinic , sum(tvll) totalVillage from (
                select orgcode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Mpop,tbl_village_org_proj.vop_FPop,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortname org_name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a 
                where ${ck.covFilter(a)} group by a.orgcode,clncode) b group by orgcode`
        }

        console.log('CoverageVillageByORG in sql =====> ' + sql)
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

exports.villageByTsp = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log("coverage parameter in database ===> " + JSON.stringify(a))
        console.log('db connected: ', connection);
        if (_.isEmpty(a)) {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(divName)divName,Max(tspName)tspName,count(tcln) totalClinic , sum(tvll) totalVillage from (
                select tspcode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Mpop,tbl_village_org_proj.vop_FPop,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortname org_name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a 
                group by a.tspcode,clncode) b group by tspcode order by tspname`}
        else {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(divName)divName,Max(tspName)tspName,count(tcln) totalClinic , sum(tvll) totalVillage from (
                select tspcode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Mpop,tbl_village_org_proj.vop_FPop,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortname org_name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a 
                where ${ck.covFilter(a)} group by a.tspcode,clncode) b group by tspcode order by tspname`
        }

        console.log('CoverageVillageByVillage in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('villageByTsp result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.clinicByPop = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log("coverage parameter in database ===> " + JSON.stringify(a))
        console.log('db connected: ', connection);
        if (_.isEmpty(a)) {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(clncode)clncode,Max(clnName)clnName, sum(tvll) totalVillage,sum(totalPop)totalPop from (
                select clncode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName,Max(cln_name)clnName,Max(totalPop) totalPop from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,
                tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop)totalPop
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a 
                group by clncode) b group by clncode order by clnName`}
        else {
            sql = await `select Max(projectName)projectName,Max(orgName)orgName,Max(clncode)clncode,Max(clnName)clnName, sum(tvll) totalVillage,sum(totalPop)totalPop from (
                select clncode,count(a.clncode) tcln, count(a.village_code) tvll,Max(project_name) projectName,Max(a.org_Name) orgName,Max(div_name) divName,Max(tsp_name)tspName,Max(cln_name)clnName,Max(totalPop) totalPop from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,
                tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop)totalPop
                from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id and tbl_village_org_proj.vop_status=1 ) a 
                where ${ck.covFilter(a)}
                group by clncode) b group by clncode order by clnName`
        }

        console.log('Coverage clinicByPop in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('clinicByPop result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.popHhByTsp = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log("Population and Household by Tsp parameter in database ===> " + JSON.stringify(a))
        console.log('db connected: ', connection);
        if (_.isEmpty(a)) {
            sql = await `select Max(tsp_name)TSPName,sum(tPOP) TotalPOP,sum(vop_Hhold) TotalHHold from (
                select a.* from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) tPOP,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id
                and tbl_village_org_proj.vop_status=1 ) a
                ) b group by b.tsp_name order by b.tsp_name`}
        else {
            sql = await `select Max(tsp_name)TSPName,sum(tPOP) TotalPOP,sum(vop_Hhold) TotalHHold from (
                select a.* from (
                select tbl_village_org_proj.village_code,tbl_village_org_proj.org_code orgcode,tbl_village_org_proj.proj_code projectcode,tbl_village_org_proj.tsp_code tspcode,tbl_village_org_proj.cln_code clncode,
                (tbl_village_org_proj.vop_Mpop+tbl_village_org_proj.vop_FPop) tPOP,tbl_village_org_proj.vop_Vlt,tbl_village_org_proj.vop_Infomx,tbl_village_org_proj.vop_Hhold,tbl_org.org_shortName org_name,tbl_project.project_name,tbl_division.div_id divCode,
                tbl_clinic.cln_name,tbl_township.tsp_name,tbl_division.div_name,tbl_village.village_name from tbl_village_org_proj, tbl_village, tbl_org,tbl_clinic,tbl_township,tbl_division,tbl_project
                where tbl_village_org_proj.village_code=tbl_village.village_code and
                tbl_village_org_proj.org_code=tbl_org.org_id and tbl_village_org_proj.cln_code=tbl_clinic.cln_id and
                tbl_village_org_proj.tsp_code=tbl_township.tsp_id and tbl_township.div_Id=tbl_division.div_Id and tbl_village_org_proj.proj_code=tbl_project.project_id
                and tbl_village_org_proj.vop_status=1 ) a
                where ${ck.covFilter(a)}
                ) b group by b.tsp_name order by b.tsp_name`
        }

        console.log('Coverage Population and Household by Tsp in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('Population and Household by Tsp result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.coverageMap = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log("coverage parameter in database ===> " + JSON.stringify(a))
        console.log('db connected: ', connection);
        if (_.isEmpty(a)) {
            sql = await `select * from tbl_rs_cln_vill`}
        else {
            sql = await `select * from tbl_rs_cln_vill where ${ck.covFilter(a)}`
        }

        console.log('sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('coverageMap result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}