import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../src/theme';
import Activate from '../../src/pages/Activate';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Activate Component', () => {
  test('renders activate form correctly', () => {
    renderWithProviders(<Activate />);
    
    expect(screen.getByText('ACTIVATE ACCESS')).toBeInTheDocument();
    expect(screen.getByText('Enter your login credentials')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Organisation ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter User ID')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('shows stepper with correct steps', () => {
    renderWithProviders(<Activate />);
    
    expect(screen.getByText('Enter your login credentials')).toBeInTheDocument();
    expect(screen.getByText('Verify number')).toBeInTheDocument();
    expect(screen.getByText('Set up password')).toBeInTheDocument();
    expect(screen.getByText('Activate hardware token')).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    renderWithProviders(<Activate />);
    
    const orgIdInput = screen.getByPlaceholderText('Enter Organisation ID');
    const userIdInput = screen.getByPlaceholderText('Enter User ID');
    
    fireEvent.change(orgIdInput, { target: { value: 'TEST123' } });
    fireEvent.change(userIdInput, { target: { value: 'user123' } });
    
    expect(orgIdInput).toHaveValue('TEST123');
    expect(userIdInput).toHaveValue('user123');
  });

  test('shows information text', () => {
    renderWithProviders(<Activate />);
    
    expect(screen.getByText(/When we open your account/)).toBeInTheDocument();
    expect(screen.getByText(/Please check your inbox/)).toBeInTheDocument();
  });

  test('has back and next buttons', () => {
    renderWithProviders(<Activate />);
    
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});