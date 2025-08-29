import React from "react";
import "../styles/Services.css";

const OurServices = () => {
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
    <div className="container">
      {/* Hero Intro Section */}
      <section className="services-intro">
        <h1>Our Expert Services</h1>
        <p className="intro-text">
          We provide high-quality, reliable technology solutions tailored to your needs. With years of 
          expertise and a commitment to excellence, we deliver innovation one project at a time
        </p>
      </section>

      {/* Services Header */}
      <div className="services-header">OUR SERVICES</div>

      {/* Services Grid */}
      <div className="service-section">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">
              <i className={service.icon}></i>
            </div>
            
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <a href={service.link} className="service-link">
              Book Now →
            </a>
          </div>
        ))}
      </div>

      {/* Call to Action (CTA) Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Space?</h2>
        <p>
          Contact us today for a free consultation and estimate. We’re here to help you with all your home improvement needs.
        </p>
        <div className="cta-buttons">
          <a href="/contact" className="btn-primary1">Contact Us</a>
          
        </div>
      </section>
    </div>
  );
};

export default OurServices;