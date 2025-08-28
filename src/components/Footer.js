import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about-us">
          <h3>KelzNet Tech Solutions</h3>
          <p className="tagline">Professional IT Solution for Your Business</p>
        </div>

        <div className="footer-section services">
          <h3>Our Services</h3>
          <ul>
            <li><i className="fas fa-laptop"></i> Computer Repairs</li>
            <li><i className="fas fa-network-wired"></i> Network Setup</li>
            <li><i className="fas fa-download"></i> Software Installation</li>
            <li><i className="fas fa-chalkboard-teacher"></i> ICT Training</li>
          </ul>
        </div>

        <div className="footer-section contact-us">
          <h3>Contact Us</h3>
          <ul>
            <li><i className="fas fa-phone-alt"></i> +256 771 026689</li>
            <li>
              <i className="fas fa-envelope"></i>{' '}
              <a href="mailto:zzlwa4728@gmail.com">zzlwa4728@gmail.com</a>
            </li>
            <li><i className="fas fa-map-marker-alt"></i> kampala uganda</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 KelzNet Tech Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
