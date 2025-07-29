import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";
import "../styles/AuthForm.css";         // For Login/Register
import "../styles/Navbar.css";           // For Navbar
import "../styles/Form.css";             // For FeedbackForm/AdminDashboard
import "../styles/History.css";          // For FeedbackHistory

const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isAdmin = username === "admin";

  return (
    <nav className="navbar">
      <span className="logo">Smart Feedback</span>
      <ul>
        <li><Link to="/home">Home</Link></li>
        {!isAdmin &&<li><Link to="/feedback">Submit Feedback</Link></li>}
        {!isAdmin &&<li><Link to="/history">My Feedback</Link></li>}
        {isAdmin && <li><Link to="/dashboard">Dashboard</Link></li>}
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
