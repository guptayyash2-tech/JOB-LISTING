import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCompanyInformationByUserId, setAuthToken } from "../Adminapi";

const GetCompanyInformation = () => {
  const navigate = useNavigate();
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect if not logged in
      return;
    }

    setAuthToken(token);

    const fetchCompanyInfo = async () => {
      try {
        const data = await getCompanyInformationByUserId();

        if (data.company) {
          setInformation(data.company);
        } else {
          setError("No company information found. Please add it.");
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setError("No company information found. Please add it.");
        } else {
          setError(err.message || "Failed to fetch company information.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, [navigate]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Company Information
        </h2>

        {information ? (
          <div className="space-y-2 text-gray-700">
            <p><strong>Company Name:</strong> {information.companyName}</p>
            <p><strong>Email:</strong> {information.companyEmail}</p>
            <p><strong>Phone:</strong> {information.companyPhone}</p>
            <p><strong>Website:</strong> {information.website}</p>
            <p><strong>Address:</strong> {information.address}</p>
            <p><strong>City:</strong> {information.city}</p>
            <p><strong>Pincode:</strong> {information.pincode}</p>
            <p><strong>Contact Person:</strong> {information.contactPersonName}</p>
            <p><strong>Contact Email:</strong> {information.contactPersonEmail}</p>
            <p><strong>Contact Phone:</strong> {information.contactPersonPhone}</p>

            <button
              onClick={() => navigate("/companyinformation")}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Edit Company Info
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => navigate("/companycreate")}
              className="w-full bg-blue-600 text-green-500 py-2 rounded hover:bg-blue-700"
            >
              Add Company Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetCompanyInformation;
