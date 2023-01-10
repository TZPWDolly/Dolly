import axios from 'axios';
import {api} from '../utils/helper';

//////////////Get Service Data by ID(edit btn click)////////////////
export const getServiceData = async (a) => {
    try{
      /* const a = { orgID: sessionStorage.getItem('org'), 
      RHID : sessionStorage.getItem('editRHpatientID').split(',')[1],
      regID: sessionStorage.getItem('editRHpatientID').split(',')[0]} */
    const resrep = await axios.post(
      `${api}/servicelabdatabyid`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`getServiceData controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`getServiceData controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }
}

//////////////Get Lab Data by ID(edit btn click)////////////////
export const getLabData = async (a) => {
    try{
      /* const a = { orgID: sessionStorage.getItem('org'), 
      RHID : sessionStorage.getItem('editRHpatientID').split(',')[1],
      sn: 'rh'} */
    const resrep = await axios.post(
      `${api}/servicelabdatabyid`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`getLabData controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`getLabData controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }
}

//////////////Get Lab Data by ID(edit btn click)////////////////
export const getPatient = async () => {
  try{
    const a = {  RHID : sessionStorage.getItem('editServicePatientID').split(',')[0] }
  const resrep = await axios.post(
    `${api}/servicelabdatabyid`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
        console.log(`getPatient controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getPatient controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }
}