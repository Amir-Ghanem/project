import axios from 'axios';
import { auth } from '../auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://35.180.224.195:2711'
  // baseURL: 'https://localhost:7022'
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;