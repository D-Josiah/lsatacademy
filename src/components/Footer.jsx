import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Img from './Img';

const footStyles = {
  wrap: {
    background: "linear-gradient(to right, #045573, #1092c5)",
    color: "#fff",
    padding: "80px 0 40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
    gap: 48,
    paddingBottom: 56,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  brand: { display: "flex", flexDirection: "column", gap: 20 },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: "-0.01em",
  },
  tagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    maxWidth: 300,
    lineHeight: 1.6,
  },
  socials: { display: "flex", gap: 10 },
  social: {
    width: 38,
    height: 38,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.7)",
  },
  colTitle: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontFamily: "var(--font-mono)",
    color: "var(--teal-300)",
    marginBottom: 20,
  },
  colList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  colLink: { color: "rgba(255,255,255,0.7)", fontSize: 14, cursor: "pointer" },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 28,
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    flexWrap: "wrap",
    gap: 16,
  },
  bottomLinks: { display: "flex", gap: 24 },
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToContact = () => {
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
    <footer className="v2" style={footStyles.wrap}>
      <div className="container">
        <div style={footStyles.grid} className="footer-grid">
          <div style={footStyles.brand}>
            <div style={footStyles.logo}>
              <Img
                src="/assets/header-logo.png"
                alt="LSAT Academy — David McMaster"
                width="180"
                height="56"
                loading="lazy"
                decoding="async"
                style={{ height: 56, width: "auto", display: "block", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p style={footStyles.tagline}>
              One tutor. Thousands of students into the law schools they dreamed about.
            </p>
            <div style={footStyles.socials}>
              <a style={footStyles.social} href="https://www.instagram.com/lsatacademy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a style={footStyles.social} href="https://www.facebook.com/profile.php?id=61561854974133" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a style={footStyles.social} href="https://www.reddit.com/user/the10000hourtutor/" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.67 13.06c.025.17.038.346.038.524 0 2.676-3.114 4.846-6.954 4.846s-6.954-2.17-6.954-4.846c0-.18.013-.357.04-.531a1.52 1.52 0 0 1-.86-1.37 1.52 1.52 0 0 1 2.561-1.111c1.176-.804 2.747-1.319 4.485-1.387l.97-4.265a.385.385 0 0 1 .456-.292l3.046.66a1.056 1.056 0 1 1-.13.526l-2.717-.589-.864 3.815c1.71.082 3.252.595 4.413 1.387a1.52 1.52 0 0 1 2.557 1.108c0 .593-.342 1.107-.84 1.355h-.002zM8.354 12.93a1.04 1.04 0 1 0 .002 2.082 1.04 1.04 0 0 0-.002-2.082zm5.66 3.802a.36.36 0 0 0-.514 0c-.502.5-1.46.54-1.737.54-.276 0-1.234-.04-1.736-.54a.367.367 0 0 0-.524.514c.787.787 2.302.85 2.26.85.044 0 1.474-.063 2.262-.85a.367.367 0 0 0-.011-.514zm.124-1.72a1.04 1.04 0 1 0-.002-2.082 1.04 1.04 0 0 0 .002 2.082z" />
                </svg>
              </a>
              <a style={footStyles.social} href="https://discord.gg/PPJezp2y9P" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div style={footStyles.colTitle}>Quick links</div>
            <ul style={footStyles.colList}>
              <li><Link style={footStyles.colLink} to="/">Home</Link></li>
              <li><Link style={footStyles.colLink} to="/services">Services</Link></li>
              <li><Link style={footStyles.colLink} to="/testimonials">Testimonials</Link></li>
              <li><Link style={footStyles.colLink} to="/faq">FAQ</Link></li>
              <li><span style={footStyles.colLink} onClick={goToContact}>Contact</span></li>
            </ul>
          </div>

          <div>
            <div style={footStyles.colTitle}>Resources</div>
            <ul style={footStyles.colList}>
              <li><Link style={footStyles.colLink} to="/resources">Blog</Link></li>
              <li><Link style={footStyles.colLink} to="/drill-finder">LR Drill Finder</Link></li>
              <li><Link style={footStyles.colLink} to="/discord">Discord</Link></li>
              <li><a style={footStyles.colLink} href="https://www.reddit.com/r/LSATAcademy/" target="_blank" rel="noopener noreferrer">Subreddit</a></li>
              <li><Link style={footStyles.colLink} to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <div style={footStyles.colTitle}>Connect</div>
            <ul style={footStyles.colList}>
              <li style={footStyles.colLink}>ACE the LSAT with expert tutoring</li>
              <li style={footStyles.colLink}>Boston, MA · Online nationwide</li>
              <li style={{ marginTop: 12 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => window.open('https://calendly.com/dave-mcmaster/free-lsat-consultation', '_blank')}
                  style={{ padding: "10px 20px", fontSize: 13 }}
                >
                  Book a consult
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div style={footStyles.bottom}>
          <div>© {new Date().getFullYear()} LSAT Academy · All rights reserved.</div>
          <div style={footStyles.bottomLinks}>
            <Link style={footStyles.colLink} to="/privacy-policy">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
