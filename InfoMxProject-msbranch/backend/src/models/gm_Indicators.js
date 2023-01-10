//Module
const oracledb = require('oracledb');

//Models
const {db} = require('./database');

//Helper
const ck = require('../helper/checkTbl');


//....................85 Total number ofMalaria (PF) + cases....................//


            /********** TSP, ORG , Gender **********/
exports.gm85 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=28 OR dx2=28 OR dx3=28) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm85 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm85tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=28 OR dx2=28 OR dx3=28) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm85tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................86 Total number ofMalaria (PV) + cases durig the reporting period....................//


            /********** TSP, ORG , Gender **********/
exports.gm86 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=29 OR dx2=29 OR dx3=29) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm86 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm86tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=29 OR dx2=29 OR dx3=29) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm86tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 


//....................87 Total number of Measles case....................//

            /********** TSP, ORG , Gender **********/
exports.gm87 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=30 OR dx2=30 OR dx3=30) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm87 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm87tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=30 OR dx2=30 OR dx3=30) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm87tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................88 Total number of Watery Diarrhoea cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm88 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=50 OR dx2=50 OR dx3=50) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm88 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm88tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=50 OR dx2=50 OR dx3=50) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm88tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................89 Total number of Diarrhoea treated with ORS cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm89 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=11 OR dx2=11 OR dx3=11) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm89 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm89tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=11 OR dx2=11 OR dx3=11) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm89tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}   


//....................90 Total number of Diarrhoea treated with ORS+Zinc cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm90 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=12 OR dx2=12 OR dx3=12) 
                and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm90 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm90tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=12 OR dx2=12 OR dx3=12) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm90tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}   


//....................91 Total number of Dysentery....................//

            /********** TSP, ORG , Gender **********/
exports.gm91 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            const sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=13 OR dx2=13 OR dx3=13) 
                and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
                
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm91 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm91tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            const sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=13 OR dx2=13 OR dx3=13) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm91tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................92 Total number of Upper Respiratory Tract Infection....................//

            /********** TSP, ORG , Gender **********/
exports.gm92 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            const sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
                select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
                tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
                tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=48 OR dx2=48 OR dx3=48) 
                and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
                ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm92 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm92tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            const sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=48 OR dx2=48 OR dx3=48) 
 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm92tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 


//....................93 Total number of Lower Respiratory Tract Infection case....................//

            /********** TSP, ORG , Gender **********/
exports.gm93 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
 where   (  dx1=27 OR dx2=27 OR dx3=27) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm93 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
       
            /********** DATA TABLE **********/
exports.gm93tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=27 OR dx2=27 OR dx3=27) 
 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm93tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}   


//....................94 Total number of Pneumonia treated with antibiotics cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm94 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
 where   (  dx1=37 OR dx2=37 OR dx3=37) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm94 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm94tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=37 OR dx2=37 OR dx3=37) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm94tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}


//....................95 Total number of TB(suspected ) case....................//

            /********** TSP, ORG , Gender **********/
exports.gm95 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
 where   (  dx1=46 OR dx2=46 OR dx3=46) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm95 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm95tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=46 OR dx2=46 OR dx3=46) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm95tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................96 Total number of TB(confirm ) cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm96 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
 where   (  dx1=45 OR dx2=45 OR dx3=45) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm96 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm96tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=45 OR dx2=45 OR dx3=45) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm96tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................97 Total number of Hypertension case....................//

            /********** TSP, ORG , Gender **********/
exports.gm97 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
 where   (  dx1=23 OR dx2=23 OR dx3=23) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm97 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm97tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
 where   (  dx1=23 OR dx2=23 OR dx3=23) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm97tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................98 Total number of Anaemia Case....................//

            /********** TSP, ORG , Gender **********/
exports.gm98 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=3 OR dx2=3 OR dx3=3) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm98 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm98tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=3 OR dx2=3 OR dx3=3) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm98tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................99 Total number of Intestinal worm cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm99 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=24 OR dx2=24 OR dx3=24) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm99 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm99tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=24 OR dx2=24 OR dx3=24) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm99tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................100 Total number of Diabetes cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm100 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=10 OR dx2=10 OR dx3=10) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm100 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm100tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=10 OR dx2=10 OR dx3=10) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm100tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................101 Total number of HIV/AIDS suspected cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm101 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=2 OR dx2=22 OR dx3=22) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm101 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm101tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=2 OR dx2=22 OR dx3=22) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm101tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................102 Total number of HIV/AIDS confirmcases....................//

            /********** TSP, ORG , Gender **********/
exports.gm102 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=21 OR dx2=21 OR dx3=21) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm102 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm102tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=21 OR dx2=21 OR dx3=21) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm102tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................103 Total number ofUrinary Tract Infection cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm103 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=49 OR dx2=49 OR dx3=49) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm103 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm103tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=49 OR dx2=49 OR dx3=49) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm103tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................104 Total number ofSexually Transmitted Infection cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm104 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=42 OR dx2=42 OR dx3=42) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm104 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm104tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=42 OR dx2=42 OR dx3=42) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm104tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................105 Total number of Acute(moderate/Severe) Malnutrition case....................//

            /********** TSP, ORG , Gender **********/
exports.gm105 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=2 OR dx2=2 OR dx3=2) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm105 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm105tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=2 OR dx2=2 OR dx3=2) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm105tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................106 Total number of Gastritis case....................//

            /********** TSP, ORG , Gender **********/
exports.gm106 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=17 OR dx2=17 OR dx3=17) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm106 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm106tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=17 OR dx2=17 OR dx3=17) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm106tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................107 Total number of Skin Infection cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm107 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=43 OR dx2=43 OR dx3=43) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm107 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm107tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=43 OR dx2=43 OR dx3=43) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm107tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................108 Total number of Arthritis cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm108 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=5 OR dx2=5 OR dx3=5) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm108 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm108tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=5 OR dx2=5 OR dx3=5) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm108tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................109 Total number of Hepatatis cases....................//

            /********** TSP, ORG , Gender **********/
exports.gm109 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=20 OR dx2=20 OR dx3=20) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm109 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm109tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=20 OR dx2=20 OR dx3=20) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm109tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................110 Total number of Surgical Case....................//

            /********** TSP, ORG , Gender **********/
exports.gm110 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=44 OR dx2=44 OR dx3=44) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm110 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm110tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=44 OR dx2=44 OR dx3=44) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm110tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................111 Total number of Wounds Case....................//

            /********** TSP, ORG , Gender **********/
exports.gm111 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=51 OR dx2=51 OR dx3=51) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm111 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm111tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=51 OR dx2=51 OR dx3=51) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm111tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................112 Total number of Dengue hemorrhagic fever (Severe Dengue)....................//

            /********** TSP, ORG , Gender **********/
exports.gm112 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=8 OR dx2=8 OR dx3=8) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm112 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm112tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=8 OR dx2=8 OR dx3=8) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm112tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................113 Total number of Dengue fever case....................//

            /********** TSP, ORG , Gender **********/
exports.gm113 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=7 OR dx2=7 OR dx3=7) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm113 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm113tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=7 OR dx2=7 OR dx3=7) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm113tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................114 Total number of Beri Beri case....................//

            /********** TSP, ORG , Gender **********/
exports.gm114 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=6 OR dx2=6 OR dx3=6) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm114 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm114tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=6 OR dx2=6 OR dx3=6) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm114tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................115 Total number of Eyes Problem case....................//

            /********** TSP, ORG , Gender **********/
exports.gm115 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=16 OR dx2=16 OR dx3=16) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm115 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm115tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=16 OR dx2=16 OR dx3=16) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm115tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................116 Total number of Dental Problem case....................//

            /********** TSP, ORG , Gender **********/
exports.gm116 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=9 OR dx2=9 OR dx3=9) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm116 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm116tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=9 OR dx2=9 OR dx3=9) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm116tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................117 Total number of Mental Healthcase....................//

            /********** TSP, ORG , Gender **********/
exports.gm117 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=31 OR dx2=31 OR dx3=31) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm117 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm117tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=31 OR dx2=31 OR dx3=31) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm117tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................118 Total number of Gynaecologycase....................//

            /********** TSP, ORG , Gender **********/
exports.gm118 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=19 OR dx2=19 OR dx3=19) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm118 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm118tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=19 OR dx2=19 OR dx3=19) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm118tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................119 Total number of Gun Shot Injury case....................//

            /********** TSP, ORG , Gender **********/
exports.gm119 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=18 OR dx2=9 OR dx3=18) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm119 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm119tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=18 OR dx2=9 OR dx3=18) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm119tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................120 Total number of Landmine Injury case....................//

            /********** TSP, ORG , Gender **********/
exports.gm120 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=25 OR dx2=25 OR dx3=25) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm120 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm120tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=25 OR dx2=25 OR dx3=25) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm120tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................121 Total number of Road Traffic Injury case....................//

            /********** TSP, ORG , Gender **********/
exports.gm121 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=40 OR dx2=40 OR dx3=40) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm121 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm121tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=40 OR dx2=40 OR dx3=40) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm121tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................122 Total number of Other Injury case....................//

            /********** TSP, ORG , Gender **********/
exports.gm122 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=35 OR dx2=35 OR dx3=35) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm122 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm122tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=35 OR dx2=35 OR dx3=35) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm122tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................123 Total number of Abortion case....................//

            /********** TSP, ORG , Gender **********/
exports.gm123 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=1 OR dx2=1 OR dx3=1) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm123 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm123tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=1 OR dx2=1 OR dx3=1) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm123tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
            
//....................124 Total number of Sepsis case....................//

            /********** TSP, ORG , Gender **********/
exports.gm124 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=41 OR dx2=41 OR dx3=41) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm124 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm124tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=41 OR dx2=41 OR dx3=41) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm124tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................125 Total number of Eclampsia/Pre-Eclampsia case....................//

            /********** TSP, ORG , Gender **********/
exports.gm125 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=14 OR dx2=14 OR dx3=14) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm125 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm125tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=14 OR dx2=14 OR dx3=14) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm125tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................126 Total number of Ante Partum Haemorrhage case....................//

            /********** TSP, ORG , Gender **********/
exports.gm126 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=4 OR dx2=4 OR dx3=4) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm126 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm126tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=4 OR dx2=4 OR dx3=4) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm126tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................127 Total number of Post Partum Haemorrhage case....................//

            /********** TSP, ORG , Gender **********/
exports.gm127 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=38 OR dx2=38 OR dx3=38) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm127 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm127tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=38 OR dx2=38 OR dx3=38) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm127tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................128 Total number of Preterm labour case....................//

            /********** TSP, ORG , Gender **********/
exports.gm128 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=39 OR dx2=39 OR dx3=39) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm128 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm128tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=39 OR dx2=39 OR dx3=39) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm128tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................129 Total number of Etopic Preganacy case....................//

            /********** TSP, ORG , Gender **********/
exports.gm129 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=15 OR dx2=15 OR dx3=15) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm129 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm129tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=15 OR dx2=15 OR dx3=15) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm129tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................130 Total number of Molar Pregnancy case....................//

            /********** TSP, ORG , Gender **********/
exports.gm130 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=32 OR dx2=32 OR dx3=32) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm130 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm130tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=32 OR dx2=32 OR dx3=32) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm130tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................131 Total number of Neonatal Jaundice case....................//

            /********** TSP, ORG , Gender **********/
exports.gm131 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=33 OR dx2=33 OR dx3=33) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm131 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm131tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=33 OR dx2=33 OR dx3=33) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm131tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................132 Total number of Neonatal Sepsis case....................//

            /********** TSP, ORG , Gender **********/
exports.gm132 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=34 OR dx2=34 OR dx3=34) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm92 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.gm132tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=34 OR dx2=34 OR dx3=34) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm132tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................133 Total number of Umbilical Infection case....................//

            /********** TSP, ORG , Gender **********/
exports.gm133 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=47 OR dx2=47 OR dx3=47) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm133 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm133tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=47 OR dx2=47 OR dx3=47) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm133tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................134 Total number of Low Birth weight case....................//

            /********** TSP, ORG , Gender **********/
exports.gm134 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 where   (  dx1=26 OR dx2=26 OR dx3=26) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm134 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm134tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 where   (  dx1=26 OR dx2=26 OR dx3=26)  and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm134tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................135 Total number of Other Neonatal Cases case....................//

            /********** TSP, ORG , Gender **********/
exports.gm135 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=36 OR dx2=36 OR dx3=36) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm135 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm135tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=36 OR dx2=36 OR dx3=36) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm135tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            
//....................136 Total number of Other casescase....................//

            /********** TSP, ORG , Gender **********/
exports.gm136 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID)  COUNTDATA  from (
            select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
            tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rptgmdshborgtspsex1 
     where   (  dx1=52 OR dx2=52 OR dx3=52) 
            and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}')  
            ) tbl ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`gm136 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.gm136tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,
			tbl.facility,tbl.dx1,tbl.dx2,tbl.outcome,tbl.gmstatus,
			tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rptgmdshb1 
     where   (  dx1=52 OR dx2=52 OR dx3=52) 
              and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('gm136tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            

            