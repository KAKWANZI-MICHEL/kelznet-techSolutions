// src/components/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookingForm.css'; // You can style as needed

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings', formData);
      setStatus('Booking submitted successfully!');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (err) {
      setStatus('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Service</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <select name="service" value={formData.service} onChange={handleChange} required>
          {/* <option value="">Select a Service</option> */}
          <option value="Computer Repair">Computer Repair</option>
          <option value="Software Installation">Software Installation</option>
          <option value="Lab set-up">Lab set-up</option>
          <option value="Network set-up">Network set-up</option>
          <option value="ICT Training">ICT Training</option>
        </select>
        <textarea name="message" placeholder="Additional Notes" value={formData.message} onChange={handleChange} rows="4" />
        <button type="submit">Submit Booking</button>
      </form>
      <p className="status-message">{status}</p>
    </div>
  );
};

export default BookingForm;
