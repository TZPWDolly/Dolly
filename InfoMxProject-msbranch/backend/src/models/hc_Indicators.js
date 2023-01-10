//Module
const oracledb = require('oracledb');

//Models
const {db} = require('./database');

//Helper
const ck = require('../helper/checkTbl');




//....................//1 Number of paitents who registered in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc1 = async (a) => {
                try{
                    const connection = await oracledb.getConnection(db);
                        console.log('db connected: ', connection);
                        sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rpthc1dshb1  where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
                        const result = await connection.execute(sql,[],{
                          outFormat: oracledb.OBJECT
                        });
                        console.log(`hc1 ${a.by} result: `, result.rows);
                        await connection.close(); 
                        return result.rows;
                } catch (error) {
                    throw (error);
                }
} 
            /********** DATA TABLE **********/
exports.hc1tbl = async (a) => {
                try{
                    const connection = await oracledb.getConnection(db);
                        console.log('db connected: ', connection);
                        sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rpthc1dshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
                        const result = await connection.execute(sql,[],{
                          outFormat: oracledb.OBJECT
                        });
                        console.log('hc1tbl result: ', result.rows);
                        await connection.close(); 
                        return result.rows;
                } catch (error) {
                    throw (error);
                }
} 

//....................//2 Number of patients who received health care services in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc2 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rpthc2dshb2 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`hc2 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.hc2tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rpthc2dshb2 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('hc2tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 

//....................//3 Number of Pregnant Women who received ANC services in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc3 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rpthc3dshb3 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`hc3 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}                                   
            /********** DATA TABLE **********/
exports.hc3tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rpthc3dshb3 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('hc3tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 

//....................//4 Number of Delivery (still birth + live birth) in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc4 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from VIEW_RPTHC4DSHB4 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`hc4 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.hc4tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1,
		(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2,
		(CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL
		from (
		select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
        (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender
		from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,			
			tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from VIEW_RPTHC4DSHB4 
             where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('hc4tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

//....................//5 Number of Women who received PNC services after delivery in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc5 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from VIEW_RPTHC5DSHB5 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`hc5 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.hc5tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from VIEW_RPTHC5DSHB5 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('hc5tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 

//....................//6 Number of women who received FP services in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc6 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rpthc6dshb6 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`hc6 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.hc6tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rpthc6dshb6 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('hc6tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

//....................//7 Number of women who received Reproductive Health Care services in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc7 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rpthc7dshb7 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`hc7 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.hc7tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rpthc7dshb7 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('hc7tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

//....................//8 Number of patients who received General health care services in this reporting periods//....................//

            /********** TSP, ORG , Gender **********/
exports.hc8 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER, COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName from ( select * from view_rpthc8dshb8 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`hc8 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.hc8tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME,(CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.orgCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname from ( select * from view_rpthc8dshb8 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('hc8tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
