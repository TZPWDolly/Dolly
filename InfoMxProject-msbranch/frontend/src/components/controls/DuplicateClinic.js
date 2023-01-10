import React, { useRef, useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { Button, FormLabel, IconButton, TextField } from '@material-ui/core';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import FilterAltIcon from '@material-ui/icons/FilterList';
import { DuplicateFunction } from './DuplicateFunction';
import CustomSnackBar from '../controls/CustomSnackBar';

const useStyles = makeStyles({
    table: {
        overflow: 'auto',
        display: 'block-inline',
    },
    container: {
        maxHeight: '500px',
        width: '100%',
        marginBottom: '10px'
    },
});

const option = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export default function DuplicateClinic(props) {

    const { tableID, tData } = props
    const classes = useStyles();

    const [project, setProject] = useState([])
    const [openSnack, setOpenSnack] = useState(false)
    const [parr, setParr] = useState([])

    const setSnackBarOpen = () => {
        setOpenSnack(true)
    }

    const setSnackBarClose = () => {
        setOpenSnack(false)
    }

    const setProjectData = tData.map(item => {
        var container = {};
        container.value = item.PROJECTCODE;
        container.label = item.PROJECTNAME
        return container;
    })

    const splitArr = (arr) => {
        const output = [];
        let last = 0;
        for (let i = 1; i <= arr.length; i++) {
            if (arr[i]?.pcode !== arr[i - 1]?.pcode) {
                output.push(arr.slice(last, i));
                last = i;
            }
        }
        return output;
    };

    const duoCompare = (arr1, arr2) => {

        let arr = []
        let alldata = {}
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {

                if (arr1[i].ccode === arr2[j].ccode) {
                    alldata.pname = `${arr1[i].pname},${arr2[j].pname}`
                    alldata.ccode = arr1[i].ccode
                    alldata.cname = arr1[i].cname
                    arr.push(alldata)
                }
            }
        }

        return arr;

    }
    let combineArr = []

    const filterTable = async () => {

        let datas = []

        if(project)
        {
            for (const a of tData) {
                let alldata = {}
                for (let b of project) {
                    if (a.PROJECTCODE === b.value) {
                        alldata.pcode = a.PROJECTCODE
                        alldata.pname = a.PROJECTNAME
                        alldata.ccode = a.CLNCODE
                        alldata.cname = a.CLNNAME
                        datas.push(alldata)
                    }

                }

            }
            var seperateArr = splitArr(datas.sort((a, b) => a.pcode.localeCompare(b.pcode)))

            setParr(DuplicateFunction(seperateArr))
        }
        
        if (!project || project.length<2) {
            setSnackBarOpen()
            console.log(openSnack)
        }

        console.log({ parr })

    }

    return (

        <div>
            <Grid container direction="row" style={{ marginBottom: '5px' }}>
                <Grid item style={{ minWidth: '93%', maxWidth: '93%', marginRight: '5px' }}>
                    <Select
                        isMulti
                        placeholder="Project"
                        defaultValue={project}
                        onChange={setProject}
                        options={_.uniqWith(setProjectData, _.isEqual)}
                    />
                </Grid>
                <Grid item style={{ minWidth: '5%', maxWidth: '5%', alignSelf: 'center' }}>
                    <IconButton color="secondary" size='small' onClick={() => filterTable()}>
                        <FilterAltIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <TableContainer component={Paper} className={classes.container}>
                <Table id={tableID} stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="tableHead" style={{ background: '#f8dadd' }}>
                        <TableRow>
                            <TableCell align="center" style={{ background: '#fcf0f2', color: '#53344d', fontWeight: 'bold' }}>No.</TableCell>
                            <TableCell align="center" style={{ background: '#fcf0f2', color: '#53344d', fontWeight: 'bold' }}>Overlap Clinic</TableCell>
                            <TableCell align="center" style={{ background: '#fcf0f2', color: '#53344d', fontWeight: 'bold' }}>Clinic Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {/* {resultt && resultt.map(item => {
                            return (
                                <TableRow>
                                    <TableCell>{`${item.}`}</TableCell>
                                    <TableCell>{item.cname}</TableCell>
                                </TableRow>
                            )
                        })} */}

                        {parr && parr.map((item, index) => (
                            <TableRow key={index.toString()}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{`${item.name.join(' , ')}`}</TableCell>
                                <TableCell align="center">{item.ccname}</TableCell>
                            </TableRow>
                        ))}

                       {(!parr.length || project.length<2) &&
                            <TableRow key='nodata'>
                                <TableCell align="center">-</TableCell>
                                <TableCell align="center">No Data</TableCell>
                                <TableCell align="center">No Data</TableCell>
                            </TableRow>
                        }  

                    </TableBody>
                </Table>
            </TableContainer>
            {openSnack && <CustomSnackBar open={setSnackBarOpen} close={setSnackBarClose} alertMsg=" Please Choose at Least Two Projects" />}
        </div>





    )
}