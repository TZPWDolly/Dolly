import React, { useState,useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    titleCell: {
        fontSize: 16,
        color: '#482642',
        fontWeight: 'bolder',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        width:'50px',
        maxWidth:'60px',
        padding: 5,
        borderBottom: 'none'
    },
    titleCelltwo: {
        fontSize: 16,
        color: '#482642',
        fontWeight: 'bolder',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        width:'40px',
        maxWidth:'50px',
        padding: 5,
        borderBottom: 'none'
    },
    dataCell: {
        fontSize: 15,
        color: '#d91d4c',
        fontWeight: 'bolder',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        width:'200px',
        maxWidth:'200px',
        padding: 5,
        borderBottom: 'none'
    }
  });

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function CustomSimpleTable(props) {
    
    const { projectData, stateData, tspData, orgData, clnData, stDate, edDate } = props;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table" size='small'>
                <TableBody>
                    <StyledTableRow>
                        <TableCell align="right" className={classes.titleCelltwo}>Project :</TableCell>
                        <TableCell align="left" component="div" className={classes.dataCell}>{projectData.toString()}</TableCell>
                        <TableCell align="right" className={classes.titleCell}>Organization :</TableCell>
                        <TableCell align="left" className={classes.dataCell}>{orgData.toString()}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell align="right" className={classes.titleCelltwo}>State :</TableCell>
                        <TableCell align="left" className={classes.dataCell}>{stateData.toString()}</TableCell>
                        <TableCell align="right" className={classes.titleCell}>Clinic :</TableCell>
                        <TableCell align="left" className={classes.dataCell}>{clnData.toString()}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell align="right" className={classes.titleCelltwo}>Township :</TableCell>
                        <TableCell align="left" className={classes.dataCell}>{tspData.toString()}</TableCell>
                        <TableCell align="right" className={classes.titleCell}>Date :</TableCell>
                        <TableCell align="left" className={classes.dataCell}>{`From ${stDate} - To ${edDate}`}</TableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}