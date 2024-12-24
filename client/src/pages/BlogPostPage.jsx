// src/pages/BlogPostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-500 mt-2">By {blog.author.username}</p>
      <div className="mt-4">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;