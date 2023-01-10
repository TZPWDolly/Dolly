import axios from 'axios';
import {api} from '../utils/helper';


export const login = async (a) => {
    try{
        const resrep = await axios.get(`${api}/login?${a}`, {
            headers: {
              authorization: sessionStorage.getItem('token'),
            },
          },);
          console.log(`login controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`login controller error: `, error.response.data);
        alert(error.response.data.message);
    }

}

