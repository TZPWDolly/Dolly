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
import noPatientLogo from '../../images/noPatient.png'
import moment from "moment";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Card } from "@mui/material";
import { Button, Checkbox, Input, ListItemText, OutlinedInput, Snackbar, SnackbarContent, Switch, TextField, Typography } from "@material-ui/core";

import CustomTextField from "../../components/controls/CustomTextFieldFilled";
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomSnackBar from "../../components/controls/CustomSnackBar";

import _ from 'lodash';

//////////////API/////////////////
import { insertDELI } from "../../modals/deliinfo";
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


    },
    selected: {
        backgroundColor: "#DED4DA !important",
        color: '#482642'
    }
}));

const radioTheme = createTheme({
    palette: {
        primary: {
            main: "#482642"
        },
        secondary: {
            main: "#482642"
        }
    }
});

export default function DeliveryServiceForm(props) {

    const classes = useStyles();

    const history = useHistory();

    const [deliForm, setdeliForm] = useState({
        DELIREGID: '',
        DELIPROVIDEDDATE: '',
        DELIDONOR: '',
        DELIORG: '',
        DELIPROJECT: '',
        DELITSP: '',
        DELIVILLAGE: '',
        DELIPROVIDERNAME: '',
        DELIPROVIDERPOSITION: '',
        DELIUSRLOGIN: '',
        DELIDEFECTOTHER: '',//default
        DELIMCOMPLICATION: '',
        DELIMPROCEDURE: '',
        DELIMTX: '',
        DELIMREFREASON: '',
        DELIMDEATHREASON: '',
        DELIBREFREASON: '',
        DELIBDEATHREASON: '',
        DELIAGE: '',
        DELITYPE: '',
        DELIPLACE: '',
        DELIDELITYPE: '',
        DELIGP: 999,//default
        DELIG: '',
        DELIP: '',
        DELIA: '',
        DELIEPI: 999,//default
        DELIDEFECT: 999,//default
        DELIPN6: 999,//default
        DELILAB: '',
        DELIMOUTCOME: '',
        DELIMREFTO: '',
        DELIBOUTCOME: '',
        DELIBDELIOUTCOME: '',
        DELIBSEX1: '',
        DELIBAPGAR1: 999,//default
        DELRESTOWEL: '',
        DELIRESMASK: '',
        DELIRESSUCTION: '',
        DELIRESCOMPRESSION: '',
        DELIRESSTIMULATION: '',
        DELIBCCUT1: 999,//default
        DELIBBF1: '',
        DELIBREFTO: '',
        DELIBWT1: '',
        DELIANSELFREP: '',
        DELIPOFDELIVERY: 999,//default
        DELITEMP: 999.9,//default
        DELIPR: 999,//default
        DELIBP: 999,//default
        DELIBSEX2: '',
        DELIBWT2: '',
        DELIBBF2: '',
        DELIBBF3: '',
        DELIAGEUNIT: '',
        DELITEMPUNIT: 999,//default
        DELICLNID: '',
        DELIBAPGAR2: 999,//default
        DELIBAPGAR3: 999,//default
        DELIBSEX3: '',
        DELIBWT3: '',
        DELIBCCUT2: 999,//default
        DELIBCCUT3: 999,//default
        DELIADMISSIONDATE: moment('9999-12-31').format('YYYY-MM-DD'),//default
        DELIINSERT: '',
        DELIUPDATE: '',
        DELISTATUS: '',
        DELISYNC: '',
        ID: '',
        DELIREMARK: ''
    });

    const [deliLabForm, setdeliLabForm] = useState({
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
        LABINSERT: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        LABUPDATE: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        LABSTATUS: 1,
        LABSYNC: 0,
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

                if (h < 10) {
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

                    //setRHForm({ ...RHForm, RHPROVIDEDDATE: event.target.value })
                    setdeliForm({ ...deliForm, DELIPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), DELIAGE: h.toString().split('.')[0], DELIAGEUNIT: '365' })
                    setdeliLabForm({ ...deliLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
                    sessionStorage.setItem('rhage', h.toString().split('.')[0])
                    sessionStorage.setItem('rhageunit', '365')
                    sessionStorage.setItem('rhageunitvalue', 'Year')
                }


            }
            else if (totalAge >= 30 && totalAge < 365) {
                setAgeValid(true)
                //month
                let ageCount = await Number(totalAge);
                let h = await Number(ageCount / 30);

                await setAge(h.toString().split('.')[0])
                await setAgeUnit('30')
                await setAgeUnitValue('Month')

                setdeliForm({ ...deliForm, DELIPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), DELIAGE: h.toString().split('.')[0], DELIAGEUNIT: '30' })
                setdeliLabForm({ ...deliLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setdeliForm({ ...deliForm, DELIPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), DELIAGE: totalAge, DELIAGEUNIT: '1' })
                setdeliLabForm({ ...deliLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

    ///////////Radio Handle/////////////

    function deliB1SexHandleChange(event) {
        if (event.target.value === deliForm.DELIBSEX1) {
            setdeliForm({ ...deliForm, DELIBSEX1: "" })
        } else {
            setdeliForm({ ...deliForm, DELIBSEX1: event.target.value })
        }
    }

    function deliB2SexHandleChange(event) {
        if (event.target.value === deliForm.DELIBSEX2) {
            setdeliForm({ ...deliForm, DELIBSEX2: "" })
        } else {
            setdeliForm({ ...deliForm, DELIBSEX2: event.target.value })
        }
    }

    function deliB3SexHandleChange(event) {
        if (event.target.value === deliForm.DELIBSEX3) {
            setdeliForm({ ...deliForm, DELIBSEX3: "" })
        } else {
            setdeliForm({ ...deliForm, DELIBSEX3: event.target.value })
        }
    }

    function deliBBF1HandleChange(event) {
        if (event.target.value === deliForm.DELIBBF1) {
            setdeliForm({ ...deliForm, DELIBBF1: "" })
        } else {
            setdeliForm({ ...deliForm, DELIBBF1: event.target.value })
        }
    }

    function deliBBF2HandleChange(event) {
        if (event.target.value === deliForm.DELIBBF2) {
            setdeliForm({ ...deliForm, DELIBBF2: "" })
        } else {
            setdeliForm({ ...deliForm, DELIBBF2: event.target.value })
        }
    }

    function deliBBF3HandleChange(event) {
        if (event.target.value === deliForm.DELIBBF3) {
            setdeliForm({ ...deliForm, DELIBBF3: "" })
        } else {
            setdeliForm({ ...deliForm, DELIBBF3: event.target.value })
        }
    }

    ///////LabTest///////////
    const [labTest, setLabTest] = useState(false)
    const labTestHandle = (event) => {
        setLabTest(event.target.checked);
        setdeliForm({ ...deliForm, DELILAB: event.target.checked === true ? 1 : 0 })
        setdeliLabForm({ ...deliLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
    };

    const [baby2, setBaby2] = useState(false)
    const baby2Handle = (event) => {
        setBaby2(event.target.checked);
    };

    const [baby3, setBaby3] = useState(false)
    const baby3Handle = (event) => {
        setBaby3(event.target.checked);
    };

    ///////Investigation///////////
    const [RDT, setRDT] = useState('999');
    const RDTHandle = (event) => {
        setRDT(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABRDT: event.target.value })
    };
    const [microscopic, setMicroscopic] = useState('999');
    const microscopicHandle = (event) => {
        setMicroscopic(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABMICROSCOPIC: event.target.value })
    };
    const [blood, setBlood] = useState('999')
    const bloodHandle = (event) => {
        setBlood(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABBG: event.target.value })
    };
    const [RH, setRH] = useState('999')
    const RHHandle = (event) => {
        setRH(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABRH: event.target.value })
    };
    const [urineProtein, setUrineProtein] = useState('999');
    const urintProteinHandle = (event) => {
        setUrineProtein(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABUPROTEIN: event.target.value })
    };
    const [UCG, setUCG] = useState('999')
    const UCGHandle = (event) => {
        setUCG(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABUCG: event.target.value })
    };

    const [urine, setUrine] = useState('999')
    const urineHandle = (event) => {
        setUrine(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABUSUGAR: event.target.value })
    };

    const [gonorrhoea, setGonorrhoea] = useState('999')
    const gonorrhoeaHandle = (event) => {
        setGonorrhoea(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABGONO: event.target.value })
    };
    const [trichomonus, setTrichomonus] = useState('999')
    const trichomonusHandle = (event) => {
        setTrichomonus(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABTRICHO: event.target.value })
    };
    const [candida, setCandida] = useState('999')
    const candidaHandle = (event) => {
        setCandida(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABCANDIDA: event.target.value })
    };
    const [RPR, setRPR] = useState('999')
    const RPRHandle = (event) => {
        setRPR(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABRPR: event.target.value })
    };
    const [TPHA, setTPHA] = useState('999')
    const TPHAHandle = (event) => {
        setTPHA(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABTPHA: event.target.value })
    };
    const [VDRL, setVDRL] = useState('999')
    const VDRLHandle = (event) => {
        setVDRL(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABVDRL: event.target.value })
    };
    const [HIV, setHIV] = useState('999')
    const HIVHandle = (event) => {
        setHIV(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABHIV: event.target.value })
    };
    const [HBV, setHBV] = useState('999')
    const HBVHandle = (event) => {
        setHBV(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABHBV: event.target.value })
    };
    const [HepC, setHepC] = useState('999')
    const HepCHandle = (event) => {
        setHepC(event.target.value);
        setdeliLabForm({ ...deliLabForm, LABHCV: event.target.value })
    };

    //////////////Baby outcome and procedure/////////////////
    const [resuscitation, setResuscitation] = useState([])

    const resuscitationHandle = (event) => {
        setResuscitation(event.target.value);
        console.log(resuscitation)
    };

    const [proPlace, setProPlace] = useState('')
    const proPlaceHandle = (event) => {
        setProPlace(event.target.value);
        setdeliForm({ ...deliForm, DELIPLACE: event.target.value })
        setdeliLabForm({ ...deliLabForm, LABPLACE: event.target.value })
    };
    const [deliDeliType, setDeliDeliType] = useState('')
    const deliDeliTypeHandle = (event) => {
        setDeliDeliType(event.target.value);
        setdeliForm({ ...deliForm, DELIDELITYPE: event.target.value })
    };
    const [deliBDeliOutcome, setDeliBDeliOutcome] = useState('')
    const deliBDeliOutcomeHandle = (event) => {
        setDeliBDeliOutcome(event.target.value);
        setdeliForm({ ...deliForm, DELIBDELIOUTCOME: event.target.value })
    };
    const [babyOutcome, setBabyOutcome] = useState('')
    const babyOutcomeHandle = (event) => {
        setBabyOutcome(event.target.value);
        setdeliForm({ ...deliForm, DELIBOUTCOME: event.target.value })
    };
    const [deliBRefto, setDeliBRefto] = useState('')
    const deliBReftoHandle = (event) => {
        setDeliBRefto(event.target.value);
        setdeliForm({ ...deliForm, DELIBREFTO: event.target.value })
    };

    /////Maternal Outcome//////////
    const [proPosition, setProPosition] = useState('')
    const proPositionHandle = (event) => {
        setProPosition(event.target.value);
        setdeliForm({ ...deliForm, DELIPROVIDERPOSITION: event.target.value })
    };

    const [patientMOutcome, setPatientMOutcome] = useState('999')
    const patientMOutcomeHandle = (event) => {
        setPatientMOutcome(event.target.value);
        setdeliForm({ ...deliForm, DELIMOUTCOME: event.target.value })
    };

    const [referMPlace, setReferMPlace] = useState('999')
    const referMPlaceHandle = (event) => {
        setReferMPlace(event.target.value);
        setdeliForm({ ...deliForm, DELIMREFTO: event.target.value })
    };


    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageCode, setVillageCode] = useState('')

    const deliVillageHandleChange = (event) => {
        let tsp = _.find(props.village, ['VILLAGE_CODE', event.target.value]);
        setTspCode(tsp.TSP_CODE)
        setVillageCode(event.target.value)
        setdeliLabForm({ ...deliLabForm, LABVILLAGE: event.target.value })
        setdeliForm({ ...deliForm, DELIVILLAGE: event.target.value, DELITSP: tsp.TSP_CODE })
        console.log("Selected Village => ", event.target.value)
    };
    const deliClinicHandleChange = (event) => {
        setClnCode(event.target.value)
        setdeliForm({ ...deliForm, DELICLNID: event.target.value })
        console.log("Selected Clinic => ", event.target.value)
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
                !proPlace ? "Please Choose Provided Place" :
                    !deliForm.DELIG ? "Please enter Gravida" :
                        'valid';



        if (valid === 'valid') {

            var rArr = []
            var rArr1 = ['Drying with towel', resuscitation.includes('Drying with towel') ? 1 : 999]
            var rArr2 = ['Suction', resuscitation.includes('Suction') ? 1 : 999]
            var rArr3 = ['Stimulation', resuscitation.includes('Stimulation') ? 1 : 999]
            var rArr4 = ['Bag and mask', resuscitation.includes('Bag and mask') ? 1 : 999]
            var rArr5 = ['Chest compression', resuscitation.includes('Chest compression') ? 1 : 999]
            rArr.push(rArr1)
            rArr.push(rArr2)
            rArr.push(rArr3)
            rArr.push(rArr4)
            rArr.push(rArr5)
            deliForm.DELRESTOWEL = rArr[0][1]
            deliForm.DELIRESMASK = rArr[1][1]
            deliForm.DELIRESSUCTION = rArr[2][1]
            deliForm.DELIRESCOMPRESSION = rArr[3][1]
            deliForm.DELIRESSTIMULATION = rArr[4][1]

            var selfRep = deliForm.DELIANSELFREP === '' ? 999 : deliForm.DELIANSELFREP
            deliForm.DELIANSELFREP = selfRep
            var parity = deliForm.DELIP === '' ? 999 : deliForm.DELIP
            deliForm.DELIP = parity
            var abortion = deliForm.DELIA === '' ? 999 : deliForm.DELIA
            deliForm.DELIA = abortion
            var deliDeliType = deliForm.DELIDELITYPE === '' ? 999 : deliForm.DELIDELITYPE
            deliForm.DELIDELITYPE = deliDeliType
            var deliBDeliOutcome = deliForm.DELIBDELIOUTCOME === '' ? 999 : deliForm.DELIBDELIOUTCOME
            deliForm.DELIBDELIOUTCOME = deliBDeliOutcome
            var deliBOutcome = deliForm.DELIBOUTCOME === '' ? 999 : deliForm.DELIBOUTCOME
            deliForm.DELIBOUTCOME = deliBOutcome
            var deliBRefto = deliForm.DELIBREFTO === '' ? 999 : deliForm.DELIBREFTO
            deliForm.DELIBREFTO = deliBRefto
            var bb1wt = deliForm.DELIBWT1 === '' ? 999.9 : deliForm.DELIBWT1
            deliForm.DELIBWT1 = bb1wt
            var bb2wt = deliForm.DELIBWT2 === '' ? 999.9 : deliForm.DELIBWT2
            deliForm.DELIBWT2 = bb2wt
            var bb3wt = deliForm.DELIBWT3 === '' ? 999.9 : deliForm.DELIBWT3
            deliForm.DELIBWT3 = bb3wt
            var bb1s = deliForm.DELIBSEX1 === '' ? 999 : deliForm.DELIBSEX1 === '1' ? 1 : 2
            deliForm.DELIBSEX1 = bb1s
            var bb2s = deliForm.DELIBSEX2 === '' ? 999 : deliForm.DELIBSEX2 === '1' ? 1 : 2
            deliForm.DELIBSEX2 = bb2s
            var bb3s = deliForm.DELIBSEX3 === '' ? 999 : deliForm.DELIBSEX3 === '1' ? 1 : 2
            deliForm.DELIBSEX3 = bb3s
            var bf1 = deliForm.DELIBBF1 === '' ? 999 : deliForm.DELIBBF1 === '1' ? 1 : 2
            deliForm.DELIBBF1 = bf1
            var bf2 = deliForm.DELIBBF2 === '' ? 999 : deliForm.DELIBBF2 === '1' ? 1 : 2
            deliForm.DELIBBF2 = bf2
            var bf3 = deliForm.DELIBBF3 === '' ? 999 : deliForm.DELIBBF3 === '1' ? 1 : 2
            deliForm.DELIBBF3 = bf3
            var deliMOutcome = deliForm.DELIMOUTCOME === '' ? 999 : deliForm.DELIMOUTCOME
            deliForm.DELIMOUTCOME = deliMOutcome
            var deliMRefto = deliForm.DELIMREFTO === '' ? 999 : deliForm.DELIMREFTO
            deliForm.DELIMREFTO = deliMRefto
            deliForm.DELIINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            deliForm.DELIUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            deliForm.DELISTATUS = 1
            deliForm.DELISYNC = '0'

            var labHB = deliLabForm.LABHB === '' ? 999 : deliLabForm.LABHB
            deliLabForm.LABHB = labHB
            var labRBS = deliLabForm.LABRBS === '' ? 999 : deliLabForm.LABRBS
            deliLabForm.LABRBS = labRBS
            deliLabForm.LABSTATUS = 1
            deliLabForm.LABINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            deliLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            deliLabForm.LABSYNC = '0'

            var lab = labTest === false ? 0 : 1;
            deliForm.DELILAB = lab
            deliLabForm.LABTEST = lab

            deliLabForm.LABINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            deliLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

            const res = await insertDELI({ deliForm, deliLabForm });
            if (res?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully inserted a patient's Delivery Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openDeliSaveSnackbar: true
                });
            }
            console.log('deliFORM=>', deliForm)
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

            setdeliForm({
                ...deliForm,
                ID: parseInt(maxid),
                DELIREGID: props.patient[0].REGID,
                DELITYPE: props.serviceType === null ? 1 : 2,
                DELITEMPUNIT: '1',
                DELIDONOR: sessionStorage.getItem('donor'),
                DELIORG: sessionStorage.getItem('org'),
                DELIPROJECT: sessionStorage.getItem('project'),
                DELITSP: sessionStorage.getItem('project') === 'P-990' ? 'KRN-TSP-002' : props.village[0].TSP_CODE,
                DELIVILLAGE: props.village[0].VILLAGE_CODE,
                DELIAGE: parseInt(props.patient[0].REGAGE),
                DELIAGEUNIT: parseInt(props.patient[0].REGAGEUNIT),
                DELICLNID: props.clinic.length>0 ? props.clinic[0].CLN_CODE : /* sessionStorage.getItem('project') === 'P-990' && sessionStorage.getItem('org') === 'CPI-16' ? */ 'TNTH-001',
                DELIUSRLOGIN: sessionStorage.getItem('userName')
            })

            setdeliLabForm({
                ...deliLabForm,
                ID: parseInt(maxid),
                LABREGID: props.patient[0].REGID,
                LABVILLAGE: props.village[0].VILLAGE_CODE,
                LABORG: sessionStorage.getItem('org'),
                LABSSOURCE: 'deli'
            })

        }

    }, [])


    return (
        <>

            {(props.gender === 2 && props.patient.length) ?
                <>
                    <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                        Delivery Service</Typography>
                    <CustomRHTable patient={props.patient} serviceType={props.serviceType} />
                </>
                :
                (props.gender === 1 && props.patient.length) ?
                    <>
                        <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                            Only Female Patients can get this service!</Typography>
                    </>
                    :
                    <>
                        <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                            Delivery Service</Typography>
                    </>
            }
            {(props.gender === 2 && props.patient.length) ?
                <div style={{ background: '#fcf0f2', paddingTop: '2%' }}>
                    <div className={classes.root} style={{ paddingLeft: "2%", paddingRight: "3%", paddingBottom: "2%" }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4} md={4}>
                                <CustomTextField
                                    id="filled-basic"
                                    select
                                    label={<Grid row container><Typography color="#482642">Choose Clinic </Typography>
                                        <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                    variantText="filled"
                                    value={clnCode}
                                    onChange={deliClinicHandleChange}
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
                                    onChange={deliVillageHandleChange}
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
                            <Grid item xs={12} sm={4} md={4}>
                                <CustomTextField
                                    type="number"
                                    variantText="filled"
                                    inputProps={{ step: "1", min: 0 }}
                                    InputLabelProps={{
                                        style: { color: '#482642' },
                                        shrink: true
                                    }}
                                    style={{ width: '95%' }}
                                    label={<Grid row container><Typography color="#482642">AN Visit(self-reported) </Typography>
                                    </Grid>}
                                    onChange={e => { setdeliForm({ ...deliForm, DELIANSELFREP: parseInt(e.target.value) }) }}
                                    value={deliForm.DELIANSELFREP} />
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
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Gravida </Typography>
                                                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { (e.target.value.length > 2) ? setdeliForm({ ...deliForm, DELIG: (e.target.value).slice(0, 2) }) : setdeliForm({ ...deliForm, DELIG: e.target.value }) }}
                                                value={deliForm.DELIG} />
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
                                                onChange={e => { (e.target.value.length > 2) ? setdeliForm({ ...deliForm, DELIP: (e.target.value).slice(0, 2) }) : setdeliForm({ ...deliForm, DELIP: e.target.value }) }}
                                                value={deliForm.DELIP} />
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
                                                onChange={e => { (e.target.value.length > 2) ? setdeliForm({ ...deliForm, DELIA: (e.target.value).slice(0, 2) }) : setdeliForm({ ...deliForm, DELIA: e.target.value }) }}
                                                value={deliForm.DELIA} />

                                        </div>


                                    </Card>
                                </ThemeProvider>
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
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Delivery Record </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
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
                                                style={{ marginTop: '9px' }}
                                                onChange={calculateAge}
                                                value={providedDate} />
                                            <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Type of Delivery </Typography>
                                                </Grid>}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    style={{ width: '100%' }}
                                                    value={deliDeliType}
                                                    onChange={deliDeliTypeHandle}
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
                                                    <MenuItem value={1}>NSVD</MenuItem>
                                                    <MenuItem value={2}>Breech</MenuItem>
                                                    <MenuItem value={3}>Vacuum</MenuItem>
                                                    <MenuItem value={4}>LSCS</MenuItem>
                                                    <MenuItem value={5}>Forcep</MenuItem>
                                                </Select>
                                            </FormControl>
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
                                        </div>
                                    </Card>
                                </ThemeProvider>
                            </Grid>
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
                                                    onChange={e => { setdeliLabForm({ ...deliLabForm, LABHB: e.target.value }) }}
                                                    value={deliLabForm.LABHB} />
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
                                                    onChange={e => { setdeliLabForm({ ...deliLabForm, LABOTHER: e.target.value }) }}
                                                    value={deliLabForm.LABOTHER}
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
                                                    onChange={e => { setdeliLabForm({ ...deliLabForm, LABRBS: e.target.value }) }}
                                                    value={deliLabForm.LABRBS} />
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
                                            borderRadius: '10px'
                                        }}
                                        className={classes.cardStyle}>
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Baby Outcome and Procedure </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Type of Baby Outcome </Typography>
                                                </Grid>}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    style={{ width: '100%' }}
                                                    value={deliBDeliOutcome}
                                                    onChange={deliBDeliOutcomeHandle}
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
                                                    <MenuItem value={1}>Still Birth</MenuItem>
                                                    <MenuItem value={2}>Live Birth</MenuItem>
                                                    <MenuItem value={3}>Prem</MenuItem>
                                                    <MenuItem value={4}>IUGR</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                                                <InputLabel id="demo-simple-select-filled-label">Resuscitation</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"

                                                    multiple
                                                    value={resuscitation}
                                                    onChange={resuscitationHandle}
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

                                                    <MenuItem classes={{ selected: classes.selected }} value={'Drying with towel'}>Drying with towel</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Suction'}>Suction</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Stimulation'}>Stimulation</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Bag and mask'}>Bag and mask </MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Chest compression'}>Chest compression</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                <InputLabel id="demo-simple-select-filled-label">Baby Outcome</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    style={{ width: '95%' }}
                                                    value={babyOutcome}
                                                    onChange={babyOutcomeHandle}
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
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            {babyOutcome === 3 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Provided ReferPlace</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            style={{ width: '95%' }}
                                                            value={deliBRefto}
                                                            onChange={deliBReftoHandle}
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
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBREFREASON: e.target.value }) }}
                                                        value={deliForm.DELIBREFREASON}
                                                    />
                                                </Grid></>}
                                            {babyOutcome === 4 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Reasons of Death"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBDEATHREASON: e.target.value }) }}
                                                        value={deliForm.DELIBDEATHREASON}
                                                    />
                                                </Grid></>}
                                        </div>
                                    </Card>
                                </ThemeProvider>
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
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Baby-1 Record </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642', textAlign: 'center' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Birth Weight-1(kg) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '40%' }}
                                                onChange={e => { (e.target.value.length > 5) ? setdeliForm({ ...deliForm, DELIBWT1: (e.target.value).slice(0, 5) }) : setdeliForm({ ...deliForm, DELIBWT1: e.target.value }) }}
                                                value={deliForm.DELIBWT1} />
                                            <FormControl style={{ width: '100%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Baby Sex-1</Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBSEX1: e.target.value }) }}
                                                        value={deliForm.DELIBSEX1}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Male"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliB1SexHandleChange} onKeyDown={e => e.key === 'Enter' && deliB1SexHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliB1SexHandleChange} onKeyDown={e => e.key === 'Enter' && deliB1SexHandleChange(e)} />}
                                                            label="Female"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </FormControl>
                                            <FormControl style={{ width: '100%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Breast Feeding(in 30min)-1</Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBBF1: e.target.value }) }}
                                                        value={deliForm.DELIBBF1}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Yes"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliBBF1HandleChange} onKeyDown={e => e.key === 'Enter' && deliBBF1HandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliBBF1HandleChange} onKeyDown={e => e.key === 'Enter' && deliBBF1HandleChange(e)} />}
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </FormControl>
                                            <FormControlLabel
                                                style={{ marginTop: '10px' }}
                                                control={
                                                    <Switch
                                                        checked={baby2}
                                                        onChange={baby2Handle}
                                                        name="baby2"
                                                        color="primary"
                                                    />
                                                }
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                }}
                                                label="Baby-2"
                                                labelPlacement="top"
                                            />
                                        </div>
                                    </Card>
                                </ThemeProvider>
                            </Grid>
                            {baby2 && <Grid item xs={12} sm={12} md={12}>
                                <ThemeProvider theme={radioTheme}>
                                    <Card
                                        variant="outlined"
                                        style={{
                                            background: "#fcf0f2",
                                            width: '100%',
                                            borderRadius: '10px'
                                        }}
                                        className={classes.cardStyle}>
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Baby-2 Record </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642', textAlign: 'center' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Birth Weight-2(kg) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '40%' }}
                                                onChange={e => { (e.target.value.length > 5) ? setdeliForm({ ...deliForm, DELIBWT2: (e.target.value).slice(0, 5) }) : setdeliForm({ ...deliForm, DELIBWT2: e.target.value }) }}
                                                value={deliForm.DELIBWT2} />
                                            <FormControl style={{ width: '100%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Baby Sex-2</Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBSEX2: e.target.value }) }}
                                                        value={deliForm.DELIBSEX2}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Male"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliB2SexHandleChange} onKeyDown={e => e.key === 'Enter' && deliB2SexHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliB2SexHandleChange} onKeyDown={e => e.key === 'Enter' && deliB2SexHandleChange(e)} />}
                                                            label="Female"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </FormControl>
                                            <FormControl style={{ width: '100%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Breast Feeding(in 30min)-2</Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBBF2: e.target.value }) }}
                                                        value={deliForm.DELIBBF2}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Yes"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliBBF2HandleChange} onKeyDown={e => e.key === 'Enter' && deliBBF2HandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliBBF2HandleChange} onKeyDown={e => e.key === 'Enter' && deliBBF2HandleChange(e)} />}
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </FormControl>
                                            <FormControlLabel
                                                style={{ marginTop: '10px' }}
                                                control={
                                                    <Switch
                                                        checked={baby3}
                                                        onChange={baby3Handle}
                                                        name="baby2"
                                                        color="primary"
                                                    />
                                                }
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                }}
                                                label="Baby-3"
                                                labelPlacement="top"
                                            />
                                        </div>
                                    </Card>
                                </ThemeProvider>
                            </Grid>}
                            {baby3 && <Grid item xs={12} sm={12} md={12}>
                                <ThemeProvider theme={radioTheme}>
                                    <Card
                                        variant="outlined"
                                        style={{
                                            background: "#fcf0f2",
                                            width: '100%',
                                            borderRadius: '10px'
                                        }}
                                        className={classes.cardStyle}>
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Baby-3 Record </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642', textAlign: 'center' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Birth Weight-3(kg) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '40%' }}
                                                onChange={e => { (e.target.value.length > 5) ? setdeliForm({ ...deliForm, DELIBWT3: (e.target.value).slice(0, 5) }) : setdeliForm({ ...deliForm, DELIBWT3: e.target.value }) }}
                                                value={deliForm.DELIBWT3} />
                                            <FormControl style={{ width: '100%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Baby Sex-3</Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBSEX3: e.target.value }) }}
                                                        value={deliForm.DELIBSEX3}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Male"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliB3SexHandleChange} onKeyDown={e => e.key === 'Enter' && deliB3SexHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliB3SexHandleChange} onKeyDown={e => e.key === 'Enter' && deliB3SexHandleChange(e)} />}
                                                            label="Female"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </FormControl>
                                            <FormControl style={{ width: '100%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Breast Feeding(in 30min)-3</Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setdeliForm({ ...deliForm, DELIBBF3: e.target.value }) }}
                                                        value={deliForm.DELIBBF3}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Yes"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliBBF3HandleChange} onKeyDown={e => e.key === 'Enter' && deliBBF3HandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={deliBBF3HandleChange} onKeyDown={e => e.key === 'Enter' && deliBBF3HandleChange(e)} />}
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </FormControl>
                                        </div>
                                    </Card>
                                </ThemeProvider>
                            </Grid>}
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
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Maternal Complication-Procedure-Treatment</Typography>
                                        </Grid>}

                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Maternal Complication"
                                                    variantText="filled"
                                                    style={{ marginTop: '9px', width: '90%' }}
                                                    onChange={e => { setdeliForm({ ...deliForm, DELIMCOMPLICATION: e.target.value }) }}
                                                    value={deliForm.DELIMCOMPLICATION}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Procedure"
                                                    variantText="filled"
                                                    style={{ marginTop: '9px', width: '90%' }}
                                                    onChange={e => { setdeliForm({ ...deliForm, DELIMPROCEDURE: e.target.value }) }}
                                                    value={deliForm.DELIMPROCEDURE}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Treatment"
                                                    variantText="filled"
                                                    style={{ marginTop: '9px', width: '90%' }}
                                                    onChange={e => { setdeliForm({ ...deliForm, DELIMTX: e.target.value }) }}
                                                    value={deliForm.DELIMTX}
                                                />
                                            </Grid>
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
                                        marginLeft: '10px',
                                        marginRight: '10px'
                                    }}
                                    className={classes.cardStyle}>
                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Maternal Outcome </Typography>
                                    </Grid>}
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <FormControl variant="filled" className={classes.formControl} style={{ width: '95%', marginLeft: '13px' }}>
                                                <InputLabel id="demo-simple-select-filled-label">Maternal Outcome</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    style={{ width: '95%' }}
                                                    value={patientMOutcome}
                                                    onChange={patientMOutcomeHandle}
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
                                        {patientMOutcome === 3 && <>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                    <InputLabel id="demo-simple-select-filled-label">Provided ReferPlace</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        style={{ width: '95%' }}
                                                        value={referMPlace}
                                                        onChange={referMPlaceHandle}
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
                                                    onChange={e => { setdeliForm({ ...deliForm, DELIMREFREASON: e.target.value }) }}
                                                    value={deliForm.DELIMREFREASON}
                                                />
                                            </Grid></>}
                                        {patientMOutcome === 4 && <>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Reasons of Death"
                                                    variantText="filled"
                                                    style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                    onChange={e => { setdeliForm({ ...deliForm, DELIMDEATHREASON: e.target.value }) }}
                                                    value={deliForm.DELIMDEATHREASON}
                                                />
                                            </Grid></>}
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
                                            <Grid item xs={12} sm={8} md={8}>
                                                <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
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

                                            <Grid item xs={12} sm={8} md={8}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Provider Name"
                                                    variantText="filled"
                                                    style={{ marginTop: '9px', width: '90%' }}
                                                    onChange={e => { setdeliForm({ ...deliForm, DELIPROVIDERNAME: e.target.value }) }}
                                                    value={deliForm.DELIPROVIDERNAME}
                                                />
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
                                    onChange={e => { setdeliForm({ ...deliForm, DELIREMARK: e.target.value }) }}
                                    value={deliForm.DELIREMARK}
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
                                    onClick={save}  >Save</Button>
                            </Grid>
                            <Grid item xs={'auto'} style={{ width: '18%' }}>
                                <Button
                                    variant="contained"
                                    style={{ background: '#482642', color: '#fff', width: '100%' }}
                                    onClick={cancle}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </>}
                    {openSnack && <CustomSnackBar open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
                    {ageSnack && <CustomSnackBar open={setAgeSnackBarOpen} close={setAgeSnackBarClose} alertMsg={ageError} type="warning" />}
                    {successSnack && <CustomSnackBar open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}


                </div> : <div style={{ textAlign: 'center', background: '#fcf0f2' }}>
                    <img
                        src={noPatientLogo}
                        alt="nopatient"
                        height={420}
                        style={{ alignSelf: 'center' }}
                    /></div>}


        </>);
}
