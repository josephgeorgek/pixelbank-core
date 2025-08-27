import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import WizardSteps from '@/components/WizardSteps';
import { BankingCard, BankingCardContent, BankingCardHeader, BankingCardTitle } from '@/components/ui/banking-card';
import { BankingInput } from '@/components/ui/banking-input';
import { BankingButton } from '@/components/ui/banking-button';
import { Button } from '@/components/ui/button';

const ActivateHardwareToken: React.FC = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, label: 'Enter your login credentials', isActive: false, isCompleted: true },
    { number: 2, label: 'Verify number', isActive: false, isCompleted: true },
    { number: 3, label: 'Set up password', isActive: false, isCompleted: true },
    { number: 4, label: 'Activate hardware token', isActive: true, isCompleted: false }
  ];

  const tokenSteps = [
    {
      step: 1,
      title: 'Enter the serial number on the back of the hardware token.',
      image: '🔢', // Placeholder for token image
      isActive: currentStep === 1
    },
    {
      step: 2,
      title: 'Press 🔴 button to generate a One-Time Password',
      image: '🔴', // Placeholder for button image  
      isActive: currentStep === 2
    },
    {
      step: 3,
      title: 'Enter the 6-digit code shown on the hardware token.',
      image: '📱', // Placeholder for display image
      isActive: currentStep === 3
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/activation-success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/set-password');
    }
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
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-6">Activate hardware token</h2>
              
              {/* Token Steps Visual */}
              <div className="space-y-6">
                {tokenSteps.map((tokenStep) => (
                  <div 
                    key={tokenStep.step}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                      tokenStep.isActive 
                        ? 'bg-primary/5 border-2 border-primary/20' 
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2
                      ${tokenStep.step <= currentStep
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-muted'
                      }
                    `}>
                      {tokenStep.step <= currentStep ? '✓' : tokenStep.step}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`text-sm font-medium mb-2 ${
                        tokenStep.isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        STEP {tokenStep.step}
                      </p>
                      <p className="text-sm text-foreground mb-3">
                        {tokenStep.title}
                      </p>
                    </div>
                    
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
                      {tokenStep.image}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div>
                  <label className="text-banking-label block mb-2">
                    Serial Number
                  </label>
                  <BankingInput
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="Enter serial number"
                    required
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <label className="text-banking-label block mb-2">
                    6-Digit Code
                  </label>
                  <BankingInput
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                  />
                </div>
              )}

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
                  {currentStep === 3 ? 'Activate' : 'Next'}
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

export default ActivateHardwareToken;