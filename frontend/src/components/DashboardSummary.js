import React, { useEffect, useState } from "react";
import { getRequests, getMessages, getUsers, getServices } from "";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardSummary = () => {
  const [totals, setTotals] = useState({
    bookings: 0,
    messages: 0,
    users: 0,
    services: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const bookingsData = await getRequests(token);
        const messagesData = await getMessages(token);
        const usersData = await getUsers(token);
        const servicesData = await getServices();

        setTotals({
          bookings: bookingsData.length,
          messages: messagesData.length,
          users: usersData.length,
          services: servicesData.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchTotals();
  }, [token]);

  const chartData = [
    { name: "Bookings", total: totals.bookings },
    { name: "Messages", total: totals.messages },
    { name: "Users", total: totals.users },
    { name: "Services", total: totals.services },
  ];

  return (
    <div className="dashboard-summary">
      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div className="card">Bookings: {totals.bookings}</div>
        <div className="card">Messages: {totals.messages}</div>
        <div className="card">Users: {totals.users}</div>
        <div className="card">Services: {totals.services}</div>
      </div>

      {/* Bar Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3a3f44" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardSummary;
