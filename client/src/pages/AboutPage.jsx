import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">About Us</h1>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Section: Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              PClub is a vibrant community of passionate programmers, innovators, and enthusiasts
              dedicated to pushing the boundaries of technology and creativity. Our mission is to
              nurture talent, foster collaboration, and drive impactful projects.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Based at IIT Indore, we host regular workshops, hackathons, and events to inspire
              and empower the next generation of tech leaders. Whether you're an experienced
              developer or a curious beginner, PClub is the perfect place to learn, grow, and
              thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;