// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:3000/api/blogs");
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="dark:bg-black">
      <HeroSection />
      <div className="container  mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;