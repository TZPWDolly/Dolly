import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All Org and Clinic ******************//
export const getAllOrgAndClinic = async (a) => {
    try{
    const resrep = await axios.post(
      `${api}/getallorg`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`getallorg controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`getallorg controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}