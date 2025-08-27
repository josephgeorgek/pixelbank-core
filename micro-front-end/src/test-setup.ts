import '@testing-library/jest-dom';
import 'jest-image-snapshot/lib/jest-image-snapshot';

// Mock environment variables
process.env.VITE_API_BASE_URL = 'http://localhost:8080';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});