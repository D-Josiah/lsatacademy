import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const FREE_CONSULT_URL = "https://calendly.com/dave-mcmaster/free-lsat-consultation";

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
  sub: { fontSize: 19, color: "var(--ink-700)", maxWidth: 720, lineHeight: 1.5, fontWeight: 400 },
};

const TestimonialsHero = () => (
  <section style={heroStyles.wrap}>
    <div style={heroStyles.grain} />
    <div className="container" style={{ position: "relative" }}>
      <div style={heroStyles.inner}>
        <div style={heroStyles.eyebrowRow}>
          <span style={heroStyles.dot} />
          <span className="eyebrow eyebrow-teal">Student stories</span>
        </div>
        <h1 style={heroStyles.h1}>
          Real students.{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
            Real scores.
          </span>{" "}
          Real stories.
        </h1>
        <p style={heroStyles.sub}>
          From self-study ceilings to Harvard, Yale, and full-ride scholarships. The actual journeys of
          LSAT students who worked with David.
        </p>
      </div>
    </div>
  </section>
);

/* ---------- SUCCESS STORIES ---------- */

const storyStyles = {
  wrap: { padding: "120px 0", background: "#fff" },
  head: { maxWidth: 760, marginBottom: 80 },
  list: { display: "flex", flexDirection: "column", gap: 96 },
  story: (rev) => ({
    display: "grid",
    gridTemplateColumns: "minmax(280px, 380px) 1fr",
    gap: 80,
    alignItems: "start",
    direction: rev ? "rtl" : "ltr",
  }),
  scoreCol: {
    direction: "ltr",
    position: "sticky", top: 24,
  },
  scoreBlock: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(120px, 14vw, 200px)",
    lineHeight: 0.85,
    color: "var(--navy-900)",
    letterSpacing: "-0.04em",
  },
  scoreBlockTh: {
    fontSize: "0.4em",
    color: "var(--teal-500)",
    verticalAlign: "top",
    marginLeft: 4,
  },
  scoreMeta: {
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  metaRow: { display: "flex", flexDirection: "column", gap: 4 },
  metaLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "var(--ink-500)",
  },
  metaValue: { fontSize: 17, color: "var(--navy-900)", fontWeight: 600, letterSpacing: "-0.01em" },
  bodyCol: { direction: "ltr" },
  index: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--teal-500)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(32px, 3.4vw, 44px)",
    lineHeight: 1.1,
    color: "var(--navy-900)",
    letterSpacing: "-0.025em",
    fontWeight: 400,
    marginBottom: 28,
  },
  para: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "var(--ink-700)",
    marginBottom: 20,
  },
  pullQuote: {
    marginTop: 32,
    paddingLeft: 28,
    borderLeft: "3px solid var(--teal-500)",
    fontFamily: "var(--font-display)",
    fontSize: 24,
    lineHeight: 1.35,
    color: "var(--navy-900)",
    letterSpacing: "-0.01em",
    fontStyle: "italic",
  },
  readMore: {
    marginTop: 32,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "var(--navy-900)",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

const modalStyles = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(2, 30, 45, 0.72)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 24, zIndex: 1000,
  },
  panel: {
    background: "#fff",
    borderRadius: "var(--radius-lg)",
    maxWidth: 720, width: "100%",
    maxHeight: "85vh", overflowY: "auto",
    padding: "clamp(32px, 5vw, 56px)",
    position: "relative",
    boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
  },
  close: {
    position: "absolute", top: 16, right: 16,
    background: "transparent",
    border: "1px solid rgba(2, 30, 45, 0.12)",
    borderRadius: "50%",
    width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    color: "var(--ink-700)",
    padding: 0, lineHeight: 0,
    transition: "background-color 150ms ease, border-color 150ms ease",
  },
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "var(--teal-500)",
    marginBottom: 14,
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(26px, 3vw, 32px)",
    color: "var(--navy-900)",
    letterSpacing: "-0.02em",
    fontWeight: 400,
    marginBottom: 24,
    lineHeight: 1.15,
  },
  para: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "var(--ink-700)",
    marginBottom: 18,
  },
};

const SuccessStories = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const stories = [
    {
      i: "Story 01",
      score: "169",
      unit: "",
      school: "Harvard Law",
      year: "Class of 2021",
      duration: "Self-study to mastery",
      title: "From self-study ceiling to Harvard.",
      preview: "I approached David after self-study for the LSAT left me hitting a ceiling with my score that I was pretty desperate to break. David was really good at identifying exactly where I was getting stuck and noticing patterns in the questions that I got wrong that I would never have noticed myself (hence the ceiling) and giving me very focused solutions.",
      full: [
        "I approached David after self-study for the LSAT left me hitting a ceiling with my score that I was pretty desperate to break. David was really good at identifying exactly where I was getting stuck and noticing patterns in the questions that I got wrong that I would never have noticed myself (hence the ceiling) and giving me very focused solutions.",
        "I also got the sense when he was teaching me that he was really tailoring his approach to teaching me how to take the LSAT both to what skills I needed and changes I needed to make on the questions in order to maximize my score and moreover to who I was as an individual. I particularly appreciated the fact that he cared enough to ask about what outside influences could affect my test performance. In my case: insomnia. And actually offered advice! (That proved helpful enough that I actually entered the test well rested for once!)",
        "I think the fact that David was personable, patient and encouraging made me a lot more receptive to what he was teaching me than I otherwise would have been. Thanks to David, I ended up scoring a 169 on the LSAT and I will be attending Harvard Law School in September 2018.",
      ],
      quote: "I particularly appreciated the fact that he cared enough to ask about what outside influences could affect my test performance.",
    },
    {
      i: "Story 02",
      score: "170",
      unit: "",
      school: "T14 · Full Scholarship",
      year: "+15 points",
      duration: "2 months",
      title: "Fifteen points in two months. Full ride.",
      preview: "Dave was an excellent instructor and mentor during the LSAT preparation process. Thanks to his skilled instruction and helpful coaching, I received a 170 on the LSAT and a full scholarship to a Top 14 law school. In 2 months, Dave helped me add over 15 points to my score.",
      full: [
        "Dave was an excellent instructor and mentor during the LSAT preparation process. Thanks to his skilled instruction and helpful coaching, I received a 170 on the LSAT and a full scholarship to a Top 14 law school. In 2 months, Dave helped me add over 15 points to my score.",
        "He is an engaging and exciting teacher, whose great charisma and upbeat humor kept the class on point and working hard. I also really appreciate how he worked hard to meet and speak with each student to evaluate their individual progress and assess their strengths and weaknesses. He has a very good perception of what one's reasoning and logical flows tend to be like, and takes the time to break down each answer choice and show why you may have mistakenly chosen an answer.",
        "Finally, he really went the extra distance to make sure that his students get all their questions answered and are able to have full access to him as an instructor. He spent countless classes staying late to explain concepts to myself or my peers, and also is a quick and comprehensive replier of emails. I also am grateful that he also took the time to teach me practical test-taking skills along with the test's materials. I am very grateful that I had the chance to work with Dave, and would wholeheartedly recommend him to any student looking to make serious improvement on the LSAT.",
        "Also, I really cannot recall anything that you could have done better as a teacher. It has been a while. You really were a great instructor.",
      ],
      quote: "I really cannot recall anything that you could have done better as a teacher.",
    },
    {
      i: "Story 03",
      score: "97",
      unit: "th",
      school: "Yale Law",
      year: "Class of 2020",
      duration: "30th to 97th percentile",
      title: "30th to 97th percentile. Yale.",
      preview: "I will attend Yale Law School this fall because Dave taught me how to think (and write!) more like a lawyer. When I began my studies with a 30th percentile diagnostic exam score, I honestly thought law school would not be for me.",
      full: [
        "I will attend Yale Law School this fall because Dave taught me how to think (and write!) more like a lawyer.",
        "Dave has been my LSAT tutor since July 2016. When I began my studies with a 30th percentile diagnostic exam score, I honestly thought law school would not be for me. Over the next 11 months, Dave selflessly helped me develop the skills necessary to achieve a goal I considered impossible at the outset. Thanks to those skills, on my official June 2017 LSAT, I scored in the 97th percentile with a perfect LG and a 25/26 LR.",
        "Dave's skills encompass the entirety of the LSAT. If you struggle to read RC passages how you should, to understand how to best approach an LR stimulus, or if you are overwhelmed by how to even begin to tackle LG, Dave can help you out. If you think you're the worst test-taker in the world, or even if you know you're just too stupid to figure this test out, then Dave can help. I was afraid of LG at first, scoring -13/-14 while not making it to two whole LG on some of my very first LG sections.",
        "Dave's function as an LSAT tutor is more like the function of a \"life coach\" or a \"test therapist\" than it is the function of a traditional tutor. Dave's role as a tutor has to do with much more than just test preparation—he will show you the ways you need to think about both the test and yourself in order to succeed on test day.",
        "Dave's skills extend far beyond the LSAT, too. Without the countless hours he invested into my law school applications essays, I'm fairly certain I wouldn't have received as many acceptances as I have, and certainly not one from Yale Law School! Dave is more than just my tutor, in truth. He is my mentor, a man who I've come to trust and look up to as a first-generation student who has been more than a bit confused by the whole admissions process. Thanks for absolutely everything you did for me, Dave!",
      ],
      quote: "Dave is more than just my tutor, in truth. He is my mentor.",
    },
  ];

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e) => { if (e.key === "Escape") setOpenIdx(null); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx]);

  const open = openIdx !== null ? stories[openIdx] : null;

  return (
    <section style={storyStyles.wrap}>
      <div className="container">
        <div style={storyStyles.head}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Featured success stories</div>
          <h2>
            Three students.{" "}
            <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
              Three different paths.
            </span>
          </h2>
        </div>

        <div style={storyStyles.list} className="story-list">
          {stories.map((s, idx) => (
            <article key={idx} style={storyStyles.story(idx % 2 === 1)} className="story-row">
              <div style={storyStyles.scoreCol} className="story-score-col">
                <div style={storyStyles.scoreBlock} className="story-big-num">
                  {s.score}
                  {s.unit && <span style={storyStyles.scoreBlockTh}>{s.unit}</span>}
                </div>
                <div style={storyStyles.scoreMeta}>
                  <div style={storyStyles.metaRow}>
                    <div style={storyStyles.metaLabel}>School</div>
                    <div style={storyStyles.metaValue}>{s.school}</div>
                  </div>
                  <div style={storyStyles.metaRow}>
                    <div style={storyStyles.metaLabel}>Result</div>
                    <div style={storyStyles.metaValue}>{s.year}</div>
                  </div>
                  <div style={storyStyles.metaRow}>
                    <div style={storyStyles.metaLabel}>Timeline</div>
                    <div style={storyStyles.metaValue}>{s.duration}</div>
                  </div>
                </div>
              </div>

              <div style={storyStyles.bodyCol}>
                <div style={storyStyles.index}>{s.i}</div>
                <h3 style={storyStyles.title}>{s.title}</h3>
                <p style={storyStyles.para}>{s.preview}</p>
                <div style={storyStyles.pullQuote}>&ldquo;{s.quote}&rdquo;</div>
                <button
                  type="button"
                  onClick={() => setOpenIdx(idx)}
                  style={storyStyles.readMore}
                  className="story-read-more"
                >
                  Read full testimonial
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="testimonial-modal-title"
          style={modalStyles.overlay}
          onClick={() => setOpenIdx(null)}
        >
          <div
            style={modalStyles.panel}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(null)}
              style={modalStyles.close}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div style={modalStyles.eyebrow}>{open.school} &middot; {open.score}{open.unit}</div>
            <h3 id="testimonial-modal-title" style={modalStyles.title}>{open.title}</h3>
            {open.full.map((p, i) => (
              <p key={i} style={modalStyles.para}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

/* ---------- SURVEYS ---------- */

const surveyStyles = {
  wrap: { padding: "120px 0", background: "var(--cream-100)" },
  head: { maxWidth: 760, marginBottom: 64 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 28,
  },
  card: {
    background: "#fff",
    borderRadius: "var(--radius-lg)",
    padding: "44px 40px",
    border: "1px solid var(--ink-200)",
    boxShadow: "var(--shadow-card)",
    display: "flex",
    flexDirection: "column",
  },
  cardEyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "var(--teal-500)",
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 28,
    color: "var(--navy-900)",
    letterSpacing: "-0.02em",
    fontWeight: 400,
    marginBottom: 14,
    lineHeight: 1.15,
  },
  cardDesc: {
    fontSize: 15,
    color: "var(--ink-700)",
    marginBottom: 28,
    lineHeight: 1.55,
    flexGrow: 1,
  },
  cardLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "var(--navy-900)",
    fontWeight: 600,
    fontSize: 15,
    borderBottom: "1.5px solid var(--navy-900)",
    paddingBottom: 4,
    width: "fit-content",
  },
  note: {
    marginTop: 64,
    padding: "24px 28px",
    background: "var(--cream-200)",
    borderRadius: "var(--radius-md)",
    fontSize: 14,
    color: "var(--ink-700)",
    lineHeight: 1.55,
    border: "1px dashed var(--ink-200)",
    maxWidth: 760,
  },
};

const SurveysSection = () => (
  <section style={surveyStyles.wrap}>
    <div className="container">
      <div style={surveyStyles.head}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Raw responses</div>
        <h2>
          Don&rsquo;t take my word.{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
            Read theirs.
          </span>
        </h2>
        <p style={{ marginTop: 16, fontSize: 17, color: "var(--ink-700)", lineHeight: 1.55, maxWidth: 640 }}>
          Both surveys below are unedited and updated continuously. Direct links to the live response sheets.
        </p>
      </div>

      <div style={surveyStyles.grid} className="surveys-grid">
        <div style={surveyStyles.card}>
          <div style={surveyStyles.cardEyebrow}>Form A</div>
          <div style={surveyStyles.cardTitle}>Post-consultation survey</div>
          <p style={surveyStyles.cardDesc}>
            Recent responses from students who booked a free LSAT consultation. What stood out, what they
            learned, what they&rsquo;ll try next.
          </p>
          <a
            style={surveyStyles.cardLink}
            href="https://docs.google.com/spreadsheets/d/1TiKsWiIUWyCC1vjbbwEwkPw2SyZAY0aUvLKItSW7Cb8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read form responses
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        <div style={surveyStyles.card}>
          <div style={surveyStyles.cardEyebrow}>Form B</div>
          <div style={surveyStyles.cardTitle}>How was David as a tutor, really?</div>
          <p style={surveyStyles.cardDesc}>
            Anonymous answers from students after their tutoring program ended. Honest reflections on
            method, results, and what they wish they&rsquo;d known earlier.
          </p>
          <a
            style={surveyStyles.cardLink}
            href="https://docs.google.com/forms/d/1rL_IQq45dGYxYBQIvjX3Pauc7UhUTCCSHK7UwB_rIoc/viewanalytics?pli=1&pli=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read student answers
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>

      <div style={surveyStyles.note}>
        <strong style={{ color: "var(--navy-900)" }}>Note:</strong> some older testimonials may mention
        logic games. Those were part of past LSAT formats and are no longer on the test.
      </div>
    </div>
  </section>
);

/* ---------- REDDIT ---------- */

const redditStyles = {
  wrap: {
    padding: "120px 0",
    background: "var(--navy-900)",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  bgRing: {
    position: "absolute", right: -200, top: -200, width: 600, height: 600,
    borderRadius: "50%", border: "1px solid rgba(108,191,204,0.12)", pointerEvents: "none",
  },
  bgRing2: {
    position: "absolute", right: -100, top: -100, width: 400, height: 400,
    borderRadius: "50%", border: "1px solid rgba(108,191,204,0.18)", pointerEvents: "none",
  },
  inner: { position: "relative", zIndex: 1 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 16px",
    background: "rgba(108,191,204,0.12)",
    border: "1px solid rgba(108,191,204,0.3)",
    borderRadius: 999,
    fontSize: 12,
    fontFamily: "var(--font-mono)",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "var(--teal-300)",
    marginBottom: 28,
  },
  reddit: { width: 16, height: 16, fill: "currentColor" },
  pull: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 3vw, 38px)",
    lineHeight: 1.25,
    color: "#fff",
    letterSpacing: "-0.02em",
    fontWeight: 400,
    marginBottom: 28,
  },
  attr: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
  },
  attrIcon: {
    width: 32, height: 32, borderRadius: "50%",
    background: "rgba(108,191,204,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--teal-300)",
  },
  embed: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "var(--radius-lg)",
    padding: 32,
    backdropFilter: "blur(10px)",
  },
  embedHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  embedTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    color: "#fff",
    fontWeight: 400,
    letterSpacing: "-0.01em",
  },
  embedHost: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
  },
};

const RedditSection = () => {
  useEffect(() => {
    const id = "imgur-embed-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.src = "//s.imgur.com/min/embed.js";
      s.async = true;
      s.id = id;
      s.charset = "utf-8";
      document.body.appendChild(s);
    } else if (window.imgurEmbed && window.imgurEmbed.createIframe) {
      window.imgurEmbed.createIframe();
    }
  }, []);

  return (
    <section style={redditStyles.wrap}>
      <div style={redditStyles.bgRing} />
      <div style={redditStyles.bgRing2} />
      <div className="container" style={redditStyles.inner}>
        <div style={redditStyles.grid} className="reddit-grid">
          <div>
            <div style={redditStyles.badge}>
              <svg style={redditStyles.reddit} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.67 13.06c.025.17.038.346.038.524 0 2.676-3.114 4.846-6.954 4.846s-6.954-2.17-6.954-4.846c0-.18.013-.357.04-.531a1.52 1.52 0 0 1-.86-1.37 1.52 1.52 0 0 1 2.561-1.111c1.176-.804 2.747-1.319 4.485-1.387l.97-4.265a.385.385 0 0 1 .456-.292l3.046.66a1.056 1.056 0 1 1-.13.526l-2.717-.589-.864 3.815c1.71.082 3.252.595 4.413 1.387a1.52 1.52 0 0 1 2.557 1.108c0 .593-.342 1.107-.84 1.355h-.002zM8.354 12.93a1.04 1.04 0 1 0 .002 2.082 1.04 1.04 0 0 0-.002-2.082zm5.66 3.802a.36.36 0 0 0-.514 0c-.502.5-1.46.54-1.737.54-.276 0-1.234-.04-1.736-.54a.367.367 0 0 0-.524.514c.787.787 2.302.85 2.26.85.044 0 1.474-.063 2.262-.85a.367.367 0 0 0-.011-.514zm.124-1.72a1.04 1.04 0 1 0-.002-2.082 1.04 1.04 0 0 0 .002 2.082z" />
              </svg>
              Recommended on r/LSAT
            </div>
            <div style={redditStyles.pull}>
              I&rsquo;m on the r/LSAT recommended tutors list, with countless testimonials from students
              who&rsquo;ve achieved exceptional results.
            </div>
            <div style={redditStyles.attr}>
              <div style={redditStyles.attrIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span>Listed on the r/LSAT recommended tutors wiki</span>
            </div>
          </div>

          <div style={redditStyles.embed}>
            <div style={redditStyles.embedHead}>
              <div style={redditStyles.embedTitle}>A few student responses</div>
              <div style={redditStyles.embedHost}>imgur.com</div>
            </div>
            <blockquote
              className="imgur-embed-pub"
              lang="en"
              data-id="a/ST3Jikr"
              data-context="false"
              style={{ margin: 0 }}
            >
              <a href="https://imgur.com/a/ST3Jikr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal-300)", borderBottom: "1px solid var(--teal-300)" }}>
                View album on Imgur
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- BOOK CTA ---------- */

const bookStyles = {
  wrap: { padding: "120px 0", background: "var(--cream-100)" },
  inner: { maxWidth: 880, margin: "0 auto", textAlign: "center" },
  h2: { color: "var(--navy-900)", marginBottom: 24 },
  sub: { fontSize: 19, color: "var(--ink-700)", lineHeight: 1.55, maxWidth: 600, margin: "0 auto 40px" },
  ctaRow: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" },
};

const BookCTA = () => (
  <section style={bookStyles.wrap}>
    <div className="container">
      <div style={bookStyles.inner}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Your turn</div>
        <h2 style={bookStyles.h2}>
          Ready to write your{" "}
          <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
            own story?
          </span>
        </h2>
        <p style={bookStyles.sub}>
          Free 1-hour consultation. We&rsquo;ll diagnose where you&rsquo;re stuck, set a realistic
          goal, and map the path there.
        </p>
        <div style={bookStyles.ctaRow}>
          <a className="btn btn-primary" href={FREE_CONSULT_URL} target="_blank" rel="noopener noreferrer">
            Book a free consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <Link className="btn btn-ghost" to="/services">View tutoring options</Link>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- PAGE ---------- */

const Testimonials = () => (
  <div className="v2">
    <Helmet>
      <title>Student Testimonials | LSAT Academy</title>
      <meta name="description" content="Real student reviews and survey results from LSAT Academy. See how David McMaster's tutoring helped students into Harvard, Yale, and full-ride T14 scholarships." />
      <link rel="canonical" href="https://www.lsat.academy/testimonials" />
      <meta property="og:title" content="Student Testimonials | LSAT Academy" />
      <meta property="og:description" content="Read real student reviews and survey results from LSAT Academy. See how David McMaster's tutoring has helped students improve their LSAT scores and gain confidence." />
      <meta property="og:url" content="https://www.lsat.academy/testimonials" />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lsat.academy/" },
            { "@type": "ListItem", "position": 2, "name": "Testimonials", "item": "https://www.lsat.academy/testimonials" }
          ]
        }
      `}</script>
    </Helmet>
    <TestimonialsHero />
    <SuccessStories />
    <SurveysSection />
    <RedditSection />
    <BookCTA />
  </div>
);

export default Testimonials;
