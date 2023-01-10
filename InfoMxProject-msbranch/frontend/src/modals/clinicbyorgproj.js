import axios from 'axios';
import { api } from '../utils/helper';

//****************** GET Clinic By org,proj ******************//
export const getClinicByOrgProj = async () => {
  
    console.log("OrgID from database => ", sessionStorage.getItem('org'))
  
    try {
      let a = { projID: sessionStorage.getItem('project') , orgID: sessionStorage.getItem('org') }
      console.log("a from getClinicbyorgproj rhform => ", a.projID, a.orgID)
  
      const resrep = await axios.post(
        `${api}/getclinicbyorgproj`, a,
        {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },
      );
  
      console.log(`getClinicByOrgProj controller res: `, resrep);
      return resrep;
    } catch (error) {
      console.log(`getClinicByOrgProj controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
    }
  
  }
