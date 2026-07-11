// Wrong Answer Journal - shared taxonomy + analytics.
//
// The taxonomy deliberately mirrors the Drill Finder's classification
// (src/pages/DrillFinder.jsx) so a logged entry can be auto-classified from the
// real PT·Section·Question bank, and so analytics line up with how David
// actually labels questions.

/* ---------------- taxonomy ---------------- */

// LR question types - value matches drill_questions.test_prep_type; label is friendly.
export const LR_QUESTION_TYPES = [
  ['Necessary-Assumption', 'Necessary Assumption'],
  ['Sufficient-Assumption', 'Sufficient Assumption'],
  ['Strengthen', 'Strengthen'],
  ['Weaken', 'Weaken'],
  ['Flaw', 'Flaw'],
  ['Evaluate', 'Evaluate'],
  ['Method-of-Reasoning', 'Method of Reasoning'],
  ['Role-of-Statement', 'Role of Statement'],
  ['Main-Point', 'Main Point'],
  ['Point-of-Disagreement', 'Point of Disagreement'],
  ['Must-Be-True', 'Must Be True'],
  ['Most-Strongly-Supported', 'Most Strongly Supported'],
  ['Explain-Resolve', 'Resolve / Explain'],
  ['Principle-Identify', 'Principle (Identify)'],
  ['Principle-Apply', 'Principle (Apply)'],
  ['Parallel-Reasoning', 'Parallel Reasoning'],
  ['Parallel-Flaw', 'Parallel Flaw'],
];

// RC question types (the Drill Finder bank is LR-only, so these are manual).
// Values carry an RC- prefix so they never collide with LR values that share
// a name (Main-Point, Strengthen, …) in labels, filters, or analytics.
export const RC_QUESTION_TYPES = [
  ['RC-Main-Point', 'Main Point / Primary Purpose'],
  ['RC-Detail', 'Must Be True / Detail (RC)'],
  ['RC-Inference', 'Inference (RC)'],
  ['RC-Author-Attitude', 'Author Attitude / Tone'],
  ['RC-Function', 'Function / Purpose of a part'],
  ['RC-Strengthen', 'Strengthen (RC)'],
  ['RC-Weaken', 'Weaken (RC)'],
  ['RC-Analogy', 'Analogy / Application'],
  ['RC-Comparative', 'Comparative (dual passage)'],
];

const LR_TYPE_VALUES = new Set(LR_QUESTION_TYPES.map(([v]) => v));

// Argument structures - value matches drill_questions.structure_type (UPPER-CASE there).
export const STRUCTURES = [
  'Causal', 'Conditional', 'Statistical', 'Analogical', 'Temporal',
  'Definitional-Conceptual', 'Disjunctive', 'General-Specific',
  'Authority-Character', 'Practical-Means-End', 'Principle-Application',
  'Inference-Best-Explanation', 'Majority-Overlap', 'Scope-Concept-Shift',
  'Reductio', 'Circular', 'Hybrid',
];

export const RESULTS = [
  ['incorrect', 'Got it wrong'],
  ['correct_guessed', 'Right, but unsure / guessed'],
  ['correct', 'Right, but worth revisiting'],
];

export const CONFIDENCE = [
  ['high', 'Confident'],
  ['medium', 'Unsure'],
  ['low', 'Guessed'],
];

export const ANSWER_CHOICES = ['A', 'B', 'C', 'D', 'E'];

// Diagnostic "why did I miss it" tags, grouped. This is the heart of the
// journal - the categories make the analytics actionable.
export const ERROR_TAG_GROUPS = [
  {
    group: 'Conceptual',
    hint: 'A logic principle you misapplied.',
    tags: [
      'Confused necessary vs sufficient',
      'Missed conditional negation',
      'Confused conclusion with premise',
      'Misjudged a quantifier (some / most / all)',
      'Treated correlation as causation',
      'Missed a scope / concept shift',
    ],
  },
  {
    group: 'Answer choices',
    hint: 'How the trap answer fooled you.',
    tags: [
      'Stuck between two answers',
      'Too strong / extreme language',
      'Out of scope',
      'Half-right / partially correct',
      'Opposite of what was asked',
      'Could-be-true ≠ must-be-true',
    ],
  },
  {
    group: 'Reading & process',
    hint: 'Execution, not understanding.',
    tags: [
      'Misread the stimulus',
      'Misread the question stem',
      'Lost focus / careless',
      'Time pressure / rushed',
      'Overthought it',
    ],
  },
];

export const ALL_ERROR_TAGS = ERROR_TAG_GROUPS.flatMap((g) => g.tags);

// Friendly label lookups.
const QT_LABEL = Object.fromEntries([...LR_QUESTION_TYPES, ...RC_QUESTION_TYPES]);
export const questionTypeLabel = (v) => QT_LABEL[v] || v || '-';
export const prettyStructure = (s) =>
  (s || '')
    .toLowerCase()
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/* ---------------- date helpers ---------------- */

// Local YYYY-MM-DD for a Date.
const ymd = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const entryDay = (e) => e.logged_on || (e.created_at ? e.created_at.slice(0, 10) : null);

/* ---------------- analytics ---------------- */

const isMiss = (e) => e.result === 'incorrect';

// Headline numbers for the stat cards.
export function summarize(entries, today = new Date()) {
  const todayStr = ymd(today);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekAgoStr = ymd(weekAgo);

  let today_ = 0;
  let week = 0;
  let diffSum = 0;
  let diffCount = 0;
  let correct = 0;

  for (const e of entries) {
    const d = entryDay(e);
    if (d === todayStr) today_ += 1;
    if (d && d >= weekAgoStr && d <= todayStr) week += 1;
    if (e.difficulty) { diffSum += e.difficulty; diffCount += 1; }
    if (e.result === 'correct' || e.result === 'correct_guessed') correct += 1;
  }

  return {
    total: entries.length,
    today: today_,
    thisWeek: week,
    avgDifficulty: diffCount ? Math.round((diffSum / diffCount) * 10) / 10 : null,
    accuracy: entries.length ? Math.round((correct / entries.length) * 100) : null,
    streakDays: streak(entries, today),
  };
}

// Consecutive days (ending today or the most recent logged day) with ≥1 entry.
export function streak(entries, today = new Date()) {
  const days = new Set(entries.map(entryDay).filter(Boolean));
  if (days.size === 0) return 0;
  const cursor = new Date(today);
  // If nothing today, allow the streak to be anchored at the most recent day.
  if (!days.has(ymd(cursor))) {
    const recent = [...days].sort().pop();
    if (!recent) return 0;
    cursor.setTime(new Date(recent + 'T00:00:00').getTime());
  }
  let count = 0;
  // Bounded well above any realistic streak; stops at the first gap.
  for (let i = 0; i < 3650; i += 1) {
    if (!days.has(ymd(cursor))) break;
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

// Last `weeks` calendar weeks of volume, oldest → newest.
export function weeklyVolume(entries, weeks = 8, today = new Date()) {
  const buckets = [];
  const start = new Date(today);
  start.setDate(start.getDate() - 7 * (weeks - 1));
  for (let i = 0; i < weeks; i += 1) {
    const s = new Date(start);
    s.setDate(s.getDate() + 7 * i);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    buckets.push({ label: `${s.getMonth() + 1}/${s.getDate()}`, start: ymd(s), end: ymd(e), count: 0 });
  }
  for (const en of entries) {
    const d = entryDay(en);
    if (!d) continue;
    const b = buckets.find((bk) => d >= bk.start && d <= bk.end);
    if (b) b.count += 1;
  }
  return buckets;
}

// Frequency + miss-rate broken down by a field ('question_type' | 'structure_type' | 'subtype').
export function byDimension(entries, key) {
  const map = new Map();
  for (const e of entries) {
    const v = e[key];
    if (!v) continue;
    if (!map.has(v)) map.set(v, { key: v, total: 0, missed: 0 });
    const row = map.get(v);
    row.total += 1;
    if (isMiss(e)) row.missed += 1;
  }
  return [...map.values()]
    .map((r) => ({ ...r, missRate: r.total ? Math.round((r.missed / r.total) * 100) : 0 }))
    .sort((a, b) => b.missed - a.missed || b.total - a.total);
}

// Most frequent error tag (the "Top Mistake" card).
export function topMistake(entries) {
  const counts = {};
  for (const e of entries) for (const t of e.error_tags || []) counts[t] = (counts[t] || 0) + 1;
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.length ? { tag: sorted[0][0], count: sorted[0][1] } : null;
}

export function errorTagCounts(entries) {
  const counts = {};
  for (const e of entries) for (const t of e.error_tags || []) counts[t] = (counts[t] || 0) + 1;
  return Object.entries(counts).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}

// Confidence calibration - the part competitors don't surface.
//   confidentWrong: high confidence but wrong  -> genuine misconceptions (most urgent)
//   shakyRight:     low confidence but right    -> got lucky, not yet owned
export function calibration(entries) {
  let confidentWrong = 0;
  let highConfidence = 0;
  let shakyRight = 0;
  let lowConfidence = 0;
  for (const e of entries) {
    if (e.confidence === 'high') {
      highConfidence += 1;
      if (e.result === 'incorrect') confidentWrong += 1;
    }
    if (e.confidence === 'low') {
      lowConfidence += 1;
      if (e.result !== 'incorrect') shakyRight += 1;
    }
  }
  return {
    confidentWrong,
    confidentWrongRate: highConfidence ? Math.round((confidentWrong / highConfidence) * 100) : null,
    shakyRight,
    shakyRightRate: lowConfidence ? Math.round((shakyRight / lowConfidence) * 100) : null,
  };
}

// Why misses happen - tells the student whether to study the skill or slow down.
//   misconception: confident but wrong   -> real knowledge gap (most urgent)
//   rushed:        wrong and fast (<=45s) -> careless / timing
//   struggled:     the rest of the misses -> genuinely hard / unsure
export function missBreakdown(entries) {
  let misconception = 0;
  let rushed = 0;
  let struggled = 0;
  for (const e of entries) {
    if (e.result !== 'incorrect') continue;
    if (e.confidence === 'high') misconception += 1;
    else if (e.time_seconds && e.time_seconds <= 45) rushed += 1;
    else struggled += 1;
  }
  return { misconception, rushed, struggled, total: misconception + rushed + struggled };
}

// Accuracy by where the question sits in the section - exposes end-of-section
// fatigue / timing collapse that a by-type view hides.
export function byPosition(entries) {
  const buckets = [
    { key: 'early', label: 'Early · Q1–9', lo: 1, hi: 9, total: 0, missed: 0 },
    { key: 'middle', label: 'Middle · Q10–17', lo: 10, hi: 17, total: 0, missed: 0 },
    { key: 'late', label: 'Late · Q18+', lo: 18, hi: 99, total: 0, missed: 0 },
  ];
  for (const e of entries) {
    const q = e.question;
    if (!q) continue;
    const b = buckets.find((bk) => q >= bk.lo && q <= bk.hi);
    if (!b) continue;
    b.total += 1;
    if (e.result === 'incorrect') b.missed += 1;
  }
  return buckets.map((b) => ({ ...b, missRate: b.total ? Math.round((b.missed / b.total) * 100) : 0 }));
}

// The single entry to revisit next: hardest, still-wrong, flagged for review.
export function hardestUnsolved(entries) {
  return entries
    .filter((e) => e.needs_review && e.result === 'incorrect')
    .sort(
      (a, b) =>
        (b.difficulty || 0) - (a.difficulty || 0) ||
        (entryDay(b) || '').localeCompare(entryDay(a) || '')
    )[0] || null;
}

// What to drill next, with a deep link into the Drill Finder pre-filtered to
// the student's single weakest question type (closes diagnose → practice loop).
export function recommendation(entries) {
  const byType = byDimension(entries, 'question_type').filter((r) => r.missed > 0);
  const byStruct = byDimension(entries, 'structure_type').filter((r) => r.missed > 0);
  const weakType = byType[0] || null;
  const weakStruct = byStruct[0] || null;
  if (!weakType && !weakStruct) return null;
  // The Drill Finder bank is LR-only, so only deep-link a weak LR type; an RC
  // weak spot still shows, but the link goes to the unfiltered finder.
  const drillType = weakType && LR_TYPE_VALUES.has(weakType.key) ? weakType.key : null;
  return { weakType, weakStruct, drillLink: buildDrillLink({ questionType: drillType }) };
}

// Build a /drill-finder URL with filters pre-applied (DrillFinder reads these).
export function buildDrillLink({ questionType, difficulty } = {}) {
  const p = new URLSearchParams();
  if (questionType) p.set('type', questionType);
  if (difficulty) p.set('difficulty', String(difficulty));
  const qs = p.toString();
  return qs ? `/drill-finder?${qs}` : '/drill-finder';
}
