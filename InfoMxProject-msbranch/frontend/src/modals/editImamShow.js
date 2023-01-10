import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All IMAM Patients by Org ******************//
export const editImamShow = async () => {
    try{
      const a = { orgID: sessionStorage.getItem('org'), sn: sessionStorage.getItem('serviceName')}
    const resrep = await axios.post(
      `${api}/editimamshow`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`editImamShow controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`editImamShow controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}