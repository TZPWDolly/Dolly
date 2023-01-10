import axios from 'axios';
import {api} from '../utils/helper';

//****************** PNC Report ******************//
export const pncReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/pncreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`pncReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`pncReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}