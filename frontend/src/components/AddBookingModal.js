import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddBookingModal.css';
import { FaTimes } from 'react-icons/fa';

const AddBookingModal = ({ closeModal, refreshBookings }) => {
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_contact: '',
    service_id: '',
    preferred_date: ''
  });
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch services for the dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '/kelznet-backend/v1' : 'http://127.0.0.1:5000/v1';
        const response = await axios.get(`${API_BASE}/service_bp/services`);
        if (response.data && response.data.services) {
          setServices(response.data.services);
        }
      } catch (err) {
        setError('Failed to load services.');
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.guest_name || !formData.guest_contact || !formData.service_id || !formData.preferred_date) {
      setError('All fields are required.');
      return;
    }

    try {
      const API_BASE = process.env.NODE_ENV === 'production' ? '/kelznet-backend/v1' : 'http://127.0.0.1:5000/v1';
      const response = await axios.post(`${API_BASE.replace('/v1','')}/v1/bookings`, formData);
      setSuccess(response.data.message || 'Booking created successfully!');
      
      // Refresh the bookings list on the dashboard
      refreshBookings();

      // Close modal after a short delay
      setTimeout(() => {
        closeModal();
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <h2>Add New Booking</h2>
        <form onSubmit={handleSubmit} className="add-booking-form">
          <div className="form-group">
            <label htmlFor="guest_name">Client Name</label>
            <input
              type="text"
              id="guest_name"
              name="guest_name"
              value={formData.guest_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="guest_contact">Client Contact</label>
            <input
              type="text"
              id="guest_contact"
              name="guest_contact"
              value={formData.guest_contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="service_id">Service</label>
            <select
              id="service_id"
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="preferred_date">Preferred Date</label>
            <input
              type="date"
              id="preferred_date"
              name="preferred_date"
              value={formData.preferred_date}
              onChange={handleChange}
              required
            />
          </div>
          
          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <button type="submit" className="submit-btn">Create Booking</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookingModal;
