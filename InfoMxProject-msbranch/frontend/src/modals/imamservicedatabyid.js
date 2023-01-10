import axios from 'axios';
import {api} from '../utils/helper';

//////////////Get Imam Service Data by ID(edit btn click)////////////////
export const getServiceData = async (a) => {
    try{
      const a = { orgID: sessionStorage.getItem('org'), 
      ID : sessionStorage.getItem('editServicePatientID'),
      sn: sessionStorage.getItem('serviceName'),
      tblName : sessionStorage.getItem('tblName')} 
    const resrep = await axios.post(
      `${api}/imamservicedatabyid`, a,
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