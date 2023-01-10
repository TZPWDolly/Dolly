const router = require('express').Router();

//Frontend main
//router.use(require('@routes/main'));
// Users routes
router.use(require('@routes/user'));
//Core routes
router.use(require('@routes/core'));
//Dashboard routes
router.use(require('@routes/dashboard'));
//Coverage routes
router.use(require('@routes/coverage'));
//Login routes
router.use(require('@routes/login'));
//Registration routes
router.use(require('@routes/registration'));
//Background routes
router.use(require('./background'));

//EditandShow Patient routes
router.use(require('@routes/editShow'));

//DashboardLink 
router.use(require('@routes/dashboardLink'));

//Service
router.use(require('@routes/service'));

//clinicbyorgproj
router.use(require('@routes/clinicbyorgproj'));

//villagebyorgproj
router.use(require('@routes/villagebyorgproj'));

//RH routes
router.use(require('@routes/rhinfo'));

//FP routes
router.use(require('@routes/fpinfo'));

//ANC routes
router.use(require('@routes/ancinfo'));

//Deli routes
router.use(require('@routes/deliinfo'));

//PNC routes
router.use(require('@routes/pncinfo'));

//GM routes
router.use(require('@routes/gminfo'));

//LAB routes
router.use(require('@routes/labinfo'));

//Max routes
router.use(require('@routes/maxid'));

//rheditshow routes
router.use(require('@routes/rheditshow'));

//serviceeditshow routes
router.use(require('@routes/service_editshow'));

//serviceLabData routes
router.use(require('@routes/service_labdatabyid'));

//service routes
router.use(require('@routes/rhservicedatabyid'));

//lab routes
router.use(require('@routes/rhlabdatabyid'));

//diagnosis route
router.use(require('@routes/diagnosis'));

//unicefClinic route
router.use(require('@routes/unicefClinic'));

//imaminfo route
router.use(require('@routes/imaminfo'));

//imamsfpinfo route
router.use(require('@routes/imamsfpinfo'));

//editImamShow route
router.use(require('@routes/editImamShow'));

//imamservicedatabyid
router.use(require('@routes/imamservicedatabyid'));

//ipdinfo
router.use(require('@routes/ipdinfo'));

//exportAllTables
router.use(require('@routes/exportalltable'));

//exportByProject
router.use(require('@routes/exportbyproject'));

//getAllOrg
router.use(require('@routes/getallorg'));

//hcreport
router.use(require('@routes/headcountreport'));

//pncreport
router.use(require('@routes/pncreport'));

//rhreport
router.use(require('@routes/rhreport'));

//delireport
router.use(require('@routes/delireport'));

//ancreport
router.use(require('@routes/ancreport'));

//fprhreport
router.use(require('@routes/fprhreport'));

//fpreport
router.use(require('@routes/fpreport'));

//gmreport
router.use(require('@routes/gmreport'));

//allicdreport
router.use(require('@routes/allicdreport'));

//clhcreport
router.use(require('@routes/clhcreport'));

//clcreport
router.use(require('@routes/clcreport'));

//clrreport
router.use(require('@routes/clrreport'));

//editageshow
router.use(require ('@routes/editageshow'))

//editage
router.use(require ('@routes/editage'))

//deleteserviceshow
router.use(require ('@routes/deleteserviceshow'))

//deleteservice
router.use(require ('@routes/deleteservice'))

//deletelabservice
router.use(require ('@routes/deletelabservice'))

//deleteregshow
router.use(require ('@routes/deleteregshow'))

//deletereg
router.use(require ('@routes/deleteregister'))

//mdsrinfo route
router.use(require('@routes/mdsrinfo'));

//editMDSRShow route
router.use(require('@routes/editmdsrshow'));

module.exports = router;