import axios from 'axios';
import { api } from '../utils/helper';

//****************** Get MaxID ******************//
export const getMaxID = async () => {



    try {
        const a = await { orgID: sessionStorage.getItem('org')
        , tblName: sessionStorage.getItem('tblName'),
        sn:sessionStorage.getItem('serviceName') }
        const resrep = await axios.post(`${api}/getmaxid`, a, {
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        });
        console.log('getmaxid controller res: ', resrep);
        return resrep;
    } catch (error) {
        console.log('getmaxid controller error: ', error?.response?.data);
        alert(error?.response?.data?.message);
    }

}