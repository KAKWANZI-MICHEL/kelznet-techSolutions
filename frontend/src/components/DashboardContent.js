import React, { useState, useEffect, useCallback } from 'react';
import '../styles/DashboardContent.css';

const DashboardContent = ({ activePage }) => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    users: 120,
    bookings: 45,
    services: 12,
    performance: 75
  });

  // Removed unused sidebar state since we use separate Sidebar component

  // Simulate receiving a new booking
  const addNewBooking = useCallback((newBooking) => {
    setBookings(prevBookings => [...prevBookings, newBooking]);
    setStats(prevStats => ({
      ...prevStats,
      bookings: prevStats.bookings + 1
    }));
  }, []);

  // Simulate WebSocket or API connection for real-time updates
  useEffect(() => {
    // This would be replaced with actual WebSocket connection
    const simulateIncomingBooking = () => {
      const sampleBookings = [
        { id: Date.now(), service: 'Haircut', client: 'John Doe', time: '3:45 PM' },
        { id: Date.now() + 1, service: 'Massage', client: 'Jane Smith', time: '4:30 PM' }
      ];
      
      // Simulate a new booking every 30 seconds for demo
      const interval = setInterval(() => {
        const randomBooking = sampleBookings[Math.floor(Math.random() * sampleBookings.length)];
        addNewBooking({...randomBooking, id: Date.now()});
      }, 30000);
      
      return () => clearInterval(interval);
    };
    
    simulateIncomingBooking();
  }, [addNewBooking]);

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
            bookings.map(booking => (
              <div key={booking.id} className="booking-item">
                <span className="service">{booking.service}</span>
                <span className="client">{booking.client}</span>
                <span className="time">{booking.time}</span>
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
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <h4>{booking.service}</h4>
            <p><strong>Client:</strong> {booking.client}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <div className="booking-actions">
              <button className="btn-approve">Approve</button>
              <button className="btn-cancel">Cancel</button>
            </div>
          </div>
        ))}
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
