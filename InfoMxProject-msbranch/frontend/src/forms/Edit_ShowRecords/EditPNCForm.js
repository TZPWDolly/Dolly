import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import Modals from "../../components/modal";
import _ from 'lodash';

/////////Form////////////
import PNCServiceEditForm from '../../forms/Maternal_HealthService/PNCServiceEditForm'

////////Controls////////
import PNCPatientSearchBar from '../../components/controls/PNCPatientSearchBar'

////////API////////
import * as edit from '../../modals/service_editshow'

const EditPNCForm = props => {
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
            console.log("PNC getPatientForSearch => ", searchData.data.data.getPatientForSearch)
          }
          setLoading(false)
        }
    
        fn();
    
      }, []) 

      useEffect(() => {
        const fn = async () => {
    
          const edit = sessionStorage.getItem('editPNCPatient')
          setEditPage(edit)
          console.log("PNCEditShow from PNC edit form", edit)
        }
        fn();
      }, [sessionStorage.getItem('editPNCPatient')])


    return(
        <div style={{ background: '#fcf0f2' }}>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
            PNC Information</Typography>
            <PNCPatientSearchBar placeholder="Enter Patient ID..."  searchData={searchData} /* tableData={RHPatientData} *//></>

          : <PNCServiceEditForm editPage={editPage}></PNCServiceEditForm>}


      </Card >

    </div >
    )
}

export default EditPNCForm;