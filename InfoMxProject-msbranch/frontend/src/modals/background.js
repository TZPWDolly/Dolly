import axios from 'axios';
import { api } from '../utils/helper';
import cookie from 'cookies-js';


//****************** GET PROJECT ******************//
export const getProject = async () => {
  try {
    const resrep = await axios.get(`${api}/project`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('proj controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('proj controller error: ', error?.response?.data);
    alert(error?.response?.data?.message);
  }

}


//****************** GET All Division ******************//
export const getDivision = async () => {
  try {
    const resrep = await axios.get(`${api}/division`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('division controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('division controller error: ', error?.response?.data);
    alert(error?.response?.data?.message);
  }

}



//****************** GET STATE ******************//
export const getState = async (a) => {
  try {
    const resrep = await axios.get(`${api}/state?${a}`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('state controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('state controller error: ', error.response.data);
    alert(error.response.data.message);
  }

}


//****************** GET TOWNSHIP ******************//
export const getTsp = async (a) => {
  try {
    const resrep = await axios.get(`${api}/tsp?${a}`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('tsp controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('tsp controller error: ', error.response.data);
    alert(error.response.data.message);
  }

}

//****************** GET TOWNSHIP By A Division ******************//
export const getTspByDiv = async (a) => {
  try{
   const resrep = await axios.post(
     `${api}/tspdiv`, a,
     {
       headers: {
         authorization: sessionStorage.getItem('token'),
       },
     },
   );
         console.log(`getTspByDiv controller res: `, resrep);
         return resrep;
   }catch (error) {
       console.log(`getTspByDiv controller error: `, error?.response?.data);
       alert(error?.response?.data?.message);
   }

}

//****************** GET Village By A Township ******************//
export const getVillageByTsp = async (a) => {
  try{
   const resrep = await axios.post(
     `${api}/villagetsp`, a,
     {
       headers: {
         authorization: sessionStorage.getItem('token'),
       },
     },
   );
         console.log(`getVillageByTsp controller res: `, resrep);
         return resrep;
   }catch (error) {
       console.log(`getVillageByTsp controller error: `, error?.response?.data);
       alert(error?.response?.data?.message);
   }

}

//****************** GET Clinic By A tsp ******************//
export const getClinicByTsp = async (a) => {
  try{
   const resrep = await axios.post(
     `${api}/clinictsp`, a,
     {
       headers: {
         authorization: sessionStorage.getItem('token'),
       },
     },
   );
         console.log(`getClinicByTsp controller res: `, resrep);
         return resrep;
   }catch (error) {
       console.log(`getClinicByTsp controller error: `, error?.response?.data);
       alert(error?.response?.data?.message);
   }

}

//****************** GET All Org (no Filter) ******************//
export const getAllOrg = async (a) => {
  try{
   const resrep = await axios.post(
     `${api}/allorg`, a,
     {
       headers: {
         authorization: sessionStorage.getItem('token'),
       },
     },
   );
         console.log(`getAllOrg controller res: `, resrep);
         return resrep;
   }catch (error) {
       console.log(`getAllOrg controller error: `, error?.response?.data);
       alert(error?.response?.data?.message);
   }

}


//****************** GET CLINIC ******************//
export const getClinic = async (a) => {
  try {
    const resrep = await axios.get(`${api}/clinic?${a}`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('clinic controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('clinic controller error: ', error.response.data);
    alert(error.response.data.message);
  }

}


//****************** GET ORGANIZATION ******************//
export const getOrg = async (a) => {
  try {
    const resrep = await axios.get(`${api}/org?${a}`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('org controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('org controller error: ', error.response.data);
    alert(error.response.data.message);
  }

}


//****************** GET INTICATORS ******************//
export const getIndi = async (a) => {
  console.log("a above try catch =====> " + a)
  try {
    const resrep = await axios.get(`${api}/indi?${a}`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('indi controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('indi controller error: ', error.response.data);
    alert(error.response.data.message);
  }

}

//****************** GET INTICATORS ******************//
export const getService = async () => {
  try {
    const resrep = await axios.get(`${api}/service`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('service controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('service controller error: ', error.response.data);
    alert(error.response.data.message);
  }

}


//****************** LOGIN By Dolly ******************//
//****************** GET Donar ******************//
export const donor = async () => {
  try {
    const resrep = await axios.get(`${api}/donor`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('donar controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('donar controller error: ', error?.response?.data);
    alert(error?.response?.data?.message);
  }

}

//****************** GET All Township ******************//
export const getAllTownship = async () => {
  try {
    const resrep = await axios.get(`${api}/getAllTownship`, {
      headers: {
        authorization: sessionStorage.getItem('token'),
      },
    });
    console.log('getAllTownship controller res: ', resrep);
    return resrep;
  } catch (error) {
    console.log('getAllTownship controller error: ', error?.response?.data);
    alert(error?.response?.data?.message);
  }

}

//****************** Register ******************//
//****************** GET Village by Org ******************//
export const getVillageByOrg = async () => {

  const token = await sessionStorage.getItem('token')
  const orgID = await sessionStorage.getItem('org')
  const projID = await sessionStorage.getItem('project')
  console.log("OrgID and ProjID from frontend modal ", orgID, projID)

  try {
    const a = { orgID: sessionStorage.getItem('org'), projID: sessionStorage.getItem('project') }
    const res = await axios.post(
      `${api}/getvillageorg`, a,
      {
        headers: {
          authorization: token,
        },
      },
    );

    console.log('getVillageByOrg controller res: ', res);
    return res;
  } catch (error) {
    console.log('getVillageByOrg controller error: ', error?.response?.data);
    alert(error?.response?.data?.message);
  }

}
