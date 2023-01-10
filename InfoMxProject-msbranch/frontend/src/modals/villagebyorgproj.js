import axios from 'axios';
import { api } from '../utils/helper';


//****************** GET Clinic By org,proj ******************//
export const getVillageByOrgProj = async () => {
  
    console.log("OrgID from database => ", sessionStorage.getItem('org'))
  
    try {
      let a = { projID: sessionStorage.getItem('project') , orgID: sessionStorage.getItem('org') }
      console.log("a from getVillageByOrgProj rhform => ", a.projID, a.orgID)
  
      const resrep = await axios.post(
        `${api}/getvillagebyorgproj`, a,
        {
          headers: {
            authorization: sessionStorage.getItem('token'),
          },
        },
      );
  
      console.log(`getVillageByOrgProj controller res: `, resrep);
      return resrep;
    } catch (error) {
      console.log(`getVillageByOrgProj controller error: `, error?.response?.data);
      alert(error?.response?.data?.message);
    }
  
  }