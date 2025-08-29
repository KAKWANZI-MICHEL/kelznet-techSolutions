import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/DashboardContent.css';

const DashboardContent = ({ activePage }) => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    services: 0,
    performance: 75
  });

  // Removed unused sidebar state since we use separate Sidebar component

  // Fetch real bookings from backend API
  const fetchBookings = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/bookings');
      const bookingsData = response.data.map(booking => ({
        id: booking.booking_id,
        service: booking.service_name,
        client: booking.guest_name,
        contact: booking.guest_contact,
        time: new Date(booking.created_at).toLocaleString(),
        status: booking.status,
        verified: booking.is_verified,
        verificationCode: booking.verification_code,
        preferredDate: booking.preferred_date
      }));
      setBookings(bookingsData);
      setStats(prevStats => ({
        ...prevStats,
        bookings: bookingsData.length
      }));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }, []);

  // Fetch bookings on component mount and set up periodic refresh
  useEffect(() => {
    fetchBookings();
    
    // Refresh bookings every 10 seconds
    const interval = setInterval(fetchBookings, 10000);
    
    return () => clearInterval(interval);
  }, [fetchBookings]);

  // Individual page components
  const DashboardOverview = () => (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>USERS</h3>
          <div className="stat-number">{stats.users}</div>
        </div>
        <div className="stat-card">
          <h3>BOOKINGS</h3>
          <div className="stat-number">{stats.bookings}</div>
        </div>
        <div className="stat-card">
          <h3>SERVICES</h3>
          <div className="stat-number">{stats.services}</div>
        </div>
        <div className="stat-card">
          <h3>PERFORMANCE</h3>
          <div className="stat-number">{stats.performance}%</div>
        </div>
      </div>
      <div className="bookings-section">
        <h2>Recent Bookings</h2>
        <div className="bookings-list">
          {bookings.length > 0 ? (
            bookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="booking-item">
                <span className="service">{booking.service}</span>
                <span className="client">{booking.client}</span>
                <span className="time">{booking.time}</span>
                <span className={`status status-${booking.status}`}>{booking.status}</span>
              </div>
            ))
          ) : (
            <p>No bookings yet. New bookings will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );

  const BookingsPage = () => (
    <div className="page-content">
      <h2>Manage Bookings</h2>
      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <h4>{booking.service}</h4>
              <p><strong>Client:</strong> {booking.client}</p>
              <p><strong>Contact:</strong> {booking.contact}</p>
              <p><strong>Booking Time:</strong> {booking.time}</p>
              <p><strong>Preferred Date:</strong> {booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Status:</strong> <span className={`status-${booking.status}`}>{booking.status}</span></p>
              <p><strong>Verified:</strong> {booking.verified ? 'Yes' : 'No'}</p>
              {!booking.verified && (
                <p><strong>Verification Code:</strong> {booking.verificationCode}</p>
              )}
              <div className="booking-actions">
                <button className="btn-approve">Approve</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found. New bookings will appear here.</p>
        )}
      </div>
    </div>
  );

  const MessagesPage = () => (
    <div className="page-content">
      <h2>Contact Messages</h2>
      <p>Customer messages and inquiries will be displayed here.</p>
    </div>
  );

  const UsersPage = () => (
    <div className="page-content">
      <h2>User Management</h2>
      <p>Registered users and their information will be shown here.</p>
    </div>
  );

  const ServicesPage = () => (
    <div className="page-content">
      <h2>Service Management</h2>
      <p>Manage available services, pricing, and descriptions.</p>
    </div>
  );

  // Page switching is now handled directly in JSX below

  return (
    <div className="dashboard-content">{/* Remove embedded sidebar - use separate Sidebar component */}

      {/* Main content area with dynamic page switching */}
      <div className="content-area">
        <header className="dashboard-header">
          <h1>Admin Dashboard - {activePage?.charAt(0).toUpperCase() + activePage?.slice(1) || 'Overview'}</h1>
        </header>

        <main className="dashboard-main">
          {/* Dynamic content based on active page */}
          {activePage === 'bookings' && <BookingsPage />}
          {activePage === 'messages' && <MessagesPage />}
          {activePage === 'users' && <UsersPage />}
          {activePage === 'services' && <ServicesPage />}
          {(!activePage || activePage === 'dashboard') && <DashboardOverview />}
        </main>
      </div>
    </div>
  );
};

export default DashboardContent;
