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
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Card } from "@mui/material";
import { Button, OutlinedInput, Snackbar, SnackbarContent, Switch, TextField, Typography } from "@material-ui/core";

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
import { insertRH, updateRH } from "../../modals/rhinfo";
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

export default function RHServiceEditForm(props) {

    const classes = useStyles();

    const history = useHistory();

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [patientOC, setPatientOC] = useState([])
    const [serviceTypeData, setServiceTypeData] = useState('')
    const [clinicData, setClinicData] = useState([])
    const [villageData, setVillageData] = useState([])

    const [RHForm, setRHForm] = useState({
        RHREGID: '',
        RHPROVIDEDDATE: '',
        RHTYPE: '',
        RHDONOR: '',
        RHORG: '',
        RHPROJECT: '',
        RHTSP: '',
        RHPLACE: '',
        RHVILLAGE: '',
        RHPROVIDERNAME: '',
        RHPROVIDERPOSITION: '',
        RHWT: '',
        RHHT: '',
        RHBP: '',
        RHPR: '',
        RHRR: '',
        RHTEMP: '',
        RHPREG: '',
        RHLAB: '',
        RHPAC: '',
        RHGVB: '',
        RHDXOTHER: '',
        RHPROCEDURE: '',
        RHTX: '',
        RHOUTCOME: '',
        RHDEATHREASON: '',
        RHREFTO: '',
        RHREFTOOTHER: '',
        RHINSERT: '',
        RHP: '',
        RHA: '',
        RHHE: '',
        RHAGE: '',
        RHAGEUNIT: '',
        RHTEMPUNIT: '',
        RHCLNID: '',
        RHREFREASON: '',
        RHUSRLOGIN: '',
        RHUPDATE: '',
        RHSTATUS: '',
        RHSYNC: '',
        ID: '',
        RHREMARK: '',
        RHCHEIFCOMPLAIN: ''
    });

    const [RHLabForm, setRHLabForm] = useState({
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

    //////Snack Bar Handle////////////

    ///////////Radio Handle/////////////
    const [preg, setPreg] = useState('')
    function RHPregHandleChange(event) {
        if (event.target.value === preg) {
            setPreg("")
            setRHForm({ ...RHForm, RHPREG: "" })
        } else {
            setPreg(event.target.value)
            setRHForm({ ...RHForm, RHPREG: parseInt(event.target.value) })
        }
    }

    const [tempUnit, setTempUnit] = useState('')
    function RHTempUnitHandleChange(event) {
        if (event.target.value === tempUnit) {
            setTempUnit("")
            setRHForm({ ...RHForm, RHTEMPUNIT: "" })
        } else {
            setTempUnit(event.target.value)
            setRHForm({ ...RHForm, RHTEMPUNIT: parseInt(event.target.value) })
        }
    }

    const [HE, setHE] = useState('')
    function RHHEHandleChange(event) {
        if (event.target.value === HE) {
            setHE("")
            setRHForm({ ...RHForm, RHHE: "" })
        } else {
            setHE(event.target.value)
            setRHForm({ ...RHForm, RHHE: parseInt(event.target.value) })
        }
    }



    ///////LabTest///////////
    const [labTest, setLabTest] = useState(false)
    const labTestHandle = (event) => {
        setLabTest(event.target.checked);
        setRHForm({ ...RHForm, RHLAB: event.target.checked === true ? 1 : 0 })
        setRHLabForm({ ...RHLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
    };

    ///////Investigation///////////
    const [RDT, setRDT] = useState('');
    const RDTHandle = (event) => {
        setRDT(event.target.value);
        setRHLabForm({ ...RHLabForm, LABRDT: event.target.value })
    };
    const [microscopic, setMicroscopic] = useState('');
    const microscopicHandle = (event) => {
        setMicroscopic(event.target.value);
        setRHLabForm({ ...RHLabForm, LABMICROSCOPIC: event.target.value })
    };
    const [blood, setBlood] = useState('')
    const bloodHandle = (event) => {
        setBlood(event.target.value);
        setRHLabForm({ ...RHLabForm, LABBG: event.target.value })
    };
    const [RH, setRH] = useState('')
    const RHHandle = (event) => {
        setRH(event.target.value);
        setRHLabForm({ ...RHLabForm, LABRH: event.target.value })
    };
    const [urineProtein, setUrineProtein] = useState('');
    const urintProteinHandle = (event) => {
        setUrineProtein(event.target.value);
        setRHLabForm({ ...RHLabForm, LABUPROTEIN: event.target.value })
    };
    const [UCG, setUCG] = useState('')
    const UCGHandle = (event) => {
        setUCG(event.target.value);
        setRHLabForm({ ...RHLabForm, LABUCG: event.target.value })
    };

    const [urine, setUrine] = useState('')
    const urineHandle = (event) => {
        setUrine(event.target.value);
        setRHLabForm({ ...RHLabForm, LABUSUGAR: event.target.value })
    };

    const [gonorrhoea, setGonorrhoea] = useState('')
    const gonorrhoeaHandle = (event) => {
        setGonorrhoea(event.target.value);
        setRHLabForm({ ...RHLabForm, LABGONO: event.target.value })
    };
    const [trichomonus, setTrichomonus] = useState('')
    const trichomonusHandle = (event) => {
        setTrichomonus(event.target.value);
        setRHLabForm({ ...RHLabForm, LABTRICHO: event.target.value })
    };
    const [candida, setCandida] = useState('')
    const candidaHandle = (event) => {
        setCandida(event.target.value);
        setRHLabForm({ ...RHLabForm, LABCANDIDA: event.target.value })
    };
    const [RPR, setRPR] = useState('')
    const RPRHandle = (event) => {
        setRPR(event.target.value);
        setRHLabForm({ ...RHLabForm, LABRPR: event.target.value })
    };
    const [TPHA, setTPHA] = useState('')
    const TPHAHandle = (event) => {
        setTPHA(event.target.value);
        setRHLabForm({ ...RHLabForm, LABTPHA: event.target.value })
    };
    const [VDRL, setVDRL] = useState('')
    const VDRLHandle = (event) => {
        setVDRL(event.target.value);
        setRHLabForm({ ...RHLabForm, LABVDRL: event.target.value })
    };
    const [HIV, setHIV] = useState('')
    const HIVHandle = (event) => {
        setHIV(event.target.value);
        setRHLabForm({ ...RHLabForm, LABHIV: event.target.value })
    };
    const [HBV, setHBV] = useState('')
    const HBVHandle = (event) => {
        setHBV(event.target.value);
        setRHLabForm({ ...RHLabForm, LABHBV: event.target.value })
    };
    const [HepC, setHepC] = useState('')
    const HepCHandle = (event) => {
        setHepC(event.target.value);
        setRHLabForm({ ...RHLabForm, LABHCV: event.target.value })
    };
    const [PAC, setPAC] = useState('')
    const PACHandle = (event) => {
        setPAC(event.target.value);
        setRHForm({ ...RHForm, RHPAC: event.target.value })
    };

    /////Patient Outcome//////////
    const [proPosition, setProPosition] = useState('')
    const proPositionHandle = (event) => {
        setProPosition(event.target.value);
        setRHForm({ ...RHForm, RHPROVIDERPOSITION: event.target.value })
    };
    const [proPlace, setProPlace] = useState('')
    const proPlaceHandle = (event) => {
        setProPlace(event.target.value);
        setRHForm({ ...RHForm, RHPLACE: event.target.value })
        setRHLabForm({ ...RHLabForm, LABPLACE: event.target.value })
    };
    const [patientOutcome, setPatientOutcome] = useState('')
    const patientOutcomeHandle = (event) => {
        setPatientOutcome(event.target.value);
        setRHForm({ ...RHForm, RHOUTCOME: event.target.value })
    };
    const [referPlace, setReferPlace] = useState('')
    const referPlaceHandle = (event) => {
        setReferPlace(event.target.value);
        setRHForm({ ...RHForm, RHREFTO: event.target.value })
    };

    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageCode, setVillageCode] = useState('')

    const RHVillageHandleChange = (event) => {
        let tsp = _.find(villageData, ['VILLAGE_CODE', event.target.value]);
        setTspCode(tsp.TSP_CODE)
        setVillageCode(event.target.value)
        setRHLabForm({ ...RHLabForm, LABVILLAGE: event.target.value })
        setRHForm({ ...RHForm, RHVILLAGE: event.target.value, RHTSP: tsp.TSP_CODE })
        console.log("Selected Village => ", event.target.value)
    };
    const RHClinicHandleChange = (event) => {
        setClnCode(event.target.value)
        setRHForm({ ...RHForm, RHCLNID: event.target.value })
        console.log("Selected Clinic => ", event.target.value)
    };

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

               /*  if (h < 10) {
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

                    setRHForm({ ...RHForm, RHPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), RHAGE: h.toString().split('.')[0], RHAGEUNIT: '365' })
                    setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
                    sessionStorage.setItem('rhage', h.toString().split('.')[0])
                    sessionStorage.setItem('rhageunit', '365')
                    sessionStorage.setItem('rhageunitvalue', 'Year')
                } */

                setAgeValid(true)
                    await setAge(h.toString().split('.')[0])
                    await setAgeUnit('365')
                    await setAgeUnitValue('Year')

                    setRHForm({ ...RHForm, RHPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), RHAGE: h.toString().split('.')[0], RHAGEUNIT: '365' })
                    setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setRHForm({ ...RHForm, RHPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), RHAGE: h.toString().split('.')[0], RHAGEUNIT: '30' })
                setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setRHForm({ ...RHForm, RHPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), RHAGE: totalAge, RHAGEUNIT: '1' })
                setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

    /////////////Save btn////////////////
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

    const [error, setError] = useState("")
    const [ageError, setAgeError] = useState("")
    const [success, setSuccess] = useState("")
    const [ageValid, setAgeValid] = useState(false)
    const [successSnack, setSuccessSnack] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [ageSnack, setAgeSnack] = useState(false)

    ///////////////Update Cancle btn/////////////
    const update = async () => {

        console.log("RH Form => ", RHForm)
        console.log("RHLab Form => ", RHLabForm)

        let valid = !providedDate ? "Please Choose Provided Date" :
            !proPosition ? "Please Choose Provider Position" :
                !proPlace ? "Please Choose Provided Place" : 'valid';

    

        if (valid === 'valid' && ageValid) {
            var parity = RHForm.RHP === '' ? 999 : RHForm.RHP
            RHForm.RHP = parity
            var abortion = RHForm.RHA === '' ? 999 : RHForm.RHA
            RHForm.RHA = abortion
            var weight = RHForm.RHWT === '' ? 999.9 : RHForm.RHWT
            RHForm.RHWT = weight
            var height = RHForm.RHHT === '' ? 999.9 : RHForm.RHHT
            RHForm.RHHT = height
            var temp = RHForm.RHTEMP === '' ? 999.9 : RHForm.RHTEMP
            RHForm.RHTEMP = temp
            var tempUnit = RHForm.RHTEMPUNIT === '' ? 999 : RHForm.RHTEMPUNIT
            RHForm.RHTEMPUNIT = tempUnit
            var pulseRate = RHForm.RHPR === '' ? 999 : RHForm.RHPR
            RHForm.RHPR = pulseRate
            var resRate = RHForm.RHRR === '' ? 999 : RHForm.RHRR
            RHForm.RHRR = resRate
            var bp = RHForm.RHBP === '' ? '000/000' : RHForm.RHBP
            RHForm.RHBP = bp
            RHForm.RHUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            RHForm.RHSTATUS = 2
            RHForm.RHSYNC = '0'
    
            var labHB = RHLabForm.LABHB === '' ? 999 : RHLabForm.LABHB
            RHLabForm.LABHB = labHB
            var labRBS = RHLabForm.LABRBS === '' ? 999 : RHLabForm.LABRBS
            RHLabForm.LABRBS = labRBS
            var lab = labTest === false ? 0 : 1;
            RHForm.RHLAB = lab
            RHLabForm.LABTEST = lab
    
            
            RHLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            const rhres = await updateRH({ RHForm, RHLabForm });
            if (rhres.status === 200) {
                sessionStorage.setItem('homeUpdate', 'done')
                setSuccess("Successfully updated a patient's RH Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openRHUpdateSnackbar: true
                });
            }
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

        if (sessionStorage.getItem('editRHPatient') === 'true') {
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
                let labData = lab.data.data.getLabData;

                setPatientOC(service.data.data.getServiceData)

                let rhRegID = serviceData[0].RHREGID
                let rhProvidedDate = moment(serviceData[0].RHPROVIDEDDATE).format("YYYY-MM-DD")
                setProvidedDate(moment(serviceData[0].RHPROVIDEDDATE).format("YYYY-MM-DD"))
                let rhType = serviceData[0].RHTYPE
                let rhDonor = serviceData[0].RHDONOR
                let rhOrg = serviceData[0].RHORG
                let rhProject = serviceData[0].RHPROJECT
                let rhTsp = serviceData[0].RHTSP
                setTspCode(rhTsp)
                let rhPlace = serviceData[0].RHPLACE
                setProPlace(serviceData[0].RHPLACE)
                let rhVillage = serviceData[0].RHVILLAGE
                setVillageCode(rhVillage)
                let rhProviderName = serviceData[0].RHPROVIDERNAME
                let rhProviderPosition = serviceData[0].RHPROVIDERPOSITION
                setProPosition(serviceData[0].RHPROVIDERPOSITION)
                let rhWT = serviceData[0].RHWT === 999.9 ? '' : serviceData[0].RHWT
                let rhHT = serviceData[0].RHHT === 999.9 ? '' : serviceData[0].RHHT
                let rhBP = serviceData[0].RHBP === '000/000' ? '' : serviceData[0].RHBP
                let rhPR = serviceData[0].RHPR === 999 ? '' : serviceData[0].RHPR
                let rhRR = serviceData[0].RHRR === 999 ? '' : serviceData[0].RHRR
                let rhTemp = serviceData[0].RHTEMP === 999.9 ? '' : serviceData[0].RHTEMP
                let rhPreg = serviceData[0].RHPREG === 1 ? '1' : '2'
                setPreg(rhPreg)
                let rhLab = serviceData[0].RHLAB
                let rhPac = serviceData[0].RHPAC === 999 ? '999' : serviceData[0].RHPAC
                setPAC(rhPac)
                let rhGVB = serviceData[0].RHGVB
                let rhDXOther = serviceData[0].RHDXOTHER
                let rhProcedure = serviceData[0].RHPROCEDURE
                let rhTX = serviceData[0].RHTX
                let rhOutcome = serviceData[0].RHOUTCOME === 999 ? '999' : serviceData[0].RHOUTCOME
                setPatientOutcome(rhOutcome)
                let rhDeathReason = serviceData[0].RHDEATHREASON
                let rhRefto = serviceData[0].RHREFTO === 999 ? '999' : serviceData[0].RHREFTO
                setReferPlace(rhRefto)
                let rhReftoOther = serviceData[0].RHREFTOOTHER
                let rhInsert = serviceData[0].RHINSERT
                let rhP = serviceData[0].RHP === 999 ? '' : serviceData[0].RHP
                let rhA = serviceData[0].RHA === 999 ? '' : serviceData[0].RHA
                let rhHE = serviceData[0].RHHE === 2 ? '2' : '1'
                setHE(rhHE)
                let rhAge = serviceData[0].RHAGE
                let rhAgeUnit = serviceData[0].RHAGEUNIT
                let rhTempUnit = serviceData[0].RHTEMPUNIT === 1 ? '1' : '2'
                setTempUnit(rhTempUnit)
                let rhClnID = serviceData[0].RHCLNID
                setClnCode(rhClnID)
                let rhReferReason = serviceData[0].RHREFREASON
                let rhUserLogin = serviceData[0].RHUSRLOGIN
                let rhUpdate = serviceData[0].RHUPDATE
                let rhStatus = serviceData[0].RHSTATUS
                let rhSync = serviceData[0].RHSYNC
                let serviceID = serviceData[0].ID
                let rhRemark = serviceData[0].RHREMARK
                let rhChiefComplain = serviceData[0].RHCHEIFCOMPLAIN

                setRHForm({
                    ...RHForm,
                    RHREGID: rhRegID,
                    RHPROVIDEDDATE: rhProvidedDate,
                    RHTYPE: rhType,
                    RHDONOR: rhDonor,
                    RHORG: rhOrg,
                    RHPROJECT: rhProject,
                    RHTSP: rhTsp,
                    RHPLACE: rhPlace,
                    RHVILLAGE: rhVillage,
                    RHPROVIDERNAME: rhProviderName,
                    RHPROVIDERPOSITION: rhProviderPosition,
                    RHWT: rhWT,
                    RHHT: rhHT,
                    RHBP: rhBP,
                    RHPR: rhPR,
                    RHRR: rhRR,
                    RHTEMP: rhTemp,
                    RHPREG: parseInt(rhPreg),
                    RHLAB: rhLab,
                    RHPAC: rhPac,
                    RHGVB: rhGVB,
                    RHDXOTHER: rhDXOther,
                    RHPROCEDURE: rhProcedure,
                    RHTX: rhTX,
                    RHOUTCOME: rhOutcome,
                    RHDEATHREASON: rhDeathReason,
                    RHREFTO: rhRefto,
                    RHREFTOOTHER: rhReftoOther,
                    RHP: rhP,
                    RHA: rhA,
                    RHHE: parseInt(rhHE),
                    RHAGE: rhAge,
                    RHAGEUNIT: rhAgeUnit,
                    RHTEMPUNIT: parseInt(rhTempUnit),
                    RHCLNID: rhClnID,
                    RHREFREASON: rhReferReason,
                    RHUSRLOGIN: rhUserLogin,
                    RHUPDATE: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                    RHSTATUS: 2,
                    RHSYNC: rhSync,
                    ID: serviceID,
                    RHREMARK: rhRemark,
                    RHCHEIFCOMPLAIN: rhChiefComplain
                });

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
                let labStatus = labData[0].LABSTATUS
                let labSync = labData[0].LABSYNC
                let labID = labData[0].ID
                let labTest = labData[0].LABTEST
                let labOpen = labData[0].LABTEST === 1 ? setLabTest(true) : setLabTest(false)

                setRHLabForm({
                    ...RHLabForm,
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
                RH Information</Typography>
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
                                onChange={RHClinicHandleChange}
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
                                onChange={RHVillageHandleChange}
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
                        {(patientData[0] && patientData[0].REGSEX === 1) ? <Grid item xs={12} sm={12} md={12}>
                            <ThemeProvider theme={radioTheme}>
                                <Card
                                    variant="outlined"
                                    style={{
                                        background: "#fcf0f2",
                                        width: '100%',
                                        borderRadius: '10px'
                                    }}
                                    className={classes.cardStyle}>
                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>History </Typography>
                                    </Grid>}
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                        <CustomTextField
                                            type="number"
                                            variantText="filled"
                                            disabled
                                            inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                            InputLabelProps={{
                                                style: { color: '#482642' },
                                                shrink: true
                                            }}
                                            label={<Grid row container><Typography color="#482642">Parity </Typography>
                                            </Grid>}
                                            style={{ marginTop: '10px' }}
                                            onChange={e => { setRHForm({ ...RHForm, RHP: 999 }) }}
                                            value={RHForm.RHP} />
                                        <CustomTextField
                                            type="number"
                                            variantText="filled"
                                            disabled
                                            inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                            InputLabelProps={{
                                                style: { color: '#482642' },
                                                shrink: true
                                            }}
                                            label={<Grid row container><Typography color="#482642">Abortion </Typography>
                                            </Grid>}
                                            style={{ marginTop: '10px' }}
                                            onChange={e => { setRHForm({ ...RHForm, RHA: 999 }) }}
                                            value={RHForm.RHA} />
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
                                                {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Pregnancy </Typography>
                                                </Grid>}

                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gender1"
                                                    style={{
                                                        display: "flex",
                                                        width: "100%",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-around"
                                                    }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHPREG: e.target.value }) }}
                                                    value={preg}
                                                    row={true}
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        labelPlacement="left"
                                                        disabled
                                                        label="Yes"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                    />
                                                    <FormControlLabel
                                                        value="2"
                                                        labelPlacement="left"
                                                        disabled
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                        label="No"
                                                    />
                                                </RadioGroup>
                                            </Card>
                                        </ThemeProvider>
                                    </div>


                                </Card>
                            </ThemeProvider>
                        </Grid> :
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
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>History </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Parity </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { (e.target.value.length > 2) ? setRHForm({ ...RHForm, RHP: (e.target.value).slice(0, 2) }) : setRHForm({ ...RHForm, RHP: e.target.value }) }}
                                                value={RHForm.RHP} />
                                            <CustomTextField
                                                type="number"
                                                variantText="filled"
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Abortion </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { (e.target.value.length > 2) ? setRHForm({ ...RHForm, RHA: (e.target.value).slice(0, 2) }) : setRHForm({ ...RHForm, RHA: e.target.value }) }}
                                                value={RHForm.RHA} />
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
                                                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Pregnancy </Typography>
                                                    </Grid>}

                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="gender1"
                                                        style={{
                                                            display: "flex",
                                                            width: "100%",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-around"
                                                        }}
                                                        onChange={e => { setRHForm({ ...RHForm, RHPREG: e.target.value }) }}
                                                        value={preg}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Yes"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                </Card>
                                            </ThemeProvider>
                                        </div>


                                    </Card>
                                </ThemeProvider>
                            </Grid>}


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
                                        onChange={e => { (e.target.value.length > 5) ? setRHForm({ ...RHForm, RHWT: (e.target.value).slice(0, 5) }) : setRHForm({ ...RHForm, RHWT: e.target.value }) }}
                                        value={RHForm.RHWT} />
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
                                        onChange={e => { (e.target.value.length > 5) ? setRHForm({ ...RHForm, RHHT: (e.target.value).slice(0, 5) }) : setRHForm({ ...RHForm, RHHT: e.target.value }) }}
                                        value={RHForm.RHHT} />
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
                                        onChange={e => { (e.target.value.length > 5) ? setRHForm({ ...RHForm, RHTEMP: (e.target.value).slice(0, 5) }) : setRHForm({ ...RHForm, RHTEMP: e.target.value }) }}
                                        value={RHForm.RHTEMP} />

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
                                                aria-label="tempUnit"
                                                name="tempUnit1"
                                                style={{
                                                    display: "flex",

                                                    flexDirection: 'row',
                                                    justifyContent: "space-around"
                                                }}
                                                onChange={e => { setRHForm({ ...RHForm, RHTEMPUNIT: e.target.value }) }}
                                                value={tempUnit}
                                                row={true}
                                            >
                                                <FormControlLabel
                                                    value="1"
                                                    labelPlacement="left"
                                                    label="°F"
                                                    style={{ height: "30px" }}
                                                    className={classes.fontSize}
                                                    control={<Radio size="small" color="primary"
                                                        onClick={RHTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && RHTempUnitHandleChange(e)} />}
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    labelPlacement="left"
                                                    style={{ height: "30px" }}
                                                    className={classes.fontSize}
                                                    control={<Radio size="small" color="primary"
                                                        onClick={RHTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && RHTempUnitHandleChange(e)} />}
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
                                        onChange={e => { setRHForm({ ...RHForm, RHPR: e.target.value }) }}
                                        value={RHForm.RHPR} />
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
                                        onChange={e => { setRHForm({ ...RHForm, RHRR: e.target.value }) }}
                                        value={RHForm.RHRR} />

                                    <CustomTextField
                                        id="filled-basic"
                                        label="BP(mmHg)"
                                        variantText="filled"
                                        style={{ marginTop: '10px', width: '10%' }}
                                        onChange={e => { setRHForm({ ...RHForm, RHBP: e.target.value }) }}
                                        value={RHForm.RHBP}
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
                                                onChange={e => { setRHLabForm({ ...RHLabForm, LABHB: e.target.value }) }}
                                                value={RHLabForm.LABHB} />
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
                                                onChange={e => { setRHLabForm({ ...RHLabForm, LABOTHER: e.target.value }) }}
                                                value={RHLabForm.LABOTHER}
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
                                                onChange={e => { setRHLabForm({ ...RHLabForm, LABRBS: e.target.value }) }}
                                                value={RHLabForm.LABRBS} />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </ThemeProvider>}

                        <Grid item xs={12} sm={4} md={4}>
                            <CustomTextField
                                id="filled-basic"
                                label="Chief Complaint"
                                variantText="filled"
                                style={{ marginTop: '30px' }}
                                onChange={e => { setRHForm({ ...RHForm, RHCHEIFCOMPLAIN: e.target.value }) }}
                                value={RHForm.RHCHEIFCOMPLAIN}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <ThemeProvider theme={radioTheme}>

                                <Card
                                    variant="outlined"
                                    style={{
                                        background: "#fcf0f2",
                                        borderRadius: '10px',
                                        paddingBottom: '10px',
                                    }}
                                    className={classes.cardStyle}>
                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Diagnosis </Typography>
                                    </Grid>}
                                    <Grid Grid item xs={12} sm={12} md={12}>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormControl variant="filled" className={classes.formControl} style={{ width: '95%', marginRight: '10px' }}>
                                                    <InputLabel id="demo-simple-select-filled-label">PAC Related</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left",
                                                            },
                                                            style: {
                                                                maxHeight: 300,
                                                            },
                                                            getContentAnchorEl: null
                                                        }}
                                                        value={PAC}
                                                        onChange={PACHandle}>
                                                        <MenuItem value={999}>-</MenuItem>
                                                        <MenuItem value={1}>Complete</MenuItem>
                                                        <MenuItem value={2}>Incomplete</MenuItem>
                                                        <MenuItem value={3}>Threaten</MenuItem>
                                                        <MenuItem value={4}>Missed</MenuItem>
                                                        <MenuItem value={5}>Inevitable</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={6} >
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Other Diagnosis"
                                                    variantText="filled"
                                                    style={{ marginTop: '10px', width: '90%', marginRight: '10px' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHDXOTHER: e.target.value }) }}
                                                    value={RHForm.RHDXOTHER}
                                                />
                                            </Grid>
                                        </div>
                                    </Grid>



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
                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Procedure-Treatment-HE </Typography>
                                    </Grid>}
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                        <CustomTextField
                                            id="filled-basic"
                                            label="Procedure"
                                            variantText="filled"
                                            style={{ marginTop: '10px', width: '35%' }}
                                            onChange={e => { setRHForm({ ...RHForm, RHPROCEDURE: e.target.value }) }}
                                            value={RHForm.RHPROCEDURE}
                                        />
                                        <CustomTextField
                                            id="filled-basic"
                                            label="Treatment"
                                            variantText="filled"
                                            style={{ marginTop: '10px', width: '35%' }}
                                            onChange={e => { setRHForm({ ...RHForm, RHTX: e.target.value }) }}
                                            value={RHForm.RHTX}
                                        />
                                        <FormControl style={{ width: '30%' }}>
                                            <Card
                                                variant="outlined"
                                                style={{
                                                    marginTop: '10px',
                                                    marginRight: '10px',
                                                    background: "#fcf0f2"
                                                }}
                                            >
                                                {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Health Education </Typography>
                                                </Grid>}

                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gender1"
                                                    style={{
                                                        display: "flex",

                                                        flexDirection: 'row',
                                                        justifyContent: "space-around"
                                                    }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHHE: e.target.value }) }}
                                                    value={RHForm.RHHE}
                                                    row={true}
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        labelPlacement="left"
                                                        label="Yes"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={RHHEHandleChange} onKeyDown={e => e.key === 'Enter' && RHHEHandleChange(e)} />}
                                                    />
                                                    <FormControlLabel
                                                        value="2"
                                                        labelPlacement="left"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={RHHEHandleChange} onKeyDown={e => e.key === 'Enter' && RHHEHandleChange(e)} />}
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
                                                onChange={e => { setRHForm({ ...RHForm, RHREFREASON: e.target.value }) }}
                                                value={RHForm.RHREFREASON}
                                            />
                                        </Grid></>}
                                    {patientOutcome === 4 && <>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Reasons of Death"
                                                variantText="filled"
                                                style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                onChange={e => { setRHForm({ ...RHForm, RHDEATHREASON: e.target.value }) }}
                                                value={RHForm.RHDEATHREASON}
                                            />
                                        </Grid></>}
                                    {patientOutcome === 3 && referPlace === 5 && <>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Other Referral"
                                                variantText="filled"
                                                style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                onChange={e => { setRHForm({ ...RHForm, RHREFTOOTHER: e.target.value }) }}
                                                value={RHForm.RHREFTOOTHER}
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
                                                onChange={e => { setRHForm({ ...RHForm, RHPROVIDERNAME: e.target.value }) }}
                                                value={RHForm.RHPROVIDERNAME}
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
                                onChange={e => { setRHForm({ ...RHForm, RHREMARK: e.target.value }) }}
                                value={RHForm.RHREMARK}
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
            </div >

        </>);
}
