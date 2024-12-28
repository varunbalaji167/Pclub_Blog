import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const token = localStorage.getItem("token");
  const linkRefs = useRef([]); // Array to hold references to links

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const activeLink = linkRefs.current
      .filter((link) => link !== null) // Exclude undefined/null entries
      .find((link) => link.getAttribute("href") === location.pathname);
  
    if (activeLink) {
      setUnderlineStyle({
        width: `${activeLink.offsetWidth}px`,
        left: `${activeLink.offsetLeft}px`,
      });
    } else {
      setUnderlineStyle({}); // Reset style if no active link
    }
  }, [location]);

  return (
    <nav className="bg-white dark:bg-black transition-colors duration-500 ease-in-out relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={`/src/assets/${theme}club.jpeg`}
            alt="Logo"
            className="h-12 w-12 transition-transform duration-200 ease-in-out hover:scale-110"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center relative">
          <div
            className="absolute bottom-0 h-1 bg-blue-500 rounded transition-all duration-300"
            style={underlineStyle}
          />
          <Link
            to="/"
            ref={(el) => (linkRefs.current[0] = el)}
            className={`py-2 text-lg font-medium transition-all duration-300 ease-in-out ${
              isActive("/")
                ? "text-blue-500"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            ref={(el) => (linkRefs.current[1] = el)}
            className={`py-2 text-lg font-medium transition-all duration-300 ease-in-out ${
              isActive("/about")
                ? "text-blue-500"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
            }`}
          >
            About
          </Link>
          
          <Link
            to="/contact"
            ref={(el) => (linkRefs.current[3] = el)}
            className={`py-2 text-lg font-medium transition-all duration-300 ease-in-out ${
              isActive("/contact")
                ? "text-blue-500"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
            }`}
          >
            Contact Us
          </Link>

          {/* Login/Logout Button */}
          {token ? (
            <button
              onClick={handleLogout}
              className="py-2 text-lg font-medium text-red-500 hover:text-red-600 transition-colors duration-300 ease-in-out"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              ref={(el) => (linkRefs.current[4] = el)}
              className={`py-2 text-lg font-medium transition-all duration-300 ease-in-out ${
                isActive("/login")
                  ? "text-blue-500"
                  : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
              }`}
            >
              Login
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
            aria-label="Toggle Theme"
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              className="text-2xl text-gray-700 dark:text-gray-200 transition-transform duration-300 ease-in-out"
            />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="focus:outline-none transition-transform duration-300 ease-in-out"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-200 transition-transform duration-300 ease-in-out"
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
            className="p-2 rounded-full transition-all duration-300 ease-in-out"
            aria-label="Toggle Theme"
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              className="text-2xl text-gray-700 dark:text-gray-200"
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-xl mt-2 mx-6 py-4 z-50 transition-all duration-300 ease-in-out">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className={`block px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${
                  isActive("/")
                    ? "text-white bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className={`block px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${
                  isActive("/about")
                    ? "text-white bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className={`block px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${
                  isActive("/contact")
                    ? "text-white bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Contact Us
              </Link>
            </li>
            {token ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-6 py-3 text-lg font-semibold text-red-500 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className={`block px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${
                    isActive("/login")
                      ? "text-white bg-gradient-to-r from-blue-500 to-indigo-500"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;