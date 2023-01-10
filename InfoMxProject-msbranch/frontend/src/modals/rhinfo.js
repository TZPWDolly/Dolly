import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert RH ******************//
export const insertRH = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertRH`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert RH controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert RH controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update RH ******************//
export const updateRH = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateRH`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update RH controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update RH controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete RH ******************//
export const deleteRH = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteRH`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete RH controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete RH controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }