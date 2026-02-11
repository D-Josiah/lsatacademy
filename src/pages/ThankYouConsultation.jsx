import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYouConsultation = () => {
  useEffect(() => {
    // Wait for GTM to be fully ready before pushing event
    const interval = setInterval(() => {
      if (window.dataLayer && window.dataLayer.push) {
        window.dataLayer.push({ 
          event: "consultation_scheduled" 
        });
        clearInterval(interval);
      }
    }, 50);

    // Cleanup interval after 5 seconds if GTM never loads
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --myblue: #1a3a52;
          --mylightblue: #2e5c8a;
          --bree: 'Bree Serif', serif;
          --poppins: 'Poppins', sans-serif;
        }

        .thank-you-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
          text-align: center;
      
        }

        .thank-you-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          animation: bounce 0.6s ease-in-out;
          margin-top:1rem;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .thank-you-heading {
          font-family: var(--bree);
          font-size: 2.8rem;
          font-weight: 100;
          color: var(--myblue);
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .thank-you-subheading {
          font-family: var(--poppins);
          font-size: 1.3rem;
          color: var(--mylightblue);
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .confirmation-message {
          max-width: 700px;
          margin: 0 auto 3rem;
          font-family: var(--poppins);
          font-size: 1.1rem;
          color: #333;
          line-height: 1.8;
          background-color: #f8f9fa;
          padding: 2rem;
          border-left: 4px solid var(--myblue);
          border-radius: 6px;
        }

        .next-steps {
          max-width: 800px;
          margin: 3rem auto;
          text-align: left;
        }

        .next-steps h3 {
          font-family: var(--bree);
          font-size: 1.8rem;
          color: var(--myblue);
          font-weight: 100;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background-color: var(--myblue);
          color: white;
          border-radius: 50%;
          font-family: var(--bree);
          font-size: 1.5rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .step-content h4 {
          font-family: var(--bree);
          font-size: 1.2rem;
          color: var(--myblue);
          font-weight: 100;
          margin-bottom: 0.5rem;
        }

        .step-content p {
          font-family: var(--poppins);
          font-size: 1rem;
          color: #555;
          line-height: 1.6;
          margin: 0;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 3rem;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-family: var(--poppins);
          font-weight: 500;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .cta-primary {
          background-color: var(--myblue);
          color: white;
        }

        .cta-primary:hover {
          background-color: var(--mylightblue);
          transform: scale(1.02);
        }

        .cta-secondary {
          background-color: transparent;
          color: var(--myblue);
          border: 2px solid var(--myblue);
        }

        .cta-secondary:hover {
          background-color: var(--myblue);
          color: white;
        }

        .contact-info-thanks {
          margin-top: 0rem;
          padding: 1.5rem;
          background-color: #f0f5fa;
          border-radius: 8px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-info-thanks p {
          font-family: var(--poppins);
          color: #555;
          margin: 0rem 0;
          font-size: 0.95rem;
        }

        .contact-info-thanks strong {
          color: var(--myblue);
        }

        @media (max-width: 768px) {
          .thank-you-heading {
            font-size: 2rem;
          }

          .thank-you-subheading {
            font-size: 1.1rem;
          }

          .confirmation-message {
            padding: 1.5rem;
            font-size: 1rem;
          }

          .step {
            gap: 1rem;
          }

          .step-number {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .step-content h4 {
            font-size: 1.1rem;
          }

          .step-content p {
            font-size: 0.95rem;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 1rem;
          }

          .cta-button {
            width: 100%;
          }

          .next-steps h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <main className="resources max padding">
        <div className="thank-you-container">
          <div className="thank-you-icon">✓</div>
          
          <h1 className="thank-you-heading">Thank You!</h1>
          <h2 className="thank-you-subheading">Your consultation has been scheduled</h2>

          <div className="contact-info-thanks">
            <p><strong>Have questions?</strong></p>
            <p>If you don't receive a confirmation email within 10 minutes, check your spam folder or <Link to="/contact" style={{ color: 'var(--myblue)', textDecoration: 'underline' }}>contact us directly</Link>.</p>
          </div>

          <div className="cta-buttons">
            <Link to="/" className="cta-button cta-primary">
              Back to Home
            </Link>
            <Link to="/library" className="cta-button cta-secondary">
              View Resources
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThankYouConsultation;