import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All MDSR ******************//
export const editMDSRShow = async () => {
    try{
      const a = { orgID: sessionStorage.getItem('org')}
    const resrep = await axios.post(
      `${api}/editmdsrshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`editMDSRShow controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`editMDSRShow controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}

//****************** GET Search MDSR Patient ******************//
export const getMDSRPatient = async () => {
  try{
    const a = { ID: sessionStorage.getItem('searchPatientBtn')}
  const resrep = await axios.post(
    `${api}/getmdsrpatient`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
        console.log(`getMDSRPatient controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getMDSRPatient controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

//****************** GET MDSR Patient after edit btn clicked ******************//
export const getMDSR = async () => {
  try{
    const a = { ID: sessionStorage.getItem('editServicePatientID')}
  const resrep = await axios.post(
    `${api}/getmdsr`, a,
    {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    },
  );
        console.log(`getMDSR controller res: `, resrep);
        return resrep;
  }catch (error) {
      console.log(`getMDSR controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
  }

}