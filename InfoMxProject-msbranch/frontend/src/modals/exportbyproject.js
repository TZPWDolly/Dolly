import axios from 'axios';
import {api} from '../utils/helper';

//****************** GET Tables by Selected Project ******************//
export const exportByProject = async (a) => {
    try{
     // const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project')}
    const resrep = await axios.post(
      `${api}/exportbyproject`, a,
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