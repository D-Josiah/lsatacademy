import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="footer padding">
      <div className="footer-details">
        {/* Contact Info */}
        <div className="contact-info">
          <div className="title">
            <img src="/assets/logo-white.png" alt="Logo" />

          </div>
          <p>ACE the LSAT with EXPERT TUTORING</p>
          <div className="socials">
            <a href="https://www.instagram.com/lsatacademy/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/instagram-icon.png" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61561854974133" target="_blank" rel="noopener noreferrer">
              <img src="/assets/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="https://www.reddit.com/user/the10000hourtutor/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/reddit-icon2.png" alt="Reddit" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul className="links">
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/about')}>About</li>
            <li onClick={() => navigate('/services')}>Services</li>
            <li onClick={() => navigate('/testimonials')}>Testimonials</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="cta">
          <h3>Join Now</h3>
          <button onClick={() => handleScrollToSection('contact')}>
            CONTACT
          </button>
        </div>
      </div>

      <hr />
      <p>© 2025 LSAT ACADEMY. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
