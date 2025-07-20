
import './Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🔶</span>
        <span className="logo-text">KelzNet Tech <span className="highlight">solutions</span></span>
      </div>
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

