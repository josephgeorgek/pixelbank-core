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
  LinearProgress,
} from '@mui/material';
import { authService } from '../../api/http';

const steps = [
  'Enter your login credentials',
  'Verify number',
  'Set up password',
  'Activate hardware token'
];

const Activate: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
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
      const result = await authService.activateAccount(formData);
      console.log('Activation step successful:', result);
      // Navigate to next step
    } catch (error) {
      console.error('Activation failed:', error);
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
              Activate New User Access
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
              Follow these simple steps to activate your business banking access.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Activation Form */}
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
                  <Typography
                    variant="h2"
                    sx={{
                      color: '#1A1A1A',
                      fontWeight: 600,
                      fontSize: '24px',
                      mb: 2,
                    }}
                  >
                    ACTIVATE ACCESS
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
                    When we open your account, we will send a unique Organisation ID and User ID to your email address in our records.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6C7B7F',
                      fontSize: '14px',
                    }}
                  >
                    Please check your inbox.
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
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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

            {/* Footer */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#BDBDBD',
                  fontSize: '12px',
                }}
              >
                © - All Rights Reserved - Conditions of Access | Security & Privacy
              </Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Activate;