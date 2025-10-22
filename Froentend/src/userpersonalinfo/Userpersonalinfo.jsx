import React, { useState } from "react";
import { savePersonalInfo } from "../../Api";
import { useNavigate } from "react-router";


const Userpersonalinfo = () => {
     const navigate = useNavigate();
  const [personalData, setPersonalData] = useState({
    address: "",
    pincode: "",
    city: "",
    mobilenumber1: "",
    mobilenumber2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await savePersonalInfo(personalData);
      console.log(response);
      alert("Personal information saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving info:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          User Personal Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={personalData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={personalData.pincode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter pincode"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={personalData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter city name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number 1
            </label>
            <input
              type="text"
              name="mobilenumber1"
              value={personalData.mobilenumber1}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter primary mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number 2
            </label>
            <input
              type="text"
              name="mobilenumber2"
              value={personalData.mobilenumber2}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter secondary mobile number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default Userpersonalinfo;
