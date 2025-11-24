// utils/axios.js

import axios from 'axios';


const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;