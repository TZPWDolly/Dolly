//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

//1)Total Number of family planning client visits
exports.fpReportOne = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportOne parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.fpNewAcceptor,tbl.clnid 
from (  select * from view_rptfp1 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1 where  tbl1.visitType=${type})  inner1  )  inner2`
        
        console.log('fpReportOne in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportOne result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//2)Total Number of family planning client visit for short- term method
exports.fpReportTwo = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportTwo parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.fpNewAcceptor,tbl.clnid 
from ( select * from view_rptfp2 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl   )  tbl1 where  tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('fpReportTwo in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportTwo result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//3)Total Number of family planning client visit for long- term method
exports.fpReportThree = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportThree parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp3  where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('fpReportThree in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportThree result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//4)Total number of family planning client visit for depo injection
exports.fpReportFour = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportFour parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp4 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where  tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportFour in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportFour result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//5)Total number of family planning client visit for Combined Oral Contraceptive Pills
exports.fpReportFive = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportFive parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.fpNewAcceptor,tbl.clnid 
from ( select * from view_rptfp5 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where  tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportFive in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportFive result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//6)Total number of family planning client visit for Progestogen Only Pills
exports.fpReportSix = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportSix parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,   (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  ,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp6 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where  tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportSix in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportSix result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//7)Total number of family planning client visit for Condoms
exports.fpReportSeven = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportSeven parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.fpNewAcceptor,tbl.clnid 
from ( select * from view_rptfp7 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where  tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportSeven in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportSeven result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//8)Total number of family planning client visit for EC Pills
exports.fpReportEight = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportEight parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp8 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where  tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportEight in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportEight result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//9)Total Number of family planning client visit for Implant Insertion
exports.fpReportNine = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportNine parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp9 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportNine in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportNine result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//10)Total Number of family planning client visit for IUD Insertion
exports.fpReportTen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportTen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp10 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where  tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportTen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportTen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//11)Total Number of family planning client visit for Counseling Services
exports.fpReportEleven = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportEleven parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp11 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where  tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportEleven in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportEleven result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//12)Total Number of family planning client visit who received UCG Test 
exports.fpReportTwelve = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportTwelve parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  ,tbl.fpNewAcceptor,tbl.clnid 
from (select * from view_rptfp12 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1  where tbl1.visitType=${type})  inner1  )  inner2`

        console.log('fpReportTwelve in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportTwelve result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//13)Total Number of family planning client visit who received HIV Testing and Counseling
exports.fpReportThirteen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pnfporg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("fpReportThirteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tsp,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.fpNewAcceptor ,tbl1.tspId 
from (  select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tsp,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  ,tbl.fpNewAcceptor,tbl.clnid 
from ( select * from view_rptfp13 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) tbl   )  tbl1 where  tbl1.visitType=${type} )  inner1  )  inner2`

        console.log('fpReportThirteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('fpReportThirteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}