import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import InputField from '../../components/inputField/InputField'; // Import your custom InputField component
import { useAuth } from '../../context/authContext/AuthContext';

const CarSubmissionPage = () => {
  const [formData, setFormData] = useState({
    carModel: '',
    price: '',
    phoneNumber: '',
    city: '',
    maxPictures: '2',
  });

  const { logout } = useAuth();
  const [cities, setCities] = useState(['Lahore', 'Karachi', 'Islamabad']);
  const [newCity, setNewCity] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > formData.maxPictures) {
      setError(`You can only upload up to ${formData.maxPictures} images`);
      return;
    }

    setImages((prevImages) => [...prevImages, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    setError(''); // Clear the error message if the upload is successful
  };

  // Remove an image
  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  // Add a new city to the dropdown
  const handleAddCity = () => {
    if (newCity.trim() && !cities.includes(newCity)) {
      setCities((prev) => [...prev, newCity]);
      setNewCity('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Submission failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-0 /px- sm:px-6 lg:px-8">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="transform hover:scale-110 transition-transform duration-200">🚗</span>
              <span className="ml-2">Car Dashboard</span>
            </h1>
            <button
              onClick={()=>{navigate('/dashboard')}}
              className="group flex items-center px-4 py-2 text-gray-900 font-bold hover:text-red-600 transition-colors duration-200"
            >
              {/* <FaSignOutAlt className="mr-2 group-hover:rotate-180 transition-transform duration-300" /> */}
              <span>Dashboard</span>
            </button>
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

      <div className="max-w-md mt-12 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Submit Your Car</h2>

          {error && <p className="mb-4 bg-red-50 text-red-700 p-4 rounded">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Car Model */}
            <InputField
              id="carModel"
              label="Car Model"
              type="text"
              variant="outlined"
              width="100%"
              value={formData.carModel}
              onChange={handleChange}
              name="carModel"
            />

            {/* Price */}
            <InputField
              id="price"
              label="Price"
              type="number"
              variant="outlined"
              width="100%"
              value={formData.price}
              onChange={handleChange}
              name="price"
            />

            {/* Phone Number */}
            <InputField
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              variant="outlined"
              width="100%"
              value={formData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
            />

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <div className="flex items-center space-x-2">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex items-center gap-x-2 w-full'>
              <InputField
                id="newCity"
                label="Add New City"
                type="text"
                width="90%"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                name="newCity"
              />
              <button
                type="button"
                onClick={handleAddCity}
                className="bg-blue-600 h-12 text-white px-3 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                +
              </button>
            </div>

            {/* Max Number of Pictures */}
            <InputField
              id="maxPictures"
              label="Max Number of Pictures"
              type="number"
              variant="outlined"
              width="100%"
              value={formData.maxPictures}
              onChange={handleChange}
              name="maxPictures"
              min="1"
              max="10"
            />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Pictures</label>
              <label className="mt-1 block w-48 text-center cursor-pointer border-2 rounded-2xl border-dotted text-gray-800 py-4 px-4 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span>Choose Files</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarSubmissionPage;
