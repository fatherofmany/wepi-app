import React from 'react';
import { Send, ArrowDownLeft, QrCode, ShoppingBag, BookOpen, CheckSquare, Zap } from 'lucide-react';
import Header from '../components/Header';

const Home = ({ piBalance, onViewChange }) => {
  const recentActivity = [
    { id: 1, type: 'sent', recipient: 'Anna', amount: -1.2504, date: 'Today', icon: Send },
    { id: 2, type: 'received', recipient: 'Apr 23', amount: +0.5000, date: 'Apr 23', icon: ArrowDownLeft },
    { id: 3, type: 'shopping', recipient: 'Apr 22', amount: -0.3001, date: 'Apr 22', icon: ShoppingBag },
    { id: 4, type: 'payment', recipient: 'Apr 21', amount: -1.1000, date: 'Apr 21', icon: QrCode }
  ];

  return (
    <div className="space-y-6">
      <Header title="WePi" />
      
      {/* Balance Card */}
      <div className="mx-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-300">π</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold mb-2">{piBalance.toFixed(4)}<span className="text-lg">π</span></p>
          <p className="text-white/80 text-sm">≈ ${(piBalance * 34.2).toFixed(2)} USD</p>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-white/20 px-6 py-3 rounded-2xl flex items-center space-x-2 hover:bg-white/30 transition-all">
            <Send size={18} />
            <span className="font-medium">Send</span>
          </button>
          <button className="bg-orange-500 px-6 py-3 rounded-2xl flex items-center space-x-2 hover:bg-orange-600 transition-all">
            <ArrowDownLeft size={18} />
            <span className="font-medium">Receive</span>
          </button>
          <button className="bg-white/20 px-6 py-3 rounded-2xl flex items-center space-x-2 hover:bg-white/30 transition-all">
            <QrCode size={18} />
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="mx-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onViewChange('marketplace')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all"
          >
            <ShoppingBag size={24} />
            <span className="font-medium">Marketplace</span>
          </button>
          <button 
            onClick={() => onViewChange('pilearn')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all"
          >
            <BookOpen size={24} />
            <span className="font-medium">PiLearn</span>
          </button>
          <button 
            onClick={() => onViewChange('tasks')}
            className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all"
          >
            <CheckSquare size={24} />
            <span className="font-medium">Pi Tasks</span>
          </button>
          <button 
            onClick={() => onViewChange('bills')}
            className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all"
          >
            <Zap size={24} />
            <span className="font-medium">Pay Bills</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mx-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-2xl p-4 shadow-lg space-y-3">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Icon size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 capitalize">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.recipient}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${activity.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {activity.amount > 0 ? '+' : ''}{activity.amount.toFixed(4)}π
                  </p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;