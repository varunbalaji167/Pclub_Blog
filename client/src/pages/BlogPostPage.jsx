import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!token) {
      toast.error("Unauthorized: No token provided");
      return;
    }

    try {
      setDeleting(true);
      const response = await axios.delete(`http://localhost:3000/api/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Blog deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to delete blog. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setDeleting(false);
      setIsModalOpen(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  return (
    <div className="dark:bg-black bg-white">
      <div className="container mx-auto p-6 md:p-8 lg:p-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white border-b pb-4">{blog.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 mb-4">By {blog.author}</p>
          <div className="mt-4">
            <ReactQuill value={blog.content} readOnly theme="bubble" className="bg-transparent text-gray-800 dark:text-white" />
          </div>
          {token && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <Link
                to={`/Update-blog/${blog._id}`}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300 text-center w-full md:w-auto"
              >
                Update this Blog
              </Link>
              <button
                type="button"
                onClick={openModal}
                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 text-center w-full md:w-auto"
              >
                Delete Blog
              </button>
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>

      {/* Modal for Deletion Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Are you sure you want to delete this blog?</h3>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 ${deleting && "opacity-50 cursor-not-allowed"}`}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;