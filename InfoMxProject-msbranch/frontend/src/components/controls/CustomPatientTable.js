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



export default function CustomPatientTable(props) {

    const classes = useStyles();
    const { tableID, searchData, tdata } = props

    const history = useHistory();

    const [searchPatient, setSearchPatient] = useState([])

    const editButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        sessionStorage.setItem('editPatient', true)
        history.push('entrypage')
        sessionStorage.setItem('editpatientID', event.currentTarget.value)

    }

    const deleteButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        sessionStorage.setItem('deletePatient', "true")
        sessionStorage.setItem('deletepatientID', event.currentTarget.value)
    }

    return (
        <>

            <TableContainer
                className={classes.container}>
                <Table
                    id={tableID}
                    aria-label="spanning table"
                    size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>RegID</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Registration Date</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Patient Name</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}> Age </TableCell>

                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Father</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Village</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Organization</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Edit</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {searchData.length ?
                            <TableRow>
                                <TableCell align="center" >{searchData[0].REGID}</TableCell>
                                <TableCell align="center" >{moment(searchData[0].PROVIDEDDATE).format('DD-MM-YYYY')}</TableCell>
                                <TableCell align="center" >{searchData[0].PATIENTNAME}</TableCell>
                                <TableCell align="center" >{searchData[0].REGAGE + searchData[0].AGEUNIT}</TableCell>
                                <TableCell align="center" >{searchData[0].REGFATHER}</TableCell>
                                <TableCell align="center" >{searchData[0].VILLAGE_NAME}</TableCell>
                                <TableCell align="center" >{searchData[0].ORG_NAME}</TableCell>
                                <TableCell align="center">
                                    {(searchData[0].ORG === sessionStorage.getItem('org')) ?
                                        <IconButton value={searchData[0].REGID} onClick={editButtonHandle}>
                                            <EditIcon style={{ color: "#d91d4c" }} />
                                        </IconButton> :
                                        <IconButton value={searchData[0].REGID} disabled onClick={editButtonHandle}>
                                            <EditIcon style={{ color: "#b9b9b9" }} />
                                        </IconButton>}


                                </TableCell>
                                <TableCell align="center">
                                    {(searchData[0].ORG === sessionStorage.getItem('org')) ?
                                        <IconButton value={searchData[0].REGID} onClick={deleteButtonHandle}>
                                            <DeleteIcon style={{ color: "#d91d4c" }} />
                                        </IconButton> :
                                        <IconButton value={searchData[0].REGID} disabled onClick={deleteButtonHandle}>
                                            <DeleteIcon style={{ color: "#b9b9b9" }} />
                                        </IconButton>}


                                </TableCell>
                            </TableRow> : null}



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
        <TableCell align="center" >{row.PATIENTNAME}</TableCell>
        <TableCell align="center" >{row.REGAGE + row.AGEUNIT}</TableCell>
        <TableCell align="center" >{row.REGFATHER}</TableCell>
        <TableCell align="center" >{row.VILLAGE_NAME}</TableCell>
        <TableCell align="center" >{row.ORG_NAME}</TableCell>
        <TableCell align="center">
            <IconButton value={row.REGID} onClick={editButtonHandle}>
                <EditIcon style={{ color: "#d91d4c" }} />
            </IconButton>

        </TableCell>
        <TableCell align="center">
            <IconButton value={row.REGID} onClick={deleteButtonHandle} disabled>
                <DeleteIcon style={{ color: "#c1c1c1" }} />
            </IconButton>

        </TableCell>
    </TableRow> */
