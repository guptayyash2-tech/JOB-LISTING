import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { applyForJob, getAllJob, setAuthToken } from "../../Api";

const ApplyJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState({});
  const [message, setMessage] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setAuthToken(token);

    const fetchJobs = async () => {
      try {
        const data = await getAllJob();
        if (data.jobs) setJobs(data.jobs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleFileChange = (e, jobId) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ ...message, [jobId]: "❌ File must be less than 2MB." });
      setResume({ ...resume, [jobId]: null });
    } else {
      setResume({ ...resume, [jobId]: file });
      setMessage({ ...message, [jobId]: "" });
    }
  };

  const handleApply = async (jobId) => {
    if (!resume[jobId]) {
      setMessage({ ...message, [jobId]: "❌ Please upload your resume." });
      return;
    }

    try {
      setSubmitting({ ...submitting, [jobId]: true });

      const formData = new FormData();
      formData.append("resume", resume[jobId]);

      const res = await applyForJob(jobId, formData);
      setMessage({ ...message, [jobId]: "✅ " + res.message });
      setResume({ ...resume, [jobId]: null });

      // Clear message after 5s
      setTimeout(() => setMessage({ ...message, [jobId]: "" }), 5000);
    } catch (err) {
      setMessage({
        ...message,
        [jobId]: "❌ " + (err.response?.data?.message || "Failed to apply"),
      });
    } finally {
      setSubmitting({ ...submitting, [jobId]: false });
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">Loading jobs...</p>
    );
  if (jobs.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        No job listings available.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Job Listings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {job.jobTitle}
            </h3>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Description:</span> {job.description}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Vacancies:</span> {job.totalVacancies}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Qualifications:</span>{" "}
              {job.qualifications}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Experience:</span>{" "}
              {job.responsibilities}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Salary:</span> {job.salaryRange}
            </p>

            <div className="mt-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, job._id)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500"
              />
              {resume[job._id] && (
                <p className="text-sm text-gray-500 mb-2">
                  Selected file: {resume[job._id].name}
                </p>
              )}

              {message[job._id] && (
                <p
                  className={`mb-2 font-medium ${
                    message[job._id].includes("✅")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {message[job._id]}
                </p>
              )}

              <button
                onClick={() => handleApply(job._id)}
                disabled={submitting[job._id]}
                className={`w-full py-2 rounded-lg text-white font-medium transition ${
                  submitting[job._id]
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting[job._id] ? "Applying..." : "Apply Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplyJob;
