import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PackagesSection from "../components/PackagesSection";

const FREE_CONSULT_URL = "https://calendly.com/dave-mcmaster/free-lsat-consultation";

/* Each entry carries `a` (plain text, used for the FAQPage JSON-LD) and `body`
   (the rendered JSX with internal links). Keep the two in sync when editing. */
const FAQS = [
  {
    q: "How much does tutoring cost? Do packages get a discount?",
    a: "Current rates and package discounts are always up to date at https://www.lsat.academy/services. Single sessions are pay as you go. The 10 and 20-hour packages come at a discount. Both can be booked automatically; the single-hour lessons get scheduled in the course of booking; consult with Josiah for scheduling the packages.",
    body: (
      <>
        <p>
          Current rates and package discounts are always up to date on the{" "}
          <Link to="/services">Services page</Link>. Single sessions are pay as
          you go. The 10 and 20-hour packages come at a discount.
        </p>
        <p>
          Both can be booked automatically. The single-hour lessons get
          scheduled in the course of booking; consult with Josiah for
          scheduling the packages.
        </p>
      </>
    ),
  },
  {
    q: "Have you worked with someone stuck at my score?",
    a: "I have worked with someone stuck at every score up to 176. No one has come to me stuck at 177 or higher, to my knowledge. Beyond that, being stuck at a score is far from uncommon. People often come to a tutor because they've plateaued. There are a number of common places to plateau: right before 170 is one, the early 160s are another. It is true that in general people being stuck at 169 (for instance) is uncommon, but students coming to me stuck at that point are not uncommon. So yes, I've almost definitely worked with people in your situation before.",
    body: (
      <>
        <p>
          I have worked with someone stuck at every score up to 176. No one has
          come to me stuck at 177 or higher, to my knowledge.
        </p>
        <p>
          Beyond that, being stuck at a score is far from uncommon. People
          often come to a tutor because they've plateaued. There are a number
          of common places to plateau: right before 170 is one, the early 160s
          are another. It is true that in general people being stuck at 169
          (for instance) is uncommon, but students coming to me stuck at that
          point are not uncommon.
        </p>
        <p>
          So yes, I've almost definitely worked with people in your situation
          before.
        </p>
      </>
    ),
  },
  {
    q: "What's different about how you teach?",
    a: "Most students who come to me have already done one or more of the following: purchased and gone through a test prep course; read Loophole; read LSAT Trainer; read the PowerScore Bibles; listened to LSAT podcasts; lurked on various LSAT forums. So they almost always come to me having a lot of LSAT information... but not a lot of LSAT skill. There's a fairly large difference. Bridging that gap is what we do together. We put together the various LSAT factoids you possess into a set of standard, effective tools for addressing each question stem type. You're not here to learn something outrageously complex. You want fast, easy tools, useful to work with on test day. Most people don't have them. After learning them, we internalize these tools by using them over and over until the right answers for the hard questions stop being something you can get right, and start being something you can't get wrong.",
    body: (
      <>
        <p>
          Most students who come to me have already done one or more of the
          following: purchased and gone through a test prep course; read
          Loophole; read LSAT Trainer; read the PowerScore Bibles; listened to
          LSAT podcasts; lurked on various LSAT forums. So they almost always
          come to me having a lot of LSAT <em>information</em>&hellip; but not
          a lot of LSAT <em>skill</em>. There's a fairly large difference.
          Bridging that gap is what we do together.
        </p>
        <p>
          We put together the various LSAT factoids you possess into a set of
          standard, effective tools for addressing each question stem type.
          You're not here to learn something outrageously complex. You want
          fast, easy tools, useful to work with on test day. Most people don't
          have them. After learning them, we internalize these tools by using
          them over and over until the right answers for the hard questions
          stop being something you <em>can</em> get right, and start being
          something you <em>can't</em> get wrong.
        </p>
      </>
    ),
  },
  {
    q: "How do I know if you're the right tutor for me or not?",
    a: "Schedule a free tutoring session. Kick the tires. See for yourself whether we're a good fit. Someone could be the best tutor in the world in general but not be the best tutor for you, in particular. So: no obligation, no hard sell. I like what I do. I'm willing to meet with anyone once who needs it. Schedule a free session.",
    body: (
      <>
        <p>
          <a href={FREE_CONSULT_URL} target="_blank" rel="noopener noreferrer">
            Schedule a free tutoring session
          </a>
          . Kick the tires. See for yourself whether we're a good fit. Someone
          could be the best tutor in the world in general but not be the best
          tutor for <em>you</em>, in particular.
        </p>
        <p>
          So: no obligation, no hard sell. I like what I do. I'm willing to
          meet with anyone once who needs it. Schedule a free session.
        </p>
      </>
    ),
  },
  {
    q: "What exactly do I get with the 10-hour package?",
    a: "Ten 1-hour minimum sessions scheduled around your test date. Plus the student portal: a recap of every session, your wrong-answer journal, session notes, and a way for you to reach David directly between sessions with urgent, baffling questions.",
    body: (
      <p>
        Ten 1-hour minimum sessions scheduled around your test date. Plus the
        student portal: a recap of every session, your wrong-answer journal,
        session notes, and a way for you to reach David directly between
        sessions with urgent, baffling questions.
      </p>
    ),
  },
  {
    q: "What's in the 20-hour package? Why pick it over the 10?",
    a: "A student has the chance to get significantly better when working over a longer period of time. The test is one of learned skill, and skills are things we develop only when doing something repeatedly, while using the right methods, over a long enough period of time. This gives us the longer time. It is also charged at a lower rate. And so you purchase it typically when you're working over a longer time-span, you want more tutoring, and you want to pay a lower rate.",
    body: (
      <>
        <p>
          A student has the chance to get significantly better when working
          over a longer period of time. The test is one of learned skill, and
          skills are things we develop only when doing something repeatedly,
          while using the right methods, over a long enough period of time.
          This gives us the longer time.
        </p>
        <p>
          It is also charged at a lower rate. And so you purchase it typically
          when you're working over a longer time-span, you want more tutoring,
          and you want to pay a lower rate.
        </p>
      </>
    ),
  },
  {
    q: "Can you realistically get me from [score] to [target] by [month]?",
    a: "Everything depends. What I can tell you is that the gap between where you are and where you want to be is almost always method, not ability, and method is teachable. Ten hours is enough to rebuild how you approach one section. Twenty is enough to rebuild your whole approach and drill it under time. How far that moves your score depends mostly on what you do between sessions. In general, as you know, the larger the score jump, and the shorter the study time, the more challenging it becomes.",
    body: (
      <>
        <p>
          Everything depends. What I can tell you is that the gap between where
          you are and where you want to be is almost always method, not
          ability, and method is teachable. Ten hours is enough to rebuild how
          you approach one section. Twenty is enough to rebuild your whole
          approach and drill it under time. How far that moves your score
          depends mostly on what you do between sessions.
        </p>
        <p>
          In general, as you know, the larger the score jump, and the shorter
          the study time, the more challenging it becomes.
        </p>
      </>
    ),
  },
  {
    q: "How long is a session?",
    a: "Each paid session lasts a guarantee of at least one hour, perhaps more if progress is being made.",
    body: (
      <p>
        Each paid session lasts a guarantee of at least one hour, perhaps more
        if progress is being made.
      </p>
    ),
  },
  {
    q: "How do I pay?",
    a: "Through the payment links or QR codes at https://www.lsat.academy/services. Checkout runs on Square; card details never touch our servers.",
    body: (
      <p>
        Through the payment links or QR codes on the{" "}
        <Link to="/services">Services page</Link>. Checkout runs on Square;
        card details never touch our servers.
      </p>
    ),
  },
  {
    q: "What if I need to cancel? Do you refund unused hours?",
    a: "Yes. Any used hours will be re-priced as single sessions, and the balance remaining will be refunded.",
    body: (
      <p>
        Yes. Any used hours will be re-priced as single sessions, and the
        balance remaining will be refunded.
      </p>
    ),
  },
  {
    q: "Do my package hours expire?",
    a: "Six months from purchase. That said, if life happens, email me before they lapse. We'll sort it out.",
    body: (
      <p>
        Six months from purchase. That said, if life happens,{" "}
        <a href="mailto:david@lsat.academy">email me</a> before they lapse.
        We'll sort it out.
      </p>
    ),
  },
  {
    q: "I've paid — what happens now?",
    a: "Three things, in order: you get a confirmation email from me. You book your sessions at https://www.lsat.academy/book-session (every open slot is David's real availability, so grab the times you want early). And you get access to the student portal: session recaps, your wrong-answer journal, notes, your questions with David.",
    body: (
      <>
        <p>Three things, in order:</p>
        <ol>
          <li>You get a confirmation email from me.</li>
          <li>
            You book your sessions at{" "}
            <Link to="/book-session">lsat.academy/book-session</Link> (every
            open slot is David's real availability, so grab the times you want
            early).
          </li>
          <li>
            You get access to the student portal: session recaps, your
            wrong-answer journal, notes, your questions with David.
          </li>
        </ol>
      </>
    ),
  },
  {
    q: "Are sessions recorded? Do I get them?",
    a: "Yes, with your consent. Recordings and notes show up in your portal, so the fix is still there when it gets fuzzy three weeks later.",
    body: (
      <p>
        Yes, with your consent. Recordings and notes show up in your portal, so
        the fix is still there when it gets fuzzy three weeks later.
      </p>
    ),
  },
  {
    q: "What do I do between sessions? Is there homework?",
    a: "You drill the question types we worked on, and you keep a wrong-answer journal. Practice tests: at most one a week, at least one a month.",
    body: (
      <p>
        You drill the question types we worked on, and you keep a wrong-answer
        journal. Practice tests: at most one a week, at least one a month.
      </p>
    ),
  },
  {
    q: "What tools will we use?",
    a: "Zoom for sessions, a shared Miro board for working problems, the student portal, and the drill finder (beta) for targeted practice.",
    body: (
      <p>
        Zoom for sessions, a shared Miro board for working problems, the
        student portal, and the{" "}
        <Link to="/drill-finder">drill finder (beta)</Link> for targeted
        practice.
      </p>
    ),
  },
  {
    q: "Who do I contact for what?",
    a: "Scheduling, payments, portal issues: Josiah, josiah@lsat.academy. LSAT questions between sessions: David, via the student portal or david@lsat.academy.",
    body: (
      <p>
        Scheduling, payments, portal issues: Josiah,{" "}
        <a href="mailto:josiah@lsat.academy">josiah@lsat.academy</a>. LSAT
        questions between sessions: David, via the student portal or{" "}
        <a href="mailto:david@lsat.academy">david@lsat.academy</a>.
      </p>
    ),
  },
];

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

const styles = {
  hero: {
    background: "var(--cream-100)",
    padding: "120px 0 64px",
    position: "relative",
    overflow: "hidden",
  },
  grain: {
    position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none",
    backgroundImage:
      "radial-gradient(circle at 20% 80%, rgba(42,142,158,0.08), transparent 50%), radial-gradient(circle at 90% 10%, rgba(2,50,71,0.06), transparent 60%)",
  },
  eyebrowRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "var(--teal-500)" },
  h1: { color: "var(--navy-900)", marginBottom: 20 },
  sub: { fontSize: 19, color: "var(--ink-700)", maxWidth: 720, lineHeight: 1.5 },
  listWrap: { background: "var(--cream-100)", padding: "0 0 110px" },
  // No max-width of its own: the list fills the same .container as the hero
  // so the section edges line up down the page.
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  // "Still got questions?" — same HubSpot form + layout as the Home contact section.
  contactWrap: { padding: "100px 0", background: "#fff" },
  contactGrid: {
    display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80,
    alignItems: "start", maxWidth: 1100, margin: "0 auto",
  },
  contactKicker: { fontSize: 16, color: "var(--ink-700)", marginTop: 20, lineHeight: 1.6 },
  contactCard: {
    background: "#fff", borderRadius: 24, padding: 24,
    boxShadow: "var(--shadow-card)",
    border: "1px solid rgba(10,37,64,0.06)",
    display: "flex", flexDirection: "column", gap: 20,
  },
  item: () => ({
    background: "#fff",
    border: "1px solid rgba(2,50,71,0.12)",
    overflow: "hidden",
  }),
  // The global stylesheet gives every <button> a pill shape, gradient and drop
  // shadow — reset all of it so the rows read as flat list items.
  question: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: "22px 26px",
    background: "transparent",
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
    transform: "none",
    cursor: "pointer",
    textAlign: "left",
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--navy-900)",
    lineHeight: 1.35,
  },
  chevron: (open) => ({
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: open ? "var(--teal-500)" : "var(--cream-100)",
    color: open ? "#fff" : "var(--navy-900)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: open ? "rotate(180deg)" : "none",
    transition: "all 0.25s ease",
  }),
  answer: {
    padding: "0 26px 26px",
    fontSize: 15.5,
    color: "var(--ink-700)",
    lineHeight: 1.7,
  },
};

const FaqItem = ({ item, open, onToggle, index }) => (
  <div style={styles.item()}>
    <button
      style={styles.question}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={`faq-answer-${index}`}
    >
      <span>{item.q}</span>
      <span style={styles.chevron(open)} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </button>
    {open && (
      <div id={`faq-answer-${index}`} style={styles.answer} className="faq-answer">
        {item.body}
      </div>
    )}
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  // Same HubSpot embed loader as the Home contact section.
  useEffect(() => {
    const src = "https://js-na2.hsforms.net/forms/embed/241937818.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | LSAT Academy</title>
        <meta
          name="description"
          content="Answers to the questions students ask after their free LSAT consultation — pricing, packages, session length, payment, refunds, scheduling, and what happens between sessions."
        />
        <link rel="canonical" href="https://www.lsat.academy/faq" />
        <meta property="og:title" content="Frequently Asked Questions | LSAT Academy" />
        <meta property="og:description" content="Answers to the questions students ask after their free LSAT consultation — pricing, packages, session length, payment, refunds, scheduling, and what happens between sessions." />
        <meta property="og:url" content="https://www.lsat.academy/faq" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Frequently Asked Questions | LSAT Academy" />
        <meta name="twitter:description" content="Answers to the questions students ask after their free LSAT consultation — pricing, packages, session length, payment, refunds, scheduling, and what happens between sessions." />
        <script type="application/ld+json">{faqSchema}</script>
      </Helmet>

      <style>{`
        .faq-answer p { margin: 0 0 14px; }
        .faq-answer p:last-child { margin-bottom: 0; }
        .faq-answer ol { margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 8px; }
        .faq-answer a { color: var(--teal-500); text-decoration: underline; text-underline-offset: 2px; }
        .faq-answer a:hover { color: var(--navy-900); }
      `}</style>

      <div className="v2">
      <section style={styles.hero}>
        <div style={styles.grain} />
        <div className="container" style={{ position: "relative" }}>
          <div style={styles.eyebrowRow}>
            <span style={styles.dot} />
            <span className="eyebrow eyebrow-teal">After your consult</span>
          </div>
          <h1 style={styles.h1}>
            Frequently asked{" "}
            <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
              questions.
            </span>
          </h1>
          <p style={styles.sub}>
            The questions students most often ask after their free consultation.
          </p>
        </div>
      </section>

      <section style={styles.listWrap}>
        <div className="container">
          <div style={styles.list}>
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

        </div>
      </section>

      <section id="packages" style={{ background: "var(--cream-100)", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <PackagesSection />
        </div>
      </section>

      <section style={styles.contactWrap} id="contact">
        <div className="container">
          <div style={styles.contactGrid} className="contact-grid">
            <div style={{ maxWidth: 380 }}>
              <div className="eyebrow eyebrow-teal" style={{ marginBottom: 16 }}>Get in touch</div>
              <h2>
                Still got{" "}
                <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
                  questions?
                </span>
              </h2>
              <p style={styles.contactKicker}>
                If yours isn&rsquo;t answered above, fill out the form.
              </p>
            </div>

            <div style={styles.contactCard}>
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
      </div>
    </>
  );
};

export default Faq;
