import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles
import {jwtDecode} from "jwt-decode"; // Use jwt-decode instead of 'jwtDecode'

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthorName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [content, setContent] = useState(""); // Store Quill content as HTML
  const [mediaList, setMediaList] = useState([]); // To manage inserted media
  const reactQuillRef = useRef(null); // Use useRef to store Quill reference

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
        alert("Blog created successfully!");
      }
    } catch (error) {
      alert("Failed to create blog");
      console.error(error.response?.data?.message || error.message);
    }
  };

  // Custom image handler to allow image insertion
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/upload-image", // API endpoint for image upload
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const imageUrl = response.data.url;
        const quill = reactQuillRef.current.getEditor(); // Access Quill editor
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);

        // Update media list for further adjustments
        setMediaList([...mediaList, { url: imageUrl, type: "image" }]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  };

  // Custom video handler to allow video insertion
  const videoHandler = () => {
    const url = prompt("Enter the video URL:");

    if (url) {
      const quill = reactQuillRef.current.getEditor(); // Access Quill editor
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "video", url);

      // Update media list for further adjustments
      setMediaList([...mediaList, { url, type: "video" }]);
    }
  };

  // Handle deleting media
  const deleteMedia = (mediaUrl) => {
    setMediaList(mediaList.filter((media) => media.url !== mediaUrl));

    // Remove from the Quill editor content
    const quill = reactQuillRef.current.getEditor(); // Access Quill editor
    const delta = quill.getContents();
    delta.ops.forEach((op) => {
      if (op.insert && op.insert.image === mediaUrl) {
        quill.deleteText(op.index, op.length); // Remove image
      }
    });

    setContent(quill.root.innerHTML); // Update content after deletion
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        {/* Blog Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
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
              [{ header: [1, 2, 3, false] }], // Headings
              ["bold", "italic", "underline", "strike"], // Formatting
              ["blockquote", "code-block"], // Quotes, Code Block
              [{ list: "ordered" }, { list: "bullet" }], // Lists
              ["link"], // Links
              ["clean"], // Clear formatting
              [{ align: [] }], // Alignment options
              ["image", "video"], // Add image/video buttons
            ],
          }}
          formats={["header", "bold", "italic", "underline", "strike", "link", "image", "video"]}
          className="border rounded-lg p-4 mb-4"
          style={{ minHeight: "300px" }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Publish
        </button>
      </form>

      {/* Media List: Show added images and videos
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Media List</h2>
        <ul className="list-disc pl-6">
          {mediaList.map((media, index) => (
            <li key={index} className="mb-2 flex items-center">
              <span className="mr-2">{media.type === "image" ? "📸" : "🎥"}</span>
              <span>{media.url}</span>
              <button
                onClick={() => deleteMedia(media.url)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default CreateBlogPage;