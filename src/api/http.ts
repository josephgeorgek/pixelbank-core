import axios, { AxiosError, AxiosResponse } from 'axios';

// Base URL: default to local Spring Boot
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:8080';
// Enable fallback by default (can be overridden via env)
const USE_MOCK_FALLBACK = (import.meta.env?.VITE_USE_MOCK_FALLBACK ?? 'true') === 'true';

export interface LoginRequest {
  organisationId: string;
  userId: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user?: {
    id: number;
    userId: string;
    organizationName: string;
  };
  message?: string;
}

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor
httpClient.interceptors.request.use((config) => {
  const method = (config.method || 'get').toUpperCase();
  const url = `${config.baseURL || ''}${config.url || ''}`;
  console.log(`Attempting backend call: ${method} ${url}`);

  const token = localStorage.getItem('authToken');
  if (token) {
    const headers: any = (config.headers as any) ?? {};
    headers['Authorization'] = `Bearer ${token}`;
    config.headers = headers as any;
  }
  return config;
});

function isNetworkOrCorsError(error: AxiosError): boolean {
  const networkErrors = new Set([
    'NETWORK_ERROR',
    'ECONNREFUSED',
    'ERR_NETWORK',
    'ERR_FAILED',
    'ERR_BLOCKED_BY_CLIENT',
  ]);
  const message = (error.message || '').toUpperCase();
  return (
    !error.response ||
    (error.code ? networkErrors.has(error.code) : false) ||
    message.includes('MIXED CONTENT') ||
    message.includes('NET::ERR_')
  );
}

// Response interceptor (fallback to mocks on network/CORS/mixed-content errors)
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (USE_MOCK_FALLBACK && isNetworkOrCorsError(error)) {
      const reason = error.code || error.message || 'Network error';
      console.log(`Backend error (network/CORS/mixed content), falling back to mock: ${reason}`);

      const original = (error.config as any) || ({ url: '', headers: {} } as any);
      const url = String((original as any).url || '');
      let payload: any = undefined;
      try {
        const data = (original as any).data;
        payload = typeof data === 'string' ? JSON.parse(data) : data;
      } catch (_) {}

      const data = await handleMockFallback(url, payload);
      const mockResponse: AxiosResponse = {
        data,
        status: 200,
        statusText: 'OK',
        headers: { 'x-mock': 'true' },
        // Provide minimal config to satisfy typings
        config: (original as any),
      } as any;
      return Promise.resolve(mockResponse);
    }
    return Promise.reject(error);
  }
);

// Mock handlers (minimal, only invoked on failure)
async function handleMockFallback(url: string, payload: any) {
  if (url.includes('/auth/login')) {
    return mockLogin(payload as LoginRequest);
  }
  // Generic mock
  return { success: true };
}

function mockLogin(req: LoginRequest): LoginResponse {
  const org = req?.organisationId || 'ORG-DEMO';
  const uid = req?.userId || 'demo-user';
  return {
    success: true,
    token: 'mock-token-123',
    user: { id: 1, userId: uid, organizationName: org },
    message: 'Mock login successful',
  };
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const resp = await httpClient.post('/api/auth/login', credentials);
    const data = resp.data as LoginResponse;
    if (data?.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  },
};
