import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  headers: {
    'Accept':'*/*',
    'Accept-Encoding':'gzip, deflate, br',
    'Content-Type': 'application/json',
  },
});