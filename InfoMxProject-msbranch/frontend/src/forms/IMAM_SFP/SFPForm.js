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
import { insertIMAMSFP } from '../../modals/imamsfpinfo';
import { getUnicefClinic } from '../../modals/unicefClinic'

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

export default function SFPForm() {

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
      IMAMSFPDONOR: '',
      IMAMSFPORG: '',
      IMAMSFPPROJECT: '',
      IMAMSFPCLNID: '',
      IMAMSFPDIVID: '',
      IMAMSFPTSPID: '',
      IMAMSFPPROVIDEDDATE: '',
      IMAMSFPB: '',
      IMAMSFPNEWCASEC: '',
      IMAMSFPD: '',
      IMAMSFPE: '',
      IMAMSFPF: '',
      IMAMSFPG: '',
      IMAMSFPH: '',
      IMAMSFPH1: '',
      IMAMSFPH2: '',
      IMAMSFPH3: '',
      IMAMSFPH4: '',
      IMAMSFPH5: '',
      IMAMSFPI: '',
      IMAMSFPJ: '',
      IMAMSFPK: '',
      IMAMSFPAVGRATE: '',
      IMAMSFPAVGTRMT: '',
      IMAMSFPUSRLOGIN: '',
      IMAMSFPINSERT: '',
      IMAMSFPUPDATE: '',
      IMAMSFPSTATUS: '',
      IMAMSFPSYNC: '',
    }
  )

  ////////////Handle Change//////////////////////////
  const clinicHandleChange = (event) => {
    setClinicCode(event.target.value)
    let cData = _.find(clinicData, ['CLN_ID', event.target.value]);
    formData.IMAMSFPCLNID = event.target.value
    formData.IMAMSFPTSPID = cData.TSP_ID
    setTspCode(cData.TSP_ID)
    setTspName(cData.TSP_NAME)
    formData.IMAMSFPDIVID = cData.DIV_ID
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
    let valid = !formData.IMAMSFPPROVIDEDDATE ? "အစီရင်ခံသည့်ကာလ ကိုရိုက်ထည့်ပေးပါ။" :
      'valid';

       
      
      if (valid === 'valid') {
        formData.IMAMSFPUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      formData.IMAMSFPINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')

      var imab = formData.IMAMSFPB === ''? 0 : formData.IMAMSFPB
      formData.IMAMSFPB = imab
      var imanc = formData.IMAMSFPNEWCASEC === ''? 0 : formData.IMAMSFPNEWCASEC
      formData.IMAMSFPNEWCASEC = imanc
      var imad = formData.IMAMSFPD === ''? 0 : formData.IMAMSFPD
      formData.IMAMSFPD = imad
      var imae = formData.IMAMSFPE === ''? 0 : formData.IMAMSFPE
      formData.IMAMSFPE = imae
      var imaf = formData.IMAMSFPF === ''? 0 : formData.IMAMSFPF
      formData.IMAMSFPF = imaf
      var imag = imamGVal === ''? 0 : imamGVal
      formData.IMAMSFPG = imag
      var imah = imamHVal === ''? 0 : imamHVal
      formData.IMAMSFPH = imah
      var imah1 = formData.IMAMSFPH1 === ''? 0 : formData.IMAMSFPH1
      formData.IMAMSFPH1 = imah1
      var imah2 = formData.IMAMSFPH2 === ''? 0 : formData.IMAMSFPH2
      formData.IMAMSFPH2 = imah2
      var imah3 = formData.IMAMSFPH3 === ''? 0 : formData.IMAMSFPH3
      formData.IMAMSFPH3 = imah3
      var imah4 = formData.IMAMSFPH4 === ''? 0 : formData.IMAMSFPH4
      formData.IMAMSFPH4 = imah4
      var imah5 = formData.IMAMSFPH5 === ''? 0 : formData.IMAMSFPH5
      formData.IMAMSFPH5 = imah5
      var imai = formData.IMAMSFPI === ''? 0 : formData.IMAMSFPI
      formData.IMAMSFPI = imai
      var imaj = imamJVal === ''? 0 : imamJVal
      formData.IMAMSFPJ = imaj
      var imak = imamKVal === ''? 0 : imamKVal
      formData.IMAMSFPK = imak
         const rhres = await insertIMAMSFP({formData});
         if (rhres?.status === 200) {
             sessionStorage.setItem('homeSave', 'done')
            setSuccess("Successfully inserted a patient's IMAMOTP Service")
            setSuccessSnack(true)
            history.push({
                pathname: "entryhomepage",
                openSFPSaveSnackbar: true
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

    let imab = formData.IMAMSFPB === '' ? 0 : parseInt(formData.IMAMSFPB)
    let imanc = formData.IMAMSFPNEWCASEC === '' ? 0 : parseInt(formData.IMAMSFPNEWCASEC)
    let imad = formData.IMAMSFPD === '' ? 0 : parseInt(formData.IMAMSFPD)
    let imae = formData.IMAMSFPE === '' ? 0 : parseInt(formData.IMAMSFPE)
    let imaf = formData.IMAMSFPF === '' ? 0 : parseInt(formData.IMAMSFPF)
    let imah1 = formData.IMAMSFPH1 === '' ? 0 : parseInt(formData.IMAMSFPH1)
    let imah2 = formData.IMAMSFPH2 === '' ? 0 : parseInt(formData.IMAMSFPH2)
    let imah3 = formData.IMAMSFPH3 === '' ? 0 : parseInt(formData.IMAMSFPH3)
    let imah4 = formData.IMAMSFPH4 === '' ? 0 : parseInt(formData.IMAMSFPH4)
    let imah5 = formData.IMAMSFPH5 === '' ? 0 : parseInt(formData.IMAMSFPH5)
    let imai = formData.IMAMSFPI === '' ? 0 : parseInt(formData.IMAMSFPI)
    //console.log("C1+C2 => ",imac1+imac2)
    setImamGVal(imanc + imad + imae + imaf)
    setImamHVal(imah1 + imah2 + imah3 + imah4 + imah5)
    setImamJVal(imah1 + imah2 + imah3 + imah4 + imah5 + imai)
    setImamKVal((imab + imanc + imad + imae + imaf) - (imah1 + imah2 + imah3 + imah4 + imah5 + imai))

  }, [formData.IMAMSFPH1, formData.IMAMSFPH2, formData.IMAMSFPH3, formData.IMAMSFPH4, formData.IMAMSFPH5, formData.IMAMSFPI, formData.IMAMSFPB, formData.IMAMSFPNEWCASEC, formData.IMAMSFPD, formData.IMAMSFPE, formData.IMAMSFPF])

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
        IMAMSFPPROVIDEDDATE: moment(new Date()).format("YYYY-MM-DD"),
        IMAMSFPDONOR: sessionStorage.getItem('donor'),
        IMAMSFPORG: sessionStorage.getItem('org'),
        IMAMSFPPROJECT: sessionStorage.getItem('project'),
        IMAMSFPCLNID: clinic.data.data.getUnicefClinic[0].CLN_ID,
        IMAMSFPDIVID: clinic.data.data.getUnicefClinic[0].DIV_ID,
        IMAMSFPTSPID: clinic.data.data.getUnicefClinic[0].TSP_ID,
        IMAMSFPUSRLOGIN: sessionStorage.getItem('userName'),
        IMAMSFPSTATUS: 1,
        IMAMSFPSYNC: 0,
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
        (SFP) အပိုဆောင်း ဖြည့်စွက်စာကျွေးခြင်း အစီအစဉ် အစီရင်ခံစာ (ကျေးလက် ကျန်းမာရေး ဌာနခွဲ )</Typography>
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
              onChange={e => setFormData({ ...formData, IMAMSFPPROVIDEDDATE: e.target.value })}
              value={formData.IMAMSFPPROVIDEDDATE} />
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
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPB: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPB: e.target.value })
              }}
              value={formData.IMAMSFPB} />
          </Grid>
        </Grid>
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">လူနာ အသစ်</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPNEWCASEC: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPNEWCASEC: e.target.value })
              }}
              value={formData.IMAMSFPNEWCASEC} />
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
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPD: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPD: e.target.value })
              }}
              value={formData.IMAMSFPD} />
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
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPE: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPE: e.target.value })
              }}
              value={formData.IMAMSFPE} />
          </Grid>
        </Grid>
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">အခြားSFP မှ လွှဲပို့လာသူ</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPF: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPF: e.target.value })
              }}
              value={formData.IMAMSFPF} />
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
              <Typography color="#482642" >ကုသပျောက်ကင်းသောသူ</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPH1: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPH1: e.target.value })
              }}
              value={formData.IMAMSFPH1} />
          </Grid>
        </Grid>
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642" >အာဟာရချို့တဲ့ခြင်းနှင့် ဆက်နွယ်၍ သေဆုံးသူ</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPH2: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPH2: e.target.value })
              }}
              value={formData.IMAMSFPH2} />
          </Grid>
        </Grid>
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642" >အခြားအကြောင်းကြောင့် သေဆုံးသူ</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPH3: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPH3: e.target.value })
              }}
              value={formData.IMAMSFPH3} />
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
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPH4: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPH4: e.target.value })
              }}
              value={formData.IMAMSFPH4} />
            <Typography color="#482642" variant="subtitle2" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>အစီအစဉ်မှ ထွက်ခွင့်ပြုသူ စုစုပေါင်း - {imamHVal}</Typography>
          </Grid>
        </Grid>
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642" >ကုသ၍ မပျောက်ကင်းသူ</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPH5: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPH5: e.target.value })
              }}
              value={formData.IMAMSFPH5} />
          </Grid>
        </Grid>
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642" >အခြားSFP/OTP/ITP သို့ လွှဲပို့စေလွှတ်သူ</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              style={{ width: '90%' }}
              onChange={e => {
                (e.target.value.length > 3) ? setFormData({ ...formData, IMAMSFPI: (e.target.value).slice(0, 3) })
                  : setFormData({ ...formData, IMAMSFPI: e.target.value })
              }}
              value={formData.IMAMSFPI} />
          </Grid>
        </Grid>
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }}>ကျန်းမာရေးဌာန စာရင်းမှ နုတ်ပါယ်သူ စုစုပေါင်း</Typography>
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
              <Typography color="#482642" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }}>လကုန် တွင် ရှိသော လူနာ</Typography>
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
      </Grid>
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ paddingTop: '25px', background: '#fcf0f2' }} row>
        <Grid item xs={'auto'} style={{ width: '15%' }}>
          <Button
            variant="contained"
            style={{ background: '#482642', color: '#fff', width: '100%' }}
            onClick={save}  >Save</Button>
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
