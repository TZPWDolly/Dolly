import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from "@material-ui/icons/Search";
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
import { Button, Chip, OutlinedInput, Snackbar, SnackbarContent, Switch, TextField, Typography, List, ListItem } from "@material-ui/core";

import CustomTextField from "../../components/controls/CustomTextFieldFilled";
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'

import diagnosisIcon from '../../images/diagnosisIcon.png'
import noPatientLogo from '../../images/noPatient.png'

import _ from 'lodash';

import "../../components/controls/SearchBar.css";

//////////////API/////////////////
import { insertIPD,updateIPD } from "../../modals/ipdinfo";
import { insertLab } from "../../modals/labinfo";
import { getMaxID } from "../../modals/maxid";
import { getDiagnosis, getIMCI } from "../../modals/diagnosis"
import * as serviceLab from '../../modals/service_labdatabyid'
import * as serviceData from '../../modals/rhservicedatabyid'
import * as labData from '../../modals/rhlabdatabyid'
import * as clinic from "../../modals/clinicbyorgproj"
import * as village from "../../modals/villagebyorgproj"
import CustomizedSnackbars from '../../components/controls/CustomSnackBar';

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
    marginTop: theme.spacing(1.4),
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

export default function IPDServiceEditForm(props) {

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

  //////Diagnosis Handle////////////
  const [GMDxSts, setGMDxSts] = useState('1')
  const GMDxStsHandle = (event) => {
    setGMDxSts(event.target.value);
    //setGMForm({ ...GMForm, GMDXSTATUS: event.target.value })
  };

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
                    label={data.substr(0, data.indexOf("{"))}
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

  const [formData, setFormData] = useState(
    {
      IPDREGID: '',
      IPDPROVIDEDDATE: '',
      IPDAGE: '',
      IPDBEDNO: '',
      IPDDONOR: '',
      IPDORG: '',
      IPDPROJECT: '',
      IPDTSP: '',
      IPDVILLAGE: '',
      IPDPLACE: '',
      IPDPROVIDERPOSITION: '',
      IPDTYPE: '',
      IPDPROVIDERNAME: '',
      IPDADDRESS: '',
      IPDUSRLOGIN: '',
      IPDCOMPLAINT: '',
      IPDLAB: '',
      IPDDX: '',
      IPDDX1: '',
      IPDDX2: '',
      IPDDX3: '',
      IPDOTHERDX: '',
      IPDOUTCOMEDATE: '',
      IPDOUTCOME: '',
      IPDREFTO: '',
      IPDREFTOOTHER: '',
      IPDDEATHREASON: '',
      IPDREFREASON: '',
      IPDAGEUNIT: '',
      IPDCLNID: '',
      IPDUPDATE: '',
      IPDSTATUS: '',
      IPDSYNC: '',
      ID: '',
    }
  )

  const [IPDLabForm, setIPDLabForm] = useState({
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

  ///////LabTest///////////
  const [labTest, setLabTest] = useState(false)
  const labTestHandle = (event) => {
    setLabTest(event.target.checked);
    setFormData({ ...formData, IPDLAB: event.target.checked === true ? 1 : 0 })
    setIPDLabForm({ ...IPDLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
  };

  ///////Investigation///////////
  const [RDT, setRDT] = useState('999');
  const RDTHandle = (event) => {
    setRDT(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABRDT: event.target.value })
  };
  const [microscopic, setMicroscopic] = useState('999');
  const microscopicHandle = (event) => {
    setMicroscopic(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABMICROSCOPIC: event.target.value })
  };
  const [blood, setBlood] = useState('999')
  const bloodHandle = (event) => {
    setBlood(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABBG: event.target.value })
  };
  const [RH, setRH] = useState('999')
  const RHHandle = (event) => {
    setRH(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABRH: event.target.value })
  };
  const [urineProtein, setUrineProtein] = useState('999');
  const urintProteinHandle = (event) => {
    setUrineProtein(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABUPROTEIN: event.target.value })
  };
  const [UCG, setUCG] = useState('999')
  const UCGHandle = (event) => {
    setUCG(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABUCG: event.target.value })
  };

  const [urine, setUrine] = useState('999')
  const urineHandle = (event) => {
    setUrine(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABUSUGAR: event.target.value })
  };

  const [gonorrhoea, setGonorrhoea] = useState('999')
  const gonorrhoeaHandle = (event) => {
    setGonorrhoea(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABGONO: event.target.value })
  };
  const [trichomonus, setTrichomonus] = useState('999')
  const trichomonusHandle = (event) => {
    setTrichomonus(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABTRICHO: event.target.value })
  };
  const [candida, setCandida] = useState('999')
  const candidaHandle = (event) => {
    setCandida(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABCANDIDA: event.target.value })
  };
  const [RPR, setRPR] = useState('999')
  const RPRHandle = (event) => {
    setRPR(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABRPR: event.target.value })
  };
  const [TPHA, setTPHA] = useState('999')
  const TPHAHandle = (event) => {
    setTPHA(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABTPHA: event.target.value })
  };
  const [VDRL, setVDRL] = useState('999')
  const VDRLHandle = (event) => {
    setVDRL(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABVDRL: event.target.value })
  };
  const [HIV, setHIV] = useState('999')
  const HIVHandle = (event) => {
    setHIV(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABHIV: event.target.value })
  };
  const [HBV, setHBV] = useState('999')
  const HBVHandle = (event) => {
    setHBV(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABHBV: event.target.value })
  };
  const [HepC, setHepC] = useState('999')
  const HepCHandle = (event) => {
    setHepC(event.target.value);
    setIPDLabForm({ ...IPDLabForm, LABHCV: event.target.value })
  };

  /////Patient Outcome//////////
  const [proPosition, setProPosition] = useState('')
  const proPositionHandle = (event) => {
    setProPosition(event.target.value);
    setFormData({ ...formData, IPDPROVIDERPOSITION: event.target.value })
  };
  const [proPlace, setProPlace] = useState('')
  const proPlaceHandle = (event) => {
    setProPlace(event.target.value);
    setFormData({ ...formData, IPDPLACE: event.target.value })
    setIPDLabForm({ ...IPDLabForm, LABPLACE: event.target.value })
  };
  const [patientOutcome, setPatientOutcome] = useState('999')
  const patientOutcomeHandle = (event) => {
    setPatientOutcome(event.target.value);
    setFormData({ ...formData, IPDOUTCOME: event.target.value })
  };
  const [referPlace, setReferPlace] = useState('999')
  const referPlaceHandle = (event) => {
    setReferPlace(event.target.value);
    setFormData({ ...formData, IPDPLACE: event.target.value })
  };

  ///////////Handle Change///////////
  const [tspCode, setTspCode] = useState('')
  const [clnCode, setClnCode] = useState('')
  const [villageCode, setVillageCode] = useState('')
  const IPDVillageHandleChange = (event) => {
    let tsp = _.find(villageData, ['VILLAGE_CODE', event.target.value]);
    setTspCode(tsp.TSP_CODE)
    setVillageCode(event.target.value)
    setIPDLabForm({ ...IPDLabForm, LABVILLAGE: event.target.value })
    setFormData({ ...formData, IPDVILLAGE: event.target.value, IPDTSP: tsp.TSP_CODE })
    console.log("Selected Village => ", event.target.value)
  };
  const IPDClinicHandleChange = (event) => {
    setClnCode(event.target.value)
    setFormData({ ...formData, IPDCLNID: event.target.value })
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

          setFormData({ ...formData, IPDPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), IPDAGE: h.toString().split('.')[0], IPDAGEUNIT: '365' })
          setIPDLabForm({ ...IPDLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), })
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

        setFormData({ ...formData, IPDPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), IPDAGE: h.toString().split('.')[0], IPDAGEUNIT: '30' })
        setIPDLabForm({ ...IPDLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), })
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

        setFormData({ ...formData, IPDPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), IPDAGE: totalAge, IPDAGEUNIT: '1' })
        setIPDLabForm({ ...IPDLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), })
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

  ///////////////Save Cancle btn/////////////

  const save = async () => {
    let valid = !providedDate ? "Please Choose Provided Date" :
      !proPosition ? "Please Choose Provider Position" :
        !proPlace ? "Please Choose Provided Place" :
          chipData.length > 3 ? "You can choose at most 3 Diagnosis" :
            'valid';

   

    if (valid === 'valid') {
      var chip1 = ''
      var chip2 = ''
      var chip3 = ''
      if (chipData.length === 1) {
        formData.IPDDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
          (imciData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
          formData.IPDDX2 = 999
        formData.IPDDX3 = 999
      }
      else if (chipData.length === 2) {
        formData.IPDDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
          (imciData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
          formData.IPDDX2 = chipData[1].includes('{~') ? chipData[1].substring(chipData[1].indexOf("{~") + 2, chipData[1].indexOf("~}")) :
          (imciData.find((diag) => diag.DIAGNOSIS === chipData[1])).DXCODE;
          formData.IPDDX3 = 999
      }
      else if (chipData.length === 3) {
        formData.IPDDX1 = chipData[0].includes('{~') ? chipData[0].substring(chipData[0].indexOf("{~") + 2, chipData[0].indexOf("~}")) :
          (imciData.find((diag) => diag.DIAGNOSIS === chipData[0])).DXCODE;
          formData.IPDDX2 = chipData[1].includes('{~') ? chipData[1].substring(chipData[1].indexOf("{~") + 2, chipData[1].indexOf("~}")) :
          (imciData.find((diag) => diag.DIAGNOSIS === chipData[1])).DXCODE;
          formData.IPDDX3 = chipData[2].includes('{~') ? chipData[2].substring(chipData[2].indexOf("{~") + 2, chipData[2].indexOf("~}")) :
          (imciData.find((diag) => diag.DIAGNOSIS === chipData[2])).DXCODE;
      }
      else {
        formData.IPDDX1 = 999
        formData.IPDDX2 = 999
        formData.IPDDX3 = 999
      }
  
      var bed = formData.IPDBEDNO === '' ? 999 : formData.IPDBEDNO
      formData.IPDBEDNO = bed
      formData.IPDUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  
      var lab = labTest === false ? 0 : 1;
      formData.IPDLAB = lab
      IPDLabForm.LABTEST = lab
  
      var labHB = IPDLabForm.LABHB === '' ? 999 : IPDLabForm.LABHB
      IPDLabForm.LABHB = labHB
      var labRBS = IPDLabForm.LABRBS === '' ? 999 : IPDLabForm.LABRBS
      IPDLabForm.LABRBS = labRBS
      IPDLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
       const rhres = await updateIPD({ formData, IPDLabForm });
      if (rhres?.status === 200) {
        sessionStorage.setItem('homeSave', 'done')
        setSuccess("Successfully updated a patient's IPD Service")
        setSuccessSnack(true)
        history.push({
          pathname: "entryhomepage",
          openIPDUpdateSnackbar: true
        });
      } 
      console.log('IPD Form =>', formData)
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

    if (sessionStorage.getItem('editIPDPatient') === 'true') {
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

        formData.IPDREGID = serviceData[0].IPDREGID
        formData.IPDPROVIDEDDATE = moment(serviceData[0].IPDPROVIDEDDATE).format("YYYY-MM-DD")
        setProvidedDate(moment(serviceData[0].IPDPROVIDEDDATE).format("YYYY-MM-DD"))
        formData.IPDAGE = serviceData[0].IPDAGE
        formData.IPDBEDNO = serviceData[0].IPDBEDNO === 999 ? '' : serviceData[0].IPDBEDNO
        formData.IPDDONOR = serviceData[0].IPDDONOR
        formData.IPDORG = serviceData[0].IPDORG
        formData.IPDPROJECT = serviceData[0].IPDPROJECT
        formData.IPDTSP = serviceData[0].IPDTSP
        setTspCode(serviceData[0].IPDTSP)
        formData.IPDVILLAGE = serviceData[0].IPDVILLAGE
        setVillageCode(serviceData[0].IPDVILLAGE)
        formData.IPDPLACE = serviceData[0].IPDPLACE
        setProPlace(serviceData[0].IPDPLACE)
        formData.IPDPROVIDERPOSITION = serviceData[0].IPDPROVIDERPOSITION
        setProPosition(serviceData[0].IPDPROVIDERPOSITION)
        formData.IPDTYPE = serviceData[0].IPDTYPE
        formData.IPDPROVIDERNAME = serviceData[0].IPDPROVIDERNAME
        formData.IPDADDRESS = serviceData[0].IPDADDRESS
        formData.IPDUSRLOGIN = serviceData[0].IPDUSRLOGIN
        formData.IPDCOMPLAINT = serviceData[0].IPDCOMPLAINT
        formData.IPDLAB = serviceData[0].IPDLAB
        formData.IPDDX = serviceData[0].IPDDX

        let dxList = []

        let dx1 = ''
        let dx2 = ''
        let dx3 = ''

        if (serviceData[0].IPDDX1 != 999) {
          dx1 = await (iData.find((diag) => diag.DXCODE === serviceData[0].IPDDX1)).DIAGNOSIS
          dxList.push(dx1)
        }
        if (serviceData[0].IPDDX2 != 999) {
          dx2 = await (iData.find((diag) => diag.DXCODE === serviceData[0].IPDDX2)).DIAGNOSIS
          dxList.push(dx2)
        }
        if (serviceData[0].IPDDX3 != 999) {
          dx3 = await (iData.find((diag) => diag.DXCODE === serviceData[0].IPDDX3)).DIAGNOSIS
          dxList.push(dx3)
        }


        setChipData(dxList)
        console.log("Chip list in useEffect ====> ", dxList)
        formData.IPDDX1 = serviceData[0].IPDDX1
        formData.IPDDX2 = serviceData[0].IPDDX2
        formData.IPDDX3 = serviceData[0].IPDDX3

        formData.IPDOTHERDX = serviceData[0].IPDOTHERDX
        formData.IPDOUTCOMEDATE = serviceData[0].IPDOUTCOMEDATE != '' ? moment(serviceData[0].IPDOUTCOMEDATE).format("YYYY-MM-DD") : ''
        formData.IPDOUTCOME = serviceData[0].IPDOUTCOME === 999 ? '' : serviceData[0].IPDOUTCOME
        setPatientOutcome(serviceData[0].IPDOUTCOME === 999 ? '' : serviceData[0].IPDOUTCOME)
        formData.IPDREFTO = serviceData[0].IPDREFTO === 999 ? '' : serviceData[0].IPDREFTO
        setReferPlace(serviceData[0].IPDREFTO === 999 ? '' : serviceData[0].IPDREFTO)
        formData.IPDREFTOOTHER = serviceData[0].IPDREFTOOTHER
        formData.IPDDEATHREASON = serviceData[0].IPDDEATHREASON
        formData.IPDREFREASON = serviceData[0].IPDREFREASON
        formData.IPDAGEUNIT = serviceData[0].IPDAGEUNIT
        formData.IPDCLNID = serviceData[0].IPDCLNID
        setClnCode(serviceData[0].IPDCLNID)
        formData.IPDUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        formData.IPDSTATUS = '2'
        formData.IPDSYNC = '0'
        formData.ID = serviceData[0].ID

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

        setIPDLabForm({
          ...IPDLabForm,
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
    }
    setLoading(false)

  }, [])

  return (
    <div>
      <Modals open={loading} />
      {diagnosisDialog && diagnosisDialogAndChip()}
      {chipData.length > 3 && <CustomizedSnackbars alertMsg={"You can choose at most 3 diagnosis!"} type="success" />}
      <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
        Inpatient Entry Form</Typography>

      <div >
        <div style={{margin:'2%'}}>
          <Grid container spacing={2} style={{ marginBottom: '10px' }}>
            <Grid item xs={12} sm={4} md={4} >
              <CustomUnicefTextField
                id="filled-basic"
                style={{ width: '95%' }}
                label={<Grid row container><Typography color="#482642">Patient ID </Typography>
                  <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                variantText="filled"
                InputLabelProps={{
                  style: { color: '#482642' },
                  shrink: true
                }}
                disabled
                value={patientData.length ? patientData[0].REGID : ''} />
            </Grid>

            <Grid item xs={12} sm={4} md={4} >
              <CustomUnicefTextField
                id="filled-basic"
                type="date"
                style={{ width: '95%' }}
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
              <CustomUnicefTextField
                id="filled-basic"
                style={{ width: '95%' }}
                select
                label={<Grid row container><Typography color="#482642">Provided Village </Typography>
                  <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                variantText="filled"
                value={villageCode}
                onChange={IPDVillageHandleChange}
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
              </CustomUnicefTextField>
            </Grid>
          </Grid>
          <Card
            variant="outlined"
            style={{
              background: "#fcf0f2",
              width: '100%',
              borderRadius: '10px',
              marginTop: '20px'
            }}
            className={classes.cardStyle}>
            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>History </Typography>
            </Grid>}
            <Grid container spacing={2} style={{ marginBottom: '10px' }}>
              <Grid item xs={12} sm={6} md={3}>
                <CustomUnicefTextField
                  type="number"
                  variantText="filled"
                  inputProps={{ step: "1", min: 0 }}
                  InputLabelProps={{
                    style: { color: '#482642' },

                  }}
                  label={<Grid row container><Typography color="#482642">Bed Number </Typography>
                  </Grid>}
                  style={{ marginTop: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, IPDBEDNO: e.target.value }) }}
                  value={formData.IPDBEDNO} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomUnicefTextField
                  variantText="filled"

                  InputLabelProps={{
                    style: { color: '#482642' },

                  }}
                  label={<Grid row container><Typography color="#482642">Address </Typography>
                  </Grid>}
                  style={{ marginTop: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, IPDADDRESS: e.target.value }) }}
                  value={formData.IPDADDRESS} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomUnicefTextField
                  variantText="filled"

                  InputLabelProps={{
                    style: { color: '#482642' },

                  }}
                  label={<Grid row container><Typography color="#482642">Problem of Admission </Typography>
                  </Grid>}
                  style={{ marginTop: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, IPDCOMPLAINT: e.target.value }) }}
                  value={formData.IPDCOMPLAINT} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ThemeProvider theme={radioTheme}>
                  <FormControlLabel
                    style={{ marginTop: '20px' }}
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
                    labelPlacement="right"
                  />
                </ThemeProvider>

              </Grid>
            </Grid>
          </Card>

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
                      onChange={e => { setIPDLabForm({ ...IPDLabForm, LABHB: e.target.value }) }}
                      value={IPDLabForm.LABHB} />
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
                      onChange={e => { setIPDLabForm({ ...IPDLabForm, LABOTHER: e.target.value }) }}
                      value={IPDLabForm.LABOTHER}
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
                      onChange={e => { setIPDLabForm({ ...IPDLabForm, LABRBS: e.target.value }) }}
                      value={IPDLabForm.LABRBS} />
                  </Grid>
                </Grid>
              </Card>
            </ThemeProvider>}

          <Card
            variant="outlined"
            style={{
              background: "#fcf0f2",
              width: '100%',
              borderRadius: '10px',
              marginTop: '20px'
            }}
            className={classes.cardStyle}>
            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Diagnosis </Typography>
            </Grid>}
            <Grid container spacing={2} style={{ marginBottom: '10px' }}>
              <Grid item xs={12} sm={6} md={4} >
                <CustomUnicefTextField
                  variantText="filled"
                  InputLabelProps={{
                    style: { color: '#482642' },

                  }}
                  label={<Grid row container><Typography color="#482642">Final Diagnosis </Typography>
                  </Grid>}
                  style={{ marginTop: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, IPDDX: e.target.value }) }}
                  value={formData.IPDDX} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} >
                <CustomUnicefTextField
                  variantText="filled"
                  type='date'
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  label={<Grid row container><Typography color="#482642">Date of Outcome </Typography>
                  </Grid>}
                  style={{ marginTop: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, IPDOUTCOMEDATE: e.target.value }) }}
                  value={formData.IPDOUTCOMEDATE} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} >
                <FormControl style={{ width: '95%' }}>
                  <CustomUnicefTextField
                    select
                    variantText="filled"
                    label={<Grid row container><Typography color="#482642">Diagnosis Service Type</Typography>
                    </Grid>}
                    value={GMDxSts}
                    onChange={GMDxStsHandle}
                    style={{ marginTop: '10px', width: '100%' }}>
                    <MenuItem value={1}>GM</MenuItem>
                    <MenuItem value={2}>IMCI</MenuItem>
                  </CustomUnicefTextField>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: '10px' }}>
              <Grid item xs={12} sm={6} md={6} >
                <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
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
                <CustomUnicefTextField
                  id="filled-basic"
                  label="Other Diagnosis"
                  variantText="filled"
                  style={{ marginTop: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, IPDOTHERDX: e.target.value }) }}
                  value={formData.IPDOTHERDX}
                />
              </Grid>
            </Grid>
          </Card>


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
              {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Provider Information </Typography>
              </Grid>}
              <Grid container style={{ marginBottom: '10px' }}>

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
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="Provider Name"
                    variantText="filled"
                    style={{ marginTop: '10px', width: '95%' }}
                    onChange={e => { setFormData({ ...formData, IPDPROVIDERNAME: e.target.value }) }}
                    value={formData.IPDPROVIDERNAME}
                  />
                </Grid>
              </Grid>
            </Card>
          </ThemeProvider>



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
              {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Patient Outcome </Typography>
              </Grid>}
              <Grid container style={{ marginBottom: '10px' }}>
                <Grid item xs={12} sm={4} md={3}>
                  <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                    <InputLabel id="demo-simple-select-filled-label">Patient Outcome</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      style={{ width: '100%' }}
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
                      <MenuItem value={3}>Referral</MenuItem>
                      <MenuItem value={4}>Death</MenuItem>
                      <MenuItem value={5}>Discharge</MenuItem>
                      <MenuItem value={7}>Absconded</MenuItem>
                      <MenuItem value={8}>Sign & Left</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {patientOutcome === 3 && <>
                  <Grid item xs={12} sm={4} md={3}>
                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                      <InputLabel id="demo-simple-select-filled-label">Provided ReferPlace</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        style={{ width: '100%' }}
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
                  <Grid item xs={12} sm={4} md={3}>
                    <CustomTextField
                      id="filled-basic"
                      label="Reasons of Referral"
                      variantText="filled"
                      style={{ marginTop: '9px', width: '95%' }}
                      onChange={e => { setFormData({ ...formData, IPDREFREASON: e.target.value }) }}
                      value={formData.IPDREFREASON}
                    />
                  </Grid></>}
                {patientOutcome === 4 && <>
                  <Grid item xs={12} sm={4} md={3}>
                    <CustomTextField
                      id="filled-basic"
                      label="Reasons of Death"
                      variantText="filled"
                      style={{ marginTop: '9px', marginBottom: '10px', width: '95%' }}
                      onChange={e => { setFormData({ ...formData, IPDDEATHREASON: e.target.value }) }}
                      value={formData.IPDDEATHREASON}
                    />
                  </Grid></>}
                {patientOutcome === 3 && referPlace === 5 && <>
                  <Grid item xs={12} sm={4} md={3}>
                    <CustomTextField
                      id="filled-basic"
                      label="Other Referral"
                      variantText="filled"
                      style={{ marginTop: '9px', marginBottom: '10px', width: '95%' }}
                      onChange={e => { setFormData({ ...formData, IPDREFTOOTHER: e.target.value }) }}
                      value={formData.IPDREFTOOTHER}
                    />
                  </Grid>
                </>}
              </Grid>
            </Card>
          </ThemeProvider>

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

          {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
          {ageSnack && <CustomizedSnackbars open={setAgeSnackBarOpen} close={setAgeSnackBarClose} alertMsg={ageError} type="warning" />}
          {successSnack && <CustomizedSnackbars open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
          {chipAlert && <CustomizedSnackbars open={setChipAlertOpen} close={setChipAlertClose} alertMsg={"You can choose at most 3 diagnosis!"} type="warning" />}
        </div>
      </div>

    </div>
  )
}
