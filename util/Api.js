import axios from 'axios';
import { Cookies } from 'react-cookie'
import {GetAPIkeyCloak} from '../service/API';


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
      if (getopenid) {
        headers.Authorization = "Bearer " + getopenid.token;
      } else {
        headers.Authorization = "Bearer " + token.token;
      }
    }
    return JSON.stringify(data);
  }],
});