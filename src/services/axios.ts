import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instanceAxios;
