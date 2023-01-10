import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All Dashboard Links ******************//
export const getDashboardLink = async () => {
    try{
    const resrep = await axios.post(
      `${api}/getDashboardLink`, 
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`getDashboardLink controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`getDashboardLink controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}