/* Testimonials page sections — LSAT Academy */

/* ---------- HERO ---------- */

const testHeroStyles = {
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
  sub: {
    fontSize: 19, color: "var(--ink-700)", maxWidth: 720, lineHeight: 1.5, fontWeight: 400,
  },
  scoreboard: {
    marginTop: 64,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    position: "relative",
  },
  scoreCard: {
    background: "#fff",
    borderRadius: "var(--radius-lg)",
    padding: "32px 28px",
    border: "1px solid var(--ink-100)",
    boxShadow: "var(--shadow-sm)",
    position: "relative",
  },
  scoreCardDark: {
    background: "var(--navy-900)",
    color: "#fff",
    borderColor: "var(--navy-900)",
  },
  scoreNum: {
    fontFamily: "var(--font-display)",
    fontSize: 96,
    lineHeight: 0.9,
    color: "var(--navy-900)",
    letterSpacing: "-0.03em",
    marginBottom: 12,
  },
  scoreNumDark: { color: "#fff" },
  scoreUnit: { fontSize: 36, color: "var(--teal-500)" },
  scoreLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "var(--ink-500)",
  },
  scoreLabelDark: { color: "var(--teal-300)" },
  scoreSchool: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 4,
    color: "var(--navy-900)",
  },
  scoreSchoolDark: { color: "#fff" },
};

function TestimonialsHero() {
  const scores = [
    { num: "169", unit: "", label: "Score", school: "Harvard Law", dark: false },
    { num: "170", unit: "", label: "+15 pts in 2 months", school: "T14 · Full Scholarship", dark: true },
    { num: "97", unit: "th", label: "Percentile", school: "Yale Law", dark: false },
  ];
  return (
    <section style={testHeroStyles.wrap} data-screen-label="01 Hero">
      <div style={testHeroStyles.grain} />
      <div className="container" style={{ position: "relative" }}>
        <div style={testHeroStyles.inner}>
          <div style={testHeroStyles.eyebrowRow}>
            <span style={testHeroStyles.dot} />
            <span className="eyebrow eyebrow-teal">Student stories</span>
          </div>
          <h1 style={testHeroStyles.h1}>
            Real students.{" "}
            <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
              Real scores.
            </span>{" "}
            Real stories.
          </h1>
          <p style={testHeroStyles.sub}>
            From self-study ceilings to Harvard, Yale, and full-ride scholarships. The actual journeys of
            LSAT students who worked with David.
          </p>
        </div>

        <div style={testHeroStyles.scoreboard} className="testimonials-scoreboard">
          {scores.map((s, i) => (
            <div
              key={i}
              style={{ ...testHeroStyles.scoreCard, ...(s.dark ? testHeroStyles.scoreCardDark : {}) }}
            >
              <div style={{ ...testHeroStyles.scoreNum, ...(s.dark ? testHeroStyles.scoreNumDark : {}) }}>
                {s.num}
                {s.unit && <span style={testHeroStyles.scoreUnit}>{s.unit}</span>}
              </div>
              <div style={{ ...testHeroStyles.scoreLabel, ...(s.dark ? testHeroStyles.scoreLabelDark : {}) }}>
                {s.label}
              </div>
              <div style={{ ...testHeroStyles.scoreSchool, ...(s.dark ? testHeroStyles.scoreSchoolDark : {}) }}>
                {s.school}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SUCCESS STORIES (FEATURED) ---------- */

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
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    background: "var(--cream-100)",
    border: "1px solid var(--ink-200)",
    borderRadius: 999,
    fontSize: 12,
    fontFamily: "var(--font-mono)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--navy-900)",
    width: "fit-content",
  },
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
};

function SuccessStories() {
  const stories = [
    {
      i: "Story 01",
      score: "169",
      unit: "",
      school: "Harvard Law",
      year: "Class of 2021",
      duration: "Self-study to mastery",
      title: "From self-study ceiling to Harvard.",
      paragraphs: [
        "I hit a wall studying alone. The same kinds of questions kept tripping me up and I couldn't see why. Within a few weeks of working with David, the wall was gone.",
        "What stuck wasn't a single trick. It was his ability to spot patterns in my missed questions and tailor the approach to how I specifically thought about the test. He even helped with outside factors. My insomnia was wrecking practice tests, and we worked on it together.",
      ],
      quote: "He didn't just teach the LSAT. He taught me how I think.",
    },
    {
      i: "Story 02",
      score: "170",
      unit: "",
      school: "T14 · Full Scholarship",
      year: "+15 points",
      duration: "2 months",
      title: "Fifteen points in two months. Full ride.",
      paragraphs: [
        "I started below 155. Two months later: 170, and a full-tuition scholarship offer from a T14 school.",
        "David's charisma kept me engaged through late-night sessions, and his individual evaluation of my strengths and weaknesses was sharper than any course I'd tried. Email replies came within hours. The practical test-taking skills he taught me made the difference on test day.",
      ],
      quote: "I really cannot recall anything you could have done better as a teacher.",
    },
    {
      i: "Story 03",
      score: "97",
      unit: "th",
      school: "Yale Law",
      year: "Class of 2020",
      duration: "30th to 97th percentile",
      title: "30th to 97th percentile. Yale.",
      paragraphs: [
        "My diagnostic in July 2016 was at the 30th percentile. June 2017: 97th percentile on the real LSAT. Perfect score on the logic games section. 25 out of 26 on logical reasoning.",
        "David was more like a life coach or test therapist than a traditional tutor. He even helped me workshop my law school application essays. I'm now at Yale Law.",
      ],
      quote: "More like a life coach or test therapist than a traditional tutor.",
    },
  ];

  return (
    <section style={storyStyles.wrap} data-screen-label="02 Success stories">
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

        <div style={storyStyles.list}>
          {stories.map((s, idx) => (
            <article key={idx} style={storyStyles.story(idx % 2 === 1)} className="story-row">
              <div style={storyStyles.scoreCol} className="story-score-col">
                <div style={storyStyles.scoreBlock}>
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
                {s.paragraphs.map((p, pi) => (
                  <p key={pi} style={storyStyles.para}>{p}</p>
                ))}
                <div style={storyStyles.pullQuote}>&ldquo;{s.quote}&rdquo;</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SURVEY RESPONSES ---------- */

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

function SurveysSection() {
  return (
    <section style={surveyStyles.wrap} data-screen-label="03 Surveys">
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
              href="https://docs.google.com/spreadsheets/d/1TiKsWiIUWyCC1vjbbwEwkPw2SyZAY0aUvLKItSW7Cb8"
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
              href="https://docs.google.com/spreadsheets/d/1rL_IQq45dGYxYBQIvjX3Pauc7UhUTCCSHK7UwB_rIoc"
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
}

/* ---------- REDDIT SECTION ---------- */

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
  left: {},
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

function RedditSection() {
  React.useEffect(() => {
    // Lazy-load Imgur embed script
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
    <section style={redditStyles.wrap} data-screen-label="04 Reddit">
      <div style={redditStyles.bgRing} />
      <div style={redditStyles.bgRing2} />
      <div className="container" style={redditStyles.inner}>
        <div style={redditStyles.grid} className="reddit-grid">
          <div style={redditStyles.left}>
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
              <a href="//imgur.com/a/ST3Jikr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal-300)", borderBottom: "1px solid var(--teal-300)" }}>
                View album on Imgur
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- BOOK CTA ---------- */

const bookStyles = {
  wrap: {
    padding: "120px 0",
    background: "var(--cream-100)",
  },
  inner: {
    maxWidth: 880,
    margin: "0 auto",
    textAlign: "center",
  },
  h2: { color: "var(--navy-900)", marginBottom: 24 },
  sub: {
    fontSize: 19,
    color: "var(--ink-700)",
    lineHeight: 1.55,
    maxWidth: 600,
    margin: "0 auto 40px",
  },
  ctaRow: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
  },
};

function BookCTA() {
  return (
    <section style={bookStyles.wrap} data-screen-label="05 CTA">
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
            Free 30-minute consultation. We&rsquo;ll diagnose where you&rsquo;re stuck, set a realistic
            goal, and map the path there.
          </p>
          <div style={bookStyles.ctaRow}>
            <a
              className="btn btn-primary"
              href="https://calendly.com/dave-mcmaster/free-lsat-consultation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a free consultation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a className="btn btn-ghost" href="index.html#services">View tutoring options</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TestimonialsHero, SuccessStories, SurveysSection, RedditSection, BookCTA });
