import React, { useRef, useState, useEffect, useContext } from 'react'
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import CustomCoverageTable from '../controls/CustomCoverageTable';
import CustomClinicDetailTable from '../controls/CustomClinicDetailTable'
import CoverageChart from '../controls/CoverageChart';
import CoveragePopHhChart from '../controls/CoveragePopHhChart';
import DuplicateClinic from '../controls/DuplicateClinic'
import {UserContext} from '../context/user'

import mapData from '../../utils/mapData.json'
import { Card, Icon, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    overflow: 'auto',
    display: 'block-inline',
  },
  container: {
    maxHeight: '500px',
    width: '100%',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    marginBottom: '2%',
    marginTop: '10px'
  }
});

export default function Coverage(props) {
  const { tableID, clinicTableID, duplicateID, clinicTableData, duplicateData, tableData,
    orgChartData, tspChartData, popChartData, mapData, userLevel } = props
  const [activeCovid, setActiveCovid] = useState(null);
  const classes = useStyles();
  const {user,setUser} = useContext(UserContext);
  /*  const clinicIcon = new L.Icon({
     iconUrl: require('../../images/clinicmarker.svg'),
     iconSize: [25, 25],
     className: 'leaflet-div-icon'
   })   */

  const LocationMarker = () => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <div>
      <Grid
        direction='row'
        container
        spacing={2}
        style={{ marginTop: '2px' }}>
        <Grid item xs={6}>
          {(user === '1' || user === '4') &&
            <MapContainer className='leaflet-container' center={[20.593683, 78.962883]} zoom={6}>
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              {mapData.map(eachData => (
                <Marker
                  key={eachData.VILLAGECODE}
                  position={[eachData.VILLAGELATITUDE, eachData.VILLAGELONGITUDE]}
                  eventHandlers={{
                    click: () => {
                      setActiveCovid(eachData)
                    }
                  }}
                />
              ))}
              {activeCovid && (
                <Popup
                  position={[activeCovid.VILLAGELATITUDE, activeCovid.VILLAGELONGITUDE]}
                  onClose={() => {
                    setActiveCovid(null)
                  }}
                >
                  <div>
                    <h1>{activeCovid.CLNNAME}</h1>
                    <p>Total Population:  {activeCovid.TOTALPOP}</p>
                  </div>
                </Popup>
              )}
              <LocationMarker />
            </MapContainer>}

          <Card style={{ marginTop: '15px', background: '#fcf0f2' }}>
            <Typography variant="h5" align="center" style={{ color: '#53344d', fontWeight: 'bold', padding: '15px' }}>Number of Villages and Clinics by Oragnizations</Typography>
            <CoverageChart name="Organization" cData={orgChartData} title={"Org Title"} />
          </Card>
          <Card style={{ marginTop: '15px', background: '#fcf0f2' }}>
            <Typography variant="h5" align="center" style={{ color: '#53344d', fontWeight: 'bold', padding: '15px' }}>Total Population by Townships</Typography>
            <CoveragePopHhChart name="Township" cData={popChartData} title={"Clinic Title"} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <CustomCoverageTable tableID={tableID} tData={tableData} />
          <CustomClinicDetailTable tableID={clinicTableID} tData={clinicTableData} />
          <DuplicateClinic tableID={duplicateID} tData={duplicateData} />
        </Grid>

      </Grid>
    </div>


  );
}
//Number of Villages and Clinics by Oragnizations
