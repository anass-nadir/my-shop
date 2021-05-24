import axios, { AxiosStatic } from 'axios';
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  withCredentials: true
}) as AxiosStatic;

export default request;
