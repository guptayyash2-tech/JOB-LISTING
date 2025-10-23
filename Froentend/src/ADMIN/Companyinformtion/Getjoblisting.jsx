import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllJobListings, setAuthToken} from "../Adminapi";

const GetjobListings = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    setAuthToken(token);

    const fetchJobListings = async () => {
      try {
        const data = await getAllJobListings();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else {
          setError("No job listings found. Please add one.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobListings();
  }, [navigate]);

 

  if (loading)
    return <p className="text-center mt-10 text-gray-600 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Job Listings
        </h2>

        {jobs.length > 0 ? (
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
                  <span className="font-medium">Qualifications:</span> {job.qualifications}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Responsibilities:</span> {job.responsibilities}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Salary:</span> {job.salaryRange}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/createjoblisting")}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => navigate("/createjoblisting")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Add Job Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetjobListings;
