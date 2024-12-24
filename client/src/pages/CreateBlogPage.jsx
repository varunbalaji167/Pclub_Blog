// src/pages/CreateBlogPage.jsx
import React, { useState } from "react";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
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