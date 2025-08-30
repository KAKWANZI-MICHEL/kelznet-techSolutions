
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Contact.css';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
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

      const API_BASE = process.env.NODE_ENV === 'production' ? '/kelznet-backend/v1' : 'http://127.0.0.1:5000/v1';
      const response = await axios.post(`${API_BASE}/contact_bp/contact`, dataToSend);
      
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
    <div className="contact-page">
      {/* Modern Hero Section with Particles */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="hero-text">
            <h4 className="fade-in-up">Get In Touch</h4>
            <h1 className="fade-in-up">Contact KelzNet Tech Solutions</h1>
            <p className="intro-text fade-in-up">
              We would love to hear from you! Reach out to us for any inquiries, support, 
              or to discuss how we can help transform your technology infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section className="modern-contact-section">
        <div className="contact-container">
          <div className="contact-header fade-in-up">
            <h4>Let's Connect</h4>
            <h2>Send Us a Message</h2>
          </div>

          <div className="contact-layout">
            {/* Modern Contact Form */}
            <div className="modern-contact-form fade-in-left">
              <form onSubmit={handleSubmit} className="glassmorphism-form">
                <div className="form-header">
                  <FaEnvelope className="form-icon" />
                  <h3>Send Message</h3>
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
                  <div className="input-group">
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your Location" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="input-group full-width">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..." 
                    required
                  ></textarea>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="modern-submit-btn">
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
                
                {submitStatus && (
                  <div className={`status-message ${submitStatus.includes('error') ? 'error' : 'success'}`}>
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>

            {/* Modern Contact Info */}
            <div className="modern-contact-info fade-in-right">
              <div className="contact-info-card">
                <div className="info-header">
                  <h3>Contact Information</h3>
                  <p>Get in touch with our team</p>
                </div>

                <div className="contact-details">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaPhoneAlt />
                    </div>
                    <div className="detail-content">
                      <h4>Call Us</h4>
                      <p>+256 771 026689</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaEnvelope />
                    </div>
                    <div className="detail-content">
                      <h4>Email Us</h4>
                      <p>zzlwa4728@gmail.com</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="detail-content">
                      <h4>Visit Us</h4>
                      <p>Busega, Kampala, Uganda</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaClock />
                    </div>
                    <div className="detail-content">
                      <h4>Business Hours</h4>
                      <p>Mon – Fri: 10 AM – 8 PM<br />Sat, Sun: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="social-section">
                  <h4>Follow Us</h4>
                  <div className="social-icons">
                    <a href="#" className="social-icon"><FaFacebookF /></a>
                    <a href="#" className="social-icon"><FaTwitter /></a>
                    <a href="#" className="social-icon"><FaInstagram /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="modern-contact-cta">
        <div className="cta-container">
          <div className="cta-content fade-in-up">
            <h2>Ready to Get Started?</h2>
            <p>
              Let's discuss your project and explore how our IT solutions can help your business thrive 
              in today's digital landscape.
            </p>
            <div className="cta-buttons">
              <a href="/services" className="modern-btn-primary">View Our Services</a>
              <a href="/bookingForm" className="modern-btn-secondary">Book Consultation</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
