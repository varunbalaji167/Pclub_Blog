// src/components/BlogCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="border dark:bg-pink-500 rounded-lg shadow p-4 hover:shadow-lg transition">
      <h2 className="text-lg dark:text-gray-100 font-semibold">{blog.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {blog.content.substring(0, 100)}...
      </p>
      <Link
        to={`/blog/${blog._id}`}
        className="text-blue-500 dark:text-blue-900 mt-4 inline-block"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;