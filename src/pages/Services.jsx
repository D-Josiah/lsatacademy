import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PackagesSection from "../components/PackagesSection";

const FREE_CONSULT_URL = "https://calendly.com/dave-mcmaster/free-lsat-consultation";
const PRIVATE_TUTORING_URL = "https://calendly.com/dave-mcmaster/private-lsat-tutoring";
const WAITLIST_URL = "https://401key.share-na2.hsforms.com/2VKwa4pA9QBGwuOOdGoAF9Q";

/* ---------- HERO ---------- */

const heroStyles = {
  wrap: {
    background: "var(--cream-100)",
    padding: "120px 0 80px",
    position: "relative",
    overflow: "hidden",
  },
  grain: {
    position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none",
    backgroundImage:
      "radial-gradient(circle at 20% 80%, rgba(42,142,158,0.08), transparent 50%), radial-gradient(circle at 90% 10%, rgba(2,50,71,0.06), transparent 60%)",
  },
  inner: { position: "relative", maxWidth: 980 },
  eyebrowRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "var(--teal-500)" },
  h1: { color: "var(--navy-900)", marginBottom: 20 },
  sub: { fontSize: 19, color: "var(--ink-700)", maxWidth: 720, lineHeight: 1.5 },
};

const ServicesHero = () => (
  <section style={heroStyles.wrap}>
    <div style={heroStyles.grain} />
    <div className="container" style={{ position: "relative" }}>
      <div style={heroStyles.inner}>
        <div style={heroStyles.eyebrowRow}>
          <span style={heroStyles.dot} />
          <span className="eyebrow eyebrow-teal">Services & Pricing</span>
        </div>
        <h1 style={heroStyles.h1}>
          Personalized LSAT prep,{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
            built around you.
          </span>
        </h1>
        <p style={heroStyles.sub}>
          1-on-1 sessions, packaged hours with a discount, or a free consultation to see if working
          together makes sense.
        </p>
      </div>
    </div>
  </section>
);

/* ---------- SERVICE CARDS (matches Home prototype) ---------- */

const svcStyles = {
  wrap: {
    background: "linear-gradient(to right, #045573, #1092c5)",
    color: "#fff",
    padding: "110px 0 120px",
    position: "relative",
    overflow: "hidden",
  },
  bgDots: {
    position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none",
    backgroundImage: "radial-gradient(circle, #3fd1c0 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  },
  head: { textAlign: "center", marginBottom: 72, position: "relative" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, position: "relative" },
  card: (featured) => ({
    background: featured ? "#ffffff" : "rgba(255,255,255,0.08)",
    border: featured ? "none" : "1px solid rgba(255,255,255,0.18)",
    borderRadius: 20,
    padding: 32,
    display: "flex", flexDirection: "column", gap: 20,
    color: featured ? "var(--navy-900)" : "#fff",
    position: "relative",
    transform: featured ? "translateY(-20px)" : "none",
    boxShadow: featured ? "0 30px 60px -20px rgba(0,0,0,0.35)" : "none",
  }),
  cardTag: (featured) => ({
    position: "absolute", top: -12, right: 24,
    background: featured ? "var(--teal-500)" : "rgba(255,255,255,0.15)",
    color: "#fff",
    fontFamily: "var(--font-mono)",
    fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em",
    padding: "6px 12px", borderRadius: 999, fontWeight: 600,
  }),
  cardIcon: (featured) => ({
    width: 48, height: 48, borderRadius: 12,
    background: featured ? "var(--teal-500)" : "rgba(255,255,255,0.18)",
    color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
  }),
  cardTitle: { fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 },
  cardSub: (featured) => ({
    fontSize: 14,
    color: featured ? "var(--ink-700)" : "rgba(255,255,255,0.85)",
    lineHeight: 1.55,
  }),
  cardPrice: { display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 },
  cardPriceNum: { fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1, letterSpacing: "-0.01em" },
  cardPriceUnit: { fontSize: 14, opacity: 0.7 },
  bullets: { listStyle: "none", padding: 0, margin: "8px 0", display: "flex", flexDirection: "column", gap: 10 },
  bullet: (featured) => ({
    display: "flex", alignItems: "flex-start", gap: 10,
    fontSize: 14, color: featured ? "var(--ink-700)" : "rgba(255,255,255,0.9)",
  }),
  bulletDot: (featured) => ({
    width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
    background: featured ? "var(--teal-500)" : "rgba(255,255,255,0.25)",
    color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
  }),
  cardBtn: (featured) => ({
    marginTop: "auto",
    padding: "13px 20px", borderRadius: 999,
    background: featured ? "var(--navy-900)" : "#fff",
    color: featured ? "#fff" : "var(--navy-900)",
    border: "none",
    fontWeight: 600, fontSize: 14,
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    cursor: "pointer",
  }),
};

const ServiceCards = ({ onScrollPackages, onScrollSurvey }) => (
  <section style={svcStyles.wrap}>
    <div style={svcStyles.bgDots} />
    <div className="container">
      <div style={svcStyles.head}>
        <div className="eyebrow eyebrow-light" style={{ marginBottom: 16 }}>Three paths</div>
        <h2 style={{ color: "#fff" }}>
          Pick the one that{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-300)", fontWeight: 400 }}>
            fits you.
          </span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 16, fontSize: 17, maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
          From a no-pressure intro call to a full 20-hour engagement.
        </p>
      </div>

      <div style={svcStyles.grid} className="services-grid">
        <div style={svcStyles.card(false)}>
          <div style={svcStyles.cardTag(false)}>Free</div>
          <div style={svcStyles.cardIcon(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={svcStyles.cardTitle}>One-Time Free Consultation</div>
          <p style={svcStyles.cardSub(false)}>
            A 1-hour call to answer questions, discuss your goals, and see if working together makes sense.
          </p>
          <ul style={svcStyles.bullets}>
            <li style={svcStyles.bullet(false)}>
              <span style={svcStyles.bulletDot(false)}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              Honest score-goal assessment
            </li>
            <li style={svcStyles.bullet(false)}>
              <span style={svcStyles.bulletDot(false)}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              No commitment, no upsell
            </li>
          </ul>
          <div style={svcStyles.cardPrice}>
            <div style={svcStyles.cardPriceNum}>$0</div>
            <div style={svcStyles.cardPriceUnit}>1 hour</div>
          </div>
          <button
            style={svcStyles.cardBtn(false)}
            onClick={() => window.open(FREE_CONSULT_URL, "_blank")}
          >
            Book a call
          </button>
        </div>

        <div style={svcStyles.card(true)}>
          <div style={svcStyles.cardTag(true)}>Most Popular</div>
          <div style={svcStyles.cardIcon(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div style={svcStyles.cardTitle}>1-on-1 Private Tutoring</div>
          <p style={svcStyles.cardSub(true)}>
            Personalized, focused sessions tailored to your strengths and weaknesses.
          </p>
          <ul style={svcStyles.bullets}>
            <li style={svcStyles.bullet(true)}>
              <span style={svcStyles.bulletDot(true)}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              5% off 10-hour package
            </li>
            <li style={svcStyles.bullet(true)}>
              <span style={svcStyles.bulletDot(true)}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              15% off 20-hour package
            </li>
          </ul>
          <div style={svcStyles.cardPrice}>
            <div style={svcStyles.cardPriceNum}>$85</div>
            <div style={svcStyles.cardPriceUnit}>per hour</div>
          </div>
          <button style={svcStyles.cardBtn(true)} onClick={onScrollPackages}>
            View packages
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>

        <div style={svcStyles.card(false)}>
          <div style={{
            ...svcStyles.cardTag(false),
            background: "rgba(255,180,80,0.2)",
            color: "#ffd49a",
            border: "1px solid rgba(255,180,80,0.4)",
          }}>On Hold</div>
          <div style={svcStyles.cardIcon(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div style={svcStyles.cardTitle}>Group Tutoring</div>
          <p style={svcStyles.cardSub(false)}>
            10 sessions, 3–4 hours each. Affordable, collaborative, and structured around your goals.
          </p>
          <div style={{
            background: "rgba(255,180,80,0.1)",
            border: "1px solid rgba(255,180,80,0.3)",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            color: "#ffd49a",
            lineHeight: 1.5,
          }}>
            <strong style={{ color: "#ffe3bd" }}>Currently on hold.</strong> Survey & waitlist still open.
          </div>
          <ul style={svcStyles.bullets}>
            <li style={svcStyles.bullet(false)}>
              <span style={svcStyles.bulletDot(false)}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              Survey-driven pricing
            </li>
            <li style={svcStyles.bullet(false)}>
              <span style={svcStyles.bulletDot(false)}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              10% off for early signups
            </li>
          </ul>
          <div style={svcStyles.cardPrice}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1, letterSpacing: "-0.01em" }}>Waitlist</div>
          </div>
          <button style={svcStyles.cardBtn(false)} onClick={onScrollSurvey}>
            Answer survey
          </button>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- PACKAGES WRAPPER ---------- */

const PackagesWrap = () => (
  <section
    id="packages"
    style={{
      background: "var(--cream-100)",
      paddingTop: 80,
      paddingBottom: 80,
    }}
  >
    <div className="container">
      <PackagesSection />
    </div>
  </section>
);

/* ---------- CALENDLY ---------- */

const calendlyStyles = {
  wrap: { background: "#fff", padding: "120px 0" },
  head: { textAlign: "center", marginBottom: 56 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 },
  card: {
    background: "#fff",
    border: "1px solid var(--ink-200)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    boxShadow: "var(--shadow-card)",
  },
  cardHead: {
    padding: "20px 28px",
    borderBottom: "1px solid var(--ink-200)",
    background: "var(--cream-50)",
  },
  cardEyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "var(--teal-500)",
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    color: "var(--navy-900)",
    fontWeight: 400,
    letterSpacing: "-0.01em",
  },
};

const CalendlyEmbeds = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [calendlyVisible, setCalendlyVisible] = useState(false);
  const calendlyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCalendlyVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    if (calendlyRef.current) observer.observe(calendlyRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!calendlyVisible) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [calendlyVisible]);

  const placeholder = (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "700px",
      backgroundColor: "var(--cream-50)",
      gap: "20px",
    }}>
      <p style={{ color: "var(--ink-400)", fontSize: "0.95rem" }}>Loading calendar...</p>
    </div>
  );

  return (
    <section style={calendlyStyles.wrap} ref={calendlyRef}>
      <div className="container">
        <div style={calendlyStyles.head}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Schedule</div>
          <h2>
            Pick a time that{" "}
            <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
              works for you.
            </span>
          </h2>
        </div>

        <div style={calendlyStyles.grid} className="surveys-grid">
          <div style={calendlyStyles.card} id="free-consultation">
            <div style={calendlyStyles.cardHead}>
              <div style={calendlyStyles.cardEyebrow}>Free</div>
              <div style={calendlyStyles.cardTitle}>One-time consultation</div>
            </div>
            {!calendlyVisible || !calendlyLoaded ? placeholder : null}
            {calendlyVisible && (
              <div
                className="calendly-inline-widget"
                data-url={`${FREE_CONSULT_URL}?text_color=023247&primary_color=023247`}
                style={{ minWidth: "320px", height: "700px", display: calendlyLoaded ? "block" : "none" }}
              />
            )}
          </div>

          <div style={calendlyStyles.card}>
            <div style={calendlyStyles.cardHead}>
              <div style={calendlyStyles.cardEyebrow}>Paid</div>
              <div style={calendlyStyles.cardTitle}>1-on-1 private tutoring</div>
            </div>
            {!calendlyVisible || !calendlyLoaded ? placeholder : null}
            {calendlyVisible && (
              <div
                className="calendly-inline-widget"
                data-url={`${PRIVATE_TUTORING_URL}?text_color=023247&primary_color=023247`}
                style={{ minWidth: "320px", height: "700px", display: calendlyLoaded ? "block" : "none" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- GROUP TUTORING ---------- */

const groupStyles = {
  wrap: { background: "var(--cream-100)", padding: "120px 0" },
  head: { textAlign: "center", marginBottom: 56, maxWidth: 760, margin: "0 auto 56px" },
  detailsGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
    marginBottom: 80,
  },
  detailsCard: {
    background: "#fff",
    border: "1px solid var(--ink-200)",
    borderRadius: "var(--radius-lg)",
    padding: 36,
  },
  detailsTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 24,
    color: "var(--navy-900)",
    fontWeight: 400,
    marginBottom: 24,
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottom: "1px solid var(--ink-100)",
  },
  infoLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "var(--ink-500)",
  },
  infoValue: { fontSize: 16, color: "var(--navy-900)", fontWeight: 500 },
  cta: {
    background: "linear-gradient(135deg, var(--navy-900), var(--navy-700))",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-lg)",
    padding: 36,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  ctaTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 24,
    color: "#fff",
    fontWeight: 400,
    lineHeight: 1.25,
  },
  ctaText: { fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.55 },
  ctaButtons: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: "auto" },
};

const sessions = [
  { n: "01", items: ["1.1 Addressing arguments, question stems, and an overview of EVERY Question Stem type", "1.2 Structural Reading and the 3 Types of RC MBT questions"] },
  { n: "02", items: ["2.1 Main Conclusions and Argument Parts", "2.2 Conditional Reasoning and what Must Be True"] },
  { n: "03", items: ["3.1 Reading for Structure: Science", "3.2 Indicator word quiz; Causal Reasoning and Weakening Arguments"] },
  { n: "04", items: ["Review of Diagnostic 2"] },
  { n: "05", items: ["5.1 Reasoning by Similarity; Assumptions and Strengthening Arguments", "5.2 Reading for Author's Intent: Diversity Passages"] },
  { n: "06", items: ["6.1 Paradoxes and Principles", "6.2 Reading without needing to understand: Science"] },
  { n: "07", items: ["7.1 Method of Reasoning and Flaw questions", "7.2 Parallel Reasoning and Parallel Flaw"] },
  { n: "08", items: ["Review of Diagnostic 3"] },
  { n: "09", items: ["9.1 Reading Comprehension without a Main Point", "9.2 Evaluate Questions and Anomalous Question Types"] },
  { n: "10", items: ["10.1 Final Recap of all Concepts and Strategies", "10.2 Trial Run: In-class timed LR section and full section review"] },
];

const sessionStyles = {
  wrap: { marginBottom: 80 },
  head: { marginBottom: 32 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid var(--ink-200)",
    borderRadius: "var(--radius-md)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cardNum: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--teal-500)",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    color: "var(--navy-900)",
    fontWeight: 400,
  },
  cardItem: {
    fontSize: 14,
    color: "var(--ink-700)",
    lineHeight: 1.55,
    paddingTop: 10,
    borderTop: "1px solid var(--ink-100)",
  },
};

const surveyStyles = {
  wrap: {
    background: "#fff",
    border: "1px solid var(--ink-200)",
    borderRadius: "var(--radius-lg)",
    padding: 40,
  },
  head: { textAlign: "center", marginBottom: 28 },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: 28,
    color: "var(--navy-900)",
    fontWeight: 400,
    marginBottom: 12,
  },
  iframe: {
    width: "100%",
    height: 800,
    border: "none",
    borderRadius: "var(--radius-md)",
  },
};

const GroupTutoring = ({ surveyRef }) => (
  <section style={groupStyles.wrap}>
    <div className="container">
      <div style={groupStyles.head}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 16px",
          borderRadius: 999,
          background: "rgba(255,180,80,0.15)",
          border: "1px solid rgba(255,180,80,0.4)",
          color: "#b8801f",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          fontWeight: 600,
          marginBottom: 20,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          On Hold · 2026 Group Cohort
        </div>
        <h2>
          Group tutoring,{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
            built with you in mind.
          </span>
        </h2>
        <p style={{ marginTop: 16, fontSize: 17, color: "var(--ink-700)", lineHeight: 1.55 }}>
          The program is currently <strong>on hold</strong> while we finalize 2026 details. Help shape it
          by answering the survey, and join the waitlist for priority enrollment when we reopen.
        </p>
      </div>

      <div style={groupStyles.detailsGrid} className="surveys-grid">
        <div style={groupStyles.detailsCard}>
          <div style={groupStyles.detailsTitle}>Program details</div>
          <div style={groupStyles.infoItem}>
            <div style={groupStyles.infoLabel}>Format</div>
            <div style={groupStyles.infoValue}>10 sessions, 3–4 hours each</div>
          </div>
          <div style={groupStyles.infoItem}>
            <div style={groupStyles.infoLabel}>Delivery</div>
            <div style={groupStyles.infoValue}>Virtual sessions</div>
          </div>
          <div style={groupStyles.infoItem}>
            <div style={groupStyles.infoLabel}>Pricing</div>
            <div style={groupStyles.infoValue}>Survey-driven · tell us what works</div>
          </div>
          <div style={{ ...groupStyles.infoItem, borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
            <div style={groupStyles.infoLabel}>Tutor</div>
            <div style={groupStyles.infoValue}>David McMaster</div>
          </div>
        </div>

        <div style={groupStyles.cta}>
          <div className="eyebrow eyebrow-light" style={{ marginBottom: 4 }}>2026 Course in development</div>
          <div style={groupStyles.ctaTitle}>Secure your spot. Get 10% off when enrollment opens.</div>
          <div style={groupStyles.ctaText}>
            Survey and waitlist participants get priority notification and an early-signup discount when we launch.
          </div>
          <div style={groupStyles.ctaButtons}>
            <button
              className="btn btn-primary"
              style={{ background: "#fff", color: "var(--navy-900)", boxShadow: "none" }}
              onClick={() => {
                if (surveyRef.current) surveyRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Answer survey
            </button>
            <a className="btn btn-ghost-light" href={WAITLIST_URL} target="_blank" rel="noopener noreferrer">
              Join the waitlist
            </a>
          </div>
        </div>
      </div>

      <div style={sessionStyles.wrap}>
        <div style={sessionStyles.head}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Curriculum</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--navy-900)", fontWeight: 400 }}>
            What you&rsquo;ll cover.
          </h3>
        </div>
        <div style={sessionStyles.grid}>
          {sessions.map((s) => (
            <div key={s.n} style={sessionStyles.card}>
              <div style={sessionStyles.cardNum}>Session {s.n}</div>
              {s.items.map((it, i) => (
                <div key={i} style={sessionStyles.cardItem}>{it}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div ref={surveyRef} id="survey-section" style={surveyStyles.wrap}>
        <div style={surveyStyles.head}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Quick survey</div>
          <div style={surveyStyles.title}>Help us tailor this program for you.</div>
          <p style={{ color: "var(--ink-700)", maxWidth: 540, margin: "0 auto", lineHeight: 1.55 }}>
            A few minutes. Your input shapes pricing, schedule, and content.
          </p>
        </div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSds0KDUWt6TgNqa7yT3eceGWor1xwApMs_T6SCnPFiXzOnbEw/viewform?embedded=true"
          style={surveyStyles.iframe}
          title="Group Tutoring Survey"
        >
          Loading…
        </iframe>
      </div>
    </div>
  </section>
);

/* ---------- BOTTOM CTA ---------- */

const ctaStyles = {
  wrap: {
    padding: "120px 0",
    background: "linear-gradient(to right, #045573, #1092c5)",
    color: "#fff",
  },
  inner: { maxWidth: 780, margin: "0 auto", textAlign: "center" },
  h2: { color: "#fff", marginBottom: 20 },
  sub: { fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.55, marginBottom: 36 },
  ctaRow: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" },
};

const BottomCTA = () => (
  <section style={ctaStyles.wrap}>
    <div className="container">
      <div style={ctaStyles.inner}>
        <div className="eyebrow eyebrow-light" style={{ marginBottom: 16 }}>Have a question?</div>
        <h2 style={ctaStyles.h2}>
          Not sure which path is{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-300)", fontWeight: 400 }}>
            right for you?
          </span>
        </h2>
        <p style={ctaStyles.sub}>
          Send a note from the contact form on the home page, or grab a free 1-hour consultation slot
          and we&rsquo;ll talk it through directly.
        </p>
        <div style={ctaStyles.ctaRow}>
          <a className="btn btn-primary" href={FREE_CONSULT_URL} target="_blank" rel="noopener noreferrer">
            Book free consultation
          </a>
          <Link className="btn btn-ghost-light" to="/#contact">Contact David</Link>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- PAGE ---------- */

const Services = () => {
  const surveyRef = useRef(null);
  const packagesRef = useRef(null);

  const scrollToPackages = () => {
    const el = document.getElementById("packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSurvey = () => {
    if (surveyRef.current) surveyRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="v2">
      <Helmet>
        <title>LSAT Tutoring Services & Pricing | LSAT Academy</title>
        <meta name="description" content="Explore LSAT tutoring options with David McMaster. Private 1-on-1 sessions at $85/hr, discounted 10 and 20-hour packages, group tutoring, and a free consultation." />
        <link rel="canonical" href="https://www.lsat.academy/services" />
        <meta property="og:title" content="LSAT Tutoring Services & Pricing | LSAT Academy" />
        <meta property="og:description" content="Private 1-on-1 LSAT tutoring at $85/hr, discounted 10 and 20-hour packages, group tutoring, and a free consultation with David McMaster." />
        <meta property="og:url" content="https://www.lsat.academy/services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lsat.academy/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.lsat.academy/services" }
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Private LSAT Tutoring",
            "description": "1-on-1 LSAT tutoring with David McMaster, a 99th percentile tutor with 15+ years of experience. Personalized strategies, flexible scheduling, and discounted multi-hour packages.",
            "url": "https://www.lsat.academy/services",
            "provider": { "@id": "https://www.lsat.academy/#organization" },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "instructor": {
                "@type": "Person",
                "name": "David McMaster",
                "url": "https://www.lsat.academy/about"
              }
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Hourly Private LSAT Tutoring",
                "price": "85",
                "priceCurrency": "USD",
                "url": "https://www.lsat.academy/services",
                "category": "Paid"
              },
              {
                "@type": "Offer",
                "name": "10-hour Package",
                "url": "https://www.lsat.academy/services",
                "category": "Paid",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "name": "20-hour Package",
                "url": "https://www.lsat.academy/services",
                "category": "Paid",
                "priceCurrency": "USD"
              }
            ]
          }
        `}</script>
      </Helmet>
      <ServicesHero />
      <ServiceCards onScrollPackages={scrollToPackages} onScrollSurvey={scrollToSurvey} />
      <PackagesWrap />
      <CalendlyEmbeds />
      <GroupTutoring surveyRef={surveyRef} />
      <BottomCTA />
    </div>
  );
};

export default Services;
