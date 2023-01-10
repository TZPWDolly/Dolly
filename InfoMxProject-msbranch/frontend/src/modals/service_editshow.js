import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All Patients by Org ******************//
export const getAllServicePatient = async () => {
    try{
      const a = { 
          orgID: sessionStorage.getItem('org'), 
          tblName: sessionStorage.getItem('tblName'),
          serviceName: sessionStorage.getItem('serviceName'),
          gmgmtype: sessionStorage.getItem('gmgmtype')}
    const resrep = await axios.post(
      `${api}/serviceeditshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`getAllServicePatient controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`getAllServicePatient controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}

////////Search by id (name မပါ)
export const getPatientForSearch = async () => {

  try{
    const a = { 
        orgID: sessionStorage.getItem('org'), 
        tblName: sessionStorage.getItem('tblName'),
        serviceName: sessionStorage.getItem('serviceName'),
      gmgmtype: sessionStorage.getItem('gmgmtype')}
  const resrep = await axios.post(
    `${api}/serviceeditshow`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
     
        console.log(`getPatientForSearch controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getPatientForSearch controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

//****************** GET a patient data by regID ******************//
export const getPatientByID = async () => {

  try{
    const a = { regID: sessionStorage.getItem('searchPatientBtn'),
    orgID: sessionStorage.getItem('org'),
    tblName: sessionStorage.getItem('tblName'),
    serviceName: sessionStorage.getItem('serviceName'),
    gmgmtype: sessionStorage.getItem('gmgmtype')}
  const resrep = await axios.post(
    `${api}/serviceeditshow`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
     
        console.log(`getpatientbyid controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getpatientbyid controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}