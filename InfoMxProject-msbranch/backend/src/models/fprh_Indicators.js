//Module
const oracledb = require('oracledb');

//Models
const {db} = require('./database');

//Helper
const ck = require('../helper/checkTbl');



 //....................//137 Number of 10 year IUD (Copper-T) provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh137 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpIUDCu) is null THEN 0 ELSE sum(fpIUDCu) END)  COUNTDATA from ( select tbl.fpIUDCu,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh137 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh137tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpIUDCu) is null THEN 0 ELSE sum(fpIUDCu) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpIUDCu) is null THEN 0 ELSE sum(fpIUDCu) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpIUDCu) is null THEN 0 ELSE sum(fpIUDCu) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpIUDCu) is null THEN 0 ELSE sum(fpIUDCu) END ELSE 0  END) AS b2 from ( select tbl.fpIUDCu,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1  where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}'))   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh137tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

 //....................//138 Number of 5 year IUD (Multiload)provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh138 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpIUDMulti) is null THEN 0 ELSE sum(fpIUDMulti) END)  COUNTDATA from ( select tbl.fpIUDMulti,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh138 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fprh138tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpIUDMulti) is null THEN 0 ELSE sum(fpIUDMulti) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpIUDMulti) is null THEN 0 ELSE sum(fpIUDMulti) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpIUDMulti) is null THEN 0 ELSE sum(fpIUDMulti) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpIUDMulti) is null THEN 0 ELSE sum(fpIUDMulti) END ELSE 0  END) AS b2 from ( select tbl.fpIUDMulti,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh138tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


 //....................//139 Number of 5 year implant (Jadelle)provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh139 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpImp5) is null THEN 0 ELSE sum(fpImp5) END)  COUNTDATA from ( select tbl.fpImp5,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh139 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fprh139tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpImp5) is null THEN 0 ELSE sum(fpImp5) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpImp5) is null THEN 0 ELSE sum(fpImp5) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpImp5) is null THEN 0 ELSE sum(fpImp5) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpImp5) is null THEN 0 ELSE sum(fpImp5) END ELSE 0  END) AS b2 from ( select tbl.fpImp5,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh139tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


 //....................//140 Number of 4 year implant (Zarin or Sino-Implant)provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh140 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpImp4) is null THEN 0 ELSE sum(fpImp4) END)  COUNTDATA from ( select tbl.fpImp4,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh140 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh140tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpImp4) is null THEN 0 ELSE sum(fpImp4) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpImp4) is null THEN 0 ELSE sum(fpImp4) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpImp4) is null THEN 0 ELSE sum(fpImp4) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpImp4) is null THEN 0 ELSE sum(fpImp4) END ELSE 0  END) AS b2 from ( select tbl.fpImp4,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh140tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


 //....................//141 Number of 3 year implant (Implanon)provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh141 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpImp3) is null THEN 0 ELSE sum(fpImp3) END)  COUNTDATA from ( select tbl.fpImp3,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh141 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fprh141tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpImp3) is null THEN 0 ELSE sum(fpImp3) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpImp3) is null THEN 0 ELSE sum(fpImp3) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpImp3) is null THEN 0 ELSE sum(fpImp3) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpImp3) is null THEN 0 ELSE sum(fpImp3) END ELSE 0  END) AS b2 from ( select tbl.fpImp3,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh141tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

 //....................//142 Number of 3 month Injectable Depo provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh142 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpdepo) is null THEN 0 ELSE sum(fpdepo) END)  COUNTDATA from ( select tbl.fpdepo,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh142 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.fprh142tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpdepo) is null THEN 0 ELSE sum(fpdepo) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpdepo) is null THEN 0 ELSE sum(fpdepo) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpdepo) is null THEN 0 ELSE sum(fpdepo) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpdepo) is null THEN 0 ELSE sum(fpdepo) END ELSE 0  END) AS b2 from ( select tbl.fpdepo,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh142tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

 //....................//143 Number of Combined Oral Contraceptive Pill provided during reporting period (cycle) //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh143 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpCOC) is null THEN 0 ELSE sum(fpCOC) END)  COUNTDATA from ( select tbl.fpCOC,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh143 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh143tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpCOC) is null THEN 0 ELSE sum(fpCOC) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpCOC) is null THEN 0 ELSE sum(fpCOC) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpCOC) is null THEN 0 ELSE sum(fpCOC) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpCOC) is null THEN 0 ELSE sum(fpCOC) END ELSE 0  END) AS b2 from ( select tbl.fpCOC,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh143 result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


 //....................//144 Number of Progestogen Only Pill provided during reporting period (Cycle) //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh144 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpPOP) is null THEN 0 ELSE sum(fpPOP) END)  COUNTDATA from ( select tbl.fpPOP,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh144 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh144tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpPOP) is null THEN 0 ELSE sum(fpPOP) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpPOP) is null THEN 0 ELSE sum(fpPOP) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpPOP) is null THEN 0 ELSE sum(fpPOP) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpPOP) is null THEN 0 ELSE sum(fpPOP) END ELSE 0  END) AS b2 from ( select tbl.fpPOP,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh144tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


 //....................//145 Number of Male condoms provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh145 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpCondomM+fpCondomMBk) is null THEN 0 ELSE sum(fpCondomM+fpCondomMBk) END)  COUNTDATA from ( select tbl.fpCondomM,tbl.fpCondomMBk,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh145 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh145tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpCondomM+fpCondomMBk) is null THEN 0 ELSE sum(fpCondomM+fpCondomMBk) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpCondomM+fpCondomMBk) is null THEN 0 ELSE sum(fpCondomM+fpCondomMBk) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpCondomM+fpCondomMBk) is null THEN 0 ELSE sum(fpCondomM+fpCondomMBk) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpCondomM+fpCondomMBk) is null THEN 0 ELSE sum(fpCondomM+fpCondomMBk) END ELSE 0  END) AS b2 from ( select tbl.fpCondomM,tbl.fpCondomMBk,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh145tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

 //....................//146 Number of Female Condoms provided during reporting period //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh146 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpCondomF+fpCondomFBk) is null THEN 0 ELSE sum(fpCondomF+fpCondomFBk) END)  COUNTDATA from ( select tbl.fpCondomF,tbl.fpCondomFBk,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh146 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh146tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpCondomF+fpCondomFBk) is null THEN 0 ELSE sum(fpCondomF+fpCondomFBk) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpCondomF+fpCondomFBk) is null THEN 0 ELSE sum(fpCondomF+fpCondomFBk) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpCondomF+fpCondomFBk) is null THEN 0 ELSE sum(fpCondomF+fpCondomFBk) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpCondomF+fpCondomFBk) is null THEN 0 ELSE sum(fpCondomF+fpCondomFBk) END ELSE 0  END) AS b2 from ( select tbl.fpCondomF,tbl.fpCondomFBk,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh146tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

 //....................//147 Number of Emergency contraception provided during reporting period (Strips) //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh147 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(fpEC+fpECBk) is null THEN 0 ELSE sum(fpEC+fpECBk) END)  COUNTDATA from ( select tbl.fpEC,tbl.fpECBk,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptfprhdshb1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh147 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh147tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(fpEC+fpECBk) is null THEN 0 ELSE sum(fpEC+fpECBk) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(fpEC+fpECBk) is null THEN 0 ELSE sum(fpEC+fpECBk) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(fpEC+fpECBk) is null THEN 0 ELSE sum(fpEC+fpECBk) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(fpEC+fpECBk) is null THEN 0 ELSE sum(fpEC+fpECBk) END ELSE 0  END) AS b2 from ( select tbl.fpEC,tbl.fpECBk,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptfprhdshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh147tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

 //....................//148 Total number of clean delivery kit provided //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh148 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(ancdk) is null THEN 0 ELSE sum(ancdk) END)  COUNTDATA from ( select tbl.ancdk,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptandshb1 where ancdk is not null and ancdk<>999 and ancdk>0 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`fprh148 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh148tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(ancdk) is null THEN 0 ELSE sum(ancdk) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(ancdk) is null THEN 0 ELSE sum(ancdk) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(ancdk) is null THEN 0 ELSE sum(ancdk) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(ancdk) is null THEN 0 ELSE sum(ancdk) END ELSE 0  END) AS b2 from ( select tbl.ancdk,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptandshb1 where ancdk is not null and ancdk<>999 and ancdk>0  and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh148tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

 //....................//149 Total number of new born kit provided //....................//


            /********** TSP, ORG , Gender **********/
exports.fprh149 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,( CASE  WHEN sum(annbk) is null THEN 0 ELSE sum(annbk) END)  COUNTDATA from ( select tbl.annbk,tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptandshb1 where annbk is not null and annbk<>999 and annbk>0 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli29 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.fprh149tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F, (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) allTotal from ( select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN ageinDay<1825 and regsex=1 THEN CASE  WHEN sum(annbk) is null THEN 0 ELSE sum(annbk) END ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN CASE  WHEN sum(annbk) is null THEN 0 ELSE sum(annbk) END ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN CASE  WHEN sum(annbk) is null THEN 0 ELSE sum(annbk) END ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN CASE  WHEN sum(annbk) is null THEN 0 ELSE sum(annbk) END ELSE 0  END) AS b2 from ( select tbl.annbk,tbl.regid,tbl.providedDate,tbl.providedVillage,tbl.orgcode,tbl.donorcode,tbl.projectcode,tbl.tspcode,tbl.providedPlace, tbl.clncode,tbl.divcode,tbl.clnName,tbl.tspname,tbl.orgname, tbl.regDate,tbl.regSex,tbl.regAGe,tbl.regageunit,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday from( select * from view_rptandshb1 where annbk is not null and annbk<>999 and annbk>0  and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )   tbl ) inner1 group by orgname,tspname,clnname,ageinday,regSex  ) inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('fprh149tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
