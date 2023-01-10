//Module
const oracledb = require('oracledb');

//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');

//....................// deleteService//....................//
exports.deleteService = merr(async (a) => {

    console.log("a from models reg => ", a)

    const connection = await oracledb.getConnection(db);
    let sql = ``

    if (a.sn === 'an') {
        sql = `delete from tbl_anc where anOrg ='${a.orgID}' and anRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'deli') {
        sql = `delete from tbl_delivery where deliOrg ='${a.orgID}' and deliRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'pn') {
        sql = `delete from tbl_pnc where pnOrg ='${a.orgID}' and pnRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'fp') {
        sql = `delete from tbl_fp where fpOrg ='${a.orgID}' and fpRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'rh') {
        sql = `delete from tbl_rh where rhOrg ='${a.orgID}' and rhRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'gm' || a.sn === 'opdsru' || a.sn === 'medopd') {
        sql = `delete from tbl_gm where gmOrg ='${a.orgID}' and gmRegId = '${a.regID}' and id =${a.ID}`
    }
    else {
        sql = `delete from tbl_ipd where ipdOrg ='${a.orgID}' and ipdRegId = '${a.regID}' and id =${a.ID}`
    }

    console.log("deleteService QUERY => ", sql)
    const result = await connection.execute(sql, {}, { autoCommit: true });
    console.log('deleteService model result: ', result);
    await connection.close();
    return result;
});