import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
});
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;