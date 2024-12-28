import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles
import { jwtDecode } from "jwt-decode"; // Use jwt-decode instead of 'jwtDecode'
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify"; // Import toast for notifications

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthorName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [content, setContent] = useState(""); // Store Quill content as HTML
  const reactQuillRef = useRef(null); // Use useRef to store Quill reference
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Decode user details from token
    const fetchUserDetailsFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode the JWT token
          setAuthorName(decodedToken.name); // Assuming the token contains the name
          setAuthorId(decodedToken._id); // Assuming the token contains the user ID
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchUserDetailsFromToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs",
        { title, content, author, author_Id: authorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        // Show success toast
        toast.success("Blog created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Extract the correct blog ID from the response
        const blogId = response.data.blog._id; // Access _id from the blog object

        // Navigate to the blog page using the correct ID
        navigate(`/blog/${blogId}`);
      }
    } catch (error) {
      // Show error toast
      toast.error("Failed to create blog. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-black">
      <section className="text-center py-20 px-6 md:px-10 lg:px-20 transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-red-400 drop-shadow-lg mb-6">
            Create a New Blog
          </h1>
          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
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
              ref={reactQuillRef}
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
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg"
            >
              Publish Blog
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;