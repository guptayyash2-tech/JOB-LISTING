import React, { useEffect, useState } from "react";
import { getResumes, setAuthToken } from "./Api";
import { Link } from "react-router-dom";

const UserGetResume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);

    const fetchResume = async () => {
      try {
        const data = await getResumes();
        setResume(data.resumes?.[0] ?? null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-sky-700 font-medium">Loading resume...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>;

  if (!resume)
    return <p className="text-center mt-10 text-gray-700">No resume found.</p>;

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch {
      return false;
    }
  };

  const imageSrc = resume.image
    ? isBase64(resume.image)
      ? `data:image/png;base64,${resume.image}`
      : resume.image
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden">

        {/* ===== HEADER SECTION ===== */}
        <header className="bg-gradient-to-r from-blue-600 to-yellow-400 text-gray-900 px-10 py-8 flex flex-col md:flex-row items-center gap-8">
          {/* Photo */}
          <div className="w-28 h-36 overflow-hidden rounded-full md:rounded-[20%] border-4 border-yellow-200 shadow-lg bg-white">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                No Image
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
              {resume.name || "Your Name"}
            </h1>
            <p className="text-lg md:text-xl font-semibold text-gray-800 mt-2">
              {resume.title || "Digital Marketer"}
            </p>
            <p className="text-sm text-gray-800 mt-4 max-w-2xl leading-relaxed">
              {resume.summary ||
                "A creative and results-driven marketing specialist with proven experience in digital campaigns and brand strategy."}
            </p>
          </div>
        </header>

        {/* ===== BODY SECTION ===== */}
        <main className="grid md:grid-cols-3 gap-8 p-10 bg-gray-50">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-8">
            {/* Work Experience */}
            <section>
              <h2 className="text-xl font-bold text-blue-700 border-b-2 border-yellow-400 pb-1 mb-3">
                Work Experience
              </h2>
              <p className="text-gray-800 text-sm leading-relaxed">
                {resume.experience || "No work experience details available."}
              </p>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl font-bold text-blue-700 border-b-2 border-yellow-400 pb-1 mb-3">
                Education
              </h2>
              <p className="text-gray-800 text-sm leading-relaxed">
                {resume.education || "No education details available."}
              </p>
            </section>
          </div>

          {/* Right Section */}
          <aside className="space-y-8">
            {/* Contact */}
            <section>
              <h3 className="text-lg font-bold text-blue-700 border-b border-yellow-400 pb-1 mb-3">
                Contact
              </h3>
              <ul className="text-sm text-gray-800 space-y-1">
                <li>{resume.email || "No email"}</li>
                <li>{resume.mobilenumber || "No phone"}</li>
                <li>{resume.address || "No address"}</li>
              </ul>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-lg font-bold text-blue-700 border-b border-yellow-400 pb-1 mb-3">
                Skills
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                {resume.skills || "No skills listed."}
              </p>
            </section>

            {/* Hobbies */}
            <section>
              <h3 className="text-lg font-bold text-blue-700 border-b border-yellow-400 pb-1 mb-3">
                Hobbies
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                {resume.hoobys || "No hobbies listed."}
              </p>
            </section>
          </aside>
        </main>

        {/* ===== FOOTER SECTION ===== */}
        <footer className="bg-blue-700 text-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 px-10 py-6">
          {resume.resumeLink ? (
            <a
              href={resume.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition-transform hover:scale-105"
            >
              ⬇️ Download Resume
            </a>
          ) : (
            <p className="italic">No resume uploaded yet.</p>
          )}

          <div className="flex gap-3">
            <Link
              to="/createresume"
              className="bg-green-400 text-gray-900 font-semibold px-5 py-2 rounded-full hover:bg-green-300 transition-transform hover:scale-105"
            >
              ✏️ Edit / Upload
            </Link>
            <Link
              to="/"
              className="bg-yellow-400 text-gray-900 font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition-transform hover:scale-105"
            >
              🏠 Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserGetResume;
