//Module
const oracledb = require('oracledb');

//Models
const {db} = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//....................51 Total Number of family planning client visits....................//

            /********** TSP, ORG , Gender **********/
exports.fp51 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp51 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp51tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp51tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

//....................52 Total Number of family planning client visit for short- term method....................//

exports.fp52 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 where (  ((fpcoc > 0)AND (fpcoc IS NOT NULL)) or ((fpDepo > 0)AND (fpDepo IS NOT NULL)) or ((fpEC > 0)AND (fpEC IS NOT NULL)) or ((fpCondomM > 0)AND (fpCondomM IS NOT NULL)) or ((fpCondomF > 0)AND (fpCondomF IS NOT NULL))  or ((fpPop > 0)AND (fpPop IS NOT NULL)) ) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp52 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp52tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 where   (  ((fpcoc > 0)AND (fpcoc IS NOT NULL)) or ((fpDepo > 0)AND (fpDepo IS NOT NULL)) or ((fpEC > 0)AND (fpEC IS NOT NULL)) or ((fpCondomM > 0)AND (fpCondomM IS NOT NULL)) or ((fpCondomF > 0)AND (fpCondomF IS NOT NULL))  or ((fpPop > 0)AND (fpPop IS NOT NULL)) ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp52tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................53 Total Number of family planning client visit for long- term method....................//

exports.fp53 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where  (  ((fpImp3 > 0)AND (fpImp3 IS NOT NULL)) or ((fpImp4 > 0)AND (fpImp4 IS NOT NULL)) or ((fpImp5 > 0)AND (fpImp5 IS NOT NULL)) or 
                ((fpIUDCu > 0)AND (fpIUDCu IS NOT NULL)) or ((fpIUDMulti > 0)AND (fpIUDMulti IS NOT NULL)) ) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp53 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp53tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where   (  ((fpImp3 > 0)AND (fpImp3 IS NOT NULL)) or ((fpImp4 > 0)AND (fpImp4 IS NOT NULL)) or ((fpImp5 > 0)AND (fpImp5 IS NOT NULL)) or 
                ((fpIUDCu > 0)AND (fpIUDCu IS NOT NULL)) or ((fpIUDMulti > 0)AND (fpIUDMulti IS NOT NULL)) ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp53tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................54 Total number of family planning client visit for depo injection....................//

exports.fp54 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where   (  ((fpDepo >=1)AND ((fpDepo IS NOT NULL) OR (fpDepo <>999) )     ) ) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp54 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp54tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where     (  ((fpDepo>=1)AND ( (fpDepo IS NOT NULL) OR (fpDepo <>999) ) )
               ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp54tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................55 Total number of family planning client visit for Combined Oral Contraceptive Pills....................//

exports.fp55 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where   (  ((fpcoc >=1)AND ((fpcoc IS NOT NULL) OR (fpcoc <>999) ) ) 
              ) and  ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp55 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp55tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where     (  ((fpcoc>=1)AND ((fpcoc IS NOT NULL) OR (fpcoc <>999) ) )      ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp55tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................56 Total number of family planning client visit for Progestogen Only Pills....................//

exports.fp56 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where   (  ((fpPop >=1)AND ((fpPop IS NOT NULL) OR (fpPop <>999) ) ) 
              ) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp56 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp56tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where      (  ((fpPop>=1)AND ((fpPop IS NOT NULL) OR (fpPop <>999) ) )  ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp56tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................57 Total number of family planning client visit for Condoms....................//

exports.fp57 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where   (  ((fpCondomM>=1)AND ((fpCondomM IS NOT NULL) OR (fpCondomM <>999) ) ) OR  ((fpCondomF>=1)AND ((fpCondomF IS NOT NULL) OR (fpCondomF <>999) ) )
              ) and  ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp57 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp57tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where    (  ((fpCondomM>=1)AND ((fpCondomM IS NOT NULL) OR (fpCondomM <>999) ) ) OR  ((fpCondomF>=1)AND ((fpCondomF IS NOT NULL) OR (fpCondomF <>999) ) )
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp57tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................58 Total number of family planning client visit for EC Pills....................//

exports.fp58 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where  (  ((fpEC>=1)AND ((fpEC IS NOT NULL) OR (fpEC <>999) ) )
              ) and  ${ck.filter(a)}  (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp57 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp58tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where       (  ((fpEC>=1)AND ((fpEC IS NOT NULL) OR (fpEC <>999) ) )
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp58tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................59 Total Number of family planning client visit for Implant Insertion....................//

exports.fp59 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where  (  ((fpImp3>=1)AND ((fpImp3 IS NOT NULL) OR (fpImp3 <>999) ) ) OR  ((fpImp4>=1)AND ((fpImp4 IS NOT NULL) OR (fpImp4 <>999) ) ) OR  ((fpImp5>=1)AND ((fpImp5 IS NOT NULL) OR (fpImp5 <>999) ) )
              ) and  ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp59 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp59tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where        (  ((fpImp3>=1)AND ((fpImp3 IS NOT NULL) OR (fpImp3 <>999) ) ) OR  ((fpImp4>=1)AND ((fpImp4 IS NOT NULL) OR (fpImp4 <>999) ) ) OR  ((fpImp5>=1)AND ((fpImp5 IS NOT NULL) OR (fpImp5 <>999) ) )
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp59tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................60 Total Number of family planning client visit for IUD Insertion....................//

exports.fp60 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where  (  ((fpIUDCu>=1)AND ((fpIUDCu IS NOT NULL) OR (fpIUDCu <>999) ) ) OR  ((fpIUDMulti>=1)AND ((fpIUDMulti IS NOT NULL) OR (fpIUDMulti <>999) ) ) 
              ) and  ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp60 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp60tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where     (  ((fpIUDCu>=1)AND ((fpIUDCu IS NOT NULL) OR (fpIUDCu <>999) ) ) OR  ((fpIUDMulti>=1)AND ((fpIUDMulti IS NOT NULL) OR (fpIUDMulti <>999) ) ) 
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp60tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................61 Total Number of family planning client visit for Counseling Services....................//

exports.fp61 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex1 
               where  (  ((fpCSLFP=1) OR (fpCSLFer=1) )
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp61 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fp61tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb1 
            where      (  (fpCSLFP=1) OR (fpCSLFer=1) 
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp61tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................62 Total Number of family planning client visit who received UCG Test....................//

exports.fp62 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex2 
               where  (  (   fplab =1) AND (labSSource='fp') AND (labUCG>0) AND (labUCG<>999 OR labUCG is not null)  AND labtest=1
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp62 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

             /********** DATA TABLE **********/
exports.fp62tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb2 
            where       (  (   fplab =1) AND (labSSource='fp') AND (labUCG>0) AND (labUCG<>999 OR labUCG is not null)  AND labtest=1
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp62tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................63 Total Number of family planning client visit who received HIV Testing and Counseling....................//

exports.fp63 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfpdshborgtspsex2 
               where  (  (   fplab =1) AND (labSSource='fp') AND  (labHIV=1 OR labHIV=2)  AND labtest=1
              ) and  ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fp63 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


             /********** DATA TABLE **********/
exports.fp63tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
            (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal
            from (
            select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,ORGNAME,TSPNAME,CLNNAME,regsex as gender
            from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.fpNewAcceptor,fpcoc,fpDepo,fpEC,fpCondomM,fpCondomF,fpPop,fpCondomMBk,fpCondomFBk,fpECBk,fpImp3,fpImp4,fpImp5,fpIUDCu,fpIUDMulti,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptfpdshb2 
            where   (  (   fplab =1) AND (labSSource='fp') AND  (labHIV=1 OR labHIV=2)  AND labtest=1
              ) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
                ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fp63tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

