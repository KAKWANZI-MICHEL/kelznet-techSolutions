import  { useState } from 'react';
import '../styles/Testimonial.css';
import Testimonial from '../styles/Testimonial.css';
const testimonials = [
  {
    text: "I landed my dream job thanks to the practical skills I learned through their courses.",
    name: "Emily Kisitu",
    title: "Software Engineer",
    image: require('../Image/white man.png'), // Replace with your image
  },
  {
    text: "The courses transformed the way I approach projects. I'm now confident at work!",
    name: "Sarah Nambuya",
    title: "Frontend Developer",
    image: require('../Image/white man.png'),
  },
  {
    text: "This training gave me all I needed to excel in tech.",
    name: "John Doe",
    title: "IT Specialist",
    image: require('../Image/white man.png'),
  }
];

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-title">What Our Clients Say</h2>
      <div className="testimonial-container">
        <div
          className="testimonial-slider"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index} style={{ backgroundImage: `url(${testimonial.image})` }}>
              <div className="testimonial-content">
                <p className="quote">“{testimonial.text}”</p>
                <h3 className="name">{testimonial.name}</h3>
                <p className="title">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
