import React, { useEffect } from "react";
import { account } from "./appwrite";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirection

const GoogleLogin = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = window.location.origin; // Get the current URL
      await account.createOAuth2Session("google", redirectUrl, redirectUrl);
    } catch (error) {
      console.error("Google Login failed:", error);
      alert(error.message || "Google Login failed. Please try again.");
    }
  };

  // Check for existing user session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get(); // Fetch current user session
        if (user) {
          onLogin(user); // If session exists, pass the user to parent component
          navigate("/home"); // Redirect to HomePage if user is logged in
        }
      } catch (error) {
        console.error("No user session found:", error);
      }
    };

    checkSession(); // Check session on load
  }, [onLogin, navigate]);

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600"
    >
      Login with Google
    </button>
  );
};

export default GoogleLogin;