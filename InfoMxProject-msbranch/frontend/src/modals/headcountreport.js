import axios from 'axios';
import {api} from '../utils/helper';

//****************** HeadCount Report ******************//
export const hcReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/hcreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`hcReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`hcReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}