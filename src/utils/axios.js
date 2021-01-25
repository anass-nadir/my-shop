import axios from 'axios';
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  }
});

request.interceptors.request.use(
  config => {
    if (config.privateRoute) {
      const token = localStorage.getItem('token');
      if (token) config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default request;
