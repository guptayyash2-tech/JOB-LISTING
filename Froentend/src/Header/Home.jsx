import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const guestLinks = [
  { to: "/register", label: "Register", style: "bg-white text-indigo-600" },
  { to: "/login", label: "Login", style: "bg-indigo-700 text-white" },
  { to: "/adminregister", label: "Admin Register", style: "bg-indigo-700 text-white" },
  { to: "/adminlogin", label: "Admin Login", style: "bg-indigo-700 text-white" },
];

const userLinks = [
  { to: "/savepersonalinfo", label: "Add Personal Info", style: "bg-green-600" },
  { to: "/getpersonalinfo", label: "User Personal Info", style: "bg-green-600" },
  { to: "/getresumes", label: "Get Resume", style: "bg-green-600" },
  { to: "/usergetprofile", label: "User Profile", style: "bg-yellow-500" },
];

const adminLinks = [
  { to: "/admingetprofile", label: "Admin Profile", style: "bg-yellow-500" },
  { to: "/companycreate", label: "Create Company", style: "bg-blue-600" },
];

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
      
      <div className="absolute top-6 right-8 flex flex-wrap gap-3">
        {!isLoggedIn ? (
          guestLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`${link.style} font-semibold px-5 py-2 rounded-xl shadow-lg hover:opacity-90 transition duration-200`}>
              {link.label}
            </Link>
          ))
        ) : (
          <>
            {role === "admin" &&
              adminLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className={`${link.style} font-semibold px-5 py-2 rounded-xl shadow-lg hover:opacity-90 transition duration-200`}>
                  {link.label}
                </Link>
              ))
            }

            {role === "user" &&
              userLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className={`${link.style} font-semibold px-5 py-2 rounded-xl shadow-lg hover:opacity-90 transition duration-200`}>
                  {link.label}
                </Link>
              ))
            }

            <button onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 font-semibold px-5 py-2 rounded-xl shadow-lg transition duration-200">
              Logout
            </button>
          </>
        )}
      </div>

      <div className="text-center px-4 mt-20">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Our Dream Job 🚀
        </h1>

        <p className="text-lg mb-6 text-white/90">
          Find your dream job and take the next step in your career!
        </p>

        {!isLoggedIn && (
          <p className="text-sm text-white/70">
            Please login or register to continue.
          </p>
        )}
      </div>

      <p className="absolute bottom-4 text-sm text-white/70">
        &copy; 2024 Dream Job. All rights reserved.
      </p>
    </div>
  );
};

export default Home;
