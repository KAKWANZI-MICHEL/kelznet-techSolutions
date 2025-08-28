
import '../styles/Contact.css';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-form">
        <h4>We would love to hear from you!</h4>
        <h1>Contact Us</h1>
        <form>
          <div className="input-row">
            <input type="email" placeholder="Enter a valid email address" required />
            <input type="text" placeholder="Enter your Name" required />
          </div>
          <div className="input-row">
            <input type="text" placeholder="Enter your address" required />
            <input type="tel" placeholder="Enter your phone (e.g. +256)" required />
          </div>
          <textarea placeholder="Enter your message" required></textarea>
          <button type="submit">SUBMIT</button>
        </form>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>

      <div className="contact-details">
        <div className="detail">
          <FaPhoneAlt className="icon" />
          <div>
            <strong>CALL US</strong><br />
          +256 771 026689
          </div>
        </div>

        <div className="detail">
          <FaMapMarkerAlt className="icon" />
          <div>
            <strong>LOCATION</strong><br />
            Busega,Kampala, Uganda
          </div>
        </div>

        <div className="detail">
          <FaClock className="icon" />
          <div>
            <strong>BUSINESS HOURS</strong><br />
            Mon – Fri ….. 10 am – 8 pm, Sat, Sun …… Closed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
