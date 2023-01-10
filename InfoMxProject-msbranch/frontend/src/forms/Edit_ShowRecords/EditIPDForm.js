import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import Modals from "../../components/modal";
import _ from 'lodash';

/////////Form////////////
import IPDServiceEditForm from "../GerenalService/IPDServiceEditForm";

////////Controls////////
import IPDPatientSearchBar from "../../components/controls/IPDPatientSearchBar";

////////API////////
import * as edit from '../../modals/service_editshow'

const EditIPDForm = props => {
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
            console.log("IPD getPatientForSearch => ", searchData.data.data.getPatientForSearch)
          }
          setLoading(false)
        }
    
        fn();
    
      }, []) 

      useEffect(() => {
        const fn = async () => {
    
          const edit = sessionStorage.getItem('editIPDPatient')
          setEditPage(edit)
          console.log("IPDEditShow from PNC edit form", edit)
        }
        fn();
      }, [sessionStorage.getItem('editIPDPatient')])


    return(
        <div style={{ background: '#fcf0f2' }}>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
            IPD Information</Typography>
            <IPDPatientSearchBar placeholder="Enter Patient ID..."  searchData={searchData} /* tableData={RHPatientData} *//></>

          : <IPDServiceEditForm editPage={editPage}></IPDServiceEditForm>}


      </Card >

    </div >
    )
}

export default EditIPDForm;