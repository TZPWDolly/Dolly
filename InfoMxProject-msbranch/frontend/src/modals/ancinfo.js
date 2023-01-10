import axios from 'axios';
import {api} from '../utils/helper';

//****************** Insert ANC ******************//
export const insertANC = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertANC`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insert ANC controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insert ANC controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** Update ANC ******************//
export const updateANC = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateANC`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('update ANC controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('update ANC controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** Delete ANC ******************//
export const deleteANC = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteANC`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('delete ANC controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('delete ANC controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }