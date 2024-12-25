import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons"; // Instagram, LinkedIn, YouTube
import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons"; // Discord, Facebook
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Email

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 dark:bg-black dark:text-white py-6 mt-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <p className="text-lg text-center mb-4">
          © {new Date().getFullYear()} Programming Club | IITI
        </p>
        <p className="text-sm text-center mb-6">
          Developed & Maintained by Programming Club IITI.
        </p>
        
        <div className="flex space-x-6 mb-4 ">
          {/* Social Media Icons */}
          <a
            href="https://www.instagram.com/pclub_iiti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
          </a>

          <a
            href="https://www.linkedin.com/company/progclub-iiti"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
          </a>

          <a
            href="https://m.youtube.com/@pclub_iiti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
          </a>

          <a
            href="https://discord.com/invite/iitiprogrammingclub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faDiscord} className="text-2xl" />
          </a>

          <a
            href="https://www.facebook.com/groups/485116264850626/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
          </a>

          <a
            href="mailto:progclub@iiti.ac.in"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;