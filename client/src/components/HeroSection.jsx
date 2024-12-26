import React from "react";
import pclub from "../assets/pclub.jpeg";

const HeroSection = () => {
  return (
    <section className="bg-white dark:bg-black text-center py-20 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-red-400 drop-shadow-lg">
          Welcome to PClub
          
        </h1>
        {/* Subheading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mt-4 text-gray-600 dark:text-gray-100 drop-shadow-md">
          Indian Institute of Technology, Indore
        </h2>
        {/* Description */}
        <p className="mt-6 text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
          A community of passionate programmers and innovators.
        </p>
        {/* Image */}
        <div className="mt-12 flex justify-center">
          <img
            src={pclub}
            alt="PClub Logo"
            className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full shadow-2xl ring-4  ring-opacity-50 hover:scale-110 transform transition-all duration-500 cursor-pointer hover:ring-2 hover:ring-pink-500"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;