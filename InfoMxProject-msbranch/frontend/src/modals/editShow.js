import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All Registered Patients by Org ******************//
export const editShow = async () => {
    try{
      const a = { orgID: sessionStorage.getItem('org')}
    const resrep = await axios.post(
      `${api}/editshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`editShow controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`editShow controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}

//****************** GET a patient data by regID ******************//
export const getPatientByID = async () => {

  try{
    const a = { regID: sessionStorage.getItem('editpatientID')}
  const resrep = await axios.post(
    `${api}/getpatientbyid`, a,
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

//****************** GET All Registered Patients For Search Bar ******************//
export const getPatientForSearch = async () => {
  try{
    const a = { orgID: sessionStorage.getItem('org')}
  const resrep = await axios.post(
    `${api}/getpatientforsearch`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
        console.log(`getpatientforsearch controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getpatientforsearch controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

//****************** GET Search Patient ******************//
export const getSearchPatient = async () => {

  try{
    const a = { regID: sessionStorage.getItem('searchPatientBtn')}
  const resrep = await axios.post(
    `${api}/getsearchpatient`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
     
        console.log(`getsearchpatient controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getsearchpatient controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

