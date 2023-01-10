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
import { insertANC } from "../../modals/ancinfo";
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

export default function ANCServiceForm(props) {

    const classes = useStyles();

    const history = useHistory();

    const [ANCForm, setANCForm] = useState({

        ANREGID: '',
        ANPROVIDEDDATE: '',
        ANTYPE: '',
        ANDONOR: '',
        ANORG: '',
        ANPROJECT: '',
        ANTSP: '',
        ANPLACE: '',
        ANVILLAGE: '',
        ANPROVIDERNAME: '',
        ANPROVIDERPOSITION: '',
        ANUSRLOGIN: '',
        ANLMP: moment('1970-01-01').format('YYYY-MM-DD'),
        ANEDD: moment('1970-01-01').format('YYYY-MM-DD'),
        ANFIRSTMENS: 999,
        ANMARRIAGE: 999,
        ANYOUNGESTCHILD: 999,
        ANG: '',
        ANP: '',
        ANA: '',
        ANWT: '',
        ANHT: '',
        ANBP: '',
        ANPR: 999,
        ANRR: 999,
        ANTEMP: '',
        ANGP: '',
        ANODEMA: '',
        ANNOFETUS: 999,
        ANLIE: 999,
        ANPRESENTATION: 999,
        ANFUNDALHT: 999,
        ANFHS: 999,
        ANOTHER: '',
        ANLAB: '',
        ANFA: '',
        ANFESO4: '',
        ANFC: 999,
        ANB1: '',
        ANDEWORM1: '',
        ANTT1: '',
        ANCDK: '',
        ANNBK: '',
        ANDIRECTCOMPLICATION: 999,
        ANINDIRECTCOMPLICATION: 999,
        ANINDIRECTOTHER: '',
        ANINDIRECTDX: '',
        ANINDIRECTTX: '',
        ANHE1: '',
        ANHE2: '',
        ANHE3: '',
        ANHE4: '',
        ANHE5: '',
        ANHE6: '',
        ANHE7: '',
        ANHE8: '',
        ANOUTCOME: '',
        ANREFTO: '',
        ANREFTOOTHER: '',
        ANREFREASON: '',
        ANDEATHREASON: '',
        ANVISIT: 999,
        ANHE9: 999,
        ANHE10: 999,
        ANHE11: 999,
        ANHE12: 999,
        ANHE13: 999,
        ANFIRSTPREG: 999,
        ANHYGKIT: 999,
        ANB1UNIT: '',
        ANAGE: '',
        ANAGEUNIT: '',
        ANVTCOUNT: 999,
        ANTEMPUNIT: '',
        ANVISITSKILL: 999,
        ANVISITTIMINGSKILL: 999,
        ANDEWORM2: '',
        ANTT2: '',
        ANCLNID: '',
        ANSYNC: '0',
        ANINSERT: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        ANUPDATE: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        ANSTATUS: 1,
        ID: '',
        ANVISITTIMING: 999
    });

    const [ANCLabForm, setANCLabForm] = useState({
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
                    setANCForm({ ...ANCForm, ANPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), ANAGE: h.toString().split('.')[0], ANAGEUNIT: '365' })
                    setANCLabForm({ ...ANCLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setANCForm({ ...ANCForm, ANPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), ANAGE: h.toString().split('.')[0], ANAGEUNIT: '30' })
                setANCLabForm({ ...ANCLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setANCForm({ ...ANCForm, ANPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), ANAGE: totalAge, ANAGEUNIT: '1' })
                setANCLabForm({ ...ANCLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

    function ANCTempUnitHandleChange(event) {
        if (event.target.value === ANCForm.ANTEMPUNIT) {
            setANCForm({ ...ANCForm, ANTEMPUNIT: "" })
        } else {
            setANCForm({ ...ANCForm, ANTEMPUNIT: event.target.value })
        }
    }

    function ANCOedemaHandleChange(event) {
        if (event.target.value === ANCForm.ANODEMA) {
            setANCForm({ ...ANCForm, ANODEMA: "" })
        } else {
            setANCForm({ ...ANCForm, ANODEMA: event.target.value })
        }
    }

    function ANB1UnitHandleChange(event) {
        if (event.target.value === ANCForm.ANB1UNIT) {
            setANCForm({ ...ANCForm, ANB1UNIT: "" })
        } else {
            setANCForm({ ...ANCForm, ANB1UNIT: event.target.value })
        }
    }

    function ANCDKHandleChange(event) {
        if (event.target.value === ANCForm.ANCDK) {
            setANCForm({ ...ANCForm, ANCDK: "" })
        } else {
            setANCForm({ ...ANCForm, ANCDK: event.target.value })
        }
    }

    function ANNBKHandleChange(event) {
        if (event.target.value === ANCForm.ANNBK) {
            setANCForm({ ...ANCForm, ANNBK: "" })
        } else {
            setANCForm({ ...ANCForm, ANNBK: event.target.value })
        }
    }

    ///////LabTest///////////
    const [labTest, setLabTest] = useState(false)
    const labTestHandle = (event) => {
        setLabTest(event.target.checked);
        setANCForm({ ...ANCForm, ANLAB: event.target.checked === true ? 1 : 0 })
        setANCLabForm({ ...ANCLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
    };

    ///////Investigation///////////
    const [RDT, setRDT] = useState('999');
    const RDTHandle = (event) => {
        setRDT(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABRDT: event.target.value })
    };
    const [microscopic, setMicroscopic] = useState('999');
    const microscopicHandle = (event) => {
        setMicroscopic(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABMICROSCOPIC: event.target.value })
    };
    const [blood, setBlood] = useState('999')
    const bloodHandle = (event) => {
        setBlood(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABBG: event.target.value })
    };
    const [RH, setRH] = useState('999')
    const RHHandle = (event) => {
        setRH(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABRH: event.target.value })
    };
    const [urineProtein, setUrineProtein] = useState('999');
    const urintProteinHandle = (event) => {
        setUrineProtein(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABUPROTEIN: event.target.value })
    };
    const [UCG, setUCG] = useState('999')
    const UCGHandle = (event) => {
        setUCG(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABUCG: event.target.value })
    };

    const [urine, setUrine] = useState('999')
    const urineHandle = (event) => {
        setUrine(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABUSUGAR: event.target.value })
    };

    const [gonorrhoea, setGonorrhoea] = useState('999')
    const gonorrhoeaHandle = (event) => {
        setGonorrhoea(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABGONO: event.target.value })
    };
    const [trichomonus, setTrichomonus] = useState('999')
    const trichomonusHandle = (event) => {
        setTrichomonus(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABTRICHO: event.target.value })
    };
    const [candida, setCandida] = useState('999')
    const candidaHandle = (event) => {
        setCandida(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABCANDIDA: event.target.value })
    };
    const [RPR, setRPR] = useState('999')
    const RPRHandle = (event) => {
        setRPR(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABRPR: event.target.value })
    };
    const [TPHA, setTPHA] = useState('999')
    const TPHAHandle = (event) => {
        setTPHA(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABTPHA: event.target.value })
    };
    const [VDRL, setVDRL] = useState('999')
    const VDRLHandle = (event) => {
        setVDRL(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABVDRL: event.target.value })
    };
    const [HIV, setHIV] = useState('999')
    const HIVHandle = (event) => {
        setHIV(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABHIV: event.target.value })
    };
    const [HBV, setHBV] = useState('999')
    const HBVHandle = (event) => {
        setHBV(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABHBV: event.target.value })
    };
    const [HepC, setHepC] = useState('999')
    const HepCHandle = (event) => {
        setHepC(event.target.value);
        setANCLabForm({ ...ANCLabForm, LABHCV: event.target.value })
    };

    //////////////Supplies/////////////////
    const [deworming, setDeworming] = useState([])

    const dewormingHandle = (event) => {
        setDeworming(event.target.value);
        console.log(deworming)
    };

    const [TT, setTT] = useState([])

    const TTHandle = (event) => {
        setTT(event.target.value);
    };

    const [HE, setHE] = useState([])

    const HEHandle = (event) => {
        setHE(event.target.value);
    };

    /////Patient Outcome//////////
    const [proPosition, setProPosition] = useState('')
    const proPositionHandle = (event) => {
        setProPosition(event.target.value);
        setANCForm({ ...ANCForm, ANPROVIDERPOSITION: event.target.value })
    };
    const [proPlace, setProPlace] = useState('')
    const proPlaceHandle = (event) => {
        setProPlace(event.target.value);
        setANCForm({ ...ANCForm, ANPLACE: event.target.value })
        setANCLabForm({ ...ANCLabForm, LABPLACE: event.target.value })
    };
    const [patientOutcome, setPatientOutcome] = useState('999')
    const patientOutcomeHandle = (event) => {
        setPatientOutcome(event.target.value);
        setANCForm({ ...ANCForm, ANOUTCOME: event.target.value })
    };
    const [referPlace, setReferPlace] = useState('999')
    const referPlaceHandle = (event) => {
        setReferPlace(event.target.value);
        setANCForm({ ...ANCForm, ANREFTO: event.target.value })
    };

    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageCode, setVillageCode] = useState('')

    const ANCVillageHandleChange = (event) => {
        let tsp = _.find(props.village, ['VILLAGE_CODE', event.target.value]);
        setTspCode(tsp.TSP_CODE)
        setVillageCode(event.target.value)
        setANCLabForm({ ...ANCLabForm, LABVILLAGE: event.target.value })
        setANCForm({ ...ANCForm, ANVILLAGE: event.target.value, ANTSP: tsp.TSP_CODE })
        console.log("Selected Village => ", event.target.value)
    };
    const ANCClinicHandleChange = (event) => {
        setClnCode(event.target.value)
        setANCForm({ ...ANCForm, ANCLNID: event.target.value })
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
                    !ANCForm.ANG ? "Please enter Gravida" :
                        'valid';

       


        if (valid === 'valid') {
            var dwArr = []
            var dwArr1 = ['1st', deworming.includes('1st') ? 1 : 999]
            var dwArr2 = ['2nd', deworming.includes('2nd') ? 1 : 999]
            dwArr.push(dwArr1)
            dwArr.push(dwArr2)
            ANCForm.ANDEWORM1 = dwArr[0][1]
            ANCForm.ANDEWORM2 = dwArr[1][1]
    
            var TTArr = []
            var TTArr1 = ['1st', TT.includes('1st') ? 1 : 999]
            var TTArr2 = ['2nd', TT.includes('2nd') ? 1 : 999]
            TTArr.push(TTArr1)
            TTArr.push(TTArr2)
            ANCForm.ANTT1 = TTArr[0][1]
            ANCForm.ANTT2 = TTArr[1][1]
    
            var HEArr = []
            var HEArr1 = ['Maternal Nutrition', HE.includes('Maternal Nutrition') ? 1 : 999]
            var HEArr2 = ['Family Planning', HE.includes('Family Planning') ? 1 : 999]
            var HEArr3 = ['New Born Care', HE.includes('New Born Care') ? 1 : 999]
            var HEArr4 = ['Birth Plan', HE.includes('Birth Plan') ? 1 : 999]
            var HEArr5 = ['Emergency Response Plan', HE.includes('Emergency Response Plan') ? 1 : 999]
            var HEArr6 = ['Danger Signs', HE.includes('Danger Signs') ? 1 : 999]
            var HEArr7 = ['Exclusive Breast Feeding', HE.includes('Exclusive Breast Feeding') ? 1 : 999]
            var HEArr8 = ['RTIs/HIV/STI', HE.includes('RTIs/HIV/STI') ? 1 : 999]
            HEArr.push(HEArr1)
            HEArr.push(HEArr2)
            HEArr.push(HEArr3)
            HEArr.push(HEArr4)
            HEArr.push(HEArr5)
            HEArr.push(HEArr6)
            HEArr.push(HEArr7)
            HEArr.push(HEArr8)
            ANCForm.ANHE1 = HEArr[0][1]
            ANCForm.ANHE2 = HEArr[1][1]
            ANCForm.ANHE3 = HEArr[2][1]
            ANCForm.ANHE4 = HEArr[3][1]
            ANCForm.ANHE5 = HEArr[4][1]
            ANCForm.ANHE6 = HEArr[5][1]
            ANCForm.ANHE7 = HEArr[6][1]
            ANCForm.ANHE8 = HEArr[7][1]
    
            var parity = ANCForm.ANP === '' ? 999 : ANCForm.ANP
            ANCForm.ANP = parity
            var abortion = ANCForm.ANA === '' ? 999 : ANCForm.ANA
            ANCForm.ANA = abortion
            var weight = ANCForm.ANWT === '' ? 999.9 : ANCForm.ANWT
            ANCForm.ANWT = weight
            var height = ANCForm.ANHT === '' ? 999.9 : ANCForm.ANHT
            ANCForm.ANHT = height
            var temp = ANCForm.ANTEMP === '' ? 999.9 : ANCForm.ANTEMP
            ANCForm.ANTEMP = temp
            var tempUnit = ANCForm.ANTEMPUNIT === '' ? 999 : ANCForm.ANTEMPUNIT
            ANCForm.ANTEMPUNIT = tempUnit
            var bp = ANCForm.ANBP === '' ? '000/000' : ANCForm.ANBP
            ANCForm.ANBP = bp
            var oe = ANCForm.ANODEMA === '' ? 999 : ANCForm.ANODEMA
            ANCForm.ANODEMA = oe
            var gp = ANCForm.ANGP === '' ? 999 : ANCForm.ANGP
            ANCForm.ANGP = gp
            var fa = ANCForm.ANFA === '' ? 999 : ANCForm.ANFA
            ANCForm.ANFA = fa
            var feso4 = ANCForm.ANFESO4 === '' ? 999 : ANCForm.ANFESO4
            ANCForm.ANFESO4 = feso4
            var b1 = ANCForm.ANB1 === '' ? 999 : ANCForm.ANB1
            ANCForm.ANB1 = b1
            var b1Unit = ANCForm.ANB1UNIT === '' ? 999 : ANCForm.ANB1UNIT
            ANCForm.ANB1UNIT = b1Unit
            var cdk = ANCForm.ANCDK === '' ? 999 : ANCForm.ANCDK
            ANCForm.ANCDK = cdk
            var nbk = ANCForm.ANNBK === '' ? 999 : ANCForm.ANNBK
            ANCForm.ANNBK = nbk
            ANCForm.ANINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            ANCForm.ANUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    
            var labHB = ANCLabForm.LABHB === '' ? 999 : ANCLabForm.LABHB
            ANCLabForm.LABHB = labHB
            var labRBS = ANCLabForm.LABRBS === '' ? 999 : ANCLabForm.LABRBS
            ANCLabForm.LABRBS = labRBS
    
            var lab = labTest === false ? 0 : 1;
            ANCForm.ANLAB = lab
            ANCLabForm.LABTEST = lab
    
            ANCLabForm.LABINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            ANCLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            const res = await insertANC({ ANCForm, ANCLabForm });
            if (res?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully inserted a patient's ANC Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openANCSaveSnackbar: true
                });
            }
            console.log('ANCFORM=>', ANCForm)
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

            setANCForm({
                ...ANCForm,
                ID: parseInt(maxid),
                ANREGID: props.patient[0].REGID,
                ANTYPE: props.serviceType === null ? 1 : 2,
                ANTEMPUNIT: '1',
                ANDONOR: sessionStorage.getItem('donor'),
                ANORG: sessionStorage.getItem('org'),
                ANPROJECT: sessionStorage.getItem('project'),
                ANTSP: sessionStorage.getItem('project') === 'P-990' && sessionStorage.getItem('org') === 'CPI-16' ? 'KRN-TSP-002' : props.village[0].TSP_CODE,
                ANVILLAGE: props.village[0].VILLAGE_CODE,
                ANAGE: parseInt(props.patient[0].REGAGE),
                ANAGEUNIT: parseInt(props.patient[0].REGAGEUNIT),
                ANCLNID: props.clinic.length>0 ? props.clinic[0].CLN_CODE : /* sessionStorage.getItem('project') === 'P-990' && sessionStorage.getItem('org') === 'CPI-16' ? */ 'TNTH-001',
                ANUSRLOGIN: sessionStorage.getItem('userName')
            })

            setANCLabForm({
                ...ANCLabForm,
                ID: parseInt(maxid),
                LABREGID: props.patient[0].REGID,
                LABVILLAGE: props.village[0].VILLAGE_CODE,
                LABORG: sessionStorage.getItem('org'),
                LABSSOURCE: 'an'
            })

        }

    }, [])


    return (
        <>
            {(props.gender === 2 && props.patient.length) ?
                <>
                    <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                        ANC Service</Typography>
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
                            ANC Service</Typography>
                    </>
            }

            {(props.gender === 2 && props.patient.length) ?
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
                                    onChange={ANCClinicHandleChange}
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
                                    onChange={ANCVillageHandleChange}
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
                                                onChange={e => { (e.target.value.length > 2) ? setANCForm({ ...ANCForm, ANG: (e.target.value).slice(0, 2) }) : setANCForm({ ...ANCForm, ANG: e.target.value }) }}
                                                value={ANCForm.ANG} />
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
                                                onChange={e => { (e.target.value.length > 2) ? setANCForm({ ...ANCForm, ANP: (e.target.value).slice(0, 2) }) : setANCForm({ ...ANCForm, ANP: e.target.value }) }}
                                                value={ANCForm.ANP} />
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
                                                onChange={e => { (e.target.value.length > 2) ? setANCForm({ ...ANCForm, ANA: (e.target.value).slice(0, 2) }) : setANCForm({ ...ANCForm, ANA: e.target.value }) }}
                                                value={ANCForm.ANA} />

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
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Examination </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
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
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { (e.target.value.length > 5) ? setANCForm({ ...ANCForm, ANWT: (e.target.value).slice(0, 5) }) : setANCForm({ ...ANCForm, ANWT: e.target.value }) }}
                                                    value={ANCForm.ANWT} />
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
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { (e.target.value.length > 5) ? setANCForm({ ...ANCForm, ANHT: (e.target.value).slice(0, 5) }) : setANCForm({ ...ANCForm, ANHT: e.target.value }) }}
                                                    value={ANCForm.ANHT} />
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
                                                    style={{ marginTop: '10px', width: '90%' }}
                                                    onChange={e => { (e.target.value.length > 5) ? setANCForm({ ...ANCForm, ANTEMP: (e.target.value).slice(0, 5) }) : setANCForm({ ...ANCForm, ANTEMP: e.target.value }) }}
                                                    value={ANCForm.ANTEMP} />
                                                <FormControl style={{ width: '100%' }}>
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
                                                            onChange={e => { setANCForm({ ...ANCForm, ANTEMPUNIT: e.target.value }) }}
                                                            value={ANCForm.ANTEMPUNIT}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="°F"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANCTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && ANCTempUnitHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANCTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && ANCTempUnitHandleChange(e)} />}
                                                                label="°C"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </FormControl>



                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>

                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="BP(mmHg)"
                                                    variantText="filled"
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { setANCForm({ ...ANCForm, ANBP: e.target.value }) }}
                                                    value={ANCForm.ANBP}
                                                />
                                                <FormControl style={{ width: '100%' }}>
                                                    <Card
                                                        variant="outlined"
                                                        style={{
                                                            marginTop: '10px',
                                                            marginRight: '10px',
                                                            background: "#fcf0f2"
                                                        }}
                                                    >
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Oedema </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="gender"
                                                            name="gender1"
                                                            style={{
                                                                display: "flex",

                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setANCForm({ ...ANCForm, ANODEMA: e.target.value }) }}
                                                            value={ANCForm.ANODEMA}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="Yes"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANCOedemaHandleChange} onKeyDown={e => e.key === 'Enter' && ANCOedemaHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANCOedemaHandleChange} onKeyDown={e => e.key === 'Enter' && ANCOedemaHandleChange(e)} />}
                                                                label="No"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </FormControl>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Gestation weeks(wks) </Typography>
                                                    </Grid>}
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { (e.target.value.length > 3) ? setANCForm({ ...ANCForm, ANGP: (e.target.value).slice(0, 3) }) : setANCForm({ ...ANCForm, ANGP: e.target.value }) }}
                                                    value={ANCForm.ANGP} />
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
                                                    onChange={e => { setANCLabForm({ ...ANCLabForm, LABHB: e.target.value }) }}
                                                    value={ANCLabForm.LABHB} />
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
                                                    onChange={e => { setANCLabForm({ ...ANCLabForm, LABOTHER: e.target.value }) }}
                                                    value={ANCLabForm.LABOTHER}
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
                                                    onChange={e => { setANCLabForm({ ...ANCLabForm, LABRBS: e.target.value }) }}
                                                    value={ANCLabForm.LABRBS} />
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
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Supplies </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Folic Acid(Tab) </Typography>
                                                    </Grid>}
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { (e.target.value.length > 3) ? setANCForm({ ...ANCForm, ANFA: (e.target.value).slice(0, 3) }) : setANCForm({ ...ANCForm, ANFA: e.target.value }) }}
                                                    value={ANCForm.ANFA} />
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Ferrous Sulphate(Tab) </Typography>
                                                    </Grid>}
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { (e.target.value.length > 3) ? setANCForm({ ...ANCForm, ANFESO4: (e.target.value).slice(0, 3) }) : setANCForm({ ...ANCForm, ANFESO4: e.target.value }) }}
                                                    value={ANCForm.ANFESO4} />
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0, max: 999, maxLength: 3 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">B1(Tab) </Typography>
                                                    </Grid>}
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { (e.target.value.length > 3) ? setANCForm({ ...ANCForm, ANB1: (e.target.value).slice(0, 3) }) : setANCForm({ ...ANCForm, ANB1: e.target.value }) }}
                                                    value={ANCForm.ANB1} />
                                                <FormControl style={{ width: '100%' }}>
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
                                                            onChange={e => { setANCForm({ ...ANCForm, ANB1UNIT: e.target.value }) }}
                                                            value={ANCForm.ANB1UNIT}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="10mg"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANB1UnitHandleChange} onKeyDown={e => e.key === 'Enter' && ANB1UnitHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANB1UnitHandleChange} onKeyDown={e => e.key === 'Enter' && ANB1UnitHandleChange(e)} />}
                                                                label="50mg"
                                                            />
                                                            <FormControlLabel
                                                                value="3"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANB1UnitHandleChange} onKeyDown={e => e.key === 'Enter' && ANB1UnitHandleChange(e)} />}
                                                                label="100mg"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </FormControl>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                                                    <InputLabel id="demo-simple-select-filled-label">Deworming</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"

                                                        multiple
                                                        value={deworming}
                                                        onChange={dewormingHandle}
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

                                                        <MenuItem value={'1st'}>1st</MenuItem>
                                                        <MenuItem value={'2nd'}>2nd</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                                                    <InputLabel id="demo-simple-select-filled-label">Tetanus Toxiod</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        multiple
                                                        value={TT}
                                                        onChange={TTHandle}
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

                                                        <MenuItem value={'1st'}>1st</MenuItem>
                                                        <MenuItem value={'2nd'}>2nd</MenuItem>
                                                    </Select>
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
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Clean Delivery Kit </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="gender"
                                                            name="gender1"
                                                            style={{
                                                                display: "flex",

                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setANCForm({ ...ANCForm, ANCDK: e.target.value }) }}
                                                            value={ANCForm.ANCDK}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="Yes"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANCDKHandleChange} onKeyDown={e => e.key === 'Enter' && ANCDKHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANCDKHandleChange} onKeyDown={e => e.key === 'Enter' && ANCDKHandleChange(e)} />}
                                                                label="No"
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
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">New Born Kit </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="gender"
                                                            name="gender1"
                                                            style={{
                                                                display: "flex",

                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setANCForm({ ...ANCForm, ANNBK: e.target.value }) }}
                                                            value={ANCForm.ANNBK}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="Yes"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANNBKHandleChange} onKeyDown={e => e.key === 'Enter' && ANNBKHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={ANNBKHandleChange} onKeyDown={e => e.key === 'Enter' && ANNBKHandleChange(e)} />}
                                                                label="No"
                                                            />

                                                        </RadioGroup>
                                                    </Card>
                                                </FormControl>
                                            </div>
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
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Diagnosis-Treatment-Health Education </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Other Diagnosis"
                                                variantText="filled"
                                                style={{ marginTop: '8px' }}
                                                onChange={e => { setANCForm({ ...ANCForm, ANINDIRECTDX: e.target.value }) }}
                                                value={ANCForm.ANINDIRECTDX}
                                            />
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Treatment Complications"
                                                variantText="filled"
                                                style={{ marginTop: '8px' }}
                                                onChange={e => { setANCForm({ ...ANCForm, ANINDIRECTTX: e.target.value }) }}
                                                value={ANCForm.ANINDIRECTTX}
                                            />
                                            <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                                                <InputLabel id="demo-simple-select-filled-label">Health Education</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    multiple
                                                    value={HE}
                                                    onChange={HEHandle}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={{
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        },
                                                        style: {
                                                            maxHeight: 300,

                                                        },
                                                        getContentAnchorEl: null,

                                                    }}

                                                >

                                                    <MenuItem classes={{ selected: classes.selected }} value={'Maternal Nutrition'}>Maternal Nutrition</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Family Planning'}>Family Planning</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'New Born Care'}>New Born Care</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Birth Plan'}>Birth Plan</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Emergency Response Plan'}>Emergency Response Plan</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Danger Signs'}>Danger Signs</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'Exclusive Breast Feeding'}>Exclusive Breast Feeding</MenuItem>
                                                    <MenuItem classes={{ selected: classes.selected }} value={'RTIs/HIV/STI'}>RTIs/HIV/STI</MenuItem>
                                                </Select>
                                            </FormControl>

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
                                                    onChange={e => { setANCForm({ ...ANCForm, ANREFREASON: e.target.value }) }}
                                                    value={ANCForm.ANREFREASON}
                                                />
                                            </Grid></>}
                                        {patientOutcome === 4 && <>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Reasons of Death"
                                                    variantText="filled"
                                                    style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                    onChange={e => { setANCForm({ ...ANCForm, ANDEATHREASON: e.target.value }) }}
                                                    value={ANCForm.ANDEATHREASON}
                                                />
                                            </Grid></>}
                                        {patientOutcome === 3 && referPlace === 5 && <>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Other Referral"
                                                    variantText="filled"
                                                    style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                    onChange={e => { setANCForm({ ...ANCForm, ANREFTOOTHER: e.target.value }) }}
                                                    value={ANCForm.ANREFTOOTHER}
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
                                                    onChange={e => { setANCForm({ ...ANCForm, ANPROVIDERNAME: e.target.value }) }}
                                                    value={ANCForm.ANPROVIDERNAME}
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
                                    onChange={e => { setANCForm({ ...ANCForm, ANOTHER: e.target.value }) }}
                                    value={ANCForm.ANOTHER}
                                />
                            </Grid>


                            </Grid>
                    </div>
                    {ageValid && <>
                        <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ padding: '20px' }} row>
                            <Grid item xs={'auto'} style={{ width: '18%' }}>
                                <Button
                                    variant="contained"
                                    style={{ background: '#482642', color: '#fff', width: '90%' }}
                                    onClick={save}  >Save</Button>
                            </Grid>
                            <Grid item xs={'auto'} style={{ width: '18%' }}>
                                <Button
                                    variant="contained"
                                    style={{ background: '#482642', color: '#fff', width: '90%' }}
                                    onClick={cancle}  >Cancel</Button>
                            </Grid>
                        </Grid>
                    </>}
                    {openSnack && <CustomSnackBar open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
                    {ageSnack && <CustomSnackBar open={setAgeSnackBarOpen} close={setAgeSnackBarClose} alertMsg={ageError} type="warning" />}
                    {successSnack && <CustomSnackBar open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}


                </div> :
                <div style={{ textAlign: 'center', background: '#fcf0f2' }}>
                    <img
                        src={noPatientLogo}
                        alt="nopatient"
                        height={420}
                        style={{ alignSelf: 'center' }}
                    /></div>}


        </>);
}
