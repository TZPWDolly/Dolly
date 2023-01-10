import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from "@material-ui/icons/Search";
import Typography from '@material-ui/core/Typography';
import "./SearchBar.css";

import _ from 'lodash';
import { Chip, Grid, List, ListItem, TextField } from '@material-ui/core';
import moment from "moment";
import CustomSnackBar from "../../components/controls/CustomSnackBar";

//////////////////API//////////////////
import * as gm from '../../modals/gminfo'
import * as lab from '../../modals/labinfo'

const ddStyles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
        height: '50px',
        color: '#fff',
        textAlign: 'center',
        background: '#6c5268'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0),
        backgroundColor: '#6c5268',
        color: '#fff',

    },
});

const DialogTitle = withStyles(ddStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}  {...other}>
            <Typography variant="h6" >{children}</Typography>
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
        margin: theme.spacing(0),
        alignSelf: 'center'
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,

    },
}))(MuiDialogActions);

export default function DiagnosisSearchBar(props) {
    const { onClose, open, diagnosisData } = props;

    ////////////////Patient Search Bar//////////////////
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [chipData, setChipData] = useState([])
    //const [tableData, setTableData] = useState(tableData)
    const [selectedPatient, setSelectedPatient] = useState([])
    const [selectedPatientID, setSelectedPatientID] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [])

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const newFilter = diagnosisData.filter((value) => {
            return (value.DIAGNOSIS.toLowerCase()).includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        setSelectedPatient([])

    };

    const clearInput = () => {
        setSelectedPatient([])
        setFilteredData([]);
        setWordEntered("");
    };
    const patientClickHandle = async (e) => {
        //console.log(e.target.outerText)
        const id = e.target.outerText
        const cList = chipData
        cList.push(id)
        console.log("chipData => ", cList)
        setChipData(cList)
        console.log("Index of { =>", id.indexOf("{"))
        console.log("Index of } =>", id.indexOf("}"))
        //setSelectedPatientID(id)
        //setWordEntered(id)
        setFilteredData([])
    }

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div>

            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#ffff',
                    color: '#53344d',
                    width: '110%',
                    height: '50%'
                }
            }} onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose}>
                    Please Choose At Most 3 Diagnosis
                </DialogTitle>
                <DialogContent style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <Grid container spacing={0} style={{ paddingLeft: '1%', paddingRight: '1%' }}>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <input
                                    style={{ width: '100%', height: '40px' }}
                                    type="text"
                                    placeholder='Search Diagnosis...'
                                    value={wordEntered}
                                    onChange={handleFilter}
                                />
                                {filteredData.length === 0 ? (
                                    <SearchIcon style={{ placeSelf: 'center' }} />
                                ) : (
                                    <CloseIcon style={{ placeSelf: 'center', alignSelf: 'center' }} id="clearBtn" onClick={clearInput} />
                                )}
                            </div>
                        </Grid>

                        {filteredData.length != 0 && (
                            <div className="dataResultDiagnosis">
                                {filteredData.slice(0, 15).map((value, key) => {
                                    return (
                                        <List >
                                            <ListItem button onClick={patientClickHandle} >{value.DIAGNOSIS + " " + " {~" + value.DXCODE + "~}"} </ListItem>
                                        </List>
                                    );
                                })}
                            </div>
                        )}
                    </Grid>
                    {chipData.length != 0 && chipData.map((data) => {
                        return (
                            <div style={{ textAlign: 'center', alignSelf: 'center' }}>
                                <Chip
                                    style={{ alignSelf: 'center', margin: '10px', color: '#482642', background: '#e2dbe0', maxWidth: '90%' }}
                                    label={data.substr(0, data.indexOf("{"))}
                                    onDelete={handleDelete(data)}
                                />
                            </div>
                        );
                    })}
                </DialogContent>
            </Dialog>
        </div>
    );
}