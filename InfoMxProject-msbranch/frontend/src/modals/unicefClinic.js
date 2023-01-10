import axios from 'axios';
import { api } from '../utils/helper';

//****************** GET Clinic For Unicef ******************//
export const getUnicefClinic = async () => {
  
    try {
      let a = { projID: sessionStorage.getItem('project') , orgID: sessionStorage.getItem('org') }
      console.log("a from getUnicefClinic => ", a.projID, a.orgID)
  
      const resrep = await axios.post(
        `${api}/getunicefclinic`, a,
        {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },
      );
  
      console.log(`getUnicefClinic controller res: `, resrep);
      return resrep;
    } catch (error) {
      console.log(`getUnicefClinic controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
    }
  
  }