import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Img from "../components/Img";

const FREE_CONSULT_URL = "https://calendly.com/dave-mcmaster/free-lsat-consultation";
const PRIVATE_TUTORING_URL = "https://calendly.com/dave-mcmaster/private-lsat-tutoring";

/* ---------- HERO ---------- */

const heroStyles = {
  wrap: {
    position: "relative",
    background: "#EFF2F6",
    paddingTop: "28px",
    paddingBottom: "40px",
    overflow: "hidden",
  },
  grainOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.4,
    background:
      "radial-gradient(circle at 85% 20%, rgba(42,142,158,0.15) 0%, rgba(42,142,158,0) 45%), radial-gradient(circle at 10% 90%, rgba(2,50,71,0.05) 0%, rgba(2,50,71,0) 40%)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gridTemplateRows: "auto auto",
    gridTemplateAreas: '"left photo" "ctas photo"',
    columnGap: "48px",
    rowGap: "32px",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    paddingTop: "56px",
    paddingBottom: "40px",
  },
  left: { display: "flex", flexDirection: "column", gap: "32px", gridArea: "left" },
  trust: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    padding: "6px 18px 6px 8px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(10, 37, 64, 0.08)",
    width: "fit-content",
    backdropFilter: "blur(6px)",
  },
  trustText: { fontSize: 13, color: "var(--ink-700)", fontWeight: 500 },
  headline: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(36px, 4.4vw, 60px)",
    lineHeight: 1.08,
    letterSpacing: "-0.035em",
    fontWeight: 600,
    color: "var(--navy-900)",
    margin: 0,
  },
  sub: {
    fontSize: 18,
    color: "var(--ink-700)",
    maxWidth: 520,
    lineHeight: 1.55,
  },
  ctas: { display: "flex", gap: 14, flexWrap: "wrap", gridArea: "ctas" },
  right: {
    gridArea: "photo",
    position: "relative",
    minHeight: 560,
    height: 560,
    maxWidth: 560,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 24,
  },
  photoWrap: {
    position: "absolute",
    zIndex: 2,
    left: "6%",
    right: "6%",
    top: "0%",
    bottom: "0%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    overflow: "hidden",
  },
  gridLines: {
    position: "absolute",
    right: "6%",
    top: "10%",
    width: 280,
    height: 280,
    opacity: 0.35,
  },
  statCard: {
    position: "absolute",
    background: "#fff",
    borderRadius: 16,
    padding: "14px 18px",
    boxShadow: "var(--shadow-card)",
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 180,
    zIndex: 3,
  },
  statIcon: (bg) => ({
    width: 40,
    height: 40,
    borderRadius: 12,
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
  }),
  statLabel: {
    fontSize: 11,
    color: "var(--ink-500)",
    fontFamily: "var(--font-mono)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--navy-900)",
    letterSpacing: "-0.01em",
  },
};

const Hero = () => {
  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={heroStyles.wrap}>
      <div style={heroStyles.grainOverlay} />
      <div className="container">
        <div style={heroStyles.grid} className="hero-grid">
          <div style={heroStyles.left} className="hero-left">
            <div style={heroStyles.trust} className="hero-trust">
              <span style={{ ...heroStyles.trustText, paddingLeft: 10 }}>
                Past students admitted to
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingRight: 10 }}>
                <span title="Columbia University" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 20V9l8-5 8 5v11" stroke="#023247" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M8 20v-6h8v6" stroke="#023247" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="1.2" fill="#023247" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--navy-900)", letterSpacing: "0.04em" }}>COLUMBIA</span>
                </span>
                <span style={{ width: 1, height: 14, background: "rgba(2,50,71,0.2)" }} />
                <span title="Yale University" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 6c3-1 6-1 9 1 3-2 6-2 9-1v12c-3-1-6-1-9 1-3-2-6-2-9-1V6z" stroke="#023247" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 7v12" stroke="#023247" strokeWidth="1.5" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--navy-900)", letterSpacing: "0.04em" }}>YALE</span>
                </span>
                <span style={{ width: 1, height: 14, background: "rgba(2,50,71,0.2)" }} />
                <span title="Harvard University" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h14v10c0 4-3 6-7 7-4-1-7-3-7-7V4z" stroke="#023247" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8.5 9h2v5M13.5 9h2v5M10.5 11.5h3" stroke="#023247" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--navy-900)", letterSpacing: "0.04em" }}>HARVARD</span>
                </span>
              </div>
            </div>

            <h1 style={heroStyles.headline}>
              Work 1-on-1 with{" "}
              <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400, whiteSpace: "nowrap" }}>
                David McMaster
              </span>
              <span style={{ display: "block" }}>a 99th percentile LSAT tutor.</span>
            </h1>

            <p style={heroStyles.sub}>
              I help you go from second-guessing every answer to walking into test day with confidence.
            </p>
          </div>

          <div style={heroStyles.ctas} className="hero-ctas">
            <a
              href={FREE_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a free consultation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <button onClick={scrollToServices} className="btn btn-ghost">View tutoring options</button>
          </div>

          <div style={heroStyles.right} className="hero-photo-area">
            <svg style={heroStyles.gridLines} viewBox="0 0 280 280" fill="none" className="hero-dotmesh">
              <defs>
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#0a2540" opacity="0.35" />
                </pattern>
              </defs>
              <rect width="280" height="280" fill="url(#dots)" />
            </svg>

            <div className="hero-photo-frame" style={{
              position: "absolute",
              left: "6%",
              right: "6%",
              top: "-2%",
              bottom: 0,
              zIndex: 1,
              pointerEvents: "none",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(2,50,71,0.12) 0%, rgba(2,50,71,0.08) 60%, rgba(2,50,71,0.04) 100%)",
                borderRadius: "260px 260px 24px 24px",
                border: "1px solid rgba(2,50,71,0.1)",
              }} />
            </div>

            <div className="hero-photo-wrap" style={{ ...heroStyles.photoWrap, flexDirection: "column", justifyContent: "flex-end" }}>
              <Img
                src="/assets/hero-image.png"
                alt="David McMaster, LSAT tutor and 99th percentile scorer"
                width="480"
                height="560"
                fetchpriority="high"
                decoding="async"
                style={{ width: "100%", maxWidth: 480, height: "100%", objectFit: "contain", objectPosition: "center bottom", display: "block" }}
              />
            </div>

            <div className="hero-stat-card" style={{ ...heroStyles.statCard, top: "38%", right: "-6%" }}>
              <div style={heroStyles.statIcon("var(--teal-500)")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
              </div>
              <div>
                <div style={heroStyles.statLabel}>Students tutored</div>
                <div style={heroStyles.statValue}>3,000+</div>
              </div>
            </div>

            <div className="hero-stat-card" style={{ ...heroStyles.statCard, bottom: "32%", left: "-6%" }}>
              <div style={heroStyles.statIcon("var(--teal-500)")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
              </div>
              <div>
                <div style={heroStyles.statLabel}>Instructor</div>
                <div style={heroStyles.statValue}>99th percentile</div>
              </div>
            </div>

            <div className="hero-stat-card" style={{ ...heroStyles.statCard, top: "22%", left: "-6%", minWidth: 160 }}>
              <div style={heroStyles.statIcon("var(--teal-500)")}>
                <div style={{
                  fontSize: 30, color: "#fff",
                  fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em",
                  fontFamily: "var(--font-display)",
                }}>16</div>
              </div>
              <div>
                <div style={heroStyles.statLabel}>Years</div>
                <div style={heroStyles.statValue}>Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- MEET TUTOR ---------- */

const meetStyles = {
  wrap: { padding: "120px 0 100px", background: "linear-gradient(180deg, #f7f9fb 0%, #e4f1f4 100%)" },
  head: { textAlign: "center", maxWidth: 760, margin: "0 auto 64px" },
  grid: { display: "grid", gridTemplateColumns: "280px 1fr", gap: 56, alignItems: "start" },
  portrait: {
    width: 280, height: 280, borderRadius: "50%",
    position: "relative", overflow: "hidden", flexShrink: 0,
  },
  portraitBadge: {
    position: "absolute", bottom: 16, left: "50%",
    transform: "translateX(-50%)",
    background: "var(--navy-900)", color: "#fff",
    fontFamily: "var(--font-mono)", fontSize: 10,
    textTransform: "uppercase", letterSpacing: "0.14em",
    padding: "6px 12px", borderRadius: 999,
    zIndex: 2, whiteSpace: "nowrap",
  },
  body: {
    fontSize: 17, lineHeight: 1.7, color: "var(--ink-700)",
    display: "flex", flexDirection: "column", gap: 20,
  },
  signature: { fontFamily: "var(--font-display)", fontSize: 24, color: "var(--navy-900)", marginTop: 8 },
  lede: {
    fontFamily: "var(--font-display)", fontSize: 26,
    lineHeight: 1.35, color: "var(--navy-900)",
    margin: "0 0 8px", paddingBottom: 20,
    borderBottom: "1px solid var(--ink-200)",
  },
  reviewsCta: {
    marginTop: 64,
    background: "#ffffff",
    border: "1px solid rgba(2,50,71,0.08)",
    borderRadius: 18, padding: "32px 40px",
    boxShadow: "0 8px 24px rgba(2,50,71,0.05)",
  },
  reviewsCtaInner: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 20, flexWrap: "wrap",
  },
  reviewsCtaQ: { fontFamily: "var(--font-display)", fontSize: 22, color: "var(--navy-900)", lineHeight: 1.25 },
  reviewsCtaNote: { fontSize: 13, color: "var(--ink-500)", marginTop: 8, maxWidth: 480, lineHeight: 1.5 },
  meetStats: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 0, marginTop: 56,
    borderTop: "1px solid var(--ink-200)", paddingTop: 40,
  },
  meetStat: { padding: "0 32px", borderLeft: "1px solid var(--ink-200)" },
  meetStatFirst: { padding: "0 32px 0 0" },
  meetStatNum: {
    fontFamily: "var(--font-display)", fontSize: 52,
    color: "var(--navy-900)", lineHeight: 1, letterSpacing: "-0.01em",
  },
  meetStatLabel: { fontSize: 13, color: "var(--ink-500)", marginTop: 6, maxWidth: 200 },
};

const MeetTutor = () => (
  <section style={meetStyles.wrap} id="about">
    <div className="container">
      <div style={meetStyles.head}>
        <h2>
          Meet your <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>LSAT tutor</span>
        </h2>
      </div>

      <div style={meetStyles.grid} className="meet-grid">
        <div style={meetStyles.portrait} className="meet-portrait">
          <Img
            src="/assets/david.png"
            alt="David McMaster, LSAT Tutor and 99th percentile scorer"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={meetStyles.portraitBadge}>99th Percentile</div>
        </div>
        <div style={meetStyles.body} className="meet-body">
          <p style={meetStyles.lede}>
            Hey there! I&rsquo;m <strong>David McMaster</strong>, the tutor behind LSAT Academy.
          </p>
          <p>
            After college I spent years traveling the world playing poker. Then I took the LSAT, scored in
            the top percentile, and realized the test rewards the same skill: <em>reading patterns faster
              than everyone else at the table</em>.
          </p>
          <p>
            I&rsquo;ve been teaching it ever since. <strong>16 years now.</strong> I started at one of the
            big test-prep companies before going independent. I&rsquo;ve watched countless students find
            success by patiently dedicating themselves, through repeated practice, to internalizing the
            patterns of the LSAT.
          </p>
          <p>
            I&rsquo;ve had students go on to <strong>Columbia, Harvard, and Yale</strong>. One earned a
            full scholarship. Just this April 2026, a student scored a <strong>180</strong>.
          </p>
          <p>
            I didn&rsquo;t make them smarter. They already were. My job was just to translate the test for
            them, to name the patterns out loud until the patterns became obvious.
          </p>
          <p>
            After years of tutoring the LSAT, I still learn something from every student I work with.
            That&rsquo;s why I do this.
          </p>
          <div style={meetStyles.signature}>&mdash; David</div>
        </div>
      </div>

      <div style={meetStyles.reviewsCta} className="reviews-cta">
        <div style={meetStyles.reviewsCtaInner} className="reviews-cta-inner">
          <div>
            <div style={meetStyles.reviewsCtaQ}>How was David as a tutor, really?</div>
            <div style={meetStyles.reviewsCtaNote}>
              Note: some older testimonials mention logic games. Those were part of past LSAT formats.
            </div>
          </div>
          <a
            href="https://docs.google.com/forms/d/1rL_IQq45dGYxYBQIvjX3Pauc7UhUTCCSHK7UwB_rIoc/viewanalytics?pli=1&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ whiteSpace: "nowrap" }}
          >
            Read student answers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      <div style={meetStyles.meetStats} className="meet-stats">
        <div style={{ ...meetStyles.meetStat, ...meetStyles.meetStatFirst, borderLeft: "none" }}>
          <div style={meetStyles.meetStatNum}>3,000<span style={{ fontSize: 28 }}>+</span></div>
          <div style={meetStyles.meetStatLabel}>Students tutored one-on-one</div>
        </div>
        <div style={meetStyles.meetStat}>
          <div style={meetStyles.meetStatNum}>16<span style={{ fontSize: 28 }}>yrs</span></div>
          <div style={meetStyles.meetStatLabel}>Teaching the LSAT full-time</div>
        </div>
        <div style={meetStyles.meetStat}>
          <div style={meetStyles.meetStatNum}>99<span style={{ fontSize: 28 }}>th</span></div>
          <div style={meetStyles.meetStatLabel}>Percentile instructor score</div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- SERVICES ---------- */

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

const HomeServices = ({ onSurvey }) => (
  <section style={svcStyles.wrap} id="services">
    <div style={svcStyles.bgDots} />
    <div className="container">
      <div style={svcStyles.head}>
        <div className="eyebrow eyebrow-light" style={{ marginBottom: 16 }}>Services</div>
        <h2 style={{ color: "#fff" }}>
          Three ways to{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-300)", fontWeight: 400 }}>
            work together
          </span>.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 16, fontSize: 17, maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
          Whether you&rsquo;re just exploring or ready for intensive prep, there&rsquo;s a path built for your timeline and goals.
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
            A 1-hour call to answer your questions, discuss your LSAT goals, share strategic advice, and see if working together makes sense.
          </p>
          <div style={svcStyles.cardPrice}>
            <div style={svcStyles.cardPriceNum}>$0</div>
            <div style={svcStyles.cardPriceUnit}>no commitment</div>
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
            Personalized, focused sessions tailored to your strengths and weaknesses. Discounts available on 10 and 20 hour packages.
          </p>
          <div style={svcStyles.cardPrice}>
            <div style={svcStyles.cardPriceNum}>$85</div>
            <div style={svcStyles.cardPriceUnit}>per hour</div>
          </div>
          <button
            style={svcStyles.cardBtn(true)}
            onClick={() => window.open(PRIVATE_TUTORING_URL, "_blank")}
          >
            Book a session
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
            Affordable option for students to learn in a collaborative environment with peers. We&rsquo;re building our waitlist now.
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
            <strong style={{ color: "#ffe3bd" }}>Currently on hold.</strong> Help shape the program by answering a quick survey.
          </div>
          <div style={svcStyles.cardPrice}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1, letterSpacing: "-0.01em" }}>Waitlist</div>
          </div>
          <button style={svcStyles.cardBtn(false)} onClick={onSurvey}>
            Answer survey
          </button>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- WHY CHOOSE ---------- */

const whyStyles = {
  wrap: { padding: "120px 0", background: "var(--cream-100)" },
  head: { maxWidth: 760, marginBottom: 64 },
  grid: { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" },
  list: { display: "flex", flexDirection: "column" },
  item: {
    padding: "28px 0",
    borderTop: "1px solid var(--ink-200)",
    display: "grid",
    gridTemplateColumns: "48px 1fr",
    gap: 24,
    alignItems: "start",
  },
  itemLast: { borderBottom: "1px solid var(--ink-200)" },
  itemNum: {
    fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--teal-500)",
    letterSpacing: "0.05em", fontWeight: 500, paddingTop: 2,
  },
  itemTitle: {
    fontSize: 22, fontWeight: 600, color: "var(--navy-900)",
    letterSpacing: "-0.02em", marginBottom: 8,
  },
  itemDesc: { fontSize: 15, color: "var(--ink-700)", lineHeight: 1.6, maxWidth: 440 },
  rightCol: { display: "flex", flexDirection: "column", gap: 24 },
  quoteCard: {
    background: "#fff", borderRadius: 20, padding: 32,
    boxShadow: "var(--shadow-card)",
    border: "1px solid rgba(10,37,64,0.06)",
  },
  quoteMark: {
    fontSize: 56, lineHeight: 0.5,
    color: "var(--teal-500)", height: 32, fontWeight: 800,
  },
  quoteText: {
    fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.4,
    color: "var(--navy-900)", marginTop: 24, letterSpacing: "-0.005em",
  },
  quoteAttr: { marginTop: 24, display: "flex", alignItems: "center", gap: 12 },
  quoteAvatar: {
    width: 40, height: 40, borderRadius: "50%",
    background: "#e2d4c2",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, color: "var(--navy-900)", fontSize: 14,
  },
  quoteName: { fontSize: 14, fontWeight: 600, color: "var(--navy-900)" },
  quoteMeta: { fontSize: 12, color: "var(--ink-500)" },
  scorePill: {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "10px 16px", borderRadius: 999,
    background: "var(--teal-50)", border: "1px solid var(--teal-100)",
    color: "var(--teal-500)", fontSize: 13, fontWeight: 600,
    marginLeft: "auto",
  },
};

const WhyChoose = () => {
  const items = [
    { n: "01", t: "16 Years of Experience", d: "Sixteen years of teaching. I've seen every section, every trick, every panic response, and know how to coach through it." },
    { n: "02", t: "99th Percentile Score", d: "I excel at the test I teach." },
    { n: "03", t: "Verified Results, Not Promises", d: "I've taught students who've made remarkable jumps in their scores." },
    { n: "04", t: "Former Elite Prep Instructor", d: "After years at a top-tier prep company, I left to fulfill my dreams of building a 1-on-1 tutoring program." },
  ];
  return (
    <section style={whyStyles.wrap} id="why">
      <div className="container">
        <div style={whyStyles.head}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Why work with David</div>
          <h2>
            Why <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>work with</span> David
          </h2>
        </div>

        <div style={whyStyles.grid} className="why-grid">
          <div style={whyStyles.list}>
            {items.map((it, i) => (
              <div key={i} style={{ ...whyStyles.item, ...(i === items.length - 1 ? whyStyles.itemLast : {}) }}>
                <div style={whyStyles.itemNum}>{it.n}</div>
                <div>
                  <div style={whyStyles.itemTitle}>{it.t}</div>
                  <div style={whyStyles.itemDesc}>{it.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={whyStyles.rightCol}>
            <div style={whyStyles.quoteCard}>
              <div style={whyStyles.quoteMark}>&ldquo;</div>
              <div style={whyStyles.quoteText}>
                I put in the work, but I didn&rsquo;t believe I could get a 180 until I worked
                with David. He&rsquo;s absolutely the reason I got the score I wanted.
              </div>
              <div style={whyStyles.quoteAttr}>
                <div style={whyStyles.quoteAvatar}>AX</div>
                <div>
                  <div style={whyStyles.quoteName}>Angel X.</div>
                  <div style={whyStyles.quoteMeta}>Perfect score, headed to law school</div>
                </div>
                <div style={whyStyles.scorePill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
                  167 &rarr; 180
                </div>
              </div>
            </div>

            <div style={{ ...whyStyles.quoteCard, background: "var(--navy-900)", color: "#fff" }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: "var(--teal-500)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, color: "var(--navy-900)", fontWeight: 800,
                }}>★</div>
                <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>
                  Read more testimonials from real students
                </div>
                <Link to="/testimonials" style={{ marginLeft: "auto", color: "var(--teal-400)", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                  View all
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- COMMUNITY ---------- */

const commStyles = {
  wrap: { padding: "100px 0", background: "linear-gradient(to right, #045573, #1092c5)", color: "#fff" },
  head: { textAlign: "center", maxWidth: 620, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  card: (accent, accentDark) => ({
    borderRadius: 22,
    padding: "36px 36px",
    background: `linear-gradient(135deg, ${accent} 0%, ${accentDark} 100%)`,
    display: "grid",
    gridTemplateColumns: "56px 1fr auto",
    gap: 20,
    alignItems: "center",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  }),
  cardBg: {
    position: "absolute", right: -40, top: -40,
    width: 200, height: 200, borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
  },
  cardIcon: {
    width: 56, height: 56, borderRadius: 16,
    background: "rgba(255,255,255,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", zIndex: 1,
  },
  cardTitle: { fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", position: "relative", zIndex: 1 },
  cardSub: { fontSize: 14, opacity: 0.85, marginTop: 4, position: "relative", zIndex: 1, maxWidth: 420 },
  cardBtn: {
    padding: "12px 22px", borderRadius: 999,
    background: "#fff", color: "var(--navy-900)",
    fontWeight: 600, fontSize: 14,
    position: "relative", zIndex: 1,
    display: "inline-flex", alignItems: "center", gap: 8,
    whiteSpace: "nowrap",
  },
};

const Community = () => (
  <section style={commStyles.wrap} id="community">
    <div className="container">
      <div style={commStyles.head}>
        <div className="eyebrow eyebrow-light" style={{ marginBottom: 16 }}>Join the community</div>
        <h2 style={{ color: "#fff" }}>
          Find your{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-300)", fontWeight: 400 }}>
            community
          </span>.
        </h2>
        <p style={{ marginTop: 16, fontSize: 17, color: "rgba(255,255,255,0.65)" }}>
          For LSAT study tips and past-question breakdowns. Join a community of students preparing alongside you.
        </p>
      </div>

      <div style={commStyles.grid} className="community-grid">
        <div style={commStyles.card("#ff6b3d", "#d84716")}>
          <div style={commStyles.cardBg} />
          <div style={commStyles.cardIcon}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" opacity="0.25" />
              <path d="M8 12h8M8 9h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div>
            <div style={commStyles.cardTitle}>Join our subreddit</div>
            <div style={commStyles.cardSub}>
              Daily LR questions, score discussions, and study tips from students preparing for the LSAT.
            </div>
          </div>
          <a style={commStyles.cardBtn} href="https://www.reddit.com/r/LSATAcademy/" target="_blank" rel="noopener noreferrer">
            r/LSATAcademy
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>

        <div style={commStyles.card("#8075ff", "#5848c2")}>
          <div style={commStyles.cardBg} />
          <div style={commStyles.cardIcon}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4l2 3 2-3h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <circle cx="8.5" cy="11" r="1" />
              <circle cx="15.5" cy="11" r="1" />
            </svg>
          </div>
          <div>
            <div style={commStyles.cardTitle}>Join our Discord</div>
            <div style={commStyles.cardSub}>
              Weekly group study halls, real-time Q&amp;A, and a channel for every section of the test.
            </div>
          </div>
          <a style={commStyles.cardBtn} href="https://discord.gg/PPJezp2y9P" target="_blank" rel="noopener noreferrer">
            Join server
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- CONTACT ---------- */

const ctcStyles = {
  wrap: { padding: "120px 0", background: "var(--cream-100)" },
  grid: {
    display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80,
    alignItems: "start", maxWidth: 1100, margin: "0 auto",
  },
  leftTitle: { maxWidth: 380 },
  kicker: { fontSize: 16, color: "var(--ink-700)", marginTop: 20, lineHeight: 1.6 },
  contactInfo: { marginTop: 48, display: "flex", flexDirection: "column", gap: 24 },
  contactItem: { display: "flex", gap: 16, alignItems: "flex-start" },
  contactIcon: {
    width: 44, height: 44, borderRadius: 12,
    background: "#fff", border: "1px solid rgba(10,37,64,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--teal-500)", flexShrink: 0,
  },
  contactLabel: {
    fontSize: 12, color: "var(--ink-500)",
    textTransform: "uppercase", letterSpacing: "0.1em",
    fontFamily: "var(--font-mono)",
  },
  contactValue: { fontSize: 16, color: "var(--navy-900)", fontWeight: 500, marginTop: 4 },
  form: {
    background: "#fff", borderRadius: 24, padding: 24,
    boxShadow: "var(--shadow-card)",
    border: "1px solid rgba(10,37,64,0.06)",
    display: "flex", flexDirection: "column", gap: 20,
  },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 8, width: "100%", minWidth: 0 },
  label: { fontSize: 13, fontWeight: 600, color: "var(--navy-900)" },
  input: {
    width: "100%",
    display: "block",
    boxSizing: "border-box",
    minWidth: 0,
    padding: "14px 16px", borderRadius: 12,
    border: "1.5px solid var(--ink-200)", background: "var(--cream-50)",
    fontSize: 15, fontFamily: "inherit", color: "var(--navy-900)",
    outline: "none", transition: "border .15s",
  },
  textarea: {
    width: "100%",
    display: "block",
    boxSizing: "border-box",
    minWidth: 0,
    padding: "14px 16px", borderRadius: 12,
    border: "1.5px solid var(--ink-200)", background: "var(--cream-50)",
    fontSize: 15, fontFamily: "inherit", color: "var(--navy-900)",
    outline: "none", minHeight: 140, resize: "vertical",
  },
};

const Contact = () => {
  useEffect(() => {
    const src = "https://js-na2.hsforms.net/forms/embed/241937818.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section style={ctcStyles.wrap} id="contact">
      <div className="container">
        <div style={ctcStyles.grid} className="contact-grid">
          <div style={ctcStyles.leftTitle}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Get in touch</div>
            <h2>
              Ready to{" "}
              <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
                master
              </span>{" "}
              the LSAT?
            </h2>
            <p style={ctcStyles.kicker}>
              Have a question about services or scheduling? Send a note and I&rsquo;ll personally respond within 24 hours.
              For LSAT-specific questions, it&rsquo;s usually better to{" "}
              <a href={FREE_CONSULT_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal-500)", borderBottom: "1px solid var(--teal-500)" }}>
                book a free consultation
              </a>.
            </p>
          </div>

          <div style={ctcStyles.form}>
            <div
              className="hs-form-frame"
              data-region="na2"
              data-form-id="48557ec7-db71-41a3-a20d-2cb551f7fa45"
              data-portal-id="241937818"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- PAGE ---------- */

const Home = () => {
  const navigate = useNavigate();

  const handleSurvey = () => {
    navigate("/group-tutoring");
    setTimeout(() => {
      const el = document.getElementById("survey-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="v2">
      <Helmet>
        <title>LSAT Academy | Expert LSAT Tutoring with David McMaster</title>
        <meta name="description" content="Work 1-on-1 with David McMaster, a 99th percentile LSAT tutor. Personalized prep, proven strategies, and a free consultation. Boston-based, online nationwide." />
        <link rel="canonical" href="https://www.lsat.academy/" />
      </Helmet>
      <Hero />
      <MeetTutor />
      <HomeServices onSurvey={handleSurvey} />
      <WhyChoose />
      <Community />
      <Contact />
    </div>
  );
};

export default Home;
