import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("bookings");

  // Redirect to login if no token
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  return (
    <div className="dashboard">
      <Sidebar setActivePage={setActivePage} />
      <DashboardContent activePage={activePage} />
    </div>
  );
};

export default AdminDashboard;
