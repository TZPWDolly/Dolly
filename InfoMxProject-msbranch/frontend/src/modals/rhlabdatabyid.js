import axios from 'axios';
import {api} from '../utils/helper';

//////////////Get Lab Data by ID(edit btn click)////////////////
export const getLabData = async (a) => {
    try{
      const a = { orgID: sessionStorage.getItem('org'), 
      RHID : sessionStorage.getItem('editServicePatientID').split(',')[1],
      regID: sessionStorage.getItem('editServicePatientID').split(',')[0],
      sn: sessionStorage.getItem('serviceName'),
      tblName : sessionStorage.getItem('tblName'),
    gmgmtype : sessionStorage.getItem('gmgmtype')} 
    const resrep = await axios.post(
      `${api}/rhlabdatabyid`, a,
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