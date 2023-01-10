//Login Body
import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import data from '../../utils/data.json';
import Modals from '../../components/modal';
import CustomTextField from '../../components/controls/CustomTextField'
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import FormControl from '@material-ui/core/FormControl';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

////////////////////////API Call///////////////////////
import * as lg from '../../modals/login'
import { login } from '../../modals/user';
import { resetPassword } from '../../modals/resetpw'

import _ from 'lodash';
import moment from "moment";

//////////////////////Controlls///////////////////////
import CustomizedSnackbars from '../../components/controls/CustomSnackBar';
import { UserContext } from '../../components/context/user'
import { experimentalStyled } from '@mui/material';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2.5),
        width: '400px',
        height: '50px',
        color: '#53344d',

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0),
        backgroundColor: '#fcf0f2',
        color: '#53344d',

    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}  {...other}>
            <Typography variant="h6" style={{ alignSelf: 'center', fontWeight: 'bold' }} >{children}</Typography>
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
        margin: theme.spacing(1),

        alignSelf: 'center'
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),

    },
}))(MuiDialogActions);

function LoginForm() {
    const [form, setForm] = useState({
        userName: '',
        password: '',
    });
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation()
    const [errmessage, setErrmessage] = useState('');
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [donor, setDonor] = useState([]);
    const [selectedDonor, setSelectedDonor] = useState('');
    const [township, setTownship] = useState([]);
    const [selectedTownship, setSelectedTownship] = useState('');
    const [showDefaultEntryForm, setShowDefaultEntryForm] = useState(false);
    const [showTownship, setShowTownShip] = useState(false);

    const { user, setUser } = useContext(UserContext);

    ///////////////////////Reset Dialog///////////////////////
    const [openReset, setOpenReset] = useState(location.openResetDialog);
    const [openSnack, setOpenSnack] = useState(false);
    const [msg, setMsg] = useState('')
    const [openRsSnack, setOpenRsSnack] = useState(false);
    const [rsMsg, setRsMsg] = useState('')

    const setDialogOpen = () => {
        setOpenReset(true)
    }
    const setDialogClose = () => {
        setOpenReset(false)
    }

    const setSnackBarOpen = () => {
        setOpenSnack(true)
    }
    const setSnackBarClose = () => {
        setOpenSnack(false)
    }

    const setRsSnackBarOpen = () => {
        setOpenRsSnack(true)
    }
    const setRsSnackBarClose = () => {
        setOpenRsSnack(false)
    }

    const validateForm = () => {
        return form.userName.length > 0 && form.password.length > 0;
    }

    const donarHandleChange = (event) => {
        setSelectedDonor(event.target.value);
    };

    const projectHandleChange = (event) => {
        console.log("Value from project handle", event.target.value)
        setSelectedProject(event.target.value);
        /* if (event.target.value === "P-007") {
            setSelectedTownship(township[0].TSP_ID)
            setShowTownShip(true);
        }
        else { setSelectedTownship(''); setShowTownShip(false) } */

    };

    var date_diff_indays = function (date1, date2) {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())) / (1000 * 60 * 60 * 24));
    }

    const calllogin = async () => {
        console.log('login value: ', form);
        await setLoading(true);
        if (form.userName && form.password) {
            const res = await login(form);
            const donorAndTsp = await lg.login()
            const donorData = await donorAndTsp.data.data.getDonor
            //const tspData = await donorAndTsp.data.data.getAllTownship
            const projectData = await donorAndTsp.data.data.getAllProjectInLogIn
            setProject(projectData)
            setSelectedProject(projectData[0].PROJECT_ID)
            setDonor(donorData)
            setSelectedDonor(donorData[0].DONOR_ID)
            //setTownship(tspData)

            if (res?.status === 200) {
                console.log("Res from login form", res)
                console.log("Res expire ", date_diff_indays(new Date(), res.data.data.expire))
                await sessionStorage.setItem('token', res.data.token)
                await sessionStorage.setItem('userName', res.data.data.loginName)
                await sessionStorage.setItem('loginName', res.data.data.loginName)
                await sessionStorage.setItem('password', form.password)
                await sessionStorage.setItem('userId', res.data.data.userId)
                await sessionStorage.setItem('org', res.data.data.org)
                await sessionStorage.setItem('orgName', res.data.data.orgName)
                await sessionStorage.setItem('role', res.data.data.role)
                if (res.data.data.role === '1' || res.data.data.role === '4') {
                    await setLoading(false);
                    await history.push('dashboard');
                }
                else if (res.data.data.role === '3') {
                    await setLoading(false);
                    await history.push('dashboard');
                }
                else {
                    if (date_diff_indays(new Date(), res.data.data.expire) < 0) {
                        await setUser(res.data.data.role)
                        await setLoading(false);
                        await setShowDefaultEntryForm(true);
                    }
                    else {
                        await setLoading(false);
                        setShowDefaultEntryForm(false);
                        setRsMsg(`Password is expired!\n Please reset password.`)
                        setRsSnackBarOpen()
                        setDialogOpen()
                    }

                }



            } else {
                console.log('error ', res)
                await setLoading(false);
            }
        }
    }

    const submit = () => {

        //donor,township
        //let tspName = ''
        const donorName = _.find(donor, function (o) { return o.DONOR_ID === selectedDonor; })
        //if (selectedTownship) { tspName = _.find(township, function (o) { return o.TSP_ID === selectedTownship; }) }
        const projName = _.find(project, function (o) { return o.PROJECT_ID === selectedProject; })
        sessionStorage.setItem('donorName', donorName.DONOR_NAME)
        sessionStorage.setItem('projName', projName.PROJECT_NAME)
        //sessionStorage.setItem('tspName', tspName.TSP_NAME)
        if (sessionStorage.getItem('role') === '3') history.push('dashboard');
        if (sessionStorage.getItem('role') === '2') {
            sessionStorage.setItem('donor', selectedDonor)
            //sessionStorage.setItem('township', selectedTownship)
            sessionStorage.setItem('project', selectedProject)
            history.push('entryhomepage');
        }
        else history.push('dashboard')
    }

    const reset = async () => {
        if (oldPass === sessionStorage.getItem('password') && oldPass.length) {
            if (newPass === confirmPass && confirmPass.length) {
                await setLoading(true);
                const parameter = {
                    userId: sessionStorage.getItem('userId'),
                    userName: sessionStorage.getItem('loginName'),
                    password: sessionStorage.getItem('password'),
                    newpassword: newPass
                }
                console.log("reset pw data from ui => ", parameter)
                const res = await resetPassword(parameter);
                if (res?.status === 200) {
                    setMsg(`Reset Password is success.\n Please log in again!`)
                    setDialogClose()
                    setSnackBarOpen()
                }
                else {
                    console.log('reset pw error ', res)
                }
                await setLoading(false);

            }
            else {
                setMsg('Please check your new password again!')
                setSnackBarOpen()
            }
        }
        else {
            setMsg('Please check your old password again!')
            setSnackBarOpen()
        }
    }

    return (
        <div className="App">
            <Modals open={loading} />
            {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={msg} type="success" />}
            {openRsSnack && <CustomizedSnackbars open={setRsSnackBarOpen} close={setRsSnackBarClose} alertMsg={rsMsg} type="warning" />}
            <div>

                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#fcf0f2',
                        color: '#53344d'
                    },
                }} /* onClose={setDialogClose} */ open={openReset}>
                    <DialogTitle onClose={setDialogClose} >
                        Reset Password
                    </DialogTitle>
                    <DialogContent>
                        <CustomUnicefTextField
                            error={oldPass !== sessionStorage.getItem('password') && oldPass.length > 0}
                            helperText={(oldPass !== sessionStorage.getItem('password') && oldPass.length > 0) ? 'Incorrect Old Password' : ''}
                            id="filled-basic"
                            label="Enter Old Password"
                            variantText="filled"
                            type="password"
                            style={{ marginTop: '11px', width: '95%' }}
                            onChange={e => setOldPass(e.target.value)}
                            value={oldPass}
                        />
                        <CustomUnicefTextField
                            id="filled-basic"
                            label="Enter New Password"
                            variantText="filled"
                            type="password"
                            style={{ marginTop: '11px', width: '95%' }}
                            onChange={e => setNewPass(e.target.value)}
                            value={newPass}
                        />
                        <CustomUnicefTextField
                            error={newPass !== confirmPass && confirmPass.length > 0}
                            helperText={(newPass !== confirmPass && confirmPass.length > 0) ? 'Please type correct new password!' : ''}
                            id="filled-basic"
                            label="Confirm New Password"
                            variantText="filled"
                            type="password"
                            style={{ marginTop: '11px', width: '95%' }}
                            onChange={e => setConfirmPass(e.target.value)}
                            value={confirmPass}
                        />
                    </DialogContent>
                    <DialogActions  >
                        <Button variant="contained" autoFocus onClick={reset} style={{ background: '#53344d', color: 'white' }}>
                            OK
                        </Button>
                        <Button variant="contained" autoFocus onClick={setDialogClose} style={{ background: 'lightgray', color: 'black' }}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Card className="form"
                style={{ background: '#fdf2f3', alignItems: 'center' }}>
                <form style={{ backgroundColor: '#fdf2f3' }}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <PersonIcon color="action" />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-basic"
                                label="User Name"
                                variant="standard"
                                onChange={e => { setForm({ ...form, userName: e.target.value }) }}
                                value={form.userName} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon color="action" />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                variant="standard"
                                autoComplete="current-password"
                                onChange={e => { setForm({ ...form, password: e.target.value }) }}
                                value={form.password} />
                        </Grid>
                    </Grid>
                    <Button
                        style={{ background: validateForm() ? '#d91d4c' : 'gray', color: 'white', marginTop: '20px' }}
                        variant="contained"
                        onClick={() => calllogin()}
                        type="button"
                        disabled={!validateForm()}> Login </Button>
                </form>
            </Card>
            {showDefaultEntryForm ?
                <FormControl
                    className="secondForm">
                    <Card
                        style={{ minWidth: '600px', minHeight: '200px', background: '#fdf2f3', marginTop: '10px' }}>
                        <Card style={{
                            width: '100%',
                            minHeight: '25%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            background: '#d91d4c',
                            padding: '11px'
                        }}>
                            <Typography variant="h6" style={{ color: '#fff' }}>
                                {`Choose General Information `}
                            </Typography>
                            <Typography variant="h6" style={{ color: '#fff', fontWeight: 'bold' }}>
                                {sessionStorage.getItem('orgName')}
                            </Typography>
                        </Card>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="center"
                            style={{ paddingTop: '10px' }}>
                            <Grid item xs style={{ padding: '3.5%' }}>
                                <CustomTextField
                                    label="Project"
                                    select
                                    value={selectedProject}
                                    defaultValue={project[0].PROJECT_NAME}
                                    onChange={projectHandleChange}
                                    style={{ width: "100%" }}>
                                    {project && project.map((option) => (
                                        <option key={option.PROJECT_NAME} value={option.PROJECT_ID}>
                                            {option.PROJECT_NAME}
                                        </option>
                                    ))}
                                </CustomTextField>
                            </Grid>
                            <Grid item xs style={{ padding: '3.5%' }}>
                                <CustomTextField
                                    label="Donor"
                                    value={selectedDonor}
                                    defaultValue={donor[0].DONOR_NAME}
                                    onChange={donarHandleChange}
                                    style={{ width: "100%" }}>
                                    {donor.map((option) => (
                                        <option key={option.DONOR_NAME} value={option.DONOR_ID}>
                                            {option.DONOR_NAME}
                                        </option>
                                    ))}
                                </CustomTextField>
                            </Grid>
                            {/* {showTownship ?
                                <Grid item xs style={{ padding: '3.5%' }}>
                                    <CustomTextField
                                        label="Township"
                                        defaultValue={township[0].TSP_NAME}
                                        value={selectedTownship}
                                        onChange={townshipHandleChange}
                                        style={{ width: "100%" }}>
                                        {township.map((option) => (
                                            <option key={option.TSP_NAME} value={option.TSP_ID}>
                                                {option.TSP_NAME}
                                            </option>
                                        ))}
                                    </CustomTextField>
                                </Grid> : null} */}

                        </Grid>

                        <Button
                            style={{
                                background: '#d91d4c',
                                color: 'white',
                                margin: '20px',
                                width: '100px'
                            }}
                            variant="contained"
                            onClick={submit}
                            type="button"
                            disabled={!validateForm()}> OK </Button>

                    </Card>

                </FormControl>
                : null}
        </div>

    );
}

export default LoginForm;
