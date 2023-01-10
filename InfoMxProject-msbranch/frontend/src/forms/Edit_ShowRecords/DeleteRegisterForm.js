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
import CustomDeleteRegisterDialog from "../../components/controls/CustomDeleteRegisterDiaglog";
import _ from 'lodash';
import moment from 'moment';

/////////////////////API/////////////////////


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

export default function DeleteRegisterForm(props) {

    const [tableData, setTableData] = useState([])

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [delData,setDelData] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false)

    const history = useHistory();
    const classes = useStyles();

    const editButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        const parameter = {
            orgID: sessionStorage.getItem('org'),
            regID: event.currentTarget.value
        }
        console.log(parameter)
        setDelData(parameter)
        setDialogOpenControl()
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
            <Modals open={loading} />
            <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                Registeration Information</Typography>
                {dialogOpen && <CustomDeleteRegisterDialog onClose={setDialogCloseControl} open={setDialogOpenControl} data = {delData} />}
            <TableContainer
                className={classes.container}>
                <Table
                    /* id={tableID} */
                    aria-label="spanning table"
                    size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Patient<br/>ID</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Register<br/>Date</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Patient<br/>Name</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Age</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Gender</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}> Patient<br/>Type </TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Father<br/>Name</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Village<br/>Name</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Organization<br/>Name</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.patient.length ?
                            props.patient.map((row) => (
                                <TableRow>
                                    <TableCell align="center">{row.REGID}</TableCell>
                                    <TableCell align="center">{moment(row.PROVIDEDDATE).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell align="center">{row.PATIENTNAME}</TableCell>
                                    <TableCell align="center">{row.REGAGE}</TableCell>
                                    <TableCell align="center">{row.SEX}</TableCell>
                                    <TableCell align="center">{row.VISITTYPE}</TableCell>
                                    <TableCell align="center">{row.REGFATHER}</TableCell>
                                    <TableCell align="center">{row.VILLAGE_NAME}</TableCell>
                                    <TableCell align="center">{row.ORG_NAME}</TableCell>
                                    {row.ORG === sessionStorage.getItem('org') ? 
                                     <TableCell align="center">
                                     <IconButton value={row.REGID}  onClick={editButtonHandle} >
                                         <DeleteIcon style={{ color: "#53344d" }} />
                                     </IconButton>

                                 </TableCell> :
                                  <TableCell align="center">
                                  <IconButton disabled value={row.REGID}  onClick={editButtonHandle} >
                                      <DeleteIcon style={{ color: "#b9b9b9" }} />
                                  </IconButton>

                              </TableCell>}
                                   
                                </TableRow>
                            )) : null}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
