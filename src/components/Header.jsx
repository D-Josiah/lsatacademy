import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header max">
      <nav className="nav">
        <div className="mobile-header">
          <img 
            src="assets/header-logo.png" 
            alt="Your Logo" 
            className="logo-image" 
            onClick={() => handleScrollToSection('top')} 
            style={{ cursor: 'pointer' }} 
          />

          {/* Menu Icon */}
          <img 
            src="/assets/menu-icon.png" 
            alt="menu button icon" 
            className="menu-icon" 
            onClick={() => setIsMenuOpen(true)} 
            style={{ cursor: 'pointer' }} 
          />
        </div>

        {/* Side Menu */}
        <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
          {/* Close Icon */}
          <img 
            src="/assets/close-icon.png" 
            alt="close button icon" 
            className="close-icon" 
            onClick={() => setIsMenuOpen(false)} 
            style={{ cursor: 'pointer' }} 
          />
          <ul className="nav-links">
            <li className="nav-link">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('top');
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-link">
              <Link 
                to="/about"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/services"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/testimonials"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/resources"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Guides
              </Link>
            </li>
            
          </ul>

          {/* Contact Button */}
          <button
            className="join-button"
            onClick={() => handleScrollToSection('contact')}
            aria-label="Contact"
          >
            CONTACT
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;