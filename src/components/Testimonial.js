
import { useState } from 'react';
import '../styles/Testimonial.css'; // ✅ Only import CSS like this

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

export default Testimonial; // ✅ Make sure this is the default export
