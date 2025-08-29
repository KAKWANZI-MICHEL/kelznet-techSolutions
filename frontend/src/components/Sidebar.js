
// Sidebar.js
import React from "react";
import "../styles/Sidebar.css";
import {
  FaBook,
  FaEnvelope,
  FaUsers,
  FaTools,
  FaSignOutAlt,
  FaLaptopCode,
} from "react-icons/fa";

const Sidebar = ({ setActivePage }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaLaptopCode className="sidebar-logo" />
        <h2>KelzNet Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <button onClick={() => setActivePage("bookings")}>
          <FaBook className="icon" />
          Bookings
        </button>
        <button onClick={() => setActivePage("messages")}>
          <FaEnvelope className="icon" />
          Messages
        </button>
        <button onClick={() => setActivePage("users")}>
          <FaUsers className="icon" />
          Users
        </button>
        <button onClick={() => setActivePage("services")}>
          <FaTools className="icon" />
          Services
        </button>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
