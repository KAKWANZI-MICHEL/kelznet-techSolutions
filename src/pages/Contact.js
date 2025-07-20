
import './RequestServicePage.css';

const RequestServicePage = () => {
  return (
    <div className="request-page">
      {/* Header */}
      <header className="header">
        <h1><span className="highlight">KelzNet</span> Tech Solutions</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact Us</a>
        </nav>
      </header>

      {/* Request Service Form */}
      <section className="request-section">
        <h2 className="section-title">Request Service</h2>
        <form className="request-form">
          {/* Personal Details */}
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter email address" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" />
          </div>
          <div className="form-group">
            <label>Company/Organisation</label>
            <input type="text" placeholder="Enter company name" />
          </div>

          {/* Services Needed */}
          <div className="services-needed">
            <label>Services Needed (Select all that apply)</label>
            <div className="checkbox-group">
              <label><input type="checkbox" /> Computer Repair</label>
              <label><input type="checkbox" /> Network setup</label>
              <label><input type="checkbox" /> Software Installation</label>
              <label><input type="checkbox" /> ICT Training</label>
            </div>
          </div>

          {/* Additional Details */}
          <div className="form-group">
            <label>Additional Details</label>
            <textarea placeholder="Please describe your specific needs, timeline, or any other relevant information." rows={4}></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Send Request</button>
        </form>
      </section>

      {/* Footer could be added here if needed */}
    </div>
  );
};

export default RequestServicePage;