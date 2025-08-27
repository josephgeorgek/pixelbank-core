import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import HelpPopup from '@/components/HelpPopup';
import { BankingCard, BankingCardContent } from '@/components/ui/banking-card';
import { BankingInput } from '@/components/ui/banking-input';
import { BankingButton } from '@/components/ui/banking-button';
import { Button } from '@/components/ui/button';
import bankingHeroBg from '@/assets/banking-hero-bg.jpg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationId: '',
    userId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login logic
    console.log('Login attempt:', formData);
    // Navigate to dashboard or next step
  };

  return (
    <>
      <HelpPopup />
      <LoginLayout>
        <BankingCard className="w-full">
          <BankingCardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-banking-title mb-2">Welcome to Business Banking</h1>
              <p className="text-banking-subtitle">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Organisation ID */}
              <div>
                <label className="text-banking-label block mb-2">
                  Organisation ID
                </label>
                <div className="relative">
                  <BankingInput
                    type="text"
                    value={formData.organisationId}
                    onChange={(e) => handleInputChange('organisationId', e.target.value)}
                    placeholder="Enter your Organisation ID"
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Show dropdown"
                  >
                    ▼
                  </button>
                </div>
              </div>

              {/* User ID */}
              <div>
                <label className="text-banking-label block mb-2">
                  User ID
                </label>
                <BankingInput
                  type="text"
                  value={formData.userId}
                  onChange={(e) => handleInputChange('userId', e.target.value)}
                  placeholder="Enter your User ID"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-banking-label block mb-2">
                  Password
                </label>
                <div className="relative">
                  <BankingInput
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <BankingButton type="submit" className="w-full" size="lg">
                Login
              </BankingButton>
            </form>

            {/* Footer Links */}
            <div className="mt-8 space-y-3">
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => navigate('/reset-password')}
                  className="text-primary hover:text-primary-hover p-0 h-auto"
                >
                  Reset password or unlock account
                </Button>
              </div>
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => navigate('/activate-account')}
                  className="text-primary hover:text-primary-hover p-0 h-auto"
                >
                  Activate new user access
                </Button>
              </div>
              <div className="flex items-center justify-end">
                <Button
                  variant="link"
                  onClick={() => navigate('/help')}
                  className="text-muted-foreground hover:text-foreground p-0 h-auto text-sm flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-muted-foreground text-white text-xs flex items-center justify-center">?</span>
                  Need help?
                </Button>
              </div>
            </div>
          </BankingCardContent>
        </BankingCard>
      </LoginLayout>
    </>
  );
};

export default Login;