// src/components/BlogCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{blog.title}</h2>
      <p className="text-gray-600 mt-2">
        {blog.content.substring(0, 100)}...
      </p>
      <Link
        to={`/blog/${blog._id}`}
        className="text-blue-500 mt-4 inline-block"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;