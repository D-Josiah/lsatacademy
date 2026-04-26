/* Meet the tutor + Services + Why Choose Me */

const sectionStyles = {
  meetWrap: { padding: "120px 0 100px", background: "var(--cream-100)" },
  meetHead: { textAlign: "center", maxWidth: 760, margin: "0 auto 64px" },
  meetGrid: {
    display: "grid", gridTemplateColumns: "280px 1fr", gap: 56,
    alignItems: "start",
  },
  portrait: {
    width: 280, height: 280,
    borderRadius: "50%",
    position: "relative", overflow: "hidden",
    flexShrink: 0,
  },
  portraitBadge: {
    position: "absolute", bottom: 16, left: "50%",
    transform: "translateX(-50%)",
    background: "var(--navy-900)", color: "#fff",
    fontFamily: "var(--font-mono)", fontSize: 10,
    textTransform: "uppercase", letterSpacing: "0.14em",
    padding: "6px 12px", borderRadius: 999,
    zIndex: 2,
    whiteSpace: "nowrap",
  },
  portraitLabel: {
    fontFamily: "var(--font-mono)", fontSize: 11,
    color: "var(--ink-500)", textTransform: "uppercase",
    letterSpacing: "0.14em",
    background: "rgba(255,255,255,0.9)", padding: "6px 12px", borderRadius: 4,
  },
  tutorBody: {
    fontSize: 17, lineHeight: 1.7, color: "var(--ink-700)",
    display: "flex", flexDirection: "column", gap: 20,
  },
  signature: {
    fontFamily: "var(--font-display)", fontSize: 24,
    color: "var(--navy-900)", marginTop: 8,
  },
  lede: {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    lineHeight: 1.35,
    color: "var(--navy-900)",
    margin: "0 0 8px",
    paddingBottom: 20,
    borderBottom: "1px solid var(--ink-200)",
  },
  reviewsCta: {
    marginTop: 64,
    background: "#ffffff",
    border: "1px solid rgba(2,50,71,0.08)",
    borderRadius: 18,
    padding: "32px 40px",
    boxShadow: "0 8px 24px rgba(2,50,71,0.05)",
  },
  reviewsCtaInner: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 20, flexWrap: "wrap",
  },
  reviewsCtaQ: {
    fontFamily: "var(--font-display)", fontSize: 22,
    color: "var(--navy-900)", lineHeight: 1.25,
  },
  reviewsCtaNote: {
    fontSize: 13, color: "var(--ink-500)", marginTop: 8, maxWidth: 480, lineHeight: 1.5,
  },
  meetStats: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 0, marginTop: 56,
    borderTop: "1px solid var(--ink-200)",
    paddingTop: 40,
  },
  meetStat: { padding: "0 32px", borderLeft: "1px solid var(--ink-200)" },
  meetStatFirst: { padding: "0 32px 0 0" },
  meetStatNum: {
    fontFamily: "var(--font-display)", fontSize: 52,
    color: "var(--navy-900)", lineHeight: 1, letterSpacing: "-0.01em",
  },
  meetStatLabel: {
    fontSize: 13, color: "var(--ink-500)", marginTop: 6,
    maxWidth: 200,
  },
};

function MeetTutor() {
  return (
    <section className="section" id="about" data-screen-label="02 Meet the tutor" style={{background: "linear-gradient(180deg, #f7f9fb 0%, #e4f1f4 100%)"}}>
      <div className="container">
        <div style={sectionStyles.meetHead}>
          <h2>
            Meet your <span style={{fontFamily:"var(--font-display)", color:"var(--teal-500)", fontWeight:400}}>LSAT tutor</span>
          </h2>
        </div>

        <div style={sectionStyles.meetGrid} className="meet-grid">
          <div style={sectionStyles.portrait}>
            <img src="assets/david-portrait.png" alt="David McMaster" style={{width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>
            <div style={sectionStyles.portraitBadge}>99th Percentile</div>
          </div>
          <div style={sectionStyles.tutorBody}>
            <p style={sectionStyles.lede}>
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
            <div style={sectionStyles.signature}>&mdash; David</div>
          </div>
        </div>

        <div style={sectionStyles.reviewsCta}>
          <div style={sectionStyles.reviewsCtaInner}>
            <div>
              <div style={sectionStyles.reviewsCtaQ}>How was David as a tutor, really?</div>
              <div style={sectionStyles.reviewsCtaNote}>
                Note: some older testimonials mention logic games. Those were part of past LSAT formats.
              </div>
            </div>
            <a href="#testimonials" className="btn btn-primary" style={{whiteSpace:"nowrap"}}>
              Read student answers
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
          </div>
        </div>

        <div style={sectionStyles.meetStats} className="meet-stats">
          <div style={{...sectionStyles.meetStat, ...sectionStyles.meetStatFirst, borderLeft: "none"}}>
            <div style={sectionStyles.meetStatNum}>3,000<span style={{fontSize:28}}>+</span></div>
            <div style={sectionStyles.meetStatLabel}>Students tutored one-on-one</div>
          </div>
          <div style={sectionStyles.meetStat}>
            <div style={sectionStyles.meetStatNum}>16<span style={{fontSize:28}}>yrs</span></div>
            <div style={sectionStyles.meetStatLabel}>Teaching the LSAT full-time</div>
          </div>
          <div style={sectionStyles.meetStat}>
            <div style={sectionStyles.meetStatNum}>99<span style={{fontSize:28}}>th</span></div>
            <div style={sectionStyles.meetStatLabel}>Percentile instructor score</div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
  grid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
    position: "relative",
  },
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
    color: featured ? "#fff" : "#fff",
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
    fontSize: 14, color: featured ? "var(--ink-700)" : "rgba(255,255,255,0.85)",
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
    display:"flex", alignItems:"center", justifyContent:"center",
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

function Services() {
  return (
    <section style={svcStyles.wrap} id="services" data-screen-label="03 Services">
      <div style={svcStyles.bgDots}/>
      <div className="container">
        <div style={svcStyles.head}>
          <div className="eyebrow eyebrow-light" style={{marginBottom: 16}}>Services</div>
          <h2 style={{color:"#fff"}}>
            Three ways to <span style={{fontFamily:"var(--font-display)", color:"var(--teal-300)", fontWeight:400}}>work together</span>.
          </h2>
          <p style={{color:"rgba(255,255,255,0.65)", marginTop: 16, fontSize: 17, maxWidth: 580, marginLeft:"auto", marginRight:"auto"}}>
            Whether you&rsquo;re just exploring or ready for intensive prep, there&rsquo;s a path built for your timeline and goals.
          </p>
        </div>

        <div style={svcStyles.grid} className="services-grid">
          {/* Consultation */}
          <div style={svcStyles.card(false)}>
            <div style={svcStyles.cardTag(false)}>Free</div>
            <div style={svcStyles.cardIcon(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div style={svcStyles.cardTitle}>One-Time Free Consultation</div>
            <p style={svcStyles.cardSub(false)}>
              A 30-minute call to pinpoint where you&rsquo;re stuck, set a realistic score goal, and map the fastest path there.
            </p>
            <div style={svcStyles.cardPrice}>
              <div style={svcStyles.cardPriceNum}>$0</div>
              <div style={svcStyles.cardPriceUnit}>no commitment</div>
            </div>
            <button style={svcStyles.cardBtn(false)}>Book a call</button>
          </div>

          {/* 1-on-1 private — featured */}
          <div style={svcStyles.card(true)}>
            <div style={svcStyles.cardTag(true)}>Most Popular</div>
            <div style={svcStyles.cardIcon(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div style={svcStyles.cardTitle}>1-on-1 Private Tutoring</div>
            <p style={svcStyles.cardSub(true)}>
              Weekly sessions tailored to your weak spots, with custom drills and full-length practice review between calls.
            </p>
            <div style={svcStyles.cardPrice}>
              <div style={svcStyles.cardPriceNum}>$85</div>
              <div style={svcStyles.cardPriceUnit}>per hour</div>
            </div>
            <button style={svcStyles.cardBtn(true)}>
              Book a session
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          {/* Group */}
          <div style={{...svcStyles.card(false), opacity: 0.78}}>
            <div style={{...svcStyles.cardTag(false), background: "rgba(255,180,80,0.18)", color: "#ffd49a", borderColor: "rgba(255,180,80,0.35)"}}>On Hold</div>
            <div style={svcStyles.cardIcon(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div style={svcStyles.cardTitle}>Group Tutoring</div>
            <p style={svcStyles.cardSub(false)}>
              Join a cohort of 4–6 students preparing for the same test date. Affordable, collaborative, and highly structured.
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
              <strong style={{color:"#ffe3bd"}}>Currently on hold.</strong>.
            </div>
            <div style={svcStyles.cardPrice}>
              <div style={svcStyles.cardPriceNum}>$35</div>
              <div style={svcStyles.cardPriceUnit}>per session</div>
            </div>
            <button style={svcStyles.cardBtn(false)}>Join the waitlist</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE ME ---------- */

const whyStyles = {
  wrap: { padding: "120px 0", background: "var(--cream-100)" },
  head: { maxWidth: 760, marginBottom: 64 },
  grid: {
    display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80,
    alignItems: "center",
  },
  list: { display: "flex", flexDirection: "column" },
  item: {
    padding: "28px 0",
    borderTop: "1px solid var(--ink-200)",
    display: "grid",
    gridTemplateColumns: "48px 1fr auto",
    gap: 24,
    alignItems: "start",
  },
  itemLast: { borderBottom: "1px solid var(--ink-200)" },
  itemNum: {
    fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--teal-500)",
    letterSpacing: "0.05em", fontWeight: 500, paddingTop: 2,
  },
  itemBody: {},
  itemTitle: {
    fontSize: 22, fontWeight: 600, color: "var(--navy-900)",
    letterSpacing: "-0.02em", marginBottom: 8,
  },
  itemDesc: { fontSize: 15, color: "var(--ink-700)", lineHeight: 1.6, maxWidth: 440 },
  itemIcon: {
    width: 40, height: 40, borderRadius: "50%",
    background: "var(--teal-50)", color: "var(--teal-500)",
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1px solid var(--teal-100)",
  },
  rightCol: {
    display: "flex", flexDirection: "column", gap: 24,
  },
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
    background: "#e2d4c2", display:"flex", alignItems:"center", justifyContent:"center",
    fontWeight:700, color:"var(--navy-900)", fontSize: 14,
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

function WhyChoose() {
  const items = [
    { n: "01", t: "16 Years of Experience",
      d: "Sixteen years of teaching. I've seen every section, every trick, every panic response, and know how to coach through it." },
    { n: "02", t: "99th Percentile Score",
      d: "I didn't just pass the LSAT, I aced it. That means I can explain not just the answer, but how expert test-takers think through it." },
    { n: "03", t: "Verified Results, Not Promises",
      d: "Transparent score-improvement data from past students. Ask for it on our first call and I'll send the spreadsheet." },
    { n: "04", t: "Former Elite Prep Instructor",
      d: "Built the 1-on-1 tutoring program at a top-tier prep company before going independent to work with students directly." },
  ];
  return (
    <section style={whyStyles.wrap} id="why" data-screen-label="04 Why choose me">
      <div className="container">
        <div style={whyStyles.head}>
          <div className="eyebrow" style={{marginBottom: 16}}>Why work with David</div>
          <h2>
            Why <span style={{fontFamily:"var(--font-display)", color:"var(--teal-500)", fontWeight:400}}>work with</span> David
          </h2>
        </div>

        <div style={whyStyles.grid} className="why-grid">
          <div style={whyStyles.list}>
            {items.map((it, i) => (
              <div key={i} style={{...whyStyles.item, ...(i === items.length - 1 ? whyStyles.itemLast : {})}}>
                <div style={whyStyles.itemNum}>{it.n}</div>
                <div style={whyStyles.itemBody}>
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
                David found the exact two reasoning patterns I was missing. Six weeks later
                I was 11 points higher on a real PT.
              </div>
              <div style={whyStyles.quoteAttr}>
                <div style={whyStyles.quoteAvatar}>MK</div>
                <div>
                  <div style={whyStyles.quoteName}>Maya K.</div>
                  <div style={whyStyles.quoteMeta}>Accepted to Columbia Law, class of 2028</div>
                </div>
                <div style={whyStyles.scorePill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                  163 &rarr; 174
                </div>
              </div>
            </div>

            <div style={{...whyStyles.quoteCard, background: "var(--navy-900)", color: "#fff"}}>
              <div style={{display: "flex", gap: 16, alignItems: "center"}}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: "var(--teal-500)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, color: "var(--navy-900)",
                  fontWeight: 800,
                }}>★</div>
                <div style={{fontSize: 17, fontWeight: 500, lineHeight: 1.4}}>
                  Read more testimonials from real students
                </div>
                <a href="#testimonials" style={{marginLeft: "auto", color: "var(--teal-400)", fontSize: 14, fontWeight: 600, display:"inline-flex", alignItems:"center", gap: 6, whiteSpace: "nowrap"}}>
                  View all
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MeetTutor, Services, WhyChoose });
