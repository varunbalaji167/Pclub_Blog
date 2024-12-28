import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify"; // Import toast for notifications
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Quill editor content
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for blog update process

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content); // Initialize Quill with blog content
      } catch (error) {
        setError("Failed to load blog");
        toast.error("Failed to load blog", { position: "top-right" });
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading when the request is being sent

    try {
      const response = await axios.put(
        `http://localhost:3000/api/blogs/${id}`,
        { title, content, updatedAt: Date.now() },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Show success toast
      toast.success("Blog updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate(`/blog/${id}`); // Redirect to the blog details page after update
    } catch (error) {
      // Show error toast
      toast.error("Failed to update blog. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false); // End loading once the request is completed
    }
  };

  return (
    <div className="bg-white dark:bg-black">
      <section className="text-center py-20 px-6 md:px-10 lg:px-20 transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-red-400 drop-shadow-lg mb-6">
            Update Blog
          </h1>
          {/* Form */}
          <form onSubmit={handleUpdate} className="w-full max-w-3xl bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
            {/* Blog Title */}
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-400 dark:border-gray-700 rounded-lg p-3 mb-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ease-in-out"
              required
            />

            {/* ReactQuill Editor */}
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  ["clean"],
                  [{ align: [] }],
                  ["image", "video"],
                ],
              }}
              formats={["header", "bold", "italic", "underline", "strike", "link", "image", "video"]}
              className="border border-gray-400 dark:border-gray-700 rounded-lg p-4 mb-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-50 min-h-[300px] focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg"
                >
                  Update Blog
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UpdateBlog;