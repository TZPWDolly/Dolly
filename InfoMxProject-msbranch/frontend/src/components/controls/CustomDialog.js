import React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CustomCheckBox from '../controls/CustomCheckBox'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import _ from 'lodash';
import indicatorData from '../../utils/indicatorData.json'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
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
        padding: theme.spacing(0),
        margin: theme.spacing(0)
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomDialog(props) {
    const { onClose, open, indiChecked, indidata, indiSelect, okhandle } = props;
    const [isCheck, setIsCheck] = useState([]);
    const [indicatorList, setIndicatorList] = useState(indidata);
    const [checkCount, setCheckCount] = useState(0)

    useEffect(() => {
        setIsCheck(indiChecked);
    }, [])


    const shouldDisableCheckbox = (item) => {
        const maxAllowed = 5
        return isCheck.length >= maxAllowed && _.findIndex(isCheck, {ID: item}) === -1;
    }

    const handleToggle = async (value) => {
        console.log('click find Index: ', _.findIndex(isCheck, {ID: value.ID}));
        await indiSelect(value)
        //const currentIndex = await isCheck.indexOf(value.ID);
        if (isCheck.find(f => f.ID === value.ID)) {
            await setIsCheck(isCheck.filter(f => f.ID !== value.ID));
        } else {
            await setIsCheck([...isCheck, value])
            //await newChecked.push(value);
            //newChecked.splice(currentIndex, 1);
        }
    };

    /* const indicator = indidata.map((item) => {
        return (
                <ListItem
                    key={item.ID}
                    role={undefined}
                    dense
                    button
                    onClick={(V) => handleToggle(item)}
                    disabled={shouldDisableCheckbox(item.ID)}
                    alignItems='flex-start'>

                    <Checkbox
                        edge="start"
                        size='small'
                        checked={_.findIndex(isCheck, {ID: item.ID}) === 1}
                        tabIndex={-1}
                        disabled={shouldDisableCheckbox(item.ID)} />


                    <ListItemText id={item.ID} primary={item.RPT_NAME} value={item} style={{ paddingBlockStart: '3px', scrollPaddingBottom: '3px' }} />
                </ListItem>
        )
    }); */

    return (
        <div>
            <Dialog onClose={onClose} open={open}>
                <DialogTitle onClose={onClose}>
                    Please Choose Indicators
                </DialogTitle>
                <DialogContent dividers>
                <List>
                    {indidata.map((item) => {
                        return (
                <ListItem
                    key={item.ID}
                    role={undefined}
                    dense
                    button
                    onClick={(V) => handleToggle(item)}
                    disabled={shouldDisableCheckbox(item.ID)}
                    alignItems='flex-start'>

                    <Checkbox
                        edge="start"
                        size='small'
                        checked={isCheck.find(f => f.ID === item.ID) ? true : false}
                        tabIndex={-1}
                        disabled={shouldDisableCheckbox(item.ID)} 
                        />


                    <ListItemText id={item.ID} primary={item.RPT_NAME} value={item} style={{ paddingBlockStart: '3px', scrollPaddingBottom: '3px' }} />
                </ListItem>
                    )
                })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={okhandle} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}