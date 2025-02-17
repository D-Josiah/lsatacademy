import React from "react";
import ContactForm from "../components/ContactForm";


const About = () => {
  return (
    <>
   
      <main className="about max padding">
        <section className="about-me">
          <div className="about-title spacer">
            <h1>About Me</h1>
            <hr></hr>
          </div>
          <div className="about-content">
            <img src="/assets/david.png" alt="picture of david" />
            <div className="content">
              <h2>David McMaster</h2>
              <p>I've dedicated the past 15 years to helping students master the LSAT. While I prefer letting my results speak for themselves, my students consistently tell me I should share more about my impact. They're right – my track record includes helping students gain admission to Harvard Law, Yale Law, and other top schools, with success stories spanning from initial scores in the 140s to final scores in the 170s.</p>
            </div>
          </div>
          

        </section>
        <section className="approach-wrap spacer">
          <h2>MY APPROACH</h2>
          
          <div className="approach-content">
            <div className="approach">
              <img src="/assets/person-icon.png" alt="person icon" />
              <div className="text">
                <h3>Personalized Study Plans</h3>
                <p>I create customized plans tailored to your unique strengths and weaknesses, ensuring we focus on what matters most to you.</p>
              </div>
            </div>
            <div className="approach">
              <img src="/assets/brain-icon.png" alt="brain icon" />
              <div className="text">
                <h3>Building Deep Understanding</h3>
                <p>Rather than quick fixes, I help you develop a strong conceptual foundation, ensuring you master the core concepts and apply them confidently on test day.</p>
              </div>
            </div>
            <div className="approach">
              <img src="/assets/strategy-icon.png" alt="strategy icon" />
              <div className="text">
                <h3>Confidence & Strategy</h3>
                <p>I emphasize key skills like critical thinking and efficient test strategies, helping boost your confidence and performance under timed conditions.</p>
              </div>
            </div>
            
          </div>
        </section>
        <ContactForm/>
      </main>
    </>
  );
};

export default About;
