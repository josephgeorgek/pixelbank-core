import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import { BankingCard, BankingCardContent } from '@/components/ui/banking-card';
import { BankingButton } from '@/components/ui/banking-button';

const ActivationSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <LoginLayout showLanguageSelector={false}>
      <div className="w-full">
        <BankingCard>
          <BankingCardContent className="p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Request successful
              </h1>
              <p className="text-banking-subtitle max-w-sm mx-auto">
                Your access has been activated. Use your new password to log in to business online banking.
              </p>
            </div>

            {/* Back to Login Button */}
            <div className="flex justify-end">
              <BankingButton onClick={handleBackToLogin} className="px-8">
                Back to Login
              </BankingButton>
            </div>
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

export default ActivationSuccess;