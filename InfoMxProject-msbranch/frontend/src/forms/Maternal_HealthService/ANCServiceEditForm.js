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
import { Button, Checkbox, Input, ListItemText, OutlinedInput, Snackbar, SnackbarContent, Switch, TextField, Typography } from "@material-ui/core";

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
import { insertANC, updateANC } from "../../modals/ancinfo";
import { insertLab } from "../../modals/labinfo";
import { getMaxID } from "../../modals/maxid";
import * as serviceLab from '../../modals/service_labdatabyid'
import * as serviceData from '../../modals/rhservicedatabyid'
import * as labData from '../../modals/rhlabdatabyid'
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

export default function ANCServiceEditForm(props) {

    const classes = useStyles();

    const history = useHistory();

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [serviceTypeData, setServiceTypeData] = useState('')
    const [patientOC, setPatientOC] = useState([])
    const [clinicData, setClinicData] = useState([])
    const [villageData, setVillageData] = useState([])

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
        ANG: '',
        ANP: '',
        ANA: '',
        ANWT: '',
        ANHT: '',
        ANBP: '',
        ANTEMP: '',
        ANGP: '',
        ANODEMA: '',
        ANOTHER: '',
        ANLAB: '',
        ANFA: '',
        ANFESO4: '',
        ANB1: '',
        ANDEWORM1: '',
        ANTT1: '',
        ANCDK: '',
        ANNBK: '',
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
        ANB1UNIT: '',
        ANAGE: '',
        ANAGEUNIT: '',
        ANTEMPUNIT: '',
        ANDEWORM2: '',
        ANTT2: '',
        ANCLNID: '',
        ANSYNC: '',
        ANUPDATE: '',
        ANSTATUS: '',
        ID: '',
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
        let tsp = _.find(villageData, ['VILLAGE_CODE', event.target.value]);
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

    ///////////////Update Cancle btn/////////////
    const update = async () => {
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
        ANCForm.ANUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

        var labHB = ANCLabForm.LABHB === '' ? 999 : ANCLabForm.LABHB
        ANCLabForm.LABHB = labHB
        var labRBS = ANCLabForm.LABRBS === '' ? 999 : ANCLabForm.LABRBS
        ANCLabForm.LABRBS = labRBS

        var lab = labTest === false ? 0 : 1;
        ANCForm.ANLAB = lab
        ANCLabForm.LABTEST = lab
        
        ANCLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

            const res = await updateANC({ ANCForm, ANCLabForm });
            if (res?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully update a patient's ANC Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openANCUpdateSnackbar: true
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

        if (sessionStorage.getItem('editANCPatient') === 'true') {

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

                ANCForm.ANREGID = serviceData[0].ANREGID
                ANCForm.ANPROVIDEDDATE = moment(serviceData[0].ANPROVIDEDDATE).format("YYYY-MM-DD")
                setProvidedDate(moment(serviceData[0].ANPROVIDEDDATE).format("YYYY-MM-DD"))
                ANCForm.ANTYPE = serviceData[0].ANTYPE
                ANCForm.ANDONOR = serviceData[0].ANDONOR
                ANCForm.ANORG = serviceData[0].ANORG
                ANCForm.ANPROJECT = serviceData[0].ANPROJECT
                ANCForm.ANTSP = serviceData[0].ANTSP
                setTspCode(serviceData[0].ANTSP)
                ANCForm.ANPLACE = serviceData[0].ANPLACE
                setProPlace(serviceData[0].ANPLACE)
                ANCForm.ANVILLAGE = serviceData[0].ANVILLAGE
                setVillageCode(serviceData[0].ANVILLAGE)
                ANCForm.ANPROVIDERNAME = serviceData[0].ANPROVIDERNAME
                ANCForm.ANPROVIDERPOSITION = serviceData[0].ANPROVIDERPOSITION
                setProPosition(serviceData[0].ANPROVIDERPOSITION)
                ANCForm.ANUSRLOGIN = serviceData[0].ANUSRLOGIN
                ANCForm.ANG = serviceData[0].ANG
                ANCForm.ANP = serviceData[0].ANP === 999 ? '' : serviceData[0].ANP
                ANCForm.ANA = serviceData[0].ANA === 999 ? '' : serviceData[0].ANA
                ANCForm.ANWT = serviceData[0].ANWT === 999.9 ? '' : serviceData[0].ANWT
                ANCForm.ANHT = serviceData[0].ANHT === 999.9 ? '' : serviceData[0].ANHT
                ANCForm.ANBP = serviceData[0].ANBP === '000/000' ? '' : serviceData[0].ANBP
                ANCForm.ANTEMP = serviceData[0].ANTEMP === 999.9 ? '' : serviceData[0].ANTEMP
                ANCForm.ANGP = serviceData[0].ANGP === 999 ? '' : serviceData[0].ANGP
                ANCForm.ANODEMA = serviceData[0].ANODEMA === 999 ? '' : serviceData[0].ANODEMA === 1 ? "1" : "2"
                ANCForm.ANOTHER = serviceData[0].ANOTHER
                ANCForm.ANLAB = serviceData[0].ANLAB
                ANCForm.ANFA = serviceData[0].ANFA === 999 ? '' : serviceData[0].ANFA
                ANCForm.ANFESO4 = serviceData[0].ANFESO4 === 999 ? '' : serviceData[0].ANFESO4
                ANCForm.ANB1 = serviceData[0].ANB1 === 999 ? '' : serviceData[0].ANB1
                ANCForm.ANDEWORM1 = serviceData[0].ANDEWORM1 === 999 ? '' : serviceData[0].ANDEWORM1
                ANCForm.ANDEWORM2 = serviceData[0].ANDEWORM2 === 999 ? '' : serviceData[0].ANDEWORM2
                var DArr = []
                var DArr1 = serviceData[0].ANDEWORM1 === 1 ? DArr.push('1st') : null
                var DArr2 = serviceData[0].ANDEWORM2 === 1 ? DArr.push('2nd') : null
                setDeworming(DArr)
                ANCForm.ANTT1 = serviceData[0].ANTT1 === 999 ? '' : serviceData[0].ANTT1
                ANCForm.ANTT2 = serviceData[0].ANTT2 === 999 ? '' : serviceData[0].ANTT2
                var TTArr = []
                var TTArr1 = serviceData[0].ANTT1 === 1 ? TTArr.push('1st') : null
                var TTArr2 = serviceData[0].ANTT2 === 1 ? TTArr.push('2nd') : null
                setTT(TTArr)
                ANCForm.ANCDK = serviceData[0].ANCDK === 999 ? '' : serviceData[0].ANCDK === 1 ? '1' : '2'
                ANCForm.ANNBK = serviceData[0].ANNBK === 999 ? '' : serviceData[0].ANNBK === 1 ? '1' : '2'
                ANCForm.ANINDIRECTDX = serviceData[0].ANINDIRECTDX
                ANCForm.ANINDIRECTTX = serviceData[0].ANINDIRECTTX
                ANCForm.ANHE1 = serviceData[0].ANHE1 === 999 ? '' : serviceData[0].ANHE1
                ANCForm.ANHE2 = serviceData[0].ANHE2 === 999 ? '' : serviceData[0].ANHE2
                ANCForm.ANHE3 = serviceData[0].ANHE3 === 999 ? '' : serviceData[0].ANHE3
                ANCForm.ANHE4 = serviceData[0].ANHE4 === 999 ? '' : serviceData[0].ANHE4
                ANCForm.ANHE5 = serviceData[0].ANHE5 === 999 ? '' : serviceData[0].ANHE5
                ANCForm.ANHE6 = serviceData[0].ANHE6 === 999 ? '' : serviceData[0].ANHE6
                ANCForm.ANHE7 = serviceData[0].ANHE7 === 999 ? '' : serviceData[0].ANHE7
                ANCForm.ANHE8 = serviceData[0].ANHE8 === 999 ? '' : serviceData[0].ANHE8
                var HEArr = []
                var HEArr1 = serviceData[0].ANHE1 === 1 ? HEArr.push('Maternal Nutrition') : null
                var HEArr2 = serviceData[0].ANHE2 === 1 ? HEArr.push('Family Planning') : null
                var HEArr3 = serviceData[0].ANHE3 === 1 ? HEArr.push('New Born Care') : null
                var HEArr4 = serviceData[0].ANHE4 === 1 ? HEArr.push('Birth Plan') : null
                var HEArr5 = serviceData[0].ANHE5 === 1 ? HEArr.push('Emergency Response Plan') : null
                var HEArr6 = serviceData[0].ANHE6 === 1 ? HEArr.push('Danger Signs') : null
                var HEArr7 = serviceData[0].ANHE7 === 1 ? HEArr.push('Exclusive Breast Feeding') : null
                var HEArr8 = serviceData[0].ANHE8 === 1 ? HEArr.push('RTIs/HIV/STI') : null
                setHE(HEArr)
                ANCForm.ANOUTCOME = serviceData[0].ANOUTCOME === 999 ? '' : serviceData[0].ANOUTCOME
                setPatientOutcome(serviceData[0].ANOUTCOME === 999 ? '' : serviceData[0].ANOUTCOME)
                ANCForm.ANREFTO = serviceData[0].ANREFTO === 999 ? '' : serviceData[0].ANREFTO
                setReferPlace(serviceData[0].ANREFTO === 999 ? '' : serviceData[0].ANREFTO)
                ANCForm.ANREFTOOTHER = serviceData[0].ANREFTOOTHER
                ANCForm.ANREFREASON = serviceData[0].ANREFREASON
                ANCForm.ANDEATHREASON = serviceData[0].ANDEATHREASON
                ANCForm.ANB1UNIT = serviceData[0].ANB1UNIT === 999 ? '' : serviceData[0].ANB1UNIT === 1 ? '1' : serviceData[0].ANB1UNIT === 2 ? '2' : '3'
                ANCForm.ANAGE = serviceData[0].ANAGE
                ANCForm.ANAGEUNIT = serviceData[0].ANAGEUNIT
                ANCForm.ANTEMPUNIT = serviceData[0].ANTEMPUNIT === 1 ? '1' : '2'
                ANCForm.ANCLNID = serviceData[0].ANCLNID
                setClnCode(serviceData[0].ANCLNID)
                ANCForm.ANSYNC = '0'
                ANCForm.ANUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
                ANCForm.ANSTATUS = '2'
                ANCForm.ID = serviceData[0].ID

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

                setANCLabForm({
                    ...ANCLabForm,
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
                ANC Information</Typography>
            {/*  <CustomRHTable patient={props.patient} serviceType={props.serviceType} /> */}

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
                                onChange={ANCClinicHandleChange}
                                InputLabelProps={{
                                    style: { color: '#482642' },
                                    shrink: true
                                }}
                                SelectProps={{
                                    native: true
                                }}
                            >
                                {clinicData.length &&
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
                                onChange={ANCVillageHandleChange}
                                InputLabelProps={{
                                    style: { color: '#482642' },
                                    shrink: true
                                }}
                                SelectProps={{
                                    native: true
                                }}
                            >
                                {villageData.length &&
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
                    <Grid container spacing={10} alignItems="center" justifyContent="center" style={{ padding: '20px' }} row>
                        <Grid item xs={'auto'} style={{ width: '18%' }}>
                            <Button
                                variant="contained"
                                style={{ background: '#482642', color: '#fff', width: '100%' }}
                                onClick={update}  >Update</Button>
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


            </div>


        </>);
}
