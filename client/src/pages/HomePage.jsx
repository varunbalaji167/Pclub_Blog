import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Loader component (you can style this to fit your design)
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

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
        toast.error("Error fetching blogs",error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="dark:bg-black">
      <HeroSection />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>

        <div className="mt-6 mb-6">
          {token ? (
            <Link
              to="/create-blog"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Create New Blog
            </Link>
          ) : null}
        </div>

        {/* Show loading spinner while the blogs are being fetched */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
      <ToastContainer/>
      <Footer />
    </div>
  );
};

export default HomePage;
