
import '../styles/Home.css';
import heroImage from '../Image/white man.png'; // Replace with your actual image

function Home() {
  return (
    <header className="hero" id="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <h1>Professional IT Solution<br />for Your Business</h1>
        <p>Computer repairs, software installation, network set-up and ICT training services</p>
        <button className="cta-btn">Get started</button>
      </div>
    </header>
  );
}

export default Home;