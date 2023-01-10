import axios from 'axios';
import {api} from '../utils/helper';

//****************** get Patient for delete service ******************//
export const deleteServiceShow = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/deleteserviceshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`deleteserviceshow controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`deleteserviceshow controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}