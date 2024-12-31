import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await onLogout(); // Call the provided onLogout function
      navigate("/"); // Redirect to the landing page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/auth"); // Navigate to the Auth component
  };

  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Website Logo/Title */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Instant Snacks Delivery
        </h1>

        {/* User Controls */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-lg">Hello, {user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-white text-black px-4 py-2 rounded hover:bg-red-500 hover:text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;