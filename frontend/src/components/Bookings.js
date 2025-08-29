import React, { useEffect, useState } from "react";
import { getRequests } from "../api"; // your axios API file
import "./Bookings.css";

const Bookings = ({ token }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getRequests(token);
        setBookings(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // ----- Actions -----
  const handleEdit = (id) => {
    alert(`Edit booking with ID: ${id}`);
    // Here you can open a modal or navigate to edit form
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((b) => b.id !== id));
      // TODO: Call backend delete API here
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  // Split bookings
  const pending = bookings.filter((b) => b.status === "pending");
  const approved = bookings.filter((b) => b.status === "approved");

  return (
    <div className="bookings-container">
      <h2>Bookings</h2>

      {/* Pending Bookings */}
      <h3>Pending</h3>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pending.length > 0 ? (
            pending.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.client_name}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td className="status-pending">{b.status}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(b.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No pending bookings</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Approved Bookings */}
      <h3>Approved</h3>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approved.length > 0 ? (
            approved.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.client_name}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td className="status-approved">{b.status}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(b.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No approved bookings</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
