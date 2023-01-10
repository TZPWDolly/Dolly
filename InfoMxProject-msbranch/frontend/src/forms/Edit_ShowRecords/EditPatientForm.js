import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import CustomTextField from "../../components/controls/CustomTextFieldFilled";
import CustomSnackBar from "../../components/controls/CustomSnackBar";

import { insertReg } from "../../modals/registration";
import { getVillageByOrg } from "../../modals/background";

import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";

import RegisterForm from '../../forms/Register/RegisterForm';

////////Context////////
import { RegPatientContext } from '../../components/context/regPatient'

////////Controls////////
import PatientSearchBar from '../../components/controls/PatientSearchBar'

///API////
import * as edit from "../../modals/editShow"

import Modals from "../../components/modal";
import _ from 'lodash';


const EditPatientForm = props => {

  //Regpatientdata
  //const {regPatientData, setRegPatientData} = useContext(RegPatientContext)
  const [regPatientData, setRegPatientData] = useState([])
  const [tableData, setTableData] = useState([])

  ///////Background Data///////////
  const [loading, setLoading] = useState(false);
  const [editPage, setEditPage] = useState(false)
  const [editPatientID, setEditPatientID] = useState('')
  const history = useHistory();

  useEffect(() => {
    const fn = async () => {
      await setLoading(true)
      const reg = await edit.getPatientForSearch()
      //const table = await edit.editShow()
      if (reg ) {
        setRegPatientData(reg.data.data.getPatientForSearch)
        //setTableData(table.data.data.getAllRegPatitent)
      }
      await setLoading(false)
    }

    fn();


  }, [])

  useEffect(() => {
    const fn = async () => {

      const edit = sessionStorage.getItem('editPatient')
      setEditPage(edit)
      console.log("editShow from edit form", edit)
    }
    fn();
  }, [sessionStorage.getItem('editPatient')])

  return (
    <div>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
            Registered Information</Typography>
            <PatientSearchBar placeholder="Enter Patient Name or ID..." searchData={regPatientData} tableData={tableData}/></>

          : <RegisterForm editPage={editPage}></RegisterForm>}


      </Card >

    </div >


  );
}
export default EditPatientForm
