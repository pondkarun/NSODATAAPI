import API from '../util/Api';
import { Cookies } from 'react-cookie'
import { setAccessToken } from "../util/Utility";

const cookies = new Cookies();

export const GetAPIkeyCloak = async () => {
  let gettoken = JSON.parse(localStorage.getItem('KEYCLOAK'));
  let succesdata;
  console.log('gettoken :>> ', gettoken);
  let GETKEYCLOAK = async() => {
    var formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("client_id", "IvbIEAOufH6b5xQQpJlulVPGGHMBUeeq");
    formData.append("client_secret", "0d833f84-0d7d-4ab5-8b61-d32900992ef7");
    formData.append("username", "directory_service");
    formData.append("password", "4Dm!n2021pdwd03");

    await API.post('/services/v1/api/keycloak', formData).then(({ data: { data } }) => {
      // console.log('items :>> ', data);
      //   dispatch(SET_KEY_CLOAK(data));
      cookies.set('token', data.token);
      setAccessToken(data.token);
      localStorage.setItem('KEYCLOAK', JSON.stringify(data));
      succesdata = data;

    }).catch((error) => {
      console.log(`error`, error);
    })
  }
  if (gettoken) {
    let checktokentime = new Date() > new Date(new Date(gettoken.time_stamps.date).getTime() + gettoken.expires_in * 1000).getTime()
    console.log('checktokentime :>> ', checktokentime);
    if (checktokentime) {
      GETKEYCLOAK()
    } else {
      succesdata = gettoken;
    }
  } else {
    GETKEYCLOAK()
  }

  return succesdata;
}