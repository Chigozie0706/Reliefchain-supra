// src/components/ReliefCenter.js
import React, { useState } from "react";
import {
  createManagement,
  addCenter,
  donateToCenter,
  getBalance,
} from "./utils/supraSDK";

const ReliefCenter = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [centerDetails, setCenterDetails] = useState({
    name: "",
    location: "",
    city: "",
    state: "",
  });
  const [centerId, setCenterId] = useState(0);
  const [donationAmount, setDonationAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCenterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateManagement = async () => {
    try {
      await createManagement(privateKey);
      alert("Management system created successfully!");
    } catch (error) {
      console.error("Error creating management system:", error);
    }
  };

  const handleAddCenter = async () => {
    const { name, location, city, state } = centerDetails;
    try {
      await addCenter(privateKey, name, location, city, state);
      alert("Relief center added successfully!");
    } catch (error) {
      console.error("Error adding relief center:", error);
    }
  };

  const handleDonate = async () => {
    try {
      await donateToCenter(privateKey, centerId, donationAmount);
      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating to relief center:", error);
    }
  };

  const handleViewBalance = async () => {
    try {
      const balance = await getBalance(centerId);
      setBalance(balance);
    } catch (error) {
      console.error("Error retrieving balance:", error);
    }
  };

  return (
    <div>
      <h1>Relief Center Management</h1>
      <div>
        <h2>Initialize</h2>
        <input
          type="text"
          placeholder="Private Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <button onClick={handleCreateManagement}>Create Management</button>
      </div>

      <div>
        <h2>Add Relief Center</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={centerDetails.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={centerDetails.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={centerDetails.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={centerDetails.state}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCenter}>Add Center</button>
      </div>

      <div>
        <h2>Donate to Center</h2>
        <input
          type="text"
          placeholder="Center ID"
          value={centerId}
          onChange={(e) => setCenterId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
        <button onClick={handleDonate}>Donate</button>
      </div>

      <div>
        <h2>View Balance</h2>
        <input
          type="text"
          placeholder="Address or Center ID"
          value={centerId}
          onChange={(e) => setCenterId(e.target.value)}
        />
        <button onClick={handleViewBalance}>View Balance</button>
        {balance > 0 && <p>Balance: {balance} SupraCoins</p>}
      </div>
    </div>
  );
};

export default ReliefCenter;
