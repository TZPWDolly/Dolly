//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

///////////////////////Lab Data///////////////////////// 
exports.getLabData = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getLabData parameter in database ===> " + a)
if(a.gmgmtype==='3')
{
    sql = await  `select *  from tbl_lab where labStatus < 3 and labOrg='${a.orgID}'  and id='${a.RHID}' and labSSource='medopd' and labRegId='${a.regID}'`
}
else if(a.gmgmtype === '2')
{
    sql = await  `select *  from tbl_lab where labStatus < 3 and labOrg='${a.orgID}'  and id='${a.RHID}' and labSSource='surgopd' and labRegId='${a.regID}'`
}
else{
    sql = await  `select *  from tbl_lab where labStatus < 3 and labOrg='${a.orgID}'  and id='${a.RHID}' and labSSource='${a.sn}' and labRegId='${a.regID}'`
}
      
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