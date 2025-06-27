import React from 'react';
import Header from '../components/Header';

const Tasks = ({ onBack }) => {
  const tasks = [
    { id: 1, title: 'Complete Daily Survey', reward: 0.15, time: '5 min', difficulty: 'Easy', category: 'Survey' },
    { id: 2, title: 'Verify Business Location', reward: 0.75, time: '15 min', difficulty: 'Medium', category: 'Verification' },
    { id: 3, title: 'Write Product Review', reward: 0.25, time: '10 min', difficulty: 'Easy', category: 'Content' },
    { id: 4, title: 'Refer 3 Friends', reward: 2.50, time: '30 min', difficulty: 'Hard', category: 'Referral' }
  ];

  return (
    <div className="space-y-4">
      <Header title="Pi Tasks" showBack onBack={onBack} />
      
      <div className="mx-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white mb-6">
          <h2 className="font-bold text-lg mb-1">Earn Pi Daily!</h2>
          <p className="text-green-100 text-sm">Complete tasks and grow your Pi balance</p>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-4">Available Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{task.title}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span>⏱️ {task.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {task.difficulty}
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      {task.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">+{task.reward}π</p>
                </div>
              </div>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-all">
                Start Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;