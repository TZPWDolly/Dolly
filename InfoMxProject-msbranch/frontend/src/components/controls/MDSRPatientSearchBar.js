import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Grid, List, ListItem } from "@material-ui/core";
import CustomMDSRPatientTable from "./CustomMDSRPatientTable";
import * as edit from "../../modals/editmdsrshow"
import Modals from "../modal";

function MDSRPatientSearchBar({ placeholder, searchData, tableData }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  //const [tableData, setTableData] = useState(tableData)
  const [selectedPatient, setSelectedPatient] = useState([])
  const [selectedPatientID, setSelectedPatientID] = useState("")
  const [loading, setLoading] = useState(false);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = searchData.filter((value) => {
      return (value.MDNAME.toLowerCase() + value.MDNO.toString()).includes(searchWord.toLowerCase());
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
    console.log(e.target.outerText)
    setLoading(true)
    const name = e.target.outerText
    const patientName = await name.substring(name[0].indexOf("("))
    const patientID = await name.substring(name.indexOf("(")+1, name.indexOf(")"))
    await setSelectedPatientID(patientID)
    await setWordEntered(patientName)
    await setFilteredData([])
    await sessionStorage.setItem('searchPatientBtn', patientID)
    let patient = await edit.getMDSRPatient()
    if (patient) setSelectedPatient(patient.data.data.getMDSRPatient)
    setLoading(false)
  }

  return (

    <div>
      <Modals open={loading} />
      <Grid container spacing={1} style={{ paddingLeft: '1%', paddingRight: '1%', marginBottom: '10px' }}>
        <Grid item xs={12}>
          <div style={{ display: 'flex' }}>
            <input
              style={{ width: '100%', height: '40px' }}
              type="text"
              placeholder={placeholder}
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
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <List >
                   <ListItem button onClick={patientClickHandle} >{value.MDNAME + " " + "(" + value.MDNO + ")"} </ListItem>
                </List>
              );
            })}
          </div>
        )}

        {/* <Grid item xs={1} style={{ width: '100%' }}>
          <Button style={{ color: 'white', backgroundColor: '#d81d4c', width: '100%' }} variant="contained" onClick={searchButtonHandle}>Search</Button>
        </Grid> */}

      </Grid>
      <CustomMDSRPatientTable searchData={selectedPatient} tdata={tableData} /> 
    </div>
  );
}

export default MDSRPatientSearchBar;