import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
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

import { Card } from '@material-ui/core';

import CustomFPDeleteDialog from '../controls/CustomFPDeleteDialog';


const useStyles = makeStyles({
    container: {
        maxHeight: '400px',
        width: '98%',
        borderRadius: '5px',
        position: 'revert',
        background: '#fcf0f2',
        marginLeft: '1%',
        marginRight: '1%'
    },
});



export default function CustomFPPatientTable(props) {

    const classes = useStyles();
    const { tableID, searchData, tdata } = props
    const [dialogOpen, setDialogOpen] = useState(false)

    const history = useHistory();

    const editButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        history.push('entrypage')
        sessionStorage.setItem('editFPPatient', true)
        sessionStorage.setItem('editServicePatientID', event.currentTarget.value)

    }

    const deleteButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        sessionStorage.setItem('deleteFPPatient', "true")
        sessionStorage.setItem('deleteServicePatientID', event.currentTarget.value)
        setDialogOpen(true)
    }

    //Dialog
    const setDialogOpenControl = () => {
        setDialogOpen(true)
    }
    const setDialogCloseControl = async () => {


        setDialogOpen(false)


    }

    return (
        <>
            {dialogOpen && <CustomFPDeleteDialog onClose={setDialogCloseControl} open={setDialogOpenControl} />}
            <TableContainer
                className={classes.container}>
                <Table
                    id={tableID}
                    aria-label="spanning table"
                    size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>RegID</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Provided Date</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Patient Name</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}> Age </TableCell>

                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Township</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Clinic</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Organization</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Edit</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {searchData.length ?

                            searchData.map((row) => (
                                <TableRow>
                                    <TableCell align="center" >{row.REGID}</TableCell>
                                    <TableCell align="center" >{moment(row.PROVIDEDDATE).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell align="center" >{row.REGNAME}</TableCell>
                                    <TableCell align="center" >{row.AGE + row.AGEUNIT}</TableCell>
                                    <TableCell align="center" >{row.TSP_NAME}</TableCell>
                                    <TableCell align="center" >{row.CLN_NAME}</TableCell>
                                    <TableCell align="center" >{sessionStorage.getItem('orgName')}</TableCell>
                                    <TableCell align="center">
                                        <IconButton value={row.REGID + ',' + row.ID} onClick={editButtonHandle}>
                                            <EditIcon style={{ color: "#d91d4c" }} />
                                        </IconButton>

                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton value={row.REGID + ',' + row.ID} onClick={deleteButtonHandle}>
                                            <DeleteIcon style={{ color: "#d91d4c" }} />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))
                            : null}


                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

/* tdata.map((row) => (
    <TableRow>
        <TableCell align="center" >{row.REGID}</TableCell>
        <TableCell align="center" >{moment(row.PROVIDEDDATE).format('DD-MM-YYYY')}</TableCell>
        <TableCell align="center" >{row.REGNAME}</TableCell>
        <TableCell align="center" >{row.AGE + row.AGEUNIT}</TableCell>
        <TableCell align="center" >{row.TSP_NAME}</TableCell>
        <TableCell align="center" >{row.CLN_NAME}</TableCell>
        <TableCell align="center" >{sessionStorage.getItem('orgName')}</TableCell>
        <TableCell align="center">
            <IconButton value={row.REGID + ',' + row.ID} onClick={editButtonHandle}>
                <EditIcon style={{ color: "#d91d4c" }} />
            </IconButton>

        </TableCell>
        <TableCell align="center">
            <IconButton value={row.REGID + ',' + row.ID} onClick={deleteButtonHandle}>
                <DeleteIcon style={{ color: "#d91d4c" }} />
            </IconButton>

        </TableCell>
    </TableRow> */
