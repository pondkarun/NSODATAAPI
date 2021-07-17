import axios from 'axios';
import { Cookies } from 'react-cookie'
import { GetAPIkeyCloak } from '../service/API';
import { setAccessToken } from "../util/Utility";


const token = new Cookies().get('token');
const cookies = new Cookies();
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token?.token}`
  },
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    const getopenid = cookies.get('openid');
    const token = cookies.get('token');
    if (token) {
      if (new Date() > new Date(new Date(token.time_stamps?.date).getTime() + (token.refresh_expires_in-1000) * 1000).getTime() && new Date() < new Date(new Date(token.time_stamps?.date).getTime() + (token.refresh_expires_in) * 1000).getTime()) {
        console.log("หมดเวลาtoken")
        RefreshToken(token.refresh_token);
      } else {
        console.log("ยังไม่รีเฟรชนะจ้ะ");
        // RefreshToken(token.refresh_token)
      }
    }

    if (token) {
      if (getopenid) {
        headers.Authorization = "Bearer " + getopenid.token;
      } else {
        headers.Authorization = "Bearer " + token.token;
      }
    }
    return JSON.stringify(data);
  }],
});
const RefreshToken = async(refreshtokenval) => {
  let succesdata;
  const getapi = () => axios.post(process.env.NEXT_PUBLIC_APIURL+'/keycloak', {
    grant_type: "refresh_token",
    client_id: "IvbIEAOufH6b5xQQpJlulVPGGHMBUeeq",
    client_secret: "ab907cf6-0135-4fda-9447-d9885877a498",
    username: "directory_service",
    password: "4Dm!n2021@Pa55w0rd",
    refresh_token:refreshtokenval
  }).then(({ data }) => {
    console.log('datatoken :>> ', data);
    return data.data
  }).catch((error)=>{
    console.log('erortokenrefresh :>> ', error);
    GetAPIkeyCloak();
  })
  succesdata = getapi();
  let gettoken = await getapi().then((data) => data);
  console.log(gettoken)
  await cookies.set('token', gettoken);
  await setAccessToken(gettoken.token);
  location.reload();
  return succesdata;
}