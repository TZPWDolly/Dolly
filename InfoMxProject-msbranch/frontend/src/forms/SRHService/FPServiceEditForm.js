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
import { Button, Checkbox, Input, ListItemText, OutlinedInput, setRef, Snackbar, SnackbarContent, Switch, TextField, Typography } from "@material-ui/core";

import CustomTextField from "../../components/controls/CustomTextFieldFilled";
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomSnackBar from "../../components/controls/CustomSnackBar";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import _ from 'lodash';

//////////////API/////////////////
import { insertFP, updateFP } from "../../modals/fpinfo";
import { insertLab, updateLab } from "../../modals/labinfo";
import { getMaxID } from "../../modals/maxid";
import * as serviceLab from '../../modals/service_labdatabyid'
import * as serviceData from '../../modals/rhservicedatabyid'
import * as labData from '../../modals/rhlabdatabyid'
//import * as service from "../../modals/service";
import * as clinic from "../../modals/clinicbyorgproj"
import * as village from "../../modals/villagebyorgproj"

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

export default function FPServiceEditForm(props) {

    const classes = useStyles();

    const history = useHistory();

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [serviceTypeData, setServiceTypeData] = useState('')
    const [patientOC, setPatientOC] = useState([])
    const [clinicData, setClinicData] = useState([])
    const [villageData, setVillageData] = useState([])

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
        FPFIRSTMENS: 999,
        FPMARRIAGE: 999,
        FPYOUNGESTCHILD: 999,
        FPYOUNGESTCHILDUNIT: 999,
        FPP: '',
        FPA: '',
        FPREASON: '',
        FPMENSCYCLE: 999,
        FPMENSPAIN: 999,
        FPVAGBLEEDING: 999,
        FPPREFERENCE: '999',
        FPHISA: 999,
        FPSEXUALCONTACT: 999,
        FPCURRENTMETHOD: '999',
        FPCURRENTMETHODDUR: '999',
        FPCONDOMM: '',
        FPCONDOMF: '',
        FPDEPO: '',
        FPDEPOSC: '',
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
        FPOFFMETHOD: '999',
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
        FPSYNC: '',
        ID: '',
        FPREMOVAL: ''
    });

    const [FPLabForm, setFPLabForm] = useState({
        LABREGID: '',
        LABPROVIDEDDATE: '',
        LABPLACE: '',
        LABVILLAGE: '',
        LABRDT: '',
        LABMICROSCOPIC: '',
        LABHB: '',
        LABBG: '',
        LABRH: '',
        LABUCG: '',
        LABUSUGAR: '',
        LABUPROTEIN: '',
        LABGONO: '',
        LABTRICHO: '',
        LABCANDIDA: '',
        LABRPR: '',
        LABTPHA: '',
        LABVDRL: '',
        LABHIV: '',
        LABHBV: '',
        LABHCV: '',
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
        let a = await Number(patientData[0].REGAGE) * Number(patientData[0].REGAGEUNIT);
        let b = await new Date(date);
        let c = await new Date(patientData[0].REGDATE);
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

    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageCode, setVillageCode] = useState('')
    const FPVillageHandleChange = (event) => {
        let tsp = _.find(villageData, ['VILLAGE_CODE', event.target.value]);
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
    const [FPNA, setFPNA] = useState('')
    function FPNAHandleChange(event) {
        if (event.target.value === FPNA) {
            setFPNA("")
            setFPForm({ ...FPForm, FPNA: "" })
        } else {
            setFPNA(event.target.value)
            setFPForm({ ...FPForm, FPNA: event.target.value })
        }
    }

    const [FPTempUnit, setFPTempUnit] = useState('')
    function FPTempUnitHandleChange(event) {
        if (event.target.value === FPTempUnit) {
            setFPTempUnit("")
            setFPForm({ ...FPForm, FPTEMPUNIT: "" })
        } else {
            setFPTempUnit(event.target.value)
            setFPForm({ ...FPForm, FPTEMPUNIT: event.target.value })
        }
    }

    const [removal, setRemoval] = useState('')
    function removalHandleChange(event) {
        if (event.target.value === removal) {
            setRemoval("")
            setFPForm({ ...FPForm, FPREMOVAL: "" })
        } else {
            setRemoval(event.target.value)
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

    ///////////////Update Cancle btn/////////////
    const update = async () => {
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
            FPForm.FPUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            FPForm.FPSTATUS = 2
    
            var labHB = FPLabForm.LABHB === '' ? 999 : FPLabForm.LABHB
            FPLabForm.LABHB = labHB
            var labRBS = FPLabForm.LABRBS === '' ? 999 : FPLabForm.LABRBS
            FPLabForm.LABRBS = labRBS
    
            var lab = labTest === false ? 0 : 1;
            FPForm.FPLAB = lab
            FPLabForm.LABTEST = lab
    
            FPLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            
            const res = await updateFP({ FPForm, FPLabForm });

            if (res?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully updated a patient's FP Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openFPUpdateSnackbar: true
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

        if (sessionStorage.getItem('editFPPatient') === 'true') {
            setAgeValid(true)
            setLoading(true)

            let service = await serviceData.getServiceData()
            let lab = await labData.getLabData()
            let cData = await clinic.getClinicByOrgProj()
            let vData = await village.getVillageByOrgProj()
            let pData = await serviceLab.getPatient()

            if (cData && vData) {
                setClinicData(cData.data.data.getClinicByOrgProj)
                setVillageData(vData.data.data.getVillageByOrgProj)
            }

            if (pData) {
                setPatientData(pData.data.data.getPatient)
            }

            if (service && lab) {

                let serviceData = service.data.data.getServiceData;

                setPatientOC(service.data.data.getServiceData)

                FPForm.FPREGID = serviceData[0].FPREGID
                FPForm.FPPROVIDEDDATE = moment(serviceData[0].FPPROVIDEDDATE).format("YYYY-MM-DD")
                setProvidedDate(moment(serviceData[0].FPPROVIDEDDATE).format("YYYY-MM-DD"))
                FPForm.FPTYPE = serviceData[0].FPTYPE
                FPForm.FPDONOR = serviceData[0].FPDONOR
                FPForm.FPORG = serviceData[0].FPORG
                FPForm.FPPROJECT = serviceData[0].FPPROJECT
                FPForm.FPTSP = serviceData[0].FPTSP
                setTspCode(serviceData[0].FPTSP)
                FPForm.FPPLACE = serviceData[0].FPPLACE
                setProPlace(serviceData[0].FPPLACE)
                FPForm.FPVILLAGE = serviceData[0].FPVILLAGE
                setVillageCode(serviceData[0].FPVILLAGE)
                FPForm.FPPROVIDERNAME = serviceData[0].FPPROVIDERNAME
                FPForm.FPPROVIDERPOSITION = serviceData[0].FPPROVIDERPOSITION
                setProPosition(serviceData[0].FPPROVIDERPOSITION)
                FPForm.FPWT = serviceData[0].FPWT === 999.9 ? '' : serviceData[0].FPWT
                FPForm.FPHT = serviceData[0].FPHT === 999.9 ? '' : serviceData[0].FPHT
                FPForm.FPBP = serviceData[0].FPBP === '000/000' ? '' : serviceData[0].FPBP
                FPForm.FPPR = serviceData[0].FPPR === 999 ? '' : serviceData[0].FPPR
                FPForm.FPRR = serviceData[0].FPRR === 999 ? '' : serviceData[0].FPRR
                FPForm.FPTEMP = serviceData[0].FPTEMP === 999.9 ? '' : serviceData[0].FPTEMP
                FPForm.FPP = serviceData[0].FPP === 999 ? '' : serviceData[0].FPP
                FPForm.FPA = serviceData[0].FPA === 999 ? '' : serviceData[0].FPA
                FPForm.FPCONDOMM = serviceData[0].FPCONDOMM === 999 ? '' : serviceData[0].FPCONDOMM
                FPForm.FPCONDOMF = serviceData[0].FPCONDOMF === 999 ? '' : serviceData[0].FPCONDOMF
                FPForm.FPDEPO = serviceData[0].FPDEPO === 999 ? '' : serviceData[0].FPDEPO
                FPForm.FPDEPOSC = serviceData[0].FPDEPOSC === 999 ? '' : serviceData[0].FPDEPOSC
                FPForm.FPCOC = serviceData[0].FPCOC === 999 ? '' : serviceData[0].FPCOC
                FPForm.FPPOP = serviceData[0].FPPOP === 999 ? '' : serviceData[0].FPPOP
                FPForm.FPEC = serviceData[0].FPEC === 999 ? '' : serviceData[0].FPEC
                if (serviceData[0].FPIMP3 === 1) {
                    setImplant('3')
                    FPForm.FPIMP3 = 1
                }
                if (serviceData[0].FPIMP4 === 1) {
                    setImplant('4')
                    FPForm.FPIMP4 = 1
                }
                if (serviceData[0].FPIMP5 === 1) {
                    setImplant('5')
                    FPForm.FPIMP5 = 1
                }

                FPForm.FPIUDCU = serviceData[0].FPIUDCU === 999 ? '' : serviceData[0].FPIUDCU
                FPForm.FPIUDMULTI = serviceData[0].FPIUDMULTI === 999 ? '' : serviceData[0].FPIUDMULTI
                var IUDArr = []
                var IUDArr1 = serviceData[0].FPIUDCU === 1 ? IUDArr.push('Copper T') : null
                var IUDArr2 = serviceData[0].FPIUDMULTI === 1 ? IUDArr.push('Multi-load') : null
                setIUD(IUDArr)
                FPForm.FPNA = serviceData[0].FPNA === 1 ? '1' : '2'
                FPForm.FPREFIMP = serviceData[0].FPREFIMP === 999 ? '' : serviceData[0].FPREFIMP
                FPForm.FPREFIUD = serviceData[0].FPREFIUD === 999 ? '' : serviceData[0].FPREFIUD
                FPForm.FPREFTL = serviceData[0].FPREFTL === 999 ? '' : serviceData[0].FPREFTL
                FPForm.FPREFVT = serviceData[0].FPREFVT === 999 ? '' : serviceData[0].FPREFVT
                var refArr = []
                var refArr1 = serviceData[0].FPREFIMP === 1 ? refArr.push('Imp') : null
                var refArr2 = serviceData[0].FPREFIUD === 1 ? refArr.push('IUD') : null
                var refArr3 = serviceData[0].FPREFTL === 1 ? refArr.push('Tubal Ligation(TL)') : null
                var refArr4 = serviceData[0].FPREFVT === 1 ? refArr.push('Vasectomy') : null
                setRefImplant(refArr)
                FPForm.FPCSLFP = serviceData[0].FPCSLFP === 999 ? '' : serviceData[0].FPCSLFP
                FPForm.FPCSLFER = serviceData[0].FPCSLFER === 999 ? '' : serviceData[0].FPCSLFER
                var counsellingArr = []
                var counsellingArr1 = serviceData[0].FPCSLFP === 1 ? counsellingArr.push('Fertility') : null
                var counsellingArr2 = serviceData[0].FPCSLFER === 1 ? counsellingArr.push('FP') : null
                setCounselling(counsellingArr)
                FPForm.FPCONDOMMBK = serviceData[0].FPCONDOMMBK === 999 ? '' : serviceData[0].FPCONDOMMBK
                FPForm.FPCONDOMFBK = serviceData[0].FPCONDOMFBK === 999 ? '' : serviceData[0].FPCONDOMFBK
                FPForm.FPECBK = serviceData[0].FPECBK === 999 ? '' : serviceData[0].FPECBK
                FPForm.FPOUTCOME = serviceData[0].FPOUTCOME === 999 ? '' : serviceData[0].FPOUTCOME
                setPatientOutcome(serviceData[0].FPOUTCOME === 999 ? '' : serviceData[0].FPOUTCOME)
                FPForm.FPREFTO = serviceData[0].FPREFTO === 999 ? '' : serviceData[0].FPREFTO
                setReferPlace(serviceData[0].FPREFTO === 999 ? '' : serviceData[0].FPREFTO)
                FPForm.FPDEATHREASON = serviceData[0].FPDEATHREASON
                FPForm.FPUSRLOGIN = serviceData[0].FPUSRLOGIN
                FPForm.FPLAB = serviceData[0].FPLAB

                FPForm.FPREMARK = serviceData[0].FPREMARK
                FPForm.FPAGE = serviceData[0].FPAGE
                FPForm.FPAGEUNIT = serviceData[0].FPAGEUNIT
                FPForm.FPTEMPUNIT = serviceData[0].FPTEMPUNIT === 1 ? '1' : '2'
                FPForm.FPCLNID = serviceData[0].FPCLNID
                setClnCode(serviceData[0].FPCLNID)
                FPForm.FPREFREASON = serviceData[0].FPREFREASON
                FPForm.FPREFTOOTHER = serviceData[0].FPREFTOOTHER
                FPForm.FPUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
                FPForm.FPSTATUS = serviceData[0].FPSTATUS
                FPForm.FPSYNC = serviceData[0].FPSYNC
                FPForm.ID = serviceData[0].ID
                FPForm.FPREMOVAL = serviceData[0].FPREMOVAL === 1 ? '1' : '2'

                let labData = lab.data.data.getLabData;

                let labRegID = labData[0].LABREGID
                let labProvidedDate = labData[0].LABPROVIDEDDATE
                let labPlace = labData[0].LABPLACE
                let labVillage = labData[0].LABVILLAGE
                setVillageCode(labVillage)
                let labRDT = labData[0].LABRDT === 999 ? '999' : labData[0].LABRDT
                setRDT(labRDT)
                let labMicroscopic = labData[0].LABMICROSCOPIC === 999 ? '999' : labData[0].LABMICROSCOPIC
                setMicroscopic(labMicroscopic);
                let labHB = labData[0].LABHB === 999 ? '' : labData[0].LABHB
                let labBG = labData[0].LABBG === 999 ? '999' : labData[0].LABBG
                setBlood(labBG);
                let labRH = labData[0].LABRH === 999 ? '999' : labData[0].LABRH
                setRH(labRH);
                let labUrineProtein = labData[0].LABUPROTEIN === 999 ? '999' : labData[0].LABUPROTEIN
                setUrineProtein(labUrineProtein)
                let labUCG = labData[0].LABUCG === 999 ? '999' : labData[0].LABUCG
                setUCG(labUCG);
                let labUSugar = labData[0].LABUSUGAR === 999 ? '999' : labData[0].LABUSUGAR
                setUrine(labUSugar);
                let labGono = labData[0].LABGONO === 999 ? '999' : labData[0].LABGONO
                setGonorrhoea(labGono);
                let labTricho = labData[0].LABTRICHO === 999 ? '999' : labData[0].LABTRICHO
                setTrichomonus(labTricho);
                let labCandida = labData[0].LABCANDIDA === 999 ? '999' : labData[0].LABCANDIDA
                setCandida(labCandida);
                let labRPR = labData[0].LABRPR === 999 ? '999' : labData[0].LABRPR
                setRPR(labRPR);
                let labTPHA = labData[0].LABTPHA === 999 ? '999' : labData[0].LABTPHA
                setTPHA(labTPHA);
                let labVDRL = labData[0].LABVDRL === 999 ? '999' : labData[0].LABVDRL
                setVDRL(labVDRL);
                let labHIV = labData[0].LABHIV === 999 ? '999' : labData[0].LABHIV
                setHIV(labHIV);
                let labHBV = labData[0].LABHBV === 999 ? '999' : labData[0].LABHBV
                setHBV(labHBV);
                let labHCV = labData[0].LABHCV === 999 ? '999' : labData[0].LABHCV
                setHepC(labHCV);
                let labSsource = labData[0].LABSSOURCE
                let labOther = labData[0].LABOTHER
                let labRBS = labData[0].LABRBS === 999 ? '' : labData[0].LABRBS
                let labOrg = labData[0].LABORG
                let labInsert = labData[0].LABINSERT
                let labUpdate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
                let labStatus = 2
                let labSync = labData[0].LABSYNC
                let labID = labData[0].ID
                let labTest = labData[0].LABTEST
                let labOpen = labData[0].LABTEST === 1 ? setLabTest(true) : setLabTest(false)

                setFPLabForm({
                    ...FPLabForm,
                    LABREGID: labRegID,
                    LABPROVIDEDDATE: labProvidedDate,
                    LABPLACE: labPlace,
                    LABVILLAGE: labVillage,
                    LABRDT: labRDT,
                    LABMICROSCOPIC: labMicroscopic,
                    LABHB: labHB,
                    LABBG: labBG,
                    LABRH: labRH,
                    LABUCG: labUCG,
                    LABUSUGAR: labUSugar,
                    LABUPROTEIN: labUrineProtein,
                    LABGONO: labGono,
                    LABTRICHO: labTricho,
                    LABCANDIDA: labCandida,
                    LABRPR: labRPR,
                    LABTPHA: labTPHA,
                    LABVDRL: labVDRL,
                    LABHIV: labHIV,
                    LABHBV: labHBV,
                    LABHCV: labHCV,
                    LABSSOURCE: labSsource,
                    LABOTHER: labOther,
                    LABRBS: labRBS,
                    LABORG: labOrg,
                    LABINSERT: labInsert,
                    LABUPDATE: labUpdate,
                    LABSTATUS: labStatus,
                    LABSYNC: labSync,
                    ID: labID,
                    LABTEST: labTest,
                });




            }
            setLoading(false)
        }


    }, [])

    return (
        <>
            <Modals open={loading} />
            <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                FP Information</Typography>
            {/* <CustomRHTable patient={props.patient} serviceType={props.serviceType} /> */}

            <div style={{ background: '#fcf0f2', paddingTop: '2%' }}>
                <div className={classes.root} style={{ paddingLeft: "2%", paddingRight: "3%", paddingBottom: "2%" }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={3} md={3}>
                            <CustomTextField
                                id="filled-basic"
                                disabled
                                label={<Grid row container><Typography color="#482642">Patient ID </Typography>
                                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                variantText="filled"
                                InputLabelProps={{
                                    style: { color: '#482642' },
                                    shrink: true
                                }}
                                value={patientData.length ? patientData[0].REGID : ''} />

                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
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
                        <Grid item xs={12} sm={3} md={3}>
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
                                {clinicData &&
                                    clinicData.map((option) => (
                                        <option key={option.CLN_CODE} value={option.CLN_CODE}>
                                            {option.CLN_NAME}
                                        </option>
                                    ))}
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
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
                                {villageData &&
                                    villageData.map((option) => (
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
                                        {patientData.length && patientData[0].REGSEX === 1 ?
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
                                        {patientData.length && patientData[0].REGSEX === 1 ?
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
                                        inputProps={{ step: "1", min: 0, maxLength: 5 }}
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
                                        inputProps={{ step: "1", min: 0, maxLength: 5 }}
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

                                    {(patientData.length && patientData[0].REGSEX === 1) ?
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
                                    {patientData.length && patientData[0].REGSEX === 1 ?
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
                                                        disabled
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
                        {(patientData.length && patientData[0].REGSEX === 1) ?
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
                                onClick={update} >Update</Button>
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


            </div>


        </>);
}
