
import './ServicesPage.css';

const ServicesPage = () => {
  return (
    <div className="services-page">
      {/* Header */}
      <header className="header">
        <h1>
          <span className="highlight">KelzNet</span> Tech Solutions
        </h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact us</a>
        </nav>
      </header>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {/* Service Card */}
          <div className="service-card">
            <div className="icon-container">
              <svg className="icon" viewBox="0 0 64 64" width="40" height="40" fill="#333">
                <circle cx="32" cy="32" r="30" stroke="#333" strokeWidth="4" fill="none" />
                <path d="M20 24 L28 32 L20 40" stroke="#f00" strokeWidth="4" fill="none" />
                <circle cx="32" cy="12" r="4" fill="#f00" />
              </svg>
            </div>
            <h3 className="service-title">Computer Repairs</h3>
            <p className="service-desc">Hardware diagnostics, component replacement, and system optimization</p>
          </div>
          {/* Service Card */}
          <div className="service-card">
            <div className="icon-container">
              <svg className="icon" viewBox="0 0 64 64" width="40" height="40" fill="#333">
                <rect x="16" y="24" width="32" height="20" stroke="#f00" strokeWidth="4" fill="none" />
                <line x1="16" y1="24" x2="16" y2="44" stroke="#f00" strokeWidth="4" />
                <line x1="48" y1="24" x2="48" y2="44" stroke="#f00" strokeWidth="4" />
                <line x1="16" y1="32" x2="48" y2="32" stroke="#f00" strokeWidth="4" />
              </svg>
            </div>
            <h3 className="service-title">Software Installation</h3>
            <p className="service-desc">Operating systems, applications, and software configuration services</p>
          </div>
          {/* Service Card */}
          <div className="service-card">
            <div className="icon-container">
              <svg className="icon" viewBox="0 0 64 64" width="40" height="40" fill="#333">
                <circle cx="32" cy="32" r="6" fill="#f00" />
                <path d="M16 48 L48 48 L48 56 L16 56 Z" fill="#f00" />
              </svg>
            </div>
            <h3 className="service-title">Network Set-up</h3>
            <p className="service-desc">WIFI configuration, router setup, and network security implementation</p>
          </div>
          {/* Service Card */}
          <div className="service-card">
            <div className="icon-container">
              <svg className="icon" viewBox="0 0 64 64" width="40" height="40" fill="#333">
                <rect x="12" y="24" width="40" height="24" stroke="#f60" strokeWidth="4" fill="none" />
                <path d="M12 24 L32 12 L52 24" stroke="#f60" strokeWidth="4" fill="none" />
              </svg>
            </div>
            <h3 className="service-title">ICT Training</h3>
            <p className="service-desc">Computer literacy, software training, and digital skills development</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 KelzNet Tech Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicesPage;