/* Community CTAs, Contact, Footer */

const commStyles = {
  wrap: { padding: "100px 0", background: "linear-gradient(to right, #045573, #1092c5)", color: "#fff" },
  head: { textAlign: "center", maxWidth: 620, margin: "0 auto 56px" },
  grid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
  },
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

function Community() {
  return (
    <section style={commStyles.wrap} id="community" data-screen-label="05 Community">
      <div className="container">
        <div style={commStyles.head}>
          <div className="eyebrow eyebrow-light" style={{marginBottom: 16}}>Join the community</div>
          <h2 style={{color:"#fff"}}>
            Find your <span style={{fontFamily:"var(--font-display)", color:"var(--teal-300)", fontWeight:400}}>community</span>.
          </h2>
          <p style={{marginTop:16, fontSize:17, color:"rgba(255,255,255,0.65)"}}>
            For LSAT study tips and past-question breakdowns. Join a community of students preparing alongside you.
          </p>
        </div>

        <div style={commStyles.grid} className="community-grid">
          <div style={commStyles.card("#ff6b3d", "#d84716")}>
            <div style={commStyles.cardBg}/>
            <div style={commStyles.cardIcon}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" opacity="0.25"/>
                <path d="M8 12h8M8 9h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div>
              <div style={commStyles.cardTitle}>Join our subreddit</div>
              <div style={commStyles.cardSub}>
                Daily LR questions, score discussions, and application advice from students and alumni.
              </div>
            </div>
            <a style={commStyles.cardBtn} href="#">
              r/LSATAcademy
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>

          <div style={commStyles.card("#8075ff", "#5848c2")}>
            <div style={commStyles.cardBg}/>
            <div style={commStyles.cardIcon}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4l2 3 2-3h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                <circle cx="8.5" cy="11" r="1"/>
                <circle cx="15.5" cy="11" r="1"/>
              </svg>
            </div>
            <div>
              <div style={commStyles.cardTitle}>Join our Discord</div>
              <div style={commStyles.cardSub}>
                Weekly group study halls, real-time Q&amp;A, and a channel for every section of the test.
              </div>
            </div>
            <a style={commStyles.cardBtn} href="#">
              Join server
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */

const ctcStyles = {
  wrap: { padding: "120px 0", background: "var(--cream-100)" },
  grid: {
    display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80,
    alignItems: "start", maxWidth: 1100, margin: "0 auto",
  },
  leftTitle: { maxWidth: 380 },
  kicker: { fontSize: 16, color: "var(--ink-700)", marginTop: 20, lineHeight: 1.6 },
  contactInfo: {
    marginTop: 48, display: "flex", flexDirection: "column", gap: 24,
  },
  contactItem: {
    display: "flex", gap: 16, alignItems: "flex-start",
  },
  contactIcon: {
    width: 44, height: 44, borderRadius: 12,
    background: "#fff", border: "1px solid rgba(10,37,64,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--teal-500)", flexShrink: 0,
  },
  contactLabel: { fontSize: 12, color: "var(--ink-500)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" },
  contactValue: { fontSize: 16, color: "var(--navy-900)", fontWeight: 500, marginTop: 4 },
  form: {
    background: "#fff",
    borderRadius: 24,
    padding: 40,
    boxShadow: "var(--shadow-card)",
    border: "1px solid rgba(10,37,64,0.06)",
    display: "flex", flexDirection: "column", gap: 20,
  },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 13, fontWeight: 600, color: "var(--navy-900)" },
  input: {
    padding: "14px 16px", borderRadius: 12,
    border: "1.5px solid var(--ink-200)", background: "var(--cream-50)",
    fontSize: 15, fontFamily: "inherit", color: "var(--navy-900)",
    outline: "none", transition: "border .15s",
  },
  textarea: {
    padding: "14px 16px", borderRadius: 12,
    border: "1.5px solid var(--ink-200)", background: "var(--cream-50)",
    fontSize: 15, fontFamily: "inherit", color: "var(--navy-900)",
    outline: "none", minHeight: 140, resize: "vertical",
  },
  radioRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  radio: (active) => ({
    padding: "10px 16px", borderRadius: 999,
    border: active ? "1.5px solid var(--teal-500)" : "1.5px solid var(--ink-200)",
    background: active ? "var(--teal-50)" : "#fff",
    color: active ? "var(--teal-500)" : "var(--ink-700)",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
  }),
};

function Contact() {
  const [svc, setSvc] = React.useState("1-on-1 Tutoring");
  const options = ["Free Consultation", "1-on-1 Tutoring", "Group Cohort", "Other"];
  return (
    <section style={ctcStyles.wrap} id="contact" data-screen-label="06 Contact">
      <div className="container">
        <div style={ctcStyles.grid} className="contact-grid">
          <div style={ctcStyles.leftTitle}>
            <div className="eyebrow" style={{marginBottom: 16}}>Get in touch</div>
            <h2>
              Ready to <span style={{fontFamily:"var(--font-display)", color:"var(--teal-500)", fontWeight:400}}>master</span> the LSAT?
            </h2>
            <p style={ctcStyles.kicker}>
              Have a question about services or scheduling? Send a note and I&rsquo;ll personally respond within 24 hours.
              For LSAT-specific questions, it&rsquo;s usually better to <a href="https://calendly.com/dave-mcmaster/free-lsat-consultation" target="_blank" rel="noopener" style={{color:"var(--teal-500)", borderBottom:"1px solid var(--teal-500)"}}>book a free consultation</a>.
            </p>

            <div style={ctcStyles.contactInfo}>
              <div style={ctcStyles.contactItem}>
                <div style={ctcStyles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div style={ctcStyles.contactLabel}>Email</div>
                  <div style={ctcStyles.contactValue}>david@lsatacademy.com</div>
                </div>
              </div>
              <div style={ctcStyles.contactItem}>
                <div style={ctcStyles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <div style={ctcStyles.contactLabel}>Book direct</div>
                  <div style={ctcStyles.contactValue}>cal.lsatacademy.com/david</div>
                </div>
              </div>
              <div style={ctcStyles.contactItem}>
                <div style={ctcStyles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <div style={ctcStyles.contactLabel}>Availability</div>
                  <div style={ctcStyles.contactValue}>Mon–Fri · 9am – 6pm ET</div>
                </div>
              </div>
            </div>
          </div>

          <form style={ctcStyles.form} onSubmit={(e)=>e.preventDefault()}>
            <div style={ctcStyles.row} className="contact-row">
              <div style={ctcStyles.field}>
                <label style={ctcStyles.label}>Full name</label>
                <input style={ctcStyles.input} placeholder="Jamie Chen"/>
              </div>
              <div style={ctcStyles.field}>
                <label style={ctcStyles.label}>Email</label>
                <input style={ctcStyles.input} placeholder="you@example.com"/>
              </div>
            </div>

            <div style={ctcStyles.row} className="contact-row">
              <div style={ctcStyles.field}>
                <label style={ctcStyles.label}>Target test date</label>
                <input style={ctcStyles.input} placeholder="June 2026"/>
              </div>
              <div style={ctcStyles.field}>
                <label style={ctcStyles.label}>Current practice score</label>
                <input style={ctcStyles.input} placeholder="e.g. 158 or ‘haven’t tested’"/>
              </div>
            </div>

            <div style={ctcStyles.field}>
              <label style={ctcStyles.label}>What are you hoping to work on?</label>
              <textarea style={ctcStyles.textarea} placeholder="Tell me where you're stuck, what you've already tried, and what a great outcome looks like for you."/>
            </div>

            <button className="btn btn-dark" style={{alignSelf: "flex-start", marginTop: 8}}>
              Send message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>

            <div style={{fontSize: 12, color: "var(--ink-500)", marginTop: 4}}>
              By submitting, you agree to receive a follow-up email from David. No list, no spam.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

const footStyles = {
  wrap: { background: "linear-gradient(to right, #045573, #1092c5)", color: "#fff", padding: "80px 0 40px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
    gap: 48,
    paddingBottom: 56,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  brand: { display: "flex", flexDirection: "column", gap: 20 },
  logo: { display: "flex", alignItems: "center", gap: 12, fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" },
  logoMark: {
    width: 40, height: 40, borderRadius: 10,
    background: "var(--teal-500)", color: "var(--navy-900)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  tagline: { fontSize: 14, color: "rgba(255,255,255,0.55)", maxWidth: 300, lineHeight: 1.6 },
  socials: { display: "flex", gap: 10 },
  social: {
    width: 38, height: 38, borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "rgba(255,255,255,0.7)",
  },
  colTitle: { fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", color: "var(--teal-300)", marginBottom: 20 },
  colList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 },
  colLink: { color: "rgba(255,255,255,0.7)", fontSize: 14 },
  bottom: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    paddingTop: 28, fontSize: 13, color: "rgba(255,255,255,0.45)", flexWrap: "wrap", gap: 16,
  },
  bottomLinks: { display: "flex", gap: 24 },
};

function Footer() {
  return (
    <footer style={footStyles.wrap} data-screen-label="07 Footer">
      <div className="container">
        <div style={footStyles.grid} className="footer-grid">
          <div style={footStyles.brand}>
            <div style={footStyles.logo}>
              <img src="assets/header-logo.png" alt="LSAT Academy — David McMaster" style={{height:56, width:"auto", display:"block", filter:"brightness(0) invert(1)"}}/>
            </div>
            <p style={footStyles.tagline}>
              One tutor. One proven method. Thousands of students into the law schools they dreamed about.
            </p>
            <div style={footStyles.socials}>
              <a style={footStyles.social} href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              <a style={footStyles.social} href="#" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.65a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.08z"/></svg></a>
              <a style={footStyles.social} href="#" aria-label="Reddit"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.67 13.06c.025.17.038.346.038.524 0 2.676-3.114 4.846-6.954 4.846s-6.954-2.17-6.954-4.846c0-.18.013-.357.04-.531a1.52 1.52 0 0 1-.86-1.37 1.52 1.52 0 0 1 2.561-1.111c1.176-.804 2.747-1.319 4.485-1.387l.97-4.265a.385.385 0 0 1 .456-.292l3.046.66a1.056 1.056 0 1 1-.13.526l-2.717-.589-.864 3.815c1.71.082 3.252.595 4.413 1.387a1.52 1.52 0 0 1 2.557 1.108c0 .593-.342 1.107-.84 1.355h-.002zM8.354 12.93a1.04 1.04 0 1 0 .002 2.082 1.04 1.04 0 0 0-.002-2.082zm5.66 3.802a.36.36 0 0 0-.514 0c-.502.5-1.46.54-1.737.54-.276 0-1.234-.04-1.736-.54a.367.367 0 0 0-.524.514c.787.787 2.302.85 2.26.85.044 0 1.474-.063 2.262-.85a.367.367 0 0 0-.011-.514zm.124-1.72a1.04 1.04 0 1 0-.002-2.082 1.04 1.04 0 0 0 .002 2.082z"/></svg></a>
              <a style={footStyles.social} href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            </div>
          </div>

          <div>
            <div style={footStyles.colTitle}>Quick links</div>
            <ul style={footStyles.colList}>
              <li><a style={footStyles.colLink} href="#home">Home</a></li>
              <li><a style={footStyles.colLink} href="#about">About David</a></li>
              <li><a style={footStyles.colLink} href="#services">Services</a></li>
              <li><a style={footStyles.colLink} href="#testimonials">Testimonials</a></li>
              <li><a style={footStyles.colLink} href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <div style={footStyles.colTitle}>Resources</div>
            <ul style={footStyles.colList}>
              <li><a style={footStyles.colLink} href="#">Blog</a></li>
              <li><a style={footStyles.colLink} href="#">Videos</a></li>
              <li><a style={footStyles.colLink} href="#">Subreddit</a></li>
            </ul>
          </div>

          <div>
            <div style={footStyles.colTitle}>Contact</div>
            <ul style={footStyles.colList}>
              <li style={footStyles.colLink}>david@lsatacademy.com</li>
              <li style={footStyles.colLink}>cal.lsatacademy.com</li>
              <li style={footStyles.colLink}>Mon–Fri · 9am – 6pm ET</li>
              <li style={{marginTop: 12}}>
                <a className="btn btn-primary" href="#contact" style={{padding:"10px 20px", fontSize:13}}>
                  Book a consult
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={footStyles.bottom}>
          <div>© 2026 LSAT Academy · All rights reserved.</div>
          <div style={footStyles.bottomLinks}>
            <a style={footStyles.colLink} href="#">Privacy</a>
            <a style={footStyles.colLink} href="#">Terms</a>
            <a style={footStyles.colLink} href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Community, Contact, Footer });
