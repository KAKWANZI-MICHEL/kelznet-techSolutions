
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

const Sidebar = ({ setActivePage, activePage = 'bookings' }) => {
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
        <button 
          className={activePage === 'bookings' ? 'active' : ''}
          onClick={() => setActivePage("bookings")}
        >
          <FaBook className="icon" />
          Bookings
        </button>
        <button 
          className={activePage === 'messages' ? 'active' : ''}
          onClick={() => setActivePage("messages")}
        >
          <FaEnvelope className="icon" />
          Messages
        </button>
        <button 
          className={activePage === 'users' ? 'active' : ''}
          onClick={() => setActivePage("users")}
        >
          <FaUsers className="icon" />
          Users
        </button>
        <button 
          className={activePage === 'services' ? 'active' : ''}
          onClick={() => setActivePage("services")}
        >
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
