import axios from 'axios';

export default axios.create({
  baseURL: "localhost/",
  headers: {
    'Content-Type': 'application/json',
  },
});