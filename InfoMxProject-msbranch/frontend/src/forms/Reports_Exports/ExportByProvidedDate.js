import { Button, createTheme, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, ThemeProvider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomSnackBar from "../../components/controls/CustomSnackBar";
import Modals from "../../components/modal";
import XLSX from 'xlsx'

/////////////////API////////////////////////
import * as clinic from "../../modals/clinicbyorgproj"
import * as lg from '../../modals/login'
import * as orgQuery from '../../modals/getallorgclinic'
import { exportAllTable } from '../../modals/exportalltable';
import * as exportProject from '../../modals/exportbyproject'

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
      main: "#ffff"
    }
  }
});

export default function ExportByProvidedDate() {

  const classes = useStyles();

  const [type, setType] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [clinicData, setClinicData] = useState([])
  const [orgData, setOrgData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [tspData, setTspData] = useState([])
  const [select, setSelect] = useState([])
  const [error, setError] = useState('')
  const [openSnack, setOpenSnack] = useState(false)

  const typeHandle = async (event) => {
    setType(event.target.value);
    setSelect([])
  };

  const selectHandle = (event) => {
    setSelect(event.target.value);
    console.log("Seelct event => ", select)
  };

  const setSnackBarOpen = () => {
    setOpenSnack(true)
  }

  const setSnackBarClose = () => {
    setOpenSnack(false)
  }

  const exportBtn = async () => {

    const org = sessionStorage.getItem('org')
    const proj = sessionStorage.getItem('project')
    const parameter = {
      orgID: sessionStorage.getItem('org'),
      projID: sessionStorage.getItem('project'),
      sDate: startDate,
      eDate: endDate
    }

    let valid = !startDate ? "Please Choose Start Date" :
      !endDate ? "Please Choose End Date" :
        type === 'Org' && !select.length ? "Please choose at least one organization" :
          type === 'Project' && !select.length ? "Please choose at least one project" :
            type === 'Township' && !select.length ? "Please choose at least one township" :
              type === 'Clinic' && !select.length ? "Please choose at least one clinic" :
                'valid';

    if (valid === 'valid') {
      setLoading(true)

      var wb = await XLSX.utils.book_new();
      var allTableRes = [];
      if (type === 1) {
        allTableRes = await exportAllTable(parameter);
      }
      else {
        allTableRes = await exportProject.exportByProject({ parameter, select, type });
      }

      if (allTableRes) {

        var reg = XLSX.utils.json_to_sheet(allTableRes.data.data.getRegTable);
        var oreg = XLSX.utils.json_to_sheet(allTableRes.data.data.getORegTable);
        var anc = XLSX.utils.json_to_sheet(allTableRes.data.data.getANCTable);
        var delivery = XLSX.utils.json_to_sheet(allTableRes.data.data.getDeliTable);
        var pnc = XLSX.utils.json_to_sheet(allTableRes.data.data.getPNCTable);
        var fp = XLSX.utils.json_to_sheet(allTableRes.data.data.getFPTable);
        var rh = XLSX.utils.json_to_sheet(allTableRes.data.data.getRHTable);
        var gm = XLSX.utils.json_to_sheet(allTableRes.data.data.getGMTable);
        var opdMed = XLSX.utils.json_to_sheet(allTableRes.data.data.getOPDMedTable);
        var opdSur = XLSX.utils.json_to_sheet(allTableRes.data.data.getOPDSurTable);
        var ipd = XLSX.utils.json_to_sheet(allTableRes.data.data.getIPDTable);
        var lab = XLSX.utils.json_to_sheet(allTableRes.data.data.getLabTable);
        var imam = XLSX.utils.json_to_sheet(allTableRes.data.data.getIMAMTable);
        var imamsfp = XLSX.utils.json_to_sheet(allTableRes.data.data.getIMAMSFPTable);

        if (org === 'CPI-16') //reg, anc,delivery,fp,lab, opd (medical),opd-surgery,ipd
        {
          XLSX.utils.book_append_sheet(wb, reg, "RegByService");
          XLSX.utils.book_append_sheet(wb, anc, "ANC");
          XLSX.utils.book_append_sheet(wb, delivery, "Delivery");
          XLSX.utils.book_append_sheet(wb, fp, "FP");
          XLSX.utils.book_append_sheet(wb, opdMed, "OPD-Medical");
          XLSX.utils.book_append_sheet(wb, opdSur, "OPD-Surgery");
          XLSX.utils.book_append_sheet(wb, ipd, "IPD");
          XLSX.utils.book_append_sheet(wb, lab, "Lab");
        }
        else if ((org === 'CPI-05' || org === 'CPI-20' ) && proj === 'P-008'){
          XLSX.utils.book_append_sheet(wb, reg, "RegByService");
          XLSX.utils.book_append_sheet(wb, anc, "ANC");
          XLSX.utils.book_append_sheet(wb, delivery, "Delivery");
          XLSX.utils.book_append_sheet(wb, pnc, "PNC");
          XLSX.utils.book_append_sheet(wb, fp, "FP");
          XLSX.utils.book_append_sheet(wb, rh, "RH");
          XLSX.utils.book_append_sheet(wb, gm, "GM");
          XLSX.utils.book_append_sheet(wb, lab, "Lab");
          XLSX.utils.book_append_sheet(wb, oreg, "OnlyRegister");
        }
        else if (org === 'CPI-08' && proj === 'P-016') //reg, anc,delivery,pnc,fp, rh, gm , lab, imamotp, imamsfp
        {
          XLSX.utils.book_append_sheet(wb, reg, "RegByService");
          XLSX.utils.book_append_sheet(wb, anc, "ANC");
          XLSX.utils.book_append_sheet(wb, delivery, "Delivery");
          XLSX.utils.book_append_sheet(wb, pnc, "PNC");
          XLSX.utils.book_append_sheet(wb, fp, "FP");
          XLSX.utils.book_append_sheet(wb, rh, "RH");
          XLSX.utils.book_append_sheet(wb, gm, "GM");
          XLSX.utils.book_append_sheet(wb, imam, "IMAM");
          XLSX.utils.book_append_sheet(wb, imamsfp, "IMAM SFP");
          XLSX.utils.book_append_sheet(wb, lab, "Lab");
        }
        else if (org === 'CPI-15' && proj === 'P-016') //reg, gm, lab, imamotp, imamsfp.
        {
          XLSX.utils.book_append_sheet(wb, reg, "RegByService");
          XLSX.utils.book_append_sheet(wb, gm, "GM");
          XLSX.utils.book_append_sheet(wb, imam, "IMAM");
          XLSX.utils.book_append_sheet(wb, imamsfp, "IMAM SFP");
          XLSX.utils.book_append_sheet(wb, lab, "Lab");

        }
        else if (org === 'CPI-06' && proj === 'P-016') //imamotp, imamsfp
        {
          XLSX.utils.book_append_sheet(wb, imam, "IMAM");
          XLSX.utils.book_append_sheet(wb, imamsfp, "IMAM SFP");
        }
        else if (org === 'CPI-99') //all
        {
          XLSX.utils.book_append_sheet(wb, reg, "RegByService");
          XLSX.utils.book_append_sheet(wb, anc, "ANC");
          XLSX.utils.book_append_sheet(wb, delivery, "Delivery");
          XLSX.utils.book_append_sheet(wb, pnc, "PNC");
          XLSX.utils.book_append_sheet(wb, fp, "FP");
          XLSX.utils.book_append_sheet(wb, rh, "RH");
          XLSX.utils.book_append_sheet(wb, gm, "GM");
          XLSX.utils.book_append_sheet(wb, opdMed, "OPD-Medical");
          XLSX.utils.book_append_sheet(wb, opdSur, "OPD-Surgery");
          XLSX.utils.book_append_sheet(wb, ipd, "IPD");
          XLSX.utils.book_append_sheet(wb, imam, "IMAM");
          XLSX.utils.book_append_sheet(wb, imamsfp, "IMAM SFP");
          XLSX.utils.book_append_sheet(wb, lab, "Lab");
        }
        else if (org === 'CPI-63' || org === 'CPI-86' ){
          XLSX.utils.book_append_sheet(wb, reg, "RegByService");
          XLSX.utils.book_append_sheet(wb, anc, "ANC");
          XLSX.utils.book_append_sheet(wb, delivery, "Delivery");
          XLSX.utils.book_append_sheet(wb, pnc, "PNC");
          XLSX.utils.book_append_sheet(wb, fp, "FP");
          XLSX.utils.book_append_sheet(wb, rh, "RH");
          XLSX.utils.book_append_sheet(wb, gm, "GM");
          XLSX.utils.book_append_sheet(wb, lab, "Lab");
          XLSX.utils.book_append_sheet(wb, oreg, "OnlyRegister");
        }
        else //(reg,gm,fp,rh,anc,pnc,deli,lab)
        {
          XLSX.utils.book_append_sheet(wb, reg, "RegByService");
          XLSX.utils.book_append_sheet(wb, anc, "ANC");
          XLSX.utils.book_append_sheet(wb, delivery, "Delivery");
          XLSX.utils.book_append_sheet(wb, pnc, "PNC");
          XLSX.utils.book_append_sheet(wb, fp, "FP");
          XLSX.utils.book_append_sheet(wb, rh, "RH");
          XLSX.utils.book_append_sheet(wb, gm, "GM");
          XLSX.utils.book_append_sheet(wb, lab, "Lab");
        }

      }
      else {
        var empty = []
        XLSX.utils.book_append_sheet(wb, empty, "Empty");
      }

      XLSX.writeFile(wb, "InfoMxExportDataset.xlsx");

      setLoading(false)
    }
    else {
      setError(valid)
      setOpenSnack(true)
    }

  }

  const clear = () => {
    setSelect([])
    setStartDate('')
    setEndDate('')
    setType(1)
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
    <div style={{ width: '100%', height: '82.5vH', background: '#fcf0f2' }}>
      <Modals open={loading} />
      {openSnack && <CustomSnackBar open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      <ThemeProvider theme={radioTheme}>
        <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
          Export Dataset </Typography>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12} sm={6} md={3} style={{ margin: '2%', marginBlockStart: '5%' }}>
            <CustomUnicefTextField
              id="filled-basic"
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
          <Grid item xs={12} sm={6} md={3} style={{ margin: '2%', marginBlockStart: '5%' }}>
            <CustomUnicefTextField
              id="filled-basic"
              type="date"
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
        </Grid>
        <ThemeProvider theme={radioTheme}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={12} sm={6} md={3} style={{ margin: '2%' }}>
              <FormControl variant="filled" style={{ width: '90%' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Choose Type</Typography>
                  <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  style={{ width: '100%' }}
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
                  <MenuItem value={1}>All Tables</MenuItem>
                  {sessionStorage.getItem('role') === '3' && <MenuItem value={'Org'}>By Organization</MenuItem>}
                  <MenuItem value={'Project'}>By Project</MenuItem>
                  <MenuItem value={'Township'}>By Township</MenuItem>
                  <MenuItem value={'Clinic'}>By Clinic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {type === 'Org' &&
              <Grid item xs={12} sm={6} md={3} style={{ margin: '2%' }}>
                <FormControl variant="filled" style={{ width: '90%' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose {type} </Typography>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    style={{ width: '100%' }}
                    multiple

                    renderValue={
                      (selected) =>
                        orgData.filter(org => selected.includes(org.ORG_ID)).map(record => record.ORG_SHORTNAME).join(", ")}
                    value={select}
                    onChange={selectHandle}
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

                    {orgData.length && type === 'Org' &&
                      orgData.map((option) => (
                        <MenuItem value={option.ORG_ID} key={option.ORG_ID} classes={{ selected: classes.selected }}>
                          {option.ORG_SHORTNAME}
                        </MenuItem>
                      ))}

                  </Select>
                </FormControl>
              </Grid>
            }
            {(type === 'Clinic' && sessionStorage.getItem('role') === '3') &&
              <Grid item xs={12} sm={6} md={3} style={{ margin: '2%' }}>
                <FormControl variant="filled" style={{ width: '90%' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose {type} </Typography>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    style={{ width: '100%' }}
                    multiple

                    renderValue={
                      (selected) =>
                        clinicData.filter(cln => selected.includes(cln.CLN_ID)).map(record => record.CLN_NAME).join(", ")}
                    value={select}
                    onChange={selectHandle}
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
                        <MenuItem value={option.CLN_ID} key={option.CLN_ID} classes={{ selected: classes.selected }}>
                          {option.CLN_NAME}
                        </MenuItem>
                      ))}

                  </Select>
                </FormControl>
              </Grid>
            }

            {(type === 'Clinic' && sessionStorage.getItem('role') !== '3') &&
              <Grid item xs={12} sm={6} md={3} style={{ margin: '2%' }}>
                <FormControl variant="filled" style={{ width: '90%' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose {type} </Typography>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    style={{ width: '100%' }}
                    multiple

                    renderValue={
                      (selected) =>
                        clinicData.filter(cln => selected.includes(cln.CLN_CODE)).map(record => record.CLN_NAME).join(", ")}
                    value={select}
                    onChange={selectHandle}
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
              </Grid>
            }

            {type === 'Project' &&
              <Grid item xs={12} sm={6} md={3} style={{ margin: '2%' }}>
                <FormControl variant="filled" style={{ width: '90%' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose {type} </Typography>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    style={{ width: '100%' }}
                    multiple

                    renderValue={
                      (selected) =>
                        projectData.filter(proj => selected.includes(proj.PROJECT_ID)).map(record => record.PROJECT_NAME).join(", ")}
                    value={select}
                    onChange={selectHandle}
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

                    {projectData.length && type === 'Project' &&
                      projectData.map((option) => (
                        <MenuItem value={option.PROJECT_ID} key={option.PROJECT_ID} classes={{ selected: classes.selected }}>
                          {option.PROJECT_NAME}
                        </MenuItem>
                      ))}

                  </Select>
                </FormControl>
              </Grid>
            }
            {type === 'Township' &&
              <Grid item xs={12} sm={6} md={3} style={{ margin: '2%' }}>
                <FormControl variant="filled" style={{ width: '90%' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Typography color="#482642">Choose {type} </Typography>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    style={{ width: '100%' }}
                    multiple

                    renderValue={
                      (selected) =>
                        tspData.filter(tsp => selected.includes(tsp.TSP_ID)).map(record => record.TSP_NAME).join(", ")}
                    value={select}
                    onChange={selectHandle}
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
              </Grid>
            }

          </Grid>
        </ThemeProvider>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12} sm={6} md={3} style={{ margin: '2%' }}>
            <FormControl variant="filled" style={{ width: '90%' }}>
              <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Export By</Typography>
                <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                style={{ width: '100%' }}
                /* value={type}
                onChange={typeHandle} */
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
                <MenuItem value={1}>Selected Vairable</MenuItem>
                <MenuItem value={2}>Raw Data</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container alignItems="center" justifyContent="center" style={{ padding: '20px', background: '#fcf0f2' }} row>
            <Grid item xs={2} sm={2} md={2} style={{ width: '13%' }}>
              <Button
                variant="contained"
                style={{ background: '#482642', color: '#fff', width: '50%' }}
                onClick={exportBtn}  >Export</Button>
            </Grid>
            <Grid item xs={2} sm={2} md={2} style={{ width: '13%' }}>
              <Button
                variant="contained"
                style={{ background: '#482642', color: '#fff', width: '50%' }}
                onClick={clear} >Clear</Button>
            </Grid>
          </Grid>
        </Grid>



      </ThemeProvider>
    </div>
  )
}