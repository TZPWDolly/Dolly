import axios from 'axios';
import {api} from '../utils/helper';


//****************** Update Patient age ******************//
export const editAge = async (a) => {
    try{
        const resrep = await axios.put(`${api}/editage`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('editAge controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('editAge controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }