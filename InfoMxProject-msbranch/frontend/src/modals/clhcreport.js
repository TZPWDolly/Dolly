import axios from 'axios';
import {api} from '../utils/helper';

//****************** CLHC ICD Report ******************//
export const clhcReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/clhcreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`clhcReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`clhcReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}