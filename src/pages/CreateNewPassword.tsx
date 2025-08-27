import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '@/components/LoginLayout';
import WizardSteps from '@/components/WizardSteps';
import { BankingCard, BankingCardContent, BankingCardHeader, BankingCardTitle } from '@/components/ui/banking-card';
import { BankingInput } from '@/components/ui/banking-input';
import { BankingButton } from '@/components/ui/banking-button';
import { Button } from '@/components/ui/button';

const CreateNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    case: false,
    numeric: false,
    special: false,
    notIdentical: false
  });
  const [passwordMismatch, setPasswordMismatch] = useState(true); // Show mismatch as in screenshot

  const steps = [
    { number: 1, label: 'Login credentials', isActive: false, isCompleted: true },
    { number: 2, label: '2-step verification', isActive: false, isCompleted: true },
    { number: 3, label: 'Password reset', isActive: true, isCompleted: false }
  ];

  useEffect(() => {
    const { password } = formData;
    setValidation({
      length: password.length >= 8 && password.length <= 12,
      case: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
      numeric: /(?=.*\d.*\d)/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      notIdentical: password !== 'ORGANISATION_ID' && password !== 'USER_ID' // Mock validation
    });
    
    // Check password mismatch
    if (formData.password && formData.confirmPassword) {
      setPasswordMismatch(formData.password !== formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValidPassword = Object.values(validation).every(valid => valid);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidPassword && passwordsMatch && formData.password && formData.confirmPassword) {
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/reset-verify-number');
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
              <h2 className="text-lg font-semibold mb-4">Create a new password</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Must contain or be:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${validation.length ? 'text-success' : 'text-muted-foreground'}`}>
                      {validation.length ? '✓' : '○'}
                    </span>
                    <span className="text-sm text-foreground">8 to 12 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${validation.case ? 'text-success' : 'text-muted-foreground'}`}>
                      {validation.case ? '✓' : '○'}
                    </span>
                    <span className="text-sm text-foreground">1 uppercase and 1 lowercase letter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${validation.numeric ? 'text-success' : 'text-muted-foreground'}`}>
                      {validation.numeric ? '✓' : '○'}
                    </span>
                    <span className="text-sm text-foreground">2 numeric characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${validation.special ? 'text-success' : 'text-muted-foreground'}`}>
                      {validation.special ? '✓' : '○'}
                    </span>
                    <span className="text-sm text-foreground">1 special character</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${validation.notIdentical ? 'text-success' : 'text-muted-foreground'}`}>
                      {validation.notIdentical ? '✓' : '○'}
                    </span>
                    <span className="text-sm text-foreground">Not identical to Organisation ID or User ID</span>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-banking-label block mb-2">
                  Re-enter password
                </label>
                <div className="relative">
                  <BankingInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    required
                    className={passwordMismatch && formData.confirmPassword ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {passwordMismatch && formData.confirmPassword && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-destructive text-sm">⚠️</span>
                    <span className="text-sm text-destructive">Passwords do not match</span>
                  </div>
                )}
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
                  disabled={!isValidPassword || passwordMismatch || !formData.password || !formData.confirmPassword}
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

export default CreateNewPassword;