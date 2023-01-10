import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        width: '100%',
        background: '#fcf0f2',
        height: '10px',


    },
    cellOne: {
        borderBottom: 'none',
        color: '#808080',
        fontSize: '7pt',

    },
    cellTwo: {
        borderBottom: 'none',
        color: '#53344d',
        fontSize: '10pt',
        fontWeight: 'bold',


    }
});

export default function CustomUnicefTable(props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table size='small' className={classes.table} aria-label="simple table" >
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.cellOne} size='small' align="center">Organization</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="center">Donor</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="center">Project</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="center">Entry User</TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                        <TableRow>
                            <TableCell className={classes.cellTwo} align="center" size='small' >{sessionStorage.getItem('orgName')}</TableCell>
                            <TableCell className={classes.cellTwo} align="center" size='small' >{sessionStorage.getItem('donorName')}</TableCell>
                            <TableCell className={classes.cellTwo} align="center" size='small' >{sessionStorage.getItem('projName')}</TableCell>
                            <TableCell className={classes.cellTwo} align="center" size='small' >{sessionStorage.getItem('userName')}</TableCell>

                        </TableRow> 

                </TableBody>
            </Table>
        </TableContainer>
    );
}
