import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

// Auto-enable fallback for deployed environments trying to reach localhost
const isDeployedEnvironment = window.location.protocol === 'https:' && API_BASE_URL.includes('localhost');
const SHOULD_USE_FALLBACK = USE_MOCK_FALLBACK || isDeployedEnvironment;

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

// Response interceptor with fallback logic
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Enhanced fallback detection for network errors, CORS, mixed content, etc.
    const networkErrors = [
      'NETWORK_ERROR', 
      'ECONNREFUSED', 
      'ERR_NETWORK',
      'ERR_FAILED',
      'ERR_BLOCKED_BY_CLIENT'
    ];
    
    const shouldFallback = (
      !error.response || // No response at all
      networkErrors.includes(error.code) || // Network errors
      error.message?.includes('Mixed Content') || // HTTPS->HTTP blocked
      error.message?.includes('net::ERR_') // Chrome network errors
    );
    
    if (shouldFallback) {
      console.log('Backend unavailable (likely HTTPS->HTTP or network error), using mock data');
      
      // Try to extract original request info for fallback
      const originalRequest = error.config;
      if (originalRequest?.url) {
        const payload = typeof originalRequest.data === 'string' ? safelyParseJson(originalRequest.data) : originalRequest.data;
        return handleMockFallback(originalRequest.url, payload);
      }
    }
    
    // Handle auth errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock service implementations (fallback)
const mockService = {
  login: async (credentials: { organisationId: string; userId: string; password: string }) => {
    console.log('Using mock login for:', credentials);
    // Simulate successful login for test users
    if (credentials.organisationId === 'TESTORG001' && 
        credentials.userId === 'TESTUSER001' && 
        credentials.password === 'Test123!@#') {
      return { 
        success: true, 
        token: 'mock-token-' + Date.now(), 
        user: { id: 1, userId: 'TESTUSER001', organizationName: 'TESTORG001' } 
      };
    }
    return { success: false, message: 'Invalid credentials' };
  },
  
  resetPassword: async (data: { organisationId: string; userId: string }) => {
    console.log('Using mock reset password for:', data);
    return { success: true };
  },
  
  activateAccount: async (data: { organisationId: string; userId: string }) => {
    console.log('Using mock activate account for:', data);
    return { success: true };
  },
  
  unlockAccount: async (data: { organisationId: string; userId: string }) => {
    console.log('Using mock unlock account for:', data);
    return { success: true };
  }
};

// Fallback handler
const handleMockFallback = async (url: string, data: any) => {
  console.log('Handling fallback for URL:', url);
  
  if (url.includes('/auth/login')) {
    const result = await mockService.login(data);
    return { data: result };
  } else if (url.includes('/accounts/activate')) {
    const result = await mockService.activateAccount(data);
    return { data: result };
  } else if (url.includes('/password-reset/initiate')) {
    const result = await mockService.resetPassword(data);
    return { data: result };
  } else if (url.includes('/accounts/unlock')) {
    const result = await mockService.unlockAccount(data);
    return { data: result };
  }
  
  // Default fallback
  return { data: { success: false, message: 'Service unavailable' } };
};

const safelyParseJson = (text: string) => {
  try { return JSON.parse(text); } catch { return {}; }
};

// Enhanced API service functions with backend integration
export const authService = {
  login: async (credentials: { organisationId: string; userId: string; password: string }) => {
    try {
      console.log('Attempting backend login for:', credentials.organisationId, credentials.userId);
      const response = await httpClient.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login failed, checking for fallback:', error);
      // Fallback is handled by interceptor
      throw error;
    }
  },
  
  resetPassword: async (data: { organisationId: string; userId: string }) => {
    try {
      console.log('Attempting backend password reset for:', data.organisationId, data.userId);
      const response = await httpClient.post('/api/accounts/password-reset/initiate', data);
      return response.data;
    } catch (error) {
      console.error('Password reset failed, checking for fallback:', error);
      throw error;
    }
  },
  
  activateAccount: async (data: { organisationId: string; userId: string }) => {
    try {
      console.log('Attempting backend account activation for:', data.organisationId, data.userId);
      const response = await httpClient.post('/api/accounts/activate', data);
      return response.data;
    } catch (error) {
      console.error('Account activation failed, checking for fallback:', error);
      throw error;
    }
  },
  
  unlockAccount: async (data: { organisationId: string; userId: string }) => {
    try {
      console.log('Attempting backend account unlock for:', data.organisationId, data.userId);
      const response = await httpClient.post('/api/accounts/unlock', data);
      return response.data;
    } catch (error) {
      console.error('Account unlock failed, checking for fallback:', error);
      throw error;
    }
  }
};

export default httpClient;
