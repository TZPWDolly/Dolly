import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import Modals from "../../components/modal";
import _ from 'lodash';

/////////Form////////////
import RHServiceEditForm from '../../forms/SRHService/RHServiceEditForm'

////////Controls////////
import RHPatientSearchBar from '../../components/controls/RHPatientSearchBar'

////////API////////
import * as edit from '../../modals/rheditshow'

const EditRHForm = props => {

    //RhPatientData
  
  const [RHPatientData, setRHPatientData] = useState([])
  const [RHSearchData, setRHSearchData] = useState([])
  const [tableData, setTableData] = useState([])
    
    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [editPage, setEditPage] = useState(false)

    useEffect(() => {
        const fn = async () => {
          setLoading(true)
          //const patient = await edit.getAllRHPatient()
          const searchData = await edit.getPatientForSearch()
          if(searchData)
          {
            setRHSearchData(searchData.data.data.getPatientForSearch)
            //setRHPatientData(patient.data.data.getAllRHPatient)
            console.log("RH getPatientForSearch => ", searchData.data.data.getPatientForSearch)
          }
          setLoading(false)
        }
    
        fn();
    
      }, [])

      useEffect(() => {
        const fn = async () => {
    
          const edit = sessionStorage.getItem('editRHPatient')
          setEditPage(edit)
          console.log("RHEditShow from RH edit form", edit)
        }
        fn();
      }, [sessionStorage.getItem('editRHPatient')])

    return (
      <div style={{ background: '#fcf0f2' }}>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
            RH Information</Typography>
            <RHPatientSearchBar placeholder="Enter Patient ID..."  searchData={RHSearchData} /* tableData={RHPatientData} *//></>

          : <RHServiceEditForm editPage={editPage}></RHServiceEditForm>}


      </Card >

    </div >
    );
}

export default EditRHForm;