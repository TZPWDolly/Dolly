import React, { Children } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#482642",
    backgroundColor: "#fcf0f2",
    background: "#fcf0f2",
    "&:-webkit-autofill": {
      webki: "#fcf0f2"
    },
  },
  
  inner: {
    backgroundColor: "#fcf0f2",
    borderRadius: "3px",
    labelAsterisk: {
      color: "#e6212b"
    },
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "#fcf0f2"
  }
}));

const outerTheme = createTheme({
  palette: {
    primary: {
      main: "#482642"
    }
  }
});

export default function CustomUnicefTextField(props) {
  const {
    label,
    value,
    variant,
    onChange,
    helperText,
    variantText,
    defaultValue,
    children,
    ...other
  } = props;

  const classes = useStyles();

  return (
    <ThemeProvider theme={outerTheme}>
      <TextField
        value={value}
        label={label}
        onChange={onChange}
        helperText={helperText}
        variant={variantText}
        className={classes.inner}
        defaultValue={defaultValue}
        autoComplete='off'
        InputLabelProps={{
          style: { color: '#482642' },}}
        InputProps={{
          className: classes.input,
        }}
        {...other}
      >
       {children}
      </TextField>
    </ThemeProvider>
  );
}

//variant={variant || "outlined"}
