import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from "@material-ui/icons/Search";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Card } from "@mui/material";
import { Button, OutlinedInput, Snackbar, SnackbarContent, Switch, TextField, Typography, List, ListItem, Chip } from "@material-ui/core";

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
import { insertGM, updateGM } from "../../modals/gminfo";
import { insertLab } from "../../modals/labinfo";
import { getMaxID } from "../../modals/maxid";
import { getDiagnosis, getIMCI } from "../../modals/diagnosis"
import * as serviceLab from '../../modals/service_labdatabyid'
import * as serviceData from '../../modals/rhservicedatabyid'
import * as labData from '../../modals/rhlabdatabyid'
import * as clinic from "../../modals/clinicbyorgproj"
import * as village from "../../modals/villagebyorgproj"

import CustomRHTable from '../../components/controls/CustomRHTable';
import Modals from "../../components/modal";

/////////////////////Styles for Diagnosis///////////////////////
const ddStyles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
        height: '50px',
        color: '#fff',
        textAlign: 'center',
        background: '#6c5268'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0),
        backgroundColor: '#6c5268',
        color: '#fff',

    },
});

const DialogTitle = withStyles(ddStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}  {...other}>
            <Typography variant="h6" >{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(0),
        alignSelf: 'center'
    },
}))(MuiDialogContent);

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

export default function GMServiceEditForm(props) {

    const classes = useStyles();

    const history = useHistory();

    //////////Diagnosis Data///////////////
    const [diagnosisDialog, setDiagnosisDialog] = useState(false)
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [chipData, setChipData] = useState([])
    const [selectedPatient, setSelectedPatient] = useState([])
    const [diagnosisData, setDiagnosisData] = useState([])
    const [imciData, setImciData] = useState([])
    const [chipAlert, setChipAlert] = useState(false)

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const newFilter = GMDxSts === '1' ? diagnosisData.filter((value) => {
            return (value.DIAGNOSIS.toLowerCase()).includes(searchWord.toLowerCase());
        }) : imciData.filter((value) => {
            return (value.DIAGNOSIS.toLowerCase()).includes(searchWord.toLowerCase());
        })

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        setSelectedPatient([])

    };

    const clearInput = () => {
        setSelectedPatient([])
        setFilteredData([]);
        setWordEntered("");
    };

    const patientClickHandle = async (e) => {
        //console.log(e.target.outerText)
        const id = e.target.outerText
        const cList = chipData
        cList.push(id)
        console.log("chipData => ", cList)
        if (chipData.length <= 3) {
            setChipData(cList)
        }
        else { setChipAlert(true) }
        console.log("Index of { =>", id.indexOf("{"))
        console.log("Index of } =>", id.indexOf("}"))
        //setSelectedPatientID(id)
        //setWordEntered(id)
        setFilteredData([])
    }


    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };


    const diagnosisDialogAndChip = () => {
        return (
            <div>

                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#ffff',
                        color: '#53344d',
                        width: '110%',
                        height: '50%'
                    }
                }} onClose={setDiagnosisDialogCloseControl} open={setDiagnosisDialogOpenControl}>
                    <DialogTitle onClose={setDiagnosisDialogCloseControl}>
                        Please Choose At Most 3 Diagnosis
                    </DialogTitle>
                    <DialogContent style={{
                        width: '100%',
                        height: '100%'
                    }}>
                        <Grid container spacing={0} style={{ paddingLeft: '1%', paddingRight: '1%' }}>
                            <Grid item xs={12}>
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <input
                                        style={{ width: '100%', height: '40px' }}
                                        type="text"
                                        placeholder='Search Diagnosis...'
                                        value={wordEntered}
                                        onChange={handleFilter}
                                    />
                                    {filteredData.length === 0 ? (
                                        <SearchIcon style={{ placeSelf: 'center' }} />
                                    ) : (
                                        <CloseIcon style={{ placeSelf: 'center', alignSelf: 'center' }} id="clearBtn" onClick={clearInput} />
                                    )}
                                </div>
                            </Grid>

                            {filteredData.length != 0 && (
                                <div className="dataResultDiagnosis">
                                    {filteredData.slice(0, 15).map((value, key) => {
                                        return (
                                            <List >
                                                <ListItem button onClick={patientClickHandle} >{value.DIAGNOSIS + " " + " {~" + value.DXCODE + "~}"} </ListItem>
                                            </List>
                                        );
                                    })}
                                </div>
                            )}
                        </Grid>
                        {chipData.length != 0 && chipData.map((data) => {
                            return (
                                <div style={{ textAlign: 'center', alignSelf: 'center' }}>
                                    <Chip
                                        style={{ alignSelf: 'center', margin: '10px', color: '#482642', background: '#e2dbe0', maxWidth: '90%' }}
                                        /* label={data.substr(0, data.indexOf("{"))} */
                                        label={data.includes('{~') && data.includes('~}') ? data.substr(0, data.indexOf("{")) : data}
                                        onDelete={handleDelete(data)}
                                    />
                                </div>
                            );
                        })}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    const setDiagnosisDialogOpenControl = () => {
        setDiagnosisDialog(true)
    }

    const setDiagnosisDialogCloseControl = () => {
        setDiagnosisDialog(false)
    }

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [serviceTypeData, setServiceTypeData] = useState('')
    const [clinicData, setClinicData] = useState([])
    const [villageData, setVillageData] = useState([])

    const [GMForm, setGMForm] = useState({
        GMREGID: '',
        GMAGE: '',
        GMPROVIDEDDATE: '',
        GMTYPE: '',
        GMDONOR: '',
        GMORG: '',
        GMPROJECT: '',
        GMTSP: '',
        GMPLACE: '',
        GMVILLAGE: '',
        GMPROVIDERNAME: '',
        GMPROVIDERPOSITION: '',
        GMUSRLOGIN: '',
        GMWT: '',
        GMHT: '',
        GMBP: '',
        GMPR: '',
        GMRR: '',
        GMTEMP: '',
        GMP: '',
        GMA: '',
        GMHE: '',
        GMGMTYPE: '',
        GMPREG: '',
        GMLAB: '',
        GMOTHERDX: '',
        GMDX1: '',
        GMDX2: '',
        GMDX3: '',
        GMCOMPLAINT: '',
        GMPROCEDURE: '',
        GMTX: '',
        GMOUTCOME: '',
        GMREFTO: '',
        GMREFTOOTHER: '',
        GMREFREASON: '',
        GMDEATHREASON: '',
        GMAGEUNIT: '',
        GMTEMPUNIT: '',
        GMCLNID: '',
        GMUPDATE: '',
        GMSTATUS: '',
        GMSYNC: '',
        ID: '',
        GMREMARK: '',
        GMMUAC: '',
        GMDXSTATUS: ''
    });

    const [GMLabForm, setGMLabForm] = useState({
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

    //////Diagnosis Handle////////////
    const [GMDxSts, setGMDxSts] = useState('1')
    const GMDxStsHandle = (event) => {
        setGMDxSts(event.target.value);
        setGMForm({ ...GMForm, GMDXSTATUS: event.target.value })
    };

    ///////////Radio Handle/////////////
    function GMPregHandleChange(event) {
        if (event.target.value === GMForm.GMPREG) {
            setGMForm({ ...GMForm, GMPREG: "" })
        } else {
            setGMForm({ ...GMForm, GMPREG: event.target.value })
        }
    }

    function GMTempUnitHandleChange(event) {
        if (event.target.value === GMForm.GMTEMPUNIT) {
            setGMForm({ ...GMForm, GMTEMPUNIT: "" })
        } else {
            setGMForm({ ...GMForm, GMTEMPUNIT: event.target.value })
        }
    }

    function GMHEHandleChange(event) {
        if (event.target.value === GMForm.GMHE) {
            setGMForm({ ...GMForm, GMHE: "" })
        } else {
            setGMForm({ ...GMForm, GMHE: event.target.value })
        }
    }

    ///////LabTest///////////
    const [labTest, setLabTest] = useState(false)
    const labTestHandle = (event) => {
        setLabTest(event.target.checked);
        setGMForm({ ...GMForm, GMLAB: event.target.checked === true ? 1 : 0 })
        setGMLabForm({ ...GMLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
    };

    ///////Investigation///////////
    const [RDT, setRDT] = useState('999');
    const RDTHandle = (event) => {
        setRDT(event.target.value);
        setGMLabForm({ ...GMLabForm, LABRDT: event.target.value })
    };
    const [microscopic, setMicroscopic] = useState('999');
    const microscopicHandle = (event) => {
        setMicroscopic(event.target.value);
        setGMLabForm({ ...GMLabForm, LABMICROSCOPIC: event.target.value })
    };
    const [blood, setBlood] = useState('999')
    const bloodHandle = (event) => {
        setBlood(event.target.value);
        setGMLabForm({ ...GMLabForm, LABBG: event.target.value })
    };
    const [RH, setRH] = useState('999')
    const RHHandle = (event) => {
        setRH(event.target.value);
        setGMLabForm({ ...GMLabForm, LABRH: event.target.value })
    };
    const [urineProtein, setUrineProtein] = useState('999');
    const urintProteinHandle = (event) => {
        setUrineProtein(event.target.value);
        setGMLabForm({ ...GMLabForm, LABUPROTEIN: event.target.value })
    };
    const [UCG, setUCG] = useState('999')
    const UCGHandle = (event) => {
        setUCG(event.target.value);
        setGMLabForm({ ...GMLabForm, LABUCG: event.target.value })
    };

    const [urine, setUrine] = useState('999')
    const urineHandle = (event) => {
        setUrine(event.target.value);
        setGMLabForm({ ...GMLabForm, LABUSUGAR: event.target.value })
    };

    const [gonorrhoea, setGonorrhoea] = useState('999')
    const gonorrhoeaHandle = (event) => {
        setGonorrhoea(event.target.value);
        setGMLabForm({ ...GMLabForm, LABGONO: event.target.value })
    };
    const [trichomonus, setTrichomonus] = useState('999')
    const trichomonusHandle = (event) => {
        setTrichomonus(event.target.value);
        setGMLabForm({ ...GMLabForm, LABTRICHO: event.target.value })
    };
    const [candida, setCandida] = useState('999')
    const candidaHandle = (event) => {
        setCandida(event.target.value);
        setGMLabForm({ ...GMLabForm, LABCANDIDA: event.target.value })
    };
    const [RPR, setRPR] = useState('999')
    const RPRHandle = (event) => {
        setRPR(event.target.value);
        setGMLabForm({ ...GMLabForm, LABRPR: event.target.value })
    };
    const [TPHA, setTPHA] = useState('999')
    const TPHAHandle = (event) => {
        setTPHA(event.target.value);
        setGMLabForm({ ...GMLabForm, LABTPHA: event.target.value })
    };
    const [VDRL, setVDRL] = useState('999')
    const VDRLHandle = (event) => {
        setVDRL(event.target.value);
        setGMLabForm({ ...GMLabForm, LABVDRL: event.target.value })
    };
    const [HIV, setHIV] = useState('999')
    const HIVHandle = (event) => {
        setHIV(event.target.value);
        setGMLabForm({ ...GMLabForm, LABHIV: event.target.value })
    };
    const [HBV, setHBV] = useState('999')
    const HBVHandle = (event) => {
        setHBV(event.target.value);
        setGMLabForm({ ...GMLabForm, LABHBV: event.target.value })
    };
    const [HepC, setHepC] = useState('999')
    const HepCHandle = (event) => {
        setHepC(event.target.value);
        setGMLabForm({ ...GMLabForm, LABHCV: event.target.value })
    };

    /////Patient Outcome//////////
    const [proPosition, setProPosition] = useState('')
    const proPositionHandle = (event) => {
        setProPosition(event.target.value);
        setGMForm({ ...GMForm, GMPROVIDERPOSITION: event.target.value })
    };
    const [proPlace, setProPlace] = useState('')
    const proPlaceHandle = (event) => {
        setProPlace(event.target.value);
        setGMForm({ ...GMForm, GMPLACE: event.target.value })
        setGMLabForm({ ...GMLabForm, LABPLACE: event.target.value })
    };
    const [patientOutcome, setPatientOutcome] = useState('999')
    const patientOutcomeHandle = (event) => {
        setPatientOutcome(event.target.value);
        setGMForm({ ...GMForm, GMOUTCOME: event.target.value })
    };
    const [referPlace, setReferPlace] = useState('999')
    const referPlaceHandle = (event) => {
        setReferPlace(event.target.value);
        setGMForm({ ...GMForm, GMREFTO: event.target.value })
    };

    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageCode, setVillageCode] = useState('')
    const GMVillageHandleChange = (event) => {
        let tsp = _.find(villageData, ['VILLAGE_CODE', event.target.value]);
        setTspCode(tsp.TSP_CODE)
        setVillageCode(event.target.value)
        setGMLabForm({ ...GMLabForm, LABVILLAGE: event.target.value })
        setGMForm({ ...GMForm, GMVILLAGE: event.target.value, GMTSP: tsp.TSP_CODE })
        console.log("Selected Village => ", event.target.value)
    };
    const GMClinicHandleChange = (event) => {
        setClnCode(event.target.value)
        setGMForm({ ...GMForm, GMCLNID: event.target.value })
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

                    setGMForm({ ...GMForm, GMPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), GMAGE: h.toString().split('.')[0], GMAGEUNIT: '365' })
                    setGMLabForm({ ...GMLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
                    sessionStorage.setItem('rhage', h.toString().split('.')[0])
                    sessionStorage.setItem('rhageunit', '365')
                    sessionStorage.setItem('rhageunitvalue', 'Year')
                } */

                setAgeValid(true)
                    await setAge(h.toString().split('.')[0])
                    await setAgeUnit('365')
                    await setAgeUnitValue('Year')

                    setGMForm({ ...GMForm, GMPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), GMAGE: h.toString().split('.')[0], GMAGEUNIT: '365' })
                    setGMLabForm({ ...GMLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setGMForm({ ...GMForm, GMPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), GMAGE: h.toString().split('.')[0], GMAGEUNIT: '30' })
                setGMLabForm({ ...GMLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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

                setGMForm({ ...GMForm, GMPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), GMAGE: totalAge, RHAGEUNIT: '1' })
                setGMLabForm({ ...GMLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD'), })
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
    const setChipAlertOpen = () => {
        setChipAlert(true)
    }

    const setChipAlertClose = () => {
        setChipAlert(false)
    }
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
        let valid = !providedDate ? "Please Choose Provided Date" :
            !proPosition ? "Please Choose Provider Position" :
                !proPlace ? "Please Choose Provided Place" :
                    chipData.length > 3 ? "You can choose at most 3 Diagnosis" :
                        'valid';


        if (valid === 'valid') {
            var parity = GMForm.GMP === '' ? 999 : GMForm.GMP
        GMForm.GMP = parity
        var abortion = GMForm.GMA === '' ? 999 : GMForm.GMA
        GMForm.GMA = abortion
        var weight = GMForm.GMWT === '' ? 999.9 : GMForm.GMWT
        GMForm.GMWT = weight
        var height = GMForm.GMHT === '' ? 999.9 : GMForm.GMHT
        GMForm.GMHT = height
        var temp = GMForm.GMTEMP === '' ? 999.9 : GMForm.GMTEMP
        GMForm.GMTEMP = temp
        var tempUnit = GMForm.GMTEMPUNIT === '' ? 999 : GMForm.GMTEMPUNIT
        GMForm.GMTEMPUNIT = tempUnit
        var pulseRate = GMForm.GMPR === '' ? 999 : GMForm.GMPR
        GMForm.GMPR = pulseRate
        var resRate = GMForm.GMRR === '' ? 999 : GMForm.GMRR
        GMForm.GMRR = resRate
        var bp = GMForm.GMBP === '' ? '000/000' : GMForm.GMBP
        GMForm.GMBP = bp
        var muac = GMForm.GMMUAC === '' ? 999.9 : GMForm.GMMUAC
        GMForm.GMMUAC = muac

        console.log("Chip Data in Update Event => ", chipData)

        if (GMForm.GMDXSTATUS === '1') {
            if (chipData.length === 1) {
                GMForm.GMDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
                    (diagnosisData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
                GMForm.GMDX2 = 999
                GMForm.GMDX3 = 999
            }
            else if (chipData.length === 2) {
                GMForm.GMDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
                    (diagnosisData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
                GMForm.GMDX2 = chipData[1].includes('{~') ? chipData[1].substring(chipData[1].indexOf("{~") + 2, chipData[1].indexOf("~}")) :
                    (diagnosisData.find((diag) => diag.DIAGNOSIS === chipData[1])).DXCODE;
                GMForm.GMDX3 = 999
            }
            else if (chipData.length === 3) {
                GMForm.GMDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
                    (diagnosisData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
                GMForm.GMDX2 = chipData[1].includes('{~') ? chipData[1].substring(chipData[1].indexOf("{~") + 2, chipData[1].indexOf("~}")) :
                    (diagnosisData.find((diag) => diag.DIAGNOSIS === chipData[1])).DXCODE;
                GMForm.GMDX3 = chipData[2].includes('{~') ? chipData[2].substring(chipData[2].indexOf("{~") + 2, chipData[2].indexOf("~}")) :
                    (diagnosisData.find((diag) => diag.DIAGNOSIS === chipData[2])).DXCODE;
            }
            else {
                GMForm.GMDX1 = 999
                GMForm.GMDX2 = 999
                GMForm.GMDX3 = 999
            }
        }
        else {
            if (chipData.length === 1) {
                GMForm.GMDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
                    (imciData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
                GMForm.GMDX2 = 999
                GMForm.GMDX3 = 999
            }
            else if (chipData.length === 2) {
                GMForm.GMDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
                    (imciData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
                GMForm.GMDX2 = chipData[1].includes('{~') ? chipData[1].substring(chipData[1].indexOf("{~") + 2, chipData[1].indexOf("~}")) :
                    (imciData.find((diag) => diag.DIAGNOSIS === chipData[1])).DXCODE;
                GMForm.GMDX3 = 999
            }
            else if (chipData.length === 3) {
                GMForm.GMDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
                    (imciData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
                GMForm.GMDX2 = chipData[1].includes('{~') ? chipData[1].substring(chipData[1].indexOf("{~") + 2, chipData[1].indexOf("~}")) :
                    (imciData.find((diag) => diag.DIAGNOSIS === chipData[1])).DXCODE;
                GMForm.GMDX3 = chipData[2].includes('{~') ? chipData[2].substring(chipData[2].indexOf("{~") + 2, chipData[2].indexOf("~}")) :
                    (imciData.find((diag) => diag.DIAGNOSIS === chipData[2])).DXCODE;
            }
            else {
                GMForm.GMDX1 = 999
                GMForm.GMDX2 = 999
                GMForm.GMDX3 = 999
            }
        }

        //Testing for OPD,Surgery (gmgmtype,labsource)
        if (sessionStorage.getItem('gmgmtype') === '3') {
            GMForm.GMGMTYPE = '3'
            GMLabForm.LABSSOURCE = 'medopd'
        }
        else if (sessionStorage.getItem('gmgmtype') === '2') {
            GMForm.GMGMTYPE = '2'
            GMLabForm.LABSSOURCE = 'surgopd'
        }
        else {
            GMForm.GMGMTYPE = '1'
            GMLabForm.LABSSOURCE = 'gm'
        }


        var labHB = GMLabForm.LABHB === '' ? 999 : GMLabForm.LABHB
        GMLabForm.LABHB = labHB
        var labRBS = GMLabForm.LABRBS === '' ? 999 : GMLabForm.LABRBS
        GMLabForm.LABRBS = labRBS

        var lab = labTest === false ? 0 : 1;
        GMForm.GMLAB = lab
        GMLabForm.LABTEST = lab

        GMForm.GMUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        GMLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

            const rhres = await updateGM({ GMForm, GMLabForm });
            if (rhres?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully updated a patient's GM Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openGMUpdateSnackbar: true
                });
            }
            console.log('GM Form =>', GMForm)
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

        if (sessionStorage.getItem('editGMPatient') === 'true') {

            setAgeValid(true)
            setLoading(true)

            let service = await serviceData.getServiceData()
            let lab = await labData.getLabData()
            let cData = await clinic.getClinicByOrgProj()
            let vData = await village.getVillageByOrgProj()
            let pData = await serviceLab.getPatient()
            let diagnosis = await getDiagnosis()
            let imci = await getIMCI()

            if (cData && vData) {
                setClinicData(cData.data.data.getClinicByOrgProj)
                setVillageData(vData.data.data.getVillageByOrgProj)
            }

            if (pData) {
                setPatientData(pData.data.data.getPatient)
            }

            if (service && lab && diagnosis && imci) {
                let serviceData = service.data.data.getServiceData;

                await setDiagnosisData(diagnosis.data.data.getDiagnosis)
                await setImciData(imci.data.data.getIMCI)

                let dData = diagnosis.data.data.getDiagnosis
                let iData = imci.data.data.getIMCI

                GMForm.GMREGID = serviceData[0].GMREGID
                GMForm.GMAGE = serviceData[0].GMAGE
                GMForm.GMPROVIDEDDATE = moment(serviceData[0].GMPROVIDEDDATE).format("YYYY-MM-DD")
                setProvidedDate(moment(serviceData[0].GMPROVIDEDDATE).format("YYYY-MM-DD"))
                GMForm.GMTYPE = serviceData[0].GMTYPE
                GMForm.GMDONOR = serviceData[0].GMDONOR
                GMForm.GMORG = serviceData[0].GMORG
                GMForm.GMPROJECT = serviceData[0].GMPROJECT
                GMForm.GMTSP = serviceData[0].GMTSP
                setTspCode(serviceData[0].GMTSP)
                GMForm.GMPLACE = serviceData[0].GMPLACE
                setProPlace(serviceData[0].GMPLACE)
                GMForm.GMVILLAGE = serviceData[0].GMVILLAGE
                setVillageCode(serviceData[0].GMVILLAGE)
                GMForm.GMPROVIDERNAME = serviceData[0].GMPROVIDERNAME
                GMForm.GMPROVIDERPOSITION = serviceData[0].GMPROVIDERPOSITION
                setProPosition(serviceData[0].GMPROVIDERPOSITION)
                GMForm.GMUSRLOGIN = serviceData[0].GMUSRLOGIN
                GMForm.GMWT = serviceData[0].GMWT === 999.9 ? '' : serviceData[0].GMWT
                GMForm.GMHT = serviceData[0].GMHT === 999.9 ? '' : serviceData[0].GMHT
                GMForm.GMBP = serviceData[0].GMBP === '000/000' ? '' : serviceData[0].GMBP
                GMForm.GMPR = serviceData[0].GMPR === 999 ? '' : serviceData[0].GMPR
                GMForm.GMRR = serviceData[0].GMRR === 999 ? '' : serviceData[0].GMRR
                GMForm.GMTEMP = serviceData[0].GMTEMP === 999.9 ? '' : serviceData[0].GMTEMP
                GMForm.GMP = serviceData[0].GMP === 999 ? '' : serviceData[0].GMP
                GMForm.GMA = serviceData[0].GMA === 999 ? '' : serviceData[0].GMA
                GMForm.GMHE = serviceData[0].GMHE === 999 ? '' : serviceData[0].GMHE === 1 ? '1' : '2'
                GMForm.GMGMTYPE = serviceData[0].GMGMTYPE
                GMForm.GMPREG = serviceData[0].GMPREG === 999 ? '' : serviceData[0].GMPREG === 1 ? '1' : '2'
                GMForm.GMLAB = serviceData[0].GMLAB
                GMForm.GMOTHERDX = serviceData[0].GMOTHERDX
                GMForm.GMCOMPLAINT = serviceData[0].GMCOMPLAINT
                GMForm.GMPROCEDURE = serviceData[0].GMPROCEDURE
                GMForm.GMTX = serviceData[0].GMTX
                GMForm.GMOUTCOME = serviceData[0].GMOUTCOME === 999 ? '' : serviceData[0].GMOUTCOME
                setPatientOutcome(serviceData[0].GMOUTCOME === 999 ? '' : serviceData[0].GMOUTCOME)
                GMForm.GMREFTO = serviceData[0].GMREFTO === 999 ? '' : serviceData[0].GMREFTO
                setReferPlace(serviceData[0].GMREFTO === 999 ? '' : serviceData[0].GMREFTO)
                GMForm.GMREFTOOTHER = serviceData[0].GMREFTOOTHER
                GMForm.GMREFREASON = serviceData[0].GMREFREASON
                GMForm.GMDEATHREASON = serviceData[0].GMDEATHREASON
                GMForm.GMAGEUNIT = serviceData[0].GMAGEUNIT
                GMForm.GMTEMPUNIT = serviceData[0].GMTEMPUNIT === 999 ? '' : serviceData[0].GMTEMPUNIT === 1 ? '1' : '2'
                GMForm.GMCLNID = serviceData[0].GMCLNID
                setClnCode(serviceData[0].GMCLNID)
                GMForm.GMUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
                GMForm.GMSTATUS = '2'
                GMForm.GMSYNC = '0'
                GMForm.ID = serviceData[0].ID
                GMForm.GMREMARK = serviceData[0].GMREMARK
                GMForm.GMMUAC = serviceData[0].GMMUAC === 999.9 ? '' : serviceData[0].GMMUAC
                GMForm.GMDXSTATUS = serviceData[0].GMDXSTATUS === 1 ? '1' : '2'
                setGMDxSts(serviceData[0].GMDXSTATUS === 1 ? '1' : '2')

                let dxList = []

                let dx1 = ''
                let dx2 = ''
                let dx3 = ''
                if (serviceData[0].GMDXSTATUS === 1) {
                    if (serviceData[0].GMDX1 != 999) {
                        dx1 = await (dData.find((diag) => diag.DXCODE === serviceData[0].GMDX1)).DIAGNOSIS
                        dxList.push(dx1)
                    }
                    if (serviceData[0].GMDX2 != 999) {
                        dx2 = await (dData.find((diag) => diag.DXCODE === serviceData[0].GMDX2)).DIAGNOSIS
                        dxList.push(dx2)
                    }
                    if (serviceData[0].GMDX3 != 999) {
                        dx3 = await (dData.find((diag) => diag.DXCODE === serviceData[0].GMDX3)).DIAGNOSIS
                        dxList.push(dx3)
                    }
                }
                else {
                    if (serviceData[0].GMDX1 != 999) {
                        dx1 = await (iData.find((diag) => diag.DXCODE === serviceData[0].GMDX1)).DIAGNOSIS
                        dxList.push(dx1)
                    }
                    if (serviceData[0].GMDX2 != 999) {
                        dx2 = await (iData.find((diag) => diag.DXCODE === serviceData[0].GMDX2)).DIAGNOSIS
                        dxList.push(dx2)
                    }
                    if (serviceData[0].GMDX3 != 999) {
                        dx3 = await (iData.find((diag) => diag.DXCODE === serviceData[0].GMDX3)).DIAGNOSIS
                        dxList.push(dx3)
                    }
                }

                setChipData(dxList)
                console.log("Chip list in useEffect ====> ", dxList)
                GMForm.GMDX1 = serviceData[0].GMDX1
                GMForm.GMDX2 = serviceData[0].GMDX2
                GMForm.GMDX3 = serviceData[0].GMDX3


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

                setGMLabForm({
                    ...GMLabForm,
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
            {chipData.length > 3 && <CustomSnackBar alertMsg={"You can choose at most 3 diagnosis!"} type="success" />}
            {(sessionStorage.getItem('gmgmtype') === '3' && sessionStorage.getItem('org') === 'CPI-16') ?
                <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                    OPD Medical Service</Typography> :
                (sessionStorage.getItem('gmgmtype') === '2' && sessionStorage.getItem('org') === 'CPI-16') ?
                    <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                        OPD Surgery Service</Typography> :
                    <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                        GM Service</Typography>}
            {diagnosisDialog && diagnosisDialogAndChip()}
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
                                disabled={sessionStorage.getItem('gmgmtype') === '3' || sessionStorage.getItem('gmgmtype') === '2'}
                                label={<Grid row container><Typography color="#482642">Choose Clinic </Typography>
                                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                variantText="filled"
                                value={clnCode}
                                onChange={GMClinicHandleChange}
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
                                onChange={GMVillageHandleChange}
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
                        {(patientData.length && patientData[0].REGSEX === 1) ?
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
                                                disabled
                                                inputProps={{ step: "1", min: 0 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Parity </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { setGMForm({ ...GMForm, GMP: 999 }) }}
                                                value={GMForm.GMP} />
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
                                                onChange={e => { setGMForm({ ...GMForm, GMA: 999 }) }}
                                                value={GMForm.GMA} />
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
                                                        onChange={e => { setGMForm({ ...GMForm, GMPREG: e.target.value }) }}
                                                        value={GMForm.GMPREG}
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
                                                                onClick={GMPregHandleChange} onKeyDown={e => e.key === 'Enter' && GMPregHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            disabled
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={GMPregHandleChange} onKeyDown={e => e.key === 'Enter' && GMPregHandleChange(e)} />}
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
                                                inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                                InputLabelProps={{
                                                    style: { color: '#482642' },
                                                    shrink: true
                                                }}
                                                label={<Grid row container><Typography color="#482642">Parity </Typography>
                                                </Grid>}
                                                style={{ marginTop: '10px' }}
                                                onChange={e => { (e.target.value.length > 2) ? setGMForm({ ...GMForm, GMP: (e.target.value).slice(0, 2) }) : setGMForm({ ...GMForm, GMP: e.target.value }) }}
                                                value={GMForm.GMP} />
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
                                                onChange={e => { (e.target.value.length > 2) ? setGMForm({ ...GMForm, GMA: (e.target.value).slice(0, 2) }) : setGMForm({ ...GMForm, GMA: e.target.value }) }}
                                                value={GMForm.GMA} />
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
                                                        onChange={e => { setGMForm({ ...GMForm, GMPREG: e.target.value }) }}
                                                        value={GMForm.GMPREG}
                                                        row={true}
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            labelPlacement="left"
                                                            label="Yes"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={GMPregHandleChange} onKeyDown={e => e.key === 'Enter' && GMPregHandleChange(e)} />}
                                                        />
                                                        <FormControlLabel
                                                            value="2"
                                                            labelPlacement="left"
                                                            style={{ height: "30px" }}
                                                            className={classes.fontSize}
                                                            control={<Radio size="small" color="primary"
                                                                onClick={GMPregHandleChange} onKeyDown={e => e.key === 'Enter' && GMPregHandleChange(e)} />}
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
                                        style={{ marginTop: '10px', width: '19%' }}
                                        onChange={e => { (e.target.value.length > 5) ? setGMForm({ ...GMForm, GMWT: (e.target.value).slice(0, 5) }) : setGMForm({ ...GMForm, GMWT: e.target.value }) }}
                                        value={GMForm.GMWT} />
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
                                        style={{ marginTop: '10px', width: '19%' }}
                                        onChange={e => { (e.target.value.length > 5) ? setGMForm({ ...GMForm, GMHT: (e.target.value).slice(0, 5) }) : setGMForm({ ...GMForm, GMHT: e.target.value }) }}
                                        value={GMForm.GMHT} />
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
                                        style={{ marginTop: '10px', width: '18%' }}
                                        onChange={e => { (e.target.value.length > 5) ? setGMForm({ ...GMForm, GMTEMP: (e.target.value).slice(0, 5) }) : setGMForm({ ...GMForm, GMTEMP: e.target.value }) }}
                                        value={GMForm.GMTEMP} />

                                    <FormControl style={{ width: '35%' }}>
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
                                                onChange={e => { setGMForm({ ...GMForm, GMTEMPUNIT: e.target.value }) }}
                                                value={GMForm.GMTEMPUNIT}
                                                row={true}
                                            >
                                                <FormControlLabel
                                                    value="1"
                                                    labelPlacement="left"
                                                    label="°F"
                                                    style={{ height: "30px" }}
                                                    className={classes.fontSize}
                                                    control={<Radio size="small" color="primary"
                                                        onClick={GMTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && GMTempUnitHandleChange(e)} />}
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    labelPlacement="left"
                                                    style={{ height: "30px" }}
                                                    className={classes.fontSize}
                                                    control={<Radio size="small" color="primary"
                                                        onClick={GMTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && GMTempUnitHandleChange(e)} />}
                                                    label="°C"
                                                />
                                            </RadioGroup>
                                        </Card>
                                    </FormControl>


                                </Grid>
                                <Grid item xs={12} sm={12} md={12} row>
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
                                        style={{ marginTop: '10px', width: '20.5%' }}
                                        onChange={e => { setGMForm({ ...GMForm, GMPR: e.target.value }) }}
                                        value={GMForm.GMPR} />
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
                                        style={{ marginTop: '10px', width: '20.5%' }}
                                        onChange={e => { setGMForm({ ...GMForm, GMRR: e.target.value }) }}
                                        value={GMForm.GMRR} />

                                    <CustomTextField
                                        id="filled-basic"
                                        label="BP(mmHg)"
                                        variantText="filled"
                                        style={{ marginTop: '10px', width: '20%' }}
                                        onChange={e => { setGMForm({ ...GMForm, GMBP: e.target.value }) }}
                                        value={GMForm.GMBP}
                                    />
                                    <CustomTextField
                                        type="number"
                                        variantText="filled"
                                        inputProps={{ step: "1", min: 0, maxLength: 5 }}
                                        InputLabelProps={{
                                            style: { color: '#482642', textAlign: 'center' },
                                            shrink: true
                                        }}
                                        label={<Grid row container><Typography color="#482642">GM MUAC </Typography>
                                        </Grid>}
                                        style={{ marginTop: '10px', width: '20%' }}
                                        onChange={e => { (e.target.value.length > 5) ? setGMForm({ ...GMForm, GMMUAC: (e.target.value).slice(0, 5) }) : setGMForm({ ...GMForm, GMMUAC: e.target.value }) }}
                                        value={GMForm.GMMUAC} />
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
                                                onChange={e => { setGMLabForm({ ...GMLabForm, LABHB: e.target.value }) }}
                                                value={GMLabForm.LABHB} />
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
                                                onChange={e => { setGMLabForm({ ...GMLabForm, LABOTHER: e.target.value }) }}
                                                value={GMLabForm.LABOTHER}
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
                                                onChange={e => { setGMLabForm({ ...GMLabForm, LABRBS: e.target.value }) }}
                                                value={GMLabForm.LABRBS} />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </ThemeProvider>}

                        <Grid item xs={12} sm={3} md={3}>
                            <CustomTextField
                                id="filled-basic"
                                label="Chief Complaint"
                                variantText="filled"
                                style={{ marginTop: '30px' }}
                                onChange={e => { setGMForm({ ...GMForm, GMCOMPLAINT: e.target.value }) }}
                                value={GMForm.GMCOMPLAINT}
                            />
                        </Grid>
                        {sessionStorage.getItem('gmgmtype') === '3' || sessionStorage.getItem('gmgmtype') === '2' ?
                            null :
                            <Grid item xs={12} sm={1} md={1}>
                                <Typography variant="subtitle2">Diagnosis Service Type </Typography>
                                <FormControl style={{ width: '100%' }}>
                                    <Select
                                        native
                                        value={GMDxSts}
                                        onChange={GMDxStsHandle}
                                    >

                                        <option value={1}>GM</option>
                                        <option value={2}>IMCI</option>

                                    </Select>
                                </FormControl>
                            </Grid>}
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
                                    {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}>
                                        <Typography>Diagnosis-OtherDiagnosis </Typography>

                                    </Grid>}
                                    <Grid item xs={12} sm={12} md={12}>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                            <Grid item xs={12} sm={6} md={6} >
                                                <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                                                    <Button
                                                        style={{ alignSelf: 'center', marginTop: '20px', backgroundColor: '#B7A7B3', color: '#482642', width: '300px' }}
                                                        onClick={setDiagnosisDialogOpenControl}>Diagnosis</Button>
                                                    {chipData.length != 0 && chipData.map((data) => {
                                                        return (
                                                            <div style={{ textAlign: 'center', alignSelf: 'center' }}>
                                                                <Chip
                                                                    style={{ alignSelf: 'center', margin: '10px', color: '#482642', background: '#e2dbe0', maxWidth: '90%' }}
                                                                    /* label={data.substr(0, data.indexOf("{"))} */
                                                                    label={data.includes('{~') && data.includes('~}') ? data.substr(0, data.indexOf("{")) : data}
                                                                    onDelete={handleDelete(data)}
                                                                />
                                                            </div>
                                                        );
                                                    })}


                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={6} >
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Other Diagnosis"
                                                    variantText="filled"
                                                    style={{ marginTop: '10px', width: '90%', marginRight: '10px' }}
                                                    onChange={e => { setGMForm({ ...GMForm, GMOTHERDX: e.target.value }) }}
                                                    value={GMForm.GMOTHERDX}
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
                                            onChange={e => { setGMForm({ ...GMForm, GMPROCEDURE: e.target.value }) }}
                                            value={GMForm.GMPROCEDURE}
                                        />
                                        <CustomTextField
                                            id="filled-basic"
                                            label="Treatment"
                                            variantText="filled"
                                            style={{ marginTop: '10px', width: '35%' }}
                                            onChange={e => { setGMForm({ ...GMForm, GMTX: e.target.value }) }}
                                            value={GMForm.GMTX}
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
                                                    onChange={e => { setGMForm({ ...GMForm, GMHE: e.target.value }) }}
                                                    value={GMForm.GMHE}
                                                    row={true}
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        labelPlacement="left"
                                                        label="Yes"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={GMHEHandleChange} onKeyDown={e => e.key === 'Enter' && GMHEHandleChange(e)} />}
                                                    />
                                                    <FormControlLabel
                                                        value="2"
                                                        labelPlacement="left"
                                                        style={{ height: "30px" }}
                                                        className={classes.fontSize}
                                                        control={<Radio size="small" color="primary"
                                                            onClick={GMHEHandleChange} onKeyDown={e => e.key === 'Enter' && GMHEHandleChange(e)} />}
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
                                                onChange={e => { setGMForm({ ...GMForm, GMREFREASON: e.target.value }) }}
                                                value={GMForm.GMREFREASON}
                                            />
                                        </Grid></>}
                                    {patientOutcome === 4 && <>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Reasons of Death"
                                                variantText="filled"
                                                style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                onChange={e => { setGMForm({ ...GMForm, GMDEATHREASON: e.target.value }) }}
                                                value={GMForm.GMDEATHREASON}
                                            />
                                        </Grid></>}
                                    {patientOutcome === 3 && referPlace === 5 && <>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <CustomTextField
                                                id="filled-basic"
                                                label="Other Referral"
                                                variantText="filled"
                                                style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                onChange={e => { setGMForm({ ...GMForm, GMREFTOOTHER: e.target.value }) }}
                                                value={GMForm.GMREFTOOTHER}
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
                                                onChange={e => { setGMForm({ ...GMForm, GMPROVIDERNAME: e.target.value }) }}
                                                value={GMForm.GMPROVIDERNAME}
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
                                onChange={e => { setGMForm({ ...GMForm, GMREMARK: e.target.value }) }}
                                value={GMForm.GMREMARK}
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
                {chipAlert && <CustomSnackBar open={setChipAlertOpen} close={setChipAlertClose} alertMsg={"You can choose at most 3 diagnosis!"} type="warning" />}
            </div >


        </>);
}
