import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/DashboardContent.css';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaTools, 
  FaChartLine, 
  FaDollarSign, 
  FaUser,
  FaCog,
  FaPlus,
  FaComments,
  FaChartBar
} from 'react-icons/fa';

const DashboardContent = ({ activePage }) => {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    messages: 0,
    services: 0,
    performance: 75
  });

  const [trends, setTrends] = useState({
    users: { percentage: 0, period: 'month', direction: 'neutral' },
    bookings: { percentage: 0, period: 'week', direction: 'neutral' },
    messages: { percentage: 0, period: 'week', direction: 'neutral' }
  });

  const [previousStats, setPreviousStats] = useState({
    users: 0,
    bookings: 0,
    messages: 0
  });

  // Calculate trends based on current vs previous stats
  const calculateTrends = useCallback((currentStats, previousStats) => {
    const newTrends = {};
    
    // Calculate users trend (monthly)
    if (previousStats.users > 0) {
      const userChange = ((currentStats.users - previousStats.users) / previousStats.users) * 100;
      newTrends.users = {
        percentage: Math.abs(Math.round(userChange)),
        period: 'month',
        direction: userChange > 0 ? 'positive' : userChange < 0 ? 'negative' : 'neutral'
      };
    }
    
    // Calculate bookings trend (weekly)
    if (previousStats.bookings > 0) {
      const bookingChange = ((currentStats.bookings - previousStats.bookings) / previousStats.bookings) * 100;
      newTrends.bookings = {
        percentage: Math.abs(Math.round(bookingChange)),
        period: 'week',
        direction: bookingChange > 0 ? 'positive' : bookingChange < 0 ? 'negative' : 'neutral'
      };
    }
    
    // Calculate messages trend (weekly)
    if (previousStats.messages > 0) {
      const messageChange = ((currentStats.messages - previousStats.messages) / previousStats.messages) * 100;
      newTrends.messages = {
        percentage: Math.abs(Math.round(messageChange)),
        period: 'week',
        direction: messageChange > 0 ? 'positive' : messageChange < 0 ? 'negative' : 'neutral'
      };
    }
    
    setTrends(newTrends);
  }, []);

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
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          bookings: bookingsData.length
        };
        
        // Calculate trends after updating stats
        calculateTrends(newStats, previousStats);
        
        return newStats;
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }, []);

  // Fetch users from backend API
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/user_bp/users');
      const usersData = response.data;
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          users: usersData.length
        };
        
        // Calculate trends after updating stats
        calculateTrends(newStats, previousStats);
        
        return newStats;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      // Keep existing users count if API fails (don't reset to 0)
      // This prevents dashboard from showing 0 during network issues
    }
  }, [calculateTrends, previousStats]);

  // Fetch services from backend API
  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/service_bp/services');
      const servicesData = response.data.services;
    setStats(prevStats => ({
      ...prevStats,
        services: servicesData.length
      }));
    } catch (error) {
      console.error('Error fetching services:', error);
      // Keep existing services count if API fails
    }
  }, []);

  // Fetch contact messages from backend API
  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/contact_bp/contact');
      const messagesData = response.data.messages.map(msg => ({
        id: msg.id,
        name: msg.name,
        email: msg.email,
        message: msg.message,
        createdAt: msg.created_at
      }));
      setMessages(messagesData);
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          messages: messagesData.length
        };
        
        // Calculate trends after updating stats
        calculateTrends(newStats, previousStats);
        
        return newStats;
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [calculateTrends, previousStats]);

  // Fetch data on component mount and set up periodic refresh
  useEffect(() => {
    // Store current stats as previous stats before fetching new data
    setPreviousStats({
      users: stats.users,
      bookings: stats.bookings,
      messages: stats.messages
    });
    
    fetchUsers();
    fetchServices();
    fetchBookings();
    fetchMessages();
    
    // Refresh data every 30 seconds (reduced from 10 to prevent server overload)
    const interval = setInterval(() => {
      // Store current stats as previous stats before fetching new data
      setPreviousStats({
        users: stats.users,
        bookings: stats.bookings,
        messages: stats.messages
      });
      
      fetchUsers();
      fetchServices();
      fetchBookings();
      fetchMessages();
      }, 30000);
      
      return () => clearInterval(interval);
  }, [fetchUsers, fetchServices, fetchBookings, fetchMessages, stats.users, stats.bookings, stats.messages]);

  // Enhanced Dashboard Overview Component
  const DashboardOverview = () => (
    <div className="dashboard-overview">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome to KelzNet Admin Dashboard</h2>
        <p>Monitor your business performance and manage operations from here.</p>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="enhanced-stats-grid">
        <div className="enhanced-stat-card users">
          <div className="stat-icon"><FaUsers /></div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <div className="stat-number">{stats.users}</div>
            <div className={`stat-trend ${trends.users?.direction || 'neutral'}`}>
              {trends.users?.percentage > 0 ? `+${trends.users.percentage}%` : '0%'} this {trends.users?.period || 'month'}
            </div>
          </div>
        </div>
        
        <div className="enhanced-stat-card bookings">
          <div className="stat-icon"><FaCalendarAlt /></div>
          <div className="stat-content">
            <h3>Active Bookings</h3>
            <div className="stat-number">{stats.bookings}</div>
            <div className={`stat-trend ${trends.bookings?.direction || 'neutral'}`}>
              {trends.bookings?.percentage > 0 ? `+${trends.bookings.percentage}%` : '0%'} this {trends.bookings?.period || 'week'}
            </div>
          </div>
        </div>
        
        <div className="enhanced-stat-card messages">
          <div className="stat-icon"><FaEnvelope /></div>
          <div className="stat-content">
            <h3>New Messages</h3>
            <div className="stat-number">{stats.messages}</div>
            <div className={`stat-trend ${trends.messages?.direction || 'neutral'}`}>
              {trends.messages?.percentage > 0 ? `+${trends.messages.percentage}%` : '0%'} this {trends.messages?.period || 'week'}
            </div>
          </div>
        </div>
        
        <div className="enhanced-stat-card services">
          <div className="stat-icon"><FaTools /></div>
          <div className="stat-content">
            <h3>Services</h3>
            <div className="stat-number">{stats.services}</div>
            <div className="stat-trend positive">5 active</div>
          </div>
        </div>
        
        <div className="enhanced-stat-card performance">
          <div className="stat-icon"><FaChartLine /></div>
          <div className="stat-content">
            <h3>Performance</h3>
            <div className="stat-number">{stats.performance}%</div>
            <div className="stat-trend positive">+5% improvement</div>
          </div>
        </div>
        
        <div className="enhanced-stat-card revenue">
          <div className="stat-icon"><FaDollarSign /></div>
          <div className="stat-content">
            <h3>Revenue</h3>
            <div className="stat-number">$2.4K</div>
            <div className="stat-trend positive">+15% this month</div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="overview-card recent-activity">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon new"><FaCalendarAlt /></div>
              <div className="activity-content">
                <p><strong>New booking</strong> for Computer Repair</p>
                <span className="activity-time">5 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon message"><FaEnvelope /></div>
              <div className="activity-content">
                <p><strong>Message received</strong> from John Doe</p>
                <span className="activity-time">15 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon user"><FaUser /></div>
              <div className="activity-content">
                <p><strong>New user registered</strong></p>
                <span className="activity-time">1 hour ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon service"><FaCog /></div>
              <div className="activity-content">
                <p><strong>Service completed</strong> - Network Setup</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
          </div>
            </div>

        {/* Quick Actions */}
        <div className="overview-card quick-actions">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <button className="action-btn new-booking">
              <span className="action-icon"><FaPlus /></span>
              <span>Add Booking</span>
            </button>
            <button className="action-btn view-messages">
              <span className="action-icon"><FaComments /></span>
              <span>Messages</span>
            </button>
            <button className="action-btn manage-users">
              <span className="action-icon"><FaUsers /></span>
              <span>Users</span>
            </button>
            <button className="action-btn service-analytics">
              <span className="action-icon"><FaChartBar /></span>
              <span>Analytics</span>
            </button>
            </div>
          </div>

        {/* Recent Bookings */}
        <div className="overview-card recent-bookings">
          <div className="card-header">
            <h3>Recent Bookings</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="bookings-table">
              {bookings.length > 0 ? (
              bookings.slice(0, 4).map(booking => (
                <div key={booking.id} className="booking-row">
                  <div className="booking-service">{booking.service}</div>
                  <div className="booking-client">{booking.client}</div>
                  <div className="booking-time">{booking.time}</div>
                  <div className={`booking-status status-${booking.status}`}>
                    {booking.status}
                  </div>
                  </div>
                ))
              ) : (
              <div className="empty-state">
                <p>No recent bookings</p>
                <small>New bookings will appear here</small>
              </div>
            )}
          </div>
        </div>

        {/* Service Analytics */}
        <div className="overview-card service-analytics">
          <div className="card-header">
            <h3>Popular Services</h3>
          </div>
          <div className="service-chart">
            <div className="service-stat">
              <span className="service-name">Computer Repair</span>
              <div className="service-bar">
                <div className="service-progress" style={{width: '85%'}}></div>
              </div>
              <span className="service-percentage">85%</span>
            </div>
            <div className="service-stat">
              <span className="service-name">Network Setup</span>
              <div className="service-bar">
                <div className="service-progress" style={{width: '70%'}}></div>
              </div>
              <span className="service-percentage">70%</span>
            </div>
            <div className="service-stat">
              <span className="service-name">Software Installation</span>
              <div className="service-bar">
                <div className="service-progress" style={{width: '60%'}}></div>
              </div>
              <span className="service-percentage">60%</span>
            </div>
            <div className="service-stat">
              <span className="service-name">ICT Training</span>
              <div className="service-bar">
                <div className="service-progress" style={{width: '45%'}}></div>
              </div>
              <span className="service-percentage">45%</span>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="overview-card system-health">
          <div className="card-header">
            <h3>System Health</h3>
          </div>
          <div className="health-metrics">
            <div className="health-item">
              <span className="health-label">Server Status</span>
              <span className="health-status online">Online</span>
            </div>
            <div className="health-item">
              <span className="health-label">Database</span>
              <span className="health-status online">Connected</span>
            </div>
            <div className="health-item">
              <span className="health-label">API Response</span>
              <span className="health-status good">245ms</span>
            </div>
            <div className="health-item">
              <span className="health-label">Storage</span>
              <span className="health-status warning">78% Used</span>
            </div>
          </div>
        </div>

        {/* Recent Messages Preview */}
        <div className="overview-card recent-messages">
          <div className="card-header">
            <h3>Latest Messages</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="messages-preview">
            {messages.length > 0 ? (
              messages.slice(0, 3).map(message => (
                <div key={message.id} className="message-item">
                  <div className="message-avatar">{message.name.charAt(0)}</div>
                  <div className="message-content">
                    <strong>{message.name}</strong>
                    <p>{message.message.substring(0, 60)}...</p>
                    <small>{new Date(message.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No recent messages</p>
                <small>New messages will appear here</small>
              </div>
            )}
          </div>
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

  const MessagesPage = () => {
    const handleDeleteMessage = async (messageId) => {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/v1/contact_bp/contact/${messageId}`);
        fetchMessages(); // Refresh messages after deletion
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Failed to delete message');
      }
    };

    return (
      <div className="page-content">
        <h2>Contact Messages</h2>
        <div className="messages-grid">
          {messages.length > 0 ? (
            messages.map(msg => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <h4>{msg.name}</h4>
                  <span className="message-date">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <p className="message-email"><strong>Email:</strong> {msg.email}</p>
                <div className="message-content">
                  <strong>Message:</strong>
                  <p>{msg.message}</p>
                </div>
                <div className="message-actions">
                  <a href={`mailto:${msg.email}`} className="btn-reply">Reply via Email</a>
                  <button className="btn-delete" onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No messages found. Contact form submissions will appear here.</p>
          )}
        </div>
      </div>
    );
  };

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
          {activePage === 'overview' && <DashboardOverview />}
          {activePage === 'bookings' && <BookingsPage />}
          {activePage === 'messages' && <MessagesPage />}
          {activePage === 'users' && <UsersPage />}
          {activePage === 'services' && <ServicesPage />}
        </main>
      </div>
    </div>
  );
};

export default DashboardContent;
