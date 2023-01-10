import axios from 'axios';
import {api} from '../utils/helper';

//****************** clr ICD Report ******************//
export const clrReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/clrreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`clrReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`clrReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}