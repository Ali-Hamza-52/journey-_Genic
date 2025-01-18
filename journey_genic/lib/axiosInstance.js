import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL:"http://localhost:3000/api/",
  // baseURL:"http://192.168.185.50:3000/api",
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // if (error.response && error.response.status === 401) {
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
