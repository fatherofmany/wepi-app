import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import Header from '../components/Header';

const Marketplace = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const marketplaceItems = [
    { id: 1, name: 'Premium T-Shirt', price: 2.5, category: 'clothing', image: '👕', seller: 'StyleHub', rating: 4.8, sales: 234 },
    { id: 2, name: 'Wireless Earbuds', price: 15.2, category: 'electronics', image: '🎧', seller: 'TechStore', rating: 4.9, sales: 567 },
    { id: 3, name: 'Electric Scooter', price: 125.0, category: 'vehicles', image: '🛴', seller: 'RideMax', rating: 4.7, sales: 89 },
    { id: 4, name: 'Pizza Delivery', price: 8.5, category: 'food', image: '🍕', seller: 'QuickBites', rating: 4.6, sales: 1234 },
    { id: 5, name: 'Gaming Headset', price: 22.3, category: 'electronics', image: '🎮', seller: 'GameGear', rating: 4.8, sales: 456 },
    { id: 6, name: 'Denim Jacket', price: 18.7, category: 'clothing', image: '🧥', seller: 'FashionCo', rating: 4.5, sales: 123 }
  ];

  const filteredMarketplace = selectedCategory === 'all' 
    ? marketplaceItems 
    : marketplaceItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-4">
      <Header title="Marketplace" showBack onBack={onBack} />
      
      {/* Search Bar */}
      <div className="mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-purple-500 focus:outline-none"
          />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Categories */}
      <div className="mx-4">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All', icon: '🛍️' },
            { id: 'clothing', label: 'Clothing', icon: '👕' },
            { id: 'electronics', label: 'Electronics', icon: '📱' },
            { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
            { id: 'food', label: 'Food', icon: '🍕' }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-4 grid grid-cols-2 gap-4">
        {filteredMarketplace.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all">
            <div className="text-4xl mb-3 text-center">{item.image}</div>
            <h3 className="font-bold text-gray-800 mb-1 text-sm">{item.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{item.seller}</p>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <Star size={12} className="text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">{item.rating}</span>
              </div>
              <span className="text-xs text-gray-500">{item.sales} sold</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-600">{item.price}π</span>
              <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-purple-700 transition-all">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;