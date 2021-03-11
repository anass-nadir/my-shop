import axios from 'axios';
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  credentials: 'same-origin',
  withCredentials: true
});
/* request.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
); */

export default request;
