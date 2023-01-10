import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Card } from "@mui/material";
import { Button, Switch, Typography } from "@material-ui/core";

import CustomTextField from "../../components/controls/CustomTextFieldFilled";
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomSnackBar from "../../components/controls/CustomSnackBar";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import noPatientLogo from '../../images/noPatient.png'

import _ from 'lodash';

//////////////API/////////////////
import { insertFP } from "../../modals/fpinfo";
import { insertLab } from "../../modals/labinfo";
import { getMaxID } from "../../modals/maxid";

import CustomRHTable from '../../components/controls/CustomRHTable';

import Modals from "../../components/modal";
import { color } from "highcharts";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            flexGrow: 1
        }
    },
    "& .MuiFilledInput-root": {
        backgroundColor: "#fcf0f2"
    },
    fontSize: {
        "& span:last-child": {
            fontSize: 13
        }
    },
    cardStyle: {

        marginTop: theme.spacing(0.9),
        marginBottom: theme.spacing(1),


    },
    cardStyleTwo: {
        width: "100%",
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(0.9),
        borderRadius: "3px"
    },
    formControl: {
        margin: theme.spacing(1),
    },
    secondFormControl: {
        margin: theme.spacing(1),
        width: '40%'
    }
    ,

    thirdFormControl: {
        margin: theme.spacing(1),
        width: '100%'
    },

    table: {
        width: '100%',
        background: '#fcf0f2',
        height: '10px',


    },
    cellOne: {
        borderBottom: 'none',
        color: '#808080',
        fontSize: '9pt',

    },
    cellTwo: {
        borderBottom: 'none',
        color: '#53344d',
        fontSize: '12pt',
        fontWeight: 'bold',


    }
}));

const radioTheme = createTheme({
    palette: {
        primary: {
            main: "#482642"
        },
        secondary: {
            main: "#ffff"
        }
    }
});

export default function FPServiceForm(props) {

    const classes = useStyles();

    const history = useHistory();

    const [FPForm, setFPForm] = useState({

        FPREGID: '',
        FPPROVIDEDDATE: '',
        FPTYPE: '',
        FPDONOR: '',
        FPORG: '',
        FPPROJECT: '',
        FPTSP: '',
        FPPLACE: '',
        FPVILLAGE: '',
        FPPROVIDERNAME: '',
        FPPROVIDERPOSITION: '',
        FPWT: '',
        FPHT: '',
        FPBP: '',
        FPPR: '',
        FPRR: '',
        FPTEMP: '',
        FPFIRSTMENS: '',
        FPMARRIAGE: '',
        FPYOUNGESTCHILD: '',
        FPYOUNGESTCHILDUNIT: '',
        FPP: '',
        FPA: '',
        FPREASON: '',
        FPMENSCYCLE: '',
        FPMENSPAIN: '',
        FPVAGBLEEDING: '',
        FPPREFERENCE: '',
        FPLMP: '',
        FPHISA: '',
        FPSEXUALCONTACT: '',
        FPCURRENTMETHOD: '',
        FPCURRENTMETHODDUR: '',
        FPCONDOMM: '',
        FPCONDOMF: '',
        FPDEPOSC: '',
        FPDEPO: '',
        FPCOC: '',
        FPPOP: '',
        FPEC: '',
        FPIMP3: '',
        FPIMP4: '',
        FPIMP5: '',
        FPIUDCU: '',
        FPIUDMULTI: '',
        FPNA: '',
        FPFUDATE: '',
        FPREFIMP: '',
        FPREFIUD: '',
        FPREFTL: '',
        FPREFVT: '',
        FPCSLFP: '',
        FPCSLFER: '',
        FPCONDOMMBK: '',
        FPCONDOMFBK: '',
        FPECBK: '',
        FPOUTCOME: '',
        FPREFTO: '',
        FPDEATHREASON: '',
        FPUSRLOGIN: '',
        FPLAB: '',
        FPINSERT: '',
        FPOFFMETHOD: '',
        FPREMARK: '',
        FPAGE: '',
        FPAGEUNIT: '',
        FPTEMPUNIT: '',
        FPCLNID: '',
        FPREFREASON: '',
        FPREFTOOTHER: '',
        FPDEPOSC: '',
        FPUPDATE: '',
        FPSTATUS: '',
        FPSYNC: 0,
        ID: '',
        FPREMOVAL: ''
    });

    const [FPLabForm, setFPLabForm] = useState({
        LABREGID: '',
        LABPROVIDEDDATE: '',
        LABPLACE: '',
        LABVILLAGE: '',
        LABRDT: '999',
        LABMICROSCOPIC: '999',
        LABHB: '',
        LABBG: '999',
        LABRH: '999',
        LABUCG: '999',
        LABUSUGAR: '999',
        LABUPROTEIN: '999',
        LABGONO: '999',
        LABTRICHO: '999',
        LABCANDIDA: '999',
        LABRPR: '999',
        LABTPHA: '999',
        LABVDRL: '999',
        LABHIV: '999',
        LABHBV: '999',
        LABHCV: '999',
        LABSSOURCE: '',
        LABOTHER: '',
        LABRBS: '',
        LABORG: '',
        LABINSERT: '',
        LABUPDATE: '',
        LABSTATUS: '',
        LABSYNC: '',
        ID: '',
        LABTEST: '',
    });

    ///////Age Calculate/////////////
    const [ageCalculate, setAgeCalculate] = useState('')
    const [realAge, setRealAge] = useState('')
    const [age, setAge] = useState('')
    const [ageUnit, setAgeUnit] = useState('')
    const [ageUnitValue, setAgeUnitValue] = useState('')
    const [providedDate, setProvidedDate] = useState('')
    const calculateAge = async (event) => {

        setProvidedDate(event.target.value)
        console.log(event.target.value)
        console.log(new Date(event.target.value))
        let date = await new Date(new Date(event.target.value) - new Date().getTimezoneOffset() * 60000);
        console.log("provided date => ", date)
        let a = await Number(props.patient[0].REGAGE) * Number(props.patient[0].REGAGEUNIT);
        let b = await new Date(date);
        let c = await new Date(props.patient[0].REGDATE);
        console.log("register date=>", c)
        let g = await b.getTime() - c.getTime();
        let e = await g / (1000 * 3600 * 24);
        //let f = (a + e) / 365;
        let totalAge = await (a + e);
        if (b >= c) {

            if (totalAge >= 365) {
                //year
                let ageCount = await Number(totalAge);
                let h = await Number(ageCount / 365);

                /* if (h < 10) {
                    setAgeError('Patient must be older than 10 years to get this service')
                    setAgeSnack(true)
                    setAgeValid(false)
                    sessionStorage.setItem('rhage', h.toString().split('.')[0])
                    sessionStorage.setItem('rhageunit', '365')
                    sessionStorage.setItem('rhageunitvalue', 'Year')
                }

                else {
                    setAgeValid(true)
                    await setAge(h.toString().split('.')[0])
                    await setAgeUnit('365')
                    await setAgeUnitValue('Year')

                    setFPForm({ ...FPForm, FPPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), FPAGE: h.toString().split('.')[0], FPAGEUNIT: '365' })
                    setFPLabForm({ ...FPLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
                    sessionStorage.setItem('rhage', h.toString().split('.')[0])
                    sessionStorage.setItem('rhageunit', '365')
                    sessionStorage.setItem('rhageunitvalue', 'Year')
                } */

                setAgeValid(true)
                await setAge(h.toString().split('.')[0])
                await setAgeUnit('365')
                await setAgeUnitValue('Year')

                setFPForm({ ...FPForm, FPPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), FPAGE: h.toString().split('.')[0], FPAGEUNIT: '365' })
                setFPLabForm({ ...FPLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
                sessionStorage.setItem('rhage', h.toString().split('.')[0])
                sessionStorage.setItem('rhageunit', '365')
                sessionStorage.setItem('rhageunitvalue', 'Year')


            }
            else if (totalAge >= 30 && totalAge < 365) {
                setAgeValid(true)
                //month
                let ageCount = await Number(totalAge);
                let h = await Number(ageCount / 30);

                await setAge(h.toString().split('.')[0])
                await setAgeUnit('30')
                await setAgeUnitValue('Month')

                setFPForm({ ...FPForm, FPPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), FPAGE: h.toString().split('.')[0], FPAGEUNIT: '30' })
                setFPLabForm({ ...FPLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
                sessionStorage.setItem('rhage', h.toString().split('.')[0])
                sessionStorage.setItem('rhageunit', '30')
                sessionStorage.setItem('rhageunitvalue', 'Month')
            }
            else {
                //day
                setAgeValid(true)
                await setAge(totalAge)
                await setAgeUnit('1')
                await setAgeUnitValue('Day')

                setFPForm({ ...FPForm, FPPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), FPAGE: totalAge, FPAGEUNIT: '1' })
                setFPLabForm({ ...FPLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
                sessionStorage.setItem('rhage', totalAge)
                sessionStorage.setItem('rhageunit', '1')
                sessionStorage.setItem('rhageunitvalue', 'Day')

            }
        }
        else if (b < c) {

            setAgeError('Provided Date is cannot be Less than Registration Date!')
            setAgeSnack(true)
            setAgeValid(false)
        }

        else {
            setAgeValid(true)
        }

        console.log("Total Age => ", a + e)
        //console.log("After Calculation => ",f)


    }
    /////////////Limit number of user type////////////////
    const limitValue = (value, limit) => {
        let valueLimit = value.slice(0, limit)
        return valueLimit
    }

    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageCode, setVillageCode] = useState('')
    const FPVillageHandleChange = (event) => {
        let tsp = _.find(props.village, ['VILLAGE_CODE', event.target.value]);
        setTspCode(tsp.TSP_CODE)
        setVillageCode(event.target.value)
        setFPLabForm({ ...FPLabForm, LABVILLAGE: event.target.value })
        setFPForm({ ...FPForm, FPVILLAGE: event.target.value, FPTSP: tsp.TSP_CODE })
        console.log("Selected Village => ", event.target.value)
    };
    const FPClinicHandleChange = (event) => {
        setClnCode(event.target.value)
        setFPForm({ ...FPForm, FPCLNID: event.target.value })
        console.log("Selected Clinic => ", event.target.value)
    };

    ///////////Radio Handle/////////////
    function FPNAHandleChange(event) {
        if (event.target.value === FPForm.FPNA) {
            setFPForm({ ...FPForm, FPNA: "" })
        } else {
            setFPForm({ ...FPForm, FPNA: event.target.value })
        }
    }

    function FPTempUnitHandleChange(event) {
        if (event.target.value === FPForm.FPTEMPUNIT) {
            setFPForm({ ...FPForm, FPTEMPUNIT: "" })
        } else {
            setFPForm({ ...FPForm, FPTEMPUNIT: event.target.value })
        }
    }

    function removalHandleChange(event) {
        if (event.target.value === FPForm.FPREMOVAL) {
            setFPForm({ ...FPForm, FPREMOVAL: "" })
        } else {
            setFPForm({ ...FPForm, FPREMOVAL: event.target.value })
        }
    }

    ///////LabTest///////////
    const [labTest, setLabTest] = useState(false)
    const labTestHandle = (event) => {
        setLabTest(event.target.checked);
        setFPForm({ ...FPForm, FPLAB: event.target.checked === true ? 1 : 0 })
        setFPLabForm({ ...FPLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
    };

    ///////Investigation///////////
    const [RDT, setRDT] = useState('999');
    const RDTHandle = (event) => {
        setRDT(event.target.value);
        setFPLabForm({ ...FPLabForm, LABRDT: event.target.value })
    };
    const [microscopic, setMicroscopic] = useState('999');
    const microscopicHandle = (event) => {
        setMicroscopic(event.target.value);
        setFPLabForm({ ...FPLabForm, LABMICROSCOPIC: event.target.value })
    };
    const [blood, setBlood] = useState('999')
    const bloodHandle = (event) => {
        setBlood(event.target.value);
        setFPLabForm({ ...FPLabForm, LABBG: event.target.value })
    };
    const [RH, setRH] = useState('999')
    const RHHandle = (event) => {
        setRH(event.target.value);
        setFPLabForm({ ...FPLabForm, LABRH: event.target.value })
    };
    const [urineProtein, setUrineProtein] = useState('999');
    const urintProteinHandle = (event) => {
        setUrineProtein(event.target.value);
        setFPLabForm({ ...FPLabForm, LABUPROTEIN: event.target.value })
    };
    const [UCG, setUCG] = useState('999')
    const UCGHandle = (event) => {
        setUCG(event.target.value);
        setFPLabForm({ ...FPLabForm, LABUCG: event.target.value })
    };

    const [urine, setUrine] = useState('999')
    const urineHandle = (event) => {
        setUrine(event.target.value);
        setFPLabForm({ ...FPLabForm, LABUSUGAR: event.target.value })
    };

    const [gonorrhoea, setGonorrhoea] = useState('999')
    const gonorrhoeaHandle = (event) => {
        setGonorrhoea(event.target.value);
        setFPLabForm({ ...FPLabForm, LABGONO: event.target.value })
    };
    const [trichomonus, setTrichomonus] = useState('999')
    const trichomonusHandle = (event) => {
        setTrichomonus(event.target.value);
        setFPLabForm({ ...FPLabForm, LABTRICHO: event.target.value })
    };
    const [candida, setCandida] = useState('999')
    const candidaHandle = (event) => {
        setCandida(event.target.value);
        setFPLabForm({ ...FPLabForm, LABCANDIDA: event.target.value })
    };
    const [RPR, setRPR] = useState('999')
    const RPRHandle = (event) => {
        setRPR(event.target.value);
        setFPLabForm({ ...FPLabForm, LABRPR: event.target.value })
    };
    const [TPHA, setTPHA] = useState('999')
    const TPHAHandle = (event) => {
        setTPHA(event.target.value);
        setFPLabForm({ ...FPLabForm, LABTPHA: event.target.value })
    };
    const [VDRL, setVDRL] = useState('999')
    const VDRLHandle = (event) => {
        setVDRL(event.target.value);
        setFPLabForm({ ...FPLabForm, LABVDRL: event.target.value })
    };
    const [HIV, setHIV] = useState('999')
    const HIVHandle = (event) => {
        setHIV(event.target.value);
        setFPLabForm({ ...FPLabForm, LABHIV: event.target.value })
    };
    const [HBV, setHBV] = useState('999')
    const HBVHandle = (event) => {
        setHBV(event.target.value);
        setFPLabForm({ ...FPLabForm, LABHBV: event.target.value })
    };
    const [HepC, setHepC] = useState('999')
    const HepCHandle = (event) => {
        setHepC(event.target.value);
        setFPLabForm({ ...FPLabForm, LABHCV: event.target.value })
    };

    //////////////Referral For Longterm/////////////////
    const [refImplant, setRefImplant] = useState([])
    const [refImplantID, setRefImplantID] = useState([])
    const refImplantHandle = (event) => {
        setRefImplant(event.target.value);
        console.log(refImplant)
    };

    const [implant, setImplant] = useState('')
    function implantHandleChange(event) {
        if (event.target.value === implant) {
            setImplant('')
        } else {
            setImplant(event.target.value)

        }
    }

    const [counselling, setCounselling] = useState([])
    const [counsellingID, setCounsellingID] = useState([])
    const counsellingHandle = (event) => {
        setCounselling(event.target.value);
    };

    const [IUD, setIUD] = useState([])
    const IUDHandleChange = (event) => {
        setIUD(event.target.value);
    };

    /////Patient Outcome//////////
    const [proPosition, setProPosition] = useState('')
    const proPositionHandle = (event) => {
        setProPosition(event.target.value);
        setFPForm({ ...FPForm, FPPROVIDERPOSITION: event.target.value })
    };
    const [proPlace, setProPlace] = useState('')
    const proPlaceHandle = (event) => {
        setProPlace(event.target.value);
        setFPForm({ ...FPForm, FPPLACE: event.target.value })
        setFPLabForm({ ...FPLabForm, LABPLACE: event.target.value })
    };
    const [patientOutcome, setPatientOutcome] = useState('999')
    const patientOutcomeHandle = (event) => {
        setPatientOutcome(event.target.value);
        setFPForm({ ...FPForm, FPOUTCOME: event.target.value })
    };
    const [referPlace, setReferPlace] = useState('999')
    const referPlaceHandle = (event) => {
        setReferPlace(event.target.value);
        setFPForm({ ...FPForm, FPREFTO: event.target.value })
    };

    const [error, setError] = useState("")
    const [ageError, setAgeError] = useState("")
    const [success, setSuccess] = useState("")
    const [ageValid, setAgeValid] = useState(false)
    const [successSnack, setSuccessSnack] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [ageSnack, setAgeSnack] = useState(false)

    const setSnackBarOpen = () => {
        setOpenSnack(true)
    }

    const setSnackBarClose = () => {
        setOpenSnack(false)
    }

    const setSuccessSnackBarOpen = () => {
        setSuccessSnack(true)
    }

    const setSuccessSnackBarClose = () => {
        setSuccessSnack(false)
    }

    const setAgeSnackBarOpen = () => {
        setAgeSnack(true)
    }

    const setAgeSnackBarClose = () => {
        setAgeSnack(false)
    }

    ///////////////Save Cancle btn/////////////
    const save = async () => {
        let valid = !providedDate ? "Please Choose Provided Date" :
            !proPosition ? "Please Choose Provider Position" :
                !proPlace ? "Please Choose Provided Place" : 'valid';


        if (valid === 'valid') {
            
        var refArr = []
        var refArr1 = ['Imp', refImplant.includes('Imp') ? 1 : 999]
        var refArr2 = ['IUD', refImplant.includes('IUD') ? 1 : 999]
        var refArr3 = ['Vasectomy', refImplant.includes('Vasectomy') ? 1 : 999]
        var refArr4 = ['Tubal Ligation(TL)', refImplant.includes('Tubal Ligation(TL)') ? 1 : 999]
        refArr.push(refArr1)
        refArr.push(refArr2)
        refArr.push(refArr3)
        refArr.push(refArr4)
        console.log("refArr => ", refArr)

        FPForm.FPREFIMP = refArr[0][1]
        FPForm.FPREFIUD = refArr[1][1]
        FPForm.FPREFVT = refArr[2][1]
        FPForm.FPREFTL = refArr[3][1]

        var counsellingArr = []
        var counsellingArr1 = ['Fertility', counselling.includes('Fertility') ? 1 : 999]
        var counsellingArr2 = ['FP', counselling.includes('FP') ? 1 : 999]
        counsellingArr.push(counsellingArr1)
        counsellingArr.push(counsellingArr2)
        console.log("counsellingArr => ", counsellingArr)

        FPForm.FPCSLFER = counsellingArr[0][1]
        FPForm.FPCSLFP = counsellingArr[1][1]

        var IUDArr = []
        var IUDArr1 = ['Copper T', IUD.includes('Copper T') ? 1 : 999]
        var IUDArr2 = ['Multi-load', IUD.includes('Multi-load') ? 1 : 999]
        IUDArr.push(IUDArr1)
        IUDArr.push(IUDArr2)
        FPForm.FPIUDCU = IUDArr[0][1]
        FPForm.FPIUDMULTI = IUDArr[1][1]

        var parity = FPForm.FPP === '' ? 999 : FPForm.FPP
        FPForm.FPP = parity
        var abortion = FPForm.FPA === '' ? 999 : FPForm.FPA
        FPForm.FPA = abortion
        var newAcceptor = FPForm.FPNA === '' ? 999 : FPForm.FPNA
        FPForm.FPNA = newAcceptor
        var weight = FPForm.FPWT === '' ? 999.9 : FPForm.FPWT
        FPForm.FPWT = weight
        var height = FPForm.FPHT === '' ? 999.9 : FPForm.FPHT
        FPForm.FPHT = height
        var temp = FPForm.FPTEMP === '' ? 999.9 : FPForm.FPTEMP
        FPForm.FPTEMP = temp
        var tempUnit = FPForm.FPTEMPUNIT === '' ? 999 : FPForm.FPTEMPUNIT
        FPForm.FPTEMPUNIT = tempUnit
        var pulseRate = FPForm.FPPR === '' ? 999 : FPForm.FPPR
        FPForm.FPPR = pulseRate
        var resRate = FPForm.FPRR === '' ? 999 : FPForm.FPRR
        FPForm.FPRR = resRate
        var bp = FPForm.FPBP === '' ? '000/000' : FPForm.FPBP
        FPForm.FPBP = bp
        var depo = FPForm.FPDEPO === '' ? 999 : FPForm.FPDEPO
        FPForm.FPDEPO = depo
        var deposc = FPForm.FPDEPOSC === '' ? 999 : FPForm.FPDEPOSC
        FPForm.FPDEPOSC = depo
        var coc = FPForm.FPCOC === '' ? 999 : FPForm.FPCOC
        FPForm.FPCOC = coc
        var pop = FPForm.FPPOP === '' ? 999 : FPForm.FPPOP
        FPForm.FPPOP = pop
        var ec = FPForm.FPEC === '' ? 999 : FPForm.FPEC
        FPForm.FPEC = ec
        var condomM = FPForm.FPCONDOMM === '' ? 999 : FPForm.FPCONDOMM
        FPForm.FPCONDOMM = condomM
        var condomF = FPForm.FPCONDOMF === '' ? 999 : FPForm.FPCONDOMF
        FPForm.FPCONDOMF = condomF
        if (implant === '') {
            FPForm.FPIMP3 = 999
            FPForm.FPIMP4 = 999
            FPForm.FPIMP5 = 999
        }
        if (implant === '3') FPForm.FPIMP3 = 1
        if (implant === '4') FPForm.FPIMP4 = 1
        if (implant === '5') FPForm.FPIMP5 = 1
        var condomMBK = FPForm.FPCONDOMMBK === '' ? 999 : FPForm.FPCONDOMMBK
        FPForm.FPCONDOMMBK = condomMBK
        var condomFBK = FPForm.FPCONDOMFBK === '' ? 999 : FPForm.FPCONDOMFBK
        FPForm.FPCONDOMFBK = condomFBK
        var ecBK = FPForm.FPECBK === '' ? 999 : FPForm.FPECBK
        FPForm.FPECBK = ecBK
        var removal = FPForm.FPREMOVAL === '' ? 999 : FPForm.FPREMOVAL
        FPForm.FPREMOVAL = removal
        FPForm.FPINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        FPForm.FPUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        FPForm.FPSTATUS = 1

        var labHB = FPLabForm.LABHB === '' ? 999 : FPLabForm.LABHB
        FPLabForm.LABHB = labHB
        var labRBS = FPLabForm.LABRBS === '' ? 999 : FPLabForm.LABRBS
        FPLabForm.LABRBS = labRBS

        var lab = labTest === false ? 0 : 1;
        FPForm.FPLAB = lab
        FPLabForm.LABTEST = lab

        FPLabForm.LABINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        FPLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            const res = await insertFP({ FPForm, FPLabForm });
            if (res?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully inserted a patient's FP Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openFPSaveSnackbar: true
                });
            }
            console.log('FPForm => ', FPForm)
        }
        else {
            setError(valid)
            setOpenSnack(true)
        }
    }
    const cancle = () => {
        history.push('entryhomepage')
        sessionStorage.setItem('homeSave', 'done')
    }

    //////Patient Data///////////

    useEffect(async () => {

        setAgeValid(true)

        if (props.patient.length) {

            let maxID = await getMaxID();
            let id = ''
            let maxid = ''

            if (maxID) {

                id = maxID.data.data.getMaxID[0].MAX

                maxid = id === null ? 1 : id + 1

                console.log("id =>", maxid)
            }

            setFPForm({
                ...FPForm,
                ID: parseInt(maxid),
                FPREGID: props.patient[0].REGID,
                FPTYPE: props.serviceType === null ? 1 : 2,
                FPTEMPUNIT: '1',
                FPDONOR: sessionStorage.getItem('donor'),
                FPORG: sessionStorage.getItem('org'),
                FPPROJECT: sessionStorage.getItem('project'),
                FPTSP: sessionStorage.getItem('project')==='P-990' ? 'KRN-TSP-002' : props.village[0].TSP_CODE,
                FPVILLAGE: props.village[0].VILLAGE_CODE,
                FPAGE: parseInt(props.patient[0].REGAGE),
                FPAGEUNIT: parseInt(props.patient[0].REGAGEUNIT),
                FPCLNID: props.clinic.length>0 ? props.clinic[0].CLN_CODE : /* sessionStorage.getItem('project') === 'P-990' && sessionStorage.getItem('org') === 'CPI-16' ? */ 'TNTH-001',
                FPUSRLOGIN: sessionStorage.getItem('userName'),
                FPSYNC: 0,
                FPSTATUS: 1,
                FPINSERT: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                FPUPDATE: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                FPMENSCYCLE: 999,
                FPMENSPAIN: 999,
                FPVAGBLEEDING: 999,
                FPOUTCOME: 999,
                FPREFTO: 999,
                FPPREFERENCE: '999',
                FPLMP: moment('1970-01-01').format('YYYY-MM-DD'),
                FPHISA: 999,
                FPSEXUALCONTACT: 999,
                FPCURRENTMETHOD: '999',
                FPCURRENTMETHODDUR: '999',
                FPFUDATE: moment('1970-01-01').format('YYYY-MM-DD'),
                FPOFFMETHOD: '999',
                FPFIRSTMENS: 999,
                FPMARRIAGE: 999,
                FPYOUNGESTCHILD: 999,
                FPYOUNGESTCHILDUNIT: 999
            })

            setFPLabForm({
                ...FPLabForm,
                ID: parseInt(maxid),
                LABREGID: props.patient[0].REGID,
                LABVILLAGE: props.village[0].VILLAGE_CODE,
                LABORG: sessionStorage.getItem('org'),
                LABSSOURCE: 'fp',
                LABINSERT: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                LABUPDATE: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                LABSTATUS: 1,
                LABSYNC: 0,
            })

        }

    }, [])

    return (
        <>
            <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                FP Service</Typography>
            {props.patient.length ?
                <>

                    <CustomRHTable patient={props.patient} serviceType={props.serviceType} />
                    <div style={{ background: '#fcf0f2', paddingTop: '2%' }}>
                        <div className={classes.root} style={{ paddingLeft: "2%", paddingRight: "3%", paddingBottom: "2%" }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        type="date"
                                        label={<Grid row container><Typography color="#482642">Provided Date </Typography>
                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                        variantText="filled"
                                        InputLabelProps={{
                                            style: { color: '#482642' },
                                            shrink: true
                                        }}
                                        onChange={calculateAge}
                                        value={providedDate} />

                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        select
                                        label={<Grid row container><Typography color="#482642">Choose Clinic </Typography>
                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                        variantText="filled"
                                        value={clnCode}
                                        onChange={FPClinicHandleChange}
                                        InputLabelProps={{
                                            style: { color: '#482642' },
                                            shrink: true
                                        }}
                                        SelectProps={{
                                            native: true
                                        }}
                                    >
                                        {props.clinic.length &&
                                            props.clinic.map((option) => (
                                                <option key={option.CLN_CODE} value={option.CLN_CODE}>
                                                    {option.CLN_NAME}
                                                </option>
                                            ))}
                                    </CustomTextField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        select
                                        label={<Grid row container><Typography color="#482642">Provided Village </Typography>
                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                        variantText="filled"
                                        value={villageCode}
                                        onChange={FPVillageHandleChange}
                                        InputLabelProps={{
                                            style: { color: '#482642' },
                                            shrink: true
                                        }}
                                        SelectProps={{
                                            native: true
                                        }}
                                    >
                                        {props.village.length &&
                                            props.village.map((option) => (
                                                <option key={option.VILLAGE_CODE} value={option.VILLAGE_CODE}>
                                                   {option.VILLAGE_NAME + " " + " (" + option.CLN_NAME +","+option.PROJECT_NAME+ ")" }
                                                </option>
                                            ))}
                                    </CustomTextField>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>History </Typography>
                                            </Grid>}
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                {(props.patient.length && props.gender === 1) ?
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        disabled
                                                        inputProps={{ step: "1", min: 0 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Parity </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { setFPForm({ ...FPForm, FPP: 999 }) }}
                                                        value={FPForm.FPP} /> :
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Parity </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 2) ? setFPForm({ ...FPForm, FPP: (e.target.value).slice(0, 2) }) : setFPForm({ ...FPForm, FPP: e.target.value }) }}
                                                        value={FPForm.FPP} />}
                                                {(props.patient.length && props.gender === 1) ?
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        disabled
                                                        inputProps={{ step: "1", min: 0 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Abortion </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { setFPForm({ ...FPForm, FPA: 999 }) }}
                                                        value={FPForm.FPA} /> :
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Abortion </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 2) ? setFPForm({ ...FPForm, FPA: (e.target.value).slice(0, 2) }) : setFPForm({ ...FPForm, FPA: e.target.value }) }}
                                                        value={FPForm.FPA} />}

                                                <ThemeProvider theme={radioTheme}>
                                                    <Card
                                                        variant="outlined"
                                                        style={{
                                                            marginTop: '10px',
                                                            width: '100%',
                                                            marginRight: '10px',
                                                            background: "#fcf0f2"
                                                        }}
                                                    >
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">New Acceptor </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="acceptor"
                                                            name="acceptor1"
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setFPForm({ ...FPForm, FPNA: e.target.value }) }}
                                                            value={FPForm.FPNA}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="Yes"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={FPNAHandleChange} onKeyDown={e => e.key === 'Enter' && FPNAHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={FPNAHandleChange} onKeyDown={e => e.key === 'Enter' && FPNAHandleChange(e)} />}
                                                                label="No"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </ThemeProvider>

                                            </div>


                                        </Card>
                                    </ThemeProvider>
                                </Grid>
                                <ThemeProvider theme={radioTheme}>

                                    <Card
                                        variant="outlined"
                                        style={{
                                            background: "#fcf0f2",
                                            width: '100%',
                                            borderRadius: '10px',
                                            paddingBottom: '10px',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                        }}
                                        className={classes.cardStyle}>
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Examination </Typography>
                                        </Grid>}
                                        <Grid item xs={12} sm={12} md={12} row>

                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: 1, min: 0, maxlength: 5 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642', textAlign: 'center' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Weight(kg) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '9%' }}
                                                onChange={e => { (e.target.value.length > 5) ? setFPForm({ ...FPForm, FPWT: (e.target.value).slice(0, 5) }) : setFPForm({ ...FPForm, FPWT: e.target.value }) }}
                                                value={FPForm.FPWT} />
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: 1, min: 0, maxlength: 5 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642', textAlign: 'center' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Height(cm) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '9%' }}
                                                onChange={e => { (e.target.value.length > 5) ? setFPForm({ ...FPForm, FPHT: (e.target.value).slice(0, 5) }) : setFPForm({ ...FPForm, FPHT: e.target.value }) }}
                                                value={FPForm.FPHT} />
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0, maxLength: 5 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642', textAlign: 'center' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Temp </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '7%' }}
                                                onChange={e => { (e.target.value.length > 5) ? setFPForm({ ...FPForm, FPTEMP: (e.target.value).slice(0, 5) }) : setFPForm({ ...FPForm, FPTEMP: e.target.value }) }}
                                                value={FPForm.FPTEMP} />

                                            <FormControl style={{ width: '15%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Unit </Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setFPForm({ ...FPForm, FPTEMPUNIT: e.target.value }) }}
                                                        value={FPForm.FPTEMPUNIT}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="°F"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={FPTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && FPTempUnitHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={FPTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && FPTempUnitHandleChange(e)} />}
                                                            label="°C"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </FormControl>

                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Pulse Rate(/min) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '12%' }}
                                                onChange={e => { setFPForm({ ...FPForm, FPPR: parseInt(e.target.value) }) }}
                                                value={FPForm.FPPR} />
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642', textAlign: 'center' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Respiratory Rate(/min) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '13%' }}
                                                onChange={e => { setFPForm({ ...FPForm, FPRR: parseInt(e.target.value) }) }}
                                                value={FPForm.FPRR} />

                                            <CustomTextField
                                                id="filled-basic"
                                                label="BP(mmHg)"
                                                variantText="filled"
                                                style={{ marginTop: '10px', width: '10%' }}
                                                onChange={e => { setFPForm({ ...FPForm, FPBP: e.target.value }) }}
                                                value={FPForm.FPBP}
                                            />

                                            <FormControlLabel
                                                style={{ marginTop: '10px' }}
                                                control={
                                                    <Switch
                                                        checked={labTest}
                                                        onChange={labTestHandle}
                                                        name="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                }}
                                                label="LabTest"
                                                labelPlacement="top"
                                            />
                                        </Grid>


                                    </Card>

                                </ThemeProvider>
                                {labTest &&
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px',
                                                marginTop: '20px'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Investigation </Typography>
                                            </Grid>}
                                            <Grid container spacing={1} style={{ marginBottom: '10px' }}>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">RDT</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={RDT}
                                                            onChange={RDTHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>PF</MenuItem>
                                                            <MenuItem value={2}>PV</MenuItem>
                                                            <MenuItem value={3}>Mixed</MenuItem>
                                                            <MenuItem value={4}>Negative</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Microscopic</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={microscopic}
                                                            onChange={microscopicHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Not Seen</MenuItem>
                                                            <MenuItem value={2}>Pf</MenuItem>
                                                            <MenuItem value={3}>Pf+</MenuItem>
                                                            <MenuItem value={4}>Pf++</MenuItem>
                                                            <MenuItem value={5}>Pf+++</MenuItem>
                                                            <MenuItem value={6}>Pv</MenuItem>
                                                            <MenuItem value={7}>Pv+</MenuItem>
                                                            <MenuItem value={8}>Pv++</MenuItem>
                                                            <MenuItem value={9}>Pv+++</MenuItem>
                                                            <MenuItem value={10}>Mixed</MenuItem>
                                                            <MenuItem value={11}>Po</MenuItem>
                                                            <MenuItem value={12}>Po+</MenuItem>
                                                            <MenuItem value={13}>Po++</MenuItem>
                                                            <MenuItem value={14}>Po+++</MenuItem>
                                                            <MenuItem value={15}>Pm</MenuItem>
                                                            <MenuItem value={16}>Pm+</MenuItem>
                                                            <MenuItem value={17}>Pm++</MenuItem>
                                                            <MenuItem value={18}>Pm+++</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <CustomUnicefTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">HB(%) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '11px', width: '95%' }}
                                                        onChange={e => { setFPLabForm({ ...FPLabForm, LABHB: e.target.value }) }}
                                                        value={FPLabForm.LABHB} />
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">BloodGroup</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={blood}
                                                            onChange={bloodHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>A</MenuItem>
                                                            <MenuItem value={2}>B</MenuItem>
                                                            <MenuItem value={3}>O</MenuItem>
                                                            <MenuItem value={4}>AB</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">RH</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={RH}
                                                            onChange={RHHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Rh+</MenuItem>
                                                            <MenuItem value={2}>Rh-</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">UrineProtein</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={urineProtein}
                                                            onChange={urintProteinHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>None</MenuItem>
                                                            <MenuItem value={2}>Trace</MenuItem>
                                                            <MenuItem value={3}>+</MenuItem>
                                                            <MenuItem value={4}>++</MenuItem>
                                                            <MenuItem value={5}>+++</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">UCG/HCG</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={UCG}
                                                            onChange={UCGHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Positive</MenuItem>
                                                            <MenuItem value={2}>Negative</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Urine Sugar</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={urine}
                                                            onChange={urineHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>None</MenuItem>
                                                            <MenuItem value={2}>Trace</MenuItem>
                                                            <MenuItem value={3}>+</MenuItem>
                                                            <MenuItem value={4}>++</MenuItem>
                                                            <MenuItem value={5}>+++</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Gonorrhoea</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={gonorrhoea}
                                                            onChange={gonorrhoeaHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Seen</MenuItem>
                                                            <MenuItem value={2}>Not Seen</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Trichomonus</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={trichomonus}
                                                            onChange={trichomonusHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Seen</MenuItem>
                                                            <MenuItem value={2}>Not Seen</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Candida</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={candida}
                                                            onChange={candidaHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Seen</MenuItem>
                                                            <MenuItem value={2}>Not Seen</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">RPR</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={RPR}
                                                            onChange={RPRHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">TPHA</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={TPHA}
                                                            onChange={TPHAHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">VDRL</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={VDRL}
                                                            onChange={VDRLHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">HIV</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={HIV}
                                                            onChange={HIVHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                            <MenuItem value={3}>Invalid</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">HBV</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={HBV}
                                                            onChange={HBVHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                            <MenuItem value={3}>Invalid</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Hep-C</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={HepC}
                                                            onChange={HepCHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                            <MenuItem value={3}>Invalid</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <CustomUnicefTextField
                                                        id="filled-basic"
                                                        label="Remark"
                                                        variantText="filled"
                                                        style={{ marginTop: '11px', width: '95%' }}
                                                        onChange={e => { setFPLabForm({ ...FPLabForm, LABOTHER: e.target.value }) }}
                                                        value={FPLabForm.LABOTHER}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <CustomUnicefTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ min: 0 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">RBS </Typography>
                                                        </Grid>}
                                                        style={{ width: '95%', marginTop: '11px' }}
                                                        onChange={e => { setFPLabForm({ ...FPLabForm, LABRBS: e.target.value }) }}
                                                        value={FPLabForm.LABRBS} />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </ThemeProvider>}
                                <Grid item xs={12} sm={12} md={12}>
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px',
                                                alignItems: 'center'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Supplies </Typography>
                                            </Grid>}

                                            <Card
                                                variant="outlined"
                                                style={{
                                                    background: "#fcf0f2",
                                                    width: '98%',
                                                    borderRadius: '10px',
                                                    marginLeft: '1%'
                                                }}
                                                className={classes.cardStyle}>
                                                {<Grid row container style={{ background: '#6C5268', color: 'white', padding: '10px' }}><Typography>Short Term </Typography>
                                                </Grid>}
                                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Depo(SC) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPDEPOSC: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPDEPO: e.target.value }) }}
                                                        value={FPForm.FPDEPOSC} />
                                                        {
                                                            (sessionStorage.getItem('project') === 'P-008' || sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
                                                            sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86') ? 
                                                            <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Depo(M) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPDEPO: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPDEPO: e.target.value }) }}
                                                        value={FPForm.FPDEPO} />
                                                            : null 
                                                        }
                                                     <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Depo(M) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPDEPO: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPDEPO: e.target.value }) }}
                                                        value={FPForm.FPDEPO} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">COC </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPCOC: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPCOC: e.target.value }) }}
                                                        value={FPForm.FPCOC} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">POP </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPPOP: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPPOP: e.target.value }) }}
                                                        value={FPForm.FPPOP} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">EC </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPEC: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPEC: e.target.value }) }}
                                                        value={FPForm.FPEC} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Condom(Male) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPCONDOMM: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPCONDOMM: e.target.value }) }}
                                                        value={FPForm.FPCONDOMM} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Condom(Female) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPCONDOMF: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPCONDOMF: e.target.value }) }}
                                                        value={FPForm.FPCONDOMF} />
                                                </div>
                                            </Card>
                                            {(props.patient.length && props.gender === 1) ?
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        background: "#fcf0f2",
                                                        width: '98%',
                                                        borderRadius: '10px',
                                                        marginLeft: '1%'
                                                    }}
                                                    className={classes.cardStyle}>
                                                    {<Grid row container style={{ background: '#6C5268', color: 'white', padding: '10px' }}><Typography>Long Term </Typography>
                                                    </Grid>}
                                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>

                                                        <ThemeProvider theme={radioTheme}>
                                                            <Card
                                                                variant="outlined"
                                                                style={{
                                                                    marginTop: '10px',
                                                                    width: '70%',
                                                                    marginRight: '10px',
                                                                    marginLeft: '5%',
                                                                    background: "#fcf0f2"
                                                                }}
                                                            >
                                                                {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Implant </Typography>
                                                                </Grid>}

                                                                <RadioGroup
                                                                    aria-label="removal"
                                                                    name="removal1"
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                        flexDirection: 'row',
                                                                        justifyContent: "space-around"
                                                                    }}
                                                                    onChange={e => { setImplant(e.target.value) }}
                                                                    value={implant}
                                                                    row={true}
                                                                >
                                                                    <FormControlLabel
                                                                        value="3"
                                                                        labelPlacement="left"
                                                                        disabled
                                                                        label="3 Year"
                                                                        style={{ height: "30px" }}
                                                                        className={classes.fontSize}
                                                                        control={<Radio size="small" color="primary"
                                                                            onClick={implantHandleChange} onKeyDown={e => e.key === 'Enter' && implantHandleChange(e)} />}
                                                                    />
                                                                    <FormControlLabel
                                                                        value="4"
                                                                        labelPlacement="left"
                                                                        disabled
                                                                        style={{ height: "30px" }}
                                                                        className={classes.fontSize}
                                                                        control={<Radio size="small" color="primary"
                                                                            onClick={implantHandleChange} onKeyDown={e => e.key === 'Enter' && implantHandleChange(e)} />}
                                                                        label="4 Year"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="5"
                                                                        labelPlacement="left"
                                                                        disabled
                                                                        style={{ height: "30px" }}
                                                                        className={classes.fontSize}
                                                                        control={<Radio size="small" color="primary"
                                                                            onClick={implantHandleChange} onKeyDown={e => e.key === 'Enter' && implantHandleChange(e)} />}
                                                                        label="5 Year"
                                                                    />
                                                                </RadioGroup>
                                                            </Card>
                                                        </ThemeProvider>
                                                        <FormControl variant="filled" className={classes.thirdFormControl}>
                                                            <InputLabel id="demo-simple-select-filled-label">IUD</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-filled-label"
                                                                id="demo-simple-select-filled"
                                                                style={{ width: '100%' }}
                                                                disabled
                                                                multiple
                                                                value={IUD}
                                                                onChange={IUDHandleChange}
                                                                renderValue={(selected) => selected.join(', ')}
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left",
                                                                    },
                                                                    style: {
                                                                        maxHeight: 300,
                                                                    },
                                                                    getContentAnchorEl: null
                                                                }}>

                                                                <MenuItem value={'Copper T'}>Copper T</MenuItem>
                                                                <MenuItem value={'Multi-load'}>Multi-load</MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                    </div>
                                                </Card> :
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        background: "#fcf0f2",
                                                        width: '98%',
                                                        borderRadius: '10px',
                                                        marginLeft: '1%'
                                                    }}
                                                    className={classes.cardStyle}>
                                                    {<Grid row container style={{ background: '#6C5268', color: 'white', padding: '10px' }}><Typography>Long Term </Typography>
                                                    </Grid>}
                                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>

                                                        <ThemeProvider theme={radioTheme}>
                                                            <Card
                                                                variant="outlined"
                                                                style={{
                                                                    marginTop: '10px',
                                                                    width: '70%',
                                                                    marginRight: '10px',
                                                                    marginLeft: '5%',
                                                                    background: "#fcf0f2"
                                                                }}
                                                            >
                                                                {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Implant </Typography>
                                                                </Grid>}

                                                                <RadioGroup
                                                                    aria-label="removal"
                                                                    name="removal1"
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                        flexDirection: 'row',
                                                                        justifyContent: "space-around"
                                                                    }}
                                                                    onChange={e => { setImplant(e.target.value) }}
                                                                    value={implant}
                                                                    row={true}
                                                                >
                                                                    <FormControlLabel
                                                                        value="3"
                                                                        labelPlacement="left"

                                                                        label="3 Year"
                                                                        style={{ height: "30px" }}
                                                                        className={classes.fontSize}
                                                                        control={<Radio size="small" color="primary"
                                                                            onClick={implantHandleChange} onKeyDown={e => e.key === 'Enter' && implantHandleChange(e)} />}
                                                                    />
                                                                    <FormControlLabel
                                                                        value="4"
                                                                        labelPlacement="left"

                                                                        style={{ height: "30px" }}
                                                                        className={classes.fontSize}
                                                                        control={<Radio size="small" color="primary"
                                                                            onClick={implantHandleChange} onKeyDown={e => e.key === 'Enter' && implantHandleChange(e)} />}
                                                                        label="4 Year"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="5"
                                                                        labelPlacement="left"

                                                                        style={{ height: "30px" }}
                                                                        className={classes.fontSize}
                                                                        control={<Radio size="small" color="primary"
                                                                            onClick={implantHandleChange} onKeyDown={e => e.key === 'Enter' && implantHandleChange(e)} />}
                                                                        label="5 Year"
                                                                    />
                                                                </RadioGroup>
                                                            </Card>
                                                        </ThemeProvider>
                                                        <FormControl variant="filled" className={classes.thirdFormControl}>
                                                            <InputLabel id="demo-simple-select-filled-label">IUD</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-filled-label"
                                                                id="demo-simple-select-filled"
                                                                style={{ width: '100%' }}
                                                                multiple
                                                                value={IUD}
                                                                onChange={IUDHandleChange}
                                                                renderValue={(selected) => selected.join(', ')}
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left",
                                                                    },
                                                                    style: {
                                                                        maxHeight: 300,
                                                                    },
                                                                    getContentAnchorEl: null
                                                                }}>

                                                                <MenuItem value={'Copper T'}>Copper T</MenuItem>
                                                                <MenuItem value={'Multi-load'}>Multi-load</MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                    </div>
                                                </Card>}

                                            <Card
                                                variant="outlined"
                                                style={{
                                                    background: "#fcf0f2",
                                                    width: '98%',
                                                    borderRadius: '10px',
                                                    marginLeft: '1%'
                                                }}
                                                className={classes.cardStyle}>
                                                {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Back up Supplies</Typography>
                                                </Grid>}
                                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Condom(Male) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPCONDOMMBK: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPCONDOMMBK: e.target.value }) }}
                                                        value={FPForm.FPCONDOMMBK} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Condom(Female) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPCONDOMFBK: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPCONDOMFBK: e.target.value }) }}
                                                        value={FPForm.FPCONDOMFBK} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">EC Pills </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 3) ? setFPForm({ ...FPForm, FPECBK: (e.target.value).slice(0, 3) }) : setFPForm({ ...FPForm, FPECBK: e.target.value }) }}
                                                        value={FPForm.FPECBK} />

                                                </div>
                                            </Card>
                                            {(props.patient.length && props.gender === 1) ?
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        background: "#fcf0f2",
                                                        width: '98%',
                                                        borderRadius: '10px',
                                                        marginLeft: '1%'
                                                    }}
                                                    className={classes.cardStyle}>
                                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Referral For Longterm</Typography>
                                                    </Grid>}
                                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>

                                                        <FormControl variant="filled" className={classes.secondFormControl}>
                                                            <InputLabel id="demo-simple-select-filled-label">Referral Implant</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-filled-label"
                                                                id="demo-simple-select-filled"
                                                                style={{ width: '100%' }}
                                                                disabled
                                                                multiple
                                                                value={refImplant}
                                                                onChange={refImplantHandle}
                                                                renderValue={(selected) => selected.join(', ')}
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left",
                                                                    },
                                                                    style: {
                                                                        maxHeight: 300,
                                                                    },
                                                                    getContentAnchorEl: null
                                                                }}>

                                                                <MenuItem value={'Imp'}>Imp</MenuItem>
                                                                <MenuItem value={'IUD'}>IUD</MenuItem>
                                                                <MenuItem value={'Vasectomy'}>Vasectomy</MenuItem>
                                                                <MenuItem value={'Tubal Ligation(TL)'}>Tubal Ligation(TL)</MenuItem>
                                                            </Select>
                                                        </FormControl>



                                                    </div>
                                                </Card> :
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        background: "#fcf0f2",
                                                        width: '98%',
                                                        borderRadius: '10px',
                                                        marginLeft: '1%'
                                                    }}
                                                    className={classes.cardStyle}>
                                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Referral For Longterm</Typography>
                                                    </Grid>}
                                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>

                                                        <FormControl variant="filled" className={classes.secondFormControl}>
                                                            <InputLabel id="demo-simple-select-filled-label">Referral Implant</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-filled-label"
                                                                id="demo-simple-select-filled"
                                                                style={{ width: '100%' }}
                                                                multiple
                                                                value={refImplant}
                                                                onChange={refImplantHandle}
                                                                renderValue={(selected) => selected.join(', ')}
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left",
                                                                    },
                                                                    style: {
                                                                        maxHeight: 300,
                                                                    },
                                                                    getContentAnchorEl: null
                                                                }}>

                                                                <MenuItem value={'Imp'}>Imp</MenuItem>
                                                                <MenuItem value={'IUD'}>IUD</MenuItem>
                                                                <MenuItem value={'Vasectomy'}>Vasectomy</MenuItem>
                                                                <MenuItem value={'Tubal Ligation(TL)'}>Tubal Ligation(TL)</MenuItem>
                                                            </Select>
                                                        </FormControl>



                                                    </div>
                                                </Card>}

                                        </Card>
                                    </ThemeProvider>
                                </Grid>
                                {(props.patient.length && props.gender === 1) ?
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                alignContent: 'center',
                                                borderRadius: '10px',
                                                marginLeft: '10px',
                                                marginRight: '10px'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Removal-Counselling </Typography>
                                            </Grid>}
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                <ThemeProvider theme={radioTheme}>
                                                    <Card
                                                        variant="outlined"
                                                        style={{
                                                            marginTop: '10px',
                                                            width: '50%',
                                                            marginRight: '10px',
                                                            marginLeft: '5%',
                                                            background: "#fcf0f2"
                                                        }}
                                                    >
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Removal </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="removal"
                                                            name="removal1"
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setFPForm({ ...FPForm, FPREMOVAL: 999 }) }}
                                                            value={FPForm.FPREMOVAL}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                disabled
                                                                label="Imp"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={removalHandleChange} onKeyDown={e => e.key === 'Enter' && removalHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                disabled
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={removalHandleChange} onKeyDown={e => e.key === 'Enter' && removalHandleChange(e)} />}
                                                                label="IUD"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </ThemeProvider>
                                                <FormControl variant="filled" className={classes.secondFormControl}>
                                                    <InputLabel id="demo-simple-select-filled-label">Counselling</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        style={{ width: '100%', marginTop: '8px' }}
                                                        multiple
                                                        value={counselling}
                                                        disabled
                                                        onChange={counsellingHandle}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left",
                                                            },
                                                            style: {
                                                                maxHeight: 300,
                                                            },
                                                            getContentAnchorEl: null
                                                        }}>

                                                        <MenuItem value={'Fertility'}>Fertility</MenuItem>
                                                        <MenuItem value={'FP'}>FP</MenuItem>
                                                    </Select>
                                                </FormControl>

                                            </div>
                                        </Card>
                                    </ThemeProvider> :
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px',
                                                marginLeft: '10px',
                                                marginRight: '10px'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Removal-Counselling </Typography>
                                            </Grid>}

                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                                                <ThemeProvider theme={radioTheme}>
                                                    <Card
                                                        variant="outlined"
                                                        style={{
                                                            marginTop: '10px',
                                                            width: '50%',
                                                            marginRight: '10px',
                                                            marginLeft: '5%',
                                                            background: "#fcf0f2"
                                                        }}
                                                    >
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Removal </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="removal"
                                                            name="removal1"
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setFPForm({ ...FPForm, FPREMOVAL: e.target.value }) }}
                                                            value={FPForm.FPREMOVAL}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="Imp"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={removalHandleChange} onKeyDown={e => e.key === 'Enter' && removalHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={removalHandleChange} onKeyDown={e => e.key === 'Enter' && removalHandleChange(e)} />}
                                                                label="IUD"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </ThemeProvider>
                                                <FormControl variant="filled" className={classes.secondFormControl}>
                                                    <InputLabel id="demo-simple-select-filled-label">Counselling</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        style={{ width: '100%', marginTop: '8px' }}
                                                        multiple
                                                        value={counselling}
                                                        onChange={counsellingHandle}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left",
                                                            },
                                                            style: {
                                                                maxHeight: 300,
                                                            },
                                                            getContentAnchorEl: null
                                                        }}>

                                                        <MenuItem value={'Fertility'}>Fertility</MenuItem>
                                                        <MenuItem value={'FP'}>FP</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </Card>
                                    </ThemeProvider>}

                                <ThemeProvider theme={radioTheme}>
                                    <Card
                                        variant="outlined"
                                        style={{
                                            background: "#fcf0f2",
                                            width: '100%',
                                            borderRadius: '10px',
                                            marginLeft: '10px',
                                            marginRight: '10px'
                                        }}
                                        className={classes.cardStyle}>
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Patient Outcome </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                    <InputLabel id="demo-simple-select-filled-label">Patient Outcome</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        style={{ width: '95%' }}
                                                        value={patientOutcome}
                                                        onChange={patientOutcomeHandle}
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left",
                                                            },
                                                            style: {
                                                                maxHeight: 300,
                                                            },
                                                            getContentAnchorEl: null
                                                        }}>
                                                        <MenuItem value={999}>-</MenuItem>
                                                        <MenuItem value={1}>OPD</MenuItem>
                                                        <MenuItem value={2}>IPD</MenuItem>
                                                        <MenuItem value={3}>Referral</MenuItem>
                                                        <MenuItem value={4}>Death</MenuItem>
                                                        <MenuItem value={5}>Discharge</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            {patientOutcome === 3 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Provided ReferPlace</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            style={{ width: '95%' }}
                                                            value={referPlace}
                                                            onChange={referPlaceHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Gov Hospital</MenuItem>
                                                            <MenuItem value={2}>MTC</MenuItem>
                                                            <MenuItem value={3}>NGO</MenuItem>
                                                            <MenuItem value={4}>Thai Hospital</MenuItem>
                                                            <MenuItem value={5}>Others</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Reasons of Referral"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', width: '90%' }}
                                                        onChange={e => { setFPForm({ ...FPForm, FPREFREASON: e.target.value }) }}
                                                        value={FPForm.FPREFREASON}
                                                    />
                                                </Grid></>}
                                            {patientOutcome === 4 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Reasons of Death"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                        onChange={e => { setFPForm({ ...FPForm, FPDEATHREASON: e.target.value }) }}
                                                        value={FPForm.FPDEATHREASON}
                                                    />
                                                </Grid></>}
                                            {patientOutcome === 3 && referPlace === 5 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Other Referral"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                        onChange={e => { setFPForm({ ...FPForm, FPREFTOOTHER: e.target.value }) }}
                                                        value={FPForm.FPREFTOOTHER}
                                                    />
                                                </Grid>
                                            </>}

                                        </div>



                                    </Card>
                                </ThemeProvider>
                                <Grid item xs={12} sm={8} md={8}>
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px',

                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Provider Information</Typography>
                                            </Grid>}
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Provider Name"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', width: '90%' }}
                                                        onChange={e => { setFPForm({ ...FPForm, FPPROVIDERNAME: e.target.value }) }}
                                                        value={FPForm.FPPROVIDERNAME}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Provider Position </Typography>
                                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            style={{ width: '100%' }}
                                                            value={proPosition}
                                                            onChange={proPositionHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>EmOCW</MenuItem>
                                                            <MenuItem value={2}>MCHW</MenuItem>
                                                            <MenuItem value={3}>Medic</MenuItem>
                                                            <MenuItem value={4}>CHW</MenuItem>
                                                            <MenuItem value={5}>AMW</MenuItem>
                                                            <MenuItem value={6}>Nurse</MenuItem>
                                                            <MenuItem value={7}>Doctor</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Provided Place </Typography>
                                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            style={{ width: '100%' }}
                                                            value={proPlace}
                                                            onChange={proPlaceHandle}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                                getContentAnchorEl: null
                                                            }}>
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Clinic</MenuItem>
                                                            <MenuItem value={2}>Outreach</MenuItem>
                                                            <MenuItem value={3}>Volunteer</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>



                                            </div>



                                        </Card>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        label="Remark/Comment"
                                        variantText="filled"
                                        style={{ marginTop: '30px', width: '95%' }}
                                        onChange={e => { setFPForm({ ...FPForm, FPREMARK: e.target.value }) }}
                                        value={FPForm.FPREMARK}
                                    />
                                </Grid>

                            </Grid>
                        </div>
                        {ageValid && <>
                            <Grid container spacing={10} alignItems="center" justifyContent="center" style={{ padding: '20px' }} row>
                                <Grid item xs={'auto'} style={{ width: '18%' }}>
                                    <Button
                                        variant="contained"
                                        style={{ background: '#482642', color: '#fff', width: '100%' }}
                                        onClick={save} >Save</Button>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '18%' }}>
                                    <Button
                                        variant="contained"
                                        style={{ background: '#482642', color: '#fff', width: '100%' }}
                                        onClick={cancle} >Cancel</Button>
                                </Grid>
                            </Grid>
                        </>}
                        {openSnack && <CustomSnackBar open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
                        {ageSnack && <CustomSnackBar open={setAgeSnackBarOpen} close={setAgeSnackBarClose} alertMsg={ageError} type="warning" />}
                        {successSnack && <CustomSnackBar open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}


                    </div> </> : <div style={{ textAlign: 'center', background: '#fcf0f2' }}>
                    <img
                        src={noPatientLogo}
                        alt="nopatient"
                        height={420}
                        style={{ alignSelf: 'center' }}
                    /></div>}


        </>);
}
