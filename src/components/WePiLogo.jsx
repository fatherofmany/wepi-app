// src/components/WePiLogo.jsx
import React from 'react';

const WePiLogo = ({ size = 'large', variant = 'full' }) => {
  const sizes = {
    small: { container: 'w-8 h-8', text: 'text-sm', pi: 'text-xs' },
    medium: { container: 'w-12 h-12', text: 'text-lg', pi: 'text-sm' },
    large: { container: 'w-16 h-16', text: 'text-2xl', pi: 'text-lg' },
    xlarge: { container: 'w-24 h-24', text: 'text-4xl', pi: 'text-2xl' }
  };

  const currentSize = sizes[size];

  if (variant === 'icon') {
    return (
      <div className={`${currentSize.container} bg-gradient-to-br from-purple-500 via-purple-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
        <div className="relative flex items-center justify-center">
          <span className={`font-black text-white ${currentSize.text} tracking-tighter`}>
            π
          </span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className={`${currentSize.container} bg-gradient-to-br from-purple-500 via-purple-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
        <div className="relative flex items-center justify-center">
          <span className={`font-black text-white ${currentSize.text} tracking-tighter`}>
            Wπ
          </span>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      {variant === 'full' && (
        <div className="flex items-baseline">
          <span className={`font-black bg-gradient-to-r from-white-1500 to-white-1500 bg-clip-text w-6 h-6 *:text-visible `}>
            WePi
          </span>
        </div>
      )}
    </div>
  );
};

export default WePiLogo;
