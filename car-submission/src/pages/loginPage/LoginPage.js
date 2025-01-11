import React, { useState } from 'react';
import InputField from '../../components/inputField/InputField';
// import { useAuth } from '../../context/AuthContext';
// useAuth
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate('/dashboard');
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-56">
      <div className="shadow-xl p-7 w-[450px] rounded-xl">
        <h1 className="text-4xl mt-4 text-center text-blue-700 font-bold ">Welcome</h1>
        <p className="text-sm mt-2 text-gray-400 text-center mb-4">
          Please log in to access your account
        </p>
        <InputField id="email" label="Email" type="text" width="100%" value={formData.email} onChange={handleInputChange} />
        <div className='mt-4'>
          <InputField id="password" label="Password" type="password" variant="filled" width="100%" value={formData.password} onChange={handleInputChange} />
        </div>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center w-full p-2.5 mt-4" onClick={handleLogin}>
          Login
        </button>
        <p className='text-xs mt-4 text-gray-400 text-center'>
          Don't have an account? Please use these Credentials<br />Email: faraz@RhodiumTech.com<br />Password: 123456abc
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
