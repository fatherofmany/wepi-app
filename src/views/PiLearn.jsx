import React from 'react';
import { Star } from 'lucide-react';
import Header from '../components/Header';

const PiLearn = ({ onBack }) => {
  const piLearnCourses = [
    { id: 1, title: 'Pi Network Fundamentals', price: 2.5, duration: '2h 30m', level: 'Beginner', students: 1234, rating: 4.9 },
    { id: 2, title: 'Cryptocurrency Trading', price: 5.0, duration: '4h 15m', level: 'Intermediate', students: 856, rating: 4.7 },
    { id: 3, title: 'Mobile App Development', price: 8.5, duration: '6h 45m', level: 'Advanced', students: 423, rating: 4.8 },
    { id: 4, title: 'Digital Marketing', price: 3.5, duration: '3h 20m', level: 'Beginner', students: 967, rating: 4.6 }
  ];

  return (
    <div className="space-y-4">
      <Header title="PiLearn" showBack onBack={onBack} />
      
      <div className="mx-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Featured Courses</h2>
        <div className="space-y-4">
          {piLearnCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-2">{course.title}</h3>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{course.duration}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">{course.students} students</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-purple-600">{course.price}π</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-all">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PiLearn;