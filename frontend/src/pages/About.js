
import React, { useEffect, useRef } from 'react';
import '../styles/About.css';
import network_set from '../Image/network_set.png';
import training_ict from '../Image/training_ict.png';
import comp_repair from '../Image/comp_repair.png';

const AboutUs = () => {
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
  
  const sections = [
    {
      id: 1,
      title: "Mission",
      description:
        "To provide innovative, affordable, and reliable IT services tailored to individuals and businesses. We aim to simplify technology, ensuring every client receives practical, efficient solutions to grow in today’s digital world.",
      imageUrl: network_set,
    },
    {
      id: 2,
      title: "Values",
      description:
        "We uphold integrity, innovation, and customer satisfaction. Our team is driven by excellence, transparency, and a passion for solving problems with reliable, future-ready technology that builds strong relationships and delivers lasting impact.",
      imageUrl: training_ict,
    },
    {
      id: 3,
      title: "Vision",
      description:
        "To be a trusted leader in delivering smart, scalable tech solutions in Uganda, empowering clients with cutting-edge tools, seamless support, and unmatched service excellence that drives digital transformation and long-term growth.",
      imageUrl: comp_repair,
    },
  ];

  return (
    <div className="about-page">
      {/* Modern Hero Section with Particles */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="hero-text">
            <h4 className="fade-in-up">Learn More About Us</h4>
            <h1 className="fade-in-up">About KelzNet Tech Solutions</h1>
            <p className="intro-text fade-in-up">
              We provide comprehensive IT services including lab set-up, computer repair, network setup, 
              and software installation. Our expertise caters to all your tech needs with professional 
              excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Modern About Sections */}
      <section className="modern-about-sections">
        <div className="about-container">
          <div className="about-header fade-in-up">
            <h4>Who We Are</h4>
            <h2>Our Story & Values</h2>
          </div>

          <div className="about-grid">
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                className={`modern-about-card ${index % 2 === 1 ? 'reverse' : ''} fade-in-up`}
                style={{ '--delay': `${index * 0.2}s` }}
              >
                <div className="about-image-wrapper">
                  <img src={section.imageUrl} alt={section.title} />
                </div>
                <div className="about-text-content">
                  <h3 className="about-title">{section.title}</h3>
                  <p className="about-description">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="modern-about-cta">
        <div className="cta-container">
          <div className="cta-content fade-in-up">
            <h2>Ready to Work with Us?</h2>
            <p>
              Let's discuss how our expertise can help transform your technology infrastructure 
              and drive your business forward with innovative solutions.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="modern-btn-primary">Get in Touch</a>
              <a href="/services" className="modern-btn-secondary">View Our Services</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;