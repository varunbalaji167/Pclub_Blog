import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      const { user, token, message } = response.data;

      localStorage.setItem("token", token);
      setUser(user);
      setMessage(message || "Login successful!");
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      setMessage(errorMessage);
      toast.error(errorMessage); // Display error message in toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Email:
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                placeholder="ABC@iiti.ac.in"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 p-3 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>

        {loading && (
          <div className="flex justify-center mt-4">
            <Loader />
          </div>
        )}

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}

        {user && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Welcome, {user.name}!
            </h3>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;