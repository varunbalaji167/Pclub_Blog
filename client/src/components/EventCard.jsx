import React from "react";

const EventCard = ({ title, description, date }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <span className="mt-4 block text-sm text-gray-500">📅 {date}</span>
    </div>
  );
};

export default EventCard;
