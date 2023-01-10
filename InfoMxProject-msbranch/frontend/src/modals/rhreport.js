import axios from 'axios';
import {api} from '../utils/helper';

//****************** RH Report ******************//
export const rhReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/rhreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`rhReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`rhReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}