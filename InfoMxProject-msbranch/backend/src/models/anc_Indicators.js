//Module
const oracledb = require('oracledb');

//Models
const { db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');



//....................//9 Number of pregnant women who received first ANC visit //....................//


/********** TSP, ORG , Gender **********/
exports.anc9 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where anvisit=1 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc9 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc9tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where anvisit=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc9tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//10 Number of pregnant women who received first ANC visit up to 14 weeks of gestation //....................//


/********** TSP, ORG , Gender **********/
exports.anc10 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where anvisit=1 and anVisitTiming=1 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc10 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc10tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where anvisit=1 and anVisitTiming=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc10tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//11 Number of pregnant women who received ANC at least 4 times //....................//


/********** TSP, ORG , Gender **********/
exports.anc11 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where anvisit=4 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc11 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc11tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where anvisit=4 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc11tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//12 Number of pregnant women who received ANC at least 4 times by skilled providers //....................//


/********** TSP, ORG , Gender **********/
exports.anc12 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where anvisitskill=4 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc12 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc12tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where anvisitskill=4 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc12tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//13 Number of pregnant women who received ANC at least 4 times according to standard schedule //....................//


/********** TSP, ORG , Gender **********/
exports.anc13 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        /* sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where anvisitTiming=4 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
         */
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select regid,Max(provideddate)providedDate,Max(providedPlace) providedPlace,Max(regSex)regSex,Max(regDate)regDate,Max(regAge) regAge,Max(regAgeUnit)regAgeUnit,Max(visittype)visittype, Max(skillBA)skillBA, Max(anG) anG, Max(anGP) angp,Max(anVisit)anVisit, Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill, Max(anvisittiming)anvisittiming, Max(anVisittimingskill)anVisittimingskill,Max(anFeSO4)anFeSO4,Max(anB1)anB1,Max(anTT1)anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK,Max(orgCode) orgCode, Max(donorCode) donorCode, Max(projectCode)projectCode,Max(tspCode)tspCode,Max(clnCode) clnCode,Max(orgName)orgName,Max(tspName)tspName from view_rptandshborgtspsex1 where anvisitTiming=4 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc13 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc13tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        /* sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where anvisitTiming=4 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
         */
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select regid,Max(provideddate)providedDate,Max(providedPlace) providedPlace,Max(regSex)regSex,Max(regDate)regDate,Max(regAge) regAge,Max(regAgeUnit)regAgeUnit,Max(visittype)visittype, Max(skillBA)skillBA, Max(anG) anG, Max(anGP) angp,Max(anVisit)anVisit, Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill, Max(anvisittiming)anvisittiming, Max(anVisittimingskill)anVisittimingskill,Max(anFeSO4)anFeSO4,Max(anB1)anB1,Max(anTT1)anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK,Max(orgCode) orgCode, Max(donorCode) donorCode, Max(projectCode)projectCode,Max(tspCode)tspCode,Max(clnCode) clnCode,Max(orgName)orgName,Max(tspName)tspName,Max(clnName)clnName  from view_rptandshb1 where anvisitTiming=4 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        console.log("ANC 13tbl query "+sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc13tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//14 Number of pregnant women who received ANC at least 4 times according to standard schedule by skilled providers //....................//


/********** TSP, ORG , Gender **********/
exports.anc14 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        /* sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where anvisitTimingskill=4 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
         */
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select regid,Max(provideddate)providedDate,Max(providedPlace) providedPlace,Max(regSex)regSex,Max(regDate)regDate,Max(regAge) regAge,Max(regAgeUnit)regAgeUnit,Max(visittype)visittype, Max(skillBA)skillBA, Max(anG) anG, Max(anGP) angp,Max(anVisit)anVisit, Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill, Max(anvisittiming)anvisittiming, Max(anVisittimingskill)anVisittimingskill,Max(anFeSO4)anFeSO4,Max(anB1)anB1,Max(anTT1)anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK,Max(orgCode) orgCode, Max(donorCode) donorCode, Max(projectCode)projectCode,Max(tspCode)tspCode,Max(clnCode) clnCode,Max(orgName)orgName,Max(tspName)tspName from view_rptandshborgtspsex1 where anvisitTimingskill=4 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc14 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc14tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        /* sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where anvisitTimingskill=4 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
         */
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select regid,Max(provideddate)providedDate,Max(providedPlace) providedPlace,Max(regSex)regSex,Max(regDate)regDate,Max(regAge) regAge,Max(regAgeUnit)regAgeUnit,Max(visittype)visittype, Max(skillBA)skillBA, Max(anG) anG, Max(anGP) angp,Max(anVisit)anVisit, Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill, Max(anvisittiming)anvisittiming, Max(anVisittimingskill)anVisittimingskill,Max(anFeSO4)anFeSO4,Max(anB1)anB1,Max(anTT1)anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK,Max(orgCode) orgCode, Max(donorCode) donorCode, Max(projectCode)projectCode,Max(tspCode)tspCode,Max(clnCode) clnCode,Max(orgName)orgName,Max(tspName)tspName,Max(clnName)clnName  from view_rptandshb1 where anvisitTimingskill=4 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        console.log("ANC 14tbl query "+sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc14tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//15 Total number of ANC visits provided by health workers //....................//


/********** TSP, ORG , Gender **********/
exports.anc15 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc15 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc15tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc15tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//16 Number of pregnant women who received FeSO4 supplementation at least 91 tabs from health workers during pregnancy //....................//


/********** TSP, ORG , Gender **********/
exports.anc16 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        //Local
         sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,C##APIUSER.tbl_township.tsp_Name as tspName,C##APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anFeSO4) AS feso4, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anFeSO4 IS NOT NULL  AND tbl_anc.anFeSO4 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anFeSO4) >= 91) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspid=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.org=C##APIUSER.tbl_org.org_id left join  C##APIUSER.tbl_clinic  on tbl1.clnid=C##APIUSER.tbl_clinic.cln_id ) tbl  where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}` 
        /* //Server
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,APIUSER.tbl_township.tsp_Name as tspName,APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anFeSO4) AS feso4, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anFeSO4 IS NOT NULL  AND tbl_anc.anFeSO4 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anFeSO4) >= 91) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  APIUSER.tbl_township  on tbl1.tspid=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.org=APIUSER.tbl_org.org_id left join  APIUSER.tbl_clinic  on tbl1.clnid=APIUSER.tbl_clinic.cln_id ) tbl  where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
         */
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc16 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc16tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
         //Local
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,C##APIUSER.tbl_township.tsp_Name as tspName,C##APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anFeSO4) AS feso4, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anFeSO4 IS NOT NULL  AND tbl_anc.anFeSO4 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anFeSO4) >= 91) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspid=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.org=C##APIUSER.tbl_org.org_id left join  C##APIUSER.tbl_clinic  on tbl1.clnid=C##APIUSER.tbl_clinic.cln_id ) tbl  where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME` 
        /* 
        //Server
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,APIUSER.tbl_township.tsp_Name as tspName,APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anFeSO4) AS feso4, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anFeSO4 IS NOT NULL  AND tbl_anc.anFeSO4 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anFeSO4) >= 91) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  APIUSER.tbl_township  on tbl1.tspid=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.org=APIUSER.tbl_org.org_id left join  APIUSER.tbl_clinic  on tbl1.clnid=APIUSER.tbl_clinic.cln_id ) tbl  where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
         */
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc16tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//17 Number of pregnant women who received B1 supplementation at least 30 tabs after 36 weeks of gestation //....................//


/********** TSP, ORG , Gender **********/
exports.anc17 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        //Local
         sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,C##APIUSER.tbl_township.tsp_Name as tspName,C##APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anB1) AS B1, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anB1 IS NOT NULL  AND tbl_anc.anB1 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anB1) >=30) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspid=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.org=C##APIUSER.tbl_org.org_id left join  C##APIUSER.tbl_clinic  on tbl1.clnid=C##APIUSER.tbl_clinic.cln_id ) tbl where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}` 
        /* //Server
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,APIUSER.tbl_township.tsp_Name as tspName,APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anB1) AS B1, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anB1 IS NOT NULL  AND tbl_anc.anB1 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anB1) >=30) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  APIUSER.tbl_township  on tbl1.tspid=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.org=APIUSER.tbl_org.org_id left join  APIUSER.tbl_clinic  on tbl1.clnid=APIUSER.tbl_clinic.cln_id ) tbl where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
         */
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc17 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc17tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        
        //Local
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,C##APIUSER.tbl_township.tsp_Name as tspName,C##APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anB1) AS B1, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anB1 IS NOT NULL  AND tbl_anc.anB1 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anB1) >= 30) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspid=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.org=C##APIUSER.tbl_org.org_id left join  C##APIUSER.tbl_clinic  on tbl1.clnid=C##APIUSER.tbl_clinic.cln_id ) tbl  where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME` 
        
        /* //Server

        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select tbl1.regid,tbl1.providedDate,tbl1.vtype visittype,tbl1.org as orgcode,tbl1.donor as donorcode,tbl1.project as projectcode,tbl1.tspId as tspcode,tbl1.providedPlace,tbl1.clnId as clnCode,tbl1.regSex, (tbl1.providedDate-tbl1.regDate) + (tbl1.regAge*tbl1.regAgeUnit) as ageinday , tbl1.clnId,tbl1.providerPosition,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,APIUSER.tbl_township.tsp_Name as tspName,APIUSER.tbl_clinic.cln_name as clnName from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit from  ( select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anB1) AS B1, MAX(tbl_anc.anClnId) AS clnId FROM tbl_anc  WHERE tbl_anc.anB1 IS NOT NULL  AND tbl_anc.anB1 <> 999 AND tbl_anc.anStatus < 3 and ${ck.ancfilter(a)}  (anprovideddate between DATE '${a.startDate}'-INTERVAL '9' MONTH  and DATE'${a.endDate}' ) GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anB1) >= 30) t1 inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid from (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang from tbl_anc) f  group by regid,ang ) t2 on t1.regid=t2.regid  LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl1 left join  APIUSER.tbl_township  on tbl1.tspid=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.org=APIUSER.tbl_org.org_id left join  APIUSER.tbl_clinic  on tbl1.clnid=APIUSER.tbl_clinic.cln_id ) tbl  where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
         */
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc17tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//18 Number of pregnant women who received deworming first dose by health workers //....................//


/********** TSP, ORG , Gender **********/
exports.anc18 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName from view_rptandshborgtspsex1 where anDeworm1=1  and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc18 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc18tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName,Max(clnName) clnName from view_rptandshb1 where anDeworm1=1  and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc18tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//19 Number of pregnant women who received deworming second dose by health workers //....................//


/********** TSP, ORG , Gender **********/
exports.anc19 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName from view_rptandshborgtspsex1 where anDeworm2=1  and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc19 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc19tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName,Max(clnName) clnName from view_rptandshb1 where anDeworm2=1  and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc19tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//20 Number of pregnant women who received TT immunization first dose by health workers //....................//


/********** TSP, ORG , Gender **********/
exports.anc20 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName from view_rptandshborgtspsex1 where anTT1=1 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc20 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc20tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName,Max(clnName) clnName from view_rptandshb1 where anTT1=1  and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc20tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//21 Number of pregnant women who received TT immunization second dose by health workers //....................//


/********** TSP, ORG , Gender **********/
exports.anc21 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName from view_rptandshborgtspsex1 where anTT2=1  and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc21 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc21tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select Max(regid) regid,Max(provideddate) provideddate,Max(providedvillage) providedvillage,Max(visittype) visittype,Max(orgcode) orgCode,Max(donorCode)donorCode, Max(projectcode)projectcode,Max(tspcode)tspcode,Max(clncode)clncode,Max(providedplace)providedplace,Max(providerposition)providerposition, Max(skillBA)skillBA,Max(ang) ang,Max(angp)angp,Max(anvisit)anvisit,Max(anvtcount)anvtcount,Max(anvisitskill) anvisitskill,Max(anvisittiming)anvisittiming,Max(anvisittimingskill) anvisittimingskill, Max(anfeso4)anfeso4,Max(anb1) anB1,Max(andeworm1)anDeworm1,Max(anDeworm2)anDeworm2,Max(anTT1) anTT1,Max(anTT2)anTT2,Max(anHE1)anHE1,Max(anHE2)anHE2,Max(anHE3)anHE3,Max(anHE4)anHE4,Max(anHE5)anHE5,Max(anHE6)anHE6 ,Max(anHE7)anHE7,Max(anHE8)anHE8,Max(anHE9)anHE9,Max(anHE10)anHE10,Max(anHE11)anHE11,Max(anHE12)anHE12,Max(anHE13)anHE13,Max(anOutcome)anOutcome,Max(anRefto)anRefto,Max(anCDK)anCDK,Max(anNBK)anNBK, Max(regSex) regsex,Max(regDate) regDate,Max(regAge)regAge,Max(regAgeUnit)regAgeUnit, Max(divCode)divCode,Max(orgName)orgName,Max(tspName) tspName,Max(clnName) clnName from view_rptandshb1 where anTT2=1  and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc21tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//22 Total number of malaria screening tests received by pregnant women //....................//


/********** TSP, ORG , Gender **********/
exports.anc22 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from 
            ( select * from view_rptandshborgtspsex2
where  (anlab=1) and labtest=1 and ( labRDT>0 and labRDT is not null and labRDT<>999) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')
) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc22 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc22tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
		from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select * from view_rptandshb2
where  (anlab=1) and labtest=1 and ( labRDT>0 and labRDT is not null and labRDT<>999)
             and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc22tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//23 Total number of HIV counselling and testing services received by pregnant women //....................//


/********** TSP, ORG , Gender **********/
exports.anc23 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from 
            ( select * from view_rptandshborgtspsex2
where  (anlab=1) and labtest=1 and ( labHIV>0 and labHIV is not null and labHIV<>999) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')
) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc23 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc23tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
		from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select * from view_rptandshb2
where  (anlab=1) and labtest=1 and ( labHIV>0 and labHIV is not null and labHIV<>999)
             and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc23tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//24 Total number of urine protein tests received by pregnant women //....................//


/********** TSP, ORG , Gender **********/
exports.anc24 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,labUProtein,labUSugar,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from 
            ( select * from view_rptandshborgtspsex2
where  (anlab=1) and labtest=1 and ( labUProtein>0 and labUProtein is not null and labUProtein<>999) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')
) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc24 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc24tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
		from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,labUProtein,labUSugar,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select * from view_rptandshb2
where  (anlab=1) and labtest=1 and ( labUProtein>0 and labUProtein is not null and labUProtein<>999)
             and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc24tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//25 Total number of urine sugar tests received by pregnant women //....................//


/********** TSP, ORG , Gender **********/
exports.anc25 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,labUProtein,labUSugar,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from 
            ( select * from view_rptandshborgtspsex2
where  (anlab=1) and labtest=1 and ( labUSugar>0 and labUSugar is not null and labUSugar<>999) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')
) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc25 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc25tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
		from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anDeworm1,anDeworm2,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,labUProtein,labUSugar,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select * from view_rptandshb2
where  (anlab=1) and labtest=1 and ( labUSugar>0 and labUSugar is not null and labUSugar<>999)
             and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc25tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//26 Total number of health education services received by pregnant women //....................//


/********** TSP, ORG , Gender **********/
exports.anc26 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where (anHE1>0 and anHE1 is not null and anHE1<>999) OR  (anHE2>0 and anHE2 is not null and anHE2<>999) OR  (anHE3>0 and anHE3 is not null and anHE3<>999) OR  (anHE4>0 and anHE4 is not null and anHE4<>999) OR  (anHE5>0 and anHE5 is not null and anHE5<>999) OR  (anHE6>0 and anHE6 is not null and anHE6<>999) OR  (anHE7>0 and anHE7 is not null and anHE7<>999) OR  (anHE8>0 and anHE8 is not null and anHE8<>999) OR  (anHE9>0 and anHE9 is not null and anHE9<>999) OR  (anHE10>0 and anHE10 is not null and anHE10<>999) OR  (anHE11>0 and anHE11 is not null and anHE11<>999) OR  (anHE12>0 and anHE12 is not null and anHE12<>999) OR  (anHE13>0 and anHE13 is not null and anHE13<>999) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc26 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc26tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptandshb1 where (anHE1>0 and anHE1 is not null and anHE1<>999) OR  (anHE2>0 and anHE2 is not null and anHE2<>999) OR  (anHE3>0 and anHE3 is not null and anHE3<>999) OR  (anHE4>0 and anHE4 is not null and anHE4<>999) OR  (anHE5>0 and anHE5 is not null and anHE5<>999) OR  (anHE6>0 and anHE6 is not null and anHE6<>999) OR  (anHE7>0 and anHE7 is not null and anHE7<>999) OR  (anHE8>0 and anHE8 is not null and anHE8<>999) OR  (anHE9>0 and anHE9 is not null and anHE9<>999) OR  (anHE10>0 and anHE10 is not null and anHE10<>999) OR  (anHE11>0 and anHE11 is not null and anHE11<>999) OR  (anHE12>0 and anHE12 is not null and anHE12<>999) OR  (anHE13>0 and anHE13 is not null and anHE13<>999) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc26tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}




//....................//27 Total number of referral services to higher facilities during ANC //....................//


/********** TSP, ORG , Gender **********/
exports.anc27 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptandshborgtspsex1 where (anOutcome=3) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc27 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


/********** DATA TABLE **********/
exports.anc27tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
		from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select * from view_rptandshb1 
         where (anOutcome=3) 
             and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}')
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc27tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}



//....................//28 Total number of referral services to government health facilities during ANC //....................//


/********** TSP, ORG , Gender **********/
exports.anc28 = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from 
            ( select * from view_rptandshborgtspsex1  
            where (anOutcome=3 AND anRefto=1) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')
) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log(`anc28 ${a.by} result: `, result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

/********** DATA TABLE **********/
exports.anc28tbl = async (a) => {
    try {
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) ageg5m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) ageg5f,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) Total2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
		from (
select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.skillBA, anG,angp,   anVisit,anvtcount,anvisitskill,anvisittiming,anVisittimingskill,anFeSO4,anB1,anTT1,anTT2,anHE1,anHE2,anHE3,anHE4,anHE5,anHE6,anHE7,anHE8,anHE9,anHE10,anHE11,anHE12,anHE13,anOutcome,anRefto,anCDK,anNBK,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select * from view_rptandshb1 
         where (anOutcome=3 AND anRefto=1)
             and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}')
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('anc28tbl result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


