import axios from 'axios';
import { Cookies } from 'react-cookie'
const token = new Cookies().get('token');

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
});