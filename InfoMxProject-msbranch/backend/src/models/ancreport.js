//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

//1)Number of pregnant women who received first ANC visit
exports.ancReportOne = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportOne parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnTsp,tbl1.tspid 
from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.clnId,tbl.providerPosition,tbl.clnTsp,tbl.tspid 
from ( select distinct(regid),max(ang),Max(provideddate)provideddate, Max(visittype) visittype,Max(org) org,Max(donor) donor,Max(providedvillage) providedvillage,  Max(project) project, Max(providerposition) providerposition,Max(providedplace)providedplace, Max(regSex)regSex,Max(tspStateRegion)tspStateRegion,Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit) regAgeUnit,  Max(clnId) clnId,Max(clnTsp)clnTsp,Max(tspId)tspId 
from view_rptan1   where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  visitnumber=1 and visittype=${type} group  by regid,ang )  tbl )  tbl1 )  inner1  )  inner2`

        console.log('ancReportOne in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportOne result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//2)Number of pregnant women who received first ANC visit up to 14 weeks of gestation
exports.ancReportTwo = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportTwo parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2  from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp  from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,  tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
        from ( select * from view_rptan2 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and visitnumber=1 and gpVisitNumber=1 and visittype=${type})  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportTwo in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportTwo result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//3)Number of pregnant women who received ANC at least 4 times
exports.ancReportThree = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportThree parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.clnId,tbl1.clnTsp 
    from  ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday , tbl.clnId,tbl.providerPosition,tbl.clnTsp 
    from ( select distinct(regid),Max(provideddate)provideddate, Max(visittype) visittype,Max(org) org,Max(donor) donor,Max(providedvillage) providedvillage, Max(project) project, Max(providerposition) providerposition, Max(providedplace)providedplace,Max(visitnumber) as visitnumber,Max(gpVisitNumber)gpVisitNumber,Max(regDate)regDate,Max(regAge)regAge,Max(regAgeUnit) regAgeUnit, Max(regSex)regSex, Max(clnId) clnId,Max(clnTsp)clnTsp,Max(tspId)tspId 
    from view_rptan3 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and visitnumber=4 and visittype=${type}  group  by regid,ang )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportThree in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportThree result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//4)Number of pregnant women who received ANC at least 4 times by skilled providers
exports.ancReportFour = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportFour parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2  from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
    from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,  tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
    from  ( select * from view_rptan4 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and anVisitSkill=4 and visittype=${type} )  tbl  )  tbl1 ) inner1  )  inner2`

        console.log('ancReportFour in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportFour result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//5)Number of pregnant women who received ANC at least 4 times according to standard schedule
exports.ancReportFive = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportFive parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
  from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  , tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
  from ( select * from view_rptan5 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  anVisitTiming=4 and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportFive in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportFive result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//6)Number of pregnant women who received ANC at least 4 times according to standard schedule by skilled providers
exports.ancReportSix = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportSix parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
from ( select * from view_rptan6  where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and anVisitTimingSkill=4 and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportSix in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportSix result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//7)Total number of ANC visits provided by health workers
exports.ancReportSeven = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportSeven parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition 
from  ( select * from view_rptan7 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportSeven in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportSeven result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//8)Number of pregnant women who received FeSO4 supplementation at least 91 tabs from health workers during pregnancy
exports.ancReportEight = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportEight parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from ( select tbl.regid,tbl.providedDate,tbl.vtype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday , tbl.clnId,tbl.providerPosition from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit  from  (select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anFeSO4) AS feso4, MAX(tbl_anc.anClnId) AS clnId 
FROM tbl_anc 
WHERE tbl_anc.anFeSO4 IS NOT NULL  AND tbl_anc.anFeSO4 <> 999 AND tbl_anc.anStatus < 3 and anorg='CPI-05' and  (anprovideddate between DATE '2022-01-01'-INTERVAL '9' MONTH  and DATE'2022-09-01' ) 
GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anFeSO4) >= 91) t1 
inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid 
from  (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang 
from tbl_anc)  f where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid,ang ) t2  on t1.regid=t2.regid 
LEFT JOIN tbl_reg b ON t1.regid = b.regId  
group by t1.regid  )  tbl where vtype=${type}   )  inner1  )  inner2`

        console.log('ancReportEight in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportEight result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//9)Number of pregnant women who received B1 supplementation at least 30 tabs after 36 weeks of gestation
exports.ancReportNine = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportNine parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2
from ( select tbl.regid,tbl.providedDate,tbl.vtype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday , tbl.clnId,tbl.providerPosition from ( select t1.regid,Max(t1.provideddate)provideddate,Max(t1.donor)donor,Max(t1.org)org,Max(t1.project) project,Max(t1.tspId)tspId,Max(t1.clnId)clnId,Max(t1.vtype) vtype,Max(t1.providerPosition) providerPosition,Max(t1.providedPlace)providedPlace,Max(b.regDate)regDate,Max(b.regSex)regSex,Max(b.regAge)regAge,Max(b.regAgeUnit)regAgeUnit  from  (select  tbl_anc.anRegId AS regid, MAX(tbl_anc.anProvidedDate) AS provideddate,MAX(tbl_anc.anType) AS vType, MAX(tbl_anc.anOrg) AS org, MAX(tbl_anc.anDonor) AS donor, MAX(tbl_anc.anVillage) AS providedVillage,MAX(tbl_anc.anProject) AS project, MAX(tbl_anc.anProviderPosition) AS providerPosition, MAX(tbl_anc.anTsp) AS tspId,  MAX(tbl_anc.anPlace) AS providedplace, MAX(tbl_anc.anVisit) AS visitnumber, SUM(tbl_anc.anB1) AS B1, MAX(tbl_anc.anClnId) AS clnId 
FROM tbl_anc  WHERE tbl_anc.anB1 IS NOT NULL  AND tbl_anc.anB1 <> 999 AND tbl_anc.anStatus < 3 and anorg='CPI-05' and  (anprovideddate between DATE '2022-01-01'-INTERVAL '9' MONTH  and DATE'2022-09-01' ) 
GROUP BY tbl_anc.anRegId , tbl_anc.anG HAVING SUM(tbl_anc.anB1) >= 30) t1 
inner join (select regid,ang,Max(provideddate)provideddate ,Max(org)org,Max(donor)donor,Max(project)project,Max(tspid)tspid,Max(clnid)clnid 
from  (select anregid as regid, anprovideddate as provideddate, anorg as org, andonor as donor, anproject as project, antsp as tspid, anclnid as clnid,ang 
from tbl_anc)  f where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid,ang ) t2  on t1.regid=t2.regid 
LEFT JOIN tbl_reg b ON t1.regid = b.regId   group by t1.regid  )  tbl where vtype=${type}   )  inner1  )  inner2`

        console.log('ancReportNine in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportNine result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//10)Number of pregnant women who received deworming first dose by health workers
exports.ancReportTen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportTen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
from ( select * from view_rptan10 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  anDeworm1=1 and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportTen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportTen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//11)Number of pregnant women who received deworming second dose by health workers
exports.ancReportEleven = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportEleven parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
    from ( select * from view_rptan11 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  anDeworm2=1 and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportEleven in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportEleven result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//12)Number of pregnant women who received TT immunization first dose by health workers
exports.ancReportTwelve = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportTwelve parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = ` select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
    from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday , tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
    from ( select * from view_rptan12  where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  anTT1=1 and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportTwelve in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportTwelve result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//13)Number of pregnant women who received TT immunization second dose by health workers
exports.ancReportThirteen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportThirteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
    from   ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.clnId,tbl.clnName,tbl.providerPosition,tbl.clnTsp 
    from ( select * from view_rptan13 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  anTT2=1 and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportThirteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportThirteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//14)Total number of malaria screening tests received by pregnant women
exports.ancReportFourteen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportFourteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition 
    from ( select * from view_rptan14  where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportFourteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportFourteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//15)Total number of HIV counselling and testing services received by pregnant women
exports.ancReportFifteen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportFifteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
    from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  ,tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition 
    from (select * from view_rptan15 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportFifteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportFifteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//16)Total number of urine protein tests received by pregnant women
exports.ancReportSixteen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportSixteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
    from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition 
    from ( select * from view_rptan16 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportSixteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportSixteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//17)Total number of urine sugar tests received by pregnant women
exports.ancReportSeventeen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportSeventeen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
    from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition 
    from ( select * from view_rptan17 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and  visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportSeventeen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportSeventeen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//18)Total number of health education services received by pregnant women
exports.ancReportEighteen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportEighteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
    from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
    from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday ,tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition 
    from ( select * from view_rptan18 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportEighteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportEighteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//19)Total number of referral services to higher facilities during ANC
exports.ancReportNineteen = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportNineteen parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2
 from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
 from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  ,tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition 
 from ( select * from view_rptan19  where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and visittype=${type} )  tbl )  tbl1 )  inner1  )  inner2`

        console.log('ancReportNineteen in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportNineteen result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

//20)Total number of referral services to government health facilities during ANC
exports.ancReportTwenty = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        const { parameter, select, type } = a //parameter.orgID,parameter.type
        const org = select[0].length > 0 && select[0] === parameter.orgID ? " and org in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " and org in ('" + select[0].join("','") + "')" : ''
        const proj = select[1].length > 0 ? " and project in ('" + select[1].join("','") + "')" : ''
        const cln = select[2].length > 0 ? " and clnId in ('" + select[2].join("','") + "')" : ''
        const tsp = select[3].length > 0 ? " and tspid in ('" + select[3].join("','") + "')" : ''
        const pndeliorg = select[0].length > 0 && select[0] === parameter.orgID ? " in ('" + parameter.orgID + "')" :
            select[0].length > 0 ? " in ('" + select[0].join("','") + "')" : ''
        console.log('db connected: ', connection);
        console.log("ancReportTwenty parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

        sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
  from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.tspId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspStateRegion,tbl1.clnId,tbl1.clnName,tbl1.clnTsp 
  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.tspId,tbl.providedPlace,tbl.regSex,tbl.tspStateRegion, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  ,tbl.clnId,tbl.clnName,tbl.clnTsp,tbl.providerPosition
  from ( select * from view_rptan20 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and visittype=${type} )  tbl  )  tbl1 )  inner1  )  inner2`

        console.log('ancReportTwenty in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('ancReportTwenty result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

