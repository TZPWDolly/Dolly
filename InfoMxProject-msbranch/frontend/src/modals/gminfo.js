import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert GM ******************//
export const insertGM = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertGM`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert GM controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert GM controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update GM ******************//
export const updateGM = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateGM`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update GM controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update GM controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete GM ******************//
export const deleteGM = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteGM`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete GM controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete GM controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }