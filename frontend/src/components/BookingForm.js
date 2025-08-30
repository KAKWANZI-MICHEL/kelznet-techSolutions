// src/components/BookingForm.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/BookingForm.css';
import { FaCalendarAlt, FaCheckCircle, FaLaptop, FaNetworkWired, FaDownload, FaChalkboardTeacher, FaTools } from 'react-icons/fa';

const BookingForm = () => {
  const observerRef = useRef();
  
  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
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
      const API_BASE = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://127.0.0.1:5000/v1';
      const response = await axios.post(`${API_BASE.replace('/v1','')}/v1/bookings`, formData);
      if (response.data.success) {
        setStatus(`Booking submitted successfully! Your verification code is: ${response.data.verification_code}`);
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        setStatus(response.data.message || 'Something went wrong. Try again later.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setStatus(err.response.data.message);
      } else {
        setStatus('Something went wrong. Try again later.');
      }
    }
  };

  const serviceOptions = [
    { value: 'Computer Repair', label: 'Computer Repair', icon: <FaLaptop /> },
    { value: 'Software Installation', label: 'Software Installation', icon: <FaDownload /> },
    { value: 'Lab set-up', label: 'Lab Set-up', icon: <FaTools /> },
    { value: 'Network set-up', label: 'Network Set-up', icon: <FaNetworkWired /> },
    { value: 'ICT Training', label: 'ICT Training', icon: <FaChalkboardTeacher /> }
  ];

  return (
    <div className="booking-page">
      {/* Modern Hero Section with Particles */}
      <section className="booking-hero">
        <div className="booking-hero-content">
          <div className="hero-text">
            <h4 className="fade-in-up">Schedule Your Service</h4>
            <h1 className="fade-in-up">Book Your IT Solution</h1>
            <p className="intro-text fade-in-up">
              Ready to get started? Book your preferred IT service with our expert team. 
              We'll help you schedule the perfect solution for your technology needs.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Booking Section */}
      <section className="modern-booking-section">
        <div className="booking-container">
          <div className="booking-header fade-in-up">
            <h4>Quick & Easy</h4>
            <h2>Schedule Your Service</h2>
          </div>

          <div className="booking-layout">
            {/* Modern Booking Form */}
            <div className="modern-booking-form fade-in-left">
              <form onSubmit={handleSubmit} className="glassmorphism-booking-form">
                <div className="form-header">
                  <FaCalendarAlt className="form-icon" />
                  <h3>Book Service</h3>
                </div>
                
                <div className="input-row">
                  <div className="input-group">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name" 
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="input-row">
                  <div className="input-group">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number (+256)" 
                      required 
                    />
                  </div>
                  <div className="input-group select-wrapper">
                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange} 
                      required
                      className="service-select"
                    >
                      <option value="">Select a Service</option>
                      {serviceOptions.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="input-group full-width">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your requirements or specific needs..." 
                    rows="4"
                  />
                </div>
                
                <button type="submit" className="modern-booking-btn">
                  <FaCheckCircle /> SUBMIT BOOKING
                </button>
                
                {status && (
                  <div className={`status-message ${status.includes('successfully') ? 'success' : status.includes('error') ? 'error' : 'info'}`}>
                    {status}
                  </div>
                )}
              </form>
            </div>

            {/* Modern Service Preview */}
            <div className="modern-service-preview fade-in-right">
              <div className="service-preview-card">
                <div className="preview-header">
                  <h3>Our Services</h3>
                  <p>Choose from our expert IT solutions</p>
                </div>

                <div className="service-preview-list">
                  {serviceOptions.map((service, index) => (
                    <div key={service.value} className="service-preview-item">
                      <div className="service-preview-icon">
                        {service.icon}
                      </div>
                      <div className="service-preview-content">
                        <h4>{service.label}</h4>
                        <p>Professional {service.label.toLowerCase()} services</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="booking-benefits">
                  <h4>Why Book with Us?</h4>
                  <ul>
                    <li>✓ Expert technicians</li>
                    <li>✓ Quick response time</li>
                    <li>✓ Competitive pricing</li>
                    <li>✓ Quality guarantee</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="modern-booking-cta">
        <div className="cta-container">
          <div className="cta-content fade-in-up">
            <h2>Need Help Choosing?</h2>
            <p>
              Not sure which service you need? Contact us directly and our team will help you 
              find the perfect IT solution for your specific requirements.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="modern-btn-primary">Contact Us</a>
              <a href="/services" className="modern-btn-secondary">View All Services</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingForm;
