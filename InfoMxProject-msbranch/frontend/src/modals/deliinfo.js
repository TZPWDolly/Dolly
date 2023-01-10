import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert Deli ******************//
export const insertDELI = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertDELI`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert Deli controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert Deli controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update Deli ******************//
export const updateDELI = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateDELI`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update Deli controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update Deli controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete Deli ******************//
export const deleteDELI = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteDELI`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete Deli controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete Deli controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }