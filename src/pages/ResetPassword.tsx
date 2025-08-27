import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import WizardSteps from '@/components/WizardSteps';
import { BankingCard, BankingCardContent, BankingCardHeader, BankingCardTitle } from '@/components/ui/banking-card';
import { BankingInput } from '@/components/ui/banking-input';
import { BankingButton } from '@/components/ui/banking-button';
import { Button } from '@/components/ui/button';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationId: '',
    userId: ''
  });

  const steps = [
    { number: 1, label: 'Login credentials', isActive: false, isCompleted: true },
    { number: 2, label: '2-step verification', isActive: false, isCompleted: false },
    { number: 3, label: 'Password reset', isActive: true, isCompleted: false }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.organisationId && formData.userId) {
      navigate('/reset-verify-number');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <LoginLayout>
      <div className="w-full">
        <WizardSteps steps={steps} />

        <BankingCard>
          <BankingCardHeader>
            <BankingCardTitle className="text-center">
              RESET PASSWORD OR UNLOCK ACCOUNT
            </BankingCardTitle>
          </BankingCardHeader>
          
          <BankingCardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Enter your login credentials</h2>
              <p className="text-banking-subtitle mb-1">
                We need your login credentials to unlock your account. Organisation ID and User ID when your account was opened.
              </p>
              <p className="text-banking-subtitle">
                Please check your registered email for these login credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Organisation ID */}
                <div>
                  <label className="text-banking-label block mb-2">
                    Organisation ID
                  </label>
                  <BankingInput
                    type="text"
                    value={formData.organisationId}
                    onChange={(e) => handleInputChange('organisationId', e.target.value)}
                    placeholder="JOSEFINES"
                    required
                  />
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
                    placeholder="JOSEFINES"
                    required
                  />
                </div>
              </div>

              {/* Warning Message */}
              <div className="bg-warning/10 border border-warning/30 rounded-md p-4">
                <div className="flex items-start gap-2">
                  <span className="text-warning text-lg">⚠️</span>
                  <p className="text-sm text-warning-foreground">
                    One or more login credentials are invalid
                  </p>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="text-center text-sm text-muted-foreground">
                By clicking "Next", you confirm that you have read and understood, and agree to be bound by our{' '}
                <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover">
                  Terms and Conditions
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="px-8"
                >
                  Back
                </Button>
                <BankingButton type="submit" className="px-8">
                  Next
                </BankingButton>
              </div>
            </form>
          </BankingCardContent>
        </BankingCard>
      </div>
    </LoginLayout>
  );
};

export default ResetPassword;