import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../components/Loader"; // Import the loader component

const BlogPostPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL params
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const data = await response.json();
        setBlog(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false even if an error occurs
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader /> 
      </div>
    );
  }

  if (!blog) {
    return <p className="text-center mt-10 text-gray-500">Blog not found</p>;
  }

  const handleDelete = async () => {
    if (!token) {
      alert("Unauthorized: No token provided");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/api/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Blog deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting blog:", error.response?.data?.message || error.message);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">{blog.title}</h1>
        <p className="text-sm text-gray-500 mt-2 mb-4">By {blog.author}</p>
        <div className="mt-4">
          {/* Display content as rich text */}
          <ReactQuill value={blog.content} readOnly theme="bubble" />
        </div>
        {token && (
          <div className="flex justify-between items-center mt-6">
            <Link
              to={`/Update-blog/${blog._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Update this Blog
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Blog
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default BlogPostPage;
