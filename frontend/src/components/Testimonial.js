
import React, { useState, useEffect } from 'react';
import '../styles/Testimonial.css';

const testimonials = [
  {
    text: "I landed my dream job thanks to the practical skills I learned through their courses.",
    name: "Emily Kisitu",
    title: "Software Engineer",
    image: require('../Image/emily_ki.png'),
  },
  {
    text: "The courses transformed the way I approach projects. I'm now confident at work!",
    name: "Sarah Nambuya",
    title: "Frontend Developer",
    image: require('../Image/sarah_na.png'),
  },
  {
    text: "This training equipped me with practical skills, confidence, and a clear path toward a successful career in the industry",
    name: "John Khawa",
    title: "IT Specialist",
    image: require('../Image/khawa_jo.png'),
  }
  
];

function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Add scroll animation functionality
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="modern-testimonial-page">
      {/* Hero Section */}
      <section className="testimonial-hero">
        <div className="testimonial-hero-content">
          <div className="fade-in-up">
            <span className="hero-tag">Client Stories</span>
            <h1 className="hero-title">
              What Our <span className="highlight">Clients</span> Say
            </h1>
            <p className="hero-description">
              Discover how KelzNet Tech Solutions has transformed businesses and empowered 
              professionals with cutting-edge technology services and training.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Testimonials Section */}
      <section className="modern-testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header fade-in-up">
            <span className="section-tag">Success Stories</span>
            <h2 className="section-title">
              Trusted by <span className="gradient-text">Professionals</span> Worldwide
            </h2>
            <div className="title-underline"></div>
          </div>

          <div className="modern-testimonial-slider fade-in-up">
            <div className="testimonial-wrapper">
              <div
                className="testimonial-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div className="modern-testimonial-card" key={index}>
                    <div className="testimonial-background">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="testimonial-overlay">
                      <div className="testimonial-content">
                        <div className="quote-icon">"</div>
                        <p className="testimonial-quote">{testimonial.text}</p>
                        <div className="testimonial-author">
                          <div className="author-avatar">
                            <img src={testimonial.image} alt={testimonial.name} />
                          </div>
                          <div className="author-info">
                            <h4 className="author-name">{testimonial.name}</h4>
                            <p className="author-title">{testimonial.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="testimonial-navigation">
              <div className="nav-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Grid (Alternative View) */}
          <div className="testimonials-grid fade-in-up">
            {testimonials.map((testimonial, index) => (
              <div 
                className="testimonial-grid-card scale-in" 
                key={index}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="grid-card-content">
                  <div className="quote-mark">"</div>
                  <p className="grid-testimonial-text">{testimonial.text}</p>
                  <div className="grid-author">
                    <div className="grid-author-avatar">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="grid-author-details">
                      <h5>{testimonial.name}</h5>
                      <span>{testimonial.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="modern-testimonial-cta">
        <div className="cta-container">
          <div className="cta-content fade-in-up">
            <h2>Ready to Join Our Success Stories?</h2>
            <p>Experience the KelzNet difference and transform your business today.</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Get Started</button>
              <button className="cta-btn secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial; // ✅ Make sure this is the default export
