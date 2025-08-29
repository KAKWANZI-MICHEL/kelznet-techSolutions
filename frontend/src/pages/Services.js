import React, { useEffect, useRef } from "react";
import "../styles/Services.css";

const OurServices = () => {
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
  const services = [
    {
      id: 1,
      title: "Computer Repair",
      icon: "fas fa-laptop",
      description:
        " We diagnose, troubleshoot, and fix hardware or software issues, restoring optimal performance, preventing future problems, and ensuring the device operates efficiently and reliably.",
      link: "#",
    },
    {
      id: 2,
      title: "Network setup",
      icon: "fas fa-network-wired",
      description:
        "We Design, install, and configure wired or wireless connections, enabling secure, reliable communication and data sharing between devices, systems, and the internet.",
      link: "#",
    },
    {
      id: 3,
      title: "Software Insatllation",
      icon: "fas fa-download",
      description:"Professional process of setting up, softwares on a client’s computer or network, ensuring it runs correctly, and is ready for immediate use often including updates for smooth operation."
        ,
      link: "#",
    },
    {
      id: 4,
      title: "ICT Training",
      icon: "fas fa-chalkboard-teacher",
      description:
        "We provide individuals or teams with practical skills and knowledge in information and communication technology, enhancing efficiency, productivity, and confidence in using digital tools effectively.",
      link: "#",
    },
  ];

  return (
    <div className="services-page">
      {/* Modern Hero Section with Particles */}
      <section className="services-hero">
        <div className="services-hero-content">
          <div className="hero-text">
            <h4 className="fade-in-up">Professional IT Solutions</h4>
            <h1 className="fade-in-up">Our Expert Services</h1>
            <p className="intro-text fade-in-up">
              We provide high-quality, reliable technology solutions tailored to your needs. With years of 
              expertise and a commitment to excellence, we deliver innovation one project at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section className="modern-services-section">
        <div className="services-container">
          <div className="services-header fade-in-up">
            <h4>What We Provide</h4>
            <h2>Our Professional Services</h2>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`modern-service-card scale-in`}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="service-icon-wrapper">
                  <i className={service.icon}></i>
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <a href={service.link} className="modern-service-link">
                  Book Now <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="modern-cta-section">
        <div className="cta-container">
          <div className="cta-content fade-in-up">
            <h2>Ready to Transform Your Technology?</h2>
            <p>
              Contact us today for a free consultation and estimate. We're here to help you with all your IT needs.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="modern-btn-primary">Get Started</a>
              <a href="/bookingForm" className="modern-btn-secondary">Book Consultation</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;