import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this to your computer's IP address if testing on a physical device
// For Android emulator: 10.0.2.2
// For iOS simulator: localhost
// For physical device: your computer's local IP (e.g., 192.168.1.x)
const BASE_URL = 'http://10.0.2.2:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const authAPI = {
  register: async (name, email, phoneNo, password) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      phone_no: phoneNo,
      password,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    if (response.data.access_token) {
      await AsyncStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await api.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default api;
