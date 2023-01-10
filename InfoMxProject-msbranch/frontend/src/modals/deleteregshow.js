import axios from 'axios';
import {api} from '../utils/helper';

//****************** get Patient for delete reg ******************//
export const deleteRegShow = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/deleteregshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`deleteregshow controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`deleteregshow controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}