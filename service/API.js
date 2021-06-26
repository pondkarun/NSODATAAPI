import API from '../util/Api';
import { Cookies } from 'react-cookie'
import { setAccessToken } from "../util/Utility";
const cookies = new Cookies();

export const GetAPIkeyCloak = async () => {
  // let gettoken = JSON.parse(localStorage.getItem('KEYCLOAK'));
  let gettoken = cookies.get('token');
  let succesdata;
  console.log('gettoken :>> ', gettoken);
  let GETKEYCLOAK = async () => {
    const getapi =()=>  API.post('/services/v1/api/keycloak', {
      grant_type: "password",
      client_id: "IvbIEAOufH6b5xQQpJlulVPGGHMBUeeq",
      client_secret: "0d833f84-0d7d-4ab5-8b61-d32900992ef7",
      username: "directory_service",
      password: "4Dm!n2021pdwd03",
    }).then(({data})=>data.data);
    succesdata = getapi();
    await cookies.set('token', await getapi().then((data)=>data));
    await setAccessToken(await getapi().then((data)=>data.token));
    return succesdata;
  }

  if (gettoken) {
    let checktokentime = new Date() > new Date(new Date(gettoken.time_stamps.date).getTime() + gettoken.expires_in * 1000).getTime()
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