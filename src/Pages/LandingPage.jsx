import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth"); // Navigate to the Auth component
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <motion.h1
          className="text-5xl font-extrabold text-red-500 mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Instant Snack Delivery
        </motion.h1>
        <motion.p
          className="text-xl text-white mb-8 text-center px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Craving snacks? We deliver your favorite snacks instantly, anytime, anywhere. Get started now to satisfy your hunger!
        </motion.p>
        <motion.button
          className="bg-red-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-red-600"
          onClick={handleGetStarted}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </main>

    </div>
  );
};

export default LandingPage;