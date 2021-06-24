import axios from 'axios';
import { Cookies } from 'react-cookie'
const token = new Cookies().get('token');
const cookies = new Cookies();

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    const getopenid = cookies.get('openid');
    if (getopenid) {
      headers.Authorization = "Bearer " + getopenid.token;
    }else{
      headers.Authorization = "Bearer " + cookies.get('token');
    }
    return JSON.stringify(data);
  }],
});