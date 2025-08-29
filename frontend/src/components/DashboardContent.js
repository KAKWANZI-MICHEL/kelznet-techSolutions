import React, { useState, useEffect, useCallback } from 'react';
import '../styles/DashboardContent.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    users: 120,
    bookings: 45,
    services: 12,
    performance: 75
  });

  // UI state for responsive sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar" aria-label="Main navigation">
        <div className="sidebar-header">
          <span className="brand-icon" aria-hidden="true" />
          <span className="brand-name">Admin Panel</span>
          <button
            className="sidebar-toggle"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Users</li>
            <li>Bookings</li>
            <li>Services</li>
            <li>Performance</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn">Logout</button>
        </div>
      </aside>

      {/* Main content area with a responsive header and content */}
      <div className="content-area">
        <header className="dashboard-header">
          {/* <div className="brand">
            <span className="brand-icon" />
            <span className="brand-name">Admin Dashboard</span>
          </div> */}
          {/* <button className="logout-btn">Logout</button> */}
        </header>

        <nav className="dashboard-nav" aria-label="Top sections">
          {/* <ul>
            <li className="active">Dashboard</li>
            <li>Users</li>
            <li>Bookings</li>
            <li>Services</li>
            <li>Performance</li>
          </ul> */}
        </nav>

        <main className="dashboard-main">
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
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
