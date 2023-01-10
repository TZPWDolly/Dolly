//Module
const oracledb = require('oracledb');

//Models
const {db} = require('./database');

//Helper
const ck = require('../helper/checkTbl');


//....................// 40 Number of women who received at least one PNC within 2 days after delivery//....................//

            /********** TSP, ORG , Gender **********/
exports.pnc40 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            //console.log('db connected: ', connection);

            //Local
             let sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, 
                tbl.skillBA,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from 
                ( select tbl1.*,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,C##APIUSER.tbl_township.tsp_Name as tspName from ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition, (CASE  WHEN providerposition=1 or providerposition=2 or providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA,t3.regSex,t3.ageinday from (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,
                    (CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) 
                AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli, (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
                (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
                (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  
                (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 
                (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  
                (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  
                    (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
                    (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
                    (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  
                        (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
                        (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,
                        (t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from 
                        ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, 
                        EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from 
                        ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  
                        (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN 
                        ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where ${ck.delifilter(a)}  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) 
                        and delistatus<3)   B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where ${ck.delifilter(a)}   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    where   (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspcode=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.orgcode=C##APIUSER.tbl_org.org_id) tbl where ${ck.filter(a)} 
                        (provideddate between Date'${a.startDate}' and Date'${a.endDate}')) tbl1 group by ${a.by},regSex ORDER BY ${a.by}` 
            
            //Server            
           /*  let sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, 
                tbl.skillBA,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from 
                ( select tbl1.*,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,APIUSER.tbl_township.tsp_Name as tspName from ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition, (CASE  WHEN providerposition=1 or providerposition=2 or providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA,t3.regSex,t3.ageinday from (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,
                    (CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) 
                AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli, (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
                (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
                (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  
                (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 
                (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  
                (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  
                    (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
                    (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
                    (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  
                        (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
                        (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,
                        (t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from 
                        ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, 
                        EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from 
                        ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  
                        (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN 
                        ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where ${ck.delifilter(a)}  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) 
                        and delistatus<3)   B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where ${ck.delifilter(a)}   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    where   (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  APIUSER.tbl_township  on tbl1.tspcode=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.orgcode=APIUSER.tbl_org.org_id) tbl where ${ck.filter(a)} 
                        (provideddate between Date'${a.startDate}' and Date'${a.endDate}')) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
             */
                        console.log('pnc 40 sql: ', sql);
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc40 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
        
            /********** DATA TABLE **********/
exports.pnc40tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection); 
             //Local
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select tbl1.*,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,C##APIUSER.tbl_township.tsp_Name as tspName,C##APIUSER.tbl_clinic.cln_name as clnName from ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition, (CASE  WHEN providerposition=1 or providerposition=2 or providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA, t3.regSex,t3.ageinday from (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,(CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli, (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,(t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where ${ck.delifilter(a)}  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) and delistatus<3)   B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where ${ck.delifilter(a)}   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    where   (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspcode=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.orgcode=C##APIUSER.tbl_org.org_id left join  C##APIUSER.tbl_clinic  on tbl1.clncode=C##APIUSER.tbl_clinic.cln_id) tbl where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME` 
            
            //Server
            /* sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select tbl1.*,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,APIUSER.tbl_township.tsp_Name as tspName,APIUSER.tbl_clinic.cln_name as clnName from ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition, (CASE  WHEN providerposition=1 or providerposition=2 or providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA, t3.regSex,t3.ageinday from (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,(CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli, (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,(t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where ${ck.delifilter(a)}  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) and delistatus<3)   B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where ${ck.delifilter(a)}   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    where   (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  APIUSER.tbl_township  on tbl1.tspcode=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.orgcode=APIUSER.tbl_org.org_id left join  APIUSER.tbl_clinic  on tbl1.clncode=APIUSER.tbl_clinic.cln_id) tbl where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME` */
            
            console.log('pnc 40 table sql: ', sql);
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc40tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

//....................// 41 Number of women who received at least one PNC provided by skilled providers within 2 days after delivery//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc41 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
        //Local
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, 
                tbl.skillBA,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  
                from ( select tbl1.*,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,
                    C##APIUSER.tbl_township.tsp_Name as tspName from 
                    ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,
                        t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,
                        t3.visittype,t3.providerposition, (CASE  WHEN providerposition=1 or providerposition=2 or 
                            providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA,t3.regSex,t3.ageinday from 
            (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,
            t2.visittype,t2.providerposition,(CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   
            ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, 
            t2.curYrdeli,t2.provideddate-t2.pnDDeli, (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  
            (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) 
            ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  
            (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN 
                (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN 
                    (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  
                        (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,(t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from 
            ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  
            curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from ( SELECT a.regid,a.pnprovideddate as provideddate, 
                a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, 
                    pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as 
                    providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  
                    (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN 
                    ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,
                    deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where deliorg in 
            ('CPI-23','CPI-19') and  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) and delistatus<3)  
             B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where deliorg in ('CPI-23','CPI-19')  and   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    
             where skillBA=1 and  (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspcode=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.orgcode=C##APIUSER.tbl_org.org_id) tbl where skillBA=1 and ${ck.filter(a)} 
             (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}` 
            
             //Server
           /*  sql = `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, tbl.ageinday, 
                tbl.skillBA,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  
                from ( select tbl1.*,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,
                    APIUSER.tbl_township.tsp_Name as tspName from 
                    ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,
                        t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,
                        t3.visittype,t3.providerposition, (CASE  WHEN providerposition=1 or providerposition=2 or 
                            providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA,t3.regSex,t3.ageinday from 
            (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,
            t2.visittype,t2.providerposition,(CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   
            ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, 
            t2.curYrdeli,t2.provideddate-t2.pnDDeli, (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  
            (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) 
            ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  
            (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN 
                (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN 
                    (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  
                        (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,(t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from 
            ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  
            curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from ( SELECT a.regid,a.pnprovideddate as provideddate, 
                a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, 
                    pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as 
                    providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  
                    (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN 
                    ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,
                    deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where deliorg in 
            ('CPI-23','CPI-19') and  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) and delistatus<3)  
             B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where deliorg in ('CPI-23','CPI-19')  and   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    
             where skillBA=1 and  (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  APIUSER.tbl_township  on tbl1.tspcode=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.orgcode=APIUSER.tbl_org.org_id) tbl where skillBA=1 and ${ck.filter(a)} 
             (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
             */
            
             const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc41 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.pnc41tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection); 
             //Local
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  
            (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,
            (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) 
            TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) 
            AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,
            (CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, 
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) 
            ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, 
            (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, 
            (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,
            orgname,tspname,clnname,regsex as gender from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select tbl1.*,C##APIUSER.tbl_township.div_id as divCode,C##APIUSER.tbl_org.org_shortName as orgName,C##APIUSER.tbl_township.tsp_Name as tspName,C##APIUSER.tbl_clinic.cln_name as clnName
             from ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition, 
            (CASE  WHEN providerposition=1 or providerposition=2 or providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA, t3.regSex,t3.ageinday from 
            (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,
            (CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli, 
            (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  
            (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN 
            (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN 
            (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  
            (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,(t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where ${ck.delifilter(a)}  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) and delistatus<3)   B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where ${ck.delifilter(a)}   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    where skillBA=1 and (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  C##APIUSER.tbl_township  on tbl1.tspcode=C##APIUSER.tbl_township.tsp_id left join  C##APIUSER.tbl_division  on C##APIUSER.tbl_township.div_id=C##APIUSER.tbl_division.div_id left join  C##APIUSER.tbl_org  on tbl1.orgcode=C##APIUSER.tbl_org.org_id left join  C##APIUSER.tbl_clinic  on tbl1.clncode=C##APIUSER.tbl_clinic.cln_id where skillBA=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME` 

            //Server
          /*   sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  
            (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,
            (CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) 
            TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) 
            AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,
            (CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, 
            (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) 
            ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, 
            (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, 
            (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, 
            (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,
            orgname,tspname,clnname,regsex as gender from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex,tbl.ageinday,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from 
            ( select tbl1.*,APIUSER.tbl_township.div_id as divCode,APIUSER.tbl_org.org_shortName as orgName,APIUSER.tbl_township.tsp_Name as tspName,APIUSER.tbl_clinic.cln_name as clnName
             from ( select t3.regid,t3.provideddate,t3.org as orgCode,t3.donor as donorCode,t3.tspid as tspcode,t3.clnid as clnCode,t3.project as projectCode,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition, 
            (CASE  WHEN providerposition=1 or providerposition=2 or providerposition=6 or providerposition=7  THEN 1 ELSE 0 END) AS skillBA, t3.regSex,t3.ageinday from 
            (select t2.regid,t2.provideddate,t2.org,t2.tspid,t2.clnid,t2.project,t2.providedPlace,t2.providedvillage,t2.donor,t2.visittype,t2.providerposition,
            (CASE t2.providerposition WHEN 1 THEN 1  WHEN 2 THEN 1 WHEN 7 THEN 1 WHEN 6 THEN 1   ELSE 0  END) AS skillBA, t2.pnDDeli,t2.deliprovideddate,t2.regDate,t2.regAge,t2.regAgeUnit,t2.regSex,t2.curYrpn, t2.curYrdeli,t2.provideddate-t2.pnDDeli, 
            (CASE WHEN t2.curYrpn =curYrdeli THEN 0  ELSE  (CASE WHEN t2.deliprovideddate is null  THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN (t2.provideddate-t2.pnDDeli) ELSE  
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE (t2.provideddate-t2.deliprovideddate) END) END) END) END) END ) inta,  
            (CASE WHEN t2.curYrpn =curYrdeli THEN 0 ELSE  (CASE WHEN t2.deliprovideddate is null  THEN 
            (t2.provideddate-t2.pnDDeli) ELSE  (CASE WHEN t2.deliprovideddate is not null THEN 
            (t2.provideddate-t2.deliprovideddate) ELSE   (CASE WHEN t2.curYrpn>=curYrdeli or curYrDeli is null THEN 0 ELSE  
            (CASE WHEN t2.deliprovideddate is not null THEN (t2.provideddate-t2.deliprovideddate) ELSE   
            (CASE WHEN t2.pnDDeli is not null THEN (t2.provideddate-t2.pnDDeli) ELSE 0 END )END) END) END) END) END ) w2dys,(t2.providedDate-t2.regDate) + (t2.regAge*t2.regAgeUnit) as ageinday from ( select t1.*, EXTRACT(YEAR FROM (t1.provideddate))  curYrpn, EXTRACT(YEAR FROM (t1.deliprovideddate))  curYrdeli,reg.regDate,reg.regAge,reg.regAgeUnit,reg.regSex from ( SELECT a.regid,a.pnprovideddate as provideddate, a.pnDDeli,b.deliprovideddate,a.org,a.tspid,a.clnid,a.project,a.providerposition,a.providedPlace,a.providedVillage,a.donor,a.visittype FROM (SELECT pnregid as regid, pnprovideddate, pnorg as org, pntsp as tspid, pnclnid as clnid,pnproject as project,pnDDeli as pnDDeli,pnProviderPosition as providerposition,pnPlace as providedPlace,pnVillage as providedVillage,pnType as visitType,pndonor as donor from tbl_pnc where ${ck.orgfilter(a)}  (pnprovideddate between DATE'${a.startDate}'  and  DATE'${a.endDate}') and   pnstatus<3 )  A left JOIN ( SELECT deliregid as regid, deliprovideddate as deliprovideddate , deliorg as org, delitsp as tspi, deliclnid as clnid,deliproject as project,deliProviderPosition as providerposition,deliPlace as providedPlace,deliVillage as providedVillage,deliType as visitType,delidonor as donor from tbl_delivery where ${ck.delifilter(a)}  (deliprovideddate between DATE'${a.startDate}'-interval '42' day and DATE'${a.endDate}' ) and delistatus<3)   B ON A.regid=B.regid union all SELECT deliregid as regid, deliprovideddate,deliprovideddate,deliprovideddate ,deliorg as org, delitsp as tspi,deliclnid,deliproject,deliproviderposition,deliPlace,delivillage,delidonor,delitype from tbl_delivery where ${ck.delifilter(a)}   delistatus<3  ) t1 join tbl_reg  reg on t1.regid=reg.regid  )   t2  )  t3    where skillBA=1 and (w2dys between 0 and 2) group by t3.regid,t3.provideddate,t3.org,t3.tspid,t3.clnid,t3.project,t3.providedPlace,t3.providedvillage,t3.donor,t3.visittype,t3.providerposition,t3.regSex,t3.ageinday having count(t3.regid) >=1 ) tbl1 left join  APIUSER.tbl_township  on tbl1.tspcode=APIUSER.tbl_township.tsp_id left join  APIUSER.tbl_division  on APIUSER.tbl_township.div_id=APIUSER.tbl_division.div_id left join  APIUSER.tbl_org  on tbl1.orgcode=APIUSER.tbl_org.org_id left join  APIUSER.tbl_clinic  on tbl1.clncode=APIUSER.tbl_clinic.cln_id where skillBA=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') 
            ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
             */
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc41tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
           
//....................// 42 Total number of women received at least one PNC within 42 days after delivery//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc42 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select  count(tbl1.regid) as idCount,Max(tbl1.regid) regid,min(tbl1.providedDate)providedDate,Max(tbl1.visittype)visittype,Max(tbl1.providedPlace)providedPlace, Max(tbl1.regSex)regSex,Max(tbl1.regDate)regDate,Max(tbl1.regAge)regAge,Max(tbl1.regAgeUnit)regAgeUnit,Max(tbl1.skillBA)skillBA, Max(tbl1.pnHE)pnHE,Max(tbl1.pnB1)pnB1,Max(tbl1.pnVitA)pnVitA,Max(tbl1.deliveryDate)deliveryDate,Max(tbl1.outcome)outcome,Max(tbl1.providedRefPlace) providedRefPlace, Max(tbl1.orgCode)orgCode,Max(tbl1.donorCode)donorCode,Max(tbl1.projectCode)projectCode, Max(tbl1.tspCode)tspCode,Max(tbl1.clnCode)clnCode,Max(tbl1.orgName)orgName,Max(tbl1.tspName)tspName,Max(tbl1.clnname)clnname from ( select * from view_rptpndshb1 ) tbl1  where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            console.log('pm42 sql ---- ', sql)
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pmc42 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.pnc42tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection); sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select  count(tbl1.regid) as idCount,Max(tbl1.regid) regid,min(tbl1.providedDate)providedDate,Max(tbl1.visittype)visittype,Max(tbl1.providedPlace)providedPlace, Max(tbl1.regSex)regSex,Max(tbl1.regDate)regDate,Max(tbl1.regAge)regAge,Max(tbl1.regAgeUnit)regAgeUnit,Max(tbl1.skillBA)skillBA, Max(tbl1.pnHE)pnHE,Max(tbl1.pnB1)pnB1,Max(tbl1.pnVitA)pnVitA,Max(tbl1.deliveryDate)deliveryDate,Max(tbl1.outcome)outcome,Max(tbl1.providedRefPlace) providedRefPlace, Max(tbl1.orgCode)orgCode,Max(tbl1.donorCode)donorCode,Max(tbl1.projectCode)projectCode, Max(tbl1.tspCode)tspCode,Max(tbl1.clnCode)clnCode,Max(tbl1.orgName)orgName,Max(tbl1.tspName)tspName,Max(tbl1.clnname)clnname from ( select * from view_rptpndshb1 ) tbl1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            console.log('pnc42tbls sql --- ', sql);
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc42tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
           
//....................// 43 Total number of women received at least one PNC within 42 days after delivery provided by skilled providers//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc43 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select  count(tbl1.regid) as idCount,Max(tbl1.regid) regid,min(tbl1.providedDate)providedDate,Max(tbl1.visittype)visittype,Max(tbl1.providedPlace)providedPlace, Max(tbl1.regSex)regSex,Max(tbl1.regDate)regDate,Max(tbl1.regAge)regAge,Max(tbl1.regAgeUnit)regAgeUnit,Max(tbl1.skillBA)skillBA, Max(tbl1.pnHE)pnHE,Max(tbl1.pnB1)pnB1,Max(tbl1.pnVitA)pnVitA,Max(tbl1.deliveryDate)deliveryDate,Max(tbl1.outcome)outcome,Max(tbl1.providedRefPlace) providedRefPlace, Max(tbl1.orgCode)orgCode,Max(tbl1.donorCode)donorCode,Max(tbl1.projectCode)projectCode, Max(tbl1.tspCode)tspCode,Max(tbl1.clnCode)clnCode,Max(tbl1.orgName)orgName,Max(tbl1.tspName)tspName from ( select * from view_rptpndshborgtspsex1 ) tbl1   where tbl1.skillBA=1 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc43 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.pnc43tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection); sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select  count(tbl1.regid) as idCount,Max(tbl1.regid) regid,min(tbl1.providedDate)providedDate,Max(tbl1.visittype)visittype,Max(tbl1.providedPlace)providedPlace, Max(tbl1.regSex)regSex,Max(tbl1.regDate)regDate,Max(tbl1.regAge)regAge,Max(tbl1.regAgeUnit)regAgeUnit,Max(tbl1.skillBA)skillBA, Max(tbl1.pnHE)pnHE,Max(tbl1.pnB1)pnB1,Max(tbl1.pnVitA)pnVitA,Max(tbl1.deliveryDate)deliveryDate,Max(tbl1.outcome)outcome,Max(tbl1.providedRefPlace) providedRefPlace, Max(tbl1.orgCode)orgCode,Max(tbl1.donorCode)donorCode,Max(tbl1.projectCode)projectCode, Max(tbl1.tspCode)tspCode,Max(tbl1.clnCode)clnCode,Max(tbl1.orgName)orgName,Max(tbl1.tspName)tspName,Max(tbl1.clnname)clnname from ( select * from view_rptpndshb1 ) tbl1 where tbl1.skillBA=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') group by regid) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc43tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
           
//....................// 44 Total number of PNC services provided by health workers within 42 days after delivery//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc44 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptpndshborgtspsex1 where ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc44 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}           
            /********** DATA TABLE **********/
exports.pnc44tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection); sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptpndshb1 where ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc44tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

           
//....................// 45 Total number of PNC services provided by Skilled providers within 42 days after delivery//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc45 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);

            //Local
              sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, 
                (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, 
            tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,
            tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from 
            ( select * from view_rptpndshborgtspsex1 where skillBA=1 where ${ck.filter(a)} 
            (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}` 
             

            //Server
           /*  sql = `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from 
            ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, 
                (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, 
            tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,
            tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from 
            ( select * from view_rptpndshborgtspsex1 where skillBA=1 where ${ck.filter(a)} 
            (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
             */
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc45 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.pnc45tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptpndshb1 where skillBA=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc45tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
           
//....................// 46 Total number of Health Education services provided by health workers during PNC services//....................// 

            /********** TSP, ORG , Gender **********/
 exports.pnc46 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptpndshborgtspsex1 where pnHE=1 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc46 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.pnc46tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection); 
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptpndshb1 where pnHE=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc46tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
           
//....................// 47 Total number of women who received vitamin B1 supplementation during PNC services//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc47 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptpndshborgtspsex1 where (pnB1>0 and  (pnB1<>999 OR pnB1 is not null)) and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc47 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.pnc47tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptpndshb1 where (pnB1>0 and  (pnB1<>999 OR pnB1 is not null)) and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc47tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
           
//....................// 48 Total number of women who received vitamin A supplementation during PNC services//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc48 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptpndshborgtspsex1 where pnVitA>0 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc48 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}

            /********** DATA TABLE **********/
exports.pnc48tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptpndshb1 where pnVitA>0 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc48tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}
           
//....................// 49 Total number of referral cases to higher facilities due to any complications within 42 days after delivery//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc49 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptpndshborgtspsex1 where outcome=3 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc49 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.pnc49tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptpndshb1 where outcome=3 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc49tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 
           
//....................// 50 Total number of referral cases to Government Health facilities due to any complications within 42 days after delivery//....................// 

            /********** TSP, ORG , Gender **********/
exports.pnc50 = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ${a.byup},REGSEX AS GENDER,COUNT(REGID) COUNTDATA  from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName  from ( select * from view_rptpndshborgtspsex1  where outcome=3 and providedRefPlace=1 and ${ck.filter(a)} (provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl   ) tbl1 group by ${a.by},regSex ORDER BY ${a.by}`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log(`pnc50 ${a.by} result: `, result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
}            
            /********** DATA TABLE **********/
exports.pnc50tbl = async (a) => {
    try{
        const connection = await oracledb.getConnection(db);
            console.log('db connected: ', connection);
            sql = await `select ORGNAME,TSPNAME,CLNNAME, (CASE  WHEN sum(a1) is null THEN 0 ELSE sum(a1) END) AGE5M,  (CASE  WHEN sum(a2) is null THEN 0 ELSE sum(a2) END) AGE5F,(CASE  WHEN sum(a1+a2) is null THEN 0 ELSE sum(a1+a2) END) TOTAL1, (CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b1) END) AGEG5M,(CASE  WHEN sum(b2) is null THEN 0 ELSE sum(b2) END) AGEG5F,(CASE  WHEN sum(b1+b2) is null THEN 0 ELSE sum(b1+b2) END) TOTAL2, (CASE  WHEN sum(a1+b1+a2+b2) is null THEN 0 ELSE sum(a1+b1+a2+b2) END) ALLTOTAL from ( select (CASE  WHEN ageinDay<1825 and regsex=1 THEN 1 ELSE 0  END) AS a1, (CASE  WHEN ageinDay<1825 and regsex=2 THEN 1 ELSE 0  END) AS a2, (CASE  WHEN ageinDay>=1825 and regsex=1 THEN 1 ELSE 0  END) AS b1, (CASE  WHEN ageinDay>=1825 and regsex=2 THEN 1 ELSE 0  END) AS b2,orgname,tspname,clnname,regsex as gender from ( select tbl.regid,tbl.providedDate,tbl.visittype,tbl.providedPlace,tbl.regSex, (tbl.providedDate-tbl.regDate) + (tbl.regAge*tbl.regAgeUnit) as ageinday, tbl.skillBA,tbl.pnHE,tbl.pnB1,tbl.pnVitA,tbl.deliveryDate,tbl.outcome,providedRefPlace, tbl.orgCode,tbl.donorCode,tbl.projectCode,tbl.tspCode,tbl.clnCode,tbl.orgName,tbl.tspName,tbl.clnname  from ( select * from view_rptpndshb1 where outcome=3 and providedRefPlace=1 and ${ck.filter(a)}(provideddate between Date'${a.startDate}' and Date'${a.endDate}') ) tbl  )    inner1 )  inner2 group by orgname,tspname,clnname ORDER BY ORGNAME`
            const result = await connection.execute(sql,[],{
              outFormat: oracledb.OBJECT
            });
            console.log('pnc50tbl result: ', result.rows);
            await connection.close(); 
            return result.rows;
    } catch (error) {
        throw (error);
    }
} 
           