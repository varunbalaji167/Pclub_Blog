// src/pages/BlogPostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  const handleDelete = async () => {
    try {
      // Send the DELETE request to delete the blog
      await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/"); // Redirect to home page after deletion
    } catch (error) {
      setError("Failed to delete the blog");
      console.log(error);
    }
  };


  return (<>
  
          
  
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-500 mt-2">By {blog.author}</p>
      <div className="mt-4">
        <p>{blog.content}</p>
      </div>
      <div className="mt-6">
      <Link
            to={`/Update-blog/${blog._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition "
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

    </div>
    </>
  );
};

export default BlogPostPage;