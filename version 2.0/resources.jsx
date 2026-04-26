/* Resources page sections — LSAT Academy */

/* ---------- HERO ---------- */

const resHeroStyles = {
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
  meta: {
    marginTop: 40,
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "var(--ink-500)",
  },
  metaItem: { display: "inline-flex", alignItems: "center", gap: 8 },
  metaNum: { color: "var(--teal-500)", fontWeight: 600, fontSize: 14 },
};

function ResourcesHero() {
  return (
    <section style={resHeroStyles.wrap} data-screen-label="01 Hero">
      <div style={resHeroStyles.grain} />
      <div className="container" style={{ position: "relative" }}>
        <div style={resHeroStyles.inner}>
          <div style={resHeroStyles.eyebrowRow}>
            <span style={resHeroStyles.dot} />
            <span className="eyebrow eyebrow-teal">Free resources</span>
          </div>
          <h1 style={resHeroStyles.h1}>
            Articles, breakdowns,{" "}
            <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
              study tools.
            </span>
          </h1>
          <p style={resHeroStyles.sub}>
            Sixteen years of LSAT teaching, distilled into focused articles. No fluff, no filler.
            What I tell my 1-on-1 students, written down for everyone.
          </p>
          <div style={resHeroStyles.meta}>
            <span style={resHeroStyles.metaItem}>
              <span style={resHeroStyles.metaNum}>10</span> Articles
            </span>
            <span style={resHeroStyles.metaItem}>
              <span style={resHeroStyles.metaNum}>5</span> Categories
            </span>
            <span style={resHeroStyles.metaItem}>
              <span style={resHeroStyles.metaNum}>$0</span> Always free
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURED ARTICLE ---------- */

const featStyles = {
  wrap: { padding: "0 0 120px", background: "var(--cream-100)" },
  card: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    background: "var(--navy-900)",
    color: "#fff",
    borderRadius: "var(--radius-xl)",
    overflow: "hidden",
    boxShadow: "var(--shadow-lg)",
    minHeight: 380,
  },
  left: { padding: "56px 56px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "center" },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    background: "rgba(108,191,204,0.15)",
    borderRadius: 999,
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "var(--teal-300)",
    width: "fit-content",
    marginBottom: 24,
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(32px, 3.4vw, 44px)",
    lineHeight: 1.1,
    color: "#fff",
    letterSpacing: "-0.025em",
    fontWeight: 400,
    marginBottom: 20,
  },
  desc: {
    fontSize: 17,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.55,
    marginBottom: 32,
    maxWidth: 480,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    borderBottom: "1.5px solid #fff",
    paddingBottom: 4,
    width: "fit-content",
  },
  right: {
    background:
      "linear-gradient(135deg, rgba(42,142,158,0.5), rgba(2,50,71,0.9)), radial-gradient(circle at 30% 30%, rgba(108,191,204,0.4), transparent 60%)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bigNum: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(140px, 16vw, 240px)",
    color: "rgba(255,255,255,0.06)",
    lineHeight: 0.9,
    letterSpacing: "-0.05em",
    position: "absolute",
    bottom: -30,
    right: -10,
  },
  glyph: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "1px solid rgba(108,191,204,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--teal-300)",
    position: "relative",
    zIndex: 1,
  },
  glyphInner: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    border: "1px solid rgba(108,191,204,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function FeaturedArticle() {
  return (
    <section style={featStyles.wrap} data-screen-label="02 Featured">
      <div className="container">
        <div style={featStyles.card} className="featured-card">
          <div style={featStyles.left}>
            <div style={featStyles.tag}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal-300)" }} />
              Start here
            </div>
            <h2 style={featStyles.title}>The LSAT Explained: Everything You Need to Know.</h2>
            <p style={featStyles.desc}>
              The complete primer. Section by section, scoring, timing, what good prep looks like,
              and the most common mistakes I see from new test-takers.
            </p>
            <a style={featStyles.link} href="articles/lsat-explained.html">
              Read article
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div style={featStyles.right} className="featured-right">
            <div style={featStyles.bigNum}>01</div>
            <div style={featStyles.glyph}>
              <div style={featStyles.glyphInner}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ARTICLE INDEX BY CATEGORY ---------- */

const indexStyles = {
  wrap: { padding: "120px 0", background: "#fff" },
  category: { marginBottom: 96 },
  catHead: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 280px) 1fr",
    gap: 48,
    alignItems: "baseline",
    marginBottom: 40,
    paddingBottom: 24,
    borderBottom: "1px solid var(--ink-200)",
  },
  catLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "var(--teal-500)",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  catNum: {
    fontFamily: "var(--font-display)",
    fontSize: 28,
    color: "var(--navy-900)",
    fontWeight: 400,
  },
  catTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(24px, 2.4vw, 32px)",
    color: "var(--navy-900)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  catDesc: {
    fontSize: 15,
    color: "var(--ink-500)",
    marginTop: 8,
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 0,
  },
  article: {
    padding: "28px 32px",
    borderTop: "1px solid var(--ink-100)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "background 0.2s ease",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    minHeight: 180,
  },
  articleEven: { borderLeft: "1px solid var(--ink-100)" },
  articleNum: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-400)",
    letterSpacing: "0.16em",
  },
  articleTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    color: "var(--navy-900)",
    fontWeight: 400,
    letterSpacing: "-0.015em",
    lineHeight: 1.2,
    flexGrow: 0,
  },
  articleDesc: {
    fontSize: 14,
    color: "var(--ink-500)",
    lineHeight: 1.55,
    flexGrow: 1,
  },
  articleArrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "var(--teal-500)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },
};

const CATEGORIES = [
  {
    num: "01",
    label: "Foundations",
    title: "Get oriented to the test.",
    desc: "Start here if you're new to the LSAT or applying to law school.",
    articles: [
      {
        n: "Article 02",
        title: "Indicator Words as Essential Fundamentals",
        desc: "The small words that change the entire meaning of a sentence. The single highest-leverage habit you can build early.",
        href: "articles/indicator-words.html",
      },
      {
        n: "Article 03",
        title: "The ABCs of Applying to Law School",
        desc: "Beyond the score. Timeline, recommenders, personal statements, and the small decisions that compound into admissions outcomes.",
        href: "articles/abc.html",
      },
    ],
  },
  {
    num: "02",
    label: "Reading Comprehension",
    title: "Read for the test, not for fun.",
    desc: "RC isn't slow reading. It's a different way of reading entirely.",
    articles: [
      {
        n: "Article 04",
        title: "Stop TRYING to Understand the RC Passages",
        desc: "The counterintuitive RC mindset shift. Why students who 'understand' the passage often miss more questions than students who don't.",
        href: "articles/rc-tips.html",
      },
      {
        n: "Article 05",
        title: "The Three Kinds of MBT Questions on the RC Section",
        desc: "Must-Be-True questions look identical on the surface. They're not. Learn the three flavors and what each one rewards.",
        href: "articles/mbt-questions.html",
      },
    ],
  },
  {
    num: "03",
    label: "Logical Reasoning",
    title: "Argue like a logician.",
    desc: "The mechanics of premises, conclusions, and the gap between them.",
    articles: [
      {
        n: "Article 06",
        title: "A Simple Way to Level Up Your Sufficient Assumption Approach",
        desc: "A repeatable two-step move that turns SA questions from time sinks into nearly automatic points.",
        href: "articles/sufficient-assumption.html",
      },
      {
        n: "Article 07",
        title: "In Defense of the Utility of Premises",
        desc: "Why premises matter more than students think. A pushback on the 'just find the conclusion' advice that's everywhere online.",
        href: "articles/premises.html",
      },
    ],
  },
  {
    num: "04",
    label: "Mindset & method",
    title: "How to study, how to think.",
    desc: "Less about content, more about how to actually improve.",
    articles: [
      {
        n: "Article 08",
        title: "Getting Stuck on Challenging Problems",
        desc: "What to do when a question won't budge. The diagnostic process I walk students through, step by step.",
        href: "articles/getting-stuck.html",
      },
      {
        n: "Article 09",
        title: "Some Patterns That Jump Out After 15 Years of Tutoring",
        desc: "The repeating shapes of student struggle, and the surprising similarities across hundreds of score profiles.",
        href: "articles/patterns.html",
      },
    ],
  },
  {
    num: "05",
    label: "Tools",
    title: "Free study materials.",
    desc: "Quick references and practice tools you can use today.",
    articles: [
      {
        n: "Article 10",
        title: "LSAT Quizlet",
        desc: "Curated flashcard sets covering common indicator words, question stems, and high-frequency vocabulary.",
        href: "articles/lsat-quizlet.html",
      },
    ],
  },
];

function ArticleIndex() {
  return (
    <section style={indexStyles.wrap} data-screen-label="03 Article index">
      <div className="container">
        {CATEGORIES.map((cat, ci) => (
          <div key={ci} style={indexStyles.category}>
            <div style={indexStyles.catHead} className="cat-head">
              <div>
                <div style={indexStyles.catLabel}>
                  <span>{cat.num}</span>
                  <span style={{ width: 24, height: 1, background: "var(--teal-500)" }} />
                  <span>{cat.label}</span>
                </div>
              </div>
              <div>
                <h3 style={indexStyles.catTitle}>{cat.title}</h3>
                <div style={indexStyles.catDesc}>{cat.desc}</div>
              </div>
            </div>

            <div style={indexStyles.list} className="article-list">
              {cat.articles.map((a, ai) => (
                <a
                  key={ai}
                  href={a.href}
                  style={{
                    ...indexStyles.article,
                    ...(ai % 2 === 1 ? indexStyles.articleEven : {}),
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-50)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  className="article-card"
                >
                  <div style={indexStyles.articleNum}>{a.n}</div>
                  <div style={indexStyles.articleTitle}>{a.title}</div>
                  <div style={indexStyles.articleDesc}>{a.desc}</div>
                  <div style={indexStyles.articleArrow}>
                    Read article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER / CTA ---------- */

const newsStyles = {
  wrap: {
    padding: "120px 0",
    background: "linear-gradient(to right, #045573, #1092c5)",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  inner: { maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" },
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "var(--teal-300)",
    marginBottom: 16,
  },
  h2: { color: "#fff", marginBottom: 20 },
  sub: {
    fontSize: 18,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.55,
    maxWidth: 560,
    margin: "0 auto 36px",
  },
  form: {
    display: "flex",
    gap: 12,
    maxWidth: 480,
    margin: "0 auto",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 240px",
    padding: "14px 20px",
    background: "rgba(255,255,255,0.08)",
    border: "1.5px solid rgba(255,255,255,0.15)",
    borderRadius: 999,
    color: "#fff",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
  },
  btn: {
    background: "#fff",
    color: "var(--navy-900)",
    padding: "14px 24px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "none",
  },
  fineprint: {
    marginTop: 16,
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.04em",
  },
};

function ResourcesCTA() {
  return (
    <section style={newsStyles.wrap} data-screen-label="04 Newsletter">
      <div className="container">
        <div style={newsStyles.inner}>
          <div style={newsStyles.eyebrow}>Get notified</div>
          <h2 style={newsStyles.h2}>
            New article every{" "}
            <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-300)", fontWeight: 400 }}>
              two weeks.
            </span>
          </h2>
          <p style={newsStyles.sub}>
            Drop your email and I&rsquo;ll send the next one when it&rsquo;s up. No marketing, no
            upsells. Just the article.
          </p>
          <form style={newsStyles.form} onSubmit={(e) => e.preventDefault()}>
            <input style={newsStyles.input} placeholder="you@school.edu" type="email" />
            <button type="submit" style={newsStyles.btn}>
              Subscribe
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          <div style={newsStyles.fineprint}>UNSUBSCRIBE ANYTIME · NO SPAM</div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ResourcesHero, FeaturedArticle, ArticleIndex, ResourcesCTA });
