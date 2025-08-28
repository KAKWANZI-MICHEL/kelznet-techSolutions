

import '../styles/About.css';
import network_set from '../Image/network_set.png';
import training_ict from '../Image/training_ict.png';
import comp_repair from '../Image/comp_repair.png';



const AboutUs = () => {
  
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
    <div className="contained">
      <h1>About Us</h1>
      <p className='about'>We provide services including lab set-up, computer repair, network setup, software Installation which caters to tech needs with expertise in these areas.</p>
      {sections.map((section) => (
        <div key={section.id} className="section">
          <div className="image-container">
            <img src={section.imageUrl} alt={section.title} />
          </div>
          <div className="text-container">
            <h2 className="title1">{section.title}</h2>
            <p className="description">{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;