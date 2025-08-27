import React from 'react';
import BrandLogo from './BrandLogo';

interface LoginLayoutProps {
  children: React.ReactNode;
  showLanguageSelector?: boolean;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ 
  children, 
  showLanguageSelector = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Security Advisory Banner */}
      <div className="bg-gray-100 border-b px-4 py-2 text-xs text-gray-600">
        <span className="font-semibold">Security advisory:</span> Received a bulk order or service request from an organisation? Please independently verify the identity of the party you are corresponding with. Avoid making payments or deposits in advance to new suppliers.{' '}
        <a href="#" className="text-blue-600 underline">Learn how you can protect your business</a>
      </div>
      
      <div className="banking-grid flex-1">
        {/* Left Side - Hero Image with Building */}
        <div 
          className="relative hidden lg:flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(/lovable-uploads/37f24251-93f6-4104-b389-34fb8d2bd5ff.png)` }}
        >
          {/* Footer */}
          <div className="absolute bottom-4 left-4 text-white text-xs opacity-70">
            © 2024 - All Rights Reserved - Conditions of Access | Policies
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="lg:hidden">
              <BrandLogo size="md" />
            </div>
            <div className="lg:flex lg:items-center lg:justify-between lg:w-full">
              <div className="hidden lg:block">
                <BrandLogo size="md" />
                <span className="ml-2 text-banking-title">Welcome to Business Banking</span>
              </div>
              {showLanguageSelector && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇸🇬</span>
                  <select className="text-sm border-none bg-transparent focus:outline-none">
                    <option>SG</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="banking-container w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;