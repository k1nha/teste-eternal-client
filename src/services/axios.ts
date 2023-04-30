import axios, { AxiosInstance } from 'axios';

const instanceAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instanceAxios;
