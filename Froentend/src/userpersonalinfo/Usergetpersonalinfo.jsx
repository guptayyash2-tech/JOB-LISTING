import React, { useEffect, useState } from "react";
import { getPersonalInfo, setAuthToken } from "../../Api";
import { Link } from "react-router-dom";

const Usergetpersonalinfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);

    const fetchProfile = async () => {
      try {
        const data = await getPersonalInfo();
        setUser(data.user ?? data); // handle {user} or plain user
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-indigo-600 font-medium animate-pulse">
        Loading profile...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold bg-red-50 py-3 px-4 rounded-xl inline-block">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-indigo-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
          User Profile Information
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-shadow shadow-sm hover:shadow-md">
            <label className="block text-sm text-gray-600 font-medium">Address:</label>
            <p className="text-lg font-semibold text-gray-900 mt-1">{user?.address || "N/A"}</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-shadow shadow-sm hover:shadow-md">
            <label className="block text-sm text-gray-600 font-medium">Pincode:</label>
            <p className="text-lg font-semibold text-gray-900 mt-1">{user?.pincode || "N/A"}</p>
          </div>
<div className="p-4 rounded-xl bg-pink-50 hover:bg-pink-100 transition-shadow shadow-sm hover:shadow-md">
            <label className="block text-sm text-gray-600 font-medium">City:</label>
            <p className="text-lg font-semibold text-gray-900 mt-1">{user?.city || "N/A"}</p>
          </div>
          <div className="p-4 rounded-xl bg-pink-50 hover:bg-pink-100 transition-shadow shadow-sm hover:shadow-md">
            <label className="block text-sm text-gray-600 font-medium">Mobile 1:</label>
            <p className="text-lg font-semibold text-gray-900 mt-1">{user?.mobilenumber1 || "N/A"}</p>
          </div>

          <div className="p-4 rounded-xl bg-pink-50 hover:bg-pink-100 transition-shadow shadow-sm hover:shadow-md">
            <label className="block text-sm text-gray-600 font-medium">Mobile 2:</label>
            <p className="text-lg font-semibold text-gray-900 mt-1">{user?.mobilenumber2 || "N/A"}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/updatepersonalinfo"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow-md hover:scale-105 transition-transform"
          >
            Edit Personal Info
          </Link>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow-md hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Usergetpersonalinfo;
