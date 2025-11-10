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
              <p>After leaving college I spent years traveling the world playing poker. Looking to do something more fulfilling, I took the LSAT (scoring in the top percentile) in order to start tutoring people. I’ve since dedicated the past 15 years to helping students master the LSAT. In that time, I've seen every mistake a student can make. Seriously, every single one. The overthinking, the pride that keeps you from drilling basics, the pressure from friends and family, the belief that you're just "not a 170+ person." I've watched countless students find success by patiently dedicating themselves, through repeated practice, to internalizing the patterns of the LSAT. I’ve seen this because I’m a former star classroom teacher for an elite test prep agency, where I taught hundreds of students and learned exactly what separates those who succeed from those who stay stuck.</p>
              <br></br>
              <p>Now I work one-on-one with  students who are ready to stop treating this test like it measures their self-worth and instead treating it like a game they can master. My students don't just improve their scores. They learn to approach test day with the kind of quiet confidence that comes from truly mastering the fundamentals. No anxiety. No overthinking. Just execution. </p>
            </div>
          </div>
          

        </section>
        <br></br>
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
                <p>I emphasize key skills like critical thinking and efficient test strategies, helping to boost your confidence and performance under timed conditions.</p>
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