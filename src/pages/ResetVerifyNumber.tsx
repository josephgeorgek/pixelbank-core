import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { AlertTriangle } from 'lucide-react';
import WizardSteps from '@/components/WizardSteps';

const ResetVerifyNumber: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [hasError, setHasError] = useState(true);

  const steps = [
    { number: 1, label: 'Login credentials', isActive: false, isCompleted: true },
    { number: 2, label: '2-step verification', isActive: true, isCompleted: false },
    { number: 3, label: 'Password reset', isActive: false, isCompleted: false }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && !hasError) {
      navigate('/create-new-password');
    }
  };

  const handleBack = () => {
    navigate('/reset-password');
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
                    <InputOTPSlot index={0} className={hasError ? 'border-red-500 bg-red-50' : ''} />
                    <InputOTPSlot index={1} className={hasError ? 'border-red-500 bg-red-50' : ''} />
                    <InputOTPSlot index={2} className={hasError ? 'border-red-500 bg-red-50' : ''} />
                    <InputOTPSlot index={3} className={hasError ? 'border-red-500 bg-red-50' : ''} />
                    <InputOTPSlot index={4} className={hasError ? 'border-red-500 bg-red-50' : ''} />
                    <InputOTPSlot index={5} className={hasError ? 'border-red-500 bg-red-50' : ''} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {hasError && (
                <div className="flex items-center justify-center text-sm text-red-600">
                  <AlertTriangle size={14} className="mr-1" />
                  OTP does not match what we have sent.
                </div>
              )}

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

export default ResetVerifyNumber;