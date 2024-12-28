import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";
import Loader from "../components/Loader"; // Assuming you have a Loader component

const Contact = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/team");
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchTeamMembers();
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader /> {/* Show loader while content is loading */}
      </div>
    );
  }

  return (
    <div className="dark:bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Meet Our Coordinators
        </h1>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-10">
          Meet our passionate team of coordinators. Hover over each profile to explore their social media profiles.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-slate-700 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              {/* Profile Image */}
              <div className="flex justify-center mt-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-pink-500 shadow-lg transition duration-300 group-hover:scale-110"
                />
              </div>

              {/* Profile Details */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">{member.role}</p>
              </div>

              {/* Hover Overlay with Social Icons */}
              <div className="absolute inset-0 bg-blue-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center items-center space-x-6">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-300 hover:text-white transition transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    className="text-gray-300 hover:text-white transition transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    className="text-gray-300 hover:text-white transition transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    className="text-gray-300 hover:text-white transition transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-2xl" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
