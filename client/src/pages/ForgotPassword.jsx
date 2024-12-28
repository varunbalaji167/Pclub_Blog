import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Loader component (you can style this to fit your design)
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await axios.post('http://localhost:3000/api/users/forgot-password', { email });
      toast.success(response.data.message);
      setError('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending email');
      setMessage('');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="dark:bg-black min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Forgot Password</h2>
        
        {/* Show loading spinner while the form is being processed */}
        {loading && <div className='flex justify-center items-center '>
            <Loader /></div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ForgotPassword;
