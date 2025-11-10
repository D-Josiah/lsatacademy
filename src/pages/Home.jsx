import React from "react";
import ContactForm from "../components/ContactForm";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const handleGroupTutoringSurvey = () => {
    navigate('/group-tutoring');
    // Add a small delay to ensure the page loads before scrolling
    setTimeout(() => {
      const surveySection = document.getElementById('survey-section');
      if (surveySection) {
        surveySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <main className="home max padding">
        <section className="hero">
          <div className="hero-content">
            <h1>Private LSAT Tutoring with David McMaster</h1>
            <h2>I help you go from second-guessing every answer to walking into test day with confidence.</h2>
            <div className="cta-div">
               <button 
                onClick={() => window.open('https://calendly.com/dave-mcmaster/free-lsat-consultation', '_blank')}
                className="consultation-button inquire-button"
              >
                Book Free Consultation
              </button>
              <button onClick={() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="secondary">
                VIEW TUTORING OPTIONS
              </button>
            </div>
          </div>
          <img src="assets/hero-image.png" alt="hero image, image of david mcmaste lsat tutor" className="hero-image" />
        </section>
        <section className="choose max">

        <div className="about-me">
            <h2>MEET YOUR LSAT TUTOR</h2>
            <hr />
            
            <div className="about-intro">
              <img src="/assets/david.png" alt="David McMaster, LSAT Tutor" className="about-image" />
              <div className="about-greeting">
                <h3>Hey there! I'm David McMaster, the tutor behind LSAT Academy. Over the past 15 years, I've helped thousands of students master the LSAT.</h3>
              </div>
            </div>

            <div className="about-content">
              <div className="about-paragraph">
                <p>After leaving college I spent years traveling the world playing poker. Looking to do something more fulfilling, I took the LSAT <strong>(scoring in the top percentile)</strong> in order to start tutoring people. I've since dedicated the past 15 years to helping students master the LSAT. In that time, I've seen every mistake a student can make. Seriously, every single one. The overthinking, the pride that keeps you from drilling basics, the pressure from friends and family, the belief that you're just "not a 170+ person." I've watched countless students find success by patiently dedicating themselves, through repeated practice, to internalizing the patterns of the LSAT.</p>
              </div>
              <div className="about-paragraph">
                <p>I've seen this because I'm a <strong>former star classroom teacher for an elite test prep agency,</strong> where I taught hundreds of students and learned exactly what separates those who succeed from those who stay stuck. Now I work one-on-one with students who are ready to stop treating this test like it measures their self-worth and instead treating it like a game they can master. My students don't just improve their scores. They learn to approach test day with the kind of quiet confidence that comes from truly mastering the fundamentals. No anxiety. No overthinking. Just execution.</p>
              </div>
            </div>
          </div>
        </section>
        
        
        <section className="services padding" id="services">
          <h2>SERVICES</h2>
          <hr></hr>
          <div className="service-wrap">
            <div className="service">
              <h3>One-Time Free Consultation</h3>
              <p><strong>1 hour session</strong> to answer your questions, discuss your LSAT goals, share strategic advice, and see if working together makes sense. If you know you're not going to hire me, don't feel guilty about it and sign up for the hour if you could use the help.</p>
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
              <p className="base-price">$85 per session</p>
              
              <ul className="pricing">  
                
                <li className="package-deal">5% discount for 10-hour package</li>
                <li className="package-deal">15% discount for 20-hour package</li>
              </ul>
            
              <button 
                onClick={() => window.open('https://calendly.com/dave-mcmaster/1-on-1-private-tutoring', '_blank')}
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
                onClick={handleGroupTutoringSurvey} 
                className="survey-button"
              >
                Answer Survey
              </button>
            </div>
          </div>
        </section>

        
        <section className="choose max">
          <div className="title">
            <h2>WHY CHOOSE ME?</h2>
            <hr />
          </div>
          <div className="qualities">
            <div className="quality">
              <img src="/assets/book-icon.png" alt="book icon" />
              <div className="quality-content">
                <h3>Seasoned Excellence</h3>
                <p>Over 15 years of dedicated tutoring experience</p>
              </div>
            </div>
            <div className="quality">
              <img src="/assets/test-icon.png" alt="test icon" />
              <div className="quality-content">
                <h3>Proven Excellence</h3>
                <p>Personal LSAT score in the 99th percentile (170+) with continued mastery over a decade</p>
              </div>
            </div>
            <div className="quality">
              <img src="/assets/verified-icon.png" alt="verified icon" />
              <div className="quality-content">
                <h3>Verified Quality</h3>
                <p>Verified track record with extensive student testimonials</p>
              </div>
            </div>
            <div className="quality">
              <img src="/assets/class-icon.png" alt="classroom icon" />
              <div className="quality-content">
                <h3>Renowned Expertise</h3>
                <p>Former elite test-prep agency instructor </p>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/testimonials', { state: { refresh: true } })}>
            VIEW TESTIMONIALS
          </button>

          
        </section>

        <section class LSAT Academy Community>
                   <div style={{
        maxWidth: '1000px',
        margin: '60px auto 0',
        padding: '0 20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF4500 0%, #FF5722 100%)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 24px rgba(255, 69, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flex: '1',
            minWidth: '250px'
          }}>
            <img 
              src="/assets/reddit-icon.png" 
              alt="Reddit Logo" 
              style={{
                width: '60px',
                height: '60px',
                filter: 'brightness(0) invert(1)'
              }}
            />
            <div>
              <h3 style={{
                fontSize: '1.8rem',
                fontFamily: "'Bree Serif', serif",
                fontWeight: '100',
                color: 'white',
                marginBottom: '8px'
              }}>Join Our Subreddit</h3>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.95)',
                margin: 0
              }}>
                Get daily LSAT tips, ask questions, and connect with fellow students
              </p>
            </div>
          </div>
          
          <a
            href="https://www.reddit.com/r/LSATAcademy/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'white',
              color: '#FF4500',
              padding: '14px 32px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            Join r/LSATAcademy →
          </a>
        </div>
      </div>

      

      {/* Discord Community */}
          <div style={{
            maxWidth: '1000px',
            margin: '30px auto 0',
            padding: '0 20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 8px 24px rgba(88, 101, 242, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flex: '1',
                minWidth: '250px'
              }}>
                <img 
                  src="/assets/discord-icon.png" 
                  alt="Discord Logo" 
                  style={{
                    width: '60px',
                    height: '60px',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
                <div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontFamily: "'Bree Serif', serif",
                    fontWeight: '100',
                    color: 'white',
                    marginBottom: '8px'
                  }}>Join Our Discord Server</h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.95)',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Real-time chat, study groups, resources, tutor tips & support system
                  </p>
                </div>
              </div>
              
              <a
                href="https://discord.gg/PPJezp2y9P"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'white',
                  color: '#5865F2',
                  padding: '14px 32px',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
              >
                Join Discord Server →
              </a>
            </div>
          </div>

        </section>

        
        
        <span id="contact"></span>
        <ContactForm id="get-in-touch"/>

          
      </main>
    </>
  );
};

export default Home;