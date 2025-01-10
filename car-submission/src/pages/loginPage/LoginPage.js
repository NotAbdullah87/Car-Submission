import React, { useState } from 'react';
import InputField from '../../components/inputField/InputField';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle changes for all input fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center mt-56">
      <div className="shadow-xl p-7 w-[450px] rounded-xl">
        <h1 className="text-4xl mt-4 text-center text-blue-700 font-bold">Welcome</h1>
        <p className="text-md text-gray-400 text-center mb-4">
          Please log in to access your account</p>

        
        <InputField id="email"label="Email"type="text"width="100%"value={formData.email}onChange={handleInputChange}/>
        <div className='mt-4'><InputField   id="password" label="Password" type="password" variant={"filled"} width="100%" value={formData.password} onChange={handleInputChange} /></div>
        

        <button className="bg-blue-700 text-white px-6 py-2 mt-4 w-full rounded-md hover:bg-blue-800" onClick={() => console.log('Form Data:', formData)} >Login</button>
        <p className=' text-xs mt-4 text-gray-400 text-center'>Don't have an account? Please use these Credentials<br></br>Email: faraz@RhodiumTech.com<br></br>Password: 123456abc</p>
      </div>
    </div>
  );
};

export default LoginPage;
