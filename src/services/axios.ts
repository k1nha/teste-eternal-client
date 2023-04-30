import axios, { AxiosInstance } from 'axios';
import * as env from 'dotenv';

env.config();

const instanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.MY_API || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instanceAxios;
