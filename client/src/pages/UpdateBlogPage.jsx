import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Quill editor content
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content); // Initialize Quill with blog content
      } catch (error) {
        setError("Failed to load blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/blogs/${id}`,
        { title, content, updatedAt: Date.now() },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      navigate(`/blog/${id}`); // Redirect to the blog details page after update
    } catch (error) {
      setError("Failed to update the blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold">Update Blog</h1>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-lg font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium" htmlFor="content">
            Content
          </label>
          {/* Use Quill Editor */}
          <ReactQuill
            id="content"
            value={content}
            onChange={(value) => setContent(value)}
            className="bg-white"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;