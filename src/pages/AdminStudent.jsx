import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { portal } from '../lib/portalClient';
import { useAuth } from '../lib/AuthContext';
import NotesThread from '../components/NotesThread';
import StudentJournal from '../components/StudentJournal';
import {
  questionTypeLabel, prettyStructure,
  summarize, byDimension, topMistake, calibration,
} from '../lib/journal';

/* ============================================================
   Admin - one student, presented with the SAME tabbed dashboard
   the student sees on /portal (Sessions / Notes / Journal), plus
   admin-only powers and an Internal tab:
   - Sessions: edit credits, View whiteboards (temp), add recaps,
     timeline of meetings (with delete)
   - Notes: tutor notes the student sees (add/delete) + notes the
     student left for David
   - Internal: admin-only notes the student NEVER sees
   - Journal: read-only Wrong Answer Journal insights
   ============================================================ */


const S = {
  page: { background: 'var(--cream-100)', minHeight: '100vh', padding: '48px 0 80px' },
  back: { fontSize: 13.5, color: 'var(--teal-500)', fontWeight: 600, marginBottom: 16, display: 'inline-block' },
  head: { marginBottom: 28 },
  eyebrow: { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--teal-500)', fontWeight: 600, marginBottom: 10 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 34, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 2 },
  email: { fontSize: 15, color: 'var(--ink-500)' },

  tabs: { display: 'flex', flexWrap: 'wrap', marginBottom: 24, borderBottom: '1px solid var(--ink-100)' },
  tab: (active) => ({
    padding: '11px 4px', marginRight: 26, background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-sans)',
    color: active ? 'var(--navy-900)' : 'var(--ink-400)',
    borderBottom: active ? '2px solid var(--teal-500)' : '2px solid transparent',
  }),
  panel: {
    background: '#fff', border: '1px solid var(--ink-100)', borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)', padding: '24px 26px', minHeight: 360,
  },
  divider: { borderTop: '1px solid var(--ink-100)', margin: '24px 0 20px' },

  cardTitle: { fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 4 },
  cardHint: { fontSize: 13.5, color: 'var(--ink-500)', marginBottom: 18, lineHeight: 1.5 },

  creditWrap: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18 },
  creditNum: { fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--teal-500)', lineHeight: 1 },
  creditLabel: { fontSize: 15, color: 'var(--ink-600)' },
  creditControls: { display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' },
  creditInput: {
    width: 90, padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--ink-200)',
    fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600, color: 'var(--navy-900)', textAlign: 'center', outline: 'none',
  },
  saved: { fontSize: 13, color: 'var(--teal-500)', fontWeight: 600 },

  // Sessions timeline (mirrors /portal)
  dayGroup: { marginBottom: 4 },
  dayLabelRow: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', margin: '20px 0 12px' },
  dayLabel: { fontSize: 13, fontWeight: 700, color: 'var(--navy-900)' },
  dayItems: { width: '100%' },
  meetingItem: { marginBottom: 16 },
  meetingMetaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 8 },
  meetingMetaLeft: { display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--ink-600)' },
  meetingTime: { fontSize: 12.5, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' },
  meetingCard: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
    background: '#fff', border: '1px solid var(--ink-100)', borderRadius: 'var(--radius-md)',
    padding: '14px 18px', boxShadow: 'var(--shadow-sm)',
  },
  meetingCardLeft: { display: 'inline-flex', alignItems: 'center', gap: 12 },
  meetingDot: { width: 9, height: 9, borderRadius: '50%', background: 'var(--teal-400, #4bb3c6)', flexShrink: 0 },
  meetingTitle: { fontSize: 14, fontWeight: 700, color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.02em' },
  meetingBody: { fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginTop: 10 },
  consultBadge: {
    display: 'inline-block', padding: '2px 9px', borderRadius: 'var(--radius-pill)',
    fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
    background: 'var(--teal-50)', color: 'var(--teal-600, #1a7d8c)',
  },
  recapBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px',
    borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)', background: '#fff',
    color: 'var(--navy-900)', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none',
  },

  label: { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy-900)', marginBottom: 7 },
  input: {
    width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--ink-200)',
    fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--ink-900)', background: '#fff', marginBottom: 12, outline: 'none',
  },
  textarea: {
    width: '100%', minHeight: 96, padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--ink-200)',
    fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--ink-900)', resize: 'vertical', outline: 'none', marginBottom: 12,
  },
  noteFromStudent: { background: 'var(--cream-50)', border: '1px solid var(--ink-100)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 12 },
  noteFromAdmin: { background: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 12 },
  noteBody: { fontSize: 14.5, color: 'var(--ink-800)', lineHeight: 1.6, whiteSpace: 'pre-wrap' },
  noteDate: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', marginTop: 8 },
  resolvedTag: {
    display: 'inline-block', marginLeft: 8, padding: '1px 8px', borderRadius: 'var(--radius-pill)',
    background: '#e4f5e9', color: '#1f7a44', fontSize: 10.5, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.04em', verticalAlign: 'middle',
  },
  empty: { fontSize: 14, color: 'var(--ink-400)', padding: '8px 0' },
  error: { background: '#fde7e7', border: '1px solid #f6c6c6', color: '#8a2020', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 13.5, marginBottom: 18 },
  linkBtn: { background: 'none', border: 'none', color: '#b3261e', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 8 },

  // Add / edit recap modal
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(2,50,71,0.45)', zIndex: 200,
    display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto',
  },
  modal: {
    width: '100%', maxWidth: 620, background: '#fff', borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)', padding: '26px 28px 22px', margin: 'auto',
  },
  modalTitle: { fontFamily: 'var(--font-display)', fontSize: 23, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 16 },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'center', marginTop: 8 },
  ghostBtn: { padding: '11px 20px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)', background: '#fff', color: 'var(--ink-700)', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  statusRow: { display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 12 },
  statusTag: (inactive) => ({
    display: 'inline-block', padding: '3px 11px', borderRadius: 'var(--radius-pill)',
    fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
    background: inactive ? 'var(--ink-100)' : 'var(--teal-50)',
    color: inactive ? 'var(--ink-600)' : 'var(--teal-600, #1a7d8c)',
  }),
  statusSelect: {
    padding: '7px 30px 7px 12px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)',
    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--navy-900)',
    background: '#fff', cursor: 'pointer',
    // Size to the text instead of stretching, so the arrow sits next to the label.
    width: 'fit-content', minWidth: 0,
  },
  // Segmented Active/Inactive toggle (replaces the native select).
  statusOpt: (on, opt) => ({
    padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1.5px solid',
    fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    borderColor: on ? (opt === 'inactive' ? 'var(--ink-300, #b9c0c7)' : 'var(--teal-300, #7fd1de)') : 'var(--ink-200)',
    background: on ? (opt === 'inactive' ? 'var(--ink-100)' : 'var(--teal-50)') : '#fff',
    color: on ? (opt === 'inactive' ? 'var(--ink-700)' : 'var(--teal-600, #1a7d8c)') : 'var(--ink-400)',
  }),
};

// Add OR edit a meeting recap. `initial` null = new; otherwise pre-fills from the
// meeting and updates it in place.
const RecapModal = ({ studentId, initial, onClose, onSaved }) => {
  const [form, setForm] = useState(() => ({
    title: initial?.title || '',
    date: initial?.scheduled_at ? initial.scheduled_at.slice(0, 10) : '',
    recap: initial?.recap || '',
  }));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = async () => {
    if (!form.recap.trim() || busy) return;
    setBusy(true);
    setErr('');
    const payload = {
      title: form.title.trim() || null,
      recap: form.recap.trim(),
      scheduled_at: form.date ? new Date(form.date).toISOString() : null,
    };
    const cols = 'id, title, recap, scheduled_at, ended_at, status, calendly_event_uri';
    const res = initial?.id
      ? await portal.from('meetings').update(payload).eq('id', initial.id).select(cols).single()
      : await portal.from('meetings').insert({ student_id: studentId, status: 'completed', ...payload }).select(cols).single();
    if (res.error) { setErr(res.error.message); setBusy(false); return; }
    onSaved(res.data, !!initial?.id);
    onClose();
  };

  return (
    <div style={S.overlay} onMouseDown={onClose}>
      <div style={S.modal} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={S.modalTitle}>{initial?.id ? 'Edit session recap' : 'Add a recap'}</div>
        {err && <div style={S.error}>{err}</div>}
        <label style={S.label}>Session date</label>
        <input type="date" style={S.input} value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
        <label style={S.label}>Title (optional)</label>
        <input style={S.input} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Conditional logic drills" />
        <label style={S.label}>Recap</label>
        <textarea style={{ ...S.textarea, minHeight: 200 }} value={form.recap} onChange={(e) => setForm((f) => ({ ...f, recap: e.target.value }))} placeholder="Summary, action items, what you covered…" />
        <div style={S.modalActions}>
          <button type="button" style={S.ghostBtn} onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', opacity: form.recap.trim() && !busy ? 1 : 0.5 }} disabled={!form.recap.trim() || busy} onClick={submit}>
            {busy ? 'Saving…' : initial?.id ? 'Save changes' : 'Add recap'}
          </button>
        </div>
      </div>
    </div>
  );
};

// David's note on a single logged question - saved to journal_entries.tutor_note
// (admin UPDATE policy added in migration 0005). The student sees it in their journal.
const TutorNoteEditor = ({ entry, onSaved }) => {
  const [note, setNote] = useState(entry.tutor_note || '');   // the saved value
  const [draft, setDraft] = useState(entry.tutor_note || '');
  const [editing, setEditing] = useState(!entry.tutor_note);  // edit if none yet
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const save = async () => {
    if (busy) return;
    const body = draft.trim() || null;
    setBusy(true);
    setErr('');
    const { data, error } = await portal
      .from('journal_entries')
      .update({ tutor_note: body })
      .eq('id', entry.id)
      .select()
      .single();
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setNote(body || '');
    setEditing(!body);
    if (onSaved && data) onSaved(data); // keep the page's journal state in sync
  };

  // Saved + not editing -> show the note as a listed block with an Edit link.
  if (note && !editing) {
    return (
      <div style={{ ...S.noteFromAdmin, marginTop: 10 }}>
        <div style={{ ...S.itemMeta, marginBottom: 6 }}>Note from David</div>
        <div style={S.noteBody}>{note}</div>
        <button type="button" style={{ ...S.linkBtn, color: 'var(--navy-900)' }} onClick={() => { setDraft(note); setEditing(true); }}>Edit</button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 10 }}>
      <textarea
        style={{ ...S.textarea, minHeight: 64 }}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Add a note for the student on this question…"
      />
      {err && <div style={S.error}>{err}</div>}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button type="button" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={save}>
          {busy ? 'Saving…' : 'Save note'}
        </button>
        {note && <button type="button" style={{ ...S.linkBtn, color: 'var(--ink-500)', marginTop: 0 }} onClick={() => { setDraft(note); setEditing(false); }}>Cancel</button>}
      </div>
    </div>
  );
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

// Timeline formatting (mirrors /portal).
const fmtDayHeader = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : '';
const fmtClock = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0) return '';
  return d.toLocaleTimeString(undefined, d.getMinutes() ? { hour: 'numeric', minute: '2-digit' } : { hour: 'numeric' });
};
const fmtRange = (m) => {
  const s = fmtClock(m.scheduled_at);
  const e = fmtClock(m.ended_at);
  if (!s && !e) return '';
  return e ? `${s} - ${e}` : s;
};
const groupMeetingsByDay = (meetings) => {
  const groups = [];
  let cur = null;
  for (const m of meetings) {
    const day = (m.scheduled_at || m.ended_at || '').slice(0, 10) || 'na';
    if (!cur || cur.day !== day) {
      cur = { day, label: fmtDayHeader(m.scheduled_at || m.ended_at), items: [] };
      groups.push(cur);
    }
    cur.items.push(m);
  }
  return groups;
};
const recapUrl = (m) => {
  if (m.calendly_event_uri && /^https?:\/\//i.test(m.calendly_event_uri)) return m.calendly_event_uri;
  return (m.recap && (m.recap.match(/https?:\/\/\S+/) || [])[0]) || null;
};

const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

// Compact, read-only journal analytics (same numbers the student sees).
const JournalInsights = ({ entries }) => {
  const stats = summarize(entries);
  const top = topMistake(entries);
  const calib = calibration(entries);
  const byType = byDimension(entries, 'question_type').slice(0, 4);
  const byStruct = byDimension(entries, 'structure_type').slice(0, 4);

  const chip = { display: 'inline-block', fontSize: 12.5, color: 'var(--ink-700)', background: 'var(--cream-50)', borderRadius: 'var(--radius-pill)', padding: '4px 11px', margin: '0 6px 6px 0' };
  const num = { fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--navy-900)', lineHeight: 1 };
  const lbl = { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-400)', marginTop: 4 };
  const col = { minWidth: 110 };

  return (
    <div>
      <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={col}><div style={num}>{stats.total}</div><div style={lbl}>Logged ({stats.thisWeek} this week)</div></div>
        <div style={col}><div style={num}>{stats.streakDays || '-'}</div><div style={lbl}>Day streak</div></div>
        <div style={col}><div style={num}>{stats.avgDifficulty ?? '-'}</div><div style={lbl}>Avg difficulty</div></div>
        <div style={col}><div style={{ ...num, color: '#b3261e' }}>{calib.confidentWrong}</div><div style={lbl}>Confident but wrong</div></div>
        <div style={col}><div style={{ ...num, fontSize: 16, paddingTop: 5 }}>{top ? top.tag : '-'}</div><div style={lbl}>Top mistake{top ? ` (${top.count}×)` : ''}</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="admin-grid">
        <div>
          <div style={{ ...lbl, marginBottom: 8 }}>Weakest question types</div>
          {byType.map((r) => (
            <span key={r.key} style={chip}>{questionTypeLabel(r.key)} - {r.missed}/{r.total}</span>
          ))}
        </div>
        <div>
          <div style={{ ...lbl, marginBottom: 8 }}>Weakest structures</div>
          {byStruct.length ? byStruct.map((r) => (
            <span key={r.key} style={chip}>{prettyStructure(r.key)} - {r.missed}/{r.total}</span>
          )) : <span style={{ fontSize: 13, color: 'var(--ink-400)' }}>-</span>}
        </div>
      </div>
    </div>
  );
};

const AdminStudent = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [student, setStudent] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [notes, setNotes] = useState([]);
  const [unresolvedCount, setUnresolvedCount] = useState(0); // open threads, from NotesThread
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('sessions');

  // Admin edits sessions LEFT (= meeting_credits) + package total. "Used" is
  // shown as a derived total - left.
  const [credits, setCredits] = useState(0);
  const [pkgTotal, setPkgTotal] = useState(0); // profiles.meetings_total (package size)
  const [creditSaved, setCreditSaved] = useState(false);

  // Per-student Miro board URL (profiles.miro_url).
  const [miroUrl, setMiroUrl] = useState('');
  const [miroEditing, setMiroEditing] = useState(false);
  const [miroSaved, setMiroSaved] = useState(false);

  const [recapModal, setRecapModal] = useState(null); // null | {} (new) | meeting (edit)
  const [tutorNote, setTutorNote] = useState('');
  const [noteEditId, setNoteEditId] = useState(null);
  const [noteEditDraft, setNoteEditDraft] = useState('');

  // Internal (admin-only) notes - separate table, never visible to the student.
  // A dated log: each saved note is its own entry with a created_at.
  const [internalNotes, setInternalNotes] = useState([]);
  const [internalDraft, setInternalDraft] = useState('');
  const [internalBusy, setInternalBusy] = useState(false);
  const [internalErr, setInternalErr] = useState('');
  const [internalEditId, setInternalEditId] = useState(null);
  const [internalEditDraft, setInternalEditDraft] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const [p, m, n, j] = await Promise.all([
      portal.from('profiles').select('*').eq('id', id).single(),
      portal.from('meetings').select('id, title, recap, scheduled_at, ended_at, status, calendly_event_uri').eq('student_id', id).order('scheduled_at', { ascending: false, nullsFirst: false }),
      portal.from('notes').select('*').eq('student_id', id).order('created_at', { ascending: false }),
      portal.from('journal_entries').select('*').eq('student_id', id).order('logged_on', { ascending: false }),
    ]);
    if (p.error) { setError(p.error.message); setLoading(false); return; }
    setStudent(p.data);
    setPkgTotal(p.data.meetings_total || 0);
    setCredits(p.data.meeting_credits || 0);
    setMeetings(m.data || []);
    setNotes(n.data || []);
    setJournal(j.data || []);
    setLoading(false);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  // Internal notes load separately so a not-yet-applied migration only disables
  // this one tab instead of breaking the whole page.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      // select * so the page still works before 0009 (created_at) is applied.
      const { data, error: err } = await portal
        .from('student_internal_notes')
        .select('*')
        .eq('student_id', id)
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (err) { setInternalErr(err.message); return; }
      setInternalNotes(data || []);
    })();
    return () => { cancelled = true; };
  }, [id]);

  const saveCredits = async () => {
    setError('');
    const total = Number(pkgTotal) || 0;
    // Admin enters sessions LEFT directly; clamp to the package size.
    const credit = total > 0 ? Math.max(0, Math.min(total, Number(credits) || 0)) : Math.max(0, Number(credits) || 0);
    const { error: err } = await portal
      .from('profiles')
      .update({ meeting_credits: credit, meetings_total: total })
      .eq('id', id);
    if (err) { setError(err.message); return; }
    setStudent((s) => (s ? { ...s, meeting_credits: credit, meetings_total: total } : s));
    setCreditSaved(true);
    setTimeout(() => setCreditSaved(false), 1800);
  };

  const saveMiroUrl = async () => {
    setError('');
    const next = miroUrl.trim() || null;
    const { error: err } = await portal.from('profiles').update({ miro_url: next }).eq('id', id);
    if (err) { setError(err.message); return; }
    setStudent((s) => (s ? { ...s, miro_url: next } : s));
    setMiroEditing(false);
    setMiroSaved(true);
    setTimeout(() => setMiroSaved(false), 1800);
  };

  const addInternalNote = async () => {
    const body = internalDraft.trim();
    if (!body || internalBusy) return;
    setInternalBusy(true);
    setInternalErr('');
    const { data, error: err } = await portal
      .from('student_internal_notes')
      .insert({ student_id: id, body, updated_by: user?.id || null })
      .select('*')
      .single();
    if (err) setInternalErr(err.message);
    else { setInternalNotes((prev) => [data, ...prev]); setInternalDraft(''); }
    setInternalBusy(false);
  };

  const deleteInternalNote = async (nid) => {
    const { error: err } = await portal.from('student_internal_notes').delete().eq('id', nid);
    if (!err) setInternalNotes((prev) => prev.filter((n) => n.id !== nid));
  };

  const startEditInternal = (n) => { setInternalEditId(n.id); setInternalEditDraft(n.body); };
  const cancelEditInternal = () => { setInternalEditId(null); setInternalEditDraft(''); };
  const updateInternalNote = async () => {
    const body = internalEditDraft.trim();
    if (!body || internalBusy) return;
    setInternalBusy(true);
    setInternalErr('');
    const { data, error: err } = await portal
      .from('student_internal_notes')
      .update({ body, updated_by: user?.id || null })
      .eq('id', internalEditId)
      .select('*')
      .single();
    if (err) setInternalErr(err.message);
    else {
      setInternalNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)));
      cancelEditInternal();
    }
    setInternalBusy(false);
  };

  // Merge a saved meeting back into the timeline (insert -> prepend, edit ->
  // replace), keeping the list sorted newest-first.
  const onRecapSaved = (row, isEdit) => {
    setMeetings((prev) => {
      const next = isEdit ? prev.map((m) => (m.id === row.id ? row : m)) : [row, ...prev];
      return next.sort((a, b) => (b.scheduled_at || '').localeCompare(a.scheduled_at || ''));
    });
  };

  const deleteMeeting = async (mid) => {
    const { error: err } = await portal.from('meetings').delete().eq('id', mid);
    if (err) { setError(err.message); return; }
    setMeetings((prev) => prev.filter((m) => m.id !== mid));
  };

  // Manual Active / Inactive flag (profiles.status). Optimistic update.
  const saveStatus = async (next) => {
    setError('');
    setStudent((s) => (s ? { ...s, status: next } : s));
    const { error: err } = await portal.from('profiles').update({ status: next }).eq('id', id);
    if (err) setError(err.message);
  };

  const addTutorNote = async () => {
    if (!tutorNote.trim()) return;
    setError('');
    const { data, error: err } = await portal
      .from('notes')
      .insert({ student_id: id, author_id: user.id, author_role: 'admin', body: tutorNote.trim() })
      .select('id, body, author_role, created_at')
      .single();
    if (err) { setError(err.message); return; }
    setNotes((prev) => [data, ...prev]);
    setTutorNote('');
  };

  const deleteNote = async (nid) => {
    const { error: err } = await portal.from('notes').delete().eq('id', nid);
    if (err) { setError(err.message); return; }
    setNotes((prev) => prev.filter((n) => n.id !== nid));
  };

  // Mark a note (either direction) resolved / unresolved. Optimistic.
  const toggleNoteResolved = async (note) => {
    const next = !note.resolved;
    setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, resolved: next } : n)));
    const { error: err } = await portal.from('notes').update({ resolved: next }).eq('id', note.id);
    if (err) {
      setError(err.message);
      setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, resolved: !next } : n)));
    }
  };

  // Inline edit for any note (tutor's or the student's — admin RLS allows both).
  const startEditNote = (n) => { setNoteEditId(n.id); setNoteEditDraft(n.body); };
  const cancelEditNote = () => { setNoteEditId(null); setNoteEditDraft(''); };
  const updateNote = async () => {
    const body = noteEditDraft.trim();
    if (!body) return;
    setError('');
    const { data, error: err } = await portal
      .from('notes')
      .update({ body })
      .eq('id', noteEditId)
      .select('id, body, author_role, created_at')
      .single();
    if (err) { setError(err.message); return; }
    setNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)));
    cancelEditNote();
  };

  const studentNotes = notes.filter((n) => n.author_role === 'student');
  const tutorNotes = notes.filter((n) => n.author_role === 'admin');
  const unresolvedNotes = notes.filter((n) => !n.resolved).length;
  const meetingGroups = groupMeetingsByDay(meetings);
  const firstName = student?.full_name ? student.full_name.split(' ')[0] : 'this student';
  const firstMeetingId = (() => {
    const dated = meetings.filter((m) => m.scheduled_at);
    if (!dated.length) return null;
    return dated.reduce((a, b) => (a.scheduled_at <= b.scheduled_at ? a : b)).id;
  })();

  return (
    <div className="v2 admin-page" style={S.page}>
      <Helmet>
        <title>Manage Student | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container">
        <Link to="/admin" style={S.back}>← All students</Link>

        {loading ? (
          <div style={S.empty}>Loading…</div>
        ) : !student ? (
          <div style={S.error}>{error || 'Student not found.'}</div>
        ) : (
          <>
            <div style={S.head}>
              <div style={S.eyebrow}>Student dashboard</div>
              <h1 style={S.h1}>{student.full_name || student.email}</h1>
              <div style={S.email}>{student.email}</div>
              <div style={S.statusRow} role="group" aria-label="Student status">
                {['active', 'inactive'].map((opt) => {
                  const current = student.status === 'inactive' ? 'inactive' : 'active';
                  return (
                    <button
                      key={opt}
                      type="button"
                      style={S.statusOpt(current === opt, opt)}
                      onClick={() => saveStatus(opt)}
                    >
                      {opt === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && <div style={S.error}>{error}</div>}

            <div style={S.tabs} className="admin-tabs">
              <button type="button" style={S.tab(tab === 'sessions')} onClick={() => setTab('sessions')}>Sessions</button>
              <button type="button" style={S.tab(tab === 'notes')} onClick={() => setTab('notes')}>
                Notes{unresolvedCount ? ` (${unresolvedCount})` : ''}
              </button>
              <button type="button" style={S.tab(tab === 'internal')} onClick={() => setTab('internal')}>Internal</button>
              <button type="button" style={S.tab(tab === 'journal')} onClick={() => setTab('journal')}>
                Wrong Answer Journal{journal.length ? ` (${journal.length})` : ''}
              </button>
            </div>

            <div style={S.panel}>
              {/* SESSIONS: credits + whiteboards, add recap, timeline */}
              {tab === 'sessions' && (
                <>
                  <div style={{ textAlign: 'center' }}>
                    <div style={S.cardTitle}>Sessions left</div>
                    <p style={S.cardHint}>Remaining in {firstName}’s current package.</p>
                    <div style={{ ...S.creditWrap, justifyContent: 'center' }}>
                      <span style={S.creditNum}>
                        {Number(credits) || 0}
                        {Number(pkgTotal) > 0 && <span style={{ color: 'var(--ink-300, #b9c0c7)', fontSize: 34 }}>/{pkgTotal}</span>}
                      </span>
                      <span style={S.creditLabel}>
                        {(Number(credits) || 0) === 1 ? 'session left' : 'sessions left'}
                      </span>
                    </div>
                    {Number(pkgTotal) > 0 && (
                      <p style={{ ...S.cardHint, marginTop: 0, marginBottom: 16 }}>
                        {Math.max(0, (Number(pkgTotal) || 0) - (Number(credits) || 0))} of {pkgTotal} used
                      </p>
                    )}
                    <div style={S.creditControls}>
                      <label style={{ ...S.label, marginBottom: 0, fontSize: 12 }}>
                        Sessions left
                        <input type="number" min="0" style={{ ...S.creditInput, marginTop: 4 }} value={credits} onChange={(e) => setCredits(e.target.value)} />
                      </label>
                      <label style={{ ...S.label, marginBottom: 0, fontSize: 12 }}>
                        Package total
                        <input type="number" min="0" style={{ ...S.creditInput, marginTop: 4 }} value={pkgTotal} onChange={(e) => setPkgTotal(e.target.value)} placeholder="0 = none" />
                      </label>
                      <button type="button" className="btn btn-primary" onClick={saveCredits}>Save</button>
                      {creditSaved && <span style={S.saved}>Saved ✓</span>}
                    </div>
                    {Number(pkgTotal) === 0 && (
                      <p style={{ ...S.cardHint, marginTop: 10, marginBottom: 0 }}>No package yet. Set a package total to enroll {firstName}.</p>
                    )}

                    {/* Miro board: view when set, otherwise add the URL */}
                    <div style={{ ...S.creditControls, marginTop: 14 }}>
                      {student.miro_url && !miroEditing ? (
                        <>
                          <a
                            className="btn btn-primary"
                            href={student.miro_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', justifyContent: 'center' }}
                          >
                            View Miro board →
                          </a>
                          <button type="button" style={{ ...S.linkBtn, color: 'var(--ink-500)', marginTop: 0 }} onClick={() => { setMiroUrl(student.miro_url); setMiroEditing(true); }}>
                            Change
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            style={{ ...S.input, marginBottom: 0, maxWidth: 340 }}
                            placeholder="Paste Miro board URL"
                            value={miroUrl}
                            onChange={(e) => setMiroUrl(e.target.value)}
                          />
                          <button type="button" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center' }} onClick={saveMiroUrl}>
                            {student.miro_url ? 'Save' : 'Add Miro URL'}
                          </button>
                          {student.miro_url && (
                            <button type="button" style={{ ...S.linkBtn, color: 'var(--ink-500)', marginTop: 0 }} onClick={() => setMiroEditing(false)}>
                              Cancel
                            </button>
                          )}
                          {miroSaved && <span style={S.saved}>Saved ✓</span>}
                        </>
                      )}
                    </div>
                  </div>

                  <div style={S.divider} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                    <div>
                      <div style={S.cardTitle}>Sessions</div>
                      <p style={{ ...S.cardHint, marginBottom: 0 }}>Every meeting booked via Calendly, most recent first. Click a session to edit it.</p>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setRecapModal({})}>+ Add recap</button>
                  </div>
                  {meetingGroups.length === 0 ? (
                    <div style={S.empty}>No sessions yet. Add a recap above to start the timeline.</div>
                  ) : (
                    <div>
                      {meetingGroups.map((g) => {
                        const isFree = g.items.some((m) => m.id === firstMeetingId);
                        return (
                          <div key={g.day} style={S.dayGroup}>
                            <div style={S.dayLabelRow}>
                              <span style={S.dayLabel}>{g.label}</span>
                              <span style={S.consultBadge}>{isFree ? 'Free consult' : 'Paid consult'}</span>
                            </div>
                            <div style={S.dayItems}>
                              {g.items.map((m) => {
                                const url = recapUrl(m);
                                return (
                                  <div key={m.id} style={S.meetingItem}>
                                    <div style={S.meetingMetaRow}>
                                      <span style={S.meetingMetaLeft}><CalIcon /> Meeting</span>
                                      <span style={S.meetingTime}>{fmtRange(m)}</span>
                                    </div>
                                    <div style={S.meetingCard}>
                                      <span style={S.meetingCardLeft}>
                                        <span style={S.meetingDot} />
                                        <span><span style={S.meetingTitle}>{m.title || 'Session'}</span></span>
                                      </span>
                                      <span style={{ display: 'inline-flex', gap: 14, alignItems: 'center' }}>
                                        {url && (
                                          <a href={url} target="_blank" rel="noopener noreferrer" style={S.recapBtn}>View recap</a>
                                        )}
                                        {!(m.recap && m.recap.trim()) && (
                                          <span style={{ fontSize: 12.5, color: 'var(--ink-400)', fontStyle: 'italic' }}>No recap</span>
                                        )}
                                        <button type="button" style={{ ...S.linkBtn, color: 'var(--navy-900)', marginTop: 0 }} onClick={() => setRecapModal(m)}>Edit</button>
                                        <button type="button" style={{ ...S.linkBtn, marginTop: 0 }} onClick={() => deleteMeeting(m.id)}>Delete</button>
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* NOTES: tutor notes (the student sees) + notes from the student */}
              {tab === 'notes' && (
                <NotesThread studentId={id} userId={user.id} isAdmin onUnresolved={setUnresolvedCount} />
              )}

              {/* INTERNAL: admin-only notes */}
              {tab === 'internal' && (
                <>
                  <div style={S.cardTitle}>Internal notes</div>
                  <p style={S.cardHint}>Private - only admins can see these. {firstName} never sees this. Each note is saved with its date.</p>
                  {internalErr && <div style={S.error}>{internalErr}</div>}
                  <textarea
                    style={S.textarea}
                    value={internalDraft}
                    onChange={(e) => setInternalDraft(e.target.value)}
                    placeholder="Coaching notes, context, things to remember about this student…"
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', justifyContent: 'center', opacity: internalDraft.trim() && !internalBusy ? 1 : 0.5 }}
                    disabled={!internalDraft.trim() || internalBusy}
                    onClick={addInternalNote}
                  >
                    {internalBusy ? 'Adding…' : 'Add note'}
                  </button>

                  <div style={{ marginTop: 18 }}>
                    {internalNotes.length === 0 ? (
                      <div style={S.empty}>No internal notes yet.</div>
                    ) : (
                      internalNotes.map((n) => (
                        <div key={n.id} style={S.noteFromStudent}>
                          {internalEditId === n.id ? (
                            <>
                              <textarea
                                style={S.textarea}
                                value={internalEditDraft}
                                onChange={(e) => setInternalEditDraft(e.target.value)}
                              />
                              <div style={{ display: 'inline-flex', gap: 14, alignItems: 'center' }}>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  style={{ display: 'inline-flex', justifyContent: 'center', opacity: internalEditDraft.trim() && !internalBusy ? 1 : 0.5 }}
                                  disabled={!internalEditDraft.trim() || internalBusy}
                                  onClick={updateInternalNote}
                                >
                                  {internalBusy ? 'Saving…' : 'Save'}
                                </button>
                                <button type="button" style={{ ...S.linkBtn, color: 'var(--ink-500)', marginTop: 0 }} onClick={cancelEditInternal}>Cancel</button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={S.noteBody}>{n.body}</div>
                              <div style={S.noteDate}>{fmtDate(n.created_at)}{n.resolved && <span style={S.resolvedTag}>Resolved</span>}</div>
                              <div style={{ display: 'inline-flex', gap: 14, alignItems: 'center' }}>
                                <button type="button" style={{ ...S.linkBtn, color: 'var(--navy-900)' }} onClick={() => startEditInternal(n)}>Edit</button>
                                <button type="button" style={S.linkBtn} onClick={() => deleteInternalNote(n.id)}>Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {/* JOURNAL: read-only insights */}
              {tab === 'journal' && (
                <>
                  <StudentJournal
                    entries={journal}
                    studentId={id}
                    onLogged={(row) => setJournal((prev) => [row, ...prev])}
                  />
                  {journal.length > 0 && (
                  <>
                    <div style={S.divider} />
                    <div style={S.cardTitle}>Leave notes on questions</div>
                    <p style={S.cardHint}>Add a note on any question - the student sees it in their journal.</p>
                    {journal.map((e) => (
                      <div key={e.id} style={S.item}>
                        <div style={S.itemMeta}>
                          {fmtDate(e.logged_on)}
                          {e.preptest ? ` · PT${e.preptest}` : ''}{e.section ? ` · S${e.section}` : ''}{e.question ? ` · Q${e.question}` : ''}
                        </div>
                        <div style={S.itemTitle}>
                          {questionTypeLabel(e.question_type)}{e.difficulty ? ` · difficulty ${e.difficulty}` : ''} · {e.result === 'incorrect' ? 'Incorrect' : e.result === 'correct_guessed' ? 'Lucky' : 'Correct'}
                        </div>
                        {e.root_cause && <div style={S.itemBody}><strong>Notes:</strong> {e.root_cause}</div>}
                        {e.takeaway && <div style={S.itemBody}><strong>Takeaway:</strong> {e.takeaway}</div>}
                        <TutorNoteEditor entry={e} onSaved={(row) => setJournal((prev) => prev.map((x) => (x.id === row.id ? row : x)))} />
                      </div>
                    ))}
                  </>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {recapModal && (
        <RecapModal
          studentId={id}
          initial={recapModal.id ? recapModal : null}
          onClose={() => setRecapModal(null)}
          onSaved={onRecapSaved}
        />
      )}

      <style>{`
        /* Strip the site-wide button design (gradient/height/shadow) from every
           plain button on this page - tabs AND text links like "Delete" - so they
           render as clean text. Inline styles still set their colour. */
        .admin-page button:not(.btn) {
          box-shadow: none; background: none; height: auto; min-width: 0;
          border-radius: 0; transition: none; padding: 0;
        }
        @media (max-width: 760px) {
          .admin-page { padding: 32px 0 64px !important; }
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminStudent;
