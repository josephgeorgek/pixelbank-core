import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions (mock implementations for now)
export const authService = {
  login: async (credentials: { organisationId: string; userId: string; password: string }) => {
    // Mock implementation - replace with actual API call
    console.log('Login attempt:', credentials);
    return Promise.resolve({ token: 'mock-token', user: { id: 1, name: 'User' } });
  },
  
  resetPassword: async (data: { organisationId: string; userId: string }) => {
    console.log('Reset password:', data);
    return Promise.resolve({ success: true });
  },
  
  activateAccount: async (data: { organisationId: string; userId: string }) => {
    console.log('Activate account:', data);
    return Promise.resolve({ success: true });
  },
  
  verifyOTP: async (otp: string) => {
    console.log('Verify OTP:', otp);
    return Promise.resolve({ success: true });
  },
};

export default httpClient;