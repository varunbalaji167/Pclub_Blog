import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import DashboardPage from "./pages/DashboardPage";
import Contact from "./pages/ContactPage";
import About from "./pages/AboutPage";
import Login from "./pages/Login";
import UpdateBlog from "./pages/UpdateBlogPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Update-blog/:id" element={<UpdateBlog />} />
      </Routes>
    </Router>
  );
};

export default App;