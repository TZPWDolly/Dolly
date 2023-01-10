//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

//1)Number of women who received at least one PNC provided by skilled providers within 2 days after delivery
exports.pncReportOne = async (a) => {
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
    console.log("pncReport1 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
 from ( select t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday 
 from (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,(CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli, (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,(t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday  from ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype 
 FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor
 from tbl_pnc where pnorg ${pndeliorg} and  (pnprovideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) and   pnstatus<3 )  A 
 left JOIN ( 
 SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor 
 from tbl_delivery where deliorg ${pndeliorg} and  (deliprovideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') -interval '42' day and To_Date('${parameter.eDate}','YYYY-MM-DD') ) and delistatus<3)   B
 ON A.regid=B.regid 
 union all 
 SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype 
 from tbl_delivery where deliorg ${pndeliorg} and   delistatus<3  )t1 
 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and (w2dys between 0 and 2)
 group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 )inner1 
 where  inner1.visittype=${type} ) inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//2)Total number of women received at least one PNC within 42 days after delivery
exports.pncReportTwo = async (a) => {
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
    console.log("pncReport2 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2  from ( select t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday from (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,(CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli,
 (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta, 
 (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,
 (t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday 
 from ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex 
 from ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype 
 FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor 
 from tbl_pnc where pnorg ${pndeliorg} and  (pnprovideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) and   pnstatus<3 )  A
 left JOIN ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor
 from tbl_delivery where deliorg ${pndeliorg} and  (deliprovideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') -interval '42' day and To_Date('${parameter.eDate}','YYYY-MM-DD') ) and delistatus<3)   B
 ON A.regid=B.regid 
 union all
 SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype 
 from tbl_delivery where deliorg ${pndeliorg}  and   delistatus<3  )t1 
 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3 
where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} and (w2dys between 0 and 2) and skillBA=1
 group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday 
having count(t3.regid) >=1 )inner1 where  inner1.visittype=${type} ) inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//3)Total number of women received at least one PNC within 42 days after delivery provided by skilled providers
exports.pncReportThree = async (a) => {
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
    console.log("pncReport3 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2  from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.tspId 
  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
  from (select  count(a.regid) as idCount, a.regid,min(a.providedDate)as providedDate,Max(a.visittype) visittype,Max(a.donor) donor,Max(a.project) project,Max(a.org) org,Max(a.clnID) clnId,Max(a.tspId) tspId,Max(a.regDate)regDate,Max(a.regAge)regAge,Max(a.regAgeUnit) regAgeUnit,Max(a.regSex) regSex,Max(a.providedPlace) providedPlace 
 from ( select * from view_rptpn3 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp}  ) a  group by a.regid )  tbl ) tbl1  where tbl1.visittype=${type} )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//4)Total number of PNC services provided by health workers within 42 days after delivery 
exports.pncReportFour = async (a) => {
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
    console.log("pncReport4 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.tspId 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from (select  count(a.regid) as idCount, a.regid,min(a.providedDate)as providedDate,Max(a.visittype) visittype,Max(a.donor) donor,Max(a.project) project,Max(a.org) org,Max(a.clnID) clnId,Max(a.tspId) tspId,Max(a.regDate)regDate,Max(a.regAge)regAge,Max(a.regAgeUnit) regAgeUnit,Max(a.regSex) regSex,Max(a.providedPlace) providedPlace 
from ( select * from view_rptpn4 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) a  group by a.regid )  tbl ) tbl1  where tbl1.visittype=${type} )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//5)Total number of PNC services provided by Health Workers within 42 days after delivery
exports.pncReportFive = async (a) => {
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
    console.log("pncReport5 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.tspId  
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from (select  a.regid,a.providedDate,a.visittype,a.donor,a.project,a.org,a.clnId,a.tspId,a.regDate,a.regAge,a.regAgeUnit,a.regSex,a.providedPlace 
from ( select * from view_rptpn5 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) a  )  tbl ) tbl1  where tbl1.visittype=${type} )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//6)Total number of PNC services provided by Skilled providers within 42 days after delivery
exports.pncReportSix = async (a) => {
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
    console.log("pncReport6 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.tspId 
from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from (select  a.regid,a.providedDate,a.visittype,a.donor,a.project,a.org,a.clnId,a.tspId,a.regDate,a.regAge,a.regAgeUnit,a.regSex,a.providedPlace 
from ( select * from view_rptpn6 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} ) a  )  tbl ) tbl1  where tbl1.visittype=${type} )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//7)Total number of Health Education services provided by health workers during PNC services
exports.pncReportSeven = async (a) => {
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
    console.log("pncReport7 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspId,tbl1.deliveryDate 
from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId,tbl.deliveryDate,(tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday  
from (select * from view_rptpn7 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl where tbl.visittype=${type} )  tbl1 )  inner1 )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//8)Total number of women who received vitamin B1 supplementation during PNC services
exports.pncReportEight = async (a) => {
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
    console.log("pncReport8 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspId,tbl1.deliveryDate 
from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId,tbl.deliveryDate,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select Max(regId)regId,Max(providedDate)providedDate,Max(providedVillage)providedVillage,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(clnId)clnId,  Max(providedPlace)providedPlace,Max(regDate)regDate,Max(regAge) regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(tspId)tspId,Max(deliverydate) deliveryDate 
from view_rptpn8 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid) tbl where tbl.visittype=${type} )  tbl1 )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//9)Total number of women who received vitamin A supplementation during PNC services
exports.pncReportNine = async (a) => {
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
    console.log("pncReport9parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from (select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace,tbl1.regSex,tbl1.ageinday,tbl1.tspId,tbl1.deliveryDate 
from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId,tbl.deliveryDate,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from ( select Max(regId)regId,Max(providedDate)providedDate,Max(providedVillage)providedVillage,Max(visittype)visittype,Max(org)org,Max(donor)donor,Max(project)project,Max(clnId)clnId,  Max(providedPlace)providedPlace,Max(regDate)regDate,Max(regAge) regAge,Max(regAgeUnit)regAgeUnit,Max(regSex)regSex,Max(tspId)tspId,Max(deliverydate) deliveryDate 
from view_rptpn9 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} group by regid) tbl where tbl.visittype=${type} )  tbl1 )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//10)Total number of referral cases to higher facilities due to any complications within 42 days after delivery
exports.pncReportTen = async (a) => {
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
    console.log("pncReport10 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.tspId
from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from (select * from view_rptpn10 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp}  )  tbl where tbl.visittype=${type} )  tbl1 )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}

//11)Total number of referral cases to Government Health facilities due to any complications within 42 days after delivery
exports.pncReportEleven = async (a) => {
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
    console.log("pncReport11 parameter in database ===> " + parameter.orgID, org, proj, cln, tsp) //${org} ${proj} ${cln} ${tsp}

    sql = `select  (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) age0m,(CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) age0f,(CASE  WHEN sum(b1) is null THEN 0 ELSE sum(b1) END) age2m,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) age2f,(CASE  WHEN sum(c1) is null THEN 0 ELSE sum(c1) END) age1m,(CASE  WHEN sum(c2) is null THEN 0 ELSE sum(c2) END) age1f,(CASE  WHEN sum(d1) is null THEN 0 ELSE sum(d1) END) age5m,(CASE  WHEN sum(d2) is null THEN 0 ELSE sum(d2) END) age5f,(CASE  WHEN sum(e1) is null THEN 0 ELSE sum(e1) END) age10m,(CASE  WHEN sum(e2) is null THEN 0 ELSE sum(e2) END) age10f,(CASE  WHEN sum(f1) is null THEN 0 ELSE sum(f1) END) age15m,(CASE  WHEN sum(f2) is null THEN 0 ELSE sum(f2) END) age15f,(CASE  WHEN sum(g1) is null THEN 0 ELSE sum(g1) END) age19m,(CASE  WHEN sum(g2) is null THEN 0 ELSE sum(g2) END) age19f,(CASE  WHEN sum(h1) is null THEN 0 ELSE sum(h1) END) age25m,(CASE  WHEN sum(h2) is null THEN 0 ELSE sum(h2) END) age25f,(CASE  WHEN sum(i1) is null THEN 0 ELSE sum(i1) END) age50m,(CASE  WHEN sum(i2) is null THEN 0 ELSE sum(i2) END) age50f,(CASE  WHEN sum(j1) is null THEN 0 ELSE sum(j1) END) age60m,(CASE  WHEN sum(j2) is null THEN 0 ELSE sum(j2) END) age60f,(CASE  WHEN sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) is null THEN 0 ELSE sum(a1+b1+c1+d1+e1+f1+g1+h1+i1+j1) END) mTotal,(CASE  WHEN sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) is null THEN 0 ELSE sum(a2+b2+c2+d2+e2+f2+g2+h2+i2+j2) END) fTotal  from (select (CASE  WHEN ageinDay<60 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<60 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=1 THEN 1 ELSE 0  END) AS b1,(CASE  WHEN ageinDay>=60 and ageinDay<365 and regsex=2 THEN 1 ELSE 0  END) AS b2,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=1 THEN 1 ELSE 0  END) AS c1,(CASE  WHEN ageinday>=365 and ageinday<1825 and regsex=2 THEN 1 ELSE 0  END) AS c2,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=1 THEN 1 ELSE 0  END) AS d1,(CASE  WHEN ageinday>=1825 and ageinday<3650 and regsex=2 THEN 1 ELSE 0  END) AS d2,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=1 THEN 1 ELSE 0  END) AS e1,(CASE  WHEN ageinday>=3650 and ageinday<5475 and regsex=2 THEN 1 ELSE 0  END) AS e2,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=1 THEN 1 ELSE 0  END) AS f1,(CASE  WHEN ageinday>=5475 and ageinday<6935 and regsex=2 THEN 1 ELSE 0  END) AS f2,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=1 THEN 1 ELSE 0  END) AS g1,(CASE  WHEN ageinday>=6935 and ageinday<9125 and regsex=2 THEN 1 ELSE 0  END) AS g2,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=1 THEN 1 ELSE 0  END) AS h1,(CASE  WHEN ageinday>=9125 and ageinday<18250 and regsex=2 THEN 1 ELSE 0  END) AS h2,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=1 THEN 1 ELSE 0  END) AS i1,(CASE  WHEN ageinday>=18250 and ageinday<21900 and regsex=2 THEN 1 ELSE 0  END) AS i2,(CASE  WHEN ageinday>=21900 and regsex=1 THEN 1 ELSE 0  END) AS j1,(CASE  WHEN ageinday>=21900  and regsex=2 THEN 1 ELSE 0  END) AS j2 
from ( select tbl1.regid,tbl1.providedDate,tbl1.visitType,tbl1.org,tbl1.donor,tbl1.project,tbl1.clnId,tbl1.providedPlace, tbl1.regSex,tbl1.ageinday,tbl1.tspId 
from (select tbl.regid,tbl.providedDate,tbl.visittype,tbl.org,tbl.donor,tbl.project,tbl.clnId,tbl.providedPlace,tbl.regSex,tbl.tspId,  (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday 
from (select * from view_rptpn11 where ( provideddate between To_Date('${parameter.sDate}','YYYY-MM-DD') and To_Date('${parameter.eDate}','YYYY-MM-DD')) ${org} ${proj} ${cln} ${tsp} )  tbl where tbl.visittype=${type} )  tbl1 )  inner1  )  inner2`

    console.log('pncReport in sql =====> ' + sql)
    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OBJECT
    });
    console.log('pncReport result: ', result.rows);
    await connection.close();
    return result.rows;
  } catch (error) {
    throw (error);
  }
}