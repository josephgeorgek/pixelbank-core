import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import WizardSteps from '@/components/WizardSteps';
import { BankingCard, BankingCardContent, BankingCardHeader, BankingCardTitle } from '@/components/ui/banking-card';
import { BankingButton } from '@/components/ui/banking-button';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const VerifyNumber: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(58);
  const [hasError, setHasError] = useState(false);

  const steps = [
    { number: 1, label: 'Enter your login credentials', isActive: false, isCompleted: true },
    { number: 2, label: 'Verify number', isActive: true, isCompleted: false },
    { number: 3, label: 'Set up password', isActive: false, isCompleted: false },
    { number: 4, label: 'Activate hardware token', isActive: false, isCompleted: false }
  ];

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      navigate('/set-password');
    }
  };

  const handleBack = () => {
    navigate('/activate-account');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <LoginLayout>
      <div className="w-full">
        <WizardSteps steps={steps} />

        <BankingCard>
          <BankingCardHeader>
            <BankingCardTitle className="text-center">
              ACTIVATE ACCESS
            </BankingCardTitle>
          </BankingCardHeader>
          
          <BankingCardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Verify number</h2>
              <p className="text-banking-subtitle mb-6">
                Enter the 6-digit SMS One-Time Password (OTP) sent to +65 ****1234.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  className="gap-3"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot 
                      index={0} 
                      className={`w-12 h-12 text-lg font-medium border-2 ${
                        hasError ? 'border-destructive bg-destructive/10' : 'border-input-border'
                      }`}
                    />
                    <InputOTPSlot 
                      index={1} 
                      className={`w-12 h-12 text-lg font-medium border-2 ${
                        hasError ? 'border-destructive bg-destructive/10' : 'border-input-border'
                      }`}
                    />
                    <InputOTPSlot 
                      index={2} 
                      className={`w-12 h-12 text-lg font-medium border-2 ${
                        hasError ? 'border-destructive bg-destructive/10' : 'border-input-border'
                      }`}
                    />
                    <InputOTPSlot 
                      index={3} 
                      className={`w-12 h-12 text-lg font-medium border-2 ${
                        hasError ? 'border-destructive bg-destructive/10' : 'border-input-border'
                      }`}
                    />
                    <InputOTPSlot 
                      index={4} 
                      className={`w-12 h-12 text-lg font-medium border-2 ${
                        hasError ? 'border-destructive bg-destructive/10' : 'border-input-border'
                      }`}
                    />
                    <InputOTPSlot 
                      index={5} 
                      className={`w-12 h-12 text-lg font-medium border-2 ${
                        hasError ? 'border-destructive bg-destructive/10' : 'border-input-border'
                      }`}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Request new OTP in {formatTime(countdown)}
                </p>
                
                <p className="text-sm text-muted-foreground">
                  Not your number? Give us the correct one by completing and mailing us the{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary hover:text-primary-hover underline"
                  >
                    'Apply and Manage OCBC Velocity' form
                  </Button>
                  .<br />
                  We will update our records within 7 working days of receiving the form.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="px-8"
                >
                  Back
                </Button>
                <BankingButton 
                  type="submit" 
                  className="px-8"
                  disabled={otp.length !== 6}
                >
                  Next
                </BankingButton>
              </div>
            </form>
          </BankingCardContent>
        </BankingCard>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © - All Rights Reserved - Conditions of Access | Security & Privacy
        </div>
      </div>
    </LoginLayout>
  );
};

export default VerifyNumber;