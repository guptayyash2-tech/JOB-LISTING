import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyForJob, setAuthToken } from "../../Api";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Get jobId from URL
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setMessage("❌ Please upload your resume before applying.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setAuthToken(token);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", resume);

      const res = await applyForJob(jobId, formData);
      setMessage("✅ " + res.message);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed to apply."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Apply for Job
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Resume (PDF / DOCX)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default ApplyJob;
