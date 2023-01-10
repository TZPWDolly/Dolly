import axios from 'axios';
import {api} from '../utils/helper';


export const resetPassword = async (a) => {
    try{
        const resrep = await axios.post(`${api}/resetPassword`, a );
          console.log('resetPassword controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('resetPassword controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }

}