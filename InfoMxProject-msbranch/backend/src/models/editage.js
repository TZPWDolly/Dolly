//Module
const oracledb = require('oracledb');

//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');

//....................// edit age//....................//
const date = require('date-and-time')
exports.editAge = merr(async (a) => {

    console.log("a from models reg => ", a)

    const connection = await oracledb.getConnection(db);
    let sql = ``
    const fpDate = new Date()
    const fpTime = date.format(fpDate, 'YYYY/MM/DD HH:mm:ss');

    if (a.sn === 'an') {
        sql = `update tbl_anc set anUsrLogin='${a.user}', anUpdate=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), anStatus=2 , anAge=${a.age} , anAgeUnit=${a.ageUnit}  
where anOrg ='${a.orgID}' and anRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'deli') {
        sql = `update tbl_delivery set deliUsrLogin='${a.user}', deliUpdate=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), deliStatus=2 , deliAge=${a.age} , deliAgeUnit=${a.ageUnit}  
where deliOrg ='${a.orgID}' and deliRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'pn') {
        sql = `update tbl_pnc set pnUsrLogin='${a.user}', pnUpdate=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), pnStatus=2 , pnAge=${a.age} , pnAgeUnit=${a.ageUnit}  
where pnOrg ='${a.orgID}' and pnRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'fp') {
        sql = `update tbl_fp set fpUsrLogin='${a.user}', fpUpdate=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), fpStatus=2 , fpAge=${a.age} , fpAgeUnit=${a.ageUnit}  
where fpOrg ='${a.orgID}' and fpRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'rh') {
        sql = `update tbl_rh set rhUsrLogin='${a.user}', rhUpdate=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), rhStatus=2 , rhAge=${a.age} , rhAgeUnit=${a.ageUnit}  
where rhOrg ='${a.orgID}' and rhRegId = '${a.regID}' and id =${a.ID}`
    }
    else if (a.sn === 'gm' || a.sn === 'opdsru' || a.sn === 'medopd') {
        sql = `update tbl_gm set gmUsrLogin='${a.user}', gmUpdate=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), gmStatus=2 , gmAge=${a.age} , gmAgeUnit=${a.ageUnit}  
where gmOrg ='${a.orgID}' and gmRegId = '${a.regID}' and id =${a.ID}`
    }
    else {
        sql = `update tbl_ipd set ipdUsrLogin='${a.user}', ipdUpdate=TO_DATE('${fpTime}','YYYY-MM-DD HH24:MI:SS'), ipdStatus=2 , ipdAge=${a.age} , ipdAgeUnit=${a.ageUnit}  
where ipdOrg ='${a.orgID}' and ipdRegId = '${a.regID}' and id =${a.ID}`
    }

    console.log("editAge QUERY => ", sql)
    const result = await connection.execute(sql, {}, { autoCommit: true });
    console.log('editAge model result: ', result);
    await connection.close();
    return result;
});