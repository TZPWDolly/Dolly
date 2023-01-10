import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert FP ******************//
export const insertFP = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertFP`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert FP controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert FP controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update FP ******************//
export const updateFP = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateFP`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update FP controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update FP controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete RH ******************//
export const deleteFP = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteFP`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete FP controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete FP controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }