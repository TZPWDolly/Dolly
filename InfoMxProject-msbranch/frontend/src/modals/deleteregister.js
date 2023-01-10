import axios from 'axios';
import {api} from '../utils/helper';


//****************** deleteRegister ******************//
export const deleteRegister = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteregister`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('deleteRegister controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('deleteRegister controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }