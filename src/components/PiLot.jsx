import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ArrowRight,
  Car, 
  Search, 
  Settings,
  MapPin,
  Star,
  Shield,
  Phone,
  MessageCircle,
  Target
} from 'lucide-react';

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

export default PiLotComponent;