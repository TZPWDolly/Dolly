import axios from 'axios';
import {api} from '../utils/helper';

//****************** ANC Report ******************//
export const ancReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/ancreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`ancReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`ancReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}