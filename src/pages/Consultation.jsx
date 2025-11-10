import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";

const Consultation = () => {
  const navigate = useNavigate();
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    // Preload Calendly script immediately
    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;
    
    // Add preconnect for faster loading
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://assets.calendly.com";
    document.head.appendChild(preconnect);
    
    // Set loaded state when script loads
    calendlyScript.onload = () => {
      setCalendlyLoaded(true);
    };
    
    document.body.appendChild(calendlyScript);

    // Load Reddit embed script
    const redditScript = document.createElement("script");
    redditScript.src = "https://embed.reddit.com/widgets.js";
    redditScript.async = true;
    redditScript.charset = "UTF-8";
    document.body.appendChild(redditScript);

    // Cleanup
    return () => {
      if (calendlyScript.parentNode) {
        calendlyScript.parentNode.removeChild(calendlyScript);
      }
      if (preconnect.parentNode) {
        preconnect.parentNode.removeChild(preconnect);
      }
      if (redditScript.parentNode) {
        redditScript.parentNode.removeChild(redditScript);
      }
    };
  }, []);

  return (
    <>
      <main className="consultation max padding spacer">
        
        <h1 style={{ margin:'auto', fontFamily:'bree', textAlign:'center' }}>LSAT Academy Consultations</h1>
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

        {/* Calendly Widget - Free Consultation */}
        <div style={{ position: 'relative', minHeight: '700px' }} id="free-consultation">
          {!calendlyLoaded && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '700px',
              backgroundColor: '#f9f9f9'
            }}>
              <img 
                src="/assets/loading.gif" 
                alt="Loading..." 
                style={{ width: '80px', height: '80px' }}
              />
            </div>
          )}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/dave-mcmaster/free-lsat-consultation?text_color=023247&primary_color=023247"
            style={{ 
              minWidth: "320px", 
              height: "700px",
              display: calendlyLoaded ? 'block' : 'none'
            }}
          >
          </div>
        </div>

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