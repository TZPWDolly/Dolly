import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All RH Patients by Org ******************//
export const getAllRHPatient = async () => {
    try{
      const a = { orgID: sessionStorage.getItem('org')}
    const resrep = await axios.post(
      `${api}/rheditshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`getAllRHPatient controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`getAllRHPatient controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}

////////Search by id (name မပါ)
export const getPatientForSearch = async () => {

  try{
  const a = { orgID: sessionStorage.getItem('org')}
  const resrep = await axios.post(
    `${api}/rheditshow`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
     
        console.log(`RHgetPatientForSearch controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`RHgetPatientForSearch controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

//****************** GET a patient data by regID ******************//
export const getPatientByID = async () => {

  try{
    const a = { regID: sessionStorage.getItem('searchPatientBtn'),orgID: sessionStorage.getItem('org')}
  const resrep = await axios.post(
    `${api}/rheditshow`, a,
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