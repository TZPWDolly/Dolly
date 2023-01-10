import axios from 'axios';
import {api} from '../utils/helper';



export const indicator = async (a, b) => {
    try{
        const resrep = await axios.get(`${api}/indi/${b}?${a}`, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log(`${b} controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`${b} controller error: `, error.response.data);
        alert(error.response.data.message);
    }

}