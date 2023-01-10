import axios from 'axios';
import {api} from '../utils/helper';


export const coverage = async (a) => {
    try{
        const resrep = await axios.get(`${api}/coverage?${a}`, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log(`controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`controller error: `, error.response.data);
        alert(error.response.data.message);
    }

}

