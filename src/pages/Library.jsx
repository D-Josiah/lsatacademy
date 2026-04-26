import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Library = () => {
  const books = [
    {
      id: 1,
      title: "Do you really need an LSAT Tutor?",
      readingTime: "5 min read",
      image: "https://res.cloudinary.com/derzriuel/image/upload/v1763675411/Book1_1_nzpq0w.png",
      hubspotUrl: "https://share-na2.hsforms.com/1gK7TUCTMQEa3YdoPuSIZgg401key"
    },
    {
      id: 2,
      title: "Getting Stuck on Challenging LSAT Questions",
      readingTime: "6 min read",
      image: "https://res.cloudinary.com/derzriuel/image/upload/v1763674861/book2_pbcuut.png",
      hubspotUrl: "https://share-na2.hsforms.com/1mLanP_InRRK_uLa9omukgg401key"
    },
    {
      id: 3,
      title: "Some Patterns That Jump Out After 15 Years of Tutoring",
      readingTime: "7 min read",
      image: "https://res.cloudinary.com/derzriuel/image/upload/v1763674856/book3_oxp6ef.png",
      hubspotUrl: "https://share-na2.hsforms.com/1SyZl-M_YReSFtwhmO8KwBw401key"
    },
    {
      id: 4,
      title: "Indicator Words as Essential Fundamentals",
      readingTime: "15 min read",
      image: "https://res.cloudinary.com/derzriuel/image/upload/v1763674855/book4_ozsjvb.png",
      hubspotUrl: "https://share-na2.hsforms.com/1upKxoSnoSBGUTyJpXBneVg401key"
    },
    {
      id: 5,
      title: "The ABCs of Applying to Law School",
      readingTime: "7 min read",
      image: "https://res.cloudinary.com/derzriuel/image/upload/v1763674855/book5_yxadri.png",
      hubspotUrl: "https://share-na2.hsforms.com/1K-J7cj_GS0OaKGs4KZL-xg401key"
    },
    {
      id: 6,
      title: "A Simple Way to Level up Your Sufficient Assumption Approach",
      readingTime: "8 min read",
      image: "https://res.cloudinary.com/derzriuel/image/upload/v1763675424/sufficient_assumptions_oyrk1o.png",
      hubspotUrl: "https://share-na2.hsforms.com/1IHzZS0ubSvqtxIF0qrwVnA401key"
    }
  ];

  const hubspotFormUrl = "https://share-na2.hsforms.com/11PP_9Xh8QlKHa44rbjv1kA401key";

  return (
    <>
      <Helmet>
        <title>LSAT Book Library | Best LSAT Prep Books | LSAT Academy</title>
        <meta name="description" content="Browse David McMaster's recommended LSAT prep books and study materials. Curated list of the best resources to help you prepare for the LSAT effectively." />
        <link rel="canonical" href="https://www.lsat.academy/library" />
        <meta property="og:title" content="LSAT Book Library | Best LSAT Prep Books | LSAT Academy" />
        <meta property="og:description" content="Browse David McMaster's recommended LSAT prep books and study materials. Curated list of the best resources to help you prepare for the LSAT effectively." />
        <meta property="og:url" content="https://www.lsat.academy/library" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="LSAT Book Library | Best LSAT Prep Books | LSAT Academy" />
        <meta name="twitter:description" content="Browse David McMaster's recommended LSAT prep books and study materials. Curated list of the best resources to help you prepare for the LSAT effectively." />
      </Helmet>
      <style>{`
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

        .pattern-intro {
          margin-bottom: 1.5rem;
          line-height: 1.6;
          color: #f0f0f0;
          font-size: 1.1rem;
          font-family: var(--poppins);
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

        .pattern-cta {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 400;
          color: #ffffff;
          font-size: 1rem;
          line-height: 1.7;
          font-family: var(--poppins);
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          margin: 3rem auto;
          max-width: 1200px;
          padding: 0 2rem;
        }

        .book-card {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          border: 2px solid var(--mylightblue);
          border-radius: 10px;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          background-color: #ffffff;
        }

        .book-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(30, 60, 114, 0.15);
          border-color: var(--myblue);
        }

        .book-image {
          width: 100%;
          height: auto;
          border-radius: 6px;
          object-fit: cover;
          margin-bottom: 1.5rem;
        }

        .book-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .book-title {
          margin-bottom: 0.75rem;
          font-size: 1.3rem;
          font-family: var(--bree);
          color: var(--myblue);
          font-weight: 100;
          line-height: 1.4;
        }

        .book-reading-time {
          color: #888;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          font-family: var(--poppins);
          font-size: 0.95rem;
        }

        .book-button {
          padding: 0.75rem 1.5rem;
          background-color: var(--myblue);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-family: var(--poppins);
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .book-button:hover {
          background-color: var(--mylightblue);
          transform: scale(1.02);
        }

        .library-button {
          margin: 2.5rem auto;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          background-color: var(--myblue);
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          width: 100%;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          font-family: var(--poppins);
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .library-button:hover {
          background-color: var(--mylightblue);
          transform: scale(1.02);
        }

        @media (max-width: 768px) {
          .books-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1rem;
            margin: 2rem auto;
          }

          .pattern-section {
            padding: 2rem 1.5rem;
            margin: 2rem 1rem;
          }

          .pattern-section h3 {
            font-size: 1.6rem;
          }

          .pattern-intro {
            font-size: 1rem;
          }
          
          .pattern-list {
            max-width: 100%;
          }

          .pattern-list li {
            padding-left: 1.25rem;
            font-size: 0.95rem;
          }

          .pattern-cta {
            font-size: 0.95rem;
          }

          .book-title {
            font-size: 1.1rem;
          }

          .library-button {
            max-width: 90%;
          }
        }
      `}</style>

      <main className="resources max padding spacer">
        <h1>The LSAT Academy Library</h1>
        <h3 style={{ textAlign: 'center' }}>Insights from 15 Years of LSAT Tutoring</h3>
        
        <div className="pattern-section">
          <h3>Are you one of these students?</h3>
          
          <ul className="pattern-list">
            <li>stuck in the 150s–160s with scores that won't move</li>
            <li>drowning in books, videos, Reddit advice, and scattered LSAT tips</li>
            <li>drilling a ton but still not understanding why answers are right or wrong</li>
            <li>struggling to identify premises, conclusions, or assumptions</li>
            <li>RC feeling overwhelming and LR feeling inconsistent</li>
            <li>running out of time or second-guessing everything</li>
            <li>feeling smart in school but frustrated by the LSAT</li>
            <li>no real plan, no clarity, and no one to tell you what's actually wrong</li>
          </ul>
          
          <p className="pattern-cta">
            If that feels familiar, what you need isn't "more noise", you need clarity and a method.<br />
            Download the LSAT guides below for insights pulled from 15 years of real tutoring,<br />
            designed to help you reset your approach and finally move your score forward.
          </p>
        </div>
        
        <section className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img 
                src={book.image} 
                alt={book.title}
                className="book-image"
              />
              <div className="book-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-reading-time">{book.readingTime}</p>
                <button 
                  onClick={() => {
                    window.dataLayer.push({ event: "book_download_click" });
                    window.open(book.hubspotUrl, "_blank");
                  }}
                  className="book-button"
                >
                  Get This Book
                </button>
              </div>
            </div>
          ))}
        </section>

        <button 
          onClick={() => {
            window.dataLayer.push({ event: "book_download_click" });
            window.open(hubspotFormUrl, "_blank");
          }}
          className="library-button"
        >
          Get a copy of this Entire Library
        </button>

        <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
        
        
        <div className="blog-list spacer">
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>More Resources</h3>

          <div className="resource">
            <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/lsat-explained" className="resource-link">
              The LSAT Explained Clearly
            </Link>
          </div>
          
          <div className="resource">
            <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/lsat-quizlet" className="resource-link">
              LSAT Quizlet
            </Link>
          </div>
          
          <div className="resource">
            <img src="assets/redirect-icon.png" alt="redirect icon" className="redirect" />
            <Link to="/lsat-answer" className="resource-link">
              Send David an LSAT Inquiry
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Library;