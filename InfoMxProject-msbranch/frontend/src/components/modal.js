import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
}));



export default function Modals(props) {
  const classes = useStyles();
    console.log('modal props: ', props);
  const [open, setOpen] = useState(props.open);

/* const handleClickOpen = () => {
    setOpen(true);
  }; */



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.children ? ( props.children) : (<div className={classes.loading}><CircularProgress /><label>Loading...</label></div>)}
       {/*  <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props?.data || "Something Wrong!"}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}