import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current location

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="/src/assets/lightlogo.png"
            alt="Logo"
            className="h-12 w-12"
          />
          {/* <div className="text-2xl font-bold text-gray-800">PClub</div> */}
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
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-700"
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;