import axios from 'axios';
import {api} from '../utils/helper';

//****************** insert MDSR ******************//
export const insertMDSR = async (a) => {
    try{
        const resrep = await axios.post(`${api}/insertMDSR`,a, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log('insertMDSR controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('insertMDSR controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }
  
  }

//****************** update MDSR ******************//
export const updateMDSR = async (a) => {
  try{
      const resrep = await axios.put(`${api}/updateMDSR`,a, {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },);
        console.log('updateMDSR controller res: ', resrep);
        return resrep;
  }catch (error) {
      console.log('updateMDSR controller error: ', error?.response?.data);
      alert(error?.response?.data?.message);
  }

}

//****************** delete MDSR ******************//
export const deleteMDSR = async (a) => {
  try{
      const resrep = await axios.put(`${api}/deleteMDSR`,a, {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },);
        console.log('deleteMDSR controller res: ', resrep);
        return resrep;
  }catch (error) {
      console.log('deleteMDSR controller error: ', error?.response?.data);
      alert(error?.response?.data?.message);
  }

}