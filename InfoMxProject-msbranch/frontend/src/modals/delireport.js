import axios from 'axios';
import {api} from '../utils/helper';

//****************** Delivery Report ******************//
export const deliReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/delireport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`deliReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`deliReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}