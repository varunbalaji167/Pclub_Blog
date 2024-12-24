// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:5000/api/blogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">My Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="border rounded-lg p-4 mt-4">
          <h3 className="font-semibold">{blog.title}</h3>
          <p>{blog.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;