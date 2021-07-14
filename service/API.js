import API from '../util/Api';
import { Cookies } from 'react-cookie'
import { setAccessToken } from "../util/Utility";
const cookies = new Cookies();

export const GetAPIkeyCloak = async () => {//----------------------------------------ดึงข้อมูลtokenจากKeyKlock
  // let gettoken = JSON.parse(localStorage.getItem('KEYCLOAK'));
  let gettoken = cookies.get('token');
  let succesdata;
  console.log('gettoken :>> ', gettoken);
  let GETKEYCLOAK = async () => {
    const getapi = () => API.post('/keycloak', {
      grant_type: "password",
      client_id: "IvbIEAOufH6b5xQQpJlulVPGGHMBUeeq",
      client_secret: "ab907cf6-0135-4fda-9447-d9885877a498",
      username: "directory_service",
      password: "4Dm!n2021@Pa55w0rd",
    }).then(({ data }) => data.data);
    succesdata = getapi();
    await cookies.set('token', await getapi().then((data) => data));
    await setAccessToken(await getapi().then((data) => data.token));
    return succesdata;
  }

  if (gettoken == null || gettoken == undefined) {
    let checktokentime = new Date() > new Date(new Date(gettoken?.time_stamps?.date).getTime() + gettoken.expires_in * 1000).getTime()
    // console.log('checktokentime :>> ', checktokentime);
    if (checktokentime) {
      GETKEYCLOAK()
    } else {
      setAccessToken(gettoken.token);
      succesdata = gettoken;
    }
  } else {
    GETKEYCLOAK()
  }

  return succesdata;
}
//------------------------------------ดึงลิสรายการข้อมูลของฉันทั้งหมด-----------------------------------------------------------------------//
export const Getdatalist = async () => {
  let getopenidlogin = cookies.get('openid');
  if (getopenidlogin !== null && getopenidlogin !== undefined){
    return API.get(`/datalist/all`);
  }else{
    return null;
  }
}