import axios from 'axios';
import { api } from '../utils/helper';

//****************** GET Diagnosis ******************//
export const getDiagnosis = async () => {

    try {
      const resrep = await axios.post(
        `${api}/getdiagnosis`, 
        {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },
      );
      
      console.log(`getdiagnosis controller res: `, resrep);
      return resrep;
    } catch (error) {
      console.log(`getdiagnosis controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
    }
  
  }

  //****************** GET IMCI ******************//
export const getIMCI = async () => {

  try {
    const resrep = await axios.post(
      `${api}/getimci`, 
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );

    console.log(`IMCI controller res: `, resrep);
    return resrep;
  } catch (error) {
    console.log(`IMCI controller error: `, error?.response?.data);
    alert(error?.response?.data?.message);
  }

}