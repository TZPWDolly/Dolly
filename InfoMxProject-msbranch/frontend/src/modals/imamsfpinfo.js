import axios from 'axios';
import {api} from '../utils/helper';

//****************** insert IMAMSFP ******************//
export const insertIMAMSFP = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertIMAMSFP`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insertIMAMSFP controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insertIMAMSFP controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }


//****************** update IMAMSFP ******************//
export const updateIMAMSFP = async (a) => {
    try{
        const resrep = await axios.put(`${api}/updateIMAMSFP`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('updateIMAMSFP controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('updateIMAMSFP controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** delete IMAMSFP ******************//
export const deleteIMAMSFP = async (a) => {
    try{
        const resrep = await axios.put(`${api}/deleteIMAMSFP`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('deleteIMAMSFP controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('deleteIMAMSFP controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }