import React from "react";
import Header from "../components/Header"; // Import Header component
import Item from "../components/Item"; // Import Item component

const HomePage = ({ user, onLogout }) => {
  const snacks = [
    { id: 1, name: "Chips", image: "https://t4.ftcdn.net/jpg/05/88/75/69/240_F_588756932_5ZQBUg6KLT3kFAkR4EkRNuAaPCnDVQAS.jpg" },
    { id: 2, name: "Maggie", image: "https://t4.ftcdn.net/jpg/07/67/86/55/240_F_767865595_uL1KNe8ojMVewEc8oxzMXfW9TGz5oHJB.jpg" },
    { id: 3, name: "Biscuit", image: "https://t3.ftcdn.net/jpg/00/86/53/04/240_F_86530443_WY1f5KrFwrbfKjY2hmEYzg2hMYQ6wnkJ.jpg" },
    { id: 4, name: "Chocolate", image: "https://t3.ftcdn.net/jpg/01/75/69/78/240_F_175697869_GgIoN67paxOFzGEUSTVmsEqNIUpQkkyr.jpg" },
  ];

  const handleOrder = async ({ name, quantity, mobileNumber }) => {
  const payload = {
    userEmail: user.email, // Pass the user's email
    itemName: name,
    quantity,
    phoneNumber: mobileNumber,
  };

  try {
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

      const result = await response.json();

      if (result.success) {
        alert("Order placed and email sent successfully!");
      } else {
        alert("Failed to send email: " + result.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header user={user} onLogout={onLogout} />

      {/* Main Content */}
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-500">
          Available Snacks
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snacks.map((snack) => (
            <Item
              key={snack.id}
              image={snack.image}
              name={snack.name}
              stockPresent={true}
              onOrder={handleOrder} // Pass handleOrder function
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;