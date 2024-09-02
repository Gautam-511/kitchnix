import Quote from "../components/quote";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Otp(){
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const email = location.state?.email; // Access email from state

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          navigate('/dashboard'); // Redirect to dashboard if logged in
      }
    }, [navigate]);

    const onVerifyHandler = async () => {
      console.log(email);
      try {
          const response = await axios.post('http://localhost:3000/api/v1/verify', {
              email,
              code: otp
          });

          if (response.status === 200) {
              localStorage.setItem('token', response.data.token);
              alert('OTP verified successfully!');
              navigate('/dashboard');
          } else {
              alert('Verification failed. Please try again.');
          }
      } catch (error) {
          console.error('Error during OTP verification:', error);
          alert('An error occurred during verification. Please try again later.');
      }
  };

    return(
        <div className="grid grid-cols-2">
            <Quote/>
            <div>
            <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <div className="text-4xl font-bold pt-12">
            Verify your Email
          </div>
        </div>
        
        
        <div className="w-full max-w-md px-8">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter Otp
            </label>
            <input 
              type="text" 
              onChange={(e) => setOtp(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Enter OTP" 
              required 
            />
            
          </div>
          <div className="flex justify-center pt-2">
            <button 
              type="button" 
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={onVerifyHandler}>
              Verify  
            </button>
          </div>
        </div>
      </div>
            </div>
        </div>
    )
}