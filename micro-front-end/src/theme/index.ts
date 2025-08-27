import { createTheme } from '@mui/material/styles';

// Exact colors sampled from screenshots
const theme = createTheme({
  palette: {
    primary: {
      main: '#E85E00', // Redbank orange
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6C7B7F', // Gray from screenshots
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#6C7B7F',
    },
    error: {
      main: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF9800',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      letterSpacing: '0px',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '32px',
      letterSpacing: '0px',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '28px',
      letterSpacing: '0px',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      letterSpacing: '0px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0px',
    },
    button: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: '0px',
      textTransform: 'none',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      letterSpacing: '0px',
    },
  },
  spacing: 8, // 8px base spacing unit
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          fontSmoothing: 'antialiased',
          textRendering: 'optimizeLegibility',
        },
        body: {
          fontSize: '16px',
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 400,
          lineHeight: '24px',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '24px',
          textTransform: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
        },
        contained: {
          background: 'linear-gradient(135deg, #E85E00 0%, #D32F2F 100%)',
          boxShadow: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #CC5500 0%, #B71C1C 100%)',
            boxShadow: '0 2px 8px rgba(232, 94, 0, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#BDBDBD',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E85E00',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
  },
});

export default theme;