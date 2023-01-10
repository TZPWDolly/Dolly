import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    menuPaper: {
      maxHeight: 100
    }
  }));

export default function CustomTextField(props) {

    const { defaultValue,text, value, variant, onChange, helperText,variantText, ...other } = props
    const classes = useStyles();

    return (
        <TextField
            select
            defaultValue={defaultValue}
            size="small"
            value={value}
            label={text}
            onChange={onChange}
            SelectProps={{
                native: true,
            }}
            helperText={helperText}
            variant={variantText}
            {...other}>
                
        </TextField>
    )

}

//variant={variant || "outlined"}