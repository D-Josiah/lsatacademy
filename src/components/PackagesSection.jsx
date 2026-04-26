import React from "react";

const packages = [
  {
    id: "single",
    label: "Single Session",
    hours: 1,
    ratePerHour: 85,
    discount: 0,
    badge: null,
    featured: false,
    description: "Perfect for targeted help on a specific section or concept. No commitment required.",
    payUrl: "https://square.link/u/3zi3tGBA",
  },
  {
    id: "ten",
    label: "10-Hour Package",
    hours: 10,
    ratePerHour: 85,
    discount: 0.05,
    badge: "5% OFF",
    featured: false,
    description: "Ideal for building strong fundamentals across key LSAT topics over multiple sessions.",
    payUrl: "https://square.link/u/RJlVLHVw",
  },
  {
    id: "twenty",
    label: "20-Hour Package",
    hours: 20,
    ratePerHour: 85,
    discount: 0.15,
    badge: "BEST VALUE · 15% OFF",
    featured: true,
    description: "Full prep coverage — from fundamentals through timed practice and strategy refinement.",
    payUrl: "https://square.link/u/1QubsUHI",
  },
];

const fmt = (n) => {
  const fixed = parseFloat(n.toFixed(2));
  return Number.isInteger(fixed) ? `$${fixed}` : `$${fixed.toFixed(2)}`;
};

const PackagesSection = ({ heading = "Tutoring Packages", subheading = "1-on-1 sessions with David McMaster, tailored to your goals and schedule." }) => {
  return (
    <>
      <style>{`
        .pay-page {
          font-family: 'Poppins', sans-serif;
          color: #023247;
          background-color: #EFF2F6;
          width: 100%;
          max-width: 1600px;
          padding: 60px 4rem 80px;
          margin: 0 auto;
        }
        .pay-page *, .pay-page *::before, .pay-page *::after { box-sizing: border-box; }

        .pay-header { text-align: center; margin-bottom: 56px; }
        .pay-header h2 {
          font-family: 'Bree Serif', serif;
          font-size: 3.1rem;
          margin: 0 0 14px;
          line-height: 1.1;
        }
        .pay-header p {
          font-size: 1.05rem;
          max-width: 500px;
          margin: 0 auto;
          opacity: 0.65;
          line-height: 1.7;
        }
        .pay-header hr {
          border: none;
          border-top: 2px solid #023247;
          opacity: 0.12;
          margin: 28px auto 0;
          width: 60px;
        }

        .pay-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: end;
          max-width: 1000px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .pay-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
          .pay-card.featured { transform: none !important; }
          .pay-card.featured:hover { transform: translateY(-8px) !important; }
        }

        @media (max-width: 768px) {
          .pay-page { padding: 40px 1.3rem 60px; }
          .pay-header h2 { font-size: 2.2rem; }
        }

        .pay-card {
          background: #fff;
          border-radius: 24px;
          padding: 40px 32px 36px;
          display: flex;
          flex-direction: column;
          border: 2px solid transparent;
          box-shadow: 0 2px 20px rgba(2,50,71,0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
        }
        .pay-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(2,50,71,0.14);
          border-color: #2A8E9E;
        }

        .pay-card.featured {
          background: #023247;
          color: #fff;
          padding-top: 56px;
          transform: translateY(-16px);
          box-shadow: 0 20px 56px rgba(2,50,71,0.28);
        }
        .pay-card.featured:hover {
          transform: translateY(-24px);
          box-shadow: 0 28px 64px rgba(2,50,71,0.35);
          border-color: #2A8E9E;
        }
        .pay-card.featured .card-eyebrow,
        .pay-card.featured .card-desc,
        .pay-card.featured .price-sub,
        .pay-card.featured .price-original { color: #fff; opacity: 0.6; }
        .pay-card.featured .price-amount,
        .pay-card.featured .card-title { color: #fff; }
        .pay-card.featured .price-unit { color: rgba(255,255,255,0.5); }
        .pay-card.featured .card-divider { border-color: rgba(255,255,255,0.15); }

        .card-badge {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          background: #2A8E9E;
          color: #fff;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 0 0 14px 14px;
          white-space: nowrap;
        }
        .pay-card:not(.featured) .card-badge {
          background: linear-gradient(to right, #023247, #0a4d6e);
          top: 20px;
          left: auto;
          right: 20px;
          transform: none;
          border-radius: 50px;
          font-size: 0.62rem;
          padding: 4px 12px;
        }

        .card-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.4;
          margin-bottom: 8px;
        }
        .card-title {
          font-family: 'Bree Serif', serif;
          font-size: 1.65rem;
          margin: 0 0 24px;
          line-height: 1.2;
        }

        .price-block { margin-bottom: 26px; }
        .price-row { display: flex; align-items: baseline; gap: 6px; }
        .price-amount { font-size: 3rem; font-weight: 700; color: #023247; line-height: 1; }
        .price-unit { font-size: 1rem; font-weight: 500; color: #023247; opacity: 0.45; }
        .price-sub { font-size: 0.82rem; opacity: 0.5; margin-top: 7px; line-height: 1.5; }
        .price-original { font-size: 0.82rem; opacity: 0.45; margin-top: 3px; text-decoration: line-through; }
        .price-savings {
          display: inline-flex;
          align-items: center;
          margin-top: 10px;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .pay-card:not(.featured) .price-savings { background: rgba(42,142,158,0.12); color: #2A8E9E; }
        .pay-card.featured .price-savings { background: rgba(255,255,255,0.15); color: #fff; }

        .card-divider { border: none; border-top: 1px solid rgba(2,50,71,0.1); margin: 0 0 22px; }

        .pay-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 2.75rem;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        }
        .pay-card:not(.featured) .pay-btn { background: linear-gradient(to right, #023247, #0a4d6e); color: #fff; }
        .pay-card:not(.featured) .pay-btn:hover {
          background: linear-gradient(to right, #0a4d6e, #1a7a9a);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.2);
        }
        .pay-card.featured .pay-btn { background: #fff; color: #023247; }
        .pay-card.featured .pay-btn:hover {
          background: #EFF2F6;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
        }
        .pay-btn:active { transform: scale(0.97) translateY(1px) !important; box-shadow: none; }

        .pay-footer {
          text-align: center;
          margin-top: 52px;
          font-size: 0.8rem;
          opacity: 0.4;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }
      `}</style>

      <section className="pay-page">
        <div className="pay-header">
          <h2>{heading}</h2>
          <p>{subheading}</p>
          <hr />
        </div>

        <div className="pay-grid">
          {packages.map((pkg) => {
            const original = pkg.hours * pkg.ratePerHour;
            const total    = original * (1 - pkg.discount);
            const savings  = original - total;
            const perHour  = total / pkg.hours;

            return (
              <div key={pkg.id} className={`pay-card${pkg.featured ? " featured" : ""}`}>
                {pkg.badge && <div className="card-badge">{pkg.badge}</div>}

                <div className="card-eyebrow">{pkg.hours} {pkg.hours === 1 ? "Hour" : "Hours"}</div>
                <h3 className="card-title">{pkg.label}</h3>

                <div className="price-block">
                  <div className="price-row">
                    <span className="price-amount">{fmt(total)}</span>
                    <span className="price-unit">{pkg.hours === 1 ? "/ hr" : "total"}</span>
                  </div>

                  {pkg.hours > 1 && (
                    <>
                      <div className="price-sub">{fmt(perHour)}/hr · billed as one payment</div>
                      <div className="price-original">Regular price: {fmt(original)}</div>
                    </>
                  )}

                  {pkg.hours === 1 && (
                    <div className="price-sub">No commitment · pay per session</div>
                  )}

                  {savings > 0 && (
                    <div className="price-savings">You save {fmt(savings)}</div>
                  )}
                </div>

                <hr className="card-divider" />

                <a
                  href={pkg.payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pay-btn"
                >
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pay Now
                </a>
              </div>
            );
          })}
        </div>

        <p className="pay-footer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          Secure checkout powered by Square · Your card details are never stored on our servers
        </p>
      </section>
    </>
  );
};

export default PackagesSection;
