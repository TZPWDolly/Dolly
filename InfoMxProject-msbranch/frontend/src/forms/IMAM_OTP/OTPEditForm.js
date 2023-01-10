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
import { insertIMAM, updateIMAM } from '../../modals/imaminfo';
import * as serviceData from '../../modals/imamservicedatabyid'

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

export default function OTPEditForm() {

  let wfh = "WFH < -3 Z/ MUAC < 115 mm"

  const classes = useStyles();

  const history = useHistory();

  ///////Background Data///////////
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState([])
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
      IMAMUPDATE: '',
      IMAMSTATUS: '',
      IMAMSYNC: '',
      ID: ''
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

  const update = async () => {

    let valid = !formData.IMAMPROVIDEDDATE ? "အစီရင်ခံသည့်ကာလ ကိုရိုက်ထည့်ပေးပါ။" :
      'valid';

    

    if (valid === 'valid') {
      formData.IMAMUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

    var imab = formData.IMAMB === '' ? 0 : formData.IMAMB
    formData.IMAMB = imab
    var imanc = newCase === '' ? 0 : newCase
    formData.IMAMNEWCASE = imanc
    var imac1 = formData.IMAMC1 === '' ? 0 : formData.IMAMC1
    formData.IMAMC1 = imac1
    var imac2 = formData.IMAMC2 === '' ? 0 : formData.IMAMC2
    formData.IMAMC2 = imac2
    var imad = formData.IMAMD === '' ? 0 : formData.IMAMD
    formData.IMAMD = imad
    var imae = formData.IMAME === '' ? 0 : formData.IMAME
    formData.IMAME = imae
    var imaf = formData.IMAMF === '' ? 0 : formData.IMAMF
    formData.IMAMF = imaf
    var imag = imamGVal === '' ? 0 : imamGVal
    formData.IMAMG = imag
    var imah = imamHVal === '' ? 0 : imamHVal
    formData.IMAMH = imah
    var imah1 = formData.IMAMH1 === '' ? 0 : formData.IMAMH1
    formData.IMAMH1 = imah1
    var imah2 = formData.IMAMH2 === '' ? 0 : formData.IMAMH2
    formData.IMAMH2 = imah2
    var imah3 = formData.IMAMH3 === '' ? 0 : formData.IMAMH3
    formData.IMAMH3 = imah3
    var imah4 = formData.IMAMH4 === '' ? 0 : formData.IMAMH4
    formData.IMAMH4 = imah4
    var imah5 = formData.IMAMH5 === '' ? 0 : formData.IMAMH5
    formData.IMAMH5 = imah5
    var imai = formData.IMAMI === '' ? 0 : formData.IMAMI
    formData.IMAMI = imai
    var imaj = imamJVal === '' ? 0 : imamJVal
    formData.IMAMJ = imaj
    var imak = imamKVal === '' ? 0 : imamKVal
    formData.IMAMK = imak
    var imaGrate = formData.IMAMAVGRATE === '' ? 0 : formData.IMAMAVGRATE
    formData.IMAMAVGRATE = imaGrate
    var imaGtrmt = formData.IMAMAVGTRMT === '' ? 0 : formData.IMAMAVGTRMT
    formData.IMAMAVGTRMT = imaGtrmt
      const rhres = await updateIMAM({ formData });
      if (rhres?.status === 200) {
        sessionStorage.setItem('homeSave', 'done')
        setSuccess("Successfully inserted a patient's IMAMOTP Service")
        setSuccessSnack(true)
        history.push({
          pathname: "entryhomepage",
          openOTPUpdateSnackbar: true
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

    if (sessionStorage.getItem('editOTPPatient') === 'true') {

      let clinic = await getUnicefClinic()
      let service = await serviceData.getServiceData()

      if (clinic.data.data.getUnicefClinic.length && service.data.data.getServiceData.length) {


        let serviceData = await service.data.data.getServiceData;

        setClinicData(clinic.data.data.getUnicefClinic)
        setPatientData(service.data.data.getServiceData)

        console.log("Unicef Data ========> ", clinic, serviceData)

        let cData = _.find(clinic.data.data.getUnicefClinic, ['CLN_ID', serviceData[0].IMAMCLNID]);
        setTspName(cData.TSP_NAME)
        setDivName(cData.DIV_NAME)


        formData.IMAMTSPID = serviceData[0].IMAMTSPID
        setTspCode(serviceData[0].IMAMTSPID)
        formData.IMAMDIVID = serviceData[0].IMAMDIVID
        setDivCode(serviceData[0].IMAMDIVID)

        formData.IMAMPROVIDEDDATE = moment(serviceData[0].IMAMPROVIDEDDATE).format("YYYY-MM-DD")
        formData.IMAMORG = serviceData[0].IMAMORG
        formData.IMAMDONOR = serviceData[0].IMAMDONOR
        formData.IMAMPROJECT = serviceData[0].IMAMPROJECT
        formData.IMAMUSRLOGIN = serviceData[0].IMAMUSRLOGIN
        formData.IMAMSYNC = serviceData[0].IMAMSYNC
        formData.ID = serviceData[0].ID

        formData.IMAMB = serviceData[0].IMAMB
        formData.IMAMNEWCASE = serviceData[0].IMAMNEWCASE
        setNewCase(serviceData[0].IMAMNEWCASE)
        formData.IMAMC1 = serviceData[0].IMAMC1
        formData.IMAMC2 = serviceData[0].IMAMC2
        formData.IMAMD = serviceData[0].IMAMD
        formData.IMAME = serviceData[0].IMAME
        formData.IMAMF = serviceData[0].IMAMF
        formData.IMAMG = serviceData[0].IMAMG
        setImamGVal(serviceData[0].IMAMG)
        formData.IMAMH = serviceData[0].IMAMH
        setImamHVal(serviceData[0].IMAMH)
        formData.IMAMH1 = serviceData[0].IMAMH1
        formData.IMAMH2 = serviceData[0].IMAMH2
        formData.IMAMH3 = serviceData[0].IMAMH3
        formData.IMAMH4 = serviceData[0].IMAMH4
        formData.IMAMH5 = serviceData[0].IMAMH5
        formData.IMAMI = serviceData[0].IMAMI
        formData.IMAMJ = serviceData[0].IMAMJ
        setImamJVal(serviceData[0].IMAMJ)
        setImamKVal(serviceData[0].IMAMK)
        formData.IMAMK = serviceData[0].IMAMK
        formData.IMAMAVGRATE = serviceData[0].IMAMAVGRATE
        formData.IMAMAVGTRMT = serviceData[0].IMAMAVGTRMT

      }
    }

    setLoading(false)

  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', background: '#fcf0f2' }}>
      <Modals open={loading} />
      {successSnack && <CustomizedSnackbars open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
      {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      <Typography variant="h6" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
        (OTP) ပြင်ပလူနာအဖြစ် အစာကျွေး၍ ကုသမှုပေးသည့် အစီအစဉ် အစီရင်ခံစာ</Typography>
      <CustomUnicefTable />
      <Grid container style={{ marginTop: '20px' }} >
        <Grid row container style={{ alignContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">ကျေးလက်ကျန်းမာရေးဌာနအမည် </Typography>
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
              <Typography color="#482642">မြို့နယ် </Typography>
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
              <Typography color="#482642">တိုင်းဒေသကြီး/ပြည်နယ် </Typography>
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
              <Typography color="#482642">အစီရင်ခံသည့်ကာလ </Typography>
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
        အသက် အုပ်စု (၆-၅၉ လ)</Typography>

      <Grid container style={{ marginTop: '20px', background: '#fcf0f2' }} >
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">လ အစတွင်ရှိသော လူနာဦးရေ </Typography>
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
              လူနာ အသစ် - {newCase}
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
              <Typography color="#482642">နောက်ထပ် အာဟာရ ပြန်ချို့တဲ့ သော လူနာ</Typography>
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
              <Typography color="#482642">ပျက်ကွက်ရာမှ စာရင်း ပြန်သွင်းသော လူနာ</Typography>
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
              <Typography color="#482642">SFP/အခြားOTP/ITP မှ လွှဲပို့လာသူ</Typography>
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
              <Typography color="#482642" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }}>ကျန်းမာရေးဌာန စာရင်းသွင်း ဝင်ခွင့် ပြုသူ စုစုပေါင်း</Typography>
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
              <Typography color="#482642">ကုသပျောက်ကင်းသောသူ</Typography>
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
              <Typography color="#482642">အာဟာရချို့တဲ့ခြင်းနှင့် ဆက်နွယ်၍ သေဆုံးသူ</Typography>
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
              <Typography color="#482642">အခြားအကြောင်းကြောင့် သေဆုံးသူ</Typography>
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
              <Typography color="#482642">ကုသရန် ပျက်ကွက်သူ</Typography>
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
            <Typography color="#482642" variant="subtitle2" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>အစီအစဉ်မှ ထွက်ခွင့်ပြုသူ စုစုပေါင်း - {imamHVal}</Typography>
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">ကုသ၍ မပျောက်ကင်းသူ</Typography>
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
              <Typography color="#482642">အခြားOTP/ ITP သို့ လွှဲပို့စေလွှတ်သူ</Typography>
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
              <Typography style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }} color="#482642">ကျန်းမာရေးဌာန စာရင်းမှ နုတ်ပါယ်သူ စုစုပေါင်း</Typography>
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
              <Typography style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }} color="#482642">လကုန် တွင် ရှိသော လူနာ</Typography>
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
              <Typography color="#482642">ကုသပျောက်ကင်းသွားသည့် ကလေးများ အတွက် ပျှမ်းမျှ ကိုယ်အလေးချိန် တိုးတက်မှုနှုန်း (g/kg/d) (၆ - ၅၉ လနှင့် ဖောရောင်ခြင်းမရှိသူများသာ)</Typography>
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
              <Typography color="#482642">ကုသပျောက်ကင်းသွားသော ကလေးများ၏ ပျှမ်းမျှကုသချိန် (၆ -၅၉ လ ကလေးများသာ)</Typography>
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
            onClick={update} >Update</Button>
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