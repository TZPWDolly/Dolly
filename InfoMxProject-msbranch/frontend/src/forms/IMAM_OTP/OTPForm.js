import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';

import CustomUnicefTable from '../../components/controls/CustomUnicefTable'
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomizedSnackbars from '../../components/controls/CustomSnackBar';
import Modals from "../../components/modal";
import _ from 'lodash';
import moment from "moment";

/////////////////////API////////////////////
import { getUnicefClinic } from '../../modals/unicefClinic'
import { insertIMAM } from '../../modals/imaminfo';

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

export default function OTPForm() {

  let wfh = "WFH < -3 Z/ MUAC < 115 mm"

  const classes = useStyles();

  const history = useHistory();

  ///////Background Data///////////
  const [loading, setLoading] = useState(false);
  const [clinicData, setClinicData] = useState([]);
  const [clinicCode, setClinicCode] = useState('')
  const [divCode, setDivCode] = useState('')
  const [tspCode, setTspCode] = useState('')
  const [divName, setDivName] = useState('')
  const [tspName, setTspName] = useState('')

  const [newCase, setNewCase] = useState('')
  const [imamGVal, setImamGVal] = useState('')
  const [imamHVal, setImamHVal] = useState('')
  const [imamJVal, setImamJVal] = useState('')
  const [imamKVal, setImamKVal] = useState('')

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [successSnack, setSuccessSnack] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)

  const [formData, setFormData] = useState(
    {
      IMAMDONOR: '',
      IMAMORG: '',
      IMAMPROJECT: '',
      IMAMCLNID: '',
      IMAMDIVID: '',
      IMAMTSPID: '',
      IMAMPROVIDEDDATE: '',
      IMAMB: '',
      IMAMNEWCASE: '',
      IMAMC1: '',
      IMAMC2: '',
      IMAMD: '',
      IMAME: '',
      IMAMF: '',
      IMAMG: '',
      IMAMH: '',
      IMAMH1: '',
      IMAMH2: '',
      IMAMH3: '',
      IMAMH4: '',
      IMAMH5: '',
      IMAMI: '',
      IMAMJ: '',
      IMAMK: '',
      IMAMAVGRATE: '',
      IMAMAVGTRMT: '',
      IMAMUSRLOGIN: '',
      IMAMINSERT: '',
      IMAMUPDATE: '',
      IMAMSTATUS: '',
      IMAMSYNC: '',
    }
  )

  ////////////Handle Change//////////////////////////
  const clinicHandleChange = (event) => {
    setClinicCode(event.target.value)
    let cData = _.find(clinicData, ['CLN_ID', event.target.value]);
    formData.IMAMCLNID = event.target.value
    formData.IMAMTSPID = cData.TSP_ID
    setTspCode(cData.TSP_ID)
    setTspName(cData.TSP_NAME)
    formData.IMAMDIVID = cData.DIV_ID
    setDivCode(cData.DIV_ID)
    setDivName(cData.DIV_NAME)
    console.log("Selected Clinic => ", event.target.value)
  };

  const setSuccessSnackBarOpen = () => {
    setSuccessSnack(true)
  }

  const setSuccessSnackBarClose = () => {
    setSuccessSnack(false)
  }

  const setSnackBarOpen = () => {
    setOpenSnack(true)
  }

  const setSnackBarClose = () => {
    setOpenSnack(false)
  }

  const save = async () => {

    let valid = !formData.IMAMPROVIDEDDATE ? "????????????????????????????????????????????? ??????????????????????????????????????????????????????" :
      'valid';

      
      
      if (valid === 'valid') {
        formData.IMAMUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      formData.IMAMINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

      var imab = formData.IMAMB === ''? 0 : formData.IMAMB
      formData.IMAMB = imab
      var imanc = newCase === ''? 0 : newCase
      formData.IMAMNEWCASE = imanc
      var imac1 = formData.IMAMC1 === ''? 0 : formData.IMAMC1
      formData.IMAMC1 = imac1
      var imac2 = formData.IMAMC2 === ''? 0 : formData.IMAMC2
      formData.IMAMC2 = imac2
      var imad = formData.IMAMD === ''? 0 : formData.IMAMD
      formData.IMAMD = imad
      var imae = formData.IMAME === ''? 0 : formData.IMAME
      formData.IMAME = imae
      var imaf = formData.IMAMF === ''? 0 : formData.IMAMF
      formData.IMAMF = imaf
      var imag = imamGVal === ''? 0 : imamGVal
      formData.IMAMG = imag
      var imah = imamHVal === ''? 0 : imamHVal
      formData.IMAMH = imah
      var imah1 = formData.IMAMH1 === ''? 0 : formData.IMAMH1
      formData.IMAMH1 = imah1
      var imah2 = formData.IMAMH2 === ''? 0 : formData.IMAMH2
      formData.IMAMH2 = imah2
      var imah3 = formData.IMAMH3 === ''? 0 : formData.IMAMH3
      formData.IMAMH3 = imah3
      var imah4 = formData.IMAMH4 === ''? 0 : formData.IMAMH4
      formData.IMAMH4 = imah4
      var imah5 = formData.IMAMH5 === ''? 0 : formData.IMAMH5
      formData.IMAMH5 = imah5
      var imai = formData.IMAMI === ''? 0 : formData.IMAMI
      formData.IMAMI = imai
      var imaj = imamJVal === ''? 0 : imamJVal
      formData.IMAMJ = imaj
      var imak = imamKVal === ''? 0 : imamKVal
      formData.IMAMK = imak
      var imaGrate = formData.IMAMAVGRATE === ''? 0 : formData.IMAMAVGRATE
      formData.IMAMAVGRATE = imaGrate
      var imaGtrmt = formData.IMAMAVGTRMT === ''? 0 : formData.IMAMAVGTRMT
      formData.IMAMAVGTRMT = imaGtrmt   
        const rhres = await insertIMAM({formData});
         if (rhres?.status === 200) {
             sessionStorage.setItem('homeSave', 'done')
            setSuccess("Successfully inserted a patient's IMAMOTP Service")
            setSuccessSnack(true)
            history.push({
                pathname: "entryhomepage",
                openOTPSaveSnackbar: true
            }); 
        }
        console.log("formData => ", formData)
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

  useEffect(() => {

    let imab = formData.IMAMB === '' ? 0 : parseInt(formData.IMAMB)
    let imac1 = formData.IMAMC1 === '' ? 0 : parseInt(formData.IMAMC1)
    let imac2 = formData.IMAMC2 === '' ? 0 : parseInt(formData.IMAMC2)
    let imad = formData.IMAMD === '' ? 0 : parseInt(formData.IMAMD)
    let imae = formData.IMAME === '' ? 0 : parseInt(formData.IMAME)
    let imaf = formData.IMAMF === '' ? 0 : parseInt(formData.IMAMF)
    let imah1 = formData.IMAMH1 === '' ? 0 : parseInt(formData.IMAMH1)
    let imah2 = formData.IMAMH2 === '' ? 0 : parseInt(formData.IMAMH2)
    let imah3 = formData.IMAMH3 === '' ? 0 : parseInt(formData.IMAMH3)
    let imah4 = formData.IMAMH4 === '' ? 0 : parseInt(formData.IMAMH4)
    let imah5 = formData.IMAMH5 === '' ? 0 : parseInt(formData.IMAMH5)
    let imai = formData.IMAMI === '' ? 0 : parseInt(formData.IMAMI)
    //console.log("C1+C2 => ",imac1+imac2)
    setNewCase(imac1 + imac2)
    setImamGVal(imac1 + imac2 + imad + imae + imaf)
    setImamHVal(imah1 + imah2 + imah3 + imah4 + imah5)
    setImamJVal(imah1 + imah2 + imah3 + imah4 + imah5 + imai)
    setImamKVal((imab + imac1 + imac2 + imad + imae + imaf) - (imah1 + imah2 + imah3 + imah4 + imah5 + imai))

  }, [formData.IMAMH1, formData.IMAMH2, formData.IMAMH3, formData.IMAMH4, formData.IMAMH5, formData.IMAMI, formData.IMAMB, formData.IMAMC1, formData.IMAMC2, formData.IMAMD, formData.IMAME, formData.IMAMF])

  useEffect(async () => {

    setLoading(true)
    let clinic = await getUnicefClinic()
    if (clinic.data.data.getUnicefClinic.length) {
      console.log("Unicef Clinic Data ========> ", clinic)
      setClinicData(clinic.data.data.getUnicefClinic)
      setTspCode(clinic.data.data.getUnicefClinic[0].TSP_ID)
      setDivCode(clinic.data.data.getUnicefClinic[0].DIV_ID)
      setTspName(clinic.data.data.getUnicefClinic[0].TSP_NAME)
      setDivName(clinic.data.data.getUnicefClinic[0].DIV_NAME)

      setFormData({
        ...formData,
        IMAMPROVIDEDDATE: moment(new Date()).format("YYYY-MM-DD"),
        IMAMDONOR: sessionStorage.getItem('donor'),
        IMAMORG: sessionStorage.getItem('org'),
        IMAMPROJECT: sessionStorage.getItem('project'),
        IMAMCLNID: clinic.data.data.getUnicefClinic[0].CLN_ID,
        IMAMDIVID: clinic.data.data.getUnicefClinic[0].DIV_ID,
        IMAMTSPID: clinic.data.data.getUnicefClinic[0].TSP_ID,
        IMAMUSRLOGIN: sessionStorage.getItem('userName'),
        IMAMSTATUS: 1,
        IMAMSYNC: '0',
      })
    }
    setLoading(false)

  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', background: '#fcf0f2' }}>
      <Modals open={loading} />
      {successSnack && <CustomizedSnackbars open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
      {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      <Typography variant="h6" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
        (OTP) ?????????????????????????????????????????? ??????????????????????????? ??????????????????????????????????????? ????????????????????? ??????????????????????????????</Typography>
      <CustomUnicefTable />
      <Grid container style={{ marginTop: '20px' }} >
        <Grid row container style={{ alignContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????????????????????????????????????????????????????????????????? </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              select
              value={clinicCode}
              onChange={clinicHandleChange}
              variantText="filled"
              style={{ width: '90%' }}
              InputLabelProps={{
                style: { color: '#482642' },
                shrink: true
              }}
              SelectProps={{
                native: true
              }}>
              {clinicData.length &&
                clinicData.map((option) => (
                  <option key={option.CLN_ID} value={option.CLN_ID}>
                    {option.CLN_NAME}
                  </option>
                ))}
            </CustomUnicefTextField>
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????????????????? </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              disabled
              value={tspName}
              style={{ width: '90%' }} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????????????????????????????????/????????????????????? </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              disabled
              value={divName}
              style={{ width: '90%' }} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">????????????????????????????????????????????? </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              type="date"
              style={{ width: '90%' }}
              onChange={e => setFormData({ ...formData, IMAMPROVIDEDDATE: e.target.value })}
              value={formData.IMAMPROVIDEDDATE} />
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
        ???????????? ?????????????????? (???-?????? ???)</Typography>

      <Grid container style={{ marginTop: '20px', background: '#fcf0f2' }} >
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">??? ???????????????????????????????????? ???????????????????????? </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              type="number"
              variantText="filled"
              inputProps={{ step: "1", min: 0, maxLength: 5 }}
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMB: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMB: e.target.value })
              }}
              value={formData.IMAMB} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">{wfh}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              type="number"
              variantText="filled"
              inputProps={{ step: "1", min: 0, maxLength: 5 }}
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMC1: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMC1: e.target.value })
              }}
              value={formData.IMAMC1} />
            <Typography variant="subtitle2" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }} color="#482642">
              ???????????? ???????????? - {newCase}
            </Typography>

          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">Oedema +/++ </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              type="number"
              variantText="filled"
              inputProps={{ step: "1", min: 0, maxLength: 5 }}
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMC2: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMC2: e.target.value })
              }}
              value={formData.IMAMC2} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????????????????? ??????????????? ???????????????????????????????????? ????????? ????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMD: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMD: e.target.value })
              }}
              value={formData.IMAMD} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????????????????????????????? ?????????????????? ???????????????????????????????????? ????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAME: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAME: e.target.value })
              }}
              value={formData.IMAME} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">SFP/???????????????OTP/ITP ?????? ????????????????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMF: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMF: e.target.value })
              }}
              value={formData.IMAMF} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }}>??????????????????????????????????????? ????????????????????????????????? ???????????????????????? ??????????????? ??????????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              disabled
              style={{ width: '90%' }}
              value={imamGVal} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">??????????????????????????????????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMH1: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMH1: e.target.value })
              }}
              value={formData.IMAMH1} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">????????????????????????????????????????????????????????????????????? ???????????????????????? ????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMH2: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMH2: e.target.value })
              }}
              value={formData.IMAMH2} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????????????????????????????????????????????????????? ????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMH3: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMH3: e.target.value })
              }}
              value={formData.IMAMH3} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">?????????????????? ??????????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMH4: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMH4: e.target.value })
              }}
              value={formData.IMAMH4} />
            <Typography color="#482642" variant="subtitle2" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>??????????????????????????? ?????????????????????????????????????????? ?????????????????????????????? - {imamHVal}</Typography>
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????? ???????????????????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMH5: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMH5: e.target.value })
              }}
              value={formData.IMAMH5} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">???????????????OTP/ ITP ???????????? ???????????????????????????????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMI: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMI: e.target.value })
              }}
              value={formData.IMAMI} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }} color="#482642">??????????????????????????????????????? ???????????????????????? ?????????????????????????????? ??????????????????????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              disabled
              style={{ width: '90%' }}
              value={imamJVal} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }} color="#482642">??????????????? ???????????? ?????????????????? ????????????</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              disabled
              style={{ width: '90%' }}
              value={imamKVal} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '10px' }}>
              <Typography color="#482642">??????????????????????????????????????????????????????????????? ???????????????????????? ??????????????? ??????????????????????????? ?????????????????????????????????????????? ???????????????????????????????????????????????? (g/kg/d) (??? - ?????? ?????????????????? ???????????????????????????????????????????????????????????????????????????)</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMAVGRATE: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMAVGRATE: e.target.value })
              }}
              value={formData.IMAMAVGRATE} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '12px' }}>
              <Typography color="#482642">???????????????????????????????????????????????????????????? ??????????????????????????? ??????????????????????????????????????????????????? (??? -?????? ??? ??????????????????????????????)</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMAVGTRMT: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMAVGTRMT: e.target.value })
              }}
              value={formData.IMAMAVGTRMT} />
          </Grid>
        </Grid>

      </Grid>
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ paddingTop: '25px', background: '#fcf0f2' }} row>
        <Grid item xs={'auto'} style={{ width: '15%' }}>
          <Button
            variant="contained"
            style={{ background: '#482642', color: '#fff', width: '100%' }}
            onClick={save} >Save</Button>
        </Grid>
        <Grid item xs={'auto'} style={{ width: '15%' }}>
          <Button
            variant="contained"
            style={{ background: '#482642', color: '#fff', width: '100%' }}
            onClick={cancle} >Cancel</Button>
        </Grid>
      </Grid>
    </div>
  )
}