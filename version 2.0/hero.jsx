/* Hero section — LSAT Academy */

const heroStyles = {
  wrap: {
    position: "relative",
    background: "#EFF2F6",
    paddingTop: "28px",
    paddingBottom: "40px",
    overflow: "hidden"
  },
  grainOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.4,
    background:
    "radial-gradient(circle at 85% 20%, rgba(42,142,158,0.15) 0%, rgba(42,142,158,0) 45%), radial-gradient(circle at 10% 90%, rgba(2,50,71,0.05) 0%, rgba(2,50,71,0) 40%)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: "48px",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    paddingTop: "56px",
    paddingBottom: "40px"
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "32px"
  },
  trust: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    padding: "6px 18px 6px 8px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(10, 37, 64, 0.08)",
    width: "fit-content",
    backdropFilter: "blur(6px)"
  },
  trustAvatars: { display: "flex" },
  trustAvatar: (i) => ({
    width: 28, height: 28, borderRadius: "50%",
    background: ["#cfe9e3", "#f4d9c8", "#dcd1f0", "#c7dce9"][i],
    border: "2px solid #fff",
    marginLeft: i === 0 ? 0 : -8,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, color: "#0a2540"
  }),
  trustText: { fontSize: 13, color: "var(--ink-700)", fontWeight: 500 },
  headline: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(36px, 4.4vw, 60px)",
    lineHeight: 1.08,
    letterSpacing: "-0.035em",
    fontWeight: 600,
    color: "var(--navy-900)",
    margin: 0
  },
  sub: {
    fontSize: 18,
    color: "var(--ink-700)",
    maxWidth: 520,
    lineHeight: 1.55
  },
  ctas: { display: "flex", gap: 14, flexWrap: "wrap" },
  right: {
    position: "relative",
    minHeight: 560,
    height: 560,
    maxWidth: 560,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 24
  },
  photoDisc: {
    position: "absolute",
    right: "0%",
    top: "2%",
    bottom: "0%",
    width: "100%",
    maxWidth: 480,
    background:
    "linear-gradient(to right, #023247, #0A6EA1)",
    borderRadius: "240px 240px 32px 32px",
    overflow: "hidden"
  },
  photoDiscInner: {
    position: "absolute", inset: 0,
    background:
    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%), radial-gradient(circle at 80% 80%, rgba(4,85,115,0.12) 0%, rgba(4,85,115,0) 50%)"
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
    overflow: "hidden"
  },
  photoPlaceholder: {
    position: "relative",
    width: "78%",
    height: "92%",
    borderRadius: "18px 18px 260px 260px",
    background:
    "repeating-linear-gradient(45deg, #dfe6ee 0 8px, #e8edf3 8px 16px)",
    border: "1px solid rgba(10, 37, 64, 0.1)",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 24
  },
  photoLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--ink-500)",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    background: "rgba(255,255,255,0.9)",
    padding: "6px 12px",
    borderRadius: 4
  },
  // decorative grid lines behind
  gridLines: {
    position: "absolute",
    right: "6%",
    top: "10%",
    width: 280,
    height: 280,
    opacity: 0.35
  },
  // floating stat cards
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
    zIndex: 3
  },
  statIcon: (bg) => ({
    width: 40, height: 40, borderRadius: 12,
    background: bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", flexShrink: 0
  }),
  statLabel: { fontSize: 11, color: "var(--ink-500)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 },
  statValue: { fontSize: 18, fontWeight: 700, color: "var(--navy-900)", letterSpacing: "-0.01em" },
  // bottom ribbon (logos)
  ribbon: {
    marginTop: 56,
    padding: "28px 0",
    borderTop: "1px solid rgba(10, 37, 64, 0.08)",
    display: "flex",
    alignItems: "center",
    gap: 48,
    flexWrap: "wrap"
  },
  ribbonLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--ink-500)"
  },
  ribbonLogos: {
    display: "flex", gap: 40, alignItems: "center",
    flexWrap: "wrap", flex: 1
  },
  logoPill: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    color: "var(--ink-400)",
    letterSpacing: "-0.01em"
  }
};

function Hero() {
  return (
    <>
      <Navbar />
      <section style={heroStyles.wrap} data-screen-label="01 Hero">
        <div style={heroStyles.grainOverlay} />
        <div className="container">
        <div style={heroStyles.grid} className="hero-grid">
          {/* LEFT */}
          <div style={heroStyles.left}>
            <div style={heroStyles.trust}>
              <span style={{ ...heroStyles.trustText, paddingLeft: 10 }}>
                Past students admitted to
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingRight: 10 }}>
                {/* Columbia — crown shield */}
                <span title="Columbia University" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 20V9l8-5 8 5v11" stroke="#023247" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M8 20v-6h8v6" stroke="#023247" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="1.2" fill="#023247" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--navy-900)", letterSpacing: "0.04em" }}>COLUMBIA</span>
                </span>
                <span style={{ width: 1, height: 14, background: "rgba(2,50,71,0.2)" }} />
                {/* Yale — open book */}
                <span title="Yale University" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 6c3-1 6-1 9 1 3-2 6-2 9-1v12c-3-1-6-1-9 1-3-2-6-2-9-1V6z" stroke="#023247" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 7v12" stroke="#023247" strokeWidth="1.5" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--navy-900)", letterSpacing: "0.04em" }}>YALE</span>
                </span>
                <span style={{ width: 1, height: 14, background: "rgba(2,50,71,0.2)" }} />
                {/* Harvard — Veritas shield */}
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
              <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>David McMaster</span>
              <span style={{ display: "block" }}>a 99th percentile LSAT tutor.</span>
            </h1>

            <p style={heroStyles.sub}>
              I help you go from second-guessing every answer to walking into test day with confidence.
            </p>

            <div style={heroStyles.ctas}>
              <a href="#contact" className="btn btn-primary">
                Book a free consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#services" className="btn btn-ghost">View tutoring options</a>
            </div>
          </div>

          {/* RIGHT */}
          <div style={heroStyles.right}>
            {/* decorative grid mesh */}
            <svg style={heroStyles.gridLines} viewBox="0 0 280 280" fill="none">
              <defs>
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#0a2540" opacity="0.35" />
                </pattern>
              </defs>
              <rect width="280" height="280" fill="url(#dots)" />
            </svg>

            <div style={{ ...heroStyles.photoDisc, display: "none" }}>
              <div style={heroStyles.photoDiscInner} />
            </div>

            {/* background panel behind David — fully contains upper body */}
            <div style={{
                position: "absolute",
                left: "6%",
                right: "6%",
                top: "-2%",
                bottom: 0,
                zIndex: 1,
                pointerEvents: "none"
              }}>
              <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(2,50,71,0.12) 0%, rgba(2,50,71,0.08) 60%, rgba(2,50,71,0.04) 100%)",
                  borderRadius: "260px 260px 24px 24px",
                  border: "1px solid rgba(2,50,71,0.1)"
                }} />
            </div>

            {/* bottom blur removed */}

            <div style={{ ...heroStyles.photoWrap, flexDirection: "column", justifyContent: "flex-end" }}>
              <img
                  src="assets/david-mcmaster.png"
                  alt="David McMaster, LSAT tutor"
                  style={{ width: "100%", maxWidth: 480, height: "100%", objectFit: "contain", objectPosition: "center bottom", display: "block" }} />
                
            </div>

            {/* stat card right side, mid */}
            <div style={{ ...heroStyles.statCard, top: "38%", right: "-6%" }}>
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

            {/* stat card bottom-left */}
            <div style={{ ...heroStyles.statCard, bottom: "32%", left: "-6%" }}>
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

            {/* small floating callout — Years Experience, top-right above David */}
            <div style={{ ...heroStyles.statCard, top: "22%", left: "-6%", minWidth: 160 }}>
              <div style={heroStyles.statIcon("var(--teal-500)")}>
                <div style={{
                    fontSize: 30, color: "#fff",
                    fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em",
                    fontFamily: "var(--font-display)"
                  }}>16</div>
              </div>
              <div>
                <div style={heroStyles.statLabel}>Years</div>
                <div style={heroStyles.statValue}>Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ribbon removed */}
        </div>
      </section>
    </>);

}

function Navbar() {
  const nav = {
    outer: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "16px 32px 0",
      maxWidth: 1240,
      margin: "0 auto",
      width: "100%"
    },
    wrap: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px 10px 20px",
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: 999,
      boxShadow: "0 4px 18px rgba(2,50,71,0.08), 0 0 0 1px rgba(2,50,71,0.05)"
    },
    logo: {
      display: "flex", alignItems: "center", gap: 10,
      color: "var(--navy-900)", letterSpacing: "-0.01em"
    },
    links: { display: "flex", gap: 32, alignItems: "center" },
    link: { fontSize: 14, color: "var(--ink-700)", fontWeight: 500 }
  };
  return (
    <div style={nav.outer}>
      <nav style={nav.wrap}>
        <div style={nav.logo}>
          <img src="assets/header-logo.png" alt="LSAT Academy — David McMaster" style={{ height: 56, width: "auto", display: "block" }} />
        </div>
        <div style={nav.links} className="nav-links">
          <a style={nav.link} href="LSAT Academy.html#home">Home</a>
          <a style={nav.link} href="Services.html">Services</a>
          <a style={nav.link} href="Testimonials.html">Testimonials</a>
          <a style={nav.link} href="Resources.html">Resources</a>
        </div>
        <a className="btn btn-primary" href="LSAT Academy.html#contact" style={{ minWidth: 140, padding: "12px 32px", justifyContent: "center" }}>Contact</a>
      </nav>
    </div>);

}

Object.assign(window, { Hero, Navbar });