import React, { useEffect, useState } from "react";

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

  const zIndexValue = windowWidth <= 1024 ? 0 : 9999;

  return (
    <>
      <main className="blogs max padding spacer">

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