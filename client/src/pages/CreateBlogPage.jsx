// src/pages/CreateBlogPage.jsx
import React, { useState,useEffect } from "react";
import axios from "axios";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthorName] = useState("");
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/user-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = response.data;
        setAuthorName(user.name); // Store the user's name to display
        setAuthorId(user._id); // Store the user's ID to send in the request
      } catch (error) {
        console.error("Error fetching user details:", error.response?.data?.message || error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content,author: author, 
        author_Id: authorId }),
    });
    

    if (response.ok) {
      alert("Blog created!");
    } else {
      alert("Failed to create blog");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg p-2 h-40"
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;