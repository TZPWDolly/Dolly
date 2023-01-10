import axios from 'axios';
import {api} from '../utils/helper';

//****************** CLC ICD Report ******************//
export const clcReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/clcreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`clcReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`clcReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}