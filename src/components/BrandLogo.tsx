import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-24 h-8',
    md: 'w-32 h-10',
    lg: 'w-40 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Redbank Logo - Orange/Red Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(14, 88%, 55%)" />
            <stop offset="100%" stopColor="hsl(0, 75%, 50%)" />
          </linearGradient>
        </defs>
        
        {/* Logo Symbol - Stylized "R" with geometric elements */}
        <g>
          <path
            d="M8 8 L8 32 L16 32 L16 22 L22 22 L28 32 L36 32 L28 20 C30 19 32 17 32 13 C32 9 29 8 26 8 L8 8 Z M16 14 L24 14 C25 14 25 15 25 15 C25 15 25 16 24 16 L16 16 L16 14 Z"
            fill="url(#logoGradient)"
          />
          <circle cx="42" cy="20" r="12" fill="url(#logoGradient)" opacity="0.8" />
          <path
            d="M38 16 L38 24 L46 24 L46 16 Z"
            fill="white"
          />
        </g>
        
        {/* Text */}
        <text x="65" y="28" fill="url(#logoGradient)" fontSize="18" fontWeight="600" fontFamily="system-ui">
          Redbank
        </text>
      </svg>
    </div>
  );
};

export default BrandLogo;