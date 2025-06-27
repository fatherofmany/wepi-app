import React from 'react';
import { ArrowRight, Bell, Settings } from 'lucide-react';

const Header = ({ title, showBack = false, onBack, rightContent }) => (
  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
    <div className="flex items-center space-x-3">
      {showBack && (
        <button onClick={onBack} className="p-1">
          <ArrowRight className="rotate-180" size={20} />
        </button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    <div className="flex items-center space-x-3">
      {rightContent || (
        <>
          <Bell size={20} className="opacity-80" />
          <Settings size={20} className="opacity-80" />
        </>
      )}
    </div>
  </div>
);

export default Header;