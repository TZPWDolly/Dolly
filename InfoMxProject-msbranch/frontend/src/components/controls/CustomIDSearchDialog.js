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

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '300px',
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

export default function CustomIDSearchDialog(props) {
    const { onClose, open } = props;

    const [searchID, setSearchID] = useState('')

    useEffect(() => {

    }, [])

    const handleClose = () => {
        onClose(searchID, 'close');
      };

    const searchIDHandle = (event) => {
        setSearchID(event.target.value);
    };

    const searchHandle = () => {
        onClose(searchID, 'search')
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
                    Enter Patient ID
                </DialogTitle>
                <DialogContent  >
                    <TextField onChange={searchIDHandle} ></TextField>
                </DialogContent>
                <DialogActions  >
                    <Button variant="contained" autoFocus onClick={searchHandle} style={{ background: '#53344d', color: 'white' }}>
                        Search
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}