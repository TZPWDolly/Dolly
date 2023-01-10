import axios from 'axios';
import {api} from '../utils/helper';

//****************** All ICD Report ******************//
export const allicdReport = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/allicdreport`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`allicdReport controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`allicdReport controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}