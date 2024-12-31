import React, { useState } from "react";
import { account } from "./appwrite";
import GoogleLogin from "./GoogleLogin"; // Import GoogleLogin Component
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle Login
  const handleLogin = async () => {
    try {
      await account.createEmailSession(email, password); // Log in with email/password
      const currentUser = await account.get(); // Get the current user after login
      onLogin(currentUser); // Pass the current user to App component
      alert("Login successful!");
      navigate("/seats"); // Redirect to SeatLayout page after login
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed. Please try again.");
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    try {
      await account.create("unique()", email, password); // Signup with email/password
      await handleLogin(); // Automatically log the user in after signup
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <motion.div
        className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          {isLogin ? "Welcome Back!" : "Join Us Today"}
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {isLogin
            ? "Please sign in to continue"
            : "Create an account to get started"}
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            onClick={isLogin ? handleLogin : handleSignup}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg shadow hover:from-blue-600 hover:to-purple-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-6">
          <GoogleLogin onLogin={onLogin} /> {/* Add Google Login Button */}
        </div>
        <p className="text-sm text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;