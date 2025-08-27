import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../src/theme';
import Login from '../../src/pages/Login';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  test('renders login form correctly', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Welcome to Business Banking')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your Organisation ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your User ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    renderWithProviders(<Login />);
    
    const orgIdInput = screen.getByPlaceholderText('Enter your Organisation ID');
    const userIdInput = screen.getByPlaceholderText('Enter your User ID');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    
    fireEvent.change(orgIdInput, { target: { value: 'TEST123' } });
    fireEvent.change(userIdInput, { target: { value: 'user123' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(orgIdInput).toHaveValue('TEST123');
    expect(userIdInput).toHaveValue('user123');
    expect(passwordInput).toHaveValue('password123');
  });

  test('toggles password visibility', () => {
    renderWithProviders(<Login />);
    
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('shows navigation links', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Reset password or unlock account')).toBeInTheDocument();
    expect(screen.getByText('Activate new user access')).toBeInTheDocument();
    expect(screen.getByText('Need help?')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    renderWithProviders(<Login />);
    
    const orgIdInput = screen.getByPlaceholderText('Enter your Organisation ID');
    const userIdInput = screen.getByPlaceholderText('Enter your User ID');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(orgIdInput, { target: { value: 'TEST123' } });
    fireEvent.change(userIdInput, { target: { value: 'user123' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    // Form should prevent default and handle submission
    await waitFor(() => {
      // Add specific assertions based on your form submission logic
      expect(orgIdInput).toHaveValue('TEST123');
    });
  });
});