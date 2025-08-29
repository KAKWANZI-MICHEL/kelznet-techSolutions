
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Prepare data for backend (backend expects name, email, message)
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        message: `${formData.message}\n\nAddress: ${formData.address}\nPhone: ${formData.phone}`
      };

      const response = await axios.post('http://127.0.0.1:5000/api/v1/contact_bp/contact', dataToSend);
      
      if (response.status === 201) {
        setSubmitStatus('Thank you for your message! We will get back to you soon.');
        // Clear form
        setFormData({
          email: '',
          name: '',
          address: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h4>We would love to hear from you!</h4>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter a valid email address" 
              required 
            />
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name" 
              required 
            />
          </div>
          <div className="input-row">
            <input 
              type="text" 
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address" 
              required 
            />
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone (e.g. +256)" 
              required 
            />
          </div>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message" 
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
          </button>
          {submitStatus && (
            <p className={`status-message ${submitStatus.includes('error') ? 'error' : 'success'}`}>
              {submitStatus}
            </p>
          )}
        </form>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>

      <div className="contact-details">
        <div className="detail">
          <FaPhoneAlt className="icon" />
          <div>
            <strong>CALL US</strong><br />
          +256 771 026689
          </div>
        </div>

        <div className="detail">
          <FaMapMarkerAlt className="icon" />
          <div>
            <strong>LOCATION</strong><br />
            Busega,Kampala, Uganda
          </div>
        </div>

        <div className="detail">
          <FaClock className="icon" />
          <div>
            <strong>BUSINESS HOURS</strong><br />
            Mon – Fri ….. 10 am – 8 pm, Sat, Sun …… Closed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
