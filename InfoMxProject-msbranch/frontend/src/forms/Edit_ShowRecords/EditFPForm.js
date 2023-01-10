import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import Modals from "../../components/modal";
import _ from 'lodash';

/////////Form////////////
import FPServiceEditForm from '../../forms/SRHService/FPServiceEditForm'

////////Controls////////
import FPPatientSearchBar from '../../components/controls/FPPatientSearchBar'

////////API////////
import * as edit from '../../modals/service_editshow'

const EditFPForm = props => {
    //FPPatientData
  
  const [FPPatientData, setFPPatientData] = useState([])
  const [FPSearchData, setFPSearchData] = useState([])
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
            setFPSearchData(searchData.data.data.getPatientForSearch)
            //setRHPatientData(patient.data.data.getAllRHPatient)
            console.log("FP getPatientForSearch => ", searchData.data.data.getPatientForSearch)
          }
          setLoading(false)
        }
    
        fn();
    
      }, []) 

      useEffect(() => {
        const fn = async () => {
    
          const edit = sessionStorage.getItem('editFPPatient')
          setEditPage(edit)
          console.log("RHEditShow from FP edit form", edit)
        }
        fn();
      }, [sessionStorage.getItem('editFPPatient')])


    return(
        <div style={{ background: '#fcf0f2' }}>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
            FP Information</Typography>
            <FPPatientSearchBar placeholder="Enter Patient ID..."  searchData={FPSearchData} /* tableData={RHPatientData} *//></>

          : <FPServiceEditForm editPage={editPage}></FPServiceEditForm>}


      </Card >

    </div >
    )
}

export default EditFPForm;