import axios from 'axios';
import {api} from '../utils/helper';

//****************** FPRH Report ******************//
export const fprhReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/fprhreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`fprhReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`fprhReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}