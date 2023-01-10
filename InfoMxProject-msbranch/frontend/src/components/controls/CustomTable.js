import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import tableData from '../../utils/tableData.json'
import { Card } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        overflow: 'auto',
        display: 'block-inline',
    },
    container: {
        maxHeight: '500px',
        width: '100%',
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        marginBottom: '2%',
        marginTop: '10px'
    }
});

export default function CustomTable(props) {

    const classes = useStyles();
    const { tableID, tdata } = props

    const total = (value) => {
        let result = 0;
        for (var i of tdata) {
            result += parseInt(i[`${value}`])
            //console.log("Result" + i[`${value}`])
        }
        return result;
    }

    return (
        <Card className={classes.root}>
            <TableContainer
                className={classes.container}>
                <Table
                    id={tableID}
                    aria-label="spanning table"
                    size='small'
                    style={{ border: '3px solid darkslategray' }}>
                    <TableHead className="tableHead">
                        <TableRow>
                            <TableCell align="center" rowSpan={2} style={{ border: '2px solid lightGray', color: 'white' }}>Organization</TableCell>
                            <TableCell align="center" rowSpan={2} style={{ border: '2px solid lightGray', color: 'white' }}>Township</TableCell>
                            <TableCell align="center" rowSpan={2} style={{ border: '2px solid lightGray', color: 'white' }}>Clinic</TableCell>
                            <TableCell align="center" colSpan={3} style={{ border: '2px solid lightGray', color: 'white' }}> {`< 5year`} </TableCell>
                            <TableCell align="center" colSpan={3} style={{ border: '2px solid lightGray', color: 'white' }}>{`>= 5year`}</TableCell>
                            <TableCell align="center" rowSpan={2} style={{ border: '2px solid lightGray', color: 'white' }}>Total</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>Male</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>Female</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>Total</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>Male</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>Female</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {tdata.map((row) => (
                            <TableRow>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.ORGNAME}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.TSPNAME}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.CLNNAME}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.AGE5M}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.AGE5F}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.TOTAL1}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.AGEG5M}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.AGEG5F}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.TOTAL2}</TableCell>
                                <TableCell align="center" style={{ border: '1px solid lightGray' }}>{row.ALLTOTAL}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow className='tableBottom'>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }} colSpan={3}>Total</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>{total("AGE5M")}</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>{total("AGE5F")}</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>{total("TOTAL1")}</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>{total("AGEG5M")}</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>{total("AGEG5F")}</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>{total("TOTAL2")}</TableCell>
                            <TableCell align="center" style={{ border: '2px solid lightGray', color: 'white' }}>{total('ALLTOTAL')}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </Card>
    );
}
