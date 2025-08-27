import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Container,
  FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowDropDown, HelpOutline } from '@mui/icons-material';
import { authService } from '../../api/http';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationId: '',
    userId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await authService.login(formData);
      console.log('Login successful:', result);
      // Navigate to dashboard or next step
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: `url('/design/1.Login_page.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Left Side - Hero Section with Background Image */}
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: { xs: 3, md: 6 },
            backgroundImage: `url('/design/1.Login_page.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1,
            },
          }}
        >
          {/* Brand Logo */}
          <Box sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h3"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '28px',
                letterSpacing: '1px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Redbank
            </Typography>
          </Box>

          {/* Hero Content */}
          <Box sx={{ maxWidth: '400px', position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h1"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: { xs: '32px', md: '40px' },
                lineHeight: '1.2',
                mb: 3,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Welcome to Business Banking
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '18px',
                lineHeight: '1.6',
                mb: 4,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              Secure, efficient, and comprehensive banking solutions for your business needs.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Login Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: 3, md: 6 },
            background: '#FFFFFF',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '400px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#E85E00',
                fontWeight: 600,
                fontSize: '24px',
              }}
            >
              Redbank
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#E0E0E0',
                color: '#6C7B7F',
                fontSize: '12px',
                padding: '4px 8px',
                minWidth: 'auto',
              }}
            >
              EN
            </Button>
          </Box>

          {/* Login Form */}
          <Card
            sx={{
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
            }}
          >
            <CardContent sx={{ padding: '32px' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: '#1A1A1A',
                    fontWeight: 600,
                    fontSize: '24px',
                    mb: 1,
                  }}
                >
                  Welcome to Business Banking
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6C7B7F',
                    fontSize: '14px',
                  }}
                >
                  Enter your credentials to access your account
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1A1A1A',
                      fontWeight: 500,
                      fontSize: '14px',
                      mb: 1,
                    }}
                  >
                    Organisation ID
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your Organisation ID"
                    value={formData.organisationId}
                    onChange={handleInputChange('organisationId')}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <ArrowDropDown />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '48px',
                        fontSize: '16px',
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1A1A1A',
                      fontWeight: 500,
                      fontSize: '14px',
                      mb: 1,
                    }}
                  >
                    User ID
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your User ID"
                    value={formData.userId}
                    onChange={handleInputChange('userId')}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '48px',
                        fontSize: '16px',
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1A1A1A',
                      fontWeight: 500,
                      fontSize: '14px',
                      mb: 1,
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '48px',
                        fontSize: '16px',
                      },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 600,
                    mb: 4,
                  }}
                >
                  Login
                </Button>
              </form>

              {/* Footer Links */}
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Link
                  href="#"
                  onClick={() => navigate('/reset-password')}
                  sx={{
                    color: '#E85E00',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Reset password or unlock account
                </Link>
              </Box>

              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Link
                  href="#"
                  onClick={() => navigate('/activate')}
                  sx={{
                    color: '#E85E00',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Activate new user access
                </Link>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="text"
                  startIcon={<HelpOutline />}
                  sx={{
                    color: '#6C7B7F',
                    fontSize: '12px',
                    textTransform: 'none',
                  }}
                >
                  Need help?
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;