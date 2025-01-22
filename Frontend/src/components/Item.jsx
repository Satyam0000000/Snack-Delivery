import React, { useState } from "react";

const Item = ({ image, name, stockPresent = true, onOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleBuyClick = () => {
    setIsExpanded(true);
  };

  const handleOrderNow = () => {
    if (quantity > 0 && mobileNumber) {
      onOrder({ name, quantity, mobileNumber });
      setIsExpanded(false);
      setQuantity(1);
      setMobileNumber("");
    } else {
      alert("Please enter valid details.");
    }
  };

  const handleBackClick = () => {
    setIsExpanded(false); // Collapse the component
    setQuantity(1); // Reset quantity
    setMobileNumber(""); // Reset mobile number input
  };

  return (
    <div
      className={`relative group w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
        isExpanded ? "h-auto p-4 border-2 border-red-500" : "h-64"
      }`}
    >
      {/* Cover Photo */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className={`w-full ${
            isExpanded ? "h-48" : "h-full"
          } object-cover transition-transform duration-300 group-hover:scale-110`}
        />
        {!stockPresent && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white text-xl font-bold">
            Out of Stock
          </div>
        )}
      </div>

      {!isExpanded && stockPresent && (
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleBuyClick}
            className="px-4 py-2 bg-white text-black rounded-md font-semibold shadow hover:bg-red-500 hover:text-white"
          >
            Buy
          </button>
        </div>
      )}

      {isExpanded && stockPresent && (
        <div className="mt-4 space-y-4 text-white bg-black p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{name}</h3>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <button
              className="px-2 py-1 bg-white text-black rounded-md hover:bg-red-500 hover:text-white"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              className="px-2 py-1 bg-white text-black rounded-md hover:bg-red-500 hover:text-white"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Mobile Number Input */}
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter Mobile Number"
            className="w-full px-3 py-2 border border-white bg-black text-white rounded-md"
          />

          <button
            onClick={handleOrderNow}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md font-semibold shadow hover:bg-red-600"
          >
            Order Now
          </button>

          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md font-semibold shadow hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;