//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getClinicByOrgProj = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("getClinicByOrgProj parameter in database ===> " + a.orgID, a.projID)

        sql = await `select tbl_village_org_proj.cln_code, Max(tbl_clinic.cln_name) cln_name
        from tbl_village_org_proj,tbl_clinic
        where tbl_village_org_proj.cln_code=tbl_clinic.cln_id
        and tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1 and 
        tbl_village_org_proj.org_code in ('${a.orgID}')
        and tbl_village_org_proj.proj_code in ('${a.projID}')
        group by tbl_village_org_proj.cln_code`


        console.log('getClinicByOrgProj in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getClinicByOrgProj result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}