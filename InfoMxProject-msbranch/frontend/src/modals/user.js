import axios from 'axios';
import {api} from '../utils/helper';


export const login = async (a) => {
    try{
        const resrep = await axios.post(`${api}/login`, a );
          console.log('login controller res: ', resrep);
          return resrep;
    }catch (error) {
        console.log('loging controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }

}