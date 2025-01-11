import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaDollarSign, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';


const UserDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSwipe = (index, imagesLength) => (direction) => {
    if (direction === 'LEFT') {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
    } else if (direction === 'RIGHT') {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? imagesLength - 1 : prevIndex - 1
      );
    }
  };
  useEffect(() => {
    // Simulate fetching submissions with dummy data
    const dummySubmissions = [
      {
        carModel: 'Toyota Corolla',
        price: '20000',
        phoneNumber: '123-456-7890',
        city: 'Lahore',
        images: [
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
        ],
      },
      {
        carModel: 'Honda Civic',
        price: '25000',
        phoneNumber: '987-654-3210',
        city: 'Karachi',
        images: [
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
        ],
      },
      {
        carModel: 'Suzuki Swift',
        price: '15000',
        phoneNumber: '555-555-5555',
        city: 'Islamabad',
        images: [
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
          'https://carzone.com.pk/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-03-at-20.24.26_549db6c7.jpg',
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
          'https://carzone.com.pk/wp-content/uploads/2023/12/IMG-20231203-WA0006.jpg',
        ],
      },
    ];

    setSubmissions(dummySubmissions);
  }, []);

  return (
    <div className="min-h-screen  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          🚗 Your Submissions
        </h1>

        {error && (
          <p className="mb-8 bg-red-100 text-red-700 p-4 rounded-lg shadow-md text-center">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {submission.carModel}
                </h2>
                <div className="flex items-center text-gray-700">
                  <FaDollarSign className="text-green-500 mr-1" />
                  <span className="text-lg font-semibold">{submission.price}</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    {submission.city}
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <FaPhoneAlt className="mr-2 text-blue-500" />
                    {submission.phoneNumber}
                  </div>
                </div>
              </div>

              {/* Swipeable Image Gallery */}
              <SwipeableImageGallery images={submission.images} />

              {/* Footer */}
              <div className="p-4 bg-gray-50 text-right">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center w-full p-2.5 mt-4"
                  onClick={() => console.log('Form Data:', submission)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
      <div
        {...handlers}
        className="relative overflow-hidden rounded-md"
      >
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="w-full h-64 object-cover"
        />
        {/* Navigation Controls */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          ◀
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          ▶
        </button>
      </div>
    );
  };


export default UserDashboard;
