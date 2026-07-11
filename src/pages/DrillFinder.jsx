import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { drillClient, drillConfigured, DRILL_TABLE, DRILL_REVIEWS } from "../lib/drillClient";
import { lawhubLink } from "../data/ptLinks";

// The per-question "what it asks" paraphrases (~200 KB) live as a static asset
// in public/ and are fetched on demand, so they don't bloat the JS bundle that
// every visitor downloads — only Drill Finder visitors pay for them, cached.
const DRILL_ASKS_URL = `${import.meta.env.BASE_URL}data/drillAsks.json`;

/* ============================================================
   Drill Finder — filterable bank of LSAT LR questions
   (PrepTests 101–159), classified by subtype, difficulty,
   question type and argument structure.
   Data lives in a dedicated Supabase project (see drillClient.js).
   ============================================================ */

const PAGE_SIZE = 50;

// Preferred display order for the scaled fields; everything else is
// derived alphabetically from whatever the data actually contains.
const DIFFICULTY_ORDER = [1, 2, 3, 4];
const CONFIDENCE_ORDER = ["HIGH", "MEDIUM", "LOW"];
const SECTION_ORDER = [1, 2, 3, 4];

const DIFFICULTY_LABEL = {
  1: "1 · Easiest",
  2: "2 · Easy–Med",
  3: "3 · Hard",
  4: "4 · Hardest",
};

// Helper content shown in the info popups beside each filter.
const HELP = {
  subtype: {
    title: "Subtype",
    intro: "The nine families of LSAT Logical Reasoning questions.",
    items: [
      ["Assumptions", "What the argument must take for granted — Necessary & Sufficient Assumption questions."],
      ["Conclusions and Disputes", "Identify the main conclusion, or the point two speakers disagree on."],
      ["Deductions and Inference", "What must be true, or is most strongly supported, given the statements."],
      ["Explain or Resolve", "Find the fact that resolves an apparent paradox or discrepancy."],
      ["Flaws", "Name the logical error the argument commits."],
      ["Matching Flaws", "Find the answer whose flawed reasoning parallels the stimulus."],
      ["Matching Structure and Principles", "Find the argument with the same logical structure (Parallel Reasoning)."],
      ["Strengthen or Weaken", "Find the fact that makes the argument stronger or weaker."],
      ["Techniques/Roles/Principles", "Method of reasoning, the role a statement plays, and principle questions."],
    ],
  },
  testType: {
    title: "Question type",
    intro: "The specific task, taken from the question stem.",
    items: [
      ["Evaluate", "Which question, if answered, would most help assess the argument."],
      ["Explain-Resolve", "Resolve a paradox between two seemingly conflicting facts."],
      ["Flaw", "Identify the reasoning error."],
      ["Main-Point", "State the argument's main conclusion."],
      ["Method-of-Reasoning", "Describe how the argument proceeds."],
      ["Most-Strongly-Supported", "Which answer the statements best support."],
      ["Must-Be-True", "What must follow if the statements are true."],
      ["Necessary-Assumption", "An assumption the argument requires to work."],
      ["Parallel-Flaw", "Match the stimulus's flawed reasoning."],
      ["Parallel-Reasoning", "Match the stimulus's valid logical structure."],
      ["Point-of-Disagreement", "What two speakers disagree about."],
      ["Principle-Apply", "Apply a stated principle to a specific case."],
      ["Principle-Identify", "Find the principle the argument illustrates."],
      ["Role-of-Statement", "The function a claim plays in the argument."],
      ["Strengthen", "Add support to the argument."],
      ["Sufficient-Assumption", "An assumption that, added, makes the argument valid."],
      ["Weaken", "Undermine the argument."],
    ],
  },
  structure: {
    title: "Argument structure",
    intro: "The underlying logical shape of the argument.",
    items: [
      ["Analogical", "Reasons by analogy between two similar cases."],
      ["Authority-Character", "Relies on an authority's credibility or a person's character."],
      ["Causal", "Claims one thing causes another."],
      ["Circular", "Assumes the very conclusion it tries to prove."],
      ["Conditional", "Built on if–then (sufficient / necessary) relationships."],
      ["Definitional-Conceptual", "Turns on the meaning of a term or concept."],
      ["Disjunctive", "Reasons from either/or alternatives."],
      ["General-Specific", "Moves between a general rule and a specific case."],
      ["Hybrid", "Combines two or more structures."],
      ["Inference-Best-Explanation", "Concludes the best explanation of the evidence."],
      ["Majority-Overlap", "Reasons about overlapping majorities or proportions."],
      ["Practical-Means-End", "Reasons about the means to achieve a goal."],
      ["Principle-Application", "Applies a general principle to reach a conclusion."],
      ["Reductio", "Disproves a claim by showing it leads to absurdity."],
      ["Scope-Concept-Shift", "Conclusion shifts to a concept the premises didn't cover."],
      ["Statistical", "Reasons from numbers, percentages, or samples."],
      ["Temporal", "Reasons from timing or change over time."],
    ],
  },
  difficulty: {
    title: "Difficulty",
    intro: "David's difficulty rating for each question.",
    items: [
      ["1", "Easiest."],
      ["2", "Easy–medium."],
      ["3", "Hard."],
      ["4", "Hardest."],
    ],
  },
};

const prettyStructure = (s) =>
  (s || "")
    .toLowerCase()
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Our own plain-English description of what each question type asks the test-taker
// to do — shown instead of the verbatim LSAC question stem (which is copyrighted).
const TASK_BY_TYPE = Object.fromEntries(HELP.testType.items.map(([k, v]) => [k, v]));

/* ---------- styles ---------- */

const S = {
  hero: {
    background: "var(--cream-100)",
    padding: "120px 0 56px",
    position: "relative",
    overflow: "hidden",
  },
  heroGrain: {
    position: "absolute",
    inset: 0,
    opacity: 0.4,
    pointerEvents: "none",
    backgroundImage:
      "radial-gradient(circle at 18% 80%, rgba(42,142,158,0.08), transparent 50%), radial-gradient(circle at 90% 8%, rgba(2,50,71,0.06), transparent 60%)",
  },
  heroInner: { position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" },
  eyebrowRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "var(--teal-500)" },
  h1: { color: "var(--navy-900)", marginBottom: 18 },
  sub: { fontSize: 19, color: "var(--ink-700)", maxWidth: 640, lineHeight: 1.5, margin: "0 auto" },

  body: { background: "#fff", padding: "48px 0 120px" },

  // filter toolbar (dropdowns across the top)
  filterList: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
    paddingBottom: 24,
    borderBottom: "1px solid var(--ink-100)",
  },
  filterRow: { display: "inline-flex", alignItems: "center", gap: 8 },
  infoWrap: { position: "relative", display: "inline-flex" },
  infoIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--ink-400)",
    // hard reset against the global `button { ... }` rule in the site stylesheet
    background: "none",
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
    padding: 0,
    margin: 0,
    width: "auto",
    minWidth: 0,
    height: "auto",
    fontSize: "inherit",
    lineHeight: 0,
  },
  tip: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    zIndex: 40,
    width: "min(340px, calc(100vw - 48px))",
    background: "#fff",
    border: "1px solid var(--ink-200)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-md)",
    padding: "14px 16px",
    textAlign: "left",
  },
  tipTitle: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--teal-500)",
    marginBottom: 8,
    fontWeight: 600,
  },
  tipIntro: { fontSize: 13, color: "var(--ink-700)", lineHeight: 1.5, marginBottom: 10 },
  tipItem: { fontSize: 12.5, lineHeight: 1.5, marginBottom: 7, color: "var(--ink-700)" },
  tipTerm: { fontWeight: 700, color: "var(--navy-900)" },
  dropBtn: (active) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 18px",
    borderRadius: "var(--radius-pill)",
    border: active ? "1.5px solid var(--teal-500)" : "1.5px solid var(--ink-200)",
    background: active ? "var(--teal-50)" : "#fff",
    color: "var(--navy-900)",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    transition: "all .15s ease",
    whiteSpace: "nowrap",
  }),
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 18,
    height: 18,
    padding: "0 5px",
    borderRadius: 9,
    background: "var(--teal-500)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    zIndex: 30,
    minWidth: 240,
    maxWidth: 340,
    maxHeight: 340,
    overflowY: "auto",
    background: "#fff",
    border: "1px solid var(--ink-200)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-md)",
    padding: 10,
  },
  optionList: { display: "flex", flexDirection: "column", gap: 6 },
  optionItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "9px 10px",
    borderRadius: "var(--radius-sm)",
    border: "none",
    background: active ? "var(--teal-50)" : "transparent",
    color: active ? "var(--navy-900)" : "var(--ink-700)",
    fontSize: 13.5,
    fontWeight: active ? 600 : 500,
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    textAlign: "left",
    transition: "background .12s ease",
  }),
  checkbox: (active) => ({
    width: 17,
    height: 17,
    borderRadius: 5,
    flexShrink: 0,
    border: active ? "1.5px solid var(--teal-500)" : "1.5px solid var(--ink-200)",
    background: active ? "var(--teal-500)" : "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  }),
  rangeRow: { display: "flex", alignItems: "center", gap: 10 },
  select: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: "var(--radius-sm)",
    border: "1.5px solid var(--ink-200)",
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: "var(--ink-900)",
    background: "#fff",
    cursor: "pointer",
  },
  resetBtn: {
    padding: "11px 18px",
    borderRadius: "var(--radius-pill)",
    border: "none",
    background: "transparent",
    color: "var(--teal-500)",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  // results
  count: { fontSize: 15, color: "var(--ink-700)", marginBottom: 18 },
  countNum: { color: "var(--navy-900)", fontWeight: 700 },
  tableWrap: {
    border: "1px solid var(--ink-100)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
  },
  tableScroll: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 840 },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    background: "var(--cream-50)",
    borderBottom: "1px solid var(--ink-100)",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--ink-500)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  td: {
    padding: "14px 16px",
    borderBottom: "1px solid var(--ink-100)",
    fontSize: 14,
    color: "var(--ink-900)",
    verticalAlign: "top",
  },
  ptCell: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    color: "var(--navy-900)",
    whiteSpace: "nowrap",
  },
  tag: (bg, fg) => ({
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "var(--radius-pill)",
    background: bg,
    color: fg,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
  }),
  stemCell: {
    fontSize: 13,
    color: "var(--ink-500)",
    maxWidth: 320,
    lineHeight: 1.45,
  },
  pager: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 28,
  },
  pageBtn: (disabled) => ({
    padding: "9px 18px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid var(--ink-200)",
    background: disabled ? "var(--cream-50)" : "#fff",
    color: disabled ? "var(--ink-400)" : "var(--navy-900)",
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  pageInfo: { fontSize: 14, color: "var(--ink-600)", fontFamily: "var(--font-mono)" },
  empty: {
    padding: "64px 32px",
    textAlign: "center",
    color: "var(--ink-500)",
    border: "1px dashed var(--ink-200)",
    borderRadius: "var(--radius-md)",
  },
  notice: {
    padding: "20px 24px",
    borderRadius: "var(--radius-md)",
    background: "var(--teal-50)",
    border: "1px solid var(--teal-100)",
    color: "var(--navy-800)",
    fontSize: 14,
    lineHeight: 1.55,
    marginBottom: 28,
  },

  // review column + modal
  reviewBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 13px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid var(--ink-200)",
    background: "#fff",
    color: "var(--navy-900)",
    fontSize: 12.5,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  viewBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 13px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid var(--teal-500)",
    background: "var(--teal-50)",
    color: "var(--navy-900)",
    fontSize: 12.5,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    textDecoration: "none",
  },
  viewBtnDisabled: {
    fontSize: 12.5,
    color: "var(--ink-400)",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,50,71,0.45)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    width: "100%",
    maxWidth: 460,
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
    background: "#fff",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    padding: "28px 28px 24px",
    position: "relative",
  },
  modalTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 24,
    color: "var(--navy-900)",
    fontWeight: 400,
    marginBottom: 6,
  },
  modalRefLine: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--ink-500)",
    marginBottom: 16,
    letterSpacing: "0.04em",
  },
  modalTags: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 },
  modalTag: {
    padding: "5px 11px",
    borderRadius: "var(--radius-pill)",
    background: "var(--cream-100)",
    color: "var(--ink-700)",
    fontSize: 12,
    fontWeight: 500,
  },
  qLabel: { fontSize: 14, fontWeight: 600, color: "var(--navy-900)", marginBottom: 10 },
  ratingRow: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" },
  ratingBtn: (active) => ({
    flex: "1 1 0",
    minWidth: 96,
    padding: "10px 12px",
    borderRadius: "var(--radius-sm)",
    border: active ? "1.5px solid var(--teal-500)" : "1.5px solid var(--ink-200)",
    background: active ? "var(--teal-50)" : "#fff",
    color: active ? "var(--navy-900)" : "var(--ink-700)",
    fontSize: 13,
    fontWeight: active ? 600 : 500,
    cursor: "pointer",
  }),
  textarea: {
    width: "100%",
    minHeight: 84,
    padding: "12px 14px",
    borderRadius: "var(--radius-sm)",
    border: "1.5px solid var(--ink-200)",
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: "var(--ink-900)",
    resize: "vertical",
    outline: "none",
    marginBottom: 20,
  },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "center" },
  ghostBtn: {
    padding: "11px 20px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid var(--ink-200)",
    background: "#fff",
    color: "var(--ink-700)",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  errorText: { color: "#b3261e", fontSize: 13, marginRight: "auto" },
  successWrap: { textAlign: "center", padding: "16px 0 8px" },
  successIcon: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "var(--teal-50)",
    color: "var(--teal-500)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
  },
};

const difficultyTag = (d) => {
  const map = {
    1: ["#e4f5e9", "#1f7a44"],
    2: ["#e4f1f4", "#0f5e7e"],
    3: ["#fff1e8", "#c2521f"],
    4: ["#fde7e7", "#b3261e"],
  };
  const [bg, fg] = map[d] || ["var(--ink-100)", "var(--ink-700)"];
  return S.tag(bg, fg);
};

const Chevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ---------- dropdown filter (multi-select) ---------- */

const FilterDropdown = ({ label, count, isOpen, onToggleOpen, children }) => (
  <div style={{ position: "relative" }} className="drill-ddwrap">
    <button type="button" style={S.dropBtn(count > 0 || isOpen)} className="drill-dropbtn" onClick={onToggleOpen} aria-expanded={isOpen}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
        {label}
        {count > 0 && <span style={S.badge}>{count}</span>}
      </span>
      <Chevron />
    </button>
    {isOpen && <div style={S.panel} className="drill-panel">{children}</div>}
  </div>
);

const InfoTip = ({ help }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!help) return null;
  return (
    <span style={S.infoWrap} ref={ref}>
      <button
        type="button"
        style={S.infoIcon}
        aria-label={`About ${help.title}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>
      {open && (
        <div style={S.tip} role="tooltip">
          <div style={S.tipTitle}>{help.title}</div>
          {help.intro && <div style={S.tipIntro}>{help.intro}</div>}
          {help.items?.map(([term, def]) => (
            <div key={term} style={S.tipItem}>
              <span style={S.tipTerm}>{term}</span>: {def}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

const ChipOptions = ({ options, selected, onToggle, render }) => (
  <div style={S.optionList}>
    {options.map((opt) => {
      const active = selected.has(opt);
      return (
        <button key={String(opt)} type="button" style={S.optionItem(active)} onClick={() => onToggle(opt)} aria-pressed={active}>
          <span style={S.checkbox(active)}>
            {active && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </span>
          {render ? render(opt) : opt}
        </button>
      );
    })}
  </div>
);

/* ---------- per-row review modal ---------- */

const RATINGS = [
  { key: "accurate", label: "Looks right" },
  { key: "somewhat", label: "Partly off" },
  { key: "inaccurate", label: "Not right" },
];

const ReviewModal = ({ row, onClose }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async () => {
    if (!rating || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const { error: err } = await drillClient.from(DRILL_REVIEWS).insert({
        question_id: row.id,
        preptest: row.preptest,
        section: row.section,
        question: row.question,
        rating,
        comment: comment.trim() || null,
      });
      if (err) throw err;
      setDone(true);
    } catch (e) {
      setError(e?.message || "Couldn’t submit — please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div style={S.overlay} onMouseDown={onClose}>
      <div style={S.modal} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {done ? (
          <div style={S.successWrap}>
            <span style={S.successIcon}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <div style={S.modalTitle}>Thanks!</div>
            <p style={{ color: "var(--ink-600)", fontSize: 15, marginBottom: 22 }}>
              Your feedback has been recorded.
            </p>
            <button type="button" className="btn btn-primary" style={{ justifyContent: "center" }} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div style={S.modalTitle}>Review this classification</div>
            <div style={S.modalRefLine}>
              PT{row.preptest} · Section {row.section} · Question {row.question}
            </div>
            <div style={S.modalTags}>
              <span style={S.modalTag}>{row.subtype}</span>
              <span style={S.modalTag}>{row.test_prep_type}</span>
              <span style={S.modalTag}>{prettyStructure(row.structure_type)}</span>
              <span style={S.modalTag}>Difficulty {row.difficulty}</span>
            </div>

            <div style={S.qLabel}>Does this classification look right to you?</div>
            <div style={S.ratingRow}>
              {RATINGS.map((r) => (
                <button key={r.key} type="button" style={S.ratingBtn(rating === r.key)} onClick={() => setRating(r.key)}>
                  {r.label}
                </button>
              ))}
            </div>

            <textarea
              className="drill-review-input"
              style={S.textarea}
              placeholder="Optional: suggest a correction or add a note…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div style={S.modalActions}>
              {error && <span style={S.errorText}>{error}</span>}
              <button type="button" style={S.ghostBtn} onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ justifyContent: "center", opacity: rating && !submitting ? 1 : 0.5 }}
                onClick={submit}
                disabled={!rating || submitting}
              >
                {submitting ? "Submitting…" : "Submit review"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- page ---------- */

const emptyFilters = () => ({
  subtype: new Set(),
  testType: new Set(),
  structure: new Set(),
  difficulty: new Set(),
  confidence: new Set(),
  section: new Set(),
});

const DrillFinder = () => {
  const [rows, setRows] = useState([]);
  const [asks, setAsks] = useState({});
  const [status, setStatus] = useState("loading"); // loading | ready | error | unconfigured
  const [errorMsg, setErrorMsg] = useState("");

  const [filters, setFilters] = useState(emptyFilters);
  const [searchParams] = useSearchParams();
  const [ptMin, setPtMin] = useState("");
  const [ptMax, setPtMax] = useState("");
  const [page, setPage] = useState(1);
  const [openKey, setOpenKey] = useState(null);
  const [reviewRow, setReviewRow] = useState(null);

  const toolbarRef = useRef(null);

  /* ---- fetch the full bank once, then filter/paginate client-side ----
     Supabase caps a single response at 1000 rows, so the bank (~3k rows) needs
     several requests. Rather than chain them one-after-another (a waterfall that
     blocks render until the last finishes), we ask for the exact row count once,
     then fire every page in parallel. The "what it asks" paraphrases load as a
     static asset in the same parallel batch. */
  useEffect(() => {
    if (!drillConfigured) {
      setStatus("unconfigured");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const STEP = 1000;
        // Asks file is independent of the DB — kick it off immediately.
        const asksPromise = fetch(DRILL_ASKS_URL)
          .then((r) => (r.ok ? r.json() : {}))
          .catch(() => ({}));

        const { count, error: countErr } = await drillClient
          .from(DRILL_TABLE)
          .select("id", { count: "exact", head: true });
        if (countErr) throw countErr;

        const pages = Math.max(1, Math.ceil((count || 0) / STEP));
        const requests = Array.from({ length: pages }, (_, i) =>
          drillClient
            .from(DRILL_TABLE)
            .select(
              "id,preptest,section,question,subtype,difficulty,test_prep_type,structure_type,structure_subtype,confidence"
            )
            .order("preptest", { ascending: true })
            .order("section", { ascending: true })
            .order("question", { ascending: true })
            .range(i * STEP, i * STEP + STEP - 1)
        );

        const results = await Promise.all(requests);
        // Promise.all preserves request order, so concatenating keeps the global
        // PT·Section·Question ordering intact across page boundaries.
        const all = [];
        for (const { data, error } of results) {
          if (error) throw error;
          all.push(...(data || []));
        }
        const asksData = await asksPromise;
        if (!cancelled) {
          setAsks(asksData || {});
          setRows(all);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err?.message || "Failed to load questions.");
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- seed filters from URL params (e.g. ?type=Weaken&difficulty=4),
         used by the Wrong Answer Journal's "drill these" recommendation ---- */
  useEffect(() => {
    const type = searchParams.get("type");
    const difficulty = searchParams.get("difficulty");
    if (!type && !difficulty) return;
    setFilters((prev) => {
      const next = { ...prev, testType: new Set(prev.testType), difficulty: new Set(prev.difficulty) };
      if (type) next.testType.add(type);
      if (difficulty) next.difficulty.add(Number(difficulty));
      return next;
    });
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- close any open dropdown on outside click / Escape ---- */
  useEffect(() => {
    if (!openKey) return undefined;
    const onDown = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) setOpenKey(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openKey]);

  /* ---- derive filter option lists from the data ---- */
  const options = useMemo(() => {
    const uniq = (key) => [...new Set(rows.map((r) => r[key]).filter((v) => v != null && v !== ""))];
    const ordered = (vals, order) => {
      const set = new Set(vals);
      const head = order.filter((o) => set.has(o));
      const tail = vals.filter((v) => !order.includes(v)).sort();
      return [...head, ...tail];
    };
    return {
      subtype: uniq("subtype").sort(),
      testType: uniq("test_prep_type").sort(),
      structure: uniq("structure_type").sort(),
      difficulty: ordered(uniq("difficulty"), DIFFICULTY_ORDER),
      confidence: ordered(uniq("confidence"), CONFIDENCE_ORDER),
      section: ordered(uniq("section"), SECTION_ORDER),
      pts: uniq("preptest").sort((a, b) => a - b),
    };
  }, [rows]);

  /* ---- filtering ---- */
  const filtered = useMemo(() => {
    const min = ptMin ? Number(ptMin) : -Infinity;
    const max = ptMax ? Number(ptMax) : Infinity;
    const has = (set, v) => set.size === 0 || set.has(v);
    return rows.filter((r) => {
      if (r.preptest < min || r.preptest > max) return false;
      if (!has(filters.subtype, r.subtype)) return false;
      if (!has(filters.testType, r.test_prep_type)) return false;
      if (!has(filters.structure, r.structure_type)) return false;
      if (!has(filters.difficulty, r.difficulty)) return false;
      if (!has(filters.confidence, r.confidence)) return false;
      if (!has(filters.section, r.section)) return false;
      return true;
    });
  }, [rows, filters, ptMin, ptMax]);

  // reset to page 1 whenever the filtered set changes shape
  useEffect(() => {
    setPage(1);
  }, [filters, ptMin, ptMax]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeCount =
    Object.values(filters).reduce((n, s) => n + s.size, 0) + (ptMin ? 1 : 0) + (ptMax ? 1 : 0);

  const toggle = (key) => (val) =>
    setFilters((prev) => {
      const next = { ...prev, [key]: new Set(prev[key]) };
      if (next[key].has(val)) next[key].delete(val);
      else next[key].add(val);
      return next;
    });

  const reset = () => {
    setFilters(emptyFilters());
    setPtMin("");
    setPtMax("");
  };

  const openFor = (key) => (openKey === key ? null : key);
  const ptCount = (ptMin ? 1 : 0) + (ptMax ? 1 : 0);

  return (
    <div className="v2 drill-page">
      <Helmet>
        <title>LR Drill Finder | Filter LSAT Logical Reasoning Questions | LSAT Academy</title>
        <meta
          name="description"
          content="Search and filter every LSAT Logical Reasoning question from PrepTests 101–159 by subtype, difficulty, question type, and argument structure. A free drilling tool from LSAT Academy."
        />
        <link rel="canonical" href="https://www.lsat.academy/drill-finder" />
        <meta property="og:title" content="LR Drill Finder | LSAT Academy" />
        <meta
          property="og:description"
          content="Filter LSAT Logical Reasoning questions from PrepTests 101–159 by subtype, difficulty, and argument structure to build targeted drill sets."
        />
        <meta property="og:url" content="https://www.lsat.academy/drill-finder" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO (centered) */}
      <section style={S.hero} className="drill-hero">
        <div style={S.heroGrain} />
        <div className="container" style={{ position: "relative" }}>
          <div style={S.heroInner}>
            <h1 style={S.h1}>
              LR Drill{" "}
              <span style={{ fontFamily: "var(--font-display)", color: "var(--teal-500)", fontWeight: 400 }}>
                Finder.
              </span>
            </h1>
            <p style={S.sub}>
              Every Logical Reasoning question from PrepTests 101–159, classified by subtype, difficulty,
              question type, and argument structure. Filter down to exactly the questions you want to drill —
              then go practice them in your own materials.
            </p>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section style={S.body} className="drill-body">
        <div className="container">
          {status === "unconfigured" && (
            <div style={S.notice}>
              <strong>Drill Finder is almost ready.</strong> The question database hasn’t been connected
              yet. Once the Supabase project is wired up (see <code>context/DRILL_FINDER_SETUP.md</code>),
              all 2,998 questions will appear here automatically.
            </div>
          )}
          {status === "error" && (
            <div style={{ ...S.notice, background: "#fde7e7", border: "1px solid #f6c6c6", color: "#8a2020" }}>
              <strong>Couldn’t load questions.</strong> {errorMsg}
            </div>
          )}

          {/* FILTERS (one per row) */}
          <div style={S.filterList} ref={toolbarRef}>
            <div style={S.filterRow} className="drill-filter">
              <FilterDropdown
                label="PrepTest"
                count={ptCount}
                isOpen={openKey === "pt"}
                onToggleOpen={() => setOpenKey(openFor("pt"))}
              >
                <div style={S.rangeRow}>
                  <select style={S.select} value={ptMin} onChange={(e) => setPtMin(e.target.value)} aria-label="Minimum PrepTest">
                    <option value="">From</option>
                    {options.pts.map((p) => (
                      <option key={p} value={p}>PT {p}</option>
                    ))}
                  </select>
                  <span style={{ color: "var(--ink-400)" }}>–</span>
                  <select style={S.select} value={ptMax} onChange={(e) => setPtMax(e.target.value)} aria-label="Maximum PrepTest">
                    <option value="">To</option>
                    {options.pts.map((p) => (
                      <option key={p} value={p}>PT {p}</option>
                    ))}
                  </select>
                </div>
              </FilterDropdown>
            </div>

            <div style={S.filterRow} className="drill-filter">
              <FilterDropdown
                label="Subtype"
                count={filters.subtype.size}
                isOpen={openKey === "subtype"}
                onToggleOpen={() => setOpenKey(openFor("subtype"))}
              >
                <ChipOptions options={options.subtype} selected={filters.subtype} onToggle={toggle("subtype")} />
              </FilterDropdown>
              <InfoTip help={HELP.subtype} />
            </div>

            <div style={S.filterRow} className="drill-filter">
              <FilterDropdown
                label="Question type"
                count={filters.testType.size}
                isOpen={openKey === "testType"}
                onToggleOpen={() => setOpenKey(openFor("testType"))}
              >
                <ChipOptions options={options.testType} selected={filters.testType} onToggle={toggle("testType")} />
              </FilterDropdown>
              <InfoTip help={HELP.testType} />
            </div>

            <div style={S.filterRow} className="drill-filter">
              <FilterDropdown
                label="Structure"
                count={filters.structure.size}
                isOpen={openKey === "structure"}
                onToggleOpen={() => setOpenKey(openFor("structure"))}
              >
                <ChipOptions options={options.structure} selected={filters.structure} onToggle={toggle("structure")} render={prettyStructure} />
              </FilterDropdown>
              <InfoTip help={HELP.structure} />
            </div>

            <div style={S.filterRow} className="drill-filter">
              <FilterDropdown
                label="Difficulty"
                count={filters.difficulty.size}
                isOpen={openKey === "difficulty"}
                onToggleOpen={() => setOpenKey(openFor("difficulty"))}
              >
                <ChipOptions options={options.difficulty} selected={filters.difficulty} onToggle={toggle("difficulty")} render={(d) => DIFFICULTY_LABEL[d] || d} />
              </FilterDropdown>
              <InfoTip help={HELP.difficulty} />
            </div>

            <div style={S.filterRow} className="drill-filter">
              <FilterDropdown
                label="Section"
                count={filters.section.size}
                isOpen={openKey === "section"}
                onToggleOpen={() => setOpenKey(openFor("section"))}
              >
                <ChipOptions options={options.section} selected={filters.section} onToggle={toggle("section")} render={(s) => `Section ${s}`} />
              </FilterDropdown>
            </div>

            {activeCount > 0 && (
              <div style={S.filterRow} className="drill-filter">
                <button type="button" style={S.resetBtn} onClick={reset}>
                  Clear all ({activeCount})
                </button>
              </div>
            )}
          </div>

          {/* RESULTS */}
          <div style={S.count}>
            {status === "loading" ? (
              "Loading questions…"
            ) : (
              <>
                <span style={S.countNum}>{filtered.length.toLocaleString()}</span>{" "}
                {filtered.length === 1 ? "question" : "questions"}
                {rows.length > 0 && filtered.length !== rows.length && (
                  <span style={{ color: "var(--ink-400)" }}> of {rows.length.toLocaleString()}</span>
                )}
              </>
            )}
          </div>

          {status === "ready" && filtered.length === 0 ? (
            <div style={S.empty}>No questions match these filters. Try removing one or two.</div>
          ) : (
            <div style={S.tableWrap} className="drill-tablewrap">
              <div style={S.tableScroll}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>PT · Sec · Q</th>
                      <th style={S.th}>Subtype</th>
                      <th style={S.th}>Question type</th>
                      <th style={S.th}>Structure</th>
                      <th style={S.th}>Difficulty</th>
                      <th style={S.th} className="drill-stem">What it asks</th>
                      <th style={S.th}>Question</th>
                      <th style={S.th}>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((r) => (
                      <tr key={r.id} className="drill-row">
                        <td style={{ ...S.td, ...S.ptCell }} data-label="PT · Sec · Q">
                          PT{r.preptest} · S{r.section} · Q{r.question}
                        </td>
                        <td style={S.td} data-label="Subtype">{r.subtype}</td>
                        <td style={S.td} data-label="Question type">{r.test_prep_type}</td>
                        <td style={S.td} data-label="Structure">
                          <span style={{ fontSize: 13 }}>{prettyStructure(r.structure_type)}</span>
                          {r.structure_subtype && (
                            <div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 2 }}>
                              {prettyStructure(r.structure_subtype)}
                            </div>
                          )}
                        </td>
                        <td style={S.td} data-label="Difficulty">
                          <span style={difficultyTag(r.difficulty)}>{r.difficulty}</span>
                        </td>
                        <td style={{ ...S.td, ...S.stemCell }} className="drill-stem" data-label="What it asks">{asks[r.id] || TASK_BY_TYPE[r.test_prep_type] || "—"}</td>
                        <td style={S.td} data-label="Question">
                          {(() => {
                            const url = lawhubLink(r.preptest, r.section);
                            return url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={S.viewBtn}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <path d="M15 3h6v6" />
                                  <path d="M10 14L21 3" />
                                </svg>
                                View question
                              </a>
                            ) : (
                              <span style={S.viewBtnDisabled}>—</span>
                            );
                          })()}
                        </td>
                        <td style={S.td} data-label="Review">
                          <button type="button" style={S.reviewBtn} onClick={() => setReviewRow(r)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filtered.length > PAGE_SIZE && (
            <div style={S.pager}>
              <button type="button" style={S.pageBtn(page <= 1)} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                ← Prev
              </button>
              <span style={S.pageInfo}>
                Page {page} / {totalPages}
              </span>
              <button type="button" style={S.pageBtn(page >= totalPages)} disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                Next →
              </button>
            </div>
          )}

          <p style={{ marginTop: 28, fontSize: 13, color: "var(--ink-400)", lineHeight: 1.6 }}>
            Want these questions worked through? Explore the{" "}
            <Link to="/resources" style={{ color: "var(--teal-500)", fontWeight: 600 }}>
              free articles
            </Link>{" "}
            or{" "}
            <Link to="/consultation" style={{ color: "var(--teal-500)", fontWeight: 600 }}>
              book a consultation
            </Link>{" "}
            with David.
          </p>
        </div>
      </section>

      {reviewRow && <ReviewModal row={reviewRow} onClose={() => setReviewRow(null)} />}

      <style>{`
        /* Neutralize the site-wide \`button { ... }\` gradient/pill/shadow rule
           so our filter, option, review and icon buttons render cleanly.
           Inline styles still win for the props we set intentionally. */
        .drill-page button:not(.btn) { box-shadow: none; height: auto; width: auto; min-width: 0; transition: none; }
        .drill-page .drill-review-input::placeholder { color: var(--ink-400); }
        /* Tablet — keep the table, let it scroll horizontally cleanly */
        @media (max-width: 900px) {
          .drill-hero { padding: 96px 0 44px !important; }
          .drill-body { padding: 36px 0 88px !important; }
          .drill-page table { min-width: 940px !important; }
          .drill-page th, .drill-page td { padding: 12px 13px !important; }
        }
        /* Phone — collapse the table into one stacked card per question */
        @media (max-width: 600px) {
          .drill-hero { padding: 80px 0 36px !important; }
          .drill-body { padding: 28px 0 72px !important; }

          /* Filter dropdowns: full-width, stacked, panels span the row */
          .drill-page .drill-filter { width: 100% !important; }
          .drill-page .drill-ddwrap { flex: 1 1 auto !important; }
          .drill-page .drill-dropbtn { width: 100% !important; justify-content: space-between !important; }
          .drill-page .drill-panel { width: 100% !important; max-width: none !important; }

          /* Card layout: no outer frame, no horizontal scroll */
          .drill-page .drill-tablewrap { border: none !important; border-radius: 0 !important; overflow: visible !important; }
          .drill-page thead { display: none !important; }
          .drill-page table { min-width: 0 !important; width: 100% !important; display: block !important; }
          .drill-page tbody { display: block !important; }
          .drill-page .drill-row {
            display: block !important;
            border: 1px solid var(--ink-200) !important;
            border-radius: 14px !important;
            background: #fff !important;
            margin-bottom: 12px !important;
            padding: 6px 2px !important;
            box-shadow: var(--shadow-sm);
          }
          .drill-page .drill-row td {
            display: block !important;
            border: none !important;
            padding: 8px 16px !important;
            font-size: 14px !important;
          }
          .drill-page .drill-row td::before {
            content: attr(data-label);
            display: block;
            font-family: var(--font-mono);
            font-size: 10.5px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--ink-400);
            margin-bottom: 3px;
          }
          /* show the paraphrase inside the card (space isn't constrained here) */
          .drill-page .drill-stem { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default DrillFinder;
