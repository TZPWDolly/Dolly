import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

import Modals from "../../components/modal";
import CustomizedSnackbars from '../../components/controls/CustomSnackBar';
import _ from 'lodash';
import moment from 'moment';

/////////////////////API/////////////////////
import * as edit from '../../modals/editage'


const useStyles = makeStyles({
    container: {
        width: '98%',
        borderRadius: '5px',
        position: 'revert',
        background: '#fcf0f2',
        marginLeft: '1%',
        marginRight: '1%'
    },
});

export default function EditAgeForm(props) {

    const [tableData, setTableData] = useState([])
    const [snackOpen, setSnackOpen] = useState(false)

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const classes = useStyles();

    const editButtonHandle = async (event) => {
        console.log(event.currentTarget.value)
        const splitArr = (event.currentTarget.value).split(',')
        const parameter = {
            user: sessionStorage.getItem('userName'),
            orgID: sessionStorage.getItem('org'),
            date: moment(new Date()).format('YYYY-MM-DD'),
            age: splitArr[1],
            ageUnit: splitArr[2],
            regID: splitArr[0],
            ID: splitArr[3],
            sn: splitArr[4],
        }
        console.log(parameter)
        const res = await edit.editAge(parameter);
        if (res?.status === 200) {
            setSnackOpenControl()
        }

    }

    //SnackBar
    const setSnackOpenControl = () => {
        setSnackOpen(true)
    }
    const setSnackCloseControl = async () => {

        setSnackOpen(false)

    }

    return (
        <>
            <Modals open={loading} />
            <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                Edit Age</Typography>
            {snackOpen && <CustomizedSnackbars open={setSnackOpenControl} close={setSnackCloseControl} alertMsg={"Successfully edited patient's age"} type="success" />}
            <TableContainer
                className={classes.container}>
                <Table
                    /* id={tableID} */
                    aria-label="spanning table"
                    size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Patient ID</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Provided Date</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Edit Age</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}> Edit Age Unit </TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Service Name</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.patient.length ?
                            props.patient.map((row) => (
                                <TableRow>
                                    <TableCell align="center">{row.REGID}</TableCell>
                                    <TableCell align="center">{moment(row.PROVIDEDDATE).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell align="center">{row.REGAGE}</TableCell>
                                    <TableCell align="center">{row.SERAGEUNITNUMBER === 365 ? 'Year' : row.SERAGEUNITNUMBER === 30 ? 'Month' : 'Day'}</TableCell>
                                    <TableCell align="center">{row.ID}</TableCell>
                                    <TableCell align="center">{row.SERV}</TableCell>
                                    {row.ORG === sessionStorage.getItem('org') ?
                                        <TableCell align="center">
                                            <Button style={{background:'#53344d',color:'#fff',fontSize:10}} variant="contained"
                                            value={row.REGID + "," + row.REGAGE + "," + row.SERAGEUNITNUMBER + "," + row.ID + "," + row.SERV} onClick={editButtonHandle} >
                                                update age
                                            </Button>
                                        </TableCell> :
                                        <TableCell align="center">
                                            <Button style={{background:'#b9b9b9',color:'#525659',fontSize:10}} variant="contained"
                                            disabled value={row.REGID + "," + row.REGAGE + "," + row.SERAGEUNITNUMBER + "," + row.ID + "," + row.SERV} onClick={editButtonHandle} >
                                                update age
                                            </Button>
                                        </TableCell>}

                                </TableRow>
                            )) : null}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}