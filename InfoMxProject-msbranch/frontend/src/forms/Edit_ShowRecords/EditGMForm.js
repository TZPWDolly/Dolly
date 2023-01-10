import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import Modals from "../../components/modal";
import _ from 'lodash';

/////////Form////////////
import GMServiceEditForm from '../../forms/GerenalService/GMServiceEditForm'

////////Controls////////
import GMPatientSearchBar from '../../components/controls/GMPatientSearchBar'

////////API////////
import * as edit from '../../modals/service_editshow'

const EditGMForm = props => {
    //FPPatientData
  
  const [searchData, setSearchData] = useState([])
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
            setSearchData(searchData.data.data.getPatientForSearch)
            //setRHPatientData(patient.data.data.getAllRHPatient)
            console.log("GM getPatientForSearch => ", searchData.data.data.getPatientForSearch)
          }
          setLoading(false)
        }
    
        fn();
    
      }, []) 

      useEffect(() => {
        const fn = async () => {
    
          const edit = sessionStorage.getItem('editGMPatient')
          setEditPage(edit)
          console.log("GMEditShow from PNC edit form", edit)
        }
        fn();
      }, [sessionStorage.getItem('editGMPatient')])


    return(
        <div style={{ background: '#fcf0f2' }}>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <>
          {sessionStorage.getItem('gmgmtype')==='3' ? 
          <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
          OPD Medical Information</Typography> : 
          sessionStorage.getItem('gmgmtype')==='2' ? 
          <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
          OPD Surgery Information</Typography> : 
          <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
          GM Information</Typography>}

            <GMPatientSearchBar placeholder="Enter Patient ID..."  searchData={searchData} /* tableData={RHPatientData} *//></>

          : <GMServiceEditForm editPage={editPage}></GMServiceEditForm>}


      </Card >

    </div >
    )
}

export default EditGMForm;