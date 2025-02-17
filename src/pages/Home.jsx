import React from "react";
import ContactForm from "../components/ContactForm";
import { Link, useNavigate } from 'react-router-dom';





const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="home max padding">
        <section className="hero">
          <div className="hero-content">
            <h1>ACE the LSAT with EXPERT TUTORING</h1>
            <h2>Years of Proven Strategies to Boost Your LSAT Success.</h2>
            <button onClick={() => navigate('/services')}>
              BOOK A FREE CONSULTATION
            </button>
            
          </div>
          <img src="assets/hero-image.png" alt="hero image, image of david mcmaste lsat tutor" className="hero-image" />
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
          <button onClick={() => navigate('/testimonials')}>
            VIEW TESTIMONIALS
          </button>
        </section>
        <section className="services padding">
          <h2>SERVICES</h2>
          <hr></hr>
          <div className="service-wrap" >
            <div className="service">
              <h3>One-on-One Tutoring</h3>
              <p>Personalized, focused sessions tailored to the student’s specific strengths and weaknesses.</p>
            </div>
            <div className="service">
              <h3>Small Group Tutoring</h3>
              <p>Affordable option for students to learn in a collaborative environment with peers.</p>
            </div>
            <div className="service">
              <h3>Online Tutoring</h3>
              <p>Flexible and convenient for students anywhere in the world.</p>
            </div>
            <div className="service">
              <h3>In-Person Tutoring</h3>
              <p>Perfect for those who prefer a traditional learning experience.</p>
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
