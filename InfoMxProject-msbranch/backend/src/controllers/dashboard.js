const fnErr = require('./fnErr');
const fpmodat = require('../models/fp_Indicators');
const gmmodat = require('../models/gm_Indicators');
const hcmodat = require('../models/hc_Indicators');
const ancmodat = require('../models/anc_Indicators');
const childmodat = require('../models/child_Indicators');
const fprhmodat = require('../models/fprh_Indicators');
const pncmodat = require('../models/pnc_Indicators');
const rhmodat = require('../models/rh_Indicaors');
const delimodat = require('../models/deli_Indicators');


//....................GET ALL FP BY FILTER....................//
exports.fp = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await fpmodat[`fp${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await fpmodat[`fp${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await fpmodat[`fp${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})

//....................GET ALL GM BY FILTER....................//
exports.gm = fnErr(async(req, res, next) => {
    console.log('gm req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await gmmodat[`gm${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await gmmodat[`gm${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await gmmodat[`gm${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})

//....................GET ALL ANC BY FILTER....................//
exports.anc = fnErr(async(req, res, next) => {
    console.log('anc req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await ancmodat[`anc${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await ancmodat[`anc${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await ancmodat[`anc${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})


//....................GET ALL CHILD BY FILTER....................//
exports.child = fnErr(async(req, res, next) => {
    console.log('child req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await childmodat[`child${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await childmodat[`child${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await childmodat[`child${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})


//....................GET ALL DELIVERY BY FILTER....................//
exports.deli = fnErr(async(req, res, next) => {
    console.log('deli req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await delimodat[`deli${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await delimodat[`deli${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await delimodat[`deli${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})


//....................GET ALL FPRH BY FILTER....................//
exports.fprh = fnErr(async(req, res, next) => {
    console.log('fprh req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await fprhmodat[`fprh${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await fprhmodat[`fprh${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await fprhmodat[`fprh${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})


//....................GET ALL HC BY FILTER....................//
exports.hc = fnErr(async(req, res, next) => {
    console.log('hc req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await hcmodat[`hc${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await hcmodat[`hc${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await hcmodat[`hc${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})


//....................GET ALL PNC BY FILTER....................//
exports.pnc = fnErr(async(req, res, next) => {
    console.log('pnc req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await pncmodat[`pnc${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await pncmodat[`pnc${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await pncmodat[`pnc${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})

//....................GET ALL RH BY FILTER....................//
exports.rh = fnErr(async(req, res, next) => {
    console.log('rh req query: ', req.query);
    const a = await req.query.indi;
        //TSP
        const tspres = await rhmodat[`rh${a}`]({...req.query,...{by: 'tspName', byup: 'TSPNAME'}});
        //ORG
        const orgres = await rhmodat[`rh${a}`]({...req.query,...{by: 'orgName', byup: 'ORGNAME'}});
        //Table
        const tblres = await rhmodat[`rh${a}tbl`](req.query);

    return res.status(200).json({
        status: 200,
        data: {tsp: tspres, org: orgres, tbl: tblres}
      });
})




