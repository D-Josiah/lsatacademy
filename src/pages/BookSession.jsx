import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const BookSession = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // The calendar is the whole point of this page, so load Calendly immediately
  // (no scroll-based lazy load like /consultation).
  useEffect(() => {
    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;

    calendlyScript.onload = () => {
      setCalendlyLoaded(true);
    };

    document.body.appendChild(calendlyScript);

    return () => {
      if (calendlyScript.parentNode) {
        calendlyScript.parentNode.removeChild(calendlyScript);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Book Your LSAT Package Session | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="consultation max padding spacer">
        <h1 style={{
          fontFamily: 'var(--bree)',
          textAlign: 'center',
          fontSize: '2.8rem',
          fontWeight: 100,
          color: 'var(--myblue)',
          lineHeight: 1.3
        }}>Book Your Package Session</h1>

        <p style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '1rem auto 0',
          color: '#555',
          fontSize: '1.05rem',
          lineHeight: 1.6
        }}>
          Already purchased a tutoring package? Pick a time below to schedule
          your next session with David.
        </p>

        <h3 style={{ marginTop: '40px', textAlign: 'center' }}>Pick a Time That Works for You</h3>

        {/* Calendly Widget - Package Session */}
        <div style={{ position: 'relative', minHeight: '700px' }} id="package-session">
          {!calendlyLoaded && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '700px',
              backgroundColor: '#f5f7fa',
              borderRadius: '8px',
              gap: '20px'
            }}>
              {/* Skeleton loader */}
              <div style={{ width: '80%', maxWidth: '500px' }}>
                <div style={{ height: '40px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '16px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '20px', backgroundColor: '#e2e8f0', borderRadius: '6px', marginBottom: '12px', width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ height: '80px', backgroundColor: '#e2e8f0', borderRadius: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  ))}
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Loading calendar...</p>
              <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
            </div>
          )}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/dave-mcmaster/lsat-package-session?text_color=023247&primary_color=023247"
            style={{
              minWidth: "320px",
              height: "700px",
              display: calendlyLoaded ? 'block' : 'none'
            }}
          />
        </div>
      </main>
    </>
  );
};

export default BookSession;
