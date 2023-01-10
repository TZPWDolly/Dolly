//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

//1 Number of women receiving ANC (at least four visit)
exports.icdReportOne = async (a) => {
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
        console.log("icdReportOne parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN count(tbl2.regid) is null THEN 0 ELSE count(tbl2.regid) END) res 
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.divId,tbl1.clnId,tbl1.visitnumber,tbl1.ang 
        from  ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.divId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.clnId,tbl.providerPosition,tbl.visitnumber,tbl.ang
        from ( select regid,ang,Max(providedDate)providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(providerposition)providerposition,Max(providedplace)providedplace,Max(visitnumber)visitnumber,Max(gpvisitnumber)gpvisitnumber,Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(divId)divId,Max(clnId)clnId,Max(tspId)tspId 
        from view_rptan3icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  visitnumber=4  group  by regid,ang  )  tbl  )  tbl1 )  tbl2`

        console.log('icdReportOne in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportOne result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//2 Number of women receiving ANC (at least one visit)
exports.icdReportTwo = async (a) => {
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
        console.log("icdReportTwo parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select  (CASE  WHEN count(tbl2.regid) is null THEN 0 ELSE count(tbl2.regid) END) res 
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.divId,tbl1.clnId,tbl1.visitnumber,tbl1.ang 
        from  ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.divId,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.clnId,tbl.providerPosition,tbl.visitnumber,tbl.ang 
        from ( select regid,ang,Max(providedDate)providedDate,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(providerposition)providerposition,Max(providedplace)providedplace,Max(visitnumber)visitnumber,Max(gpvisitnumber)gpvisitnumber,Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(divId)divId,Max(clnId)clnId,Max(tspId)tspId 
        from view_rptan1icd where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  visitnumber>=1  group  by regid,ang  )  tbl  )  tbl1 )  tbl2`

        console.log('icdReportTwo in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportTwo result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//3 Number of pregnant women who received B1 supplementation at least 30 tabs after 36 weeks of gestation
exports.icdReportThree = async (a) => {
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
        console.log("icdReportThree parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select  (CASE  WHEN count(tbl2.regid) is null THEN 0 ELSE count(tbl2.regid) END) res 
        from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.visitnumber 
        from  ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.clnId,tbl.providerPosition,tbl.visitnumber 
        from ( select  DISTINCT(regid)regid,Max(provideddate) provideddate, Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(providerposition)providerposition,Max(providedplace)providedplace,Max(visitnumber)visitnumber,Max(regdate)regdate,Max(regage) regage,Max(regageunit)regageunit,Max(clnid)clnid,Max(tspId)tspid,Max(regSex) regSex 
        from view_rptan9 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid )  tbl  )  tbl1 )  tbl2`

        console.log('icdReportThree in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportThree result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//4 Number of antenatal mothers who received iron supplements
exports.icdReportFour = async (a) => {
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
        console.log("icdReportFour parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE WHEN count(tbl1.idCount) is null  THEN  0 ELSE count(tbl1.idCount) END) res
        from (select idCount,Max(provideddate)provideddate,Max(org)org,Max(project) project,Max(tspid) tsp,Max(providedplace)providedplace,Max(anFESO4)anfeso4,Max(anFA)anFA,Max(anFC)anFC  
        from view_allicdrpt4 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by idcount ) tbl1`

        console.log('icdReportFour in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportFour result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//5 Number of women who received CDK
exports.icdReportFive = async (a) => {
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
        console.log("icdReportFive parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt5 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp})  tbl1`

        console.log('icdReportFive in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportFive result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//6 Number of deliveries attended by trained RHWs or by trained health personnels
exports.icdReportSix = async (a) => {
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
        console.log("icdReportSix parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt6  where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  skillBA=1)  tbl1`

        console.log('icdReportSix in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportSix result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//7 Number of women receiving PNC at least one visit after delivery by trained RHWs
exports.icdReportSeven = async (a) => {
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
        console.log("icdReportSeven parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt7  where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  skillBA=1)  tbl1`

        console.log('icdReportSeven in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportSeven result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//8 Number of women receiving FP services within 42days after delivery
exports.icdReportEight = async (a) => {
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
        console.log("icdReportEight parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt8 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and pnFP=1   )  tbl1`

        console.log('icdReportEight in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportEight result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//9 Number of individual using modern contraceptive methods
exports.icdReportNine = async (a) => {
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
        console.log("icdReportNine parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res 
        from (select  Distinct(idCount) AS idCount,Max(providedDate) AS providedDate,Max(Org) AS org,Max(Project) AS project,Max(TspId) AS tspId,Max(providedPlace) AS providedPlace,Max(fpCOc) AS fpCOc, Max(fpDepo) AS fpDepo,Max(fpEC) AS fpEC,Max(fpCondomM) AS fpCondomM 
        from view_allicdrpt9 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by idCount )  tbl1`

        console.log('icdReportNine in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportNine result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//10 Number of individual using modern contraceptive method COC
exports.icdReportTen = async (a) => {
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
        console.log("icdReportTen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt10 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl1`

        console.log('icdReportTen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportTen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//11 Number of individual using modern contraceptive method Depo
exports.icdReportEleven = async (a) => {
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
        console.log("icdReportEleven parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res 
        from (select  Distinct(idCount) AS idCount,Max(providedDate) AS providedDate,Max(Org) AS org,Max(Project) AS project,Max(TspId) AS tspId,Max(providedPlace) AS providedPlace,Max(fpCOc) AS fpCOc,  Max(fpDepo) AS fpDepo,Max(fpEC) AS fpEC,Max(fpCondomM) AS fpCondomM 
        from view_allicdrpt11 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by idcount)  tbl1`

        console.log('icdReportEleven in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportEleven result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//12 Number of individual using modern contraceptive method EC
exports.icdReportTwelve = async (a) => {
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
        console.log("icdReportTwelve parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt12 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl1`
        console.log('icdReportTwelve in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportTwelve result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//13 Number of individual using modern contraceptive method Condom
exports.icdReportThirteen = async (a) => {
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
        console.log("icdReportThirteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt13 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl1`
        
        console.log('icdReportThirteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportThirteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//14 Number of individual who received referal service for long-term modern contraceptive method IUD-Imp and Sterilization
exports.icdReportFourteen = async (a) => {
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
        console.log("icdReportFourteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt14 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl1`

        console.log('icdReportFourteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportFourteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//15 Number of individual receiving FP counseling only
exports.icdReportFifteen = async (a) => {
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
        console.log("icdReportFifteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt15 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl1`

        console.log('icdReportFifteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportFifteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//16 Number of women receiving post abortion care 
exports.icdReportSixteen = async (a) => {
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
        console.log("icdReportSixteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(regid) is null THEN 0 ELSE count(regid) END) res   from tbl_reg where regorg='CPI-1000'`

        console.log('icdReportSixteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportSixteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//17 Number of baby who got NBC provided by RHWs
exports.icdReportSeventeen = async (a) => {
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
        console.log("icdReportSeventeen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt17   where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp}  and skillBA=1  )  tbl1`

        console.log('icdReportSeventeen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportSeventeen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//18 Number of baby who had been referred to higher facilities
exports.icdReportEighteen = async (a) => {
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
        console.log("icdReportEighteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select (CASE  WHEN count(tbl1.idCount) is null THEN 0 ELSE count(tbl1.idCount) END) res from (select * from view_allicdrpt18 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl1`

        console.log('icdReportEighteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('icdReportEighteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}