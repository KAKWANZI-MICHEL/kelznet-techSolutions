


import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { FaLaptop, FaDownload, FaNetworkWired, FaChalkboardTeacher } from 'react-icons/fa';

import soft_inst from '../Image/soft_inst.png';
import network_set from '../Image/network_set.png';
import training_ict from '../Image/training_ict.png';

function Home() {
  return (
    <div className="homepage">
      <header className="hero">
        <div className="hero-content">
          <div className="text">
            <h5>We Provide Outsourced</h5>
            <h1>IT Services & Solutions</h1>
            <p>At KelzNet Tech Solutions, we provide comprehensive IT services and smart technology solutions to help businesses and individuals thrive in a digital world.</p>
            <div className="buttons">
              <Link to="/services" className="btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="services">
        <div className="service-cards">
          <div className="card">
            <FaLaptop className="icon" />
            <span>Computer Repair</span>
          </div>
          <div className="card">
            <FaDownload className="icon" />
            <span>Software Installation</span>
          </div>
          <div className="card">
            <FaNetworkWired className="icon" />
            <span>Network Setup</span>
          </div>
          <div className="card">
            <FaChalkboardTeacher className="icon" />
            <span>ICT Training</span>
          </div>
        </div>
        <div className="services-text">
          <h4>Our Services</h4>
          <h2>Best IT Solution For Your Business</h2>
          <ul>
            <li>Custom IT solutions designed to align with your business goals.</li>
            <li>Proactive system monitoring and 24/7 technical support.</li>
            <li>Comprehensive data protection and network security services.</li>
            <li>Innovative infrastructure planning for long-term scalability.</li>
          </ul>
          {/* <Link to="/services" className="btn-primary">Get Started</Link> */}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h4>What We Offer</h4>
        <h2>Why You Should Choose Us</h2>
        <div className="choose-cards">
          <div className="choose-card">
            <img src={soft_inst} alt="1" />
            <h5>Perfect solutions that your business demands</h5>
          </div>
          <div className="choose-card">
            <img src={network_set} alt="2" />
            <h5>We Provide Powerful Product Strategy</h5>
          </div>
          <div className="choose-card">
            <img src={training_ict} alt="3" />
            <h5>Help your business grow worldwide</h5>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
