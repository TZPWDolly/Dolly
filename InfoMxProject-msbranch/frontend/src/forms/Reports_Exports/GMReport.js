
import React, { useEffect, useState } from 'react'
import { Button, createTheme, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, ThemeProvider, Typography } from '@material-ui/core'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomSnackBar from "../../components/controls/CustomSnackBar";
import Modals from "../../components/modal";
import XLSX from 'xlsx'
import moment from 'moment';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import GetAppIcon from '@material-ui/icons/GetApp';

/////////////////API////////////////////////
import * as clinic from "../../modals/clinicbyorgproj"
import * as lg from '../../modals/login'
import * as orgQuery from '../../modals/getallorgclinic'
import * as gmRp from '../../modals/gmreport'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      flexGrow: 1
    },
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
  selected: {
    backgroundColor: "#DED4DA !important",
    color: '#482642'
  },
  table: {
    width: '98vw',
    maxWidth: '98vw',
    borderCollapse: 'collapse',
    margin: 'auto',
    marginTop: '10px'
  },
  indicatorTitle: {
    width: 280,
    maxWidth: 280,
    height: 60,
    background: '#6C5268',
    color: '#FCF0F2',
    border: '0.5px solid lightgray',
    borderRadius: '5px 0px 0px 0px'
  },
  title1: {
    width: 1,
    maxWidth: 1,
    background: '#6C5268',
    color: '#FCF0F2',
    fontSize: '9px',
    border: '0.5px solid lightgray'
  },
  titleTotal1: {
    width: 1,
    maxWidth: 1,
    background: '#6C5268',
    color: '#FCF0F2',
    fontSize: '9px',
    border: '0.5px solid lightgray',
    borderRadius: '0px 5px 0px 0px'
  },
  title2: {
    width: 0.5,
    maxWidth: 0.5,
    background: '#6C5268',
    color: '#FCF0F2',
    fontSize: '8px',
    border: '0.5px solid lightgray'
  },
  indicatorName: {
    width: 220,
    maxWidth: 220,
    fontSize: '11px',
    background: '#DED4DA',
    color: '#482642',
    border: '0.5px solid #C8AFAF',
    fontWeight: 'lightBold'
  },
  newOldTitle: {
    width: 5,
    maxWidth: 5,
    fontSize: '8px',
    background: '#DED4DA',
    color: '#482642',
    border: '0.5px solid #C8AFAF'
  },
  newOldData: {
    width: 1,
    maxWidth: 1,
    background: '#DED4DA',
    color: '#482642',
    fontSize: '8px',
    border: '0.5px solid #C8AFAF'
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

export default function GMReport() {

  const classes = useStyles();

  const [type, setType] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [clinicData, setClinicData] = useState([])
  const [clinicSelect, setClinicSelect] = useState([])
  const [orgData, setOrgData] = useState([])
  const [orgSelect, setOrgSelect] = useState([])
  const [projectData, setProjectData] = useState([])
  const [projectSelect, setProjectSelect] = useState([])
  const [tspData, setTspData] = useState([])
  const [tspSelect, setTspSelect] = useState([])

  /////Report Data/////////////
const indicator = [
  'Total number of Malaria (PF) + cases ',
  'Total number of Malaria (PV) + cases durig the reporting period',
  'Total number of Measles case ',
  'Total number of Watery Diarrhoea cases',
  'Total number of Diarrhoea treated with ORS cases',
  'Total number of Diarrhoea treated with ORS+Zinc cases',
  'Total number of Dysentery',
  'Total number of Upper Respiratory Tract Infection',
  'Total number of Lower Respiratory Tract Infection case',
  'Total number of Pneumonia treated with antibiotics cases',
  'Total number of TB(suspected ) case',
  'Total number of TB(confirm ) cases',
  'Total number of Hypertension case',
  'Total number of Anaemia Case',
  'Total number of Intestinal worm cases',
  'Total number of Diabetes cases',
  'Total number of HIV/AIDS suspected cases',
  'Total number of HIV/AIDS confirmcases',
  'Total number of Urinary Tract Infection cases',
  'Total number of Sexually Transmitted Infection cases',
  'Total number of Acute(moderate/Severe) Malnutrition case',
  'Total number of Gastritis case',
  'Total number of Skin Infection cases',
  'Total number of Arthritis cases',
  'Total number of Hepatatis cases',
  'Total number of Surgical Case',
  'Total number of Wounds Case',
  'Total number of Dengue hemorrhagic fever (Severe Dengue)',
  'Total number of Dengue fever case',
  'Total number of Beri Beri case',
  'Total number of Eyes Problem case',
  'Total number of Dental Problem case',
  'Total number of Mental Healthcase',
  'Total number of Gynaecologycase',
  'Total number of Gun Shot Injury case',
  'Total number of Landmine Injury case',
  'Total number of Road Traffic Injury case',
  'Total number of Other Injury case',
  'Total number of Abortion case',
  'Total number of Sepsis case',
  'Total number of Eclampsia/Pre-Eclampsia case',
  'Total number of Ante Partum Haemorrhage case',
  'Total number of Post Partum Haemorrhage case',
  'Total number of Preterm labour case',
  'Total number of Etopic Preganacy case',
  'Total number of Molar Pregnancy case',
  'Total number of Neonatal Jaundice case',
  'Total number of Neonatal Sepsis case',
  'Total number of Umbilical Infection case',
  'Total number of Low Birth weight case',
  'Total number of Other Neonatal Cases',
  'Total number of Other cases'
]
const [gmNewData, setgmNewData] = useState([])
const [gmOldData, setgmOldData] = useState([])
const defaultArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
  const defaultValue = () => 
  {
    return <TableCell align="center" className={classes.newOldTitle}>0</TableCell>
  }
const orgSelectHandle = (event) => {
  setOrgSelect(event.target.value);
  console.log("Seelct event => ", orgSelect)
};

const projectSelectHandle = (event) => {
  setProjectSelect(event.target.value);
  console.log("Seelct event => ", projectSelect)
};

const clinicSelectHandle = (event) => {
  setClinicSelect(event.target.value);
  console.log("Seelct event => ", clinicSelect)
};

const tspSelectHandle = (event) => {
  setTspSelect(event.target.value);
  console.log("Seelct event => ", tspSelect)
};

const typeHandle = async (event) => {
  if (event.target.value === 'By Township') {
    setClinicSelect([])
    setType(event.target.value);
  }
  else if (event.target.value === 'By Clinic') {
    setTspSelect([])
    setType(event.target.value);
  }
  else {
    setClinicSelect([])
    setTspSelect([])
    setType(event.target.value);
  }

};

const reportBtn = async () => {

  const parameter = {
    orgID: sessionStorage.getItem('org'),
    sDate: startDate,
    eDate: endDate
  }
  var select = []
  select.push(orgSelect.length === 0 ? sessionStorage.getItem('org') : orgSelect)
  select.push(projectSelect)
  select.push(clinicSelect)
  select.push(tspSelect)
  console.log("ORG Select => ", orgSelect.length)
  console.log("Select => ", select)
  setLoading(true)
  var gmOld = await gmRp.gmReport({ parameter, select, type: 2 });
  var gmNew = await gmRp.gmReport({ parameter, select, type: 1 });
  var oldList = []
  var newList = []

  if (gmOld && gmNew) {
    oldList.push(gmOld.data.data.gmReport1)
    oldList.push(gmOld.data.data.gmReport2)
    oldList.push(gmOld.data.data.gmReport3)
    oldList.push(gmOld.data.data.gmReport4)
    oldList.push(gmOld.data.data.gmReport5)
    oldList.push(gmOld.data.data.gmReport6)
    oldList.push(gmOld.data.data.gmReport7)
    oldList.push(gmOld.data.data.gmReport8)
    oldList.push(gmOld.data.data.gmReport9)
    oldList.push(gmOld.data.data.gmReport10)
    oldList.push(gmOld.data.data.gmReport11)
    oldList.push(gmOld.data.data.gmReport12)
    oldList.push(gmOld.data.data.gmReport13)
    oldList.push(gmOld.data.data.gmReport14)
    oldList.push(gmOld.data.data.gmReport15)
    oldList.push(gmOld.data.data.gmReport16)
    oldList.push(gmOld.data.data.gmReport17)
    oldList.push(gmOld.data.data.gmReport18)
    oldList.push(gmOld.data.data.gmReport19)
    oldList.push(gmOld.data.data.gmReport20)
    oldList.push(gmOld.data.data.gmReport21)
    oldList.push(gmOld.data.data.gmReport22)
    oldList.push(gmOld.data.data.gmReport23)
    oldList.push(gmOld.data.data.gmReport24)
    oldList.push(gmOld.data.data.gmReport25)
    oldList.push(gmOld.data.data.gmReport26)
    oldList.push(gmOld.data.data.gmReport27)
    oldList.push(gmOld.data.data.gmReport28)
    oldList.push(gmOld.data.data.gmReport29)
    oldList.push(gmOld.data.data.gmReport30)
    oldList.push(gmOld.data.data.gmReport31)
    oldList.push(gmOld.data.data.gmReport32)
    oldList.push(gmOld.data.data.gmReport33)
    oldList.push(gmOld.data.data.gmReport34)
    oldList.push(gmOld.data.data.gmReport35)
    oldList.push(gmOld.data.data.gmReport36)
    oldList.push(gmOld.data.data.gmReport37)
    oldList.push(gmOld.data.data.gmReport38)
    oldList.push(gmOld.data.data.gmReport39)
    oldList.push(gmOld.data.data.gmReport40)
    oldList.push(gmOld.data.data.gmReport41)
    oldList.push(gmOld.data.data.gmReport42)
    oldList.push(gmOld.data.data.gmReport43)
    oldList.push(gmOld.data.data.gmReport44)
    oldList.push(gmOld.data.data.gmReport45)
    oldList.push(gmOld.data.data.gmReport46)
    oldList.push(gmOld.data.data.gmReport47)
    oldList.push(gmOld.data.data.gmReport48)
    oldList.push(gmOld.data.data.gmReport49)
    oldList.push(gmOld.data.data.gmReport50)
    oldList.push(gmOld.data.data.gmReport51)
    oldList.push(gmOld.data.data.gmReport52)
    
    newList.push(gmNew.data.data.gmReport1)
    newList.push(gmNew.data.data.gmReport2)
    newList.push(gmNew.data.data.gmReport3)
    newList.push(gmNew.data.data.gmReport4)
    newList.push(gmNew.data.data.gmReport5)
    newList.push(gmNew.data.data.gmReport6)
    newList.push(gmNew.data.data.gmReport7)
    newList.push(gmNew.data.data.gmReport8)
    newList.push(gmNew.data.data.gmReport9)
    newList.push(gmNew.data.data.gmReport10)
    newList.push(gmNew.data.data.gmReport11)
    newList.push(gmNew.data.data.gmReport12)
    newList.push(gmNew.data.data.gmReport13)
    newList.push(gmNew.data.data.gmReport14)
    newList.push(gmNew.data.data.gmReport15)
    newList.push(gmNew.data.data.gmReport16)
    newList.push(gmNew.data.data.gmReport17)
    newList.push(gmNew.data.data.gmReport18)
    newList.push(gmNew.data.data.gmReport19)
    newList.push(gmNew.data.data.gmReport20)
    newList.push(gmNew.data.data.gmReport21)
    newList.push(gmNew.data.data.gmReport22)
    newList.push(gmNew.data.data.gmReport23)
    newList.push(gmNew.data.data.gmReport24)
    newList.push(gmNew.data.data.gmReport25)
    newList.push(gmNew.data.data.gmReport26)
    newList.push(gmNew.data.data.gmReport27)
    newList.push(gmNew.data.data.gmReport28)
    newList.push(gmNew.data.data.gmReport29)
    newList.push(gmNew.data.data.gmReport30)
    newList.push(gmNew.data.data.gmReport31)
    newList.push(gmNew.data.data.gmReport32)
    newList.push(gmNew.data.data.gmReport33)
    newList.push(gmNew.data.data.gmReport34)
    newList.push(gmNew.data.data.gmReport35)
    newList.push(gmNew.data.data.gmReport36)
    newList.push(gmNew.data.data.gmReport37)
    newList.push(gmNew.data.data.gmReport38)
    newList.push(gmNew.data.data.gmReport39)
    newList.push(gmNew.data.data.gmReport40)
    newList.push(gmNew.data.data.gmReport41)
    newList.push(gmNew.data.data.gmReport42)
    newList.push(gmNew.data.data.gmReport43)
    newList.push(gmNew.data.data.gmReport44)
    newList.push(gmNew.data.data.gmReport45)
    newList.push(gmNew.data.data.gmReport46)
    newList.push(gmNew.data.data.gmReport47)
    newList.push(gmNew.data.data.gmReport48)
    newList.push(gmNew.data.data.gmReport49)
    newList.push(gmNew.data.data.gmReport50)
    newList.push(gmNew.data.data.gmReport51)
    newList.push(gmNew.data.data.gmReport52)

    setgmOldData(oldList)
    setgmNewData(newList)
    console.log("gm Old =>", gmOldData)
    console.log("gm New =>", gmNewData)
  }
  setLoading(false)

}

const exportBtn = () => {

  var org = orgSelect.length ? orgData.filter(org => orgSelect.includes(org.ORG_ID)).map(record => record.ORG_SHORTNAME).join(", ") :
    (sessionStorage.getItem('org') !== 'CPI-99' && !orgSelect.length) ? sessionStorage.getItem('orgName') : 'All Organizations'
  var proj = projectSelect.length ? projectData.filter(proj => projectSelect.includes(proj.PROJECT_ID)).map(record => record.PROJECT_NAME).join(", ") : 'All Projects'
  var cln = clinicSelect.length ? clinicData.filter(cln => clinicSelect.includes(cln.CLN_CODE)).map(record => record.CLN_NAME).join(", ") :
    (!clinicSelect.length && !tspSelect.length) ? 'All Clinics' : ' '
  var tsp = tspSelect.length ? tspData.filter(tsp => tspSelect.includes(tsp.TSP_ID)).map(record => record.TSP_NAME).join(", ") :
    (!clinicSelect.length && !tspSelect.length) ? 'All Townships' : ' '

  var wbb = XLSX.utils.book_new();
  var tbl = document.getElementById('gmtable');
  var wss = XLSX.utils.table_to_sheet(tbl, { origin: "A7" });
  XLSX.utils.sheet_add_aoa(wss, [["Organization : ", org], ["Project : ", proj], ["Clinic : ", cln], ["Township : ", tsp]], { origin: "A2" });
  XLSX.utils.book_append_sheet(wbb, wss, 'GMReport');
  XLSX.writeFile(wbb, "GMReport" + `_${moment(new Date()).format('DD-MM-YYYY')}` + '.xlsx');
}

const clearBtn = () => {
  setType(1)
  setOrgSelect([])
  setProjectSelect([])
  setClinicSelect([])
  setTspSelect([])
  setStartDate('')
  setEndDate('')
}

useEffect(async () => {
  setLoading(true)

  let cData = []
  let cDt = []

  let donorAndTsp = await lg.login()
  let pData = await donorAndTsp.data.data.getAllProjectInLogIn
  let township = await donorAndTsp.data.data.getAllTownship
  let org = await orgQuery.getAllOrgAndClinic()
  let orgDt = await org.data.data.getAllOrg

  if (sessionStorage.getItem('role') === '3') {
    cDt = await org.data.data.getAllClinic
  }
  else {
    cData = await clinic.getClinicByOrgProj()
    cDt = await cData.data.data.getClinicByOrgProj
  }

  if (cDt && pData && orgDt && township) {

    setClinicData(cDt)
    setProjectData(pData)
    setTspData(township)
    setOrgData(orgDt)
  }
  setLoading(false)

}, [])

  return (
    <>
    <Modals open={loading} />
      <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
        General Mobility Report </Typography>
        <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={6} sm={4} md={'auto'} >
          <CustomUnicefTextField
            id="filled-basic"
            size='small'
            type="date"
            style={{ width: '90%' }}
            label={<Grid row container><Typography color="#482642">Start Date </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642' },
              shrink: true
            }}
            onChange={e => setStartDate(e.target.value)}
            value={startDate} />
        </Grid>
        <Grid item xs={6} sm={4} md={'auto'}>
          <CustomUnicefTextField
            id="filled-basic"
            type="date"
            size='small'
            style={{ width: '90%' }}
            label={<Grid row container><Typography color="#482642">End Date </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642' },
              shrink: true
            }}
            onChange={e => setEndDate(e.target.value)}
            value={endDate} />
        </Grid>
        {sessionStorage.getItem('role') === '3' &&
          <ThemeProvider theme={radioTheme}>
            <Grid item xs={6} sm={4} md={'auto'} style={{ minWidth: "160px", maxWidth: "160px" }}>
              <FormControl size='small' variant="filled" style={{ width: '90%' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose Org</Typography>}</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  style={{ width: '100%' }}
                  size='small'
                  multiple
                  renderValue={
                    (orgSelect) =>
                      orgData.filter(org => orgSelect.includes(org.ORG_ID)).map(record => record.ORG_SHORTNAME).join(", ")}
                  value={orgSelect}
                  onChange={orgSelectHandle}
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

                  {orgData.length /* && type === 'Org' */ &&
                    orgData.map((option) => (
                      <MenuItem value={option.ORG_ID} key={option.ORG_ID} classes={{ selected: classes.selected }}>
                        {option.ORG_SHORTNAME}
                      </MenuItem>
                    ))}

                </Select>
              </FormControl>
            </Grid>
          </ThemeProvider>
        }


        <Grid item xs={6} sm={4} md={'auto'} style={{ minWidth: "200px", maxWidth: "200px" }}>
          <ThemeProvider theme={radioTheme}>
            <FormControl size='small' variant="filled" style={{ width: '90%' }}>
              <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose Project </Typography>}</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                style={{ width: '100%' }}
                size='small'
                multiple
                renderValue={
                  (projectSelect) =>
                    projectData.filter(proj => projectSelect.includes(proj.PROJECT_ID)).map(record => record.PROJECT_NAME).join(", ")}
                value={projectSelect}
                onChange={projectSelectHandle}
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

                {projectData.length /* && type === 'Project' */ &&
                  projectData.map((option) => (
                    <MenuItem value={option.PROJECT_ID} key={option.PROJECT_ID} classes={{ selected: classes.selected }}>
                      {option.PROJECT_NAME}
                    </MenuItem>
                  ))}

              </Select>
            </FormControl>
          </ThemeProvider>
        </Grid>

        <Grid item xs={6} sm={4} md={'auto'} style={{ minWidth: "150px", maxWidth: "150px" }}>
          <ThemeProvider theme={radioTheme}>
            <FormControl size='small' variant="filled" style={{ width: '90%' }}>
              <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Choose Type</Typography>
                <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                style={{ width: '100%' }}
                size='small'
                value={type}
                onChange={typeHandle}
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
                <MenuItem value={1}>All</MenuItem>
                <MenuItem value={'Township'}>By Township</MenuItem>
                <MenuItem value={'Clinic'}>By Clinic</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
        </Grid>
        {type === 'Clinic' &&
          <Grid item xs={6} sm={4} md={'auto'} style={{ minWidth: "200px", maxWidth: "200px" }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl size='small' variant="filled" style={{ width: '90%' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose {type} </Typography>}</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  style={{ width: '100%' }}
                  size='small'
                  multiple

                  renderValue={
                    (clinicSelect) =>
                      clinicData.filter(cln => clinicSelect.includes(cln.CLN_CODE)).map(record => record.CLN_NAME).join(", ")}
                  value={clinicSelect}
                  onChange={clinicSelectHandle}
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

                  {clinicData.length && type === 'Clinic' &&
                    clinicData.map((option) => (
                      <MenuItem value={option.CLN_CODE} key={option.CLN_CODE} classes={{ selected: classes.selected }}>
                        {option.CLN_NAME}
                      </MenuItem>
                    ))}

                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>
        }
        {type === 'Township' &&
          <Grid item xs={6} sm={4} md={'auto'} style={{ minWidth: "200px", maxWidth: "200px" }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl size='small' variant="filled" style={{ width: '90%' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose {type} </Typography>}</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  style={{ width: '100%' }}
                  size='small'
                  multiple

                  renderValue={
                    (tspSelect) =>
                      tspData.filter(tsp => tspSelect.includes(tsp.TSP_ID)).map(record => record.TSP_NAME).join(", ")}
                  value={tspSelect}
                  onChange={tspSelectHandle}
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

                  {tspData.length && type === 'Township' &&
                    tspData.map((option) => (
                      <MenuItem value={option.TSP_ID} key={option.TSP_ID} classes={{ selected: classes.selected }}>
                        {option.TSP_NAME}
                      </MenuItem>
                    ))}

                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>
        }
        <Grid item xs={6} sm={4} md={'auto'}>
          <IconButton onClick={reportBtn} style={{ background: '#482642', color: '#fff', borderRadius: 10, width: '90%' }}>
            <CheckIcon />
          </IconButton>
        </Grid>
        {(gmNewData.length && gmOldData.length) ?
          <Grid item xs={6} sm={4} md={'auto'}>
            <IconButton onClick={exportBtn} style={{ background: '#482642', color: '#fff', borderRadius: 10, width: '90%' }}>
              <GetAppIcon />
            </IconButton>
          </Grid> : null}

        <Grid item xs={6} sm={4} md={'auto'}>
          <IconButton onClick={clearBtn} style={{ background: 'lightgray', color: 'gray', borderRadius: 10, width: '90%' }}>
            <ClearIcon />
          </IconButton>
        </Grid>

        </Grid>
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Table id="gmtable" size="small" className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell align="center" rowSpan={2} colSpan={2} className={classes.indicatorTitle}> Indicators </TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>Age0-2M</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>2-12M</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>1-4Yr</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>5-9Yr</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>10-14Yr</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>15-18Yr</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>19-24Yr</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>25-49Yr</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>50-59Yr</TableCell>
              <TableCell align="center" colSpan={2} className={classes.title1}>60&Above</TableCell>
              <TableCell align="center" colSpan={2} className={classes.titleTotal1}>Total</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
              <TableCell align="center" className={classes.title2}>M</TableCell>
              <TableCell align="center" className={classes.title2}>F</TableCell>
            </TableRow>
          </TableBody>
          {(gmNewData.length && gmOldData.length) ?
          <TableBody>
          {indicator.map((indi, index) => (
            <>
              <TableRow>
                <TableCell align="center" rowSpan={2} className={classes.indicatorName}>
                  {indi}
                </TableCell>
                <TableCell align="center" className={classes.newOldTitle}>New</TableCell>
                { gmNewData[index].map((data) => (
                  <>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE0F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE0M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE1F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE1M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE2F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE2M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE5F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE5M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE10F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE10M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE15F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE15M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE19F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE19M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE25F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE25M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE50F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE50M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE60F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE60M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.FTOTAL}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.MTOTAL}</TableCell>
                  </>
                )) }
              </TableRow>
              <TableRow>
                <TableCell align="center" className={classes.newOldTitle}>Old</TableCell>
                { gmOldData[index].map((data) => (
                  <>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE0F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE0M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE1F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE1M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE2F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE2M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE5F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE5M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE10F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE10M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE15F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE15M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE19F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE19M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE25F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE25M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE50F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE50M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE60F}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.AGE60M}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.FTOTAL}</TableCell>
                    <TableCell align="center" className={classes.newOldTitle}>{data.MTOTAL}</TableCell>
                  </>
                ))}
              </TableRow>
            </>
          ))}

        </TableBody> :
          <TableBody>
          {indicator.map((indi, index) => (
            <>
              <TableRow>
                <TableCell align="center" rowSpan={2} className={classes.indicatorName}>
                  {indi}
                </TableCell>
                <TableCell align="center" className={classes.newOldTitle}>New</TableCell>
                {defaultArr.map((i)=>
                defaultValue())}
              </TableRow>
              <TableRow>
                <TableCell align="center" className={classes.newOldTitle}>Old</TableCell>
                {defaultArr.map((i)=>
                defaultValue())}
              </TableRow>
            </>
          ))}

        </TableBody>}
          
        </Table>
      </div>
    </>
  )
}
