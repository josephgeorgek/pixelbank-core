import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import WizardSteps from '@/components/WizardSteps';

const VerifyNumber: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const steps = [
    { number: 1, label: 'Enter login credentials', isActive: false, isCompleted: true },
    { number: 2, label: 'Verify number', isActive: true, isCompleted: false },
    { number: 3, label: 'Set up password', isActive: false, isCompleted: false },
    { number: 4, label: 'Activate hardware token', isActive: false, isCompleted: false }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      navigate('/set-password');
    }
  };

  const handleBack = () => {
    navigate('/activate-account');
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
            <h2 className="text-xl font-medium text-gray-900 mb-2">Verify number</h2>
            <p className="text-gray-600 text-sm mb-6">
              Enter the 6-digit SMS One-Time Password (OTP) sent to +65 ••••1234.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center text-sm text-gray-600">
                Request new OTP in <span className="text-gray-900">00:58</span>
              </div>

              <div className="text-sm text-gray-600">
                Not your number? Give us the correct one by completing and mailing us the{' '}
                <a href="#" className="text-blue-600 underline">
                  'Apply and Manage OCBC Velocity' form
                </a>
                . We will update our records within 7 working days of receiving the form.
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
                  disabled={otp.length !== 6}
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

export default VerifyNumber;