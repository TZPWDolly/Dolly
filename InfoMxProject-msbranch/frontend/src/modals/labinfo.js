import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert Lab ******************//
export const insertLab = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertLab`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert Lab controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert Lab controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update Lab ******************//
export const updateLab = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateLab`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update Lab controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update Lab controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete Lab ******************//
export const deleteLab = async (a) => {
    try{
      
        const resrep = await axios.put(`${api}/deleteLab`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete Lab controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete Lab controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }