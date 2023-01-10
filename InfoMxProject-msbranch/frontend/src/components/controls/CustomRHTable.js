import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
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
});

function createData(id, name, age, type, father, org, proj, donor, user) {
    return { id, name, age, type, father, org, proj, donor, user };
}

const rows = [
    createData('A00018888', "Daw Hla Hla ", "10 Year", "New", "U hla", "KDHW", "SDC", "Donor", "KDHWUser"),

];

export default function CustomRHTable(props) {
    const classes = useStyles();

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [serviceTypeData, setServiceTypeData] = useState('')
    const [realAge, setRealAge] = useState('')
    /* const [age, setAge] = useState('')
     const [ageUnit, setAgeUnit] = useState('')
    const [ageUnitValue, setAgeUnitValue] = useState('')  */

    useEffect(()=> {
        const fn = async () => {
            const age = sessionStorage.getItem('rhage')
            const ageUnitValue = sessionStorage.getItem('rhageunitvalue')
           
           await setRealAge(age+ageUnitValue)
        }
        fn()
    
    },[sessionStorage.getItem('rhage'),sessionStorage.getItem('rhageunit'),sessionStorage.getItem('rhageunitvalue')])


    return (
        <TableContainer component={Paper}>
            <Table size='small' className={classes.table} aria-label="simple table" >
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.cellOne} size='small' align="left">&nbsp;&nbsp;&nbsp;&nbsp;Patient ID</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Patient Name</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Age</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Patient Type</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Father</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Org</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Project</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Donor</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">UsrLogin</TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {props.patient.length ?
                        <TableRow key={props.patient[0].REGID}>
                            <TableCell className={classes.cellTwo} align="left" size='small' >&nbsp;&nbsp;&nbsp;{props.patient[0].REGID}</TableCell>
                            <TableCell className={classes.cellTwo} align="left" size='small' >{props.patient[0].REGNAME}</TableCell>
                            {realAge? <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('rhage')+sessionStorage.getItem('rhageunitvalue')}</TableCell> : 
                            <TableCell className={classes.cellTwo} align="left" size='small' >{props.patient[0].REGAGE + ' ' +
                            `${props.patient[0].REGAGEUNIT === 365 ? 'Year' : props.patient[0].REGAGEUNIT === 30 ? 'Month' : 'Day'}`}</TableCell>}
                            <TableCell className={classes.cellTwo} align="left" size='small' >{props.serviceType === null ? 'New' : 'Old'}</TableCell>
                            <TableCell className={classes.cellTwo} align="left" size='small' >{props.patient[0].REGFATHER}</TableCell>
                            <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('orgName')}</TableCell>
                            <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('projName')}</TableCell>
                            <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('donorName')}</TableCell>
                            <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('userName')}</TableCell>

                        </TableRow> : null}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
