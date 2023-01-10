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

import _ from 'lodash';

//////////////API/////////////////
import { insertPNC, updatePNC } from "../../modals/pncinfo";
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

export default function PNCServiceEditForm(props) {

    const classes = useStyles();

    const history = useHistory();

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [serviceTypeData, setServiceTypeData] = useState('')
    const [patientOC, setPatientOC] = useState([])
    const [clinicData, setClinicData] = useState([])
    const [villageData, setVillageData] = useState([])

    const [PNCForm, setPNCForm] = useState({
        PNREGID: '',
        PNPROVIDEDDATE: '',
        PNAGE: '',
        PNTYPE: '',
        PNDONOR: '',
        PNORG: '',
        PNPROJECT: '',
        PNTSP: '',
        PNPLACE: '',
        PNVILLAGE: '',
        PNPROVIDERNAME: '',
        PNANSELFREP: '',
        PNPROVIDERPOSITION: '',
        PNUSRLOGIN: '',
        PNBP: '',
        PNPR: '',
        PNRR: '',
        PNTEMP: '',
        PNP: '',
        PNA: '',
        PNLAB: '',
        PNSEPSIS: '',
        PNPPH: '',
        PNRPOC: '',
        PNECLAMPSIA: '',
        PNBTABSCESS: '',
        PNINF: '',
        PNMALARIA: '',
        PNTRANSFUSION: '',
        PNMVA: '',
        PNREMOVALPLACENTA: '',
        PNOXYTOCIN: '',
        PNANTIBIOTICINJ: '',
        PNMISO: '',
        PNANTICONVULSANT: '',
        PNMALARIATX: '',
        PNB1: '',
        PNVITA: '',
        PNFESO4: '',
        PNFP: '',
        PNOUTCOME: '',
        PNREFTO: '',
        PNREFTOOTHER: '',
        PNREFREASON: '',
        PNDEATHREASON: '',
        PNHE: '',
        PNDDELI: '',
        PNB1UNIT: '',
        PNAGEUNIT: '',
        PNTEMPUNIT: '',
        PNVITAUNIT: '',
        PNCLNID: '',
        PNUPDATE: '',
        PNSTATUS: '',
        PNSYNC: '',
        ID: '',
        PNREMARK: '',
        PNNBC: ''
    });

    const [PNCLabForm, setPNCLabForm] = useState({
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
                    setPNCForm({ ...PNCForm, PNPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), PNAGE: h.toString().split('.')[0], PNAGEUNIT: '365' })
                    setPNCLabForm({ ...PNCLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setPNCForm({ ...PNCForm, PNPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), PNAGE: h.toString().split('.')[0], PNAGEUNIT: '30' })
                setPNCLabForm({ ...PNCLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setPNCForm({ ...PNCForm, PNPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), PNAGE: totalAge, PNAGEUNIT: '1' })
                setPNCLabForm({ ...PNCLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

    function PNCTempUnitHandleChange(event) {
        if (event.target.value === PNCForm.PNTEMPUNIT) {
            setPNCForm({ ...PNCForm, PNTEMPUNIT: "" })
        } else {
            setPNCForm({ ...PNCForm, PNTEMPUNIT: event.target.value })
        }
    }

    function PNB1UnitHandleChange(event) {
        if (event.target.value === PNCForm.PNB1UNIT) {
            setPNCForm({ ...PNCForm, PNB1UNIT: "" })
        } else {
            setPNCForm({ ...PNCForm, PNB1UNIT: event.target.value })
        }
    }

    function PNVitAUnitHandleChange(event) {
        if (event.target.value === PNCForm.PNVITAUNIT) {
            setPNCForm({ ...PNCForm, PNVITAUNIT: "" })
        } else {
            setPNCForm({ ...PNCForm, PNVITAUNIT: event.target.value })
        }
    }

    function PNFPUnitHandleChange(event) {
        if (event.target.value === PNCForm.PNFP) {
            setPNCForm({ ...PNCForm, PNFP: "" })
        } else {
            setPNCForm({ ...PNCForm, PNFP: event.target.value })
        }
    }

    function PNNBCUnitHandleChange(event) {
        if (event.target.value === PNCForm.PNNBC) {
            setPNCForm({ ...PNCForm, PNNBC: "" })
        } else {
            setPNCForm({ ...PNCForm, PNNBC: event.target.value })
        }
    }

    function PNHEUnitHandleChange(event) {
        if (event.target.value === PNCForm.PNHE) {
            setPNCForm({ ...PNCForm, PNHE: "" })
        } else {
            setPNCForm({ ...PNCForm, PNHE: event.target.value })
        }
    }

    ///////LabTest///////////
    const [labTest, setLabTest] = useState(false)
    const labTestHandle = (event) => {
        setLabTest(event.target.checked);
        setPNCForm({ ...PNCForm, PNLAB: event.target.checked === true ? 1 : 0 })
        setPNCLabForm({ ...PNCLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
    };

    ///////Investigation///////////
    const [RDT, setRDT] = useState('999');
    const RDTHandle = (event) => {
        setRDT(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABRDT: event.target.value })
    };
    const [microscopic, setMicroscopic] = useState('999');
    const microscopicHandle = (event) => {
        setMicroscopic(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABMICROSCOPIC: event.target.value })
    };
    const [blood, setBlood] = useState('999')
    const bloodHandle = (event) => {
        setBlood(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABBG: event.target.value })
    };
    const [RH, setRH] = useState('999')
    const RHHandle = (event) => {
        setRH(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABRH: event.target.value })
    };
    const [urineProtein, setUrineProtein] = useState('999');
    const urintProteinHandle = (event) => {
        setUrineProtein(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABUPROTEIN: event.target.value })
    };
    const [UCG, setUCG] = useState('999')
    const UCGHandle = (event) => {
        setUCG(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABUCG: event.target.value })
    };

    const [urine, setUrine] = useState('999')
    const urineHandle = (event) => {
        setUrine(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABUSUGAR: event.target.value })
    };

    const [gonorrhoea, setGonorrhoea] = useState('999')
    const gonorrhoeaHandle = (event) => {
        setGonorrhoea(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABGONO: event.target.value })
    };
    const [trichomonus, setTrichomonus] = useState('999')
    const trichomonusHandle = (event) => {
        setTrichomonus(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABTRICHO: event.target.value })
    };
    const [candida, setCandida] = useState('999')
    const candidaHandle = (event) => {
        setCandida(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABCANDIDA: event.target.value })
    };
    const [RPR, setRPR] = useState('999')
    const RPRHandle = (event) => {
        setRPR(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABRPR: event.target.value })
    };
    const [TPHA, setTPHA] = useState('999')
    const TPHAHandle = (event) => {
        setTPHA(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABTPHA: event.target.value })
    };
    const [VDRL, setVDRL] = useState('999')
    const VDRLHandle = (event) => {
        setVDRL(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABVDRL: event.target.value })
    };
    const [HIV, setHIV] = useState('999')
    const HIVHandle = (event) => {
        setHIV(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABHIV: event.target.value })
    };
    const [HBV, setHBV] = useState('999')
    const HBVHandle = (event) => {
        setHBV(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABHBV: event.target.value })
    };
    const [HepC, setHepC] = useState('999')
    const HepCHandle = (event) => {
        setHepC(event.target.value);
        setPNCLabForm({ ...PNCLabForm, LABHCV: event.target.value })
    };

    //////////////Diagnosis,Procedure,Treatment/////////////////

    const [diagnosis, setDiagnosis] = useState([])
    const diagnosisHandle = (event) => {
        setDiagnosis(event.target.value);
    };

    const [procedure, setProcedure] = useState([])
    const procedureHandle = (event) => {
        setProcedure(event.target.value);
    };

    const [treatment, setTreatment] = useState([])
    const treatmentHandle = (event) => {
        setTreatment(event.target.value);
    };

    /////Patient Outcome//////////
    const [proPosition, setProPosition] = useState('')
    const proPositionHandle = (event) => {
        setProPosition(event.target.value);
        setPNCForm({ ...PNCForm, PNPROVIDERPOSITION: event.target.value })
    };
    const [proPlace, setProPlace] = useState('')
    const proPlaceHandle = (event) => {
        setProPlace(event.target.value);
        setPNCForm({ ...PNCForm, PNPLACE: event.target.value })
        setPNCLabForm({ ...PNCLabForm, LABPLACE: event.target.value })
    };
    const [patientOutcome, setPatientOutcome] = useState('999')
    const patientOutcomeHandle = (event) => {
        setPatientOutcome(event.target.value);
        setPNCForm({ ...PNCForm, PNOUTCOME: event.target.value })
    };
    const [referPlace, setReferPlace] = useState('999')
    const referPlaceHandle = (event) => {
        setReferPlace(event.target.value);
        setPNCForm({ ...PNCForm, PNREFTO: event.target.value })
    };

    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageCode, setVillageCode] = useState('')

    const PNCVillageHandleChange = (event) => {
        let tsp = _.find(villageData, ['VILLAGE_CODE', event.target.value]);
        setTspCode(tsp.TSP_CODE)
        setVillageCode(event.target.value)
        setPNCLabForm({ ...PNCLabForm, LABVILLAGE: event.target.value })
        setPNCForm({ ...PNCForm, PNVILLAGE: event.target.value, PNTSP: tsp.TSP_CODE })
        console.log("Selected Village => ", event.target.value)
    };
    const PNCClinicHandleChange = (event) => {
        setClnCode(event.target.value)
        setPNCForm({ ...PNCForm, PNCLNID: event.target.value })
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
                    'valid';

        

        if (valid === 'valid') {
            var dArr = []
        var dArr1 = ['Pureperal Sepsis', diagnosis.includes('Pureperal Sepsis') ? 1 : 999]
        var dArr2 = ['Post Partum Hemorrhage', diagnosis.includes('Post Partum Hemorrhage') ? 1 : 999]
        var dArr3 = ['Incomplete Placenta', diagnosis.includes('Incomplete Placenta') ? 1 : 999]
        var dArr4 = ['Severe Pre-Eclampsia/Eclampsia', diagnosis.includes('Severe Pre-Eclampsia/Eclampsia') ? 1 : 999]
        var dArr5 = ['Breast Abscess', diagnosis.includes('Breast Abscess') ? 1 : 999]
        var dArr6 = ['Wound Infection', diagnosis.includes('Wound Infection') ? 1 : 999]
        var dArr7 = ['Malaria', diagnosis.includes('Malaria') ? 1 : 999]
        dArr.push(dArr1)
        dArr.push(dArr2)
        dArr.push(dArr3)
        dArr.push(dArr4)
        dArr.push(dArr5)
        dArr.push(dArr6)
        dArr.push(dArr7)
        PNCForm.PNSEPSIS = dArr[0][1]
        PNCForm.PNPPH = dArr[1][1]
        PNCForm.PNRPOC = dArr[2][1]
        PNCForm.PNECLAMPSIA = dArr[3][1]
        PNCForm.PNBTABSCESS = dArr[4][1]
        PNCForm.PNINF = dArr[5][1]
        PNCForm.PNMALARIA = dArr[6][1]

        var pArr = []
        var pArr1 = ['Blood Transfusion', procedure.includes('Blood Transfusion') ? 1 : 999]
        var pArr2 = ['MVA Info', procedure.includes('MVA Info') ? 1 : 999]
        var pArr3 = ['Placenta Manual Removal', procedure.includes('Placenta Manual Removal') ? 1 : 999]
        pArr.push(pArr1)
        pArr.push(pArr2)
        pArr.push(pArr3)
        PNCForm.PNTRANSFUSION = pArr[0][1]
        PNCForm.PNMVA = pArr[1][1]
        PNCForm.PNREMOVALPLACENTA = pArr[2][1]

        var tArr = []
        var tArr1 = ['IV/IM Oxytocin', treatment.includes('IV/IM Oxytocin') ? 1 : 999]
        var tArr2 = ['Antibiotic (IV/IM)', treatment.includes('Antibiotic (IV/IM)') ? 1 : 999]
        var tArr3 = ['Misoprostol Info', treatment.includes('Misoprostol Info') ? 1 : 999]
        var tArr4 = ['IV Anticonvulsant Info', treatment.includes('IV Anticonvulsant Info') ? 1 : 999]
        var tArr5 = ['Malaria Treatment', treatment.includes('Malaria Treatment') ? 1 : 999]
        tArr.push(tArr1)
        tArr.push(tArr2)
        tArr.push(tArr3)
        tArr.push(tArr4)
        tArr.push(tArr5)
        PNCForm.PNOXYTOCIN = tArr[0][1]
        PNCForm.PNANTIBIOTICINJ = tArr[1][1]
        PNCForm.PNMISO = tArr[2][1]
        PNCForm.PNANTICONVULSANT = tArr[3][1]
        PNCForm.PNMALARIATX = tArr[4][1]

        var parity = PNCForm.PNP === '' ? 999 : PNCForm.PNP
        PNCForm.PNP = parity
        var abortion = PNCForm.PNA === '' ? 999 : PNCForm.PNA
        PNCForm.PNA = abortion
        var anVisit = PNCForm.PNANSELFREP === '' ? 999 : PNCForm.PNANSELFREP
        PNCForm.PNANSELFREP = anVisit
        var temp = PNCForm.PNTEMP === '' ? 999.9 : PNCForm.PNTEMP
        PNCForm.PNTEMP = temp
        var tempUnit = PNCForm.PNTEMPUNIT === '' ? 999 : PNCForm.PNTEMPUNIT
        PNCForm.PNTEMPUNIT = tempUnit
        var pulseRate = PNCForm.PNPR === '' ? 999 : PNCForm.PNPR
        PNCForm.PNPR = pulseRate
        var RR = PNCForm.PNRR === '' ? 999 : PNCForm.PNRR
        PNCForm.PNRR = RR
        var bp = PNCForm.PNBP === '' ? '000/000' : PNCForm.PNBP
        PNCForm.PNBP = bp
        var b1 = PNCForm.PNB1 === '' ? 999 : PNCForm.PNB1
        PNCForm.PNB1 = b1
        var b1Unit = PNCForm.PNB1UNIT === '' ? 999 : PNCForm.PNB1UNIT
        PNCForm.PNB1UNIT = b1Unit
        var v1 = PNCForm.PNVITA === '' ? 999 : PNCForm.PNVITA
        PNCForm.PNVITA = v1
        var v1Unit = PNCForm.PNVITAUNIT === '' ? 999 : PNCForm.PNVITAUNIT
        PNCForm.PNVITAUNIT = v1Unit
        var feso4 = PNCForm.PNFESO4 === '' ? 999 : PNCForm.PNFESO4
        PNCForm.PNFESO4 = feso4
        var fp = PNCForm.PNFP === '' ? 999 : PNCForm.PNFP
        PNCForm.PNFP = fp
        var nbc = PNCForm.PNNBC === '' ? 999 : PNCForm.PNNBC
        PNCForm.PNNBC = nbc
        var he = PNCForm.PNHE === '' ? 999 : PNCForm.PNHE
        PNCForm.PNHE = he

        var lab = labTest === false ? 0 : 1;
        PNCForm.PNLAB = lab
        PNCLabForm.LABTEST = lab

        var labHB = PNCLabForm.LABHB === '' ? 999 : PNCLabForm.LABHB
        PNCLabForm.LABHB = labHB
        var labRBS = PNCLabForm.LABRBS === '' ? 999 : PNCLabForm.LABRBS
        PNCLabForm.LABRBS = labRBS

        PNCLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        
            const res = await updatePNC({ PNCForm, PNCLabForm });
            if (res?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully updated a patient's PNC Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openPNCUpdateSnackbar: true
                });
            }
            console.log('PNCFORM=>', PNCForm)
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

        if (sessionStorage.getItem('editPNCPatient') === 'true') {

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

                PNCForm.PNREGID = serviceData[0].PNREGID
                PNCForm.PNPROVIDEDDATE = moment(serviceData[0].PNPROVIDEDDATE).format("YYYY-MM-DD")
                setProvidedDate(moment(serviceData[0].PNPROVIDEDDATE).format("YYYY-MM-DD"))
                PNCForm.PNAGE = serviceData[0].PNAGE
                PNCForm.PNTYPE = serviceData[0].PNTYPE
                PNCForm.PNDONOR = serviceData[0].PNDONOR
                PNCForm.PNORG = serviceData[0].PNORG
                PNCForm.PNPROJECT = serviceData[0].PNPROJECT
                PNCForm.PNTSP = serviceData[0].PNTSP
                setTspCode(serviceData[0].PNTSP)
                PNCForm.PNPLACE = serviceData[0].PNPLACE
                setProPlace(serviceData[0].PNPLACE)
                PNCForm.PNVILLAGE = serviceData[0].PNVILLAGE
                setVillageCode(serviceData[0].PNVILLAGE)
                PNCForm.PNPROVIDERNAME = serviceData[0].PNPROVIDERNAME
                PNCForm.PNANSELFREP = serviceData[0].PNANSELFREP === 999 ? '' : serviceData[0].PNANSELFREP
                PNCForm.PNPROVIDERPOSITION = serviceData[0].PNPROVIDERPOSITION
                setProPosition(serviceData[0].PNPROVIDERPOSITION)
                PNCForm.PNUSRLOGIN = serviceData[0].PNUSRLOGIN
                PNCForm.PNBP = serviceData[0].PNBP === '000/000' ? '' : serviceData[0].PNBP
                PNCForm.PNPR = serviceData[0].PNPR === 999 ? '' : serviceData[0].PNPR
                PNCForm.PNRR = serviceData[0].PNRR === 999 ? '' : serviceData[0].PNRR
                PNCForm.PNTEMP = serviceData[0].PNTEMP === 999.9 ? '' : serviceData[0].PNTEMP
                PNCForm.PNP = serviceData[0].PNP === 999 ? '' : serviceData[0].PNP
                PNCForm.PNA = serviceData[0].PNA === 999 ? '' : serviceData[0].PNA
                PNCForm.PNLAB = serviceData[0].PNLAB

                PNCForm.PNSEPSIS = serviceData[0].PNSEPSIS === 999 ? '' : serviceData[0].PNSEPSIS
                PNCForm.PNPPH = serviceData[0].PNPPH === 999 ? '' : serviceData[0].PNPPH
                PNCForm.PNRPOC = serviceData[0].PNRPOC === 999 ? '' : serviceData[0].PNRPOC
                PNCForm.PNECLAMPSIA = serviceData[0].PNECLAMPSIA === 999 ? '' : serviceData[0].PNECLAMPSIA
                PNCForm.PNBTABSCESS = serviceData[0].PNBTABSCESS === 999 ? '' : serviceData[0].PNBTABSCESS
                PNCForm.PNINF = serviceData[0].PNINF === 999 ? '' : serviceData[0].PNINF
                PNCForm.PNMALARIA = serviceData[0].PNMALARIA === 999 ? '' : serviceData[0].PNMALARIA
                var dArr = []
                var dArr1 = serviceData[0].PNSEPSIS === 1 ? dArr.push('Pureperal Sepsis') : null
                var dArr2 = serviceData[0].PNPPH === 1 ? dArr.push('Post Partum Hemorrhage') : null
                var dArr3 = serviceData[0].PNRPOC === 1 ? dArr.push('Incomplete Placenta') : null
                var dArr4 = serviceData[0].PNECLAMPSIA === 1 ? dArr.push('Severe Pre-Eclampsia/Eclampsia') : null
                var dArr5 = serviceData[0].PNBTABSCESS === 1 ? dArr.push('Breast Abscess') : null
                var dArr6 = serviceData[0].PNINF === 1 ? dArr.push('Wound Infection') : null
                var dArr7 = serviceData[0].PNMALARIA === 1 ? dArr.push('Malaria') : null
                setDiagnosis(dArr)
                PNCForm.PNTRANSFUSION = serviceData[0].PNTRANSFUSION === 999 ? '' : serviceData[0].PNTRANSFUSION
                PNCForm.PNMVA = serviceData[0].PNMVA === 999 ? '' : serviceData[0].PNMVA
                PNCForm.PNREMOVALPLACENTA = serviceData[0].PNREMOVALPLACENTA === 999 ? '' : serviceData[0].PNREMOVALPLACENTA
                var pArr = []
                var pArr1 = serviceData[0].PNTRANSFUSION === 1 ? pArr.push('Blood Transfusion') : null
                var pArr2 = serviceData[0].PNMVA === 1 ? pArr.push('MVA Info') : null
                var pArr3 = serviceData[0].PNREMOVALPLACENTA === 1 ? pArr.push('Placenta Manual Removal') : null
                setProcedure(pArr)
                PNCForm.PNOXYTOCIN = serviceData[0].PNOXYTOCIN === 999 ? '' : serviceData[0].PNOXYTOCIN
                PNCForm.PNANTIBIOTICINJ = serviceData[0].PNANTIBIOTICINJ === 999 ? '' : serviceData[0].PNANTIBIOTICINJ
                PNCForm.PNMISO = serviceData[0].PNMISO === 999 ? '' : serviceData[0].PNMISO
                PNCForm.PNANTICONVULSANT = serviceData[0].PNANTICONVULSANT === 999 ? '' : serviceData[0].PNANTICONVULSANT
                PNCForm.PNMALARIATX = serviceData[0].PNMALARIATX === 999 ? '' : serviceData[0].PNMALARIATX
                var tArr = []
                var tArr1 = serviceData[0].PNOXYTOCIN === 1 ? tArr.push('IV/IM Oxytocin') : null
                var tArr2 = serviceData[0].PNANTIBIOTICINJ === 1 ? tArr.push('Antibiotic (IV/IM)') : null
                var tArr3 = serviceData[0].PNMISO === 1 ? tArr.push('Misoprostol Info') : null
                var tArr4 = serviceData[0].PNANTICONVULSANT === 1 ? tArr.push('IV Anticonvulsant Info') : null
                var tArr5 = serviceData[0].PNMALARIATX === 1 ? tArr.push('Malaria Treatment') : null
                setTreatment(tArr)
                PNCForm.PNB1 = serviceData[0].PNB1 === 999 ? '' : serviceData[0].PNB1
                PNCForm.PNVITA = serviceData[0].PNVITA === 999 ? '' : serviceData[0].PNVITA
                PNCForm.PNFESO4 = serviceData[0].PNFESO4 === 999 ? '' : serviceData[0].PNFESO4
                PNCForm.PNFP = serviceData[0].PNFP === 999 ? '' : serviceData[0].PNFP === 1 ? '1' : '2'
                PNCForm.PNOUTCOME = serviceData[0].PNOUTCOME === 999 ? '' : serviceData[0].PNOUTCOME
                setPatientOutcome(serviceData[0].PNOUTCOME === 999 ? '' : serviceData[0].PNOUTCOME)
                PNCForm.PNREFTO = serviceData[0].PNREFTO === 999 ? '' : serviceData[0].PNREFTO
                setReferPlace(serviceData[0].PNREFTO === 999 ? '' : serviceData[0].PNREFTO)
                PNCForm.PNREFTOOTHER = serviceData[0].PNREFTOOTHER
                PNCForm.PNREFREASON = serviceData[0].PNREFREASON
                PNCForm.PNDEATHREASON = serviceData[0].PNDEATHREASON
                PNCForm.PNHE = serviceData[0].PNHE === 999 ? '' : serviceData[0].PNHE === 1 ? '1' : '2'
                PNCForm.PNNBC = serviceData[0].PNNBC === 999 ? '' : serviceData[0].PNNBC === 1 ? '1' : '2'
                PNCForm.PNDDELI = serviceData[0].PNDDELI === null ? null : moment(serviceData[0].PNDDELI).format("YYYY-MM-DD")
                PNCForm.PNB1UNIT = serviceData[0].PNB1UNIT === 999 ? '' : serviceData[0].PNB1UNIT === 1 ? '1' : '2'
                PNCForm.PNAGEUNIT = serviceData[0].PNAGEUNIT
                PNCForm.PNTEMPUNIT = serviceData[0].PNTEMPUNIT === 1 ? '1' : '2'
                PNCForm.PNVITAUNIT = serviceData[0].PNVITAUNIT === 999 ? '' : serviceData[0].PNVITAUNIT === 1 ? '1' : '2'
                PNCForm.PNCLNID = serviceData[0].PNCLNID
                setClnCode(serviceData[0].PNCLNID)
                PNCForm.PNUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
                PNCForm.PNSTATUS = '2'
                PNCForm.PNSYNC = '0'
                PNCForm.ID = serviceData[0].ID
                PNCForm.PNREMARK = serviceData[0].PNREMARK

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

                setPNCLabForm({
                    ...PNCLabForm,
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
                PNC Information</Typography>

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
                                onChange={PNCClinicHandleChange}
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
                                onChange={PNCVillageHandleChange}
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
                                            label={<Grid row container><Typography color="#482642">Parity </Typography>
                                            </Grid>}
                                            style={{ marginTop: '10px' }}
                                            onChange={e => { (e.target.value.length > 2) ? setPNCForm({ ...PNCForm, PNP: (e.target.value).slice(0, 2) }) : setPNCForm({ ...PNCForm, PNP: e.target.value }) }}
                                            value={PNCForm.PNP} />
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
                                            onChange={e => { (e.target.value.length > 2) ? setPNCForm({ ...PNCForm, PNA: (e.target.value).slice(0, 2) }) : setPNCForm({ ...PNCForm, PNA: e.target.value }) }}
                                            value={PNCForm.PNA} />
                                        <CustomTextField
                                            type="number"
                                            variantText="filled"
                                            inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                            InputLabelProps={{
                                                style: { color: '#482642' },
                                                shrink: true
                                            }}
                                            label={<Grid row container><Typography color="#482642">ANC visits(during pregnancy)</Typography>
                                            </Grid>}
                                            style={{ marginTop: '10px' }}
                                            onChange={e => { (e.target.value.length > 2) ? setPNCForm({ ...PNCForm, PNANSELFREP: (e.target.value).slice(0, 2) }) : setPNCForm({ ...PNCForm, PNANSELFREP: e.target.value }) }}
                                            value={PNCForm.PNANSELFREP} />
                                        <CustomTextField
                                            id="filled-basic"
                                            type="date"
                                            label={<Grid row container><Typography color="#482642">Delivery Date </Typography>
                                            </Grid>}
                                            variantText="filled"
                                            InputLabelProps={{
                                                style: { color: '#482642' },
                                                shrink: true
                                            }}
                                            style={{ marginTop: '10px' }}
                                            onChange={e => { setPNCForm({ ...PNCForm, PNDDELI: e.target.value }) }}
                                            value={PNCForm.PNDDELI} />

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
                                                label={<Grid row container><Typography color="#482642">Temp </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px', width: '90%' }}
                                                onChange={e => { (e.target.value.length > 5) ? setPNCForm({ ...PNCForm, PNTEMP: (e.target.value).slice(0, 5) }) : setPNCForm({ ...PNCForm, PNTEMP: e.target.value }) }}
                                                value={PNCForm.PNTEMP} />
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
                                                        onChange={e => { setPNCForm({ ...PNCForm, PNTEMPUNIT: e.target.value }) }}
                                                        value={PNCForm.PNTEMPUNIT}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="°F"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNCTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNCTempUnitHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNCTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNCTempUnitHandleChange(e)} />}
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
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { setPNCForm({ ...PNCForm, PNPR: parseInt(e.target.value) }) }}
                                                value={PNCForm.PNPR} />
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
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { setPNCForm({ ...PNCForm, PNRR: parseInt(e.target.value) }) }}
                                                value={PNCForm.PNRR} />
                                            <CustomTextField
                                                id="filled-basic"
                                                label="BP(mmHg)"
                                                variantText="filled"
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { setPNCForm({ ...PNCForm, PNBP: e.target.value }) }}
                                                value={PNCForm.PNBP}
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
                                                onChange={e => { setPNCLabForm({ ...PNCLabForm, LABHB: e.target.value }) }}
                                                value={PNCLabForm.LABHB} />
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
                                                onChange={e => { setPNCLabForm({ ...PNCLabForm, LABOTHER: e.target.value }) }}
                                                value={PNCLabForm.LABOTHER}
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
                                                onChange={e => { setPNCLabForm({ ...PNCLabForm, LABRBS: e.target.value }) }}
                                                value={PNCLabForm.LABRBS} />
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
                                                label={<Grid row container><Typography color="#482642">B1(Tab) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { (e.target.value.length > 3) ? setPNCForm({ ...PNCForm, PNB1: (e.target.value).slice(0, 3) }) : setPNCForm({ ...PNCForm, PNB1: e.target.value }) }}
                                                value={PNCForm.PNB1} />
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
                                                        onChange={e => { setPNCForm({ ...PNCForm, PNB1UNIT: e.target.value }) }}
                                                        value={PNCForm.PNB1UNIT}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="10mg"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNB1UnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNB1UnitHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNB1UnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNB1UnitHandleChange(e)} />}
                                                            label="50mg"
                                                        />
                                                        <FormControlLabel
                                                            value="3"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNB1UnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNB1UnitHandleChange(e)} />}
                                                            label="100mg"
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
                                                label={<Grid row container><Typography color="#482642">Vit A(Capsule)</Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { (e.target.value.length > 3) ? setPNCForm({ ...PNCForm, PNVITA: (e.target.value).slice(0, 3) }) : setPNCForm({ ...PNCForm, PNVITA: e.target.value }) }}
                                                value={PNCForm.PNVITA} />
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
                                                        onChange={e => { setPNCForm({ ...PNCForm, PNVITAUNIT: e.target.value }) }}
                                                        value={PNCForm.PNVITAUNIT}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="0.25L"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNVitAUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNVitAUnitHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNVitAUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNVitAUnitHandleChange(e)} />}
                                                            label="2L"
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
                                                label={<Grid row container><Typography color="#482642">Ferrous(Tab) </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { (e.target.value.length > 3) ? setPNCForm({ ...PNCForm, PNFESO4: (e.target.value).slice(0, 3) }) : setPNCForm({ ...PNCForm, PNFESO4: e.target.value }) }}
                                                value={PNCForm.PNFESO4} />
                                            <FormControl style={{ width: '100%' }}>
                                                <Card
                                                    variant="outlined"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '10px',
                                                        background: "#fcf0f2"
                                                    }}
                                                >
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">FP-Counselling </Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",

                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setPNCForm({ ...PNCForm, PNFP: e.target.value }) }}
                                                        value={PNCForm.PNFP}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Yes"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNFPUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNFPUnitHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={PNFPUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNFPUnitHandleChange(e)} />}
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
                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px', fontWeight: 'bold' }}><Typography>Diagnosis - Procedure - Treatment - NewBornCare - Health Education </Typography>
                                    </Grid>}
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>

                                        <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                                            <InputLabel id="demo-simple-select-filled-label">Diagnosis</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                multiple
                                                value={diagnosis}
                                                onChange={diagnosisHandle}
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

                                                <MenuItem classes={{ selected: classes.selected }} value={'Pureperal Sepsis'}>Pureperal Sepsis</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Post Partum Hemorrhage'}>Post Partum Hemorrhage</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Incomplete Placenta'}>Incomplete Placenta</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Severe Pre-Eclampsia/Eclampsia'}>Severe Pre-Eclampsia/Eclampsia</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Breast Abscess'}>Breast Abscess</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Wound Infection'}>Wound Infection</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Malaria'}>Malaria</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                                            <InputLabel id="demo-simple-select-filled-label">Procedure</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                multiple
                                                value={procedure}
                                                onChange={procedureHandle}
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

                                                <MenuItem classes={{ selected: classes.selected }} value={'Blood Transfusion'}>Blood Transfusion</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'MVA Info'}>MVA Info</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Placenta Manual Removal'}>Placenta Manual Removal</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                                            <InputLabel id="demo-simple-select-filled-label">Treatment</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                multiple
                                                value={treatment}
                                                onChange={treatmentHandle}
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

                                                <MenuItem classes={{ selected: classes.selected }} value={'IV/IM Oxytocin'}>IV/IM Oxytocin</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Antibiotic (IV/IM)'}>Antibiotic (IV/IM)</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Misoprostol Info'}>Misoprostol Info</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'IV Anticonvulsant Info'}>IV Anticonvulsant Info</MenuItem>
                                                <MenuItem classes={{ selected: classes.selected }} value={'Malaria Treatment'}>Malaria Treatment</MenuItem>
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
                                                {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">New Born Care </Typography>
                                                </Grid>}

                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gender1"
                                                    style={{
                                                        display: "flex",

                                                        flexDirection: 'row',
                                                        justifyContent: "space-around"
                                                    }}
                                                    onChange={e => { setPNCForm({ ...PNCForm, PNNBC: e.target.value }) }}
                                                    value={PNCForm.PNNBC}
                                                    row={true}
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        labelPlacement="left"
                                                        label="Yes"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={PNNBCUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNNBCUnitHandleChange(e)} />}
                                                    />
                                                    <FormControlLabel
                                                        value="2"
                                                        labelPlacement="left"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={PNNBCUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNNBCUnitHandleChange(e)} />}
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
                                                {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Health Education</Typography>
                                                </Grid>}

                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gender1"
                                                    style={{
                                                        display: "flex",

                                                        flexDirection: 'row',
                                                        justifyContent: "space-around"
                                                    }}
                                                    onChange={e => { setPNCForm({ ...PNCForm, PNHE: e.target.value }) }}
                                                    value={PNCForm.PNHE}
                                                    row={true}
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        labelPlacement="left"
                                                        label="Yes"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={PNHEUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNHEUnitHandleChange(e)} />}
                                                    />
                                                    <FormControlLabel
                                                        value="2"
                                                        labelPlacement="left"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={PNHEUnitHandleChange} onKeyDown={e => e.key === 'Enter' && PNHEUnitHandleChange(e)} />}
                                                        label="No"
                                                    />
                                                </RadioGroup>
                                            </Card>
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
                                                onChange={e => { setPNCForm({ ...PNCForm, PNREFREASON: e.target.value }) }}
                                                value={PNCForm.PNREFREASON}
                                            />
                                        </Grid></>}
                                    {patientOutcome === 4 && <>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Reasons of Death"
                                                variantText="filled"
                                                style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                onChange={e => { setPNCForm({ ...PNCForm, PNDEATHREASON: e.target.value }) }}
                                                value={PNCForm.PNDEATHREASON}
                                            />
                                        </Grid></>}
                                    {patientOutcome === 3 && referPlace === 5 && <>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Other Referral"
                                                variantText="filled"
                                                style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                onChange={e => { setPNCForm({ ...PNCForm, PNREFTOOTHER: e.target.value }) }}
                                                value={PNCForm.PNREFTOOTHER}
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
                                                onChange={e => { setPNCForm({ ...PNCForm, PNPROVIDERNAME: e.target.value }) }}
                                                value={PNCForm.PNPROVIDERNAME}
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
                                onChange={e => { setPNCForm({ ...PNCForm, PNREMARK: e.target.value }) }}
                                value={PNCForm.PNREMARK}
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
