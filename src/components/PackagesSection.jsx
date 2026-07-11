import React from "react";

const packages = [
  {
    id: "single",
    label: "Single Session",
    hours: 1,
    ratePerHour: 120,
    discount: 0,
    badge: null,
    featured: false,
    description: "Targeted help on a specific section or concept. No commitment.",
    payUrl: "https://checkout.square.site/merchant/6P7HMZE18EHHR/checkout/I4LPBSSD5JRMKCNFSS7O7GYS",
    qr: "/assets/qr-single.png",
  },
  {
    id: "ten",
    label: "10-Hour Package",
    hours: 10,
    ratePerHour: 120,
    discount: 0.05,
    badge: "5% OFF",
    featured: false,
    description: "Build strong fundamentals across key LSAT topics over multiple sessions.",
    payUrl: "https://square.link/u/33e4xtC3",
    qr: "/assets/qr-10h.png",
  },
  {
    id: "twenty",
    label: "20-Hour Package",
    hours: 20,
    ratePerHour: 120,
    discount: 0.15,
    badge: "Best Value · 15% OFF",
    featured: true,
    description: "Full prep coverage, from fundamentals through timed practice and strategy refinement.",
    payUrl: "https://square.link/u/1ZClbmM7",
    qr: "/assets/qr-20h.png",
  },
];

const fmt = (n) => {
  const fixed = parseFloat(n.toFixed(2));
  return Number.isInteger(fixed) ? `$${fixed}` : `$${fixed.toFixed(2)}`;
};

const styles = {
  head: { textAlign: "center", maxWidth: 640, margin: "0 auto 56px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    maxWidth: 1080,
    margin: "0 auto",
    alignItems: "stretch",
  },
  card: (featured) => ({
    background: featured ? "var(--navy-900)" : "#fff",
    color: featured ? "#fff" : "var(--navy-900)",
    border: featured ? "none" : "1px solid var(--ink-200)",
    borderRadius: "var(--radius-lg)",
    padding: 36,
    display: "flex",
    flexDirection: "column",
    gap: 18,
    position: "relative",
    transform: featured ? "translateY(-20px)" : "none",
    boxShadow: featured ? "0 30px 60px -20px rgba(2,50,71,0.4)" : "var(--shadow-card)",
  }),
  badge: (featured) => ({
    position: "absolute",
    top: -12,
    right: 24,
    background: featured ? "var(--teal-500)" : "var(--cream-200)",
    color: featured ? "#fff" : "var(--navy-900)",
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    padding: "6px 12px",
    borderRadius: 999,
    fontWeight: 600,
    whiteSpace: "nowrap",
  }),
  eyebrow: (featured) => ({
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: featured ? "var(--teal-300)" : "var(--teal-500)",
  }),
  title: {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  desc: (featured) => ({
    fontSize: 14,
    lineHeight: 1.55,
    color: featured ? "rgba(255,255,255,0.7)" : "var(--ink-700)",
    minHeight: 44,
  }),
  priceBlock: { display: "flex", flexDirection: "column", gap: 6 },
  priceRow: { display: "flex", alignItems: "baseline", gap: 8 },
  priceAmount: {
    fontFamily: "var(--font-display)",
    fontSize: 48,
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },
  priceUnit: (featured) => ({
    fontSize: 14,
    color: featured ? "rgba(255,255,255,0.55)" : "var(--ink-500)",
  }),
  priceSub: (featured) => ({
    fontSize: 13,
    color: featured ? "rgba(255,255,255,0.6)" : "var(--ink-500)",
    lineHeight: 1.5,
  }),
  priceOriginal: (featured) => ({
    fontSize: 13,
    color: featured ? "rgba(255,255,255,0.5)" : "var(--ink-400)",
    textDecoration: "line-through",
  }),
  savings: (featured) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.02em",
    background: featured ? "rgba(108,191,204,0.18)" : "var(--teal-50)",
    color: featured ? "var(--teal-300)" : "var(--teal-500)",
    border: featured ? "1px solid rgba(108,191,204,0.3)" : "1px solid var(--teal-100)",
    width: "fit-content",
    marginTop: 4,
  }),
  divider: (featured) => ({
    border: "none",
    height: 1,
    background: featured ? "rgba(255,255,255,0.12)" : "var(--ink-100)",
    margin: "8px 0",
  }),
  btn: (featured) => ({
    marginTop: "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "13px 22px",
    borderRadius: 999,
    background: featured ? "#fff" : "linear-gradient(to right, #023247, #0A6EA1)",
    color: featured ? "var(--navy-900)" : "#fff",
    fontWeight: 600,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform .15s ease, box-shadow .2s ease",
    boxShadow: featured ? "0 4px 14px rgba(0,0,0,0.18)" : "0 4px 14px rgba(2, 50, 71, 0.28)",
  }),
  qrBlock: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  qrImg: (featured) => ({
    width: 116,
    height: 116,
    borderRadius: 10,
    background: "#fff",
    padding: 8,
    border: featured ? "1px solid rgba(255,255,255,0.18)" : "1px solid var(--ink-100)",
  }),
  qrLabel: (featured) => ({
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: featured ? "rgba(255,255,255,0.6)" : "var(--ink-500)",
  }),
  footer: {
    textAlign: "center",
    marginTop: 48,
    fontSize: 12,
    color: "var(--ink-500)",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.06em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
};

const PackagesSection = ({
  heading = "Tutoring packages",
  subheading = "1-on-1 sessions with David McMaster, tailored to your goals and schedule.",
}) => (
  <>
    <div style={styles.head}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Pricing</div>
      <h2>
        {heading.split(" ").slice(0, -1).join(" ")}{" "}
        <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
          {heading.split(" ").slice(-1)}
        </span>
      </h2>
      <p style={{ marginTop: 16, fontSize: 17, color: "var(--ink-700)", lineHeight: 1.55 }}>
        {subheading}
      </p>
    </div>

    <div style={styles.grid} className="services-grid">
      {packages.map((pkg) => {
        const original = pkg.hours * pkg.ratePerHour;
        const total = original * (1 - pkg.discount);
        const savings = original - total;
        const perHour = total / pkg.hours;

        return (
          <div key={pkg.id} style={styles.card(pkg.featured)}>
            {pkg.badge && <div style={styles.badge(pkg.featured)}>{pkg.badge}</div>}

            <div style={styles.eyebrow(pkg.featured)}>
              {pkg.hours} {pkg.hours === 1 ? "hour" : "hours"}
            </div>
            <div style={styles.title}>{pkg.label}</div>
            <div style={styles.desc(pkg.featured)}>{pkg.description}</div>

            <div style={styles.priceBlock}>
              <div style={styles.priceRow}>
                <span style={styles.priceAmount}>{fmt(total)}</span>
                <span style={styles.priceUnit(pkg.featured)}>
                  {pkg.hours === 1 ? "/ hr" : "total"}
                </span>
              </div>

              {pkg.hours > 1 ? (
                <>
                  <div style={styles.priceSub(pkg.featured)}>
                    {fmt(perHour)}/hr · billed as one payment
                  </div>
                  <div style={styles.priceOriginal(pkg.featured)}>
                    Regular price: {fmt(original)}
                  </div>
                </>
              ) : (
                <div style={styles.priceSub(pkg.featured)}>
                  No commitment · pay per session
                </div>
              )}

              {savings > 0 && (
                <div style={styles.savings(pkg.featured)}>You save {fmt(savings)}</div>
              )}
            </div>

            <hr style={styles.divider(pkg.featured)} />

            <a
              href={pkg.payUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.btn(pkg.featured)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="14" rx="2" />
                <line x1="2" y1="11" x2="22" y2="11" />
              </svg>
              Pay now
            </a>

            {pkg.qr && (
              <div style={styles.qrBlock}>
                <img
                  src={pkg.qr}
                  alt={`QR code to pay for the ${pkg.label}`}
                  style={styles.qrImg(pkg.featured)}
                  width="116"
                  height="116"
                  loading="lazy"
                  decoding="async"
                />
                <span style={styles.qrLabel(pkg.featured)}>Scan to pay</span>
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div style={styles.footer}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
      Secure checkout powered by Square · Card details never stored on our servers
    </div>
  </>
);

export default PackagesSection;
