import React from 'react';
import { Home, ShoppingBag, Wallet, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ currentView, onViewChange }) => {
  const NavButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
        isActive 
          ? 'bg-white/20 text-white' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon size={20} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-t-3xl shadow-2xl">
        <div className="flex justify-around">
          <NavButton
            icon={Home}
            label="Home"
            isActive={currentView === 'home'}
            onClick={() => onViewChange('home')}
          />
          <NavButton
            icon={ShoppingBag}
            label="Market"
            isActive={currentView === 'marketplace'}
            onClick={() => onViewChange('marketplace')}
          />
          <NavButton
            icon={Wallet}
            label="Wallet"
            isActive={false}
            onClick={() => {}}
          />
          <NavButton
            icon={MessageCircle}
            label="Chat"
            isActive={false}
            onClick={() => {}}
          />
          <NavButton
            icon={User}
            label="Profile"
            isActive={false}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;