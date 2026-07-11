import { useEffect, useMemo, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { portal } from '../lib/portalClient';
import { drillClient, DRILL_TABLE } from '../lib/drillClient';
import { useAuth } from '../lib/AuthContext';
import {
  RC_QUESTION_TYPES, RESULTS, CONFIDENCE, ANSWER_CHOICES,
  questionTypeLabel, prettyStructure,
  summarize, weeklyVolume, byDimension, topMistake,
  calibration, missBreakdown, byPosition, hardestUnsolved, recommendation,
} from '../lib/journal';

/* ============================================================
   Wrong Answer Journal - log questions worth revisiting, then
   see the patterns. Auto-classifies real PT·Sec·Q entries from
   the Drill Finder bank; surfaces analytics competitors don't
   (argument structure, confidence calibration, drill loop).
   ============================================================ */

const C = {
  navy: 'var(--navy-900)', ink: 'var(--ink-700)', ink5: 'var(--ink-500)',
  ink4: 'var(--ink-400)', teal: 'var(--teal-500)', cream: 'var(--cream-50)',
  line: 'var(--ink-100)', red: '#b3261e', green: '#1f7a44',
};

const S = {
  page: { background: 'var(--cream-100)', minHeight: '100vh', padding: '48px 0 80px' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 22 },
  eyebrow: { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.teal, fontWeight: 600, marginBottom: 10 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 34, color: C.navy, fontWeight: 400, marginBottom: 4 },
  sub: { fontSize: 16, color: C.ink5 },

  tabs: { display: 'flex', gap: 6, marginBottom: 24, borderBottom: `1px solid ${C.line}` },
  tab: (active) => ({
    padding: '11px 4px', marginRight: 22, background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-sans)',
    color: active ? C.navy : C.ink4,
    borderBottom: active ? `2px solid ${C.teal}` : '2px solid transparent',
  }),

  // stat cards
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 22 },
  stat: { background: '#fff', border: `1px solid ${C.line}`, borderRadius: 'var(--radius-md)', padding: '18px 20px' },
  statLabel: { fontFamily: 'var(--font-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.ink4, marginBottom: 8 },
  statNum: { fontFamily: 'var(--font-display)', fontSize: 36, color: C.navy, lineHeight: 1 },
  statFoot: { fontSize: 12.5, color: C.ink5, marginTop: 6 },

  card: { background: '#fff', border: `1px solid ${C.line}`, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: '22px 24px', marginBottom: 18 },
  cardTitle: { fontFamily: 'var(--font-display)', fontSize: 19, color: C.navy, fontWeight: 400, marginBottom: 4 },
  cardHint: { fontSize: 13, color: C.ink5, marginBottom: 16 },

  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, alignItems: 'start' },

  focusCard: { background: 'var(--cream-50)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-md)', padding: '18px 20px' },
  focusEyebrow: { fontFamily: 'var(--font-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.teal, fontWeight: 600, marginBottom: 8 },
  focusTitle: { fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 4 },

  // bar rows
  barRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 11 },
  barLabel: { width: 150, fontSize: 13, color: C.ink, flexShrink: 0, textAlign: 'right' },
  barTrack: { flex: 1, height: 22, background: C.cream, borderRadius: 6, overflow: 'hidden', position: 'relative' },
  barFill: (pct, color) => ({ width: `${pct}%`, height: '100%', background: color, borderRadius: 6, transition: 'width .3s ease' }),
  barVal: { width: 64, fontSize: 12.5, color: C.ink5, flexShrink: 0, fontFamily: 'var(--font-mono)' },

  // weekly volume columns
  volWrap: { display: 'flex', alignItems: 'flex-end', gap: 10, height: 140, padding: '0 4px' },
  volCol: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' },
  volBar: (h) => ({ width: '100%', maxWidth: 38, height: `${h}%`, minHeight: 3, background: C.teal, borderRadius: '4px 4px 0 0' }),
  volLabel: { fontSize: 10.5, color: C.ink4, fontFamily: 'var(--font-mono)' },
  volCount: { fontSize: 11.5, color: C.navy, fontWeight: 600 },

  // entries table
  filters: { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  select: { padding: '9px 14px', borderRadius: 'var(--radius-pill)', border: `1.5px solid var(--ink-200)`, fontFamily: 'var(--font-sans)', fontSize: 13.5, color: C.navy, background: '#fff', cursor: 'pointer' },
  tableWrap: { border: `1px solid ${C.line}`, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#fff' },
  scroll: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 720 },
  th: { textAlign: 'left', padding: '13px 16px', background: C.cream, borderBottom: `1px solid ${C.line}`, fontFamily: 'var(--font-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.09em', color: C.ink5, fontWeight: 600, whiteSpace: 'nowrap' },
  td: { padding: '13px 16px', borderBottom: `1px solid ${C.line}`, fontSize: 14, color: C.navy, verticalAlign: 'top' },
  resultTag: (r) => ({ display: 'inline-block', fontSize: 12.5, fontWeight: 600, color: r === 'incorrect' ? C.red : C.green }),
  tagChip: { display: 'inline-block', fontSize: 11.5, color: C.ink, background: C.cream, borderRadius: 'var(--radius-pill)', padding: '2px 9px', margin: '2px 4px 2px 0' },
  diffTag: (d) => {
    const map = { 1: ['#e4f5e9', '#1f7a44'], 2: ['#e4f1f4', '#0f5e7e'], 3: ['#fff1e8', '#c2521f'], 4: ['#fde7e7', '#b3261e'], 5: ['#fbe3f0', '#9b1c6b'] };
    const [bg, fg] = map[d] || ['var(--ink-100)', C.ink];
    return { display: 'inline-block', padding: '2px 9px', borderRadius: 'var(--radius-pill)', background: bg, color: fg, fontSize: 12, fontWeight: 600 };
  },
  linkBtn: { background: 'none', border: 'none', color: C.ink4, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', padding: 0 },
  empty: { padding: '52px 24px', textAlign: 'center', color: C.ink5 },

  // modal / form
  overlay: { position: 'fixed', inset: 0, background: 'rgba(2,50,71,0.45)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' },
  modal: { width: '100%', maxWidth: 760, background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: '26px 26px 22px', margin: 'auto' },
  modalTitle: { fontFamily: 'var(--font-display)', fontSize: 23, color: C.navy, fontWeight: 400, marginBottom: 4 },
  row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  label: { display: 'block', fontSize: 12.5, fontWeight: 600, color: C.navy, margin: '14px 0 6px' },
  input: { width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: `1.5px solid var(--ink-200)`, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-900)', background: '#fff', outline: 'none' },
  textarea: { width: '100%', minHeight: 64, padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: `1.5px solid var(--ink-200)`, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-900)', resize: 'vertical', outline: 'none' },
  classBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.teal, fontWeight: 600, marginTop: 8 },
  pickRow: { display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 },
  pick: (active) => ({ padding: '7px 13px', borderRadius: 'var(--radius-pill)', border: active ? `1.5px solid ${C.teal}` : '1.5px solid var(--ink-200)', background: active ? 'var(--teal-50)' : '#fff', color: active ? C.navy : C.ink, fontSize: 12.5, fontWeight: active ? 600 : 500, cursor: 'pointer' }),
  tagGroupTitle: { fontFamily: 'var(--font-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.ink4, margin: '12px 0 6px' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22, alignItems: 'center' },
  ghostBtn: { padding: '11px 20px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)', background: '#fff', color: C.ink, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  error: { background: '#fde7e7', border: '1px solid #f6c6c6', color: '#8a2020', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 13.5, marginBottom: 16 },

  // classified-question detail card (Drill-Finder-style)
  detailCard: { marginTop: 12, background: C.cream, border: `1px solid ${C.line}`, borderRadius: 'var(--radius-md)', padding: '14px 16px' },
  detailHead: { fontFamily: 'var(--font-mono)', fontWeight: 700, color: C.navy, fontSize: 13, marginBottom: 10, letterSpacing: '0.02em' },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  detailLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.ink4, marginBottom: 2 },
  detailVal: { fontSize: 14, color: C.navy, lineHeight: 1.45 },
  detailNote: { marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.line}`, fontSize: 12, fontStyle: 'italic', color: C.ink4, lineHeight: 1.5 },
};

const fmtDate = (s) => (s ? new Date(s + (s.length === 10 ? 'T00:00:00' : '')).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '');
const todayInput = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/* ---------------- log / edit modal ---------------- */

const blankEntry = () => ({
  logged_on: todayInput(),
  section_kind: 'LR',
  preptest: '', section: '', question: '',
  drill_question_id: null,
  subtype: '', question_type: '', structure_type: '', difficulty: '',
  result: 'incorrect', chosen_answer: '', correct_answer: '', confidence: '',
  time_seconds: '', error_tags: [], root_cause: '', takeaway: '', needs_review: true,
  discuss_with_tutor: false,
});

// Every entry references a real LawHub question. LR entries are auto-classified
// from the Drill Finder bank; the bank is LR-only, so RC entries just record
// the reference plus a manually picked RC question type.
const SECTION_KINDS = [['LR', 'Logical Reasoning'], ['RC', 'Reading Comp']];

// Composite label for a bank row: "PT102 · S2 · Q1".
const qLabelOf = (r) => `PT${r.preptest} - S${r.section} - Q${r.question}`;

// Load the whole LawHub bank once (cached for the session) so the modal can
// search across every PT·Section·Question and show the classification inline.
let _bankPromise = null;
const fetchDrillBank = async () => {
  const STEP = 1000;
  const { count, error: countErr } = await drillClient
    .from(DRILL_TABLE)
    .select('id', { count: 'exact', head: true })
    .abortSignal(AbortSignal.timeout(15_000));
  if (countErr) throw countErr;
  const pages = Math.max(1, Math.ceil((count || 0) / STEP));
  const reqs = Array.from({ length: pages }, (_, i) =>
    drillClient
      .from(DRILL_TABLE)
      .select('id, preptest, section, question, subtype, difficulty, test_prep_type, structure_type, structure_subtype')
      .order('preptest', { ascending: true })
      .order('section', { ascending: true })
      .order('question', { ascending: true })
      .range(i * STEP, i * STEP + STEP - 1)
      .abortSignal(AbortSignal.timeout(20_000)));
  const results = await Promise.all(reqs);
  const rows = [];
  for (const { data } of results) rows.push(...(data || []));
  let asks = {};
  try {
    asks = await fetch(`${import.meta.env.BASE_URL}data/drillAsks.json`).then((r) => (r.ok ? r.json() : {}));
  } catch { asks = {}; }
  return { rows, asks };
};
const loadDrillBank = () => {
  if (!_bankPromise) {
    // Drop the cache on failure — otherwise one bad load (timeout, blip) leaves
    // a rejected promise cached and the modal broken for the whole session.
    _bankPromise = fetchDrillBank().catch((e) => {
      _bankPromise = null;
      throw e;
    });
  }
  return _bankPromise;
};

export const EntryModal = ({ studentId, initial, onClose, onSaved }) => {
  const [form, setForm] = useState(initial || blankEntry());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [looking, setLooking] = useState(false);
  const [bank, setBank] = useState([]);
  const [asks, setAsks] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isLR = form.section_kind !== 'RC';

  // Switching LR <-> RC clears the question reference + classification so an
  // RC entry can't carry LR bank data (and vice versa).
  const setKind = (kind) => {
    if (kind === form.section_kind) return;
    setForm((f) => ({
      ...f,
      section_kind: kind,
      preptest: '', section: '', question: '',
      drill_question_id: null, subtype: '', question_type: '', structure_type: '', difficulty: '',
    }));
  };

  // Load the bank once. LR uses it to auto-classify; RC uses it to know which
  // sections of a PT are LR, so the RC section choices are the remaining ones.
  useEffect(() => {
    let cancelled = false;
    setLooking(true);
    loadDrillBank()
      .then(({ rows, asks: a }) => { if (!cancelled) { setBank(rows); setAsks(a); setLooking(false); } })
      .catch(() => { if (!cancelled) setLooking(false); });
    return () => { cancelled = true; };
  }, []);

  // PrepTest choices + which sections of each PT hold LR, from the bank.
  const pts = useMemo(() => {
    const uniq = [...new Set(bank.map((r) => r.preptest))].sort((a, b) => a - b);
    // Fallback (LawHub PTs 101-159) so the form still works if the bank fails.
    return uniq.length ? uniq : Array.from({ length: 59 }, (_, i) => 101 + i);
  }, [bank]);
  const lrSections = useMemo(() => {
    const m = new Map();
    for (const r of bank) {
      if (!m.has(r.preptest)) m.set(r.preptest, new Set());
      m.get(r.preptest).add(r.section);
    }
    return m;
  }, [bank]);
  const sectionChoices = useMemo(() => {
    const pt = Number(form.preptest);
    if (!pt) return [];
    const lr = lrSections.get(pt);
    if (!lr) return [1, 2, 3, 4];
    return isLR ? [...lr].sort() : [1, 2, 3, 4].filter((s) => !lr.has(s));
  }, [form.preptest, isLR, lrSections]);

  // The matched bank row for an LR PT·S·Q - drives the classification card.
  const selected = useMemo(() => {
    if (!isLR) return null;
    const pt = Number(form.preptest);
    const s = Number(form.section);
    const q = Number(form.question);
    if (!pt || !s || !q) return null;
    return bank.find((r) => r.preptest === pt && r.section === s && r.question === q) || null;
  }, [bank, isLR, form.preptest, form.section, form.question]);

  const submit = async () => {
    if (busy) return;
    setError('');
    // New entries must reference a real LawHub question. (Edits are exempt so
    // entries logged before this design can still be updated.)
    if (!initial?.id) {
      if (isLR && !selected) {
        setError('Pick a valid PrepTest · Section · Question so we can classify it.');
        return;
      }
      if (!isLR && (!form.preptest || !form.section || !form.question)) {
        setError('Enter the PrepTest, section, and question number.');
        return;
      }
    }
    setBusy(true);
    const payload = {
      student_id: studentId,
      logged_on: form.logged_on || todayInput(),
      section_kind: isLR ? 'LR' : 'RC',
      preptest: form.preptest ? Number(form.preptest) : null,
      section: form.section ? Number(form.section) : null,
      question: form.question ? Number(form.question) : null,
      // LR classification comes from the matched bank row; when editing an old
      // entry the bank can't match, keep whatever was stored. RC has no bank
      // classification - only the student-picked question type.
      drill_question_id: isLR ? (selected?.id ?? form.drill_question_id ?? null) : null,
      subtype: isLR ? (selected?.subtype || form.subtype || null) : null,
      question_type: isLR ? (selected?.test_prep_type || form.question_type || null) : (form.question_type || null),
      structure_type: isLR ? (selected?.structure_type || form.structure_type || null) : null,
      difficulty: isLR
        ? (selected?.difficulty ?? (form.difficulty ? Number(form.difficulty) : null))
        : (form.difficulty ? Number(form.difficulty) : null),
      result: form.result,
      chosen_answer: form.chosen_answer || null,
      correct_answer: form.correct_answer || null,
      confidence: form.confidence || null,
      time_seconds: form.time_seconds ? Number(form.time_seconds) : null,
      error_tags: [],
      root_cause: form.root_cause.trim() || null,
      takeaway: form.takeaway.trim() || null,
      needs_review: form.needs_review,
      discuss_with_tutor: form.discuss_with_tutor,
      source_label: 'LawHub',
    };
    let res;
    if (initial?.id) {
      res = await portal.from('journal_entries').update(payload).eq('id', initial.id).select().single();
    } else {
      res = await portal.from('journal_entries').insert(payload).select().single();
    }
    if (res.error) { setError(res.error.message); setBusy(false); return; }
    onSaved(res.data, !!initial?.id);
    onClose();
  };

  return (
    <div style={S.overlay} onMouseDown={onClose}>
      <div style={S.modal} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={S.modalTitle}>{initial?.id ? 'Edit entry' : 'Log a question'}</div>
        <p style={S.cardHint}>Pick the LawHub question you practiced - LR questions are classified automatically.</p>
        {error && <div style={S.error}>{error}</div>}

        <div className="jrow2" style={S.row2}>
          <div>
            <label style={S.label}>Date practiced</label>
            <input type="date" style={S.input} value={form.logged_on} onChange={(e) => set('logged_on', e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Section type</label>
            <div style={S.pickRow}>
              {SECTION_KINDS.map(([v, l]) => (
                <button key={v} type="button" style={S.pick(form.section_kind === v)} onClick={() => setKind(v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <label style={S.label}>
          Find the question{' '}
          {looking && <span style={{ color: C.ink4, fontWeight: 400 }}>(loading question bank…)</span>}
        </label>
        <div className="jrow3" style={S.row3}>
          <select
            style={S.input}
            aria-label="PrepTest"
            value={form.preptest}
            onChange={(e) => setForm((f) => ({ ...f, preptest: e.target.value, section: '', question: '' }))}
          >
            <option value="">PrepTest</option>
            {pts.map((p) => <option key={p} value={p}>PT {p}</option>)}
          </select>
          <select
            style={S.input}
            aria-label="Section"
            value={form.section}
            disabled={!form.preptest}
            onChange={(e) => setForm((f) => ({ ...f, section: e.target.value, question: '' }))}
          >
            <option value="">Section</option>
            {sectionChoices.map((s) => <option key={s} value={s}>Section {s}</option>)}
          </select>
          <input
            style={S.input}
            aria-label="Question number"
            inputMode="numeric"
            placeholder="Question #"
            value={form.question}
            onChange={(e) => set('question', e.target.value)}
          />
        </div>

        {isLR && selected && (
          <div style={S.detailCard}>
            <div style={S.detailHead}>{qLabelOf(selected)}</div>
            <div style={S.detailGrid}>
              <div><div style={S.detailLbl}>Subtype</div><div style={S.detailVal}>{selected.subtype || '-'}</div></div>
              <div><div style={S.detailLbl}>Question type</div><div style={S.detailVal}>{questionTypeLabel(selected.test_prep_type)}</div></div>
              <div><div style={S.detailLbl}>Structure</div><div style={S.detailVal}>{prettyStructure(selected.structure_type)}{selected.structure_subtype ? ` · ${prettyStructure(selected.structure_subtype)}` : ''}</div></div>
              <div><div style={S.detailLbl}>Difficulty</div><div style={S.detailVal}>{selected.difficulty || '-'}</div></div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={S.detailLbl}>What it asks</div>
              <div style={S.detailVal}>{asks[selected.id] || '-'}</div>
            </div>
            <div style={S.detailNote}>
              We’re still refining these classifications - if something looks off, log it anyway and flag it for your tutor.
            </div>
          </div>
        )}
        {isLR && !selected && !looking && form.preptest && form.section && form.question && (
          <div style={{ fontSize: 12.5, color: '#c2521f', marginTop: 8 }}>
            No LR question at that spot - double-check the question number.
          </div>
        )}

        {!isLR && (
          <div className="jrow2" style={S.row2}>
            <div>
              <label style={S.label}>Question type</label>
              <select style={S.input} value={form.question_type} onChange={(e) => set('question_type', e.target.value)}>
                <option value="">-</option>
                {RC_QUESTION_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>Difficulty (your feel)</label>
              <div style={S.pickRow}>
                {[1, 2, 3, 4, 5].map((d) => (
                  <button key={d} type="button" style={S.pick(Number(form.difficulty) === d)} onClick={() => set('difficulty', d)}>{d}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="jrow2" style={S.row2}>
          <div>
            <label style={S.label}>Confidence at the time</label>
            <div style={S.pickRow}>
              {CONFIDENCE.map(([v, l]) => (
                <button key={v} type="button" style={S.pick(form.confidence === v)} onClick={() => set('confidence', v)}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={S.label}>Result</label>
            <div style={S.pickRow}>
              {RESULTS.map(([v, l]) => (
                <button key={v} type="button" style={S.pick(form.result === v)} onClick={() => set('result', v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="jrow3" style={S.row3}>
          <div>
            <label style={S.label}>Your answer</label>
            <select style={S.input} value={form.chosen_answer} onChange={(e) => set('chosen_answer', e.target.value)}>
              <option value="">-</option>
              {ANSWER_CHOICES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Correct</label>
            <select style={S.input} value={form.correct_answer} onChange={(e) => set('correct_answer', e.target.value)}>
              <option value="">-</option>
              {ANSWER_CHOICES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Time (sec)</label>
            <input style={S.input} inputMode="numeric" placeholder="e.g. 95" value={form.time_seconds} onChange={(e) => set('time_seconds', e.target.value)} />
          </div>
        </div>

        <label style={S.label}>Root cause (in your words)</label>
        <textarea style={S.textarea} value={form.root_cause} onChange={(e) => set('root_cause', e.target.value)} placeholder="What actually tripped you up?" />

        <label style={S.label}>Takeaway / rule for next time</label>
        <textarea style={S.textarea} value={form.takeaway} onChange={(e) => set('takeaway', e.target.value)} placeholder="The lesson you want to remember." />

        {form.tutor_note && (
          <>
            <label style={S.label}>Note from David</label>
            <div style={{ background: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', fontSize: 14, color: C.navy, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {form.tutor_note}
            </div>
          </>
        )}

        <label style={{ ...S.label, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 14 }}>
          <input type="checkbox" checked={form.needs_review} onChange={(e) => set('needs_review', e.target.checked)} />
          Keep in my review queue
        </label>
        <label style={{ ...S.label, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.discuss_with_tutor} onChange={(e) => set('discuss_with_tutor', e.target.checked)} />
          Discuss with my tutor next session
        </label>

        <div style={S.actions}>
          <button type="button" style={S.ghostBtn} onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" style={{ justifyContent: 'center', opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={submit}>
            {busy ? 'Saving…' : initial?.id ? 'Save changes' : 'Log it'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- small chart pieces ---------------- */

const BarList = ({ rows, color = C.teal, maxRows = 8 }) => {
  const max = Math.max(1, ...rows.map((r) => r.total));
  return (
    <div>
      {rows.slice(0, maxRows).map((r) => (
        <div key={r.key} style={S.barRow}>
          <div className="jbar-label" style={S.barLabel}>{r.label}</div>
          <div style={S.barTrack}>
            <div style={S.barFill((r.total / max) * 100, color)} />
          </div>
          <div style={S.barVal}>{r.missed}/{r.total} · {r.missRate}%</div>
        </div>
      ))}
    </div>
  );
};

/* ---------------- main page ---------------- */

const Journal = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('insights');
  const [modal, setModal] = useState(null); // null | {} (new) | entry (edit)

  // entries-view filters
  const [fType, setFType] = useState('');
  const [fDiff, setFDiff] = useState('');
  const [fResult, setFResult] = useState('');
  const [fReview, setFReview] = useState('');

  // Keyed on the user *id*: token refreshes swap the user object but keep the
  // id, and must not flip the page back to "Loading…" and refetch.
  const userId = user?.id;
  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError('');
    try {
      // Explicitly scope to the signed-in student (defense-in-depth alongside
      // RLS; see SECURITY-AUDIT.md SEC-001).
      const { data, error: err } = await portal
        .from('journal_entries')
        .select('*')
        .eq('student_id', userId)
        .order('logged_on', { ascending: false })
        .order('created_at', { ascending: false })
        .abortSignal(AbortSignal.timeout(15_000));
      if (err) setError(err.message);
      else setEntries(data || []);
    } catch (err) {
      // A rejected or timed-out query (network drop, expired token, cold
      // connection) must not leave the page stuck on "Loading…" forever -
      // surface it and clear the spinner so the page stays reliable.
      setError(err?.message || 'Could not load your journal. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const onSaved = (row, isEdit) => {
    setEntries((prev) => {
      const next = isEdit ? prev.map((e) => (e.id === row.id ? row : e)) : [row, ...prev];
      return next.sort((a, b) => (b.logged_on || '').localeCompare(a.logged_on || ''));
    });
  };

  const remove = async (id) => {
    const { error: err } = await portal.from('journal_entries').delete().eq('id', id);
    if (!err) setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const markReviewed = async (e) => {
    const { data } = await portal
      .from('journal_entries')
      .update({ needs_review: false, reviewed_at: new Date().toISOString() })
      .eq('id', e.id)
      .select()
      .single();
    if (data) setEntries((prev) => prev.map((x) => (x.id === e.id ? data : x)));
  };

  // Flag/unflag an entry for the tutor to go over next session.
  const toggleDiscuss = async (e) => {
    const next = !e.discuss_with_tutor;
    setEntries((prev) => prev.map((x) => (x.id === e.id ? { ...x, discuss_with_tutor: next } : x)));
    const { error: err } = await portal
      .from('journal_entries')
      .update({ discuss_with_tutor: next })
      .eq('id', e.id);
    if (err) {
      setError(err.message);
      setEntries((prev) => prev.map((x) => (x.id === e.id ? { ...x, discuss_with_tutor: !next } : x)));
    }
  };

  /* analytics */
  const stats = useMemo(() => summarize(entries), [entries]);
  const volume = useMemo(() => weeklyVolume(entries), [entries]);
  const byType = useMemo(() => byDimension(entries, 'question_type').map((r) => ({ ...r, label: questionTypeLabel(r.key) })), [entries]);
  const byStruct = useMemo(() => byDimension(entries, 'structure_type').map((r) => ({ ...r, label: prettyStructure(r.key) })), [entries]);
  const top = useMemo(() => topMistake(entries), [entries]);
  const calib = useMemo(() => calibration(entries), [entries]);
  const missMix = useMemo(() => missBreakdown(entries), [entries]);
  const position = useMemo(() => byPosition(entries), [entries]);
  const focus = useMemo(() => hardestUnsolved(entries), [entries]);
  const rec = useMemo(() => recommendation(entries), [entries]);
  const maxVol = Math.max(1, ...volume.map((v) => v.count));

  const filtered = useMemo(() => entries.filter((e) => {
    if (fType && e.question_type !== fType) return false;
    if (fDiff && String(e.difficulty) !== fDiff) return false;
    if (fResult && e.result !== fResult) return false;
    if (fReview === 'review' && !e.needs_review) return false;
    return true;
  }), [entries, fType, fDiff, fResult, fReview]);

  const typeOptions = useMemo(() => {
    const set = new Set(entries.map((e) => e.question_type).filter(Boolean));
    return [...set];
  }, [entries]);

  return (
    <div className="v2 journal-page" style={S.page}>
      <Helmet>
        <title>Wrong Answer Journal | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container">
        <div style={S.head}>
          <div>
            <div style={S.eyebrow}>Wrong Answer Journal</div>
            <h1 style={S.h1}>Your Journal</h1>
            <p style={S.sub}>Log every question worth revisiting, and watch the patterns surface.</p>
            <p style={{ fontSize: 13.5, color: C.ink4, marginTop: 6 }}>Your tutor can see this journal. Flag anything you want to go over together next session.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/portal" style={{ ...S.linkBtn, color: C.teal }}>← Dashboard</Link>
          </div>
        </div>

        {error && <div style={S.error}>{error}</div>}

        <div style={{ ...S.tabs, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <button type="button" style={S.tab(tab === 'insights')} onClick={() => setTab('insights')}>Insights</button>
            <button type="button" style={S.tab(tab === 'entries')} onClick={() => setTab('entries')}>Entries{entries.length ? ` (${entries.length})` : ''}</button>
          </div>
          <button type="button" className="btn btn-primary" style={{ marginBottom: 8 }} onClick={() => setModal({})}>+ Log a question</button>
        </div>

        {loading ? (
          <div style={S.empty}>Loading…</div>
        ) : entries.length === 0 ? (
          <div style={{ ...S.card, textAlign: 'center', padding: '56px 24px' }}>
            <div style={{ ...S.cardTitle, marginBottom: 8 }}>Start your journal</div>
            <p style={{ color: C.ink5, marginBottom: 20 }}>Log your first missed question and your insights will build from there.</p>
            <button type="button" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setModal({})}>+ Log a question</button>
          </div>
        ) : tab === 'insights' ? (
          <>
            {/* stat cards */}
            <div style={S.statGrid}>
              <div style={S.stat}><div style={S.statLabel}>Logged</div><div style={S.statNum}>{stats.total}</div><div style={S.statFoot}>{stats.thisWeek} this week</div></div>
              <div style={S.stat}><div style={S.statLabel}>Study streak</div><div style={S.statNum}>{stats.streakDays || '-'}</div><div style={S.statFoot}>{stats.streakDays ? 'days in a row' : 'log today to start'}</div></div>
              <div style={S.stat}><div style={S.statLabel}>Avg difficulty</div><div style={S.statNum}>{stats.avgDifficulty ?? '-'}</div><div style={S.statFoot}>out of 5</div></div>
              <div style={S.stat}><div style={S.statLabel}>Top mistake</div><div style={{ ...S.statNum, fontSize: 19, lineHeight: 1.25, paddingTop: 6 }}>{top ? top.tag : '-'}</div><div style={S.statFoot}>{top ? `${top.count}×` : 'no tags yet'}</div></div>
            </div>

            {/* focus + recommendation */}
            <div style={S.twoCol} className="journal-2col">
              <div style={S.card}>
                <div style={S.cardTitle}>Today’s focus</div>
                <p style={S.cardHint}>The hardest question still flagged for review.</p>
                {focus ? (
                  <div style={S.focusCard}>
                    <div style={S.focusEyebrow}>Hardest unsolved</div>
                    <div style={S.focusTitle}>{questionTypeLabel(focus.question_type)} · level {focus.difficulty || '-'}</div>
                    <div style={{ fontSize: 13.5, color: C.ink5, marginBottom: 8 }}>
                      {focus.preptest ? `From PT ${focus.preptest}` : 'Self-logged'}{focus.takeaway ? ` · ${focus.takeaway}` : ''}
                    </div>
                    <button type="button" style={{ ...S.linkBtn, color: C.teal }} onClick={() => { setTab('entries'); setFReview('review'); }}>Review queue →</button>
                  </div>
                ) : (
                  <div style={S.empty}>Nothing flagged. Nice work.</div>
                )}
              </div>

              <div style={S.card}>
                <div style={S.cardTitle}>What to drill next</div>
                <p style={S.cardHint}>Based on where you miss the most.</p>
                {rec ? (
                  <>
                    {rec.weakType && <p style={{ fontSize: 14.5, color: C.ink, marginBottom: 6 }}>Weakest question type: <strong style={{ color: C.navy }}>{questionTypeLabel(rec.weakType.key)}</strong> ({rec.weakType.missed} missed)</p>}
                    {rec.weakStruct && <p style={{ fontSize: 14.5, color: C.ink, marginBottom: 14 }}>Weakest structure: <strong style={{ color: C.navy }}>{prettyStructure(rec.weakStruct.key)}</strong> ({rec.weakStruct.missed} missed)</p>}
                    <Link to={rec.drillLink} className="btn btn-primary" style={{ justifyContent: 'center', textDecoration: 'none' }}>Drill these in the Drill Finder →</Link>
                  </>
                ) : (
                  <div style={S.empty}>Log a few misses to get a recommendation.</div>
                )}
              </div>
            </div>

            {/* weekly volume */}
            <div style={S.card}>
              <div style={S.cardTitle}>Weekly volume</div>
              <p style={S.cardHint}>Entries logged per week (last 8 weeks).</p>
              <div style={S.volWrap}>
                {volume.map((v) => (
                  <div key={v.start} style={S.volCol}>
                    <div style={S.volCount}>{v.count || ''}</div>
                    <div style={S.volBar((v.count / maxVol) * 100)} />
                    <div style={S.volLabel}>{v.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* by question type / structure */}
            <div style={S.twoCol} className="journal-2col">
              <div style={S.card}>
                <div style={S.cardTitle}>By question type</div>
                <p style={S.cardHint}>Bar = volume · label = missed / total · miss-rate.</p>
                {byType.length ? <BarList rows={byType} /> : <div style={S.empty}>No data yet.</div>}
              </div>
              <div style={S.card}>
                <div style={S.cardTitle}>By argument structure</div>
                <p style={S.cardHint}>The dimension most tools ignore, and where points hide.</p>
                {byStruct.length ? <BarList rows={byStruct} color="#c2521f" /> : <div style={S.empty}>Add structure to entries to see this.</div>}
              </div>
            </div>

            {/* calibration + tags */}
            <div style={S.twoCol} className="journal-2col">
              <div style={S.card}>
                <div style={S.cardTitle}>Confidence calibration</div>
                <p style={S.cardHint}>“Confident but wrong” reveals real misconceptions, your highest-leverage fixes.</p>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ ...S.statNum, color: C.red }}>{calib.confidentWrong}</div>
                    <div style={S.statFoot}>confident but wrong{calib.confidentWrongRate != null ? ` (${calib.confidentWrongRate}% of confident)` : ''}</div>
                  </div>
                  <div>
                    <div style={{ ...S.statNum, color: C.teal }}>{calib.shakyRight}</div>
                    <div style={S.statFoot}>right but unsure{calib.shakyRightRate != null ? ` (${calib.shakyRightRate}% of guesses)` : ''}</div>
                  </div>
                </div>
              </div>
              <div style={S.card}>
                <div style={S.cardTitle}>Why you miss</div>
                <p style={S.cardHint}>Study the skill, or just slow down? Based on confidence + time.</p>
                {missMix.total ? (
                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ ...S.statNum, color: C.red }}>{missMix.misconception}</div>
                      <div style={S.statFoot}>misconception<br />(confident but wrong)</div>
                    </div>
                    <div>
                      <div style={{ ...S.statNum, color: '#c2521f' }}>{missMix.rushed}</div>
                      <div style={S.statFoot}>rushed<br />(wrong &amp; under 45s)</div>
                    </div>
                    <div>
                      <div style={{ ...S.statNum, color: C.navy }}>{missMix.struggled}</div>
                      <div style={S.statFoot}>genuinely hard<br />(unsure / slow)</div>
                    </div>
                  </div>
                ) : <div style={S.empty}>No misses logged yet.</div>}
              </div>
            </div>

            {/* pacing by position */}
            <div style={S.card}>
              <div style={S.cardTitle}>Pacing by question position</div>
              <p style={S.cardHint}>Miss-rate by where the question sits in the section - late-section dips point to stamina or timing.</p>
              {position.some((p) => p.total) ? (
                position.map((p) => (
                  <div key={p.key} style={S.barRow}>
                    <div className="jbar-label" style={S.barLabel}>{p.label}</div>
                    <div style={S.barTrack}><div style={S.barFill(p.missRate, '#c2521f')} /></div>
                    <div style={S.barVal}>{p.missed}/{p.total} · {p.missRate}%</div>
                  </div>
                ))
              ) : <div style={S.empty}>Log a few LawHub questions to see this.</div>}
            </div>
          </>
        ) : (
          /* ---------------- entries tab ---------------- */
          <>
            <div style={S.filters}>
              <select style={S.select} value={fType} onChange={(e) => setFType(e.target.value)}>
                <option value="">All types</option>
                {typeOptions.map((t) => <option key={t} value={t}>{questionTypeLabel(t)}</option>)}
              </select>
              <select style={S.select} value={fDiff} onChange={(e) => setFDiff(e.target.value)}>
                <option value="">All difficulties</option>
                {[1, 2, 3, 4, 5].map((d) => <option key={d} value={d}>Difficulty {d}</option>)}
              </select>
              <select style={S.select} value={fResult} onChange={(e) => setFResult(e.target.value)}>
                <option value="">All results</option>
                {RESULTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <select style={S.select} value={fReview} onChange={(e) => setFReview(e.target.value)}>
                <option value="">All entries</option>
                <option value="review">Review queue only</option>
              </select>
            </div>

            <div style={S.tableWrap}>
              <div style={S.scroll}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Date</th>
                      <th style={S.th}>Question type</th>
                      <th style={S.th}>Diff</th>
                      <th style={S.th}>Result</th>
                      <th style={S.th}>Why missed</th>
                      <th style={S.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td colSpan={6}><div style={S.empty}>No entries match these filters.</div></td></tr>
                    ) : filtered.map((e) => (
                      <tr key={e.id}>
                        <td style={S.td}>
                          {fmtDate(e.logged_on)}
                          {e.preptest ? <div style={{ fontSize: 12, color: C.ink4 }}>PT{e.preptest}{e.section ? ` · S${e.section}` : ''}{e.question ? ` · Q${e.question}` : ''}</div> : null}
                        </td>
                        <td style={S.td}>
                          {questionTypeLabel(e.question_type)}
                          {e.structure_type && <div style={{ fontSize: 12, color: C.ink4 }}>{prettyStructure(e.structure_type)}</div>}
                        </td>
                        <td style={S.td}>{e.difficulty ? <span style={S.diffTag(e.difficulty)}>{e.difficulty}</span> : '-'}</td>
                        <td style={S.td}>
                          <span style={S.resultTag(e.result)}>{e.result === 'incorrect' ? 'Incorrect' : e.result === 'correct_guessed' ? 'Lucky' : 'Correct'}</span>
                          {e.needs_review && <div style={{ fontSize: 11, color: C.teal, fontWeight: 600 }}>● in review</div>}
                          {e.discuss_with_tutor && <div style={{ fontSize: 11, color: '#c2521f', fontWeight: 600 }}>● to discuss</div>}
                        </td>
                        <td style={{ ...S.td, maxWidth: 280 }}>
                          {(e.error_tags || []).map((t) => <span key={t} style={S.tagChip}>{t}</span>)}
                          {e.takeaway && <div style={{ fontSize: 12.5, color: C.ink5, marginTop: 4, fontStyle: 'italic' }}>{e.takeaway}</div>}
                          {e.tutor_note && (
                            <div style={{ fontSize: 12.5, color: C.navy, marginTop: 6, background: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-sm)', padding: '6px 9px' }}>
                              <strong style={{ color: C.teal }}>David:</strong> {e.tutor_note}
                            </div>
                          )}
                        </td>
                        <td style={{ ...S.td, whiteSpace: 'nowrap' }}>
                          {e.needs_review && <button type="button" style={{ ...S.linkBtn, color: C.teal, marginRight: 12 }} onClick={() => markReviewed(e)}>Reviewed</button>}
                          <button type="button" style={{ ...S.linkBtn, color: e.discuss_with_tutor ? '#c2521f' : C.ink4, marginRight: 12 }} onClick={() => toggleDiscuss(e)}>
                            {e.discuss_with_tutor ? 'Discussing' : 'Discuss'}
                          </button>
                          <button type="button" style={{ ...S.linkBtn, color: C.green, marginRight: 12 }} onClick={() => setModal(e)}>View</button>
                          <button type="button" style={{ ...S.linkBtn, color: C.red }} onClick={() => remove(e.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {modal && (
        <EntryModal
          studentId={user.id}
          initial={modal.id ? modal : null}
          onClose={() => setModal(null)}
          onSaved={onSaved}
        />
      )}

      <style>{`
        /* Neutralize the site-wide \`button { gradient pill }\` rule (and its
           hover/active/focus states) so the tabs + plain buttons stay flat -
           no shadow, pill radius, fixed height, or hover lift bleeding in. */
        .journal-page button:not(.btn),
        .journal-page button:not(.btn):hover,
        .journal-page button:not(.btn):focus,
        .journal-page button:not(.btn):active {
          background: none; box-shadow: none; border-radius: 0;
          height: auto; width: auto; min-width: 0;
          transform: none; transition: none;
        }
        /* One consistent dropdown caret on every select (kill the clunky native
           arrow and any UA double-arrow), matching the clean field design. */
        .journal-page select {
          appearance: none; -webkit-appearance: none; -moz-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7785' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 34px;
        }
        @media (max-width: 760px) {
          .journal-page { padding: 32px 0 64px !important; }
          .journal-2col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .journal-page .jrow2, .journal-page .jrow3 { grid-template-columns: 1fr !important; }
          .journal-page .jbar-label { width: 110px !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  );
};

export default Journal;
