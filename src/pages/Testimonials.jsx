import React, { useEffect } from "react";

const Testimonials = () => {
  useEffect(() => {
    // Check if script is already added
    if (!document.querySelector('script[data-imgur]')) {
      const script = document.createElement("script");
      script.src = "//s.imgur.com/min/embed.js";
      script.async = true;
      script.setAttribute("data-imgur", "true");
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <main className="testimonials max padding spacer">
        <h1>Student Testimonials</h1>

        <section className="featured">
          <div className="title">
            <hr></hr>
            <img src="/assets/speech-icon.png" alt="survey-icon" />
            <h2>Surveys</h2>
            <hr></hr>
          </div>
          
          <div className="testimonials-wrap">
            {/* Survey Images - Improved */}
            <div style={{ 
              display: 'flex', 
              gap: '30px', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              margin: '40px 0 50px 0' 
            }}>
              <img 
                src="/assets/survey1.png" 
                alt="Student Survey Response 1" 
                style={{ 
                  maxWidth: '450px', 
                  width: '100%', 
                  borderRadius: '15px', 
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
              />
              <img 
                src="/assets/survey2.png" 
                alt="Student Survey Response 2" 
                style={{ 
                  maxWidth: '450px', 
                  width: '100%', 
                  borderRadius: '15px', 
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
              />
            </div>

            {/* Centered Survey Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '40px',
              marginTop: '50px' 
            }}>
              <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '15px', color: '#023247' }}>
                  Post-consultation Survey
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
                <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '30px', textAlign: 'center', marginTop: '20px' }}>
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
          </div>
        </section>

        <section className="featured">
          <div className="title">
            <hr></hr>
            <img src="/assets/speech-icon.png" alt="speech-icon" />
            <h2>Featured Student Testimonials</h2>
            <hr></hr>
          </div>
          
          <div className="testimonials-wrap">
            <div className="testimonial">
              <img className="stars" src="/assets/stars-icon.png" alt="stars icon" />
              <h3 className="highlight">From LSAT Prep to Harvard Law</h3>
              <img className="quote-top" src="/assets/quote-icon.png" alt="quote icon" />
              <p>I approached David after self-study for the LSAT left me hitting a ceiling with my score that I was pretty desperate to break. David was really good at identifying exactly where I was getting stuck and noticing patterns in the questions that I got wrong that I would never have noticed myself (hence the ceiling) and giving me very focused solutions. I also go the sense when he was teaching me that he was really tailoring his approach to teaching me how take the LSAT both to what skills I needed and changes I needed to make on the questions in order to maximize my score and moreover to who I was as an individual. I particularly appreciated the fact that he cared enough to ask about what outside influences could affect my test performance. In my case: insomnia. And actually offered advice! (That proved helpful enough that I actually entered the test well rested for once!) I think the fact that David was personable, patient and encouraging made me a lot more receptive to what he was teaching me than I otherwise would have been. Thanks to David, I ended up scoring a 169 on the LSAT and I will be attending Harvard Law School in September 2018. </p>
              <img className="quote-bot" src="/assets/quote-icon.png" alt="quote icon" />
            </div>

            <div className="testimonial">
              <img className="stars" src="/assets/stars-icon.png" alt="stars icon" />
              <h3 className="highlight">Scored 170 on the LSAT & Received a Full Scholarship</h3>
              <img className="quote-top" src="/assets/quote-icon.png" alt="quote icon" />
              <p>Dave was an excellent instructor and mentor during the LSAT preparation process. Thanks to his skilled instruction and helpful coaching, I received a 170 on the LSAT and a full scholarship to a Top 14 law school. In 2 months, Dave helped me add over 15 points to my score. He is an engaging and exciting teacher, whose great charisma and upbeat humor kept the class on point and working hard. I also really appreciate how he worked hard to meet and speak with each student to evaluate their individual progress and assess their strengths and weaknesses. He has a very good perception of what one's reasoning and logical flows tend to be like, and takes the time to break down each answer choice and show why you may have mistakenly chosen an answer. Finally, he really went the extra distance to make sure that his students get all their questions answered and are able to have full access to him as an instructor. He spent countless classes staying late to explain concepts to myself or my peers, and also is a quick and comprehensive replier of emails. I also am grateful that he also took the time to teach me practical test-taking skills along with the test's materials. I am very grateful that I had the chance to work with Dave, and would wholeheartedly recommend him to any student looking to make serious improvement on the LSAT.</p>
              <p>Also, I really cannot recall anything that you could have done better as a teacher. It has been a while. You really were a great instructor.</p>
              <img className="quote-bot" src="/assets/quote-icon.png" alt="quote icon" />
            </div>

            <div className="testimonial">
              <img className="stars" src="/assets/stars-icon.png" alt="stars icon" />
              <h3 className="highlight">From LSAT Prep to Yale Law</h3>
              <img className="quote-top" src="/assets/quote-icon.png" alt="quote icon" />
              <p>I will attend Yale Law School this fall because Dave taught me how to think (and write!) more like a lawyer.</p>
              <p>Dave has been my LSAT tutor since July 2016. When I began my studies with a 30th percentile diagnostic exam score, I honestly thought law school would not be for me. Over the next 11 months, Dave selflessly helped me develop the skills necessary to achieve a goal I considered impossible at the outset. Thanks to those skills, on my official June 2017 LSAT, I scored in the 97th percentile with a perfect LG and a 25/26 LR.</p>
              <p>Dave's skills encompass the entirety of the LSAT. If you struggle to read RC passages how you should, to understand how to best approach an LR stimulus, or if you are overwhelmed by how to even begin to tackle LG, Dave can help you out. If you think you're the worst test-taker in the world, or even if you know you're just too stupid to figure this test out, then Dave can help. I was afraid of LG at first, scoring -13/-14 while not making it to two whole LG on some of my very first LG sections.</p>
              <p>Dave's function as an LSAT tutor is more like the function of a "life coach" or a "test therapist" than it is the function of a traditional tutor. Dave's role as a tutor has to do with much more than just test preparation—he will show you the ways you need to think about both the test and yourself in order to succeed on test day.</p>
              <p>Dave's skills extend far beyond the LSAT, too. Without the countless hours he invested into my law school applications essays, I'm fairly certain I wouldn't have received as many acceptances as I have, and certainly not one from Yale Law School! Dave is more than just my tutor, in truth. He is my mentor, a man who I've come to trust and look up to as a first-generation student who has been more than a bit confused by the whole admissions process. Thanks for absolutely everything you did for me, Dave!</p>
              <img className="quote-bot" src="/assets/quote-icon.png" alt="quote icon" />
            </div>
          </div>
        </section>

        <section className="reddit">
          <div className="title">
            <hr></hr>
            <img src="/assets/reddit-icon.png" alt="reddit icon" />
            <h2>Reddit Testimonials</h2>
            <hr></hr>
          </div>
          <p className="reddit-p">
            I'm highly regarded on the r/LSAT recommended tutors list, and I've received countless testimonials from students who've achieved exceptional results.
          </p>
          {/* Imgur Embed */}
          <blockquote className="imgur-embed-pub" lang="en" data-id="a/ST3Jikr">
            <a href="//imgur.com/a/ST3Jikr">A Few Student Responses</a>
          </blockquote>
        </section>
      </main>
    </>
  );
};

export default Testimonials;