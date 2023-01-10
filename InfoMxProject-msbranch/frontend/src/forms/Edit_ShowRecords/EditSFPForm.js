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
import _ from 'lodash';
import moment from 'moment';

/////////Form////////////
import SFPEditForm from "../IMAM_SFP/SFPEditForm";

////////Controls////////
import CustomSFPDeleteDialog from "../../components/controls/CustomSFPDeleteDialog";

////////API////////
import * as edit from '../../modals/editImamShow'

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

const EditSFPForm = props => {

    const [tableData, setTableData] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [editPage, setEditPage] = useState(false)

    const history = useHistory();
    const classes = useStyles();

    const editButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        history.push('entrypage')
        sessionStorage.setItem('editSFPPatient', true)
        sessionStorage.setItem('editServicePatientID', event.currentTarget.value)

    }

    const deleteButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        sessionStorage.setItem('deleteSFPPatient', "true")
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

    useEffect(async () => {
        setLoading(true)
        const table = await edit.editImamShow()
        if(table)
        {
            setTableData(table.data.data.editImamShow)
            console.log("Table Data => ", tableData)
        }
        setLoading(false)
    }, [])


    useEffect(() => {
        const fn = async () => {
            const edit = sessionStorage.getItem('editOTPPatient')
            setEditPage(edit)
            console.log("editOTPPatient from OTP edit form", edit)
        }
        fn();
    }, [sessionStorage.getItem('editOTPPatient')])


    return (
        <div style={{ background: '#fcf0f2' }}>
            {dialogOpen && <CustomSFPDeleteDialog onClose={setDialogCloseControl} open={setDialogOpenControl} />}
            <Modals open={loading} />
            <Card style={{ background: '#fcf0f2' }}>
                {(editPage === "false") ?
                    <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                        IMAM-SFP Information</Typography>
                        <TableContainer
                            className={classes.container}>
                            <Table
                                /* id={tableID} */
                                aria-label="spanning table"
                                size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>ID</TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Provided Date</TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Project</TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}> Division </TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Township</TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Clinic</TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Organization</TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Edit</TableCell>
                                        <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody >
                                    {tableData.length ?

                            tableData.map((row) => (
                                <TableRow>
                                    <TableCell align="center" >{row.ID}</TableCell>
                                    <TableCell align="center" >{moment(row.PROVIDEDDATE).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell align="center" >{row.PROJECT_NAME}</TableCell>
                                    <TableCell align="center" >{row.DIV_NAME}</TableCell>
                                    <TableCell align="center" >{row.TSPNAME}</TableCell>
                                    <TableCell align="center" >{row.CLNNAME}</TableCell>
                                    <TableCell align="center" >{row.ORGNAME}</TableCell>
                                    <TableCell align="center">
                                        <IconButton value={row.ID} onClick={editButtonHandle}>
                                            <EditIcon style={{ color: "#d91d4c" }} />
                                        </IconButton>

                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton value={row.ID} onClick={deleteButtonHandle}>
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

                    : <SFPEditForm editPage={editPage}></SFPEditForm>}


            </Card >

        </div >
    )
}

export default EditSFPForm;