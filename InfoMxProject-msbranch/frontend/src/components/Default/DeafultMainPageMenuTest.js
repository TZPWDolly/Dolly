/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import WorkIcon from '@material-ui/icons/Work';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import GroupsIcon from '@material-ui/icons/Group';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PrintIcon from '@material-ui/icons/Print';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import { Button, FormLabel, TextField } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory, useParams, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Canvg from 'canvg';
import Modals from '../modal';
import html2canvas from "html2canvas";
import { Bar } from "react-chartjs-2";

import CustomTable from '../../components/controls/CustomTable'
import CustomSimpleTable from '../controls/CustomSimpleTable';
import CustomChart from '../controls/CustomChart'
import CustomTextField from '../controls/CustomTextField';
import CustomDialog from '../controls/CustomDialog';
import CustomCheckBox from '../controls/CustomCheckBox'
import { chartToImage } from '../controls/ChartToImagePdf'
import ChartJsImage from 'chartjs-to-image';

import _ from 'lodash';
import data from '../../utils/data.json';
import drawerData from '../../utils/drawerData.json'
import barData from '../../utils/barData.json'
//import { Legend } from 'chart.js';

/////// API /////////
import { getProject, getState, getTsp, getOrg, getClinic, getIndi, getService } from '../../modals/background';
import * as ds from '../../modals/dashboard';

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

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#d91d4c',
        height: 50,
        justifyContent: 'center',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        /* marginTop: 90, */
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    checkboxFormControl: {
        display: 'flex',
    },
    label: {
        autoRotateAngle: 45,
        autoRotateCount: 5,
        color: 'blue'
    }
}));

const DefaultMainPageMenuTest = props => {
    const location = useLocation()?.search;
    console.log('defaultMain pros: ', props);
    const [loading, setLoading] = useState(false);
    const [reportsAnchorEl, setReportsAnchorEl] = React.useState(null);
    const [exportsAnchorEl, setExportsAnchorEl] = React.useState(null);

    const history = useHistory();
    const [change, setChange] = useState(false);
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);//Boolean value for drawer
    const [itemClick, setItemClick] = useState('');
    const [openIndi, setOpenIndi] = useState(false);
    const [service, setService] = useState('ANC');
    const [serviceList, setServiceList] = useState([]);
    const [startDialogDate, setStartDialogDate] = useState(new Date())
    const [endDialogDate, setEndDialogDate] = useState(new Date())
    const [startDate, setStartDate] = useState("Start Date");
    const [endDate, setEndDate] = useState("End Date");
    const [chart, setChart] = useState('');

    const [indicatorList, setIndicatorList] = useState([]);
    const [indicatorSelected, setIndicatorSelected] = useState([]);
    const [getIndiRes, setGetIndiRes] = useState([]);
    const [indicatorChecked, setIndicatorChecked] = useState(['']);
    const [openIndicatorDialog, setOpenIndicatorDialog] = useState(false);

    const [submitData, setSubmitData] = useState(false);

    //For Project List
    const [isProjectCheckAll, setIsProjectCheckAll] = useState(false);
    const [isProjectCheck, setIsProjectCheck] = useState([]);
    const [projectList, setProjectList] = useState([]);
    //For State List
    const [isStateCheckAll, setIsStateCheckAll] = useState(false);
    const [isStateCheck, setIsStateCheck] = useState([]);
    const [stateList, setStateList] = useState([]);
    //For Township List
    const [isTownshipCheckAll, setIsTownshipCheckAll] = useState(false);
    const [isTownshipCheck, setIsTownshipCheck] = useState([]);
    const [townshipList, setTownshipList] = useState([]);
    //For Organization List
    const [isOrganizationCheckAll, setIsOrganizationCheckAll] = useState(false);
    const [isOrganizationCheck, setIsOrganizationCheck] = useState([]);
    const [organizationList, setOrganizationList] = useState([]);
    //For Clinic List
    const [isClinicCheckAll, setIsClinicCheckAll] = useState(false);
    const [isClinicCheck, setIsClinicCheck] = useState([]);
    const [clinicList, setClinicList] = useState([]);

    const [initialHeight, setInitialHeight] = useState(200)
    const [dataTest, setDataTest]=useState(false);

    useEffect(() => {
        const fn = async () => {
            await setLoading(true);
            const res = await getProject();
            const indiRes = await getIndi(queryString.stringify({ indi: service }));
            const serviceRes = await getService();
            console.log('indiRes: ', indiRes);
            console.log('indicated selected on start: ', indicatorSelected)
            if (res?.status === 200 && indiRes?.status === 200 && serviceRes?.status === 200) {
                await setProjectList(res.data.data);
                await setIndicatorList(indiRes.data.data);
                await setServiceList(serviceRes.data.data);
            }

            await setLoading(false);
        }
        fn();
    }, [])

    //SelectAll Function
    const projectHandleSelectAll = async (e) => {
        await setIsProjectCheckAll(!isProjectCheckAll);
       // await clearIndicatorData();
        if (isProjectCheckAll) {
            await setStateList([])
            await setTownshipList([])
            await setOrganizationList([])
            await setClinicList([])

            await setIsProjectCheck([])
            await setIsStateCheck([])
            await setIsTownshipCheck([]);
            await setIsOrganizationCheck([]);
            await setIsClinicCheck([])
        } else {
            await setIsProjectCheck(projectList.map(li => li.PROJECT_ID));
            let a = await [];
            await projectList.map((li) => a.push(li.PROJECT_ID))
            const qs = await queryString.stringify({ proj: a });
            const stateRes = await getState(qs);
            if (stateRes?.status === 200) {
                setStateList(stateRes.data.data);
            }
        }
    }

    const stateHandleSelectAll = async (e) => {
        await setIsStateCheckAll(!isStateCheckAll);
       // await clearIndicatorData();
        if (isStateCheckAll) {
            await setTownshipList([])
            await setOrganizationList([])
            await setClinicList([])

            await setIsStateCheck([])
            await setIsTownshipCheck([]);
            await setIsOrganizationCheck([]);
            await setIsClinicCheck([])
        } else {
            await setIsStateCheck(stateList.map(li => li.DIV_ID));
            let a = await [];
            await stateList.map((li) => a.push(li.DIV_ID))
            const qs = await queryString.stringify({ ...{ state: a }, ...{ proj: isProjectCheck } });
            const tspRes = await getTsp(qs);
            console.log('tspRes: ', tspRes);
            if (tspRes?.status === 200) {
                await setTownshipList(tspRes.data.data);
            }
        }
    }

    const townshipHandleSelectAll = async (e) => {
        await setIsTownshipCheckAll(!isTownshipCheckAll);
        //await clearIndicatorData();
        if (isTownshipCheckAll) {
            await setIsTownshipCheck([]);
            await setIsOrganizationCheck([]);
            await setIsClinicCheck([])

            await setOrganizationList([])
            await setClinicList([])
        } else {
            await setIsTownshipCheck(townshipList.map(li => li.TSP_ID));
            let a = await [];
            await townshipList.map((li) => a.push(li.TSP_ID))
            const qs = await queryString.stringify({ ...{ tsp: a }, ...{ state: isStateCheck }, ...{ proj: isProjectCheck } });
            const orgRes = await getOrg(qs);
            console.log('orgRes: ', orgRes);
            if (orgRes?.status === 200) {
                await setOrganizationList(orgRes.data.data);
            }
        }
    }

    const organizationHandleSelectAll = async (e) => {
        await setIsOrganizationCheckAll(!isOrganizationCheckAll);
        //await clearIndicatorData();
        if (isOrganizationCheckAll) {
            await setIsOrganizationCheck([])
            await setIsClinicCheck([])

            await setClinicList([])
        } else {
            await setIsOrganizationCheck(organizationList.map(li => li.ORG_ID));
            let a = await [];
            await organizationList.map((li) => a.push(li.ORG_ID))
            const qs = await queryString.stringify({ ...{ org: a }, ...{ tsp: isTownshipCheck }, ...{ state: isStateCheck }, ...{ proj: isProjectCheck } });
            const clinicRes = await getClinic(qs);
            console.log('clinicRes: ', clinicRes);
            if (clinicRes?.status === 200) {
                await setClinicList(clinicRes.data.data);
            }
        }
    }

    const clinicHandleSelectAll = e => {
        setIsClinicCheckAll(!isClinicCheckAll);
        //clearIndicatorData();
        if (isClinicCheckAll) {
            setIsClinicCheck([])
        } else {
            setIsClinicCheck(clinicList.map(li => li.CLN_ID));
        }
    }

    //Single Item Click function
    const projectHandleClick = async (e) => {
        const { id, checked } = e.target;
        //await clearIndicatorData();
        if (!checked) {
            console.log('project uncheck and show state: ', isStateCheck);
            await setIsProjectCheck(isProjectCheck.filter(item => item !== id))

            await setIsStateCheck([]);
            await setIsTownshipCheck([]);
            await setIsOrganizationCheck([]);
            await setIsClinicCheck([]);
            let a = await isProjectCheck.filter(f => f !== id);
            console.log('single clickd a: ', a);
            if (a.length) {
                const qs = await queryString.stringify({ proj: a });
                const stateRes = await getState(qs);
                if (stateRes?.status === 200) {
                    await setStateList(stateRes.data.data);
                }
            }
        } else {
            await setIsProjectCheck([...isProjectCheck, id]);
            const a = await [...isProjectCheck, id];
            console.log('single clickd a: ', a);
            const qs = await queryString.stringify({ proj: a });
            const stateRes = await getState(qs);
            if (stateRes?.status === 200) {
                await setStateList(stateRes.data.data);
            }
        }
        await setIsProjectCheckAll(false)
    }

    const stateHandleClick = async (e) => {
        const { id, checked } = e.target;
        //await clearIndicatorData();
        if (!checked) {
            await setIsStateCheck(isStateCheck.filter(item => item !== id))
            let a = await isStateCheck.filter(f => f !== id);
            await setTownshipList([])
            await setOrganizationList([])
            await setClinicList([]);
            await setIsTownshipCheck([]);
            await setIsOrganizationCheck([]);
            await setIsClinicCheck([]);
            console.log('single clickd a: ', a);
            if (a.length) {
                const qs = await queryString.stringify({ ...{ proj: isProjectCheck }, ...{ state: a } });
                const tspRes = await getTsp(qs);
                if (tspRes?.status === 200) {
                    await setTownshipList(tspRes.data.data);
                }
            }
        } else {
            await setIsStateCheck([...isStateCheck, id]);
            let a = await [...isStateCheck, id];
            console.log('single clickd a: ', a);
            const qs = await queryString.stringify({ ...{ proj: isProjectCheck }, ...{ state: a } });
            console.log('qs: ', qs);
            const tspRes = await getTsp(qs);
            if (tspRes?.status === 200) {
                await setTownshipList(tspRes.data.data);
            }
        }
        await setIsStateCheckAll(false)
    }

    const townshipHandleClick = async (e) => {
        const { id, checked } = e.target;
        //await clearIndicatorData();
        if (!checked) {
            await setIsTownshipCheck(isTownshipCheck.filter(item => item !== id))
            let a = await isTownshipCheck.filter(f => f !== id);
            await setOrganizationList([])
            await setClinicList([]);
            await setIsOrganizationCheck([]);
            await setIsClinicCheck([]);
            console.log('single clickd a: ', a);
            if (a.length) {
                const qs = await queryString.stringify({ ...{ proj: isProjectCheck }, ...{ state: isStateCheck }, ...{ tsp: a } });
                const orgRes = await getOrg(qs);
                if (orgRes?.status === 200) {
                    await setOrganizationList(orgRes.data.data);
                }
            }
        } else {
            await setIsTownshipCheck([...isTownshipCheck, id]);
            let a = await [...isTownshipCheck, id];
            console.log('single clickd a: ', a);
            const qs = await queryString.stringify({ ...{ proj: isProjectCheck }, ...{ state: isStateCheck }, ...{ tsp: a } });
            console.log('qs: ', qs);
            const orgRes = await getOrg(qs);
            if (orgRes?.status === 200) {
                await setOrganizationList(orgRes.data.data);
            }
        }
        await setIsTownshipCheckAll(false)
    }

    const organizationHandleClick = async (e) => {
        const { id, checked } = e.target;
        //await clearIndicatorData();
        if (!checked) {
            await setIsOrganizationCheck(isOrganizationCheck.filter(item => item !== id))
            let a = await isOrganizationCheck.filter(f => f !== id);
            await setClinicList([]);
            await setIsClinicCheck([]);
            console.log('single clickd a: ', a);
            if (a.length) {
                const qs = await queryString.stringify({ ...{ proj: isProjectCheck }, ...{ state: isStateCheck }, ...{ tsp: isTownshipCheck }, ...{ org: a } });
                const clinicRes = await getClinic(qs);
                if (clinicRes?.status === 200) {
                    await setClinicList(clinicRes.data.data);
                }
            }
        } else {
            await setIsOrganizationCheck([...isOrganizationCheck, id]);
            let a = await [...isOrganizationCheck, id];
            console.log('single clickd a: ', a);
            const qs = await queryString.stringify({ ...{ proj: isProjectCheck }, ...{ state: isStateCheck }, ...{ tsp: isTownshipCheck }, ...{ org: a } });
            console.log('qs: ', qs);
            const clinicRes = await getClinic(qs);
            if (clinicRes?.status === 200) {
                await setClinicList(clinicRes.data.data);
            }
        }
        await setIsOrganizationCheckAll(false)
    }

    const clinicHandleClick = async (e) => {
        const { id, checked } = e.target;
        //await clearIndicatorData();
        if (!checked) {
            await setIsClinicCheck(isClinicCheck.filter(item => item !== id))
        } else {
            await setIsClinicCheck([...isClinicCheck, id]);
        }
        await setIsClinicCheckAll(false)
    }

    //Get selected project names to display in UI
    const showSelectedProject = () => {
        const list = [];
        if (isProjectCheckAll) return 'All'
        else if (isProjectCheck) {
            for (var i of projectList) {
                for (var j of isProjectCheck) { if (j == i.PROJECT_ID) list.push(i.PROJECT_NAME) }
            }
            return list;
        }

    }

    const showSelectedState = () => {
        const list = [];
        if (isStateCheckAll) return 'All'
        else if (isStateCheck) {
            for (var i of stateList) {
                for (var j of isStateCheck) { if (j == i.DIV_ID) list.push(i.DIV_NAME) }
            }
            return list;
        }
    }

    const showSelectedTownship = () => {
        const list = [];
        if (isTownshipCheckAll) return 'All'
        else if (isTownshipCheck) {
            for (var i of townshipList) {
                for (var j of isTownshipCheck) { if (j == i.TSP_ID) list.push(i.TSP_NAME) }
            }
            return list;
        }

    }

    const showSelectedOrganization = () => {
        const list = [];
        if (isOrganizationCheckAll) return 'All'
        else if (isOrganizationCheck) {
            for (var i of organizationList) {
                for (var j of isOrganizationCheck) { if (j == i.ORG_ID) list.push(i.ORG_NAME) }
            }
            return list;
        }

    }

    const showSelectedClinic = () => {
        const list = [];
        if (isClinicCheckAll) return 'All'
        else if (isClinicCheck) {
            for (var i of clinicList) {
                for (var j of isClinicCheck) { if (j == i.CLN_ID) list.push(i.CLN_NAME) }
            }
            return list;
        }

    }

    //Return checkbox for Project
    const project = projectList.map((item) => {
        return (
            <>
                <ListItem
                    key={item.PROJECT_ID}
                    role={undefined}
                    dense
                    button
                    style={{ marginLeft: '15%', paddingTop: '10px' }}>
                    <ListItemIcon>
                        <CustomCheckBox
                            key={item.PROJECT_ID}
                            type="checkbox"
                            name={item.PROJECT_NAME}
                            id={item.PROJECT_ID}
                            handleClick={projectHandleClick}
                            isChecked={isProjectCheck.includes(item.PROJECT_ID)} />
                        {item.PROJECT_NAME}
                    </ListItemIcon>
                </ListItem>
            </>
        )
    });

    //Return Checkbox for State
    const state = stateList.map((item) => {
        return (
            <>
                <ListItem
                    key={item.DIV_ID}
                    role={undefined}
                    dense
                    button
                    style={{ marginLeft: '15%', paddingTop: '10px' }}>
                    <ListItemIcon>
                        <CustomCheckBox
                            key={item.DIV_ID}
                            type="checkbox"
                            name={item.DIV_NAME}
                            id={item.DIV_ID}
                            handleClick={stateHandleClick}
                            isChecked={isStateCheck.includes(item.DIV_ID)} />
                        {item.DIV_NAME}
                    </ListItemIcon>
                </ListItem>
            </>
        )
    });

    //Return Checkbox for Township
    const township = townshipList.map((item) => {
        return (
            <>
                <ListItem
                    key={item.TSP_ID}
                    role={undefined}
                    dense
                    button
                    style={{ marginLeft: '15%', paddingTop: '10px' }}>
                    <ListItemIcon>
                        <CustomCheckBox
                            key={item.TSP_ID}
                            type="checkbox"
                            name={item.TSP_NAME}
                            id={item.TSP_ID}
                            handleClick={townshipHandleClick}
                            isChecked={isTownshipCheck.includes(item.TSP_ID)} />
                        {item.TSP_NAME}
                    </ListItemIcon>
                </ListItem>
            </>
        )
    });

    //Return Checkbox for Township
    const organization = organizationList.map((item) => {
        return (
            <>
                <ListItem
                    key={item.ORG_ID}
                    role={undefined}
                    dense
                    button
                    style={{ marginLeft: '15%', paddingTop: '10px' }}>
                    <ListItemIcon>
                        <CustomCheckBox
                            key={item.ORG_ID}
                            type="checkbox"
                            name={item.ORG_NAME}
                            id={item.ORG_ID}
                            handleClick={organizationHandleClick}
                            isChecked={isOrganizationCheck.includes(item.ORG_ID)} />
                        {item.ORG_NAME}
                    </ListItemIcon>
                </ListItem>
            </>
        )
    });

    //Return Checkbox for Clinic
    const clinic = clinicList.map((item) => {
        return (
            <>
                <ListItem
                    key={item.CLN_ID}
                    role={undefined}
                    dense
                    button
                    style={{ marginLeft: '15%' }}>
                    <ListItemIcon>
                        <CustomCheckBox
                            key={item.CLN_ID}
                            type="checkbox"
                            name={item.CLN_NAME}
                            id={item.CLN_ID}
                            handleClick={clinicHandleClick}
                            isChecked={isClinicCheck.includes(item.CLN_ID)} />
                        {item.CLN_NAME}
                    </ListItemIcon>
                </ListItem>
            </>
        )
    });

    const startDateHandleChange = (date) => {
        //setStartDate(date);
         //clearIndicatorData();
        setStartDialogDate(date)

    };
    const endDateHandleChange = (date) => {
        //setEndDate(date);
        //clearIndicatorData();
        setEndDialogDate(date)

    };
    const indicatorDialogOpen = () => {
        setOpenIndicatorDialog(true);
        setSubmitData(false);
    };
    const indicatorDialogClose = (value) => {
        //setIndicatorChecked(value);
        //setIndicatorSelected([]);
        setOpenIndicatorDialog(false);
    };

    const chartHandleChange = (event) => {
        setChart(event.target.value);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleProject = () => {
        itemClick == 'Project' ? setItemClick(null) : setItemClick('Project')
    }

    const handleState = () => {
        itemClick == 'State' ? setItemClick(null) : setItemClick('State')
    }

    const handleTownship = () => {
        itemClick == 'Township' ? setItemClick(null) : setItemClick('Township')
    }

    const handleOrg = () => {
        itemClick == 'Organization' ? setItemClick(null) : setItemClick('Organization')
    }

    const handleClinic = () => {
        itemClick == 'Clinic' ? setItemClick(null) : setItemClick('Clinic')
    }

    const serviceHandleClick = () => {
        //setOpenPopup(true)
        itemClick === 'Services' ? setItemClick(null) : setItemClick('Services')
    }

    const serviceRadioHandleChange = async (event) => {
        //console.log(props.page)
        await setLoading(true);
        await setService(event.target.value);
        const indiRes = await getIndi(queryString.stringify({ indi: event.target.value }));
        await setIndicatorList(indiRes.data.data);
        await setIndicatorSelected([]);
        await setLoading(false);
        //history.push(`/defaultmainpage/${event.target.value}`)
        //setItemClick('null')
    };

    const dashboardHandleClick = () => {
        //dashboard menu click listener
        // history.push('/defaultmainpage/defaultdashboardpage');
    };
    const coverageHandleClick = () => {

    }
    const reportsHandleClick = (event) => {
        setReportsAnchorEl(event.currentTarget);
    };
    const exportsHandleClick = (event) => {
        setExportsAnchorEl(event.currentTarget);
    };

    const reportsHandleClose = () => {
        setReportsAnchorEl(null);
    };
    const exportsHandleClose = () => {
        setExportsAnchorEl(null);
    };

    const okhandle = async () => {
        await setOpenIndicatorDialog(false);
    }

    const submit = async () => {
        console.log('pre indi data: ', indicatorSelected);
        await clearIndicatorData();
        await setOpenIndicatorDialog(false);
        await setLoading(true);
        let enco = await '';
        let para = await { startDate: moment(startDialogDate).format('YYYY-MM-DD'), endDate: moment(endDialogDate).format('YYYY-MM-DD') };
        // eslint-disable-next-line no-unused-expressions
        isProjectCheck.length ? para = await { ...para, ...{ proj: isProjectCheck } } : null;
        isStateCheck.length ? para = await { ...para, ...{ state: isStateCheck } } : null;
        isTownshipCheck.length ? para = await { ...para, ...{ tsp: isTownshipCheck } } : null;
        isOrganizationCheck.length ? para = await { ...para, ...{ org: isOrganizationCheck } } : null;
        isClinicCheck.length ? para = await { ...para, ...{ cln: isClinicCheck } } : null;
        for (let [i, ind] of indicatorSelected.entries()) {
            console.log('loop index: ', i);
            const params = await { ...para, ...{ indi: ind.ID } };
            enco = btoa(params);
            const qs = await queryString.stringify(params);
            const res = await ds.indicator(qs, service);
            console.log('get indicator res: ', res);
            if (res?.status === 200) {
                const inres = await res.data.data
                let indata = await indicatorSelected;
                indata[i].data = await { tsp: inres.tsp, org: inres.org, tbl: inres.tbl };
                await setIndicatorSelected(indata);
            }
        }
        await setChange(!change)
        await setLoading(false);
        await history.push(`/defaultmainpage?${enco}`);
    }

    const clearIndicatorData = async () => {
        for(let a of indicatorSelected) {
            await delete a.data;
        }
        return indicatorSelected;
    }

    const selectIndi = async (a) => {
        console.log('Selected Indi : ', a);
        await clearIndicatorData();
        console.log('selected indicator --- ', indicatorSelected);
        if (indicatorSelected.find(f => f.ID === a.ID)) {
            await setIndicatorSelected(indicatorSelected.filter(f => f.ID !== a.ID));
        } else {
            await setIndicatorSelected([...indicatorSelected, a]);
        }
        //console.log('selectIndi function: ', a);
    }

    const noData = () => {
        return (
            <div>
                <Typography variant="h5" align="center" style={{ color: 'red', fontWeight: 'bold', padding: '20px' }}>
                                No Data</Typography>
            </div>
        )
    }

    const Chart = (a, i) => {
        return (
            <div>
                {a?.data?.org.length || a?.data?.tsp.length || a?.data?.tbl.lenght ? (
                    <>
                        {console.log("i from chart " + i)}
                        <Card style={{ background: '#f8dadd' }}>
                            <Typography variant="h5" align="center" style={{ color: '#53344d', fontWeight: 'bold', padding: '20px' }}>
                                {a?.RPT_NAME}</Typography>
                            <div className='chart'>
                                {a?.data?.org.length ? (
                                    <CustomChart name="Organization" title={a?.RPT_NAME} cdata={a?.data?.org} />
                                ):null}
                                {a?.data?.tsp.length ? (
                                    <CustomChart name="Township" title={a?.RPT_NAME} cdata={a?.data?.tsp} />
                                ):null}
                            </div>
                        </Card>
                        {a?.data?.tbl.length ? (
                            <CustomTable tableID={i} tdata={a?.data?.tbl} />
                        ) : null}
                        
                    </>
                ) : <Typography variant="h5" align="center" style={{ color: 'red', fontWeight: 'bold', padding: '20px' }}>
                No Data</Typography>}
            </div>
        )

    }

    const exportPDF = async () => {

        let doc = new jsPDF("p", "pt", "a4")
        let chartWidth = 540;
        let chartHeight = 300;
        let pdfWidth = doc.internal.pageSize.getWidth()
        let urlList = [];
        var row = 3;
        var col = 2;
        let i = 0;

        //doc.text("This is centred text.", 105, 80, null, null, "center");
        doc.setFontSize(20);
        doc.setTextColor(83, 52, 77);
        doc.setFont("helvetica", "bold");
        doc.text((pdfWidth / 2) - 20, 30, [`${service}`] + ' Service');

        doc.autoTable({
            body: [
                ['Project', showSelectedProject()],
                ['State', showSelectedState()],
                ['Township', showSelectedTownship()],
                ['Organization', showSelectedOrganization()],
                ['Clinic', showSelectedClinic()],
                ['Date', `Form ${moment(startDialogDate).format('DD-MM-YYYY')} to ${moment(endDialogDate).format('DD-MM-YYYY')}`]
            ],
        })

        //if(indicatorSelected)
        for (let i = 0; i < indicatorSelected.length; i++) {
            if(indicatorSelected[i]?.data?.org!=0 && indicatorSelected[i]?.data?.tsp!=0)
            {
                urlList.push(chartToImage('Organization', indicatorSelected[i]?.data?.org))
                urlList.push(chartToImage('Township', indicatorSelected[i]?.data?.tsp))
            }   
        }

        var array2D = [[]];
        if(urlList)
        {
            for (var r = 0; r < row; ++r) {
                array2D[r] = [];
                for (var c = 0; c < col; ++c) {
                    array2D[r][c] = urlList[i++];
                }
            }
        }
        
        console.log(array2D.length);//3

        for (var k = 0; k < indicatorSelected.length; k++) {
                doc.autoTable({
                    body: [
                        [{
                            content: [`${k + 1}. ${indicatorSelected[k].RPT_NAME}`],
                            styles: { halign: 'center', fontSize: 13, fontStyle: 'bold', fillColor: [248, 218, 221], textColor: [83, 52, 77] }
                        }],
                    ],
                })
                doc.setFontSize(10);
                doc.setTextColor(82, 86, 89);
                doc.setFont("helvetica", "normal");
                for (var j = 0; j < 2; j++) {
                    if (k === 0 && j === 0 && array2D[k][j]) {
                        doc.text("Gender by Organization", 10, 300, null, -90);
                        doc.addImage(array2D[k][j], 'JPEG', 20, 220, chartWidth, chartHeight)
                    }
                    else if (k === 0 && j === 0 && !array2D[k][j])
                    {
                        doc.autoTable({
                            body: [
                                [{
                                    content: [`No Data to Show in Organization Chart for Indicator ${k + 1}`],
                                    styles: { halign: 'center', fontSize: 10, fillColor: [236,236,236], textColor: [217,29,76] }
                                }],
                            ],
                            margin: { left: 120, right: 120 }
                        })
                    }
                    else if (k === 0 && j === 1 && array2D[k][j]) {
                        doc.text("Gender by Township", 10, chartHeight + 300, null, -90);
                        doc.addImage(array2D[k][j], 'JPEG', 20, chartHeight + 220, chartWidth, chartHeight)
                        doc.addPage()
                    }
                    else if (k === 0 && j === 1 && !array2D[k][j])
                    {
                        doc.autoTable({
                            body: [
                                [{
                                    content: [`No Data to Show in Township Chart for Indicator ${k + 1}`],
                                    styles: { halign: 'center', fontSize: 10, fillColor: [236,236,236], textColor: [217,29,76] }
                                }],
                            ],
                            margin: { left: 120, right: 120 }
                        })
                    }
                    else if (k != 0 && j === 0 && array2D[k][j]) {
                        doc.text("Gender by Organization", 10, 200, null, -90);
                        doc.addImage(array2D[k][j], 'JPEG', 20, 100, chartWidth, chartHeight)
                    }
                    else if (k != 0 && j === 0 && !array2D[k][j])
                    {
                        doc.autoTable({
                            body: [
                                [{
                                    content: [`No Data to Show in Organization Chart for Indicator ${k + 1}`],
                                    styles: { halign: 'center', fontSize: 10, fillColor: [236,236,236], textColor: [217,29,76] }
                                }],
                            ],
                            margin: { left: 120, right: 120 }
                        })
                    }
                    else if (k != 0 && j === 1 && array2D[k][j]) {
                        doc.text("Gender by Township", 10, chartHeight + 200, null, -90);
                        doc.addImage(array2D[k][j], 'JPEG', 20, chartHeight + 100, chartWidth, chartHeight)
                        doc.addPage()
                    }
                    else if (k != 0 && j === 1 && !array2D[k][j])
                    {
                        doc.autoTable({
                            body: [
                                [{
                                    content: [`No Data to Show in Township Chart for Indicator ${k + 1}`],
                                    styles: { halign: 'center', fontSize: 10, fillColor: [236,236,236], textColor: [217,29,76] }
                                }],
                            ],
                            margin: { left: 120, right: 120 }
                        })
                    }
                }

                if(document.getElementById(k))
                {
                    doc.autoTable({
                        html: document.getElementById(k), styles: { halign: 'center' },
                        headStyles: { fillColor: [72, 38, 66] }
                    })
                }
                else 
                {
                    doc.autoTable({
                        body: [
                            [{
                                content: [`No Data to Show in Table for Indicator ${k + 1}`],
                                styles: { halign: 'center', fontSize: 10, fillColor: [236,236,236], textColor: [217,29,76] }
                            }],
                        ],
                        margin: { left: 120, right: 120 }
                    })
                }
                if (k != (indicatorSelected.length - 1)) { doc.addPage() }
            }

        doc.save(service + `_${moment(new Date()).format('DD-MM-YYYY')}`)
    }

    return (
        <div className={classes.root}>
            <Modals open={loading} />
            <CssBaseline />
            <AppBar
                position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        style={{ background: '#d91d4c', color: 'white', marginRight: '10%', marginLeft: '10%' }}
                        /* onClick={dashboardHandleClick} */> Dashboard </Button>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        style={{ background: '#d91d4c', color: 'white', marginRight: '7%', marginLeft: '4%' }}
                        onClick={coverageHandleClick}> Coverage </Button>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        style={{ background: '#d91d4c', color: 'white', marginRight: '10%', marginLeft: '10%' }}
                        /* onClick={reportsHandleClick} */> {/* Reports */} </Button>
                    <StyledMenu
                        id="simple-menu"
                        anchorEl={reportsAnchorEl}
                        keepMounted
                        TransitionComponent={Fade}
                        open={Boolean(reportsAnchorEl)}
                        onClose={reportsHandleClose}>
                        <MenuItem onClick={reportsHandleClose}>Reports1</MenuItem>
                        <MenuItem onClick={reportsHandleClose}>Reports2</MenuItem>
                    </StyledMenu>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        style={{ background: '#d91d4c', color: 'white', marginLeft: '5%' }}
                        /* onClick={exportsHandleClick} */> {/* Exports */} </Button>
                    <StyledMenu
                        id="simple-menu"
                        anchorEl={exportsAnchorEl}
                        keepMounted
                        open={Boolean(exportsAnchorEl)}
                        onClose={exportsHandleClose}>
                        <MenuItem onClick={exportsHandleClose}>Exports1</MenuItem>
                        <MenuItem onClick={exportsHandleClose}>Exports2</MenuItem>
                        <MenuItem onClick={exportsHandleClose}>Exports3</MenuItem>
                    </StyledMenu>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List style={{ marginBottom: '0px' }}>

                    <ListItem button key={'Project'} onClick={handleProject}>
                        <ListItemIcon><WorkIcon /></ListItemIcon>
                        <ListItemText primary={'Project'} />
                    </ListItem>
                    {itemClick == 'Project' ? (
                        <div style={{ marginLeft: '9%' }}>
                            <CustomCheckBox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={projectHandleSelectAll}
                                isChecked={isProjectCheckAll || projectList.length === isProjectCheck.length}
                            />
                            Select All
                            {project}
                        </div>
                    ) : null}

                    <ListItem button key={'State'} onClick={handleState}>
                        <ListItemIcon><HomeWorkIcon /></ListItemIcon>
                        <ListItemText primary={'State'} />
                    </ListItem>
                    {itemClick == 'State' ? (
                        <div style={{ marginLeft: '9%' }}>
                            <CustomCheckBox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={stateHandleSelectAll}
                                isChecked={isStateCheckAll || stateList.length === isStateCheck.length}
                            />
                            Select All
                            {state}
                        </div>
                    ) : null}

                    <ListItem button key={'Township'} onClick={handleTownship}>
                        <ListItemIcon><HomeWorkIcon /></ListItemIcon>
                        <ListItemText primary={'Township'} />
                    </ListItem>
                    {itemClick == 'Township' ? (
                        <div style={{ marginLeft: '9%' }}>
                            <CustomCheckBox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={townshipHandleSelectAll}
                                isChecked={isTownshipCheckAll || townshipList.length === isTownshipCheck.length} />
                            Select All
                            {township}
                        </div>
                    ) : null}

                    <ListItem button key={'Organization'} onClick={handleOrg}>
                        <ListItemIcon><GroupsIcon /></ListItemIcon>
                        <ListItemText primary={'Organization'} />
                    </ListItem>
                    {itemClick == 'Organization' ? (
                        <div style={{ marginLeft: '9%' }}>
                            <CustomCheckBox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={organizationHandleSelectAll}
                                isChecked={isOrganizationCheckAll || organizationList.length === isOrganizationCheck.length}
                            />
                            Select All
                            {organization}
                        </div>
                    ) : null}

                    <ListItem button key={'Clinic'} onClick={handleClinic}>
                        <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
                        <ListItemText primary={'Clinic'} />
                    </ListItem>
                    {itemClick == 'Clinic' ? (
                        <div style={{ marginLeft: '9%' }}>
                            <CustomCheckBox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={clinicHandleSelectAll}
                                isChecked={isClinicCheckAll || clinicList.length === isClinicCheck.length}
                            />
                            Select All
                            {clinic}
                        </div>
                    ) : null}


                    <Divider />
                    <div style={{ padding: '15px' }}>
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Start Date(d/m/y)"
                                format="dd-MM-yyyy"
                                value={startDialogDate}
                                onChange={startDateHandleChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }} />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="End Date(d/m/y)"
                                format="dd-MM-yyyy"
                                value={endDialogDate}
                                onChange={endDateHandleChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }} />
                        </MuiPickersUtilsProvider>
                    </div>
                    <Divider />
                    <ListItem button key={'service'} onClick={serviceHandleClick}>
                        <ListItemIcon><FavoriteIcon /></ListItemIcon>
                        <ListItemText primary={'Services'} secondary={service} />
                    </ListItem>
                    <div style={{ paddingLeft: '20%' }}>
                        {itemClick == 'Services' ?
                            serviceList.map((item, index) => {
                                return (
                                    <div>
                                        <RadioGroup aria-label="service" name="service1" value={service} onChange={serviceRadioHandleChange}>
                                            <FormControlLabel value={item.RPT_INDICATOR_SERVICE} control={<Radio />} label={item.RPT_INDICATOR_SERVICE} />
                                        </RadioGroup>
                                    </div>
                                )
                            }) : ('')}
                    </div>
                    <Divider />
                </List>
            </Drawer>
            <main id="body"
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {service ? (
                    <Typography variant="h5" align="center" style={{ color: '#53344d', fontWeight: 'bold', padding: '10px' }}>
                        {`${service} Service`}
                    </Typography>
                ) : null}
                <Card>
                    <CustomSimpleTable
                        projectData={showSelectedProject()}
                        stateData={showSelectedState()}
                        tspData={showSelectedTownship()}
                        orgData={showSelectedOrganization()}
                        clnData={showSelectedClinic()}
                        stDate={moment(startDialogDate).format('DD-MM-YYYY')}
                        edDate={moment(endDialogDate).format('DD-MM-YYYY')} />
                </Card>
                <Grid
                    container
                    direction="row"
                    spacing={4}
                    style={{
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Grid item xs={8}>
                        <TextField
                            size="small"
                            label="Indicator"
                            fullWidth
                            value={indicatorSelected.map(f => `${f.RPT_NAME}`).join(',')}
                            variant="outlined"
                            style={{ width: '100%' }}
                            InputProps={{
                                readOnly: true
                            }}

                            onClick={indicatorDialogOpen} />
                    </Grid>
                    <Grid item xs={0.5} style={{ paddingLeft: '10px' }}>
                        <CustomTextField
                            label="Chart"
                            value={chart}
                            onChange={chartHandleChange}
                            variantText="outlined">
                            <option value={'bar'}> Bar </option>
                            <option value={'pie'}> Pie </option>
                        </CustomTextField>
                    </Grid>

                    <Grid item xs={0.5}>
                        <Button
                            variant="contained"
                            size="small"
                            style={{ background: 'mediumseagreen', color: 'white' }}
                            startIcon={<CheckCircleIcon />}
                            onClick={() => submit()}>
                            OK
                        </Button>
                    </Grid>
                    <Grid item xs={0.5}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<InsertDriveFileIcon />}
                            onClick={exportPDF}>
                            Export
                        </Button>
                    </Grid>
                </Grid>
                
                {indicatorSelected.map((b, i) => {
                     return Chart(b,i);
                   /*  if(b?.data !== {}) {
    
                    }else return noData() */
                })} {/* return bar or pie */}

                {openIndicatorDialog && indicatorList.length ? <div>
                    <CustomDialog
                        okhandle={okhandle}
                        indidata={indicatorList}
                        open={indicatorDialogOpen}
                        indiSelect={selectIndi}
                        indiChecked={indicatorSelected}

                        onClose={indicatorDialogClose} />
                </div> : null}
            </main>

        </div>
    );
}
export default DefaultMainPageMenuTest
