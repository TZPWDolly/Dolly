import axios from 'axios';
import {api} from '../utils/helper';

//****************** GM Report ******************//
export const gmReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/gmreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`gmReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`gmReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}