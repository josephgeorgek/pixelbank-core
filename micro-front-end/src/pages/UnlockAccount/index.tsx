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
import { Lock, Warning } from '@mui/icons-material';
import { authService } from '../../api/http';

const steps = [
  'Account verification',
  'Security check',
  'Account unlock'
];

const UnlockAccount: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    organisationId: '',
    userId: '',
    reason: '',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log('Unlock account request:', formData);
      // Navigate to next step
    } catch (error) {
      console.error('Unlock account failed:', error);
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
              Unlock Account
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
              Secure process to verify your identity and unlock your account access.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Unlock Form */}
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
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: '12px',
                          color: index <= activeStep ? '#E85E00' : '#BDBDBD',
                        },
                        '& .MuiStepIcon-root': {
                          color: index <= activeStep ? '#E85E00' : '#BDBDBD',
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
                  <Lock
                    sx={{
                      fontSize: '48px',
                      color: '#FF9800',
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      color: '#1A1A1A',
                      fontWeight: 600,
                      fontSize: '24px',
                      mb: 2,
                    }}
                  >
                    UNLOCK ACCOUNT
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
                    Account verification required
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6C7B7F',
                      fontSize: '14px',
                      mb: 2,
                    }}
                  >
                    Your account has been temporarily locked for security reasons. Please provide your credentials to verify your identity and unlock your account.
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
                        placeholder="Enter Organisation ID"
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
                        placeholder="Enter User ID"
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

                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#1A1A1A',
                          fontWeight: 500,
                          fontSize: '14px',
                          mb: 1,
                        }}
                      >
                        Reason for unlock request (optional)
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        placeholder="Please describe why you need to unlock your account"
                        value={formData.reason}
                        onChange={handleInputChange('reason')}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            fontSize: '16px',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Info Message */}
                  <Alert
                    severity="info"
                    sx={{
                      mt: 3,
                      mb: 3,
                      backgroundColor: '#E3F2FD',
                      borderColor: '#90CAF9',
                      '& .MuiAlert-message': {
                        fontSize: '14px',
                        color: '#1565C0',
                      },
                    }}
                  >
                    Account unlock requests are processed within 24 hours during business days
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
                      By submitting this request, you confirm your identity and agree to our{' '}
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
                      Submit Request
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

export default UnlockAccount;