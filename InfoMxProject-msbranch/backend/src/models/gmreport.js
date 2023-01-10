//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

//1)Total number of Malaria (PF) + cases 
exports.gmReport1 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReportOne parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm1 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReportOne in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReportOne result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//2)Total number of Malaria (PV) + cases durig the reporting period
exports.gmReport2 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReportTwo parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm2 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReportTwo in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReportTwo result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//3)Total number of Measles case 
exports.gmReport3 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport3 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm3 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport3 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport3 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//4)Total number of Watery Diarrhoea cases 
exports.gmReport4 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport4 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm4 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport4 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport4 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//5)Total number of Diarrhoea treated with ORS cases 
exports.gmReport5 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport5 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm5 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport5 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport5 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//6)Total number of Diarrhoea treated with ORS+Zinc cases 
exports.gmReport6 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport6 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm6 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport6 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport6 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//7)Total number of Dysentery 
exports.gmReport7 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport7 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm7 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport7 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport7 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//8)Total number of Upper Respiratory Tract Infection
exports.gmReport8 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport8 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm8 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport8 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport8 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//9)Total number of Lower Respiratory Tract Infection case 
exports.gmReport9 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport9 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm9 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport9 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport9 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//10)Total number of Pneumonia treated with antibiotics cases 
exports.gmReport10 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport10 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm10 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport10 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport10 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//11)Total number of TB(suspected ) case 
exports.gmReport11 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport11 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm11 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport11 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport11 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//12)Total number of TB(confirm ) cases 
exports.gmReport12 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport12 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm12 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport12 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport12 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//13)Total number of Hypertension case 
exports.gmReport13 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport13 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm13 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport13 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport13 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//14)Total number of Anaemia Case 
exports.gmReport14 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport14 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm14 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport14 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport14 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//15)Total number of Intestinal worm cases 
exports.gmReport15 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport15 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm15 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport15 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport15 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//16)Total number of Diabetes cases 
exports.gmReport16 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport16 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm16 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport16 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport16 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//17)Total number of HIV/AIDS suspected cases 
exports.gmReport17 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport17 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm17 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport17 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport17 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//18)Total number of HIV/AIDS confirmcases 
exports.gmReport18 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport18 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm18 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport18 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport18 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//19)Total number of Urinary Tract Infection cases 
exports.gmReport19 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport19 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm19 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport19 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport19 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//20)Total number of Sexually Transmitted Infection cases 
exports.gmReport20 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport20 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm20 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport20 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport20 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//21) Total number of Acute(moderate/Severe) Malnutrition case
exports.gmReport21 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport21 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm21 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport21 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport21 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//22)Total number of Gastritis case
exports.gmReport22 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReportTwo parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm22 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport22 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport22 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//23)Total number of Skin Infection cases
exports.gmReport23 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport23 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm23 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport23 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport23 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//24)Total number of Arthritis cases
exports.gmReport24 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport24 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm24 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport24 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport24 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//25) Total number of Hepatatis cases
exports.gmReport25 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport25 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm25 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport25 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport25 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//26)Total number of Surgical Case
exports.gmReport26 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport26 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm26 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport26 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport26 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//27)Total number of Wounds Case
exports.gmReport27 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport27 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm27 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport27 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport27 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//28)Total number of Dengue hemorrhagic fever (Severe Dengue)
exports.gmReport28 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport28 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm28 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport28 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport28 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//29)Total number of Dengue fever case
exports.gmReport29 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport29 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm29 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport29 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport29 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//30)Total number of Beri Beri case
exports.gmReport30 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport30 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm30 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport30 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport30 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//31)Total number of Eyes Problem case
exports.gmReport31 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport31 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm31 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport31 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport31 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//32)Total number of Dental Problem case
exports.gmReport32 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport32 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm32 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport32 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport32 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//33)Total number of Mental Healthcase
exports.gmReport33 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport33 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm33 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport33 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport33 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//34)Total number of Gynaecologycase
exports.gmReport34 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport34 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm34 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport34 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport34 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//35)Total number of Gun Shot Injury case
exports.gmReport35 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport35 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm35 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport35 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport35 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//36)Total number of Landmine Injury case
exports.gmReport36 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport36 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm36 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport36 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport36 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//37)Total number of Road Traffic Injury case
exports.gmReport37 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport37 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm37 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport37 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport37 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//38)Total number of Other Injury case
exports.gmReport38 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport38 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm38 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport38 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport38 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//39)Total number of Abortion case
exports.gmReport39 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport39 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm39 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport39 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport39 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//40)Total number of Sepsis case
exports.gmReport40 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport40 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm40 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport40 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport40 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//41)Total number of Eclampsia/Pre-Eclampsia case
exports.gmReport41 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport41 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm41 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport41 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport41 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//42)Total number of Ante Partum Haemorrhage case
exports.gmReport42 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport42 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm42 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport42 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport42 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//43)Total number of Post Partum Haemorrhage case
exports.gmReport43 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport43 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm43 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport43 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport43 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//44)Total number of Preterm labour case
exports.gmReport44 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport44 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm44 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport44 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport44 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//45)Total number of Etopic Preganacy case
exports.gmReport45 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport45 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm45 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport45 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport45 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//46)Total number of Molar Pregnancy case
exports.gmReport46 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport46 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm46 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport46 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport46 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//47)Total number of Neonatal Jaundice case
exports.gmReport47 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport47 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm47 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport47 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport47 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//48)Total number of Neonatal Sepsis case
exports.gmReport48 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport48 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm48 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport48 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport48 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//49)Total number of Umbilical Infection case
exports.gmReport49 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport49 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm49 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport49 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport49 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//50)Total number of Low Birth weight case
exports.gmReport50 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport50 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm50 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport50 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport50 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//51) Total number of Other Neonatal Cases
exports.gmReport51 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport51 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm51 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport51 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport51 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//52)Total number of Other cases
exports.gmReport52 = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pngmorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("gmReport52 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.clnId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select * from view_rptgm52 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('gmReport52 in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('gmReport52 result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}