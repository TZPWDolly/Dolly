import axios from 'axios';
import { api } from '../utils/helper';


//****************** GET Patient ******************//
export const getPatient = async () => {

  try {
    const a = { regID: sessionStorage.getItem('searchid'), orgID: sessionStorage.getItem('org')}

    const resrep = await axios.post(
      `${api}/getpatient`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );

    console.log(`getpatient controller res: `, resrep);
    return resrep;
  } catch (error) {
    console.log(`getpatient controller error: `, error?.response?.data);
    alert(error?.response?.data?.message);
  }

}

//****************** GET Patient Type ******************//
export const getPatientType = async () => {

  console.log("ProjectID from getPatient => ", sessionStorage.getItem('project'))
  try {
    const a = { regID: sessionStorage.getItem('searchid')}

    const resrep = await axios.post(
      `${api}/getpatienttype`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );

    console.log(`getpatienttype controller res: `, resrep);
    return resrep;
  } catch (error) {
    console.log(`getpatienttype controller error: `, error?.response?.data);
    alert(error?.response?.data?.message);
  }

}

