import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';
import { TextField } from '@material-ui/core';
import moment from "moment";
import CustomSnackBar from "../../components/controls/CustomSnackBar";

//////////////////API//////////////////
import * as anc from '../../modals/ancinfo'
import * as lab from '../../modals/labinfo'

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '500px',
        height: '50px',
        color: '#53344d'
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
            <Typography variant="h6" style={{ alignSelf: 'center' }} >{children}</Typography>
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

export default function CustomDeleteDialog(props) {
    const { onClose, open } = props;

    useEffect(() => {

    }, [])

   

    const handleClose = () => {
        onClose();
    };

    const deleteHandle = async() => {
        const rhData = {  ID : sessionStorage.getItem('deleteServicePatientID').split(',')[1],
      ANUSRLOGIN : sessionStorage.getItem('userName'),
      ORGID : sessionStorage.getItem('org'),
      ANREGID : sessionStorage.getItem('deleteServicePatientID').split(',')[0],
      ANUPDATE : moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
     }

     const labData = {  ID : sessionStorage.getItem('deleteServicePatientID').split(',')[1],
      LABSSOURCE : sessionStorage.getItem('serviceName'),
      LABORG : sessionStorage.getItem('org'),
      LABUPDATE : moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      
     }
        const rhres = await anc.deleteANC(rhData);
        const labres = await lab.deleteLab(labData);
        if(rhres?.status === 200 && labres?.status === 200)
        {
            await onClose()
            
        }
        
    }

    return (
        <div>
             
            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#fcf0f2',
                    color: '#53344d'
                },
            }} onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose}>
                    Do you really want to delete?
                </DialogTitle>
            
                <DialogActions  >
                    <Button variant="contained" autoFocus onClick={deleteHandle} style={{ background: '#d91d4c', color: 'white' }}>
                        OK
                    </Button>
                    <Button variant="contained" autoFocus onClick={handleClose} style={{ background: 'lightgray', color: 'black' }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}