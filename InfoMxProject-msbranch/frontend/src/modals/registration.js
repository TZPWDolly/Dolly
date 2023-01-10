import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert Patient Registration ******************//
export const insertReg = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertreg`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert registration controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert registration controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update Patient Registration ******************//
export const updateReg = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updatereg`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update registration controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update registration controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }