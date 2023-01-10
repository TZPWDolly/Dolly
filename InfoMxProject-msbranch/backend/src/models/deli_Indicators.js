//Module
const oracledb = require('oracledb');

//Models
const {db} = require('./database');

//Helper
const ck = require('../helper/checkTbl');


//....................//29 Total number of deliveries (live births+still births) during reporting period//....................//

            /********** TSP, ORG , Gender **********/
exports.deli29 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where  (deliBDeliOutcome>=1  and deliBDeliOutcome<>999 and deliBDeliOutcome is not null) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
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
exports.deli29tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where (deliBDeliOutcome>=1  and deliBDeliOutcome<>999 and deliBDeliOutcome is not null) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli29tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

//....................//30 Total number of live birth during reporting period//....................//

            /********** TSP, ORG , Gender **********/
exports.deli30 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where  (deliBDeliOutcome=2 or deliBDeliOutcome=3 or deliBDeliOutcome=4) and (deliBDeliOutcome<>999 and deliBDeliOutcome is not null) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli30 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.deli30tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where  (deliBDeliOutcome=2 or deliBDeliOutcome=3 or deliBDeliOutcome=4) and (deliBDeliOutcome<>999 and deliBDeliOutcome is not null) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli30tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................//31 Total number of home deliverieduring reporting period//....................//

            /********** TSP, ORG , Gender **********/
exports.deli31 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where  (providedPlace=4) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli31 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.deli31tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where  (providedPlace=4) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli31tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................//32 Total number of deliveries by skilled birth attendants during reporting period//....................//

            /********** TSP, ORG , Gender **********/
exports.deli32 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where  (skillBA=1) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli32 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.deli32tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where  (skillBA=1) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli32tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................//33 Total number of institutional (clinic) deliveries by skilled birth attendants during reporting period//....................//

            /********** TSP, ORG , Gender **********/
exports.deli33 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where  (providedPlace=1 and skillBA=1) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli33 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


            /********** DATA TABLE **********/
exports.deli33tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where  (providedPlace=1 and skillBA=1) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli33tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 
            
//....................//34 Number of new born baby who receive early initiation of breast feeding within 30 minutes after delivery//....................//

            /********** TSP, ORG , Gender **********/
exports.deli34 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where  (deliBBF1=1 or deliBBF2=1 or deliBBF3=1) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli34 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.deli34tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where  (deliBBF1=1 or deliBBF2=1 or deliBBF3=1) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli34tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................//35 Total number of deliveries with Low Birth Weight baby (<2.5 kg)//....................//

            /********** TSP, ORG , Gender **********/
exports.deli35 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where ( (deliBWt1<2.5 and deliBWt1<>0) or  (deliBWt2<2.5 and deliBWt2<>0 ) or (deliBWt3<2.5 and deliBWt3<>0) ) and  (deliBDeliOutcome=2 or deliBDeliOutcome=3 or deliBDeliOutcome=4) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli35 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.deli35tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where ( (deliBWt1<2.5 and deliBWt1<>0) or  (deliBWt2<2.5 and deliBWt2<>0 ) or (deliBWt3<2.5 and deliBWt3<>0) ) and  (deliBDeliOutcome=2 or deliBDeliOutcome=3 or deliBDeliOutcome=4) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli35tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................//36 Total number of referral cases during delivery processes to higher facilities due to any complications//....................//

            /********** TSP, ORG , Gender **********/
exports.deli36 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where (deliMOutcome=3) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli36 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


            /********** DATA TABLE **********/
exports.deli36tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where (deliMOutcome=3) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli36tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................//37 Total number of referral cases during delivery processes to Government health facilities due to any complications//....................//

            /********** TSP, ORG , Gender **********/
exports.deli37 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where (deliMOutcome=3 and deliMRefto=1) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli37 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.deli37tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where (deliMOutcome=3 and deliMRefto=1) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli37tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................//38 Number of women who received ANC at least 4 times selfreported at the time of delivery//....................//

            /********** TSP, ORG , Gender **********/
exports.deli38 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex1 where (deliANSelfRep>=4) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli38 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


            /********** DATA TABLE **********/
exports.deli38tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.deliBDeliOutcome,tbl.deliMOutcome,tbl.deliMRefto,tbl.deliBOutcome,deliBRefto,deliBBF1,deliBBF2,deliBBF3,deliBWt1,deliBWt2,deliBWt3,deliANSelfRep, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb1 where (deliANSelfRep>=4) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli384tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................//39 Number of newborn with low birth weight (<2.5kg)//....................//

            /********** TSP, ORG , Gender **********/
exports.deli39 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.bbftotal, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptdelidshborgtspsex2 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`deli39 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


            /********** DATA TABLE **********/
exports.deli39tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.bbftotal, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptdelidshb2 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('deli39tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            