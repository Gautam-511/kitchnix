import axios from 'axios';
import { Link, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignupAuth = () => {
    const [phone,setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onClickHandler = async () => {
      try {
          const response = await axios.post('http://localhost:3000/api/v1/register', {
              email,
              username: name,
              password,
              phone_no: phone
          });

          if (response.status === 201) {
              alert('Registration successful! Verification code sent to your email.');
              navigate('/verify')
          } else {
              alert('Registration failed. Please try again.');
          }
      } catch (error) {
          console.error('Error during registration:', error);
          alert('An error occurred during registration. Please check your inputs or try again later.');
      }
  };

    return(<div className="h-screen flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <div className="text-4xl font-bold pt-12">
            Enter your Credentials
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-sm text-slate-600 pt-1">
            Already have an account?
          </div>
          <div className="text-sm text-slate-600 pt-1 pl-1 underline">
            <Link to='/login'>Login</Link> 
          </div>
        </div>
        
        <div className="w-full max-w-md px-8">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Full Name
            </label>
            <input 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Enter your Name" 
              required 
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Email@example.com" 
              required 
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone No.
            </label>
            <input 
              type="tel" 
              onChange={(e) => setPhone(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Enter your Phone No." 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Password" 
              required 
            />
          </div>
          <div className="flex justify-center pt-2">
            <button 
              type="button" 
              onClick={onClickHandler}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Signup
            </button>
          </div>
        </div>
      </div>
      
    )
}