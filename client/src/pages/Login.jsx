import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      const { user, token, message } = response.data;

      
      localStorage.setItem("token", token);

      setUser(user);

      setMessage(message || "Login successful!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>

      {message && (
        <p className="text-center mt-4 text-sm text-red-600">{message}</p>
      )}

      {user && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Welcome, {user.name}!</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
