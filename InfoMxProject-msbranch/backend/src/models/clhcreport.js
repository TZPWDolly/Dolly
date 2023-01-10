//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

//1 Total Number of patient who received Hypertension treatment
exports.icdReport1 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport1 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal from ( select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm13icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport1 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport1 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//2 Total Number of patient who received DM treatment
exports.icdReport2 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport2 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm16icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport2 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport2 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//3 Total Number of patient who received Malaria treatment
exports.icdReport3 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport3 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm153 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport3 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport3 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//4 Total Number of patient who received Diarrhoea treatment
exports.icdReport4 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport4 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm76 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid   )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport4 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport4 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//5 Total Number of patient who received Other Respiratory Disease treatment
exports.icdReport5 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport5 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm155 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid    )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport5 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport5 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//6 Total Number of patient who received Gastritis treatment
exports.icdReport6 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport6 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm22icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid   )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport6 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport6 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//7 Total Number of patient who received Skin Disease treatment
exports.icdReport7 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport7 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm156 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport7 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport7 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//8 Total Number of patient who received Dysentery treatment
exports.icdReport8 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport8 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace,  Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm7icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport8 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport8 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//9 Total Number of patient who received Other GI Disease treatment
exports.icdReport9 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport9 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace,  Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId  
        from view_rptgm154 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport9 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport9 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//10 Total Number of patient who received UTI treatment
exports.icdReport10 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport10 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, 	 (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm19icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport10 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport10 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//11 Total Number of patient who received STI treatment
exports.icdReport11 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport11 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm20icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport11 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport11 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//12 Total Number of patient who received Anaemia treatment
exports.icdReport12 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport12 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm14icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport12 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport12 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//13 Total Number of patient who received Dental Caries treatment
exports.icdReport13 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport13 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm164 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport13 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport13 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//14 Total Number of patient who received DHF treatment
exports.icdReport14 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport14 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
         from view_rptgm121 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport14 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport14 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//15 Total Number of patient who received Ear Diseases treatment
exports.icdReport15 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport15 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `  select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,   (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm151 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport15 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport15 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//16 Total Number of patient who received Eye Diseases treatment
exports.icdReport16 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport16 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `  select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday  
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm31icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid   )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport16 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport16 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//17 Total Number of patient who received Heart Disease treatment
exports.icdReport17 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport17 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `  select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace,  Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm152 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport17 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport17 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//18 Total Number of patient who received General Weakness treatment
exports.icdReport18 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport18 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `  select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday  
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace,  Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId  
        from view_rptgm157 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport18 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport18 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//19 Total Number of patient who received Ache and Pain treatment
exports.icdReport19 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport19 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `  select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace,  Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm158 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport19 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport19 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//20 Total Number of patient who received Pneumonia treatment
exports.icdReport20 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport20 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `  select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace,  Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm159 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid   )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport20 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport20 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//21 Total Number of patient who received Asthma treatment
exports.icdReport21 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport21 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId  
        from view_rptgm73 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid    )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport21 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport21 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//22 Total Number of patient who received Referal for Hospitalization treatment
exports.icdReport22 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport22 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId  
        from view_rptgm160 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid  )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport22 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport22 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//23 Total Number of patient who received Nutrition Support treatment
exports.icdReport23 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport23 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from ( select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from (  select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,	 (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor, Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm161 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport23 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport23 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

// 24 Total Number of patient who received Seasonal Flu treatment
exports.icdReport24 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport24 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (  select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project, Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm162 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid     )  tbl  )  tbl1 )tbl2 ) tbl3`

        console.log('icdReport24 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport24 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

// 25 Total Number of patient who received Injuries treatment
exports.icdReport25 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfprhorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("icdReport25 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) maleCount,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) femaleCount ,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) allTotal   from (    select (CASE  WHEN regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN  regsex=2 THEN 1 ELSE 0  END) AS a2 
        from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday 
        from  (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
        from (select regid,Max(providedDate) providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor, Max(project)project,Max(tspId)tspId,Max(providedplace)providedPlace, Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(clnId)clnId 
        from view_rptgm163 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid   )  tbl  )  tbl1 )tbl2 ) tbl3 `

        console.log('icdReport25 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReport25 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}