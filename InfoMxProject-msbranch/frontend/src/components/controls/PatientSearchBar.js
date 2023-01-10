import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Grid, List, ListItem } from "@material-ui/core";
import CustomPatientTable from './CustomPatientTable'
import * as edit from "../../modals/editShow"
import Modals from "../../components/modal";

function PatientSearchBar({ placeholder, searchData, tableData }) {
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
      return (value.PATIENTNAME.toLowerCase() + value.REGID.toLowerCase()).includes(searchWord.toLowerCase());
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
    setLoading(true)
    const name = e.target.outerText
    const patientName = await name.substring(0, (name.length - 12));
    const patientID = await name.substring((patientName.length + 2), (name.length - 1))
    await setSelectedPatientID(patientID)
    await setWordEntered(patientName)
    await setFilteredData([])
    await sessionStorage.setItem('searchPatientBtn', patientID)
    let patient = await edit.getSearchPatient()
    if (patient) setSelectedPatient(patient.data.data.getSearchPatient)
    setLoading(false)
  }

  const searchButtonHandle = async () => {
    await setLoading(true)
    sessionStorage.setItem('searchPatientBtn', selectedPatientID)
    let patient = await edit.getSearchPatient()
    if (patient) await setSelectedPatient(patient.data.data.getSearchPatient)
    await setLoading(false)
    console.log("SelectPatient => ", selectedPatient)
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
                  <ListItem button onClick={patientClickHandle} >{value.PATIENTNAME + " " + " (" + value.REGID + ")"} </ListItem>
                </List>
              );
            })}
          </div>
        )}
        {/* <Grid item xs={1} style={{ width: '100%' }}>
          <Button style={{ color: 'white', backgroundColor: '#d81d4c', width: '100%' }} variant="contained" onClick={searchButtonHandle}>Search</Button>
        </Grid> */}

      </Grid>
      <CustomPatientTable searchData={selectedPatient} tdata={tableData} />
    </div>
  );
}

export default PatientSearchBar;