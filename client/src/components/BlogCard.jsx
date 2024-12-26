// import React from "react";
// import { Link } from "react-router-dom";

// const BlogCard = ({ blog }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
//       {/* Title */}
//       <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate">
//         {blog.title}
//       </h2>

//       {/* Content Preview */}
//       <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed line-clamp-3">
//         {blog.content.substring(0, 100)}...
//       </p>

//       {/* Read More Link */}
//       <Link
//         to={`/blog/${blog._id}`}
//         className="mt-6 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
//       >
//         Read More →
//       </Link>
//     </div>
//   );
// };

// export default BlogCard;

// src/components/BlogCard.jsx
import React from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

// Utility function to safely truncate HTML content
const truncateHTML = (html, maxLength) => {
  const div = document.createElement("div");
  div.innerHTML = html; // Parse the HTML content

  let textContent = div.textContent || div.innerText || ""; // Extract plain text
  if (textContent.length > maxLength) {
    textContent = textContent.substring(0, maxLength).trim() + "..."; // Truncate and append ellipsis
  }

  return textContent;
};

const BlogCard = ({ blog }) => {
  // Truncate the content safely and display it
  const truncatedContent = truncateHTML(blog.content, 300);

  return (
    <div className="border border-gray-200 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 rounded-lg p-4">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex-shrink-0">{blog.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">By {blog.author}</p>
      
      {/* Display truncated content using ReactQuill */}
      <div className="text-gray-800 text-md dark:text-gray-300 flex-grow">
        <ReactQuill value={truncatedContent} readOnly theme="bubble" />
      </div>

      <Link
        to={`/blog/${blog._id}`}
        className="inline-block text-blue-500 hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;