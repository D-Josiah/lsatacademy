import React from "react";
import { Link } from "react-router-dom";

const Library = () => {
  const books = [
    {
      id: 1,
      title: "Do you really need an LSAT Tutor?",
      readingTime: "7 min read",
      image: "assets/book1.png",
      hubspotUrl: "YOUR_HUBSPOT_FORM_URL_1"
    },
    {
      id: 2,
      title: "Getting Stuck on Challenging LSAT Questions",
      readingTime: "9 min read",
      image: "assets/book2.png",
      hubspotUrl: "YOUR_HUBSPOT_FORM_URL_2"
    },
    {
      id: 3,
      title: "Some Patterns That Jump Out After 15 Years of Tutoring",
      readingTime: "12 min read",
      image: "assets/book3.png",
      hubspotUrl: "YOUR_HUBSPOT_FORM_URL_3"
    },
    {
      id: 4,
      title: "Indicator Words as Essential Fundamentals",
      readingTime: "10 min read",
      image: "assets/book4.png",
      hubspotUrl: "YOUR_HUBSPOT_FORM_URL_4"
    },
    {
      id: 5,
      title: "The ABCs of Applying to Law School",
      readingTime: "15 min read",
      image: "assets/book5.png",
      hubspotUrl: "YOUR_HUBSPOT_FORM_URL_5"
    },
    {
      id: 6,
      title: "A Simple Way to Level up Your Sufficient Assumption Approach",
      readingTime: "8 min read",
      image: "assets/book6.png",
      hubspotUrl: "YOUR_HUBSPOT_FORM_URL_6"
    }
  ];

  return (
    <>
      <main className="resources max padding spacer">
        <h1>The LSAT Academy Library</h1>
        <h2>Insights from 15 Years of LSAT Tutoring</h2>
        
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '2rem 0' }}>
          {books.map((book) => (
            <div 
              key={book.id} 
              style={{
                display: 'grid',
                gridTemplateColumns: '300px 1fr',
                gap: '2rem',
                padding: '1.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                alignItems: 'center'
              }}
            >
              <div style={{ width: '100%' }}>
                <img 
                  src={book.image} 
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '4px',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{book.title}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{book.readingTime}</p>
                <button 
                  onClick={() => window.open(book.hubspotUrl, '_blank')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '1'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Get This Book
                </button>
              </div>
            </div>
          ))}
        </section>

        <button 
          onClick={() => window.open('YOUR_MAIN_HUBSPOT_FORM_URL', '_blank')}
          style={{
            margin: '2rem auto',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Get a copy of this entire library
        </button>

        <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
        
        <div className="blog-list spacer">
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>More Resources</h3>
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