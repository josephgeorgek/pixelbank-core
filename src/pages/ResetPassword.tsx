import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BankingInput } from '@/components/ui/banking-input';
import { AlertTriangle } from 'lucide-react';
import WizardSteps from '@/components/WizardSteps';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationId: 'EsolAlpha',
    userId: 'PeterAlpha'
  });
  const [hasError, setHasError] = useState(true);

  const steps = [
    { number: 1, label: 'Login credentials', isActive: true, isCompleted: false },
    { number: 2, label: '2-step verification', isActive: false, isCompleted: false },
    { number: 3, label: 'Password reset', isActive: false, isCompleted: false }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left sidebar with steps */}
      <div className="w-80 bg-white border-r border-gray-200 p-8">
        <WizardSteps steps={steps} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-normal text-gray-900 mb-2">RESET PASSWORD OR UNLOCK ACCOUNT</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Enter your login credentials</h2>
            <p className="text-gray-600 text-sm mb-6">
              We sent you an email containing your unique Organisation ID and User ID when your account was opened. 
              Please check your registered email for these login credentials.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Organisation ID</label>
                <BankingInput
                  name="organisationId"
                  value={formData.organisationId}
                  onChange={handleInputChange}
                  className={`w-full ${hasError ? 'border-red-500' : ''}`}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">User ID</label>
                <BankingInput
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className={`w-full ${hasError ? 'border-red-500' : ''}`}
                />
              </div>

              {hasError && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertTriangle size={14} className="mr-1" />
                  One or more login credentials are invalid
                </div>
              )}

              <div className="text-xs text-gray-600 pt-4">
                By clicking 'Next', you confirm that you have read and understood, and agree to be bound by our{' '}
                <a href="#" className="text-blue-600 underline">
                  Terms and Conditions
                </a>
                .
              </div>

              <div className="flex justify-between pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                  className="px-8"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  className="px-8 bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;