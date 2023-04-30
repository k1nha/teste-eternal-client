import axios, { AxiosInstance } from 'axios';

const instanceAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instanceAxios;
