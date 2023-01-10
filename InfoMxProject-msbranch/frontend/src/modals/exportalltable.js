import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET All Tables by Org and Project ******************//
export const exportAllTable = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/exportalltable`, a,
      {
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      },
    );
          console.log(`exportalltable controller res: `, resrep);
          return resrep;
    }catch (error) {
        console.log(`exportalltable controller error: `, error?.response?.data);
        alert(error?.response?.data?.message);
    }

}