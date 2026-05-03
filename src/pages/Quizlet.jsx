import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Quizlet = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const zIndexValue = windowWidth <= 1024 ? 0 : 1;

  return (
    <>
      <Helmet>
        <title>LSAT Quizlet Flashcards | LSAT Academy</title>
        <meta name="description" content="Study LSAT vocabulary, logical reasoning terms, and key concepts with free Quizlet flashcard sets curated by David McMaster at LSAT Academy." />
        <link rel="canonical" href="https://www.lsat.academy/lsat-quizlet" />
        <meta property="og:title" content="LSAT Quizlet Flashcards | LSAT Academy" />
        <meta property="og:description" content="Study LSAT vocabulary, logical reasoning terms, and key concepts with free Quizlet flashcard sets curated by David McMaster at LSAT Academy." />
        <meta property="og:url" content="https://www.lsat.academy/lsat-quizlet" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="LSAT Quizlet Flashcards | LSAT Academy" />
        <meta name="twitter:description" content="Study LSAT vocabulary, logical reasoning terms, and key concepts with free Quizlet flashcard sets curated by David McMaster at LSAT Academy." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lsat.academy/" },
              { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://www.lsat.academy/resources" },
              { "@type": "ListItem", "position": 3, "name": "LSAT Quizlet", "item": "https://www.lsat.academy/lsat-quizlet" }
            ]
          }
        `}</script>
      </Helmet>
      <main className="blogs max padding spacer">
        <h1>LSAT Quizlet</h1>
        <iframe 
          src="https://quizlet.com/1029179492/match/embed?i=5ic7un&x=1jj1" 
          height="500" 
          width="100%" 
          style={{
            border: 0,
            zIndex: zIndexValue,
            position: 'relative'
          }}
        />
      </main>
    </>
  );
};

export default Quizlet;