import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ArrowDownLeft, 
  ArrowUpDown, 
  Lock, 
  Search, 
  Shirt, 
  Smartphone, 
  Car, 
  UtensilsCrossed,
  Settings,
  QrCode,
  CreditCard,
  BookOpen,
  MessageCircle,
  MapPin,
  CheckSquare,
  Zap,
  Home,
  ShoppingBag,
  Wallet,
  User,
  Menu,
  X,
  ArrowRight,
  Star,
  Shield,
  Coins,
  Gift,
  TrendingUp,
  Bell,
  Filter,
  Navigation,
  Clock,
  Phone,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import WePiLogo from './components/WePiLogo';

{/* Example usage inside Header or Home screen */}


// PiLot Component
const PiLotComponent = ({ onBack, piBalance, setPiBalance }) => {
  const [currentStep, setCurrentStep] = useState('booking'); // booking, searching, matched, trip, completed
  const [selectedVehicle, setSelectedVehicle] = useState('standard');
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [tripProgress, setTripProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(12);

  // Mock location data
  const [pickupLocation, setPickupLocation] = useState('Marina District, Lagos');
  const [destinationLocation, setDestinationLocation] = useState('Victoria Island, Lagos');

  // Vehicle types with Pi pricing
  const vehicleTypes = [
    {
      id: 'economy',
      name: 'PiEconomy',
      icon: '🚗',
      price: 2.5,
      time: '3-5 min',
      capacity: '4 seats',
      description: 'Affordable rides'
    },
    {
      id: 'standard',
      name: 'PiStandard',
      icon: '🚙',
      price: 3.2,
      time: '2-4 min',
      capacity: '4 seats',
      description: 'Comfortable rides'
    },
    {
      id: 'premium',
      name: 'PiPremium',
      icon: '🚐',
      price: 5.8,
      time: '1-3 min',
      capacity: '6 seats',
      description: 'Luxury experience'
    },
    {
      id: 'bike',
      name: 'PiBike',
      icon: '🏍️',
      price: 1.2,
      time: '1-2 min',
      capacity: '1 rider',
      description: 'Quick delivery'
    },
    {
      id: 'delivery',
      name: 'PiDelivery',
      icon: '📦',
      price: 1.8,
      time: '5-10 min',
      capacity: '20kg max',
      description: 'Package delivery'
    }
  ];

  // Mock driver data
  const driverData = {
    name: 'Adebayo Johnson',
    rating: 4.9,
    totalTrips: 1247,
    vehicle: 'Toyota Camry 2019',
    plateNumber: 'LAG-423-XY',
    phone: '+234 803 123 4567',
    photo: '👨🏿‍💼',
    arrivalTime: '3 min'
  };

  // Mock nearby drivers
  const nearbyDrivers = [
    { id: 1, lat: 6.4281, lng: 3.4219, type: 'standard' },
    { id: 2, lat: 6.4301, lng: 3.4189, type: 'economy' },
    { id: 3, lat: 6.4251, lng: 3.4249, type: 'premium' },
    { id: 4, lat: 6.4271, lng: 3.4229, type: 'bike' }
  ];

  useEffect(() => {
    let interval;
    if (currentStep === 'trip') {
      interval = setInterval(() => {
        setTripProgress(prev => {
          if (prev >= 100) {
            setCurrentStep('completed');
            return 100;
          }
          return prev + 2;
        });
        setEstimatedTime(prev => prev > 0 ? prev - 0.2 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  const handleBookRide = () => {
    const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
    if (piBalance >= selectedVehicleData.price) {
      setCurrentStep('searching');
      setTimeout(() => setCurrentStep('matched'), 3000);
    } else {
      alert('Insufficient Pi balance for this ride');
    }
  };

  const handleTripStart = () => {
    setCurrentStep('trip');
    const vehiclePrice = vehicleTypes.find(v => v.id === selectedVehicle).price;
    setPiBalance(prev => prev - vehiclePrice);
  };

  const renderBookingInterface = () => (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto mb-2 text-purple-600" size={32} />
            <p className="text-sm text-gray-600 font-medium">Interactive Map</p>
            <p className="text-xs text-gray-500">Lagos, Nigeria</p>
          </div>
        </div>
        
        {/* Mock driver markers */}
        {nearbyDrivers.map(driver => (
          <div
            key={driver.id}
            className="absolute w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs"
            style={{
              left: `${20 + (driver.id * 15)}%`,
              top: `${30 + (driver.id * 10)}%`
            }}
          >
            🚗
          </div>
        ))}
        
        {/* User location */}
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

      {/* Location Inputs */}
      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full font-medium text-gray-800 bg-transparent border-none outline-none"
              />
            </div>
            <Target size={20} className="text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Destination</p>
              <input
                type="text"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
                className="w-full font-medium text-gray-800 bg-transparent border-none outline-none"
              />
            </div>
            <Search size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div>
        <h3 className="font-bold text-gray-800 mb-3">Choose Your Ride</h3>
        <div className="space-y-3">
          {vehicleTypes.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                selectedVehicle === vehicle.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{vehicle.icon}</span>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{vehicle.name}</p>
                    <p className="text-xs text-gray-500">{vehicle.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{vehicle.time}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{vehicle.capacity}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">{vehicle.price}π</p>
                  <p className="text-xs text-gray-500">≈ ${(vehicle.price * 34.2).toFixed(2)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Book Ride Button */}
      <button
        onClick={handleBookRide}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
      >
        Book PiLot Ride
      </button>
    </div>
  );

  const renderSearching = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center animate-pulse">
          <Car size={40} className="text-purple-600" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-bounce"></div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Finding Your PiLot</h2>
        <p className="text-gray-600">Connecting you with nearby drivers...</p>
      </div>
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );

  const renderMatched = () => (
    <div className="space-y-6">
      {/* Driver Found Header */}
      <div className="text-center bg-green-50 p-4 rounded-2xl">
        <h2 className="text-xl font-bold text-green-800 mb-1">PiLot Found! 🎉</h2>
        <p className="text-green-600">Your driver is on the way</p>
      </div>

      {/* Driver Details Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-2xl">
            {driverData.photo}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">{driverData.name}</h3>
            <div className="flex items-center space-x-2 mb-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="font-medium text-gray-700">{driverData.rating}</span>
              <span className="text-gray-500 text-sm">({driverData.totalTrips} trips)</span>
            </div>
            <p className="text-sm text-gray-600">{driverData.vehicle}</p>
            <p className="text-sm font-medium text-gray-800">{driverData.plateNumber}</p>
          </div>
        </div>

        {/* ETA and Actions */}
        <div className="bg-purple-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Arrival Time</p>
              <p className="text-2xl font-bold text-purple-600">{driverData.arrivalTime}</p>
            </div>
            <div className="flex space-x-3">
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                <Phone size={20} className="text-green-600" />
              </button>
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                <MessageCircle size={20} className="text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Distance</span>
            <span className="font-medium">8.2 km</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Estimated Time</span>
            <span className="font-medium">15 min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Fare</span>
            <span className="font-bold text-purple-600">
              {vehicleTypes.find(v => v.id === selectedVehicle).price}π
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setCurrentStep('booking')}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all"
        >
          Cancel Ride
        </button>
        <button
          onClick={handleTripStart}
          className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-all"
        >
          Start Trip
        </button>
      </div>
    </div>
  );

  const renderTrip = () => (
    <div className="space-y-6">
      {/* Trip Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Trip in Progress</h2>
          <p className="text-gray-600">Estimated arrival: {Math.ceil(estimatedTime)} min</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${tripProgress}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600">{tripProgress.toFixed(0)}% Complete</p>
      </div>

      {/* Driver Info (Minimized) */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              {driverData.photo}
            </div>
            <div>
              <p className="font-medium text-gray-800">{driverData.name}</p>
              <p className="text-sm text-gray-600">{driverData.plateNumber}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Phone size={16} className="text-green-600" />
            </button>
            <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle size={16} className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Safety Features */}
      <div className="bg-red-50 rounded-2xl p-4">
        <div className="flex items-center space-x-3">
          <Shield size={24} className="text-red-600" />
          <div>
            <p className="font-medium text-red-800">Safety First</p>
            <p className="text-sm text-red-600">Emergency contact & live tracking active</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompleted = () => (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center bg-green-50 p-6 rounded-2xl">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Trip Completed!</h2>
        <p className="text-green-600">Thank you for using PiLot</p>
      </div>

      {/* Trip Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">Trip Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Distance</span>
            <span className="font-medium">8.2 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">18 min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fare Paid</span>
            <span className="font-bold text-purple-600">
              {vehicleTypes.find(v => v.id === selectedVehicle).price}π
            </span>
          </div>
        </div>
      </div>

      {/* Rate Driver */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-800 mb-4">Rate Your PiLot</h3>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            {driverData.photo}
          </div>
          <div>
            <p className="font-medium text-gray-800">{driverData.name}</p>
            <p className="text-sm text-gray-600">{driverData.vehicle}</p>
          </div>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} className="text-2xl text-yellow-400 hover:scale-110 transition-all">
              ⭐
            </button>
          ))}
        </div>
        <textarea
          placeholder="Leave a comment for your driver..."
          className="w-full p-3 border border-gray-200 rounded-xl resize-none"
          rows="3"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-all">
          Submit Rating
        </button>
        <button
          onClick={() => {
            setCurrentStep('booking');
            setTripProgress(0);
            setEstimatedTime(12);
          }}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all"
        >
          Book Another Ride
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1">
            <ArrowRight className="rotate-180" size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold">PiLot</h1>
            <p className="text-sm text-purple-100">Ride with Pi</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm text-purple-100">Balance</p>
            <p className="font-bold">{piBalance.toFixed(4)}π</p>
          </div>
          <Settings size={20} className="opacity-80" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-6">
        {currentStep === 'booking' && renderBookingInterface()}
        {currentStep === 'searching' && renderSearching()}
        {currentStep === 'matched' && renderMatched()}
        {currentStep === 'trip' && renderTrip()}
        {currentStep === 'completed' && renderCompleted()}
      </div>
    </div>
  );
};

// Main WePi App
const WePiApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [piBalance, setPiBalance] = useState(3.2746);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data
  const recentActivity = [
    { id: 1, type: 'sent', recipient: 'Anna', amount: -1.2504, date: 'Today', icon: Send },
    { id: 2, type: 'received', recipient: 'Apr 23', amount: +0.5000, date: 'Apr 23', icon: ArrowDownLeft },
    { id: 3, type: 'shopping', recipient: 'Apr 22', amount: -0.3001, date: 'Apr 22', icon: ShoppingBag },
    { id: 4, type: 'payment', recipient: 'Apr 21', amount: -1.1000, date: 'Apr 21', icon: CreditCard }
  ];

  const marketplaceItems = [
    { id: 1, name: 'Premium T-Shirt', price: 2.5, category: 'clothing', image: '👕', seller: 'StyleHub', rating: 4.8, sales: 234 },
    { id: 2, name: 'Wireless Earbuds', price: 15.2, category: 'electronics', image: '🎧', seller: 'TechStore', rating: 4.9, sales: 567 },
    { id: 3, name: 'Electric Scooter', price: 125.0, category: 'vehicles', image: '🛴', seller: 'RideMax', rating: 4.7, sales: 89 },
    { id: 4, name: 'Pizza Delivery', price: 8.5, category: 'food', image: '🍕', seller: 'QuickBites', rating: 4.6, sales: 1234 },
    { id: 5, name: 'Gaming Headset', price: 22.3, category: 'electronics', image: '🎮', seller: 'GameGear', rating: 4.8, sales: 456 },
    { id: 6, name: 'Denim Jacket', price: 18.7, category: 'clothing', image: '🧥', seller: 'FashionCo', rating: 4.5, sales: 123 }
  ];

  const piLearnCourses = [
    { id: 1, title: 'Pi Network Fundamentals', price: 2.5, duration: '2h 30m', level: 'Beginner', students: 1234, rating: 4.9 },
    { id: 2, title: 'Cryptocurrency Trading', price: 5.0, duration: '4h 15m', level: 'Intermediate', students: 856, rating: 4.7 },
    { id: 3, title: 'Mobile App Development', price: 8.5, duration: '6h 45m', level: 'Advanced', students: 423, rating: 4.8 },
    { id: 4, title: 'Digital Marketing', price: 3.5, duration: '3h 20m', level: 'Beginner', students: 967, rating: 4.6 }
  ];

  const tasks = [
    { id: 1, title: 'Complete Daily Survey', reward: 0.15, time: '5 min', difficulty: 'Easy', category: 'Survey' },
    { id: 2, title: 'Verify Business Location', reward: 0.75, time: '15 min', difficulty: 'Medium', category: 'Verification' },
    { id: 3, title: 'Write Product Review', reward: 0.25, time: '10 min', difficulty: 'Easy', category: 'Content' },
    { id: 4, title: 'Refer 3 Friends', reward: 2.50, time: '30 min', difficulty: 'Hard', category: 'Referral' }
  ];

  const filteredMarketplace = selectedCategory === 'all' 
    ? marketplaceItems 
    : marketplaceItems.filter(item => item.category === selectedCategory);

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

  const Header = ({ title, showBack = false }) => (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
      <div className="flex items-center space-x-3">
        {showBack && (
          <button onClick={() => setCurrentView('home')} className="p-1">
            <ArrowRight className="rotate-180" size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center space-x-3">
        <Bell size={20} className="opacity-80" />
        <Settings size={20} className="opacity-80" />
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-6">
      <Header
  title={
    <div className="flex items-center space-x-2">
      <WePiLogo size="medium" variant="full" />
    </div>
  }
/>

      
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
            onClick={() => setCurrentView('marketplace')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all"
          >
            <ShoppingBag size={24} />
            <span className="font-medium">Marketplace</span>
          </button>
          <button 
            onClick={() => setCurrentView('pilearn')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all"
          >
            <BookOpen size={24} />
            <span className="font-medium">PiLearn</span>
          </button>
          <button 
            onClick={() => setCurrentView('tasks')}
            className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl text-white flex flex-col items-center space-y-2 hover:scale-105 transition-all"
          >
            <CheckSquare size={24} />
            <span className="font-medium">Pi Tasks</span>
          </button>
          <button 
            onClick={() => setCurrentView('bills')}
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

  const renderMarketplace = () => (
    <div className="space-y-4">
      <Header title="Marketplace" showBack />
      
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

  const renderPiLearn = () => (
    <div className="space-y-4">
      <Header title="PiLearn" showBack />
      
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

  const renderTasks = () => (
    <div className="space-y-4">
      <Header title="Pi Tasks" showBack />
      
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

  const renderBills = () => (
    <div className="space-y-4">
      <Header title="Pay Bills" showBack />
      
      <div className="mx-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { name: 'Airtime', icon: '📱', color: 'from-blue-500 to-blue-600' },
            { name: 'Electricity', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
            { name: 'Internet', icon: '🌐', color: 'from-green-500 to-green-600' },
            { name: 'TV/Cable', icon: '📺', color: 'from-purple-500 to-purple-600' },
            { name: 'Water', icon: '💧', color: 'from-cyan-500 to-cyan-600' },
            { name: 'Netflix', icon: '🎬', color: 'from-red-500 to-red-600' },
            { name: 'Spotify', icon: '🎵', color: 'from-green-500 to-green-600' },
            { name: 'Insurance', icon: '🛡️', color: 'from-indigo-500 to-indigo-600' }
          ].map((bill) => (
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
            {[
              { service: 'MTN Airtime', amount: 2.5, date: 'Today', status: 'Completed' },
              { service: 'Netflix Premium', amount: 4.2, date: 'Yesterday', status: 'Completed' },
              { service: 'EKEDC Electricity', amount: 15.8, date: 'Jun 24', status: 'Pending' }
            ].map((payment, index) => (
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
const renderWallet = () => (
  <div className="space-y-6">
    <Header title="Wallet" showBack />
    <div className="mx-4 space-y-4">
      <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold">{piBalance.toFixed(4)}π</h2>
        <p className="text-white/80 text-sm mt-1">≈ ${(piBalance * 34.2).toFixed(2)} USD</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Recipient Wallet Address"
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Amount in Pi"
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
        />
        <button
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-bold hover:bg-purple-800"
        >
          Send Pi
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-gray-800 mb-2">Transaction History</h3>
        <ul className="space-y-3">
          <li className="bg-white p-3 rounded-xl shadow-sm text-sm flex justify-between">
            <span>Sent to 0x23a...fE1</span>
            <span className="text-red-500 font-bold">-1.00π</span>
          </li>
          <li className="bg-white p-3 rounded-xl shadow-sm text-sm flex justify-between">
            <span>Received from 0xACb...9B7</span>
            <span className="text-green-600 font-bold">+2.25π</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const renderProfile = () => (
  <div className="space-y-6">
    <Header title="Profile" showBack />
    <div className="mx-4 space-y-4">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-4xl">
          🧑🏽‍💻
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-800">Sanjo Komolafe</h2>
        <p className="text-gray-500 text-sm">wepiuser@domain.com</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Display Name</label>
          <input className="w-full mt-1 p-3 rounded-xl border border-gray-300" defaultValue="Sanjo Komolafe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input className="w-full mt-1 p-3 rounded-xl border border-gray-300" defaultValue="wepiuser@domain.com" />
        </div>
        <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700">
          Save Changes
        </button>
      </div>
    </div>
  </div>
);
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="pb-20">
        {currentView === 'home' && renderHome()}
        {currentView === 'marketplace' && renderMarketplace()}
        {currentView === 'pilearn' && renderPiLearn()}
        {currentView === 'tasks' && renderTasks()}
        {currentView === 'bills' && renderBills()}
        {currentView === 'wallet' && renderWallet()}
  {currentView === 'profile' && renderProfile()}
        {currentView === 'pilot' && (
  <PiLotComponent 
    onBack={() => setCurrentView('home')}
    piBalance={piBalance}
    setPiBalance={setPiBalance}
  />
)}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-t-3xl shadow-2xl">
          <div className="flex justify-around">
            <WePiLogo size="small" variant="icon" />

            <NavButton
              icon={Home}
              label="Home"
              isActive={currentView === 'home'}
              onClick={() => setCurrentView('home')}
            />
            <NavButton
              icon={ShoppingBag}
              label="Market"
              isActive={currentView === 'marketplace'}
              onClick={() => setCurrentView('marketplace')}
              />
                     <NavButton
  icon={Navigation}
  label="PiLot"
  isActive={currentView === 'pilot'}
  onClick={() => setCurrentView('pilot')}
            />
            <NavButton
  icon={Wallet}
  label="Wallet"
  isActive={currentView === 'wallet'}
  onClick={() => setCurrentView('wallet')}
/>
<NavButton
  icon={User}
  label="Profile"
  isActive={currentView === 'profile'}
  onClick={() => setCurrentView('profile')}
/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WePiApp;