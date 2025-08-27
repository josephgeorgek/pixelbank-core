import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BankingInput } from '@/components/ui/banking-input';
import WizardSteps from '@/components/WizardSteps';

const ActivateAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationId: '',
    userId: ''
  });

  const steps = [
    { number: 1, label: 'Enter login credentials', isActive: true, isCompleted: false },
    { number: 2, label: 'Verify number', isActive: false, isCompleted: false },
    { number: 3, label: 'Set up password', isActive: false, isCompleted: false },
    { number: 4, label: 'Activate hardware token', isActive: false, isCompleted: false }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left sidebar with steps */}
      <div className="w-80 bg-white border-r border-gray-200 p-8">
        <WizardSteps steps={steps} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-normal text-gray-900 mb-2">ACTIVATE ACCESS</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Enter your login credentials</h2>
            <p className="text-gray-600 text-sm mb-6">
              When we open your account, we will send a unique Organisation ID and User ID to your email address in our records. Please check your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Organisation ID</label>
                <BankingInput
                  name="organisationId"
                  value={formData.organisationId}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">User ID</label>
                <BankingInput
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full"
                />
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

export default ActivateAccount;