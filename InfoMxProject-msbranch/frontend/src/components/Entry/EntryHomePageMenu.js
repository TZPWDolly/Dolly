/* eslint-disable no-unused-expressions */
//Very First Initial Home Page (when user  click 'Cancle' from any pages from Menu Bar)//
import React, { useRef, useState, useEffect, useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Card, FormLabel, Grid, TextField } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import RegisterForm from '../../forms/Register/RegisterForm';
import EditPatientForm from '../../forms/Edit_ShowRecords/EditPatientForm'
import RHServiceForm from '../../forms/SRHService/RHServiceForm';
import EditRHForm from '../../forms/Edit_ShowRecords/EditRHForm';
import FPServiceForm from '../../forms/SRHService/FPServiceForm';
import EditFPForm from '../../forms/Edit_ShowRecords/EditFPForm';
import ANCServiceForm from '../../forms/Maternal_HealthService/ANCServiceForm'
import EditANCForm from '../../forms/Edit_ShowRecords/EditANCForm';
import DeliveryServiceForm from '../../forms/Maternal_HealthService/DeliveryServiceForm';
import EditDeliveryForm from '../../forms/Edit_ShowRecords/EditDeliveryForm';
import PNCServiceForm from '../../forms/Maternal_HealthService/PNCServiceForm';
import EditPNCForm from '../../forms/Edit_ShowRecords/EditPNCForm';
import GMServiceForm from '../../forms/GerenalService/GMServiceForm';
import EditGMForm from '../../forms/Edit_ShowRecords/EditGMForm';
import NavBarDefaultMainPage from '../../components/Default/NavBarDefaultMainPage';

import OTPForm from '../../forms/IMAM_OTP/OTPForm';
import EditOTPForm from '../../forms/Edit_ShowRecords/EditOTPForm';
import SFPForm from '../../forms/IMAM_SFP/SFPForm';
import EditSFPForm from '../../forms/Edit_ShowRecords/EditSFPForm';

import IPDServiceForm from '../../forms/GerenalService/IPDServiceForm';
import EditIPDForm from '../../forms/Edit_ShowRecords/EditIPDForm';

import ANCReport from '../../forms/Reports_Exports/ANCReport';
import DeliveryReport from '../../forms/Reports_Exports/DeliveryReport';
import PNCReport from '../../forms/Reports_Exports/PNCReport';
import FPReport from '../../forms/Reports_Exports/FPReport';
import RHReport from '../../forms/Reports_Exports/RHReport';
import GMReport from '../../forms/Reports_Exports/GMReport';
import HeadCountReport from '../../forms/Reports_Exports/HeadCountReport';
import FPRHReport from '../../forms/Reports_Exports/FPRHReport';
import ExportByProvidedDate from '../../forms/Reports_Exports/ExportByProvidedDate';

import EditAgeForm from '../../forms/Edit_ShowRecords/EditAgeForm';
import DeleteServiceForm from '../../forms/Edit_ShowRecords/DeleteServiceForm'
import DeleteRegisterForm from '../../forms/Edit_ShowRecords/DeleteRegisterForm'

import MDSRServiceForm from '../../forms/Maternal_HealthService/MDSRServiceForm';
import MDSRServiceEditForm from '../../forms/Maternal_HealthService/MDSRServiceEditForm'

import cpibg from '../../images/cpibg.png'

import Modals from '../modal';

import _ from 'lodash';

/////// Context /////////
import { RegPatientContext } from '../context/regPatient';

/////// API /////////
import * as service from "../../modals/service";
import * as clinic from "../../modals/clinicbyorgproj"
import * as village from "../../modals/villagebyorgproj"
import { getDiagnosis, getIMCI } from "../../modals/diagnosis"
import * as editAge from "../../modals/editageshow"
import * as delSer from "../../modals/deleteserviceshow"
import * as delReg from "../../modals/deleteregshow"

import { editShow } from "../../modals/editShow";
import LoginForm from '../../forms/Login/LoginForm';
import CustomizedSnackbars from '../controls/CustomSnackBar';
import CustomIDSearchDialog from '../controls/CustomIDSearchDialog';
import EditMDSRForm from '../../forms/Edit_ShowRecords/EditMDSRForm';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}

        {...props}
    />
));

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        /* background: '#d91d4c', */
        background: '#482642',
        height: 50,
        justifyContent: 'center',
    },
    toolBar: {
        /* background: '#d91d4c', */
        background: '#482642',
        justifyContent: 'space-around',
    },
}));

const EntryHomePageMenu = props => {

    //Home show Control(for default)
    const [homeShow, setHomeShow] = useState(true)

    //For regPatient Data Context
    const { regPatientData, setRegPatientData } = useContext(RegPatientContext);

    //Register Show Control
    const [registerShow, setRegisterShow] = useState(false)

    //Maternal Show Control
    const [maternalAnchorEl, setMaternalAnchorEl] = useState(null);
    const [ANCShow, setANCShow] = useState(false)
    const [delShow, setDelShow] = useState(false)
    const [PNCShow, setPNCShow] = useState(false)
    const [MDSRShow,setMDSRShow] = useState(false)

    //SRH Show Control
    const [SRHAnchorEl, setSRHAnchorEl] = useState(null);
    const [FPShow, setFPShow] = useState(false)
    const [RHShow, setRHShow] = useState(false)

    //GM Show Control
    const [GMAnchorEl, setGMAnchorEl] = useState(null);
    const [GMShow, setGMShow] = useState(false)

    //OTP and SFP
    const [OTPShow, setOTPShow] = useState(false)
    const [SFPShow, setSFPShow] = useState(false)

    //IPD,OPD,Surgery
    const [IPDShow, setIPDShow] = useState(false)
    const [OPDShow, setOPDShow] = useState(false)
    const [surgeryShow, setSurgeryShow] = useState(false)

    //Report/Export Show Control
    const [reportsAnchorEl, setReportsAnchorEl] = useState(null);
    const [HCReportShow, setHCReportShow] = useState(false)
    const [ANCReportShow, setANCReportShow] = useState(false)
    const [DelReportShow, setDelReportShow] = useState(false)
    const [PNCReportShow, setPNCReportShow] = useState(false)
    const [FPReportShow, setFPReportShow] = useState(false)
    const [RHReportShow, setRHReportShow] = useState(false)
    const [GMReportShow, setGMReportShow] = useState(false)
    const [FPRHReportShow, setFPRHReportShow] = useState(false)
    const [exportProvidedShow, setExportProvidedShow] = useState(false)
    const [exportInsertShow, setExportInsertShow] = useState(false)

    //Edit Show Control
    const [editAnchorEl, setEditAnchorEl] = useState(null);
    const [patientEditShow, setPatientEditShow] = useState(false)
    const [patientEditFormShow, setPatientEditFormShow] = useState(false)
    const [ANCEditShow, setANCEditShow] = useState(false)
    const [DelEditShow, setDelEditShow] = useState(false)
    const [PNCEditShow, setPNCEditShow] = useState(false)
    const [MDSREditShow,setMDSREditShow] = useState(false)
    const [MDSREditFormShow,setMDSREditFormShow] = useState(false)
    const [FPEditShow, setFPEditShow] = useState(false)
    const [RHEditShow, setRHEditShow] = useState(false)
    const [GMEditShow, setGMEditShow] = useState(false)
    const [OTPEditShow, setOTPEditShow] = useState(false)
    const [SFPEditShow, setSFPEditShow] = useState(false)
    const [IPDEditShow, setIPDEditShow] = useState(false)
    const [OPDEditShow, setOPDEditShow] = useState(false)
    const [surgeryEditShow, setSurgeryEditShow] = useState(false)
    const [ageEditShow, setAgeEditShow] = useState(false)
    const [deleteServiceShow, setDeleteServiceShow] = useState(false)
    const [deleteRegisterShow, setDeleteRegisterShow] = useState(false)

    //ID Search Dialog
    const [dialogOpen, setDialogOpen] = useState(false)
    const [gmDialogOpen, setGMDialogOpen] = useState(false)
    const [ageDialogOpen, setAgeDialogOpen] = useState(false)
    const [deleteServiceDialogOpen, setDeleteServiceDialogOpen] = useState(false)
    const [deleteRegisterDialogOpen, setDeleteRegisterDialogOpen] = useState(false)
    const [patient, setPatient] = useState([])
    const [serviceType, setServiceType] = useState()
    const [patientGender, setPatientGender] = useState()
    const [clinicData, setClinicData] = useState([])
    const [villageData, setVillageData] = useState([])
    const [diagnosisData, setDiagnosisData] = useState([])
    const [imciData, setImciData] = useState([])
    const [editAgeData, setEditAgeData] = useState([])
    const [deleteServiceData, setDeleteServiceData] = useState([])
    const [deleteRegisterData, setDeleteRegisterData] = useState([])

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const [openSnack, setOpenSnack] = useState(location.openSnackbar);
    const [openRHSaveSnack, setOpenRHSaveSnack] = useState(location.openRHSaveSnackbar);
    const [openRHUpdateSnack, setOpenRHUpdateSnack] = useState(location.openRHUpdateSnackbar);
    const [openFPSaveSnack, setOpenFPSaveSnack] = useState(location.openFPSaveSnackbar);
    const [openFPUpdateSnack, setOpenFPUpdateSnack] = useState(location.openFPUpdateSnackbar);
    const [openANCSaveSnack, setOpenANCSaveSnack] = useState(location.openANCSaveSnackbar);
    const [openANCUpdateSnack, setOpenANCUpdateSnack] = useState(location.openANCUpdateSnackbar);
    const [openDeliSaveSnack, setOpenDeliSaveSnack] = useState(location.openDeliSaveSnackbar);
    const [openDeliUpdateSnack, setOpenDeliUpdateSnack] = useState(location.openDeliUpdateSnackbar);
    const [openPNCSaveSnack, setOpenPNCSaveSnack] = useState(location.openPNCSaveSnackbar);
    const [openPNCUpdateSnack, setOpenPNCUpdateSnack] = useState(location.openPNCUpdateSnackbar);
    const [openMDSRSaveSnack, setOpenMDSRSaveSnack] = useState(location.openMDSRSaveSnackbar);
    const [openMDSRUpdateSnack, setOpenMDSRUpdateSnack] = useState(location.openMDSRUpdateSnackbar);
    const [openGMSaveSnack, setOpenGMSaveSnack] = useState(location.openGMSaveSnackbar);
    const [openGMUpdateSnack, setOpenGMUpdateSnack] = useState(location.openGMUpdateSnackbar);
    const [openSFPSaveSnack, setOpenSFPSaveSnack] = useState(location.openSFPSaveSnackbar);
    const [openOTPSaveSnack, setOpenOTPSaveSnack] = useState(location.openOTPSaveSnackbar);
    const [openSFPUpdateSnack, setOpenSFPUpdateSnack] = useState(location.openSFPUpdateSnackbar);
    const [openOTPUpdateSnack, setOpenOTPUpdateSnack] = useState(location.openOTPUpdateSnackbar);
    const [openIPDSaveSnack, setOpenIPDSaveSnack] = useState(location.openIPDSaveSnackbar);
    const [openIPDUpdateSnack, setOpenIPDUpdateSnack] = useState(location.openIPDUpdateSnackbar);

    /////// Context /////////
    const form = useContext(LoginForm)

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [regPatient, setRegPatient] = useState([])

    ////////////UI Btn Show (base on Org and Project)/////////////
    const [regBtn, setRegBtn] = useState(false)
    const [maternalBtn, setMaternalBtn] = useState(false)
    const [GMBtn, setGMBtn] = useState(false)
    const [imamBtn, setImamBtn] = useState(false)
    const [imamSfpBtn, setImamSfpBtn] = useState(false)
    const [SRHBtn, setSRHBtn] = useState(false)
    const [ICDBtn, setICDBtn] = useState(false)
    const [IPDBtn, setIPDBtn] = useState(false)
    const [deleteRegBtn, setDeleteRegBtn] = useState(false)

    useEffect(() => {
        const fn = async () => {
            sessionStorage.setItem('editPatient', false)
            sessionStorage.setItem('editRHPatient', false)
            sessionStorage.setItem('editFPPatient', false)
            sessionStorage.setItem('editANCPatient', false)
            sessionStorage.setItem('editDeliPatient', false)
            sessionStorage.setItem('editPNCPatient', false)
            sessionStorage.setItem('editGMPatient', false)
            sessionStorage.setItem('editSFPPatient', false)
            sessionStorage.setItem('editOTPPatient', false)
            if (sessionStorage.getItem('project') === 'P-016' && (sessionStorage.getItem('org') === 'CPI-15' || sessionStorage.getItem('org') === 'CPI-05')) {
                setRegBtn(true)
                setMaternalBtn(false)
                setGMBtn(true)
                setImamBtn(true)
                setImamSfpBtn(true)
                setSRHBtn(false)
                setICDBtn(false)
                setIPDBtn(false)
                setDeleteRegBtn(true)
            }
            else if (sessionStorage.getItem('project') === 'P-007' && sessionStorage.getItem('donor') === 'D-004' && (sessionStorage.getItem('org') === 'CPI-01' || sessionStorage.getItem('org') === 'CPI-11'
                || sessionStorage.getItem('org') === 'CPI-14')) {
                setRegBtn(true)
                setMaternalBtn(true)
                setGMBtn(true)
                setImamBtn(false)
                setImamSfpBtn(false)
                setSRHBtn(true)
                setICDBtn(true)
                setIPDBtn(false)
                setDeleteRegBtn(true)
            }
            else if (sessionStorage.getItem('project') === 'P-990' && sessionStorage.getItem('donor') === 'D-990') {
                setRegBtn(true)
                setMaternalBtn(true)
                setGMBtn(false)
                setImamBtn(false)
                setImamSfpBtn(false)
                setSRHBtn(true)
                setICDBtn(false)
                setIPDBtn(true)
                setDeleteRegBtn(true)
            }
            else if (sessionStorage.getItem('project') === 'P-016' && (sessionStorage.getItem('org') === 'CPI-06' || sessionStorage.getItem('org') === 'CPI-34'
                || sessionStorage.getItem('org') === 'CPI-21')) {
                setRegBtn(false)
                setMaternalBtn(false)
                setGMBtn(false)
                setImamBtn(true)
                setImamSfpBtn(true)
                setSRHBtn(false)
                setICDBtn(false)
                setIPDBtn(false)
                setDeleteRegBtn(false)
            }
            else if (sessionStorage.getItem('project') === 'P-016' && (sessionStorage.getItem('org') === 'CPI-08' || sessionStorage.getItem('org') === 'CPI-19')) {
                setRegBtn(true)
                setMaternalBtn(true)
                setGMBtn(true)
                setImamBtn(true)
                setImamSfpBtn(true)
                setSRHBtn(true)
                setICDBtn(false)
                setIPDBtn(false)
                setDeleteRegBtn(true)
            }
            else if (sessionStorage.getItem('project') === 'P-001' && (sessionStorage.getItem('org') === 'CPI-05' || sessionStorage.getItem('org') === 'CPI-06'
                || sessionStorage.getItem('org') === 'CPI-07')) {
                setRegBtn(true)
                setMaternalBtn(true)
                setGMBtn(true)
                setImamBtn(false)
                setImamSfpBtn(false)
                setSRHBtn(true)
                setICDBtn(false)
                setIPDBtn(false)
                setDeleteRegBtn(true)
            }
            else if (sessionStorage.getItem('project') !== 'P-008' && (sessionStorage.getItem('org') === 'CPI-05' || sessionStorage.getItem('org') === 'CPI-20')) {
                setRegBtn(true)
                setMaternalBtn(true)
                setGMBtn(true)
                setImamBtn(false)
                setImamSfpBtn(false)
                setSRHBtn(true)
                setICDBtn(false)
                setIPDBtn(false)
                setDeleteRegBtn(true)
            }

            else if (sessionStorage.getItem('project') !== 'P-008') {
                setRegBtn(true)
                setMaternalBtn(true)
                setGMBtn(true)
                setImamBtn(false)
                setImamSfpBtn(false)
                setSRHBtn(true)
                setICDBtn(false)
                setIPDBtn(false)
                setDeleteRegBtn(true)
            }

            else {
                setRegBtn(true)
                setMaternalBtn(true)
                setGMBtn(true)
                setImamBtn(false)
                setImamSfpBtn(false)
                setSRHBtn(true)
                setICDBtn(false)
                setIPDBtn(false)
                setDeleteRegBtn(true)
            }
        }
        fn();
    }, [])

    useEffect(() => {
        const fn = async () => {
            if (sessionStorage.getItem('homeSave') === 'done' || sessionStorage.getItem('homeUpdate') === 'done') {
                showHandle(true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
                    , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false
                    ,false,false,false) 
            }
        }
        fn();
    }, [sessionStorage.getItem('homeSave') || sessionStorage.getItem('homeUpdate')])



    //Snack Bar
    const setSnackBarOpen = () => {
        setOpenSnack(true)
    }
    const setSnackBarClose = () => {
        setOpenSnack(false)
    }

    const setRHSaveSnackBarOpen = () => {
        setOpenRHSaveSnack(true)
    }
    const setRHSaveSnackBarClose = () => {
        setOpenRHSaveSnack(false)
    }

    const setRHUpdateSnackBarOpen = () => {
        setOpenRHUpdateSnack(true)
    }
    const setRHUpdateSnackBarClose = () => {
        setOpenRHUpdateSnack(false)
    }

    const setFPSaveSnackBarOpen = () => {
        setOpenFPSaveSnack(true)
    }
    const setFPSaveSnackBarClose = () => {
        setOpenFPSaveSnack(false)
    }

    const setFPUpdateSnackBarOpen = () => {
        setOpenFPUpdateSnack(true)
    }
    const setFPUpdateSnackBarClose = () => {
        setOpenFPUpdateSnack(false)
    }

    const setANCSaveSnackBarOpen = () => {
        setOpenANCSaveSnack(true)
    }
    const setANCSaveSnackBarClose = () => {
        setOpenANCSaveSnack(false)
    }

    const setANCUpdateSnackBarOpen = () => {
        setOpenANCUpdateSnack(true)
    }
    const setANCUpdateSnackBarClose = () => {
        setOpenANCUpdateSnack(false)
    }

    const setDeliSaveSnackBarOpen = () => {
        setOpenDeliSaveSnack(true)
    }
    const setDeliSaveSnackBarClose = () => {
        setOpenDeliSaveSnack(false)
    }

    const setDeliUpdateSnackBarOpen = () => {
        setOpenDeliUpdateSnack(true)
    }
    const setDeliUpdateSnackBarClose = () => {
        setOpenDeliUpdateSnack(false)
    }

    const setPNCSaveSnackBarOpen = () => {
        setOpenPNCSaveSnack(true)
    }
    const setPNCSaveSnackBarClose = () => {
        setOpenPNCSaveSnack(false)
    }

    const setPNCUpdateSnackBarOpen = () => {
        setOpenPNCUpdateSnack(true)
    }
    const setPNCUpdateSnackBarClose = () => {
        setOpenPNCUpdateSnack(false)
    }

    const setMDSRSaveSnackBarOpen = () => {
        setOpenMDSRSaveSnack(true)
    }
    const setMDSRSaveSnackBarClose = () => {
        setOpenMDSRSaveSnack(false)
    }

    const setMDSRUpdateSnackBarOpen = () => {
        setOpenMDSRUpdateSnack(true)
    }
    const setMDSRUpdateSnackBarClose = () => {
        setOpenMDSRUpdateSnack(false)
    }

    const setGMSaveSnackBarOpen = () => {
        setOpenGMSaveSnack(true)
    }
    const setGMSaveSnackBarClose = () => {
        setOpenGMSaveSnack(false)
    }

    const setGMUpdateSnackBarOpen = () => {
        setOpenGMUpdateSnack(true)
    }
    const setGMUpdateSnackBarClose = () => {
        setOpenGMUpdateSnack(false)
    }

    const setOTPSaveSnackBarOpen = () => {
        setOpenOTPSaveSnack(true)
    }
    const setOTPSaveSnackBarClose = () => {
        setOpenOTPSaveSnack(false)
    }

    const setSFPSaveSnackBarOpen = () => {
        setOpenSFPSaveSnack(true)
    }
    const setSFPSaveSnackBarClose = () => {
        setOpenSFPSaveSnack(false)
    }

    const setOTPUpdateSnackBarOpen = () => {
        setOpenOTPUpdateSnack(true)
    }
    const setOTPUpdateSnackBarClose = () => {
        setOpenOTPUpdateSnack(false)
    }

    const setSFPUpdateSnackBarOpen = () => {
        setOpenSFPUpdateSnack(true)
    }
    const setSFPUpdateSnackBarClose = () => {
        setOpenSFPUpdateSnack(false)
    }

    const setIPDSaveSnackBarOpen = () => {
        setOpenIPDSaveSnack(true)
    }
    const setIPDSaveSnackBarClose = () => {
        setOpenIPDSaveSnack(false)
    }

    const setIPDUpdateSnackBarOpen = () => {
        setOpenIPDUpdateSnack(true)
    }
    const setIPDUpdateSnackBarClose = () => {
        setOpenIPDUpdateSnack(false)
    }

    //Dialog
    const setDialogOpenControl = () => {
        setPatient([])
        setClinicData([])
        setVillageData([])
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.removeItem('rhage');
        sessionStorage.removeItem('rhageunit');
        sessionStorage.removeItem('rhageunitvalue');
        setDialogOpen(true)
    }
    const setDialogCloseControl = async (value, type) => {

        if (value && type === 'search') {
            await sessionStorage.setItem('searchid', value.trim())
            await setLoading(true)
            const patient = await service.getPatient()
            const clinicbyorgproj = await clinic.getClinicByOrgProj()
            const villagebyorgproj = await village.getVillageByOrgProj()
            if (clinicbyorgproj && patient.data.data.getPatient.length === 1 && villagebyorgproj) {
                setClinicData(clinicbyorgproj.data.data.getClinicByOrgProj)
                setVillageData(villagebyorgproj.data.data.getVillageByOrgProj)
                console.log("Searvice Search Patient Length===>", patient.data.data.getPatient.length)
                const type = patient.data.data.getPatientType
                console.log("Patient Type=>", type[0].SERCNT)
                setPatient(patient.data.data.getPatient)
                setServiceType(type[0].SERCNT)
                setPatientGender(patient.data.data.getPatient[0].REGSEX)
                //console.log(patient.data.data.getPatient[0].REGSEX)
                setLoading(false)
                setDialogOpen(false)
                console.log("Clinic by org project => ", clinicbyorgproj.data.data.getClinicByOrgProj);
                console.log("Village by org project => ", villagebyorgproj.data.data.getVillageByOrgProj);
            }
            else {
                setLoading(false)
                setDialogOpen(false)
            }

        }
        else {
            await setDialogOpen(false)
        }
    }

    //GM Dialog
    const setGMDialogOpenControl = () => {
        setPatient([])
        setClinicData([])
        setVillageData([])
        setDiagnosisData([])
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.removeItem('rhage');
        sessionStorage.removeItem('rhageunit');
        sessionStorage.removeItem('rhageunitvalue');
        setGMDialogOpen(true)
    }
    const setGMDialogCloseControl = async (value, type) => {

        if (value && type === 'search') {
            await sessionStorage.setItem('searchid', value.trim())
            await setLoading(true)
            const patient = await service.getPatient()
            const clinicbyorgproj = await clinic.getClinicByOrgProj()
            const villagebyorgproj = await village.getVillageByOrgProj()
            const diagnosis = await getDiagnosis()
            const imci = await getIMCI()
            if (clinicbyorgproj && patient.data.data.getPatient.length === 1 && villagebyorgproj && diagnosis && imci) {
                setClinicData(clinicbyorgproj.data.data.getClinicByOrgProj)
                setVillageData(villagebyorgproj.data.data.getVillageByOrgProj)
                setDiagnosisData(diagnosis.data.data.getDiagnosis)
                setImciData(imci.data.data.getIMCI)
                console.log("Searvice Search Patient Length===>", patient.data.data.getPatient.length)
                console.log("diagnosis data => ", diagnosis)
                const type = patient.data.data.getPatientType
                console.log("Patient Type=>", type[0].SERCNT)
                setPatient(patient.data.data.getPatient)
                setServiceType(type[0].SERCNT)
                setPatientGender(patient.data.data.getPatient[0].REGSEX)
                //console.log(patient.data.data.getPatient[0].REGSEX)
                setLoading(false)
                setGMDialogOpen(false)
                console.log("Clinic by org project => ", clinicbyorgproj.data.data.getClinicByOrgProj);
                console.log("Village by org project => ", villagebyorgproj.data.data.getVillageByOrgProj);
            }
            else {
                setLoading(false)
                setGMDialogOpen(false)
            }

        }
        else {
            await setGMDialogOpen(false)
        }
    }

/////Edit Age,Delete Service,Delete Reg////////////////
const setAgeDialogOpenControl = () => {
    sessionStorage.setItem('homeUpdate', '')
    sessionStorage.setItem('homeSave', '')
    sessionStorage.removeItem('rhage');
    sessionStorage.removeItem('rhageunit');
    sessionStorage.removeItem('rhageunitvalue');
    setAgeDialogOpen(true)
}
const setAgeDialogCloseControl = async (value, type) => {
    if (value && type === 'search') {
        setLoading(true)
        const parameter = {
            regID: value.trim()
          }
        const ageData = await editAge.editAgeShow(parameter)
        if (ageData) {
            console.log("Age Data =====> ",ageData.data.data.editAgeShow)
            setEditAgeData(ageData.data.data.editAgeShow)
            setLoading(false)
            setAgeDialogOpen(false)
        }
        else {
            setLoading(false)
            setAgeDialogOpen(false)
        }

    }
    else {
        await setAgeDialogOpen(false)
    }
}

const setDeleteServiceOpenControl = () => {
    sessionStorage.setItem('homeUpdate', '')
    sessionStorage.setItem('homeSave', '')
    sessionStorage.removeItem('rhage');
    sessionStorage.removeItem('rhageunit');
    sessionStorage.removeItem('rhageunitvalue');
    setDeleteServiceDialogOpen(true)
}
const setDeleteServiceCloseControl = async (value, type) => {
    if (value && type === 'search') {
        setLoading(true)
        const parameter = {
            regID: value.trim()
          }
        const delData = await delSer.deleteServiceShow(parameter)
        if (delData) {
            console.log("Age Data =====> ",delData.data.data.deleteServiceShow)
            setDeleteServiceData(delData.data.data.deleteServiceShow)
            setLoading(false)
            setDeleteServiceDialogOpen(false)
        }
        else {
            setLoading(false)
            setDeleteServiceDialogOpen(false)
        }

    }
    else {
        await setDeleteServiceDialogOpen(false)
    }
}

const setDeleteRegisterOpenControl = () => {
    sessionStorage.setItem('homeUpdate', '')
    sessionStorage.setItem('homeSave', '')
    sessionStorage.removeItem('rhage');
    sessionStorage.removeItem('rhageunit');
    sessionStorage.removeItem('rhageunitvalue');
    setDeleteRegisterDialogOpen(true)
}
const setDeleteRegisterCloseControl = async (value, type) => {
    if (value && type === 'search') {
        setLoading(true)
        const parameter = {
            regID: value.trim()
          }
          const delData = await delReg.deleteRegShow(parameter)
          if (delData) {
              console.log("Age Data =====> ",delData.data.data.deleteRegShow)
              setDeleteRegisterData(delData.data.data.deleteRegShow)
              setLoading(false)
              setDeleteRegisterDialogOpen(false)
          }
        else {
            setLoading(false)
            setDeleteRegisterDialogOpen(false)
        }

    }
    else {
        await setDeleteRegisterDialogOpen(false)
    }
}


    //Register
    const registerHandleClick = () => {

        showHandle(false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        history.push('entrypage')
    };

    //Maternal Health
    const maternalHealthHandleClick = (event) => {
        setMaternalAnchorEl(event.currentTarget);
    };
    const maternalHandleClose = () => {
        setMaternalAnchorEl(null);
    };

    const ANCServiceHandleClick = async () => {
        await setMaternalAnchorEl(null);
        await setDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_anc');
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }

    const deliServiceHandleClick = async () => {
        await setMaternalAnchorEl(null);
        await setDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_delivery');
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }

    const PNCServiceHandleClick = async () => {
        await setMaternalAnchorEl(null);
        await setDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_pnc');
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false,false
            ,false,false,false)
    }

    const MDSRHandleClick = async () => {
        await setMaternalAnchorEl(null);
        await sessionStorage.setItem('tblName', 'tbl_mdsr');
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,true, false,false)
    }

    //SRHServices
    const SRHHandleClick = (event) => {
        setSRHAnchorEl(event.currentTarget)
    };
    const SRHHandleClose = () => {
        setSRHAnchorEl(null);
    };
    const RHServiceHandleClick = async () => {
        await setSRHAnchorEl(null);
        await setDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_rh');
        sessionStorage.setItem('serviceName', 'rh')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
    }
    const FPServiceHandleClick = async () => {
        await setSRHAnchorEl(null);
        await setDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_fp');
        sessionStorage.setItem('serviceName', 'fp')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
    }

    //General Services
    const GMHandleClick = (event) => {
        setGMAnchorEl(event.currentTarget)
    };
    const GMHandleClose = () => {
        setGMAnchorEl(null);
    };
    const GMServiceHandleClick = async () => {
        await setGMAnchorEl(null);
        await setGMDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_gm');
        sessionStorage.setItem('serviceName', 'gm')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
    }

    const OPDServiceHandleClick = async () => {
        await setGMAnchorEl(null);
        await setGMDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_gm');
        sessionStorage.setItem('serviceName', 'gm')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', true)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            true, false, false, false, false, false
            ,false,false,false)
    }

    const surgeryServiceHandleClick = async () => {
        await setGMAnchorEl(null);
        await setGMDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_gm');
        sessionStorage.setItem('serviceName', 'gm')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', true)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, true, false, false, false, false
            ,false,false,false)
    }

    const IPDServiceHandleClick = async () => {
        await setGMAnchorEl(null);
        await setGMDialogOpenControl()
        await sessionStorage.setItem('tblName', 'tbl_ipd');
        sessionStorage.setItem('serviceName', 'ipd')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, true, false, false, false
            ,false,false,false)
    }

    //OTP and SFP
    const OTPHandleClick = async () => {

        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, true, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
        sessionStorage.setItem('tblName', 'tbl_imam');
        sessionStorage.setItem('serviceName', 'imam')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
    };

    const SFPHandleClick = async () => {

        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, true, false, false,
            false, false, false, false, false, false
            ,false,false,false)
        sessionStorage.setItem('tblName', 'tbl_imamsfp');
        sessionStorage.setItem('serviceName', 'imamsfp')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
    };

    //Reports & Exports
    const reportsHandleClick = (event) => {
        setReportsAnchorEl(event.currentTarget);
    };
    const reportsHandleClose = () => {
        setReportsAnchorEl(null);
    };

    const ANCReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const DeliveryReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false,false
            ,false,false,false)
    }
    const PNCReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false,
            false,false,false)
    }
    const FPReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const RHReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const GMReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const HeadCountReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const FPRHReportHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }

    const exportProvidedDateHandleClick = () => {
        setReportsAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }

    //Edit/Show Records
    const editHandleClick = (event) => {
        setEditAnchorEl(event.currentTarget);
    };
    const editHandleClose = () => {
        sessionStorage.setItem('editPatient', false)
        setEditAnchorEl(null);
    };
    const editPatientHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const editANCHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('tblName', 'tbl_anc');
        sessionStorage.setItem('serviceName', 'an')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const editDeliHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('tblName', 'tbl_delivery');
        sessionStorage.setItem('serviceName', 'deli')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }
    const editPNCHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('tblName', 'tbl_pnc');
        sessionStorage.setItem('serviceName', 'pn')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false,false,false)
    }

    const editMDSRHandleClick = async () => {
        setEditAnchorEl(null);
        await sessionStorage.setItem('tblName', 'tbl_mdsr');
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        await showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false
            ,false, false,true)
    }


    const editRHHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('serviceName', 'rh')
        sessionStorage.setItem('tblName', 'tbl_rh')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false,false
            ,false,false,false)
    }

    const editFPHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('serviceName', 'fp')
        sessionStorage.setItem('tblName', 'tbl_fp');
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false
            ,false,false,false)
    }

    const editGMHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('serviceName', 'gm')
        sessionStorage.setItem('tblName', 'tbl_gm')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
    }

    const editOTPHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('tblName', 'tbl_imam');
        sessionStorage.setItem('serviceName', 'imam')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false,
            false, false, false, false, false, false
            ,false,false,false)
    }

    const editSFPHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('tblName', 'tbl_imamsfp');
        sessionStorage.setItem('serviceName', 'imamsfp')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true,
            false, false, false, false, false, false
            ,false,false,false)
    }

    const editOPDHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('tblName', 'tbl_gm');
        sessionStorage.setItem('serviceName', 'gm')
        sessionStorage.setItem('gmgmtype', '3');
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, true, false, false
            ,false,false,false)
    }

    const editSurgeryHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('tblName', 'tbl_gm');
        sessionStorage.setItem('serviceName', 'gm')
        sessionStorage.setItem('gmgmtype', '2');
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, true, false
            ,false,false,false)
    }

    const editIPDHandleClick = () => {
        setEditAnchorEl(null);
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        sessionStorage.setItem('tblName', 'tbl_ipd');
        sessionStorage.setItem('serviceName', 'ipd')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, true
            ,false,false,false)
    }

    const editAgeHandleClick = () => {
        setEditAnchorEl(null);
        setAgeDialogOpenControl()
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        //sessionStorage.setItem('serviceName', 'gm')
        //sessionStorage.setItem('tblName', 'tbl_gm')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
    }

    const deleteServiceHandleClick = () => {
        setEditAnchorEl(null);
        setDeleteServiceOpenControl()
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        //sessionStorage.setItem('serviceName', 'gm')
        //sessionStorage.setItem('tblName', 'tbl_gm')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
    }

    const deleteRegisterHandleClick = () => {
        setEditAnchorEl(null);
        setDeleteRegisterOpenControl()
        sessionStorage.setItem('homeSave', '')
        sessionStorage.setItem('homeUpdate', '')
        //sessionStorage.setItem('serviceName', 'gm')
        //sessionStorage.setItem('tblName', 'tbl_gm')
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
        sessionStorage.setItem('editFPPatient', false)
        sessionStorage.setItem('editANCPatient', false)
        sessionStorage.setItem('editDeliPatient', false)
        sessionStorage.setItem('editPNCPatient', false)
        sessionStorage.setItem('editGMPatient', false)
        sessionStorage.setItem('editSFPPatient', false)
        sessionStorage.setItem('editOTPPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editIPDPatient', false)
        sessionStorage.setItem('OPDPatient', false)
        sessionStorage.setItem('surgeryPatient', false)
        sessionStorage.setItem('editOPDPatient', false)
        sessionStorage.setItem('editSurgeryPatient', false)
        sessionStorage.setItem('editMDSR',false)
        sessionStorage.setItem('gmgmtype', '');
        showHandle(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
            , false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false,
            false, false, false, false, false, false
            ,false,false,false)
    }


    //28 parameter (GM not include)
    const showHandle = (home, reg, anc, del, pnc, fp, rh, hcr, ancr, delr, pncr, fpr, rhr, gmr, fprhr, exp, exi, pe, ance, dele, pnce, fpe, rhe, gme, agee,
        deleteService, deleteRegister, gm, otp, sfp, otpe, sfpe, opd, sur, ipd, opde, sure, ipde, mdsr, mdsref,mdsre) => {
        setHomeShow(home)//1
        setRegisterShow(reg)//2
        setANCShow(anc)//3
        setDelShow(del)//4
        setPNCShow(pnc)//5
        setFPShow(fp)//6
        setRHShow(rh)//7
        setHCReportShow(hcr)//8
        setANCReportShow(ancr)//9
        setDelReportShow(delr)//10
        setPNCReportShow(pncr)//11
        setFPReportShow(fpr)//12
        setRHReportShow(rhr)//13
        setGMReportShow(gmr)//14
        setFPRHReportShow(fprhr)//15
        setExportProvidedShow(exp)//16
        setExportInsertShow(exi)//17
        setPatientEditShow(pe)//18
        setANCEditShow(ance)
        setDelEditShow(dele)
        setPNCEditShow(pnce)
        setFPEditShow(fpe)
        setRHEditShow(rhe)
        setGMEditShow(gme)
        setAgeEditShow(agee)
        setDeleteServiceShow(deleteService)
        setDeleteRegisterShow(deleteRegister)
        setGMShow(gm)
        setOTPShow(otp)
        setSFPShow(sfp)
        setOTPEditShow(otpe)
        setSFPEditShow(sfpe)
        setOPDShow(opd)
        setSurgeryShow(sur)
        setIPDShow(ipd)
        setOPDEditShow(opde)
        setSurgeryEditShow(sure)
        setIPDEditShow(ipde)
        setMDSRShow(mdsr)
        setMDSREditFormShow(mdsref)
        setMDSREditShow(mdsre)
        sessionStorage.setItem('editPatient', false)
        sessionStorage.setItem('editRHPatient', false)
    }


    return (
        <div>
            <NavBarDefaultMainPage />
            <div className={classes.root}>
                <Modals open={loading} />
                <CssBaseline />
                <Card square={true}>
                    <AppBar
                        position="relative"
                        className={classes.appBar}>
                        <Toolbar className={classes.toolBar}>
                            {regBtn && <Button
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                style={{ background: '#482642', color: 'white' }}
                                onClick={registerHandleClick} > Register </Button>}

                            {maternalBtn &&
                                <>
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        style={{ background: '#482642', color: 'white' }}
                                        onClick={maternalHealthHandleClick}>  Maternal Health  </Button>
                                    <StyledMenu
                                        id="simple-menu"
                                        anchorEl={maternalAnchorEl}
                                        keepMounted
                                        TransitionComponent={Fade}
                                        open={Boolean(maternalAnchorEl)}
                                        onClose={maternalHandleClose}>
                                        <MenuItem onClick={ANCServiceHandleClick}>ANC Service</MenuItem>
                                        <MenuItem onClick={deliServiceHandleClick}>Del Service</MenuItem>
                                        <MenuItem onClick={PNCServiceHandleClick}>PNC Service</MenuItem>
                                        {sessionStorage.getItem('project')==='P-001' || sessionStorage.getItem('project')==='P-008' ? 
                                        <MenuItem onClick={MDSRHandleClick}>MDSR</MenuItem> : null}
                                        {/* <MenuItem onClick={maternalHandleClose}>Under Developing...</MenuItem> */}
                                    </StyledMenu>
                                </>}
                            {SRHBtn &&
                                <>
                                    <Button
                                        id="srhMenu"
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        style={{ background: '#482642', color: 'white' }}
                                        onClick={SRHHandleClick}>  SRH Services  </Button>
                                    <StyledMenu
                                        id="simple-menu"
                                        anchorEl={SRHAnchorEl}
                                        keepMounted
                                        TransitionComponent={Fade}
                                        open={Boolean(SRHAnchorEl)}
                                        onClose={SRHHandleClose}>
                                        {(ICDBtn && SRHBtn) && <MenuItem onClick={FPServiceHandleClick}>FP Service</MenuItem>}
                                        {(!ICDBtn && SRHBtn) && <>
                                            <MenuItem onClick={FPServiceHandleClick}>FP Service</MenuItem>
                                            <MenuItem onClick={RHServiceHandleClick}>RH Service</MenuItem>
                                        </>
                                        }
                                    </StyledMenu>
                                </>}
                            {
                                IPDBtn &&
                                <>
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        style={{ background: '#482642', color: 'white' }}
                                        onClick={GMHandleClick} > General Services </Button>
                                    <StyledMenu
                                        id="simple-menu"
                                        anchorEl={GMAnchorEl}
                                        keepMounted
                                        TransitionComponent={Fade}
                                        open={Boolean(GMAnchorEl)}
                                        onClose={GMHandleClose}>
                                        <MenuItem onClick={OPDServiceHandleClick}>OPD-Service(Medical)</MenuItem>
                                        <MenuItem onClick={surgeryServiceHandleClick}>Surgery Service</MenuItem>
                                        <MenuItem onClick={IPDServiceHandleClick}>IPD Service</MenuItem>
                                    </StyledMenu>

                                </>
                            }
                            {GMBtn
                                &&
                                <>
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        style={{ background: '#482642', color: 'white' }}
                                        onClick={GMHandleClick} > General Services </Button>
                                    <StyledMenu
                                        id="simple-menu"
                                        anchorEl={GMAnchorEl}
                                        keepMounted
                                        TransitionComponent={Fade}
                                        open={Boolean(GMAnchorEl)}
                                        onClose={GMHandleClose}>
                                        <MenuItem onClick={GMServiceHandleClick}>GM Service</MenuItem>
                                    </StyledMenu>
                                </>}

                            {imamBtn &&
                                <>
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        style={{ background: '#482642', color: 'white' }}
                                        onClick={OTPHandleClick} > IMAM-OTP </Button>
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        style={{ background: '#482642', color: 'white' }}
                                        onClick={SFPHandleClick} > IMAM-SFP </Button>
                                </>}
                            <Button
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                style={{ background: '#482642', color: 'white' }}
                                onClick={reportsHandleClick}>  Reports & Exports  </Button>
                            <StyledMenu
                                id="simple-menu"
                                anchorEl={reportsAnchorEl}
                                keepMounted
                                TransitionComponent={Fade}
                                open={Boolean(reportsAnchorEl)}
                                onClose={reportsHandleClose}>
                                {ICDBtn &&
                                    <>
                                        <MenuItem onClick={HeadCountReportHandleClick}>All Reports(ICD)</MenuItem>
                                        <MenuItem onClick={ANCReportHandleClick}>Case Load Head Count Reports(ICD)</MenuItem>
                                        <MenuItem onClick={DeliveryReportHandleClick}>Case Load Comulative Reports(ICD)</MenuItem>
                                        <MenuItem onClick={PNCReportHandleClick}>Case Load Referral Reports(ICD)</MenuItem>
                                        <MenuItem onClick={exportProvidedDateHandleClick}>Export Dataset </MenuItem>
                                    </>}
                                {!ICDBtn &&
                                    <>
                                        <MenuItem onClick={HeadCountReportHandleClick}>Head Count Reports</MenuItem>
                                        <MenuItem onClick={ANCReportHandleClick}>ANC Reports</MenuItem>
                                        <MenuItem onClick={DeliveryReportHandleClick}>Delivery Reports</MenuItem>
                                        <MenuItem onClick={PNCReportHandleClick}>PNC Reports</MenuItem>
                                        <MenuItem onClick={FPReportHandleClick}>FP Reports</MenuItem>
                                        <MenuItem onClick={RHReportHandleClick}>RH Care Services</MenuItem>
                                        <MenuItem onClick={GMReportHandleClick}>General Mobidity Reports</MenuItem>
                                        <MenuItem onClick={FPRHReportHandleClick}>Description (FP+RH)</MenuItem>
                                        <MenuItem onClick={exportProvidedDateHandleClick}>Export Dataset </MenuItem>
                                    </>}

                            </StyledMenu>
                            <Button
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                style={{ background: '#482642', color: 'white' }}
                                onClick={editHandleClick}> Edit/Show Records </Button>
                            <StyledMenu
                                id="simple-menu"
                                anchorEl={editAnchorEl}
                                keepMounted
                                open={Boolean(editAnchorEl)}
                                onClose={editHandleClose}>
                                {regBtn && <MenuItem onClick={editPatientHandleClick}>Patient</MenuItem>}
                                {maternalBtn &&
                                    <>
                                        <MenuItem onClick={editANCHandleClick}>ANC</MenuItem>
                                        <MenuItem onClick={editDeliHandleClick}>Delivery</MenuItem>
                                        <MenuItem onClick={editPNCHandleClick}>PNC</MenuItem>
                                        {sessionStorage.getItem('project')==='P-001' || sessionStorage.getItem('project')==='P-008' ? 
                                        <MenuItem onClick={editMDSRHandleClick}>MDSR</MenuItem> : null}
                                    </>}
                                {(SRHBtn && ICDBtn) && <MenuItem onClick={editFPHandleClick}>FP</MenuItem>}
                                {(SRHBtn && !ICDBtn) &&
                                    <>
                                        <MenuItem onClick={editFPHandleClick}>FP</MenuItem>
                                        <MenuItem onClick={editRHHandleClick}>RH</MenuItem>
                                    </>
                                }

                                {GMBtn && <MenuItem onClick={editGMHandleClick}>GM</MenuItem>}
                                {imamBtn &&
                                    <>
                                        <MenuItem onClick={editOTPHandleClick}>IMAM-OTP</MenuItem>
                                        <MenuItem onClick={editSFPHandleClick}>IMAM-SFP</MenuItem>
                                    </>}
                                {IPDBtn &&
                                    <>
                                        <MenuItem onClick={editOPDHandleClick}>OPD(Medical)</MenuItem>
                                        <MenuItem onClick={editSurgeryHandleClick}>Surgery</MenuItem>
                                        <MenuItem onClick={editIPDHandleClick}>IPD</MenuItem>
                                    </>}
                                {deleteRegBtn && 
                                <>
                                <MenuItem onClick={editAgeHandleClick}>Edit Age Service</MenuItem>
                                <MenuItem onClick={deleteServiceHandleClick}>Delete Service</MenuItem>
                                <MenuItem onClick={deleteRegisterHandleClick}>Delete Register</MenuItem>
                                </>}
                                

                                
                            </StyledMenu>
                        </Toolbar>
                    </AppBar>
                </Card>

                <main style={{ textAlign: 'center' }}>

                    {homeShow &&
                        <img
                            src={cpibg}
                            alt="cpihomebg"
                            height={450}
                            style={{ marginTop: '5%' }}
                        />}
                    {patientEditShow && <EditPatientForm />}
                    {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={"Successfully updateed a patient"} type="success" />}
                    {openRHSaveSnack && <CustomizedSnackbars open={setRHSaveSnackBarOpen} close={setRHSaveSnackBarClose} alertMsg={"Successfully Save a patient's RH Service"} type="success" />}
                    {openRHUpdateSnack && <CustomizedSnackbars open={setRHUpdateSnackBarOpen} close={setRHUpdateSnackBarClose} alertMsg={"Successfully Update a patient's RH Service"} type="success" />}
                    {openFPSaveSnack && <CustomizedSnackbars open={setFPSaveSnackBarOpen} close={setFPSaveSnackBarClose} alertMsg={"Successfully Save a patient's FP Service"} type="success" />}
                    {openFPUpdateSnack && <CustomizedSnackbars open={setFPUpdateSnackBarOpen} close={setFPUpdateSnackBarClose} alertMsg={"Successfully Update a patient's FP Service"} type="success" />}
                    {openANCSaveSnack && <CustomizedSnackbars open={setANCSaveSnackBarOpen} close={setANCSaveSnackBarClose} alertMsg={"Successfully Save a patient's ANC Service"} type="success" />}
                    {openANCUpdateSnack && <CustomizedSnackbars open={setANCUpdateSnackBarOpen} close={setANCUpdateSnackBarClose} alertMsg={"Successfully Update a patient's ANC Service"} type="success" />}
                    {openDeliSaveSnack && <CustomizedSnackbars open={setDeliSaveSnackBarOpen} close={setDeliSaveSnackBarClose} alertMsg={"Successfully Save a patient's Delivery Service"} type="success" />}
                    {openDeliUpdateSnack && <CustomizedSnackbars open={setDeliUpdateSnackBarOpen} close={setDeliUpdateSnackBarClose} alertMsg={"Successfully Update a patient's Delivery Service"} type="success" />}
                    {openPNCSaveSnack && <CustomizedSnackbars open={setPNCSaveSnackBarOpen} close={setPNCSaveSnackBarClose} alertMsg={"Successfully Save a patient's PNC Service"} type="success" />}
                    {openPNCUpdateSnack && <CustomizedSnackbars open={setPNCUpdateSnackBarOpen} close={setPNCUpdateSnackBarClose} alertMsg={"Successfully Update a patient's PNC Service"} type="success" />}
                    {openMDSRSaveSnack && <CustomizedSnackbars open={setMDSRSaveSnackBarOpen} close={setMDSRSaveSnackBarClose} alertMsg={"Successfully Save a MDSR Service"} type="success" />}
                    {openMDSRUpdateSnack && <CustomizedSnackbars open={setMDSRUpdateSnackBarOpen} close={setMDSRUpdateSnackBarClose} alertMsg={"Successfully Update the MDSR Service"} type="success" />}
                    {openGMSaveSnack && <CustomizedSnackbars open={setGMSaveSnackBarOpen} close={setGMSaveSnackBarClose} alertMsg={"Successfully Save a patient's Service"} type="success" />}
                    {openGMUpdateSnack && <CustomizedSnackbars open={setGMUpdateSnackBarOpen} close={setGMUpdateSnackBarClose} alertMsg={"Successfully Update a patient's Service"} type="success" />}
                    {openOTPSaveSnack && <CustomizedSnackbars open={setOTPSaveSnackBarOpen} close={setOTPSaveSnackBarClose} alertMsg={"Successfully Save a patient's IMAMOTP Service"} type="success" />}
                    {openSFPSaveSnack && <CustomizedSnackbars open={setSFPSaveSnackBarOpen} close={setSFPSaveSnackBarClose} alertMsg={"Successfully Save a patient's IMAMSFP Service"} type="success" />}
                    {openOTPUpdateSnack && <CustomizedSnackbars open={setOTPUpdateSnackBarOpen} close={setOTPUpdateSnackBarClose} alertMsg={"Successfully Update a patient's IMAMOTP Service"} type="success" />}
                    {openSFPUpdateSnack && <CustomizedSnackbars open={setSFPUpdateSnackBarOpen} close={setSFPUpdateSnackBarClose} alertMsg={"Successfully Update a patient's IMAMSFP Service"} type="success" />}
                    {openIPDSaveSnack && <CustomizedSnackbars open={setIPDSaveSnackBarOpen} close={setIPDSaveSnackBarClose} alertMsg={"Successfully Save a patient's IPD Service"} type="success" />}
                    {openIPDUpdateSnack && <CustomizedSnackbars open={setIPDUpdateSnackBarOpen} close={setIPDUpdateSnackBarClose} alertMsg={"Successfully Update a patient's IPD Service"} type="success" />}

                    {RHShow && dialogOpen === false && <RHServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} />}
                    {dialogOpen && <CustomIDSearchDialog onClose={setDialogCloseControl} open={setDialogOpenControl} clinic={clinicData} village={villageData} />}
                    {gmDialogOpen && <CustomIDSearchDialog onClose={setGMDialogCloseControl} open={setGMDialogOpenControl} clinic={clinicData} village={villageData} diagnosisData={diagnosisData} imciData={imciData} />}
                    {ageDialogOpen && <CustomIDSearchDialog onClose={setAgeDialogCloseControl} open={setAgeDialogOpenControl} patient = {editAgeData} />}
                    {deleteServiceDialogOpen && <CustomIDSearchDialog onClose={setDeleteServiceCloseControl} open={setDeleteServiceOpenControl} patient = {deleteServiceData} />}
                    {deleteRegisterDialogOpen && <CustomIDSearchDialog onClose={setDeleteRegisterCloseControl} open={setDeleteRegisterOpenControl} patient = {deleteRegisterData} />}
                    
                    {RHEditShow && <EditRHForm></EditRHForm>}

                    {FPShow && dialogOpen === false && <FPServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} />}
                    {FPEditShow && <EditFPForm></EditFPForm>}

                    {ANCShow && dialogOpen === false && <ANCServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} />}
                    {ANCEditShow && <EditANCForm></EditANCForm>}

                    {delShow && dialogOpen === false && <DeliveryServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} />}
                    {DelEditShow && <EditDeliveryForm></EditDeliveryForm>}

                    {PNCShow && dialogOpen === false && <PNCServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} />}
                    {PNCEditShow && <EditPNCForm></EditPNCForm>}

                    {MDSRShow && <MDSRServiceForm/>}
                    {MDSREditShow && <EditMDSRForm/>}

                    {GMShow && gmDialogOpen === false && <GMServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} diagnosisData={diagnosisData} imciData={imciData} />}
                    {GMEditShow && <EditGMForm></EditGMForm>}

                    {OTPShow && <OTPForm />}
                    {OTPEditShow && <EditOTPForm></EditOTPForm>}

                    {SFPShow && <SFPForm />}
                    {SFPEditShow && <EditSFPForm />}

                    {IPDShow && gmDialogOpen === false && <IPDServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} diagnosisData={diagnosisData} imciData={imciData} />}
                    {IPDEditShow && <EditIPDForm />}

                    {OPDShow && gmDialogOpen === false && <GMServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} diagnosisData={diagnosisData} imciData={imciData} />}
                    {OPDEditShow && <EditGMForm />}

                    {surgeryShow && gmDialogOpen === false && <GMServiceForm gender={patientGender} patient={patient} serviceType={serviceType} clinic={clinicData} village={villageData} diagnosisData={diagnosisData} imciData={imciData} />}
                    {surgeryEditShow && <EditGMForm />}

                    {ANCReportShow && <ANCReport />}
                    {DelReportShow && <DeliveryReport />}
                    {PNCReportShow && <PNCReport />}
                    {FPReportShow && <FPReport />}
                    {RHReportShow && <RHReport />}
                    {GMReportShow && <GMReport />}
                    {HCReportShow && <HeadCountReport />}
                    {FPRHReportShow && <FPRHReport />}
                    {exportProvidedShow && <ExportByProvidedDate />}
                    {ageEditShow && ageDialogOpen === false && <EditAgeForm patient = {editAgeData}/>}
                    {deleteServiceShow && deleteServiceDialogOpen === false && <DeleteServiceForm patient = {deleteServiceData}/>}
                    {deleteRegisterShow && deleteRegisterDialogOpen === false && <DeleteRegisterForm patient = {deleteRegisterData}/>}
                </main>

            </div>
        </div>

    );
}
export default EntryHomePageMenu
