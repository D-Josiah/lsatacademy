import React from "react";

const GroupTutoring = () => {
  const handleSurvey = () => {
    const surveySection = document.getElementById('survey-section');
    if (surveySection) {
      surveySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlist = () => {
    window.open("https://401key.share-na2.hsforms.com/2VKwa4pA9QBGwuOOdGoAF9Q", "_blank");
  };

  const handleConsultation = () => {
    // Navigate to services page or scroll to contact
    window.location.href = "/services";
  };

  return (
    <>
      <main className="group-tutoring max padding spacer">
        

        
        <div className="group-tutoring-header">
          <hr />
          
          <h1>Complete LSAT Prep Course</h1>
        
        </div>

        <section className="class-details">
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
            <h3>Get 10% Off – Complete the Survey Before Joining the Waitlist!</h3>
            <div className="cta-buttons">
              <button onClick={handleSurvey} className="primary-btn">
                Answer Our Survey
              </button>
              <button onClick={handleWaitlist} className="primary-btn">
                Join the Waitlist
              </button>
              
            </div>
          </div>
        </section>

        <section className="schedule">
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
        </section>

        <section className="survey-section" id="survey-section">
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
        </section>
      </main>
    </>
  );
};

export default GroupTutoring;