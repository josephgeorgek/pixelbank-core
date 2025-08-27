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
  Container,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Link,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { authService } from '../../api/http';

const steps = [
  'Login credentials',
  '2-step verification',
  'Password reset'
];

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2);
  const [formData, setFormData] = useState({
    organisationId: '',
    userId: '',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await authService.resetPassword(formData);
      console.log('Reset password successful:', result);
      // Navigate to next step
    } catch (error) {
      console.error('Reset password failed:', error);
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
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left Side - Hero Section */}
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
            background: 'linear-gradient(135deg, rgba(232, 94, 0, 0.9) 0%, rgba(211, 47, 47, 0.9) 100%)',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '28px',
                letterSpacing: '1px',
              }}
            >
              Redbank
            </Typography>
          </Box>

          <Box sx={{ maxWidth: '400px' }}>
            <Typography
              variant="h1"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: { xs: '32px', md: '40px' },
                lineHeight: '1.2',
                mb: 3,
              }}
            >
              Reset Password
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '18px',
                lineHeight: '1.6',
                mb: 4,
              }}
            >
              Secure password reset process to regain access to your account.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Reset Form */}
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
          <Container maxWidth="sm">
            {/* Progress Steps */}
            <Box sx={{ mb: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label} completed={index < activeStep}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: '12px',
                          color: index <= activeStep ? '#E85E00' : '#BDBDBD',
                        },
                        '& .MuiStepIcon-root': {
                          color: index < activeStep ? '#4CAF50' : index === activeStep ? '#E85E00' : '#BDBDBD',
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Card
              sx={{
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
                      mb: 2,
                    }}
                  >
                    RESET PASSWORD OR UNLOCK ACCOUNT
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#1A1A1A',
                      fontWeight: 600,
                      fontSize: '18px',
                      mb: 2,
                    }}
                  >
                    Enter your login credentials
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6C7B7F',
                      fontSize: '14px',
                      mb: 1,
                    }}
                  >
                    We need your login credentials to unlock your account. Organisation ID and User ID when your account was opened.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6C7B7F',
                      fontSize: '14px',
                    }}
                  >
                    Please check your registered email for these login credentials.
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
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
                        placeholder="JOSEFINES"
                        value={formData.organisationId}
                        onChange={handleInputChange('organisationId')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: '48px',
                            fontSize: '16px',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
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
                        placeholder="JOSEFINES"
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
                    </Grid>
                  </Grid>

                  {/* Warning Message */}
                  <Alert
                    severity="warning"
                    icon={<Warning />}
                    sx={{
                      mt: 3,
                      mb: 3,
                      backgroundColor: '#FFF3E0',
                      borderColor: '#FFB74D',
                      '& .MuiAlert-message': {
                        fontSize: '14px',
                        color: '#E65100',
                      },
                    }}
                  >
                    One or more login credentials are invalid
                  </Alert>

                  {/* Terms and Conditions */}
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6C7B7F',
                        fontSize: '12px',
                      }}
                    >
                      By clicking "Next", you confirm that you have read and understood, and agree to be bound by our{' '}
                      <Link
                        href="#"
                        sx={{
                          color: '#E85E00',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/login')}
                      sx={{
                        height: '48px',
                        px: 4,
                        color: '#6C7B7F',
                        borderColor: '#E0E0E0',
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        height: '48px',
                        px: 4,
                        fontSize: '16px',
                        fontWeight: 600,
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPassword;