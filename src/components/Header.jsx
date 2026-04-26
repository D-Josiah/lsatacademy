import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navStyles = {
  outer: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    padding: "16px 32px 0",
    maxWidth: 1240,
    margin: "0 auto",
    width: "100%"
  },
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px 10px 20px",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: 999,
    boxShadow: "0 4px 18px rgba(2,50,71,0.08), 0 0 0 1px rgba(2,50,71,0.05)"
  },
  logo: {
    display: "flex", alignItems: "center", gap: 10,
    color: "var(--navy-900)", letterSpacing: "-0.01em"
  },
  links: { display: "flex", gap: 32, alignItems: "center" },
  link: {
    fontSize: 14,
    color: "var(--ink-700)",
    fontWeight: 500,
    fontFamily: "var(--font-sans)",
    cursor: "pointer"
  },
  mobileToggle: {
    background: "transparent",
    border: "none",
    padding: 8,
    cursor: "pointer",
    color: "var(--navy-900)"
  },
  contactBtn: {
    minWidth: 140,
    padding: "12px 32px",
    justifyContent: "center"
  },
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goToContact = () => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const section = document.getElementById('contact');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('contact');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <div className="v2" style={navStyles.outer}>
      <nav style={navStyles.wrap}>
        <Link to="/" style={navStyles.logo} onClick={() => setIsMenuOpen(false)}>
          <img
            src="/assets/header-logo.png"
            alt="LSAT Academy — David McMaster"
            style={{ height: 56, width: "auto", display: "block" }}
          />
        </Link>

        <div style={navStyles.links} className="nav-links-v2">
          <Link to="/" style={navStyles.link}>Home</Link>
          <Link to="/services" style={navStyles.link}>Services</Link>
          <Link to="/testimonials" style={navStyles.link}>Testimonials</Link>
          <Link to="/resources" style={navStyles.link}>Resources</Link>
        </div>

        <button
          className="btn btn-primary nav-contact-btn"
          onClick={goToContact}
          style={navStyles.contactBtn}
        >
          Contact
        </button>

        <button
          className="nav-mobile-toggle"
          onClick={() => setIsMenuOpen(true)}
          style={navStyles.mobileToggle}
          aria-label="Open menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(2,50,71,0.4)',
            zIndex: 100,
          }}
        />
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 'min(320px, 85vw)',
          background: '#fff',
          boxShadow: '-12px 0 32px rgba(2,50,71,0.15)',
          padding: '24px 28px',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          style={{
            alignSelf: 'flex-end',
            background: 'transparent',
            border: 'none',
            padding: 8,
            cursor: 'pointer',
            color: 'var(--navy-900)',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ ...navStyles.link, fontSize: 18, padding: '10px 0' }}>Home</Link>
        <Link to="/services" onClick={() => setIsMenuOpen(false)} style={{ ...navStyles.link, fontSize: 18, padding: '10px 0' }}>Services</Link>
        <Link to="/testimonials" onClick={() => setIsMenuOpen(false)} style={{ ...navStyles.link, fontSize: 18, padding: '10px 0' }}>Testimonials</Link>
        <Link to="/consultation" onClick={() => setIsMenuOpen(false)} style={{ ...navStyles.link, fontSize: 18, padding: '10px 0' }}>Consultation</Link>
        <Link to="/resources" onClick={() => setIsMenuOpen(false)} style={{ ...navStyles.link, fontSize: 18, padding: '10px 0' }}>Resources</Link>

        <button
          className="btn btn-primary"
          onClick={goToContact}
          style={{ marginTop: 16, justifyContent: 'center' }}
        >
          Contact
        </button>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .v2 .nav-links-v2 { display: none !important; }
          .v2 .nav-contact-btn { display: none !important; }
          .v2 .nav-mobile-toggle { display: inline-flex !important; align-items: center; justify-content: center; }
        }
        @media (min-width: 961px) {
          .v2 .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Header;
