import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Error fetching blogs", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="dark:bg-black bg-white transition-all duration-700 ease-in-out">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-12">
        {/* Create New Blog Button */}
        <div className="mt-6 mb-6 flex justify-center">
          {token && (
            <Link
              to="/create-blog"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-500 ease-in-out transform hover:scale-105"
            >
              Create New Blog
            </Link>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Cards */}
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;