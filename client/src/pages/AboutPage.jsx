import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Loader from "../components/Loader"; // Import the loader component

const About = () => {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 500); 
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-black transition-all duration-500 ease-in-out">
      <div className="min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loader /> 
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col p-6 items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-red-400 drop-shadow-lg mb-6">About Us</h1>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-50">Who We Are</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  PClub is a vibrant community of passionate programmers, innovators, and enthusiasts
                  dedicated to pushing the boundaries of technology and creativity. Our mission is to
                  nurture talent, foster collaboration, and drive impactful projects.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Based at IIT Indore, we host regular workshops, hackathons, and events to inspire
                  and empower the next generation of tech leaders. Whether you're an experienced
                  developer or a curious beginner, PClub is the perfect place to learn, grow, and
                  thrive.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default About;
