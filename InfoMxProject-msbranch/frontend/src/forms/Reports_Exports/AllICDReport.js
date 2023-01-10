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
import * as icdRp from '../../modals/allicdreport'

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
    width: '70vw',
    maxWidth: '70vw',
    borderCollapse: 'collapse',
    margin: 'auto',
    marginTop: '10px'
  },
  indicatorTitle: {
    width: '50vw',
    maxWidth: '50vw',
    height: '3vw',
    fontSize: '1vw',
    background: '#6C5268',
    color: '#FCF0F2',
    borderRadius: '5px 0px 0px 0px',
    border: '1px solid lightgray',

  },
  title1: {
    width: '20vw',
    maxWidth: '20vw',
    height: '3vw',
    fontSize: '1vw',
    background: '#6C5268',
    color: '#FCF0F2',
    borderRadius: '0px 5px 0px 0px',
    border: '1px solid lightgray',

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
    width: '50vw',
    maxWidth: '50vw',
    height: '2vw',
    fontSize: '0.8vw',
    background: '#DED4DA',
    color: '#482642',
    border: '0.5px solid #C8AFAF',
    fontWeight: 'lightBold'
  },
  newOldTitle: {
    width: '20vw',
    maxWidth: '20vw',
    height: '2vw',
    fontSize: '0.8vw',
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

export default function AllICDReport() {

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
    'Number of women receiving ANC (at least four visit)',
    'Number of women receiving ANC (at least one visit)',
    'Number of pregnant women who received B1 supplementation at least 30 tabs after 36 weeks of gestation',
    'Number of antenatal mothers who received iron supplements',
    'Number of women who received CDK',
    'Number of deliveries attended by trained RHWs or by trained health personnels',
    'Number of women receiving PNC at least one visit after delivery by trained RHWs',
    'Number of women receiving FP services within 42days after delivery',
    'Number of individual using modern contraceptive methods',
    'Number of individual using modern contraceptive method COC',
    'Number of individual using modern contraceptive method Depo',
    'Number of individual using modern contraceptive method EC',
    'Number of individual using modern contraceptive method Condom',
    'Number of individual who received referal service for long-term modern contraceptive method IUD-Imp and Sterilization',
    'Number of individual receiving FP counseling only',
    'Number of women receiving post abortion care',
    'Number of baby who got NBC provided by RHWs',
    'Number of baby who had been referred to higher facilities'
  ]
  const [icdData, seticdData] = useState([])
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
    var icd = await icdRp.allicdReport({ parameter, select, type:0});
    var icdList = []

    if (icd) {
      icdList.push(icd.data.data.icdReportOne)
      icdList.push(icd.data.data.icdReportTwo)
      icdList.push(icd.data.data.icdReportThree)
      icdList.push(icd.data.data.icdReportFour)
      icdList.push(icd.data.data.icdReportFive)
      icdList.push(icd.data.data.icdReportSix)
      icdList.push(icd.data.data.icdReportSeven)
      icdList.push(icd.data.data.icdReportEight)
      icdList.push(icd.data.data.icdReportNine)
      icdList.push(icd.data.data.icdReportTen)
      icdList.push(icd.data.data.icdReportEleven)
      icdList.push(icd.data.data.icdReportTwelve)
      icdList.push(icd.data.data.icdReportThirteen)
      icdList.push(icd.data.data.icdReportFourteen)
      icdList.push(icd.data.data.icdReportFifteen)
      icdList.push(icd.data.data.icdReportSixteen)
      icdList.push(icd.data.data.icdReportSeventeen)
      icdList.push(icd.data.data.icdReportEighteen)
      seticdData(icdList)
      console.log("icd  =>", icdList)
      
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
    var tbl = document.getElementById('icdtable');
    var wss = XLSX.utils.table_to_sheet(tbl, { origin: "A7" });
    XLSX.utils.sheet_add_aoa(wss, [["Organization : ", org], ["Project : ", proj], ["Clinic : ", cln], ["Township : ", tsp]], { origin: "A2" });
    XLSX.utils.book_append_sheet(wbb, wss, 'AllICD_Report');
    XLSX.writeFile(wbb, "AllICD_Report" + `_${moment(new Date()).format('DD-MM-YYYY')}` + '.xlsx');
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
        All ICD Report </Typography>
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
        {(icdData.length) ?
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
        <Table id="icdtable" size="small" className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell align="center" className={classes.indicatorTitle}> Description </TableCell>
              <TableCell align="center" className={classes.title1}>Result</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>

            {indicator.map((indi, index) => (
              <>
                <TableRow>
                  <TableCell align="center" className={classes.indicatorName}>
                    {indi}
                  </TableCell>
                  {icdData.length ? icdData[index].map((data) => (
                    <TableCell align="center" className={classes.newOldTitle}>
                    {data.RES}
                  </TableCell>
                  )) : defaultValue()}
                  
                </TableRow>
              </>
            ))}

          </TableBody>
        </Table>
      </div>
    </>
  )
}
