import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h4>KelzNet Tech Solutions</h4>
          <p>Professional IT Solutions</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <span>Services</span>
            <div className="service-tags">
              <span className="tag">Computer Repair</span>
              <span className="tag">Network Setup</span>
              <span className="tag">Software Installation</span>
              <span className="tag">ICT Training</span>
            </div>
          </div>
          
          <div className="link-group">
            <span>Contact</span>
            <div className="contact-info">
              <a href="tel:+256771026689">📞 +256 771 026689</a>
              <a href="mailto:zzlwa4728@gmail.com">✉️ zzlwa4728@gmail.com</a>
              <span>📍 Kampala, Uganda</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span>&copy; 2025 KelzNet Tech Solutions. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
