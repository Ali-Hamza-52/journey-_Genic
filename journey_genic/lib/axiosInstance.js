import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  // baseURL:process.env.API_BASE_URL,
  baseURL:"http://localhost:3000/api/",
  // baseURL:"http://192.168.185.50:3000/api",
  timeout: 30000,
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
    console.log("response ---->", response);
    return response.data;
  },
  (error) => {
    console.log("error ---->",error)
    return Promise.reject(error);
  }
);

export default axiosInstance;
