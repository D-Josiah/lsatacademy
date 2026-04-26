import React, { useEffect, useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";

const Consultation = () => {
  const navigate = useNavigate();
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [calendlyVisible, setCalendlyVisible] = useState(false);
  const calendlyRef = useRef(null);

  // Lazy load Calendly when user scrolls near it
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCalendlyVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    if (calendlyRef.current) {
      observer.observe(calendlyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load Calendly script only when visible
  useEffect(() => {
    if (!calendlyVisible) return;

    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;

    calendlyScript.onload = () => {
      setCalendlyLoaded(true);
    };

    document.body.appendChild(calendlyScript);

    return () => {
      if (calendlyScript.parentNode) {
        calendlyScript.parentNode.removeChild(calendlyScript);
      }
    };
  }, [calendlyVisible]);

  // Load Reddit embed script
  useEffect(() => {
    const redditScript = document.createElement("script");
    redditScript.src = "https://embed.reddit.com/widgets.js";
    redditScript.async = true;
    redditScript.charset = "UTF-8";
    document.body.appendChild(redditScript);

    return () => {
      if (redditScript.parentNode) {
        redditScript.parentNode.removeChild(redditScript);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Book a Free LSAT Consultation | LSAT Academy</title>
        <meta name="description" content="Schedule your free 1-hour LSAT consultation with David McMaster. Discuss your goals, get personalized advice, and find out if private tutoring is right for you." />
        <link rel="canonical" href="https://www.lsat.academy/consultation" />
        <meta property="og:title" content="Book a Free LSAT Consultation | LSAT Academy" />
        <meta property="og:description" content="Schedule your free 1-hour LSAT consultation with David McMaster. Discuss your goals, get personalized advice, and find out if private tutoring is right for you." />
        <meta property="og:url" content="https://www.lsat.academy/consultation" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Book a Free LSAT Consultation | LSAT Academy" />
        <meta name="twitter:description" content="Schedule your free 1-hour LSAT consultation with David McMaster. Discuss your goals, get personalized advice, and find out if private tutoring is right for you." />
      </Helmet>
      <style>{`
        :root {
          --myblue: #1a3a52;
          --mylightblue: #2e5c8a;
          --bree: 'Bree Serif', serif;
          --poppins: 'Poppins', sans-serif;
        }

        .pattern-section {
          background: linear-gradient(135deg, var(--myblue) 0%, var(--mylightblue) 100%);
          padding: 3rem 2rem;
          border-radius: 12px;
          margin: 3rem auto;
          max-width: 900px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .pattern-section h3 {
          margin-bottom: 0.75rem;
          color: #ffffff;
          font-size: 2rem;
          font-weight: 100;
          font-family: var(--bree);
          letter-spacing: 0.5px;
        }

        .pattern-list {
          list-style: none;
          padding: 0;
          margin: 2rem auto;
          max-width: 700px;
          text-align: left;
        }

        .pattern-list li {
          padding: 0.4rem 0;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.6;
          color: #ffffff;
          font-size: 1rem;
          font-family: var(--poppins);
        }

        .pattern-list li:before {
          content: "✓";
          color: #e8f0fe;
          font-weight: bold;
          font-size: 1.2rem;
          position: absolute;
          left: 0;
          top: 0.2rem;
        }

        @media (max-width: 768px) {
          .pattern-section {
            padding: 2rem 1.5rem;
            margin: 2rem 1rem;
          }

          .pattern-section h3 {
            font-size: 1.6rem;
          }

          .pattern-list li {
            padding-left: 1.25rem;
            font-size: 0.95rem;
          }
        }
      `}</style>

      <main className="consultation max padding spacer">
        
        <h1 style={{ 
        
          fontFamily: 'var(--bree)', 
          textAlign: 'center',
          fontSize: '2.8rem',
          fontWeight: 100,
          color: 'var(--myblue)',
          lineHeight: 1.3
        }}>LSAT Academy Consultations</h1>
        
        <div className="pattern-section">
          <h3>Take advantage of this free LSAT consultation if:</h3>
          
          <ul className="pattern-list">
            
            <li>your recent diagnostic left you unsure about what to fix</li>
            <li>you want clearer guidance instead of studying alone</li>
            <li>you're looking for real LSAT help, not more scattered resources</li>
            <li>you'd benefit from structure and a study plan that makes sense</li>
            <li>you want an LSAT tutor who can bring clarity to your approach and timeline</li>
          </ul>
        </div>
        <h3 style={{ marginTop:'40px', textAlign:'center' }}>Pick a Time That Works for You</h3>

          {/* Calendly Widget - Free Consultation (lazy loaded) */}
        <div ref={calendlyRef} style={{ position: 'relative', minHeight: '700px' }} id="free-consultation">
          {(!calendlyVisible || !calendlyLoaded) && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '700px',
              backgroundColor: '#f5f7fa',
              borderRadius: '8px',
              gap: '20px'
            }}>
              {/* Skeleton loader */}
              <div style={{ width: '80%', maxWidth: '500px' }}>
                <div style={{ height: '40px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '16px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '20px', backgroundColor: '#e2e8f0', borderRadius: '6px', marginBottom: '12px', width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ height: '80px', backgroundColor: '#e2e8f0', borderRadius: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  ))}
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Loading calendar...</p>
              <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
            </div>
          )}
          {calendlyVisible && (
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/dave-mcmaster/free-lsat-consultation?text_color=023247&primary_color=023247"
              style={{
                minWidth: "320px",
                height: "700px",
                display: calendlyLoaded ? 'block' : 'none'
              }}
            />
          )}
        </div>

        {/* Consultation Testimonials */}
        <section className="consultation-testimonials">
          
          <div style={{ 
            display: 'flex', 
            gap: '30px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            margin: '40px 0'
          }}>
            <img 
              src="/assets/testimonial1.jpeg" 
              alt="Student testimonial 1" 
              style={{ 
                maxWidth: '800px', 
                width: '100%', 
                borderRadius: '15px', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)' 
              }}
            />
            <img 
              src="/assets/testimonial2.png" 
              alt="Student testimonial 2" 
              style={{ 
                maxWidth: '600px', 
                width: '100%', 
                borderRadius: '15px', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)' 
              }}
            />
            <img 
              src="/assets/testimonial3.jpeg" 
              alt="Student testimonial 3" 
              style={{ 
                maxWidth: '600px', 
                width: '100%', 
                borderRadius: '15px', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)' 
              }}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '30px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            margin: '0 0 40px 0'
          }}>
            <img 
              src="/assets/testimonial4.jpeg" 
              alt="Student testimonial 4" 
              style={{ 
                maxWidth: '600px', 
                width: '100%', 
                borderRadius: '15px', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)' 
              }}
            />
            <img 
              src="/assets/testimonial5.png" 
              alt="Student testimonial 5" 
              style={{ 
                maxWidth: '600px', 
                width: '100%', 
                borderRadius: '15px', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)' 
              }}
            />
            <img 
              src="/assets/testimonial6.jpeg" 
              alt="Student testimonial 6" 
              style={{ 
                maxWidth: '800px', 
                width: '100%', 
                borderRadius: '15px', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)' 
              }}
            />
          </div>
        </section>

      

        {/* Image Grid Section */}
        <section className="image-grid padding">
          <div className="grid-item">
            <img src="/assets/Calendly1.png" alt="Consultation feedback 1" />
          </div>
          <div className="grid-item">
            <img src="/assets/Calendly2.png" alt="Consultation feedback 2" />
          </div>
          <div className="grid-item">
            <img src="/assets/Calendly3.png" alt="Consultation feedback 3" />
          </div>
          <div className="grid-item">
            <img src="/assets/Calendly4.png" alt="Consultation feedback 4" />
          </div>
          <div className="grid-item">
            <img src="/assets/Calendly5.png" alt="Consultation feedback 5" />
          </div>
          <div className="grid-item">
            <img src="/assets/Calendly6.png" alt="Consultation feedback 6" />
          </div>
        </section>
      

       

        {/* Survey Buttons Section */}
        <section style={{ marginTop: '60px', marginBottom: '60px' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '40px',
            marginTop: '50px' 
          }}>
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '15px', color: '#023247' }}>
                Post-Consultation Survey
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '15px' }}>
                Recent responses from students who booked a free LSAT consultation.
              </p>
              <button 
                onClick={() => window.open('https://docs.google.com/spreadsheets/d/1TiKsWiIUWyCC1vjbbwEwkPw2SyZAY0aUvLKItSW7Cb8/edit?usp=sharing', '_blank')}
                className="primary-btn"
                style={{ 
                  marginTop: '10px',
                  padding: '14px 32px',
                  fontSize: '1.1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                Read Form Responses
              </button>
            </div>
            
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '15px', color: '#023247' }}>
                How was David as a tutor, really?
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '15px' }}>
                Note: Some older testimonials may mention logic games — those were part of past LSAT formats.
              </p>
              <button 
                onClick={() => window.open('https://docs.google.com/forms/d/1rL_IQq45dGYxYBQIvjX3Pauc7UhUTCCSHK7UwB_rIoc/viewanalytics?pli=1&pli=1', '_blank')}
                className="primary-btn"
                style={{ 
                  marginTop: '10px',
                  padding: '14px 32px',
                  fontSize: '1.1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                Read Student Answers
              </button>
            </div>
          </div>
        </section>

        {/* Reddit Post Section */}
        <section style={{ margin: '60px 0', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#023247' }}>
            If you relate to some of these patterns, you might want to book a consultation
          </h3>
          <blockquote 
            className="reddit-embed-bq" 
            style={{ height: '316px' }} 
            data-embed-theme="dark" 
            data-embed-height="316"
          >
            <a href="https://www.reddit.com/r/LSAT/comments/1m0zqu9/some_patterns_that_jump_out_after_15_years_of/">
              Some Patterns That Jump Out After 15 Years of Tutoring
            </a>
            <br /> 
            by
            <a href="https://www.reddit.com/user/The10000HourTutor/">u/The10000HourTutor</a> 
            in
            <a href="https://www.reddit.com/r/LSAT/">LSAT</a>
          </blockquote>
          
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginTop: '20px',
            fontStyle: 'italic'
          }}>
             - David McMaster (u/The10000HourTutor)
          </p>
          
          <button 
            onClick={() => {
              const consultSection = document.getElementById('free-consultation');
              if (consultSection) {
                consultSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="primary-btn"
            style={{
              marginTop: '30px',
              padding: '14px 32px',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1'
            }}
          >
            Book Now
          </button>
        </section>

        <span id="contact"></span>
        <ContactForm id="get-in-touch"/>
      </main>
    </>
  );
};

export default Consultation;