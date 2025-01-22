import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://18.209.65.205:3005/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
