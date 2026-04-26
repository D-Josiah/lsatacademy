import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import PackagesSection from "../components/PackagesSection";

const Services = () => {
  const navigate = useNavigate();
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [calendlyVisible, setCalendlyVisible] = useState(false);
  const calendlyRef = useRef(null);

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

  useEffect(() => {
    if (!calendlyVisible) return;

    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;
    calendlyScript.onload = () => setCalendlyLoaded(true);
    document.body.appendChild(calendlyScript);

    return () => {
      if (calendlyScript.parentNode) {
        calendlyScript.parentNode.removeChild(calendlyScript);
      }
    };
  }, [calendlyVisible]);

  const handleSurvey = () => {
    const surveySection = document.getElementById('survey-section');
    if (surveySection) {
      surveySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlist = () => {
    window.open("https://401key.share-na2.hsforms.com/2VKwa4pA9QBGwuOOdGoAF9Q", "_blank");
  };

  return (
    <>
      <Helmet>
        <title>LSAT Tutoring Services & Pricing | LSAT Academy</title>
        <meta name="description" content="Explore LSAT tutoring options with David McMaster. Private 1-on-1 sessions at $85/hr, discounted 10 and 20-hour packages, group tutoring, and a free consultation." />
        <link rel="canonical" href="https://www.lsat.academy/services" />
        <meta property="og:title" content="LSAT Tutoring Services & Pricing | LSAT Academy" />
        <meta property="og:description" content="Private 1-on-1 LSAT tutoring at $85/hr, discounted 10 and 20-hour packages, group tutoring, and a free consultation with David McMaster." />
        <meta property="og:url" content="https://www.lsat.academy/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="LSAT Tutoring Services & Pricing | LSAT Academy" />
        <meta name="twitter:description" content="Private 1-on-1 LSAT tutoring at $85/hr, discounted packages, group tutoring, and a free consultation with David McMaster." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lsat.academy/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.lsat.academy/services" }
            ]
          }
        `}</script>
      </Helmet>
      <main className="consultation max padding spacer">
        
        <section className="services padding" id="services">
          <h2>SERVICES</h2>
          <hr></hr>
          <div className="service-wrap">
            <div className="service">
              <h3>One-Time Free Consultation</h3>
              <p>A 1 hour session to answer your questions, discuss your LSAT goals, share strategic advice, and see if working together makes sense. If you know you're not going to hire me, don't feel guilty about it and sign up for the hour if you could use the help.</p>
              <button 
                onClick={() => window.open('https://calendly.com/dave-mcmaster/free-lsat-consultation', '_blank')}
                className="consultation-button inquire-button"
              >
                Book Now
              </button>
            </div>
            
            <div className="service">
              <h3>1-on-1 Private Tutoring</h3>
              <p>Personalized, focused sessions tailored to the student's specific strengths and weaknesses.</p>
              <p className="base-price">$85 per hour</p>
              <ul className="pricing">  
                
                <li className="package-deal">5% discount for 10 hour package</li>
                <li className="package-deal">15% discount for 20 hour package</li>
              </ul>
            
              <button
                onClick={() => window.open('https://calendly.com/dave-mcmaster/private-lsat-tutoring', '_blank')}
                className="inquire-button"
              >
                Schedule 1-on-1
              </button>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inquire-button"
              >
                Discount Inquiry
              </button>
            </div>
            
            <div className="service">
              <h3>Group Tutoring</h3>
              <p>Affordable option for students to learn in a collaborative environment with peers.</p>
              <p className="waitlist-info">We're building our waitlist! Share your thoughts in our quick survey so we can design the perfect program and pricing for you.</p>
              <button 
                onClick={handleSurvey} 
                className="survey-button"
              >
                Answer Survey
              </button>
            </div>
          </div>
        </section>
         <span id="packages"></span>
         <PackagesSection />

         <h2 style={{ marginTop:'40px', textAlign:'center' }}>Pick a Time That Works for You</h2>

         <div ref={calendlyRef} style={{ position: 'relative' }}>
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
               <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Loading calendar...</p>
               <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
             </div>
           )}
           {calendlyVisible && (
             <>
               <div
                 className="calendly-inline-widget"
                 data-url="https://calendly.com/dave-mcmaster/free-lsat-consultation?text_color=023247&primary_color=023247"
                 style={{ minWidth: "320px", height: "700px", display: calendlyLoaded ? 'block' : 'none' }}
                 id="free-consultation"
               />
               <div
                 className="calendly-inline-widget"
                 data-url="https://calendly.com/dave-mcmaster/private-lsat-tutoring?text_color=023247&primary_color=023247"
                 style={{ minWidth: "320px", height: "700px", display: calendlyLoaded ? 'block' : 'none' }}
               />
             </>
           )}
         </div>

        {/* Group Tutoring Content */}
        <section className="group-tutoring">
          <div className="group-tutoring-header">
            <hr />
            <h1>LSAT Academy Group Tutoring</h1>
          </div>

          <div className="class-details">
            <div className="details-card">
              <h2>Program Details</h2>
              <div className="program-info">
                <div className="info-item">
                  <h3>Format:</h3>
                  <p>10 sessions, 3–4 hours each</p>
                </div>
                <div className="info-item">
                  <h3>Delivery: </h3>
                  <p>Virtual sessions</p>
                </div>
               
                <div className="info-item">
                  <h3>Pricing: </h3>
                  <p>Tell us what's most accessible for you in the survey below</p>
                </div>
                <div className="info-item">
                  <h3>Tutor: </h3>
                  <p>David McMaster</p>
                </div>
              </div>
            </div>

            <div className="group-cta">
              <p> <strong>2026 Course Currently in Development: </strong>
                  Secure your spot by joining our waitlist. Survey and waitlist participants will receive priority notification and 10% off when enrollment opens!</p>
              <div className="cta-buttons">
                <button onClick={handleSurvey} className="primary-btn">
                  Answer Our Survey
                </button>
                <button onClick={handleWaitlist} className="primary-btn">
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>

          <div className="schedule">
            <h2>Complete Curriculum Overview</h2>
            <div className="sessions-grid">
              <div className="session">
                <h3>Session 1</h3>
                <div className="session-content">
                  <p><strong>1.1</strong> Addressing arguments, question stems, and an overview of EVERY Question Stem type</p>
                  <p><strong>1.2</strong> Structural Reading and the 3 Types of RC MBT questions</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 2</h3>
                <div className="session-content">
                  <p><strong>2.1</strong> Main Conclusions and Argument Parts</p>
                  <p><strong>2.2</strong> Conditional Reasoning and what Must Be True</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 3</h3>
                <div className="session-content">
                  <p><strong>3.1</strong> Reading for Structure: Science</p>
                  <p><strong>3.2</strong> Indicator word quiz; Causal Reasoning and Weakening Arguments</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 4</h3>
                <div className="session-content">
                  <p><strong>Review</strong> of Diagnostic 2</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 5</h3>
                <div className="session-content">
                  <p><strong>5.1</strong> Reasoning by Similarity; Assumptions and Strengthening Arguments</p>
                  <p><strong>5.2</strong> Reading for Author's Intent: Diversity Passages</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 6</h3>
                <div className="session-content">
                  <p><strong>6.1</strong> Paradoxes and Principles</p>
                  <p><strong>6.2</strong> Reading without needing to understand: Science</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 7</h3>
                <div className="session-content">
                  <p><strong>7.1</strong> Method of Reasoning and Flaw questions</p>
                  <p><strong>7.2</strong> Parallel Reasoning and Parallel Flaw</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 8</h3>
                <div className="session-content">
                  <p><strong>Review</strong> of Diagnostic 3</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 9</h3>
                <div className="session-content">
                  <p><strong>9.1</strong> Reading Comprehension without a Main Point</p>
                  <p><strong>9.2</strong> Evaluate Questions and Anomalous Question Types</p>
                </div>
              </div>

              <div className="session">
                <h3>Session 10</h3>
                <div className="session-content">
                  <p><strong>10.1</strong> Final Recap of all Concepts and Strategies</p>
                  <p><strong>10.2</strong> Trial Run: In-class timed LR section and full section review</p>
                </div>
              </div>
            </div>
          </div>

          <div className="survey-section" id="survey-section">
            <h2>Help Us Tailor This Program for You</h2>
            <p>Your input helps us create the most effective and accessible program possible.</p>
            
            <div className="survey-embed">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSds0KDUWt6TgNqa7yT3eceGWor1xwApMs_T6SCnPFiXzOnbEw/viewform?embedded=true" 
                width="100%" 
                height="800" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
                title="Group Tutoring Survey"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </section>

        <span id="contact"></span>
        <ContactForm id="get-in-touch"/>
      </main>
    </>
  );
};

export default Services;