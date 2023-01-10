import axios from 'axios';
import {api} from '../utils/helper';

//****************** insert IMAM ******************//
export const insertIMAM = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertIMAM`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insertIMAM controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insertIMAM controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** update IMAM ******************//
export const updateIMAM = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateIMAM`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('updateIMAM controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('updateIMAM controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** delete IMAM ******************//
export const deleteIMAM = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteIMAM`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('deleteIMAM controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('deleteIMAM controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }