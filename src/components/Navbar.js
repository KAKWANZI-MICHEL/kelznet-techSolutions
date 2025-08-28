import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Image/logo_nav.png';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="logo">
        <span className="logo-icon">
          <img src={logo} alt="Logo" className="logo-image" />
        </span>
        <span className="logo-text">
          KelzNet Tech Solutions<span className="highlight"></span>
        </span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/bookingForm">BookingForm</Link></li>
        <li><Link to="/testimonial">Testimonial</Link></li>
        
      </ul>
    </motion.nav>
  );
};

export default Navbar;
