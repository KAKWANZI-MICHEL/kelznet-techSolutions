import React from "react";

const ServicesSection = () => {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-grid">
          <div className="service-card">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </div>
            <h3>Digital Marketing</h3>
            <p>
              Nostrem exercitationem quia lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className="service-card">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </div>
            <h3>Product Development</h3>
            <p>
              Nostrem exercitationem quia lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className="service-card best-solution">
            <h2>BEST IT SOLUTION FOR YOUR BUSINESS</h2>
            <p>
              Gravida et sollicitudin lorem ipsum dolor sit amet consectetur elit.
            </p>
            <ul>
              <li>Quisque est nulla, dapibus euismod.</li>
              <li>Amet quisquam, excepturi quaerat.</li>
              <li>Duis aute irure dolor in reprehenderit.</li>
              <li>Molestiae non reiciendis illo earum.</li>
            </ul>
            <button className="btn get-started">Get Started</button>
          </div>
          <div className="service-card">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </div>
            <h3>UI/UX Designing</h3>
            <p>
              Nostrem exercitationem quia lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className="service-card">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </div>
            <h3>Data Analysis</h3>
            <p>
              Nostrem exercitationem quia lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;