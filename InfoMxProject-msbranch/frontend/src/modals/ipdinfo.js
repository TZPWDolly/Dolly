import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert IPD ******************//
export const insertIPD = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertIPD`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert IPD controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert IPD controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update IPD ******************//
export const updateIPD = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateIPD`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update IPD controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update IPD controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete IPD ******************//
export const deleteIPD = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteIPD`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete IPD controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete IPD controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }