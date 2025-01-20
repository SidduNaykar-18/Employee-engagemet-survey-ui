import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.88.76.159:3005/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
