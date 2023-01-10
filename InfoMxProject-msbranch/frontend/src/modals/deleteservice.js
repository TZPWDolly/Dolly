import axios from 'axios';
import {api} from '../utils/helper';


//****************** deleteService ******************//
export const deleteService = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteservice`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('deleteService controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('deleteService controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }