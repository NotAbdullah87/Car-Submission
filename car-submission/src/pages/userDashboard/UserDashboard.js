import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaDollarSign, FaMapMarkerAlt, FaPhoneAlt, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';
import { useAuth } from '../../context/authContext/AuthContext';

const UserDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/cars', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to fetch submissions');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchSubmissions();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddSubmission = () => {
    navigate('/submissions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="transform hover:scale-110 transition-transform duration-200">🚗</span>
              <span className="ml-2">Car Dashboard</span>
            </h1>
            <button
              onClick={handleLogout}
              className="group flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Your Submissions</h2>
          <button
            onClick={handleAddSubmission}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200"
          >
            <FaPlus className="mr-2" />
            Add New Car
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <SwipeableImageGallery images={submission.images} />
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                  {submission.carModel}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-green-600">
                    <FaDollarSign className="text-lg" />
                    <span className="ml-2 text-xl font-semibold">{submission.price}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="ml-2">{submission.city}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaPhoneAlt className="text-blue-500" />
                    <span className="ml-2">{submission.phoneNumber}</span>
                  </div>
                </div>

                <button
                  onClick={() => console.log('Form Data:', submission)}
                  className="w-full mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transform transition-all duration-200 hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const SwipeableImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div {...handlers} className="relative group">
      <img
        src={`data:image/jpeg;base64,${images[currentImageIndex]}`}
        alt={`Image ${currentImageIndex + 1}`}
        className="w-full h-64 object-cover rounded-t-xl"
      />
      
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200 transform hover:scale-110"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200 transform hover:scale-110"
        >
          ▶
        </button>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;