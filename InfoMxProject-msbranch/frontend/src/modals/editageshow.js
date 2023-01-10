import axios from 'axios';
import {api} from '../utils/helper';

//****************** get Patient for edit age service ******************//
export const editAgeShow = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/editageshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`editageshow controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`editageshow controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}