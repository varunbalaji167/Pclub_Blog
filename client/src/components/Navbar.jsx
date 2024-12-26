import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current location
  const { theme, toggleTheme } = useTheme();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Remove the token to log out the user
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to home page or login page after logout
  };

  return (
    <nav className="bg-white dark:bg-black shadow-md transition">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src={`/src/assets/${theme}logo.png`}
            alt="Logo"
            className="h-12 w-12"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`py-2 text-lg font-medium transition duration-200 ${
              isActive("/") ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`py-2 text-lg font-medium transition duration-200 ${
              isActive("/about") ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700 hover:text-blue-500"
            }`}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={`py-2 text-lg font-medium transition duration-200 ${
              isActive("/projects") ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={`py-2 text-lg font-medium transition duration-200 ${
              isActive("/contact") ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Contact Us
          </Link>

          {/* Login/Logout Button */}
          {token ? (
            <button
              onClick={handleLogout}
              className="py-2 text-lg font-medium text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`py-2 text-lg font-medium transition duration-200 ${
                isActive("/login") ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Login
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded flex items-center justify-center"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-16 right-4 bg-white border rounded-md shadow-lg z-10 w-48">
              <Link
                to="/"
                className={`block px-6 py-3 text-lg transition duration-200 ${
                  isActive("/") ? "text-blue-500 bg-gray-100" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block px-6 py-3 text-lg transition duration-200 ${
                  isActive("/about") ? "text-blue-500 bg-gray-100" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                About
              </Link>
              <Link
                to="/projects"
                className={`block px-6 py-3 text-lg transition duration-200 ${
                  isActive("/projects") ? "text-blue-500 bg-gray-100" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className={`block px-6 py-3 text-lg transition duration-200 ${
                  isActive("/contact") ? "text-blue-500 bg-gray-100" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Contact Us
              </Link>

              {/* Login/Logout in Mobile */}
              {token ? (
                <button
                  onClick={handleLogout}
                  className="block px-6 py-3 text-lg text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`block px-6 py-3 text-lg transition duration-200 ${
                    isActive("/login") ? "text-blue-500 bg-gray-100" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
