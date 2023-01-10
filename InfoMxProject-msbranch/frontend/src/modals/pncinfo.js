import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert ANC ******************//
export const insertPNC = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertPNC`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert PNC controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert PNC controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update PNC ******************//
export const updatePNC = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updatePNC`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update PNC controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update PNC controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete PNC ******************//
export const deletePNC = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deletePNC`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete PNC controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete PNC controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }