import React from 'react';
import BrandLogo from './BrandLogo';
import bankingHeroBg from '@/assets/banking-hero-bg.jpg';

interface LoginLayoutProps {
  children: React.ReactNode;
  showLanguageSelector?: boolean;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ 
  children, 
  showLanguageSelector = true 
}) => {
  return (
    <div className="banking-grid">
      {/* Left Side - Hero Image with Building */}
      <div 
        className="relative hidden lg:flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bankingHeroBg})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-primary opacity-80"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white p-8">
          <div className="mb-8">
            <BrandLogo size="lg" className="text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Corporate Internet Banking
          </h1>
          <p className="text-lg opacity-90 max-w-md mx-auto">
            Secure, reliable banking solutions for your business needs
          </p>
        </div>

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
  );
};

export default LoginLayout;