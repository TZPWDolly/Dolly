import axios from 'axios';
import {api} from '../utils/helper';


//****************** deleteLabService ******************//
export const deleteLabService = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deletelabservice`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('deleteLabService controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('deleteLabService controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }