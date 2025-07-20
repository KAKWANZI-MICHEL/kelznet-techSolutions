
import '../pages/About';

const KelzNetPage = () => {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1><span className="highlight">KelzNet</span> Tech Solutions</h1>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact us</a>
        </nav>
      </header>

      {/* Main Content */}
      <section className="about-section">
        <h2>About KelzNet Tech Solutions</h2>
        <p>Your trusted partner in technology solutions, delivering excellence and <span className="highlight">innovation</span>.</p>
        <div className="content-layout">
          <div className="image-container">
            <img src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68" alt="Technician" />
          </div>
          <div className="text-container">
            <h3>KelzNet Tech Solutions</h3>
            <p>
              KelzNet Tech Solutions is a rapidly growing IT company dedicated to providing comprehensive technology services to businesses and individuals. We specialize in bridging the gap between complex technology and practical solutions that drive success.
            </p>
            <p>
              Our experienced team of certified technicians and IT professionals brings years of expertise to every project. We pride ourselves on delivering reliable, cost-effective solutions that exceed expectations while maintaining the highest standards of service quality.
            </p>
          </div>
        </div>

        {/* Expert Team Badge & Call-to-Action */}
        <div className="expert-team">
          <span className="badge">Expert Team</span>
        </div>
        <div className="ready-section">
          <h3>Ready to Get Started?</h3>
          <p>Let's discuss how we can help transform your technology challenges into opportunities</p>
          <button className="contact-btn">Contact us Today</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 KelzNet Tech Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default KelzNetPage;