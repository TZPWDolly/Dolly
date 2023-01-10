//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.exportRegTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportRegTable parameter in database ===> " + a.orgID, a.projID)

        /* if (a.orgID === 'CPI-13' || a.orgID === 'CPI-15' || a.orgID === 'CPI-05' || a.orgID === 'CPI-06' || a.orgID === 'CPI-07' || a.orgID === 'CPI-08' ||
            a.orgID === 'CPI-17' || a.orgID === 'CPI-18' || a.orgID === 'CPI-19' || a.orgID === 'CPI-21') 
        {
            sql = await `select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Education) Education,max(t1.Type) Type,max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,max(t1.Address) Address,max(t1.Phone) Phone,max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,max(t1.Remark) Remark,max(t1.InsertDate) InsertDate,max(t1.ModifyDate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,max(t1.villageCode) villageCode,max(t1.regOrg) regOrg,max(t1.Job) Job  from
            (select * from view_regservice1  where org='${a.orgID}' and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD') )  
           union all select * from view_reg where org='${a.orgID}'  and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')  ) 
             )  t1  group by regid`
        } */

        if (a.orgID === 'CPI-01' || a.orgID === 'CPI-11' || a.orgID === 'CPI-14') 
        {
            sql = await `  select 
            Orgname,Regid,PatientName,to_char(regDate,'YYYY-MM_DD')regDate,to_char(provideddate,'YYYY-MM_DD')providedDate,tspName,villagename,sex,age,ageunit,education,type,maritalstatus,spousename,fathername,mothername,address,phone,ethnic,Refrefrom,remark,insertDate,modifydate
            from ( select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) 
            regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,max(t1.villageName) 
            VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Education) Education,
            max(t1.Type) Type,max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,
            max(t1.Address) Address,max(t1.Phone) Phone,max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,max(t1.Remark) Remark,max(t1.InsertDate) InsertDate,
            max(t1.ModifyDate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,max(t1.villageCode) villageCode,max(t1.regOrg) regOrg,max(t1.Job) Job from 
            ( select * from view_regservice3icd where org='${a.orgID}' and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD') ) 
             union all select * from view_reg where org='${a.orgID}' 
             and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')  )  )  t1  group by regid ) t2`
        }

        else if(a.orgID === 'CPI-16')
        {
            /* sql = await `select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,
            max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Job) Job,max(t1.Education) Education,max(t1.Type) Type,
            max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,max(t1.Address) Address,max(t1.Phone) Phone,
            max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,max(t1.Remark) Remark,max(t1.InsertDate) InsertDate,max(t1.ModifyDate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,
            max(t1.villageCode) villageCode,max(t1.regOrg) regOrg  from
             ( select * from view_regservice2tawnor  where org='${a.orgID}' and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD') )  
            union all select * from view_reg where org='${a.orgID}'  and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')  ) 
              )  t1  group by regid` */
        
              sql = await `   select 
              Orgname,Regid,PatientName,to_char(regDate,'YYYY-MM_DD')regDate,to_char(provideddate,'YYYY-MM_DD')providedDate,tspName,villagename,sex,age,ageunit,education,type,maritalstatus,spousename,fathername,mothername,address,phone,ethnic,Refrefrom,remark,insertDate,modifydate
              from ( select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,
              max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Job) Job,max(t1.Education) Education,max(t1.Type) Type,
              max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,max(t1.Address) Address,max(t1.Phone) Phone,
              max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,
              max(t1.InsertDate) InsertDate,
              max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId, max(t1.villageCode) villageCode,max(t1.regOrg) regOrg  from
               ( select * from view_regservice2tawnor  where org='${a.orgID}' and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD') )  and job in ('P-990')
              union all select * from view_reg where org='${a.orgID}'  and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')  )
                )  t1  group by regid ) t2`
        }

        else if(a.orgID === 'CPI-05' && a.projID==='P-990')
        {
            sql = await `  select 
            Orgname,Regid,PatientName,to_char(regDate,'YYYY-MM_DD')regDate,to_char(provideddate,'YYYY-MM_DD')providedDate,tspName,villagename,sex,age,ageunit,education,type,maritalstatus,spousename,fathername,mothername,address,phone,ethnic,Refrefrom,remark,insertDate,modifydate
            from ( select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Education) Education,max(t1.Type) Type,max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,max(t1.Address) Address,max(t1.Phone) Phone,max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,max(t1.Remark) Remark,max(t1.InsertDate) InsertDate,max(t1.ModifyDate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,max(t1.villageCode) villageCode,max(t1.regOrg) regOrg,max(t1.Job) Job  from
            ( select * from VIEW_SERVICECLN  where  (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD') )  
           union all select * from view_reg where  (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')  ) 
             )  t1  group by regid) t2`
        }
       /* else if((a.orgID === 'CPI-20' || a.orgID==='CPI-05') && a.projID ==='P-008')
        {
            sql = await `select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Education) Education,max(t1.Type) Type,max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,max(t1.Address) Address,max(t1.Phone) Phone,max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,max(t1.Remark) Remark,max(t1.InsertDate) InsertDate,max(t1.ModifyDate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,max(t1.villageCode) villageCode,max(t1.regOrg) regOrg,max(t1.Job) Job  from
            (select * from view_reg where  (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))) t1  group by regid`
        } */
        else if(a.orgID === 'CPI-99')
        {
            sql = await `  select 
            Orgname,Regid,PatientName,to_char(regDate,'YYYY-MM_DD')regDate,to_char(provideddate,'YYYY-MM_DD')providedDate,tspName,villagename,sex,age,ageunit,education,type,maritalstatus,spousename,fathername,mothername,address,phone,ethnic,Refrefrom,remark,insertDate,modifydate
            from ( select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Education) Education,max(t1.Type) Type,max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,max(t1.Address) Address,max(t1.Phone) Phone,max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,max(t1.Remark) Remark,max(t1.InsertDate) InsertDate,max(t1.ModifyDate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,max(t1.villageCode) villageCode,max(t1.regOrg) regOrg,max(t1.Job) Job  from
            ( select * from view_regservice1  where  (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD') )  
           union all select * from view_reg where  (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')  ) 
             )  t1  group by regid) t2`
        }
        else 
        {
            sql = await `  select 
            Orgname,Regid,PatientName,to_char(regDate,'YYYY-MM_DD')regDate,to_char(provideddate,'YYYY-MM_DD')providedDate,tspName,villagename,sex,age,ageunit,education,type,maritalstatus,spousename,fathername,mothername,address,phone,ethnic,Refrefrom,remark,insertDate,modifydate
            from ( select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.providedDate) providedDate,max(t1.tspName) tspName,max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.Education) Education,max(t1.Type) Type,max(t1.MaritalStatus) MaritalStatus,max(t1.SpouseName) SpouseName,max(t1.FatherName) FatherName,max(t1.MotherName) MotherName,max(t1.Address) Address,max(t1.Phone) Phone,max(t1.Ethnic) Ethnic,max(t1.Referfrom) Refrefrom,max(t1.Remark) Remark,max(t1.InsertDate) InsertDate,max(t1.ModifyDate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,max(t1.villageCode) villageCode,max(t1.regOrg) regOrg,max(t1.Job) Job  from
            ( select * from view_regservice1  where org='${a.orgID}' and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD') )  
           union all select * from view_reg where org='${a.orgID}'  and (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')  ) 
             )  t1  group by regid ) t2`
        }


        console.log('exportRegTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportRegTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportORegTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportORegTable parameter in database ===> " + a.orgID, a.projID)

        sql = await `select 
        Orgname,Regid,PatientName,to_char(regDate,'YYYY-MM_DD')regDate,tspName,villagename,sex,age,ageunit,education,type,maritalstatus,spousename,fathername,mothername,address,phone,ethnic,Refrefrom,remark,insertDate,modifydate
        from ( select max(t1.orgName) OrgName,max(t1.regId) RegId,max(t1.PatientName) PatientName,max(t1.regDate) regDate,max(t1.tspName) tspName,max(t1.villageName) VillageName,max(t1.Sex) Sex,max(t1.Age) Age,max(t1.AgeUnit) AgeUnit,max(t1.Place) Place,max(t1.regedu) Education,max(t1.regtype) Type,max(t1.regMarital) MaritalStatus,max(t1.regSpouse) SpouseName,max(t1.regFather) FatherName,max(t1.regMother) MotherName,max(t1.regAddress) Address,max(t1.regph) Phone,max(t1.regEthnic) Ethnic,max(t1.regreffrom) Refrefrom,max(t1.regRemark) Remark,max(t1.regInsert) InsertDate,max(t1.regupdate) ModifyDate,max(t1.org) org,max(t1.tspId) tspId,max(t1.clnID) clnId,max(t1.villageCode) villageCode,max(t1.regOrg) regOrg,max(t1.Job) Job  from
            (select * from view_reg where org='${a.orgID}' and  (provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD')))  t1  group by regid )t2`

        console.log('exportORegTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportORegTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportANCTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportANCTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,
            ProvidedPlace,ProviderPosition,G,P,A,Wt,Ht,BP,Temp,TempUnit,GP,Odema,Presentation,FundalHt,FHS,Lab,FA,FeSo4,FC,B1,
            B1Unit,Deworming1stDose,Deworming2ndDose,Tetanus1stDose,Tetanus2ndDose,CDK,NBK,MaternalNutritionHE,FamilyPlanningHE,
            NewBornCareHE,DeliveryPlanHE,EmergencyResponsePlanHE,DangerSignsHE,ExclusiveBreastFeedingHE,RTIsHIVSTIHE,ImmunizationHE,
            RestWorkHE,HygieneHE,DrugAlcoholUseHE,SmokingHE,Outcome,Refto,Refreason,ReferraltoOther,Deathreason,Visit,VtCount,VisitSkill,VisitTiming,
            VisitTimingSkill,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    from view_anc 
            where  ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else 
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,
            ProvidedPlace,ProviderPosition,G,P,A,Wt,Ht,BP,Temp,TempUnit,GP,Odema,Presentation,FundalHt,FHS,Lab,FA,FeSo4,FC,B1,
            B1Unit,Deworming1stDose,Deworming2ndDose,Tetanus1stDose,Tetanus2ndDose,CDK,NBK,MaternalNutritionHE,FamilyPlanningHE,
            NewBornCareHE,DeliveryPlanHE,EmergencyResponsePlanHE,DangerSignsHE,ExclusiveBreastFeedingHE,RTIsHIVSTIHE,ImmunizationHE,
            RestWorkHE,HygieneHE,DrugAlcoholUseHE,SmokingHE,Outcome,Refto,Refreason,ReferraltoOther,Deathreason,Visit,VtCount,VisitSkill,VisitTiming,
            VisitTimingSkill,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    from view_anc 
            where org='${a.orgID}' and  ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        



        console.log('exportANCTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportANCTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportDeliTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportDeliTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Mcomplication,Mprocedure,MaternalTreatment,TypeofDelivery,GP,G,P,A,Epi,DeliDefect,Lab,MotherOutcome,MRefto,Mrefreason,Mdeathreason,ANSelfRep,BabyOutcome,BDeliOutcome,BRefto,Brefreason,Bdeathreason,Temp,TempUnit,PR,BP,BSex1,BSex2,BSex3,BWt1,BWt2,BWt3,BBF1,BBF2,BBF3,BCCut1,BCCut2,BCCut3,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_delivery where   
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else{
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Mcomplication,Mprocedure,MaternalTreatment,TypeofDelivery,GP,G,P,A,Epi,DeliDefect,Lab,MotherOutcome,MRefto,Mrefreason,Mdeathreason,ANSelfRep,BabyOutcome,BDeliOutcome,BRefto,Brefreason,Bdeathreason,Temp,TempUnit,PR,BP,BSex1,BSex2,BSex3,BWt1,BWt2,BWt3,BBF1,BBF2,BBF3,BCCut1,BCCut2,BCCut3,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_delivery where org='${a.orgID}' and  
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportDeliTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportDeliTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportPNCTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportPNCTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,ANSelfRep,P,A,Wt,Ht,BP,Temp,TempUnit,PR,RR,Anaemia,Nipple,UtrContraction,VagBleeding,WoundCond,Lab,B1,B1Unit,VitA,VitAUnit,FeSo4,HE,Outcome,Refto,ReferraltoOther,Refreason,Deathreason,DeliveryDate,pn3Days,Treatment,OtherTreatment,Diagnosis,OtherDiagnosis,ErrorCommentRemark,pnFP,pnNBC,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_pnc where 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else 
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,ANSelfRep,P,A,Wt,Ht,BP,Temp,TempUnit,PR,RR,Anaemia,Nipple,UtrContraction,VagBleeding,WoundCond,Lab,B1,B1Unit,VitA,VitAUnit,FeSo4,HE,Outcome,Refto,ReferraltoOther,Refreason,Deathreason,DeliveryDate,pn3Days,Treatment,OtherTreatment,Diagnosis,OtherDiagnosis,ErrorCommentRemark,pnFP,pnNBC,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_pnc where org='${a.orgID}' and  
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportPNCTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportPNCTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportFPTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportFPTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,MaleCondom,FemaleCondom,Depo,COC,POP,EC,Year3Implant,Year4Implant,Year5Implant,NewAcceptor,IUDCu,IUDMulti,RefImp,RefIUD,RefTL,RefVt,CSLFP,CSLFer,MaleCondomBk,FemaleCondomBk,ECBk,Lab,Outcome,Refto,Refreason,ReferraltoOther,Deathreason,DepoSc,ErrorCommentRemark,OffMethod,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_fp where ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else{
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,MaleCondom,FemaleCondom,Depo,COC,POP,EC,Year3Implant,Year4Implant,Year5Implant,NewAcceptor,IUDCu,IUDMulti,RefImp,RefIUD,RefTL,RefVt,CSLFP,CSLFer,MaleCondomBk,FemaleCondomBk,ECBk,Lab,Outcome,Refto,Refreason,ReferraltoOther,Deathreason,DepoSc,ErrorCommentRemark,OffMethod,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_fp where org='${a.orgID}'  
            and ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportFPTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportFPTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportRHTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportRHTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select  OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,Pregnancy,P,A,PAC,GVB,OtherDiagnosis,Procedure,Treatment,Lab,Outcome,Refto,Refreason,ReferraltoOther,Deathreason,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_rh where 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else
        {
            sql = await `Select  OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit, To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,Pregnancy,P,A,PAC,GVB,OtherDiagnosis,Procedure,Treatment,Lab,Outcome,Refto,Refreason,ReferraltoOther,Deathreason,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_rh where org='${a.orgID}'  and 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportRHTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportRHTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportGMTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportGMTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,HE,GMType,Preg,Lab,OtherDiagnosis,Diagnosis1,Diagnosis2,Diagnosis3,Complaint,Procedure,Treatment,Outcome,Referral,REFERRALTOOTHER,ReferralREason,DeathReason,Signandsympton,PhysicalExamination,HepatitisB,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_gm where 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else{
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,HE,GMType,Preg,Lab,OtherDiagnosis,Diagnosis1,Diagnosis2,Diagnosis3,Complaint,Procedure,Treatment,Outcome,Referral,REFERRALTOOTHER,ReferralREason,DeathReason,Signandsympton,PhysicalExamination,HepatitisB,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_gm where org='${a.orgID}'  and 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportGMTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportGMTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportOPDMedTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportGMTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,HE,GMType,Preg,Lab,OtherDiagnosis,Diagnosis1,Diagnosis2,Diagnosis3,Complaint,Procedure,Treatment,Outcome,Referral,REFERRALTOOTHER,ReferralREason,DeathReason,Signandsympton,PhysicalExamination,HepatitisB,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_gm where   gmtype='Medical-OPD' and
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else 
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,HE,GMType,Preg,Lab,OtherDiagnosis,Diagnosis1,Diagnosis2,Diagnosis3,Complaint,Procedure,Treatment,Outcome,Referral,REFERRALTOOTHER,ReferralREason,DeathReason,Signandsympton,PhysicalExamination,HepatitisB,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_gm where org='${a.orgID}'  and  gmtype='Medical-OPD' and
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportGMTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportGMTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportOPDSurTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportGMTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,HE,GMType,Preg,Lab,OtherDiagnosis,Diagnosis1,Diagnosis2,Diagnosis3,Complaint,Procedure,Treatment,Outcome,Referral,REFERRALTOOTHER,ReferralREason,DeathReason,Signandsympton,PhysicalExamination,HepatitisB,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_gm where  gmtype='Surgery' and
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,ProjectName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,ProviderPosition,Wt,Ht,BP,PR,RR,Temp,TempUnit,P,A,HE,GMType,Preg,Lab,OtherDiagnosis,Diagnosis1,Diagnosis2,Diagnosis3,Complaint,Procedure,Treatment,Outcome,Referral,REFERRALTOOTHER,ReferralREason,DeathReason,Signandsympton,PhysicalExamination,HepatitisB,ErrorCommentRemark,InsertDate,ModifyDate,ClnId,tspId,villageCode,ProjID,org    
            from view_gm where org='${a.orgID}'  and gmtype='Surgery' and
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportGMTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportGMTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportIPDTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportIPDTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select * from view_ipd where  
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else {
            sql = await `Select * from view_ipd where org='${a.orgID}'  and 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportIPDTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportIPDTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportLabTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportLabTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,RDT,Microscopic,HB,BG,RH,UCG,UrineSugar,UrineProtein,Gonorrhoea,Trichomonus,Candida,Reagintest,TPHA,VDRL,HIV,HBV,HCV,ServiceSource,OtherRemark,InsertDate,ModifyDate,LabTest,org,clnId,TspId,ProjId 
            from view_lab where  
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else {
            sql = await `Select OrgName,RegId,PatientName,ClinicName,TownshipName,VillageName,Sex,Age,AgeUnit,To_char(ProvidedDate,'YYYY-MM-DD')ProvidedDate,ProvidedPlace,RDT,Microscopic,HB,BG,RH,UCG,UrineSugar,UrineProtein,Gonorrhoea,Trichomonus,Candida,Reagintest,TPHA,VDRL,HIV,HBV,HCV,ServiceSource,OtherRemark,InsertDate,ModifyDate,LabTest,org,clnId,TspId,ProjId 
            from view_lab where org='${a.orgID}'  and 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportLabTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportLabTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportIMAMTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportIMAMTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select * from view_imam where 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else {
            sql = await `Select * from view_imam where org='${a.orgID}'  and 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        

        console.log('exportIMAMTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportIMAMTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.exportIMAMSFPTable = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("exportIMAMTable parameter in database ===> " + a.orgID, a.projID)

        if(a.orgID === 'CPI-99')
        {
            sql = await `Select * from view_imamsfp where 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
        else{
            sql = await `Select * from view_imamsfp where org='${a.orgID}'  and 
            ( provideddate between To_Date('${a.sDate}','YYYY-MM-DD') and To_Date('${a.eDate}','YYYY-MM-DD'))`
        }
       

        console.log('exportIMAMTable in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('exportIMAMTable result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}