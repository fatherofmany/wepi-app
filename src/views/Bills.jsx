import React from 'react';
import Header from '../components/Header';

const Bills = ({ onBack }) => {
  const billServices = [
    { name: 'Airtime', icon: '📱', color: 'from-blue-500 to-blue-600' },
    { name: 'Electricity', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Internet', icon: '🌐', color: 'from-green-500 to-green-600' },
    { name: 'TV/Cable', icon: '📺', color: 'from-purple-500 to-purple-600' },
    { name: 'Water', icon: '💧', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Netflix', icon: '🎬', color: 'from-red-500 to-red-600' },
    { name: 'Spotify', icon: '🎵', color: 'from-green-500 to-green-600' },
    { name: 'Insurance', icon: '🛡️', color: 'from-indigo-500 to-indigo-600' }
  ];

  const recentPayments = [
    { service: 'MTN Airtime', amount: 2.5, date: 'Today', status: 'Completed' },
    { service: 'Netflix Premium', amount: 4.2, date: 'Yesterday', status: 'Completed' },
    { service: 'EKEDC Electricity', amount: 15.8, date: 'Jun 24', status: 'Pending' }
  ];

  return (
    <div className="space-y-4">
      <Header title="Pay Bills" showBack onBack={onBack} />
      
      <div className="mx-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {billServices.map((bill) => (
            <button
              key={bill.name}
              className={`bg-gradient-to-br ${bill.color} p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all`}
            >
              <span className="text-2xl">{bill.icon}</span>
              <span className="font-medium text-sm">{bill.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {recentPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">{payment.service}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">-{payment.amount}π</p>
                  <p className={`text-xs ${
                    payment.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {payment.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;