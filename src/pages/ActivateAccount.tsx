import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import WizardSteps from '@/components/WizardSteps';
import { BankingCard, BankingCardContent, BankingCardHeader, BankingCardTitle } from '@/components/ui/banking-card';
import { BankingInput } from '@/components/ui/banking-input';
import { BankingButton } from '@/components/ui/banking-button';
import { Button } from '@/components/ui/button';

const ActivateAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationId: '',
    userId: ''
  });

  const steps = [
    { number: 1, label: 'Enter your login credentials', isActive: false, isCompleted: false },
    { number: 2, label: 'Verify number', isActive: true, isCompleted: false },
    { number: 3, label: 'Set up password', isActive: false, isCompleted: false },
    { number: 4, label: 'Activate hardware token', isActive: false, isCompleted: false }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.organisationId && formData.userId) {
      navigate('/verify-number');
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
              ACTIVATE ACCESS
            </BankingCardTitle>
          </BankingCardHeader>
          
          <BankingCardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Enter your login credentials</h2>
              <p className="text-banking-subtitle mb-1">
                When we open your account, we will send a unique Organisation ID and User ID to your email address in our records.
              </p>
              <p className="text-banking-subtitle">
                Please check your inbox.
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
                    placeholder="Enter Organisation ID"
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
                    placeholder="Enter User ID"
                    required
                  />
                </div>
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
                <BankingButton type="submit" className="px-8">
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

export default ActivateAccount;