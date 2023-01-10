import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card } from "@mui/material";
import { Button, Typography } from "@material-ui/core";
import Modals from "../../components/modal";
import _ from 'lodash';

/////////Form////////////
import MDSRServiceEditForm from "../Maternal_HealthService/MDSRServiceEditForm"

////////Controls////////
import MDSRPatientSearchBar from "../../components/controls/MDSRPatientSearchBar";

////////API////////
import * as edit from '../../modals/editmdsrshow'

const EditMDSRForm = props => {
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
          const searchData = await edit.editMDSRShow()
          if(searchData)
          {
            setSearchData(searchData.data.data.editMDSRShow)
            //setRHPatientData(patient.data.data.getAllRHPatient)
            console.log("MDSR getPatientForSearch => ", searchData.data.data.editMDSRShow)
          }
          setLoading(false)
        }
    
        fn();
    
      }, []) 

      useEffect(() => {
        const fn = async () => {
    
          const edit = sessionStorage.getItem('editMDSR')
          setEditPage(edit)
          console.log("MDSR edit form show", edit)
        }
        fn();
      }, [sessionStorage.getItem('editMDSR')])


    return(
        <div style={{ background: '#fcf0f2' }}>
      <Modals open={loading} />
      <Card style={{ background: '#fcf0f2' }}>
        {(editPage === "false") ?
          <><Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
            MDSR Information</Typography>
            <MDSRPatientSearchBar placeholder="Enter Patient Name..."  searchData={searchData} /* tableData={RHPatientData} *//></>

          : <MDSRServiceEditForm editPage={editPage}></MDSRServiceEditForm>}


      </Card >

    </div >
    )
}

export default EditMDSRForm;