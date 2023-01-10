import axios from 'axios';
import {api} from '../utils/helper';

//****************** fp Report ******************//
export const fpReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/fpreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`fpReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`fpReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}