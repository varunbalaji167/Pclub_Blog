import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";  // For email icon
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons"; // For Instagram and GitHub
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"; // For LinkedIn

const Contact = () => {
  // Team members' data
  const teamMembers = [
    {
      name: "Marneni Varun Balaji",
      role: "Member",
      email: "varunbalaji917@gmail.com",
      instagram: "https://www.instagram.com/mvb.2107",
      linkedin: "https://www.linkedin.com/in/marneni-varun-balaji-9301a22b2/",
      github: "https://github.com/varunbalaji167",
      image: "https://cse.iiti.ac.in/stu_pics/btech_2023/230001052.jpg",
    },
    {
      name: "Jane Smith",
      role: "Vice President",
      email: "jane@example.com",
      instagram: "https://instagram.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      image: "/src/assets/jane.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Coordinator",
      email: "mike@example.com",
      instagram: "https://instagram.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      github: "https://github.com/mikejohnson",
      image: "/src/assets/mike.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Current Coordinators
        </h1>
        <p className="text-lg text-center text-gray-700 mb-10">
          Meet our team of dedicated coordinators. Hover over each profile to explore their social media links.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Profile Image */}
              <div className="flex justify-center mt-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-pink-500 shadow-md"
                />
              </div>

              {/* Profile Details */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>

              {/* Hover Overlay with Social Icons */}
              <div className="absolute inset-0 bg-blue-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center items-center space-x-6">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-300 hover:text-white transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    className="text-gray-300 hover:text-white transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    className="text-gray-300 hover:text-white transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    className="text-gray-300 hover:text-white transition"
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
    </div>
  );
};

export default Contact;