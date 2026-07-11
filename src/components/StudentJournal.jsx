import { useMemo, useState } from 'react';
import { EntryModal } from '../pages/Journal';
import {
  questionTypeLabel, prettyStructure,
  summarize, weeklyVolume, byDimension, topMistake, errorTagCounts,
  calibration, hardestUnsolved, recommendation,
} from '../lib/journal';

/* ============================================================
   Read-only Wrong Answer Journal view for the admin — mirrors
   the student's /portal/journal (Insights + Entries), minus any
   editing. Pass the student's journal_entries as `entries`.
   ============================================================ */

const C = {
  navy: 'var(--navy-900)', ink: 'var(--ink-700)', ink5: 'var(--ink-500)',
  ink4: 'var(--ink-400)', teal: 'var(--teal-500)', cream: 'var(--cream-50)',
  line: 'var(--ink-100)', red: '#b3261e', green: '#1f7a44',
};

const S = {
  subtabs: { display: 'flex', gap: 6, marginBottom: 20, borderBottom: `1px solid ${C.line}` },
  subtab: (a) => ({
    padding: '9px 4px', marginRight: 22, background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-sans)',
    color: a ? C.navy : C.ink4, borderBottom: a ? `2px solid ${C.teal}` : '2px solid transparent',
  }),
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
  barRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 11 },
  barLabel: { width: 150, fontSize: 13, color: C.ink, flexShrink: 0, textAlign: 'right' },
  barTrack: { flex: 1, height: 22, background: C.cream, borderRadius: 6, overflow: 'hidden', position: 'relative' },
  barFill: (pct, color) => ({ width: `${pct}%`, height: '100%', background: color, borderRadius: 6 }),
  barVal: { width: 64, fontSize: 12.5, color: C.ink5, flexShrink: 0, fontFamily: 'var(--font-mono)' },
  volWrap: { display: 'flex', alignItems: 'flex-end', gap: 10, height: 140, padding: '0 4px' },
  volCol: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' },
  volBar: (h) => ({ width: '100%', maxWidth: 38, height: `${h}%`, minHeight: 3, background: C.teal, borderRadius: '4px 4px 0 0' }),
  volLabel: { fontSize: 10.5, color: C.ink4, fontFamily: 'var(--font-mono)' },
  volCount: { fontSize: 11.5, color: C.navy, fontWeight: 600 },
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
  empty: { padding: '40px 24px', textAlign: 'center', color: C.ink5 },
  tabBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, borderBottom: `1px solid ${C.line}`, marginBottom: 20, flexWrap: 'wrap' },
  // log-entry modal
  overlay: { position: 'fixed', inset: 0, background: 'rgba(2,50,71,0.45)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' },
  modal: { width: '100%', maxWidth: 560, background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: '26px 26px 22px', margin: 'auto' },
  modalTitle: { fontFamily: 'var(--font-display)', fontSize: 22, color: C.navy, fontWeight: 400, marginBottom: 6 },
  label: { display: 'block', fontSize: 12.5, fontWeight: 600, color: C.navy, margin: '12px 0 6px' },
  input: { width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--ink-200)', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-900)', background: '#fff', outline: 'none', boxSizing: 'border-box' },
  row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  pickRow: { display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 },
  pick: (a) => ({ padding: '7px 13px', borderRadius: 'var(--radius-pill)', border: a ? `1.5px solid ${C.teal}` : '1.5px solid var(--ink-200)', background: a ? 'var(--teal-50)' : '#fff', color: a ? C.navy : C.ink, fontSize: 12.5, fontWeight: a ? 600 : 500, cursor: 'pointer' }),
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22, alignItems: 'center' },
  ghostBtn: { padding: '10px 18px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)', background: '#fff', color: C.ink, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' },
  err: { background: '#fde7e7', border: '1px solid #f6c6c6', color: '#8a2020', borderRadius: 'var(--radius-sm)', padding: '9px 13px', fontSize: 13, marginBottom: 12 },
};


const fmtDate = (s) => (s ? new Date(s + (s.length === 10 ? 'T00:00:00' : '')).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '');

const BarList = ({ rows, color = C.teal, maxRows = 8 }) => {
  const max = Math.max(1, ...rows.map((r) => r.total));
  return (
    <div>
      {rows.slice(0, maxRows).map((r) => (
        <div key={r.key} style={S.barRow}>
          <div style={S.barLabel}>{r.label}</div>
          <div style={S.barTrack}><div style={S.barFill((r.total / max) * 100, color)} /></div>
          <div style={S.barVal}>{r.missed}/{r.total} · {r.missRate}%</div>
        </div>
      ))}
    </div>
  );
};

export default function StudentJournal({ entries = [], studentId, onLogged }) {
  const [tab, setTab] = useState('insights');
  const [logOpen, setLogOpen] = useState(false);
  const [fType, setFType] = useState('');
  const [fDiff, setFDiff] = useState('');
  const [fResult, setFResult] = useState('');
  const canLog = !!(studentId && onLogged);

  const stats = useMemo(() => summarize(entries), [entries]);
  const volume = useMemo(() => weeklyVolume(entries), [entries]);
  const byType = useMemo(() => byDimension(entries, 'question_type').map((r) => ({ ...r, label: questionTypeLabel(r.key) })), [entries]);
  const byStruct = useMemo(() => byDimension(entries, 'structure_type').map((r) => ({ ...r, label: prettyStructure(r.key) })), [entries]);
  const top = useMemo(() => topMistake(entries), [entries]);
  const tagCounts = useMemo(() => errorTagCounts(entries), [entries]);
  const calib = useMemo(() => calibration(entries), [entries]);
  const focus = useMemo(() => hardestUnsolved(entries), [entries]);
  const rec = useMemo(() => recommendation(entries), [entries]);
  const maxVol = Math.max(1, ...volume.map((v) => v.count));

  const typeOptions = useMemo(() => [...new Set(entries.map((e) => e.question_type).filter(Boolean))], [entries]);
  const filtered = entries.filter((e) => {
    if (fType && e.question_type !== fType) return false;
    if (fDiff && String(e.difficulty) !== fDiff) return false;
    if (fResult && e.result !== fResult) return false;
    return true;
  });

  const modal = logOpen && canLog ? (
    <EntryModal
      studentId={studentId}
      initial={null}
      onClose={() => setLogOpen(false)}
      onSaved={(row) => onLogged(row)}
    />
  ) : null;

  return (
    <div>
      <div style={S.tabBar}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" style={S.subtab(tab === 'insights')} onClick={() => setTab('insights')}>Insights</button>
          <button type="button" style={S.subtab(tab === 'entries')} onClick={() => setTab('entries')}>Entries ({entries.length})</button>
        </div>
        {canLog && (
          <button
            type="button"
            className="btn btn-primary"
            style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 8 }}
            onClick={() => setLogOpen(true)}
          >
            + Log an entry
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <>
          <div style={S.empty}>No entries logged yet.</div>
          {modal}
        </>
      ) : tab === 'insights' ? (
        <>
          <div style={S.statGrid}>
            <div style={S.stat}><div style={S.statLabel}>Logged</div><div style={S.statNum}>{stats.total}</div><div style={S.statFoot}>{stats.thisWeek} this week</div></div>
            <div style={S.stat}><div style={S.statLabel}>Study streak</div><div style={S.statNum}>{stats.streakDays || '-'}</div><div style={S.statFoot}>{stats.streakDays ? 'days in a row' : 'none yet'}</div></div>
            <div style={S.stat}><div style={S.statLabel}>Avg difficulty</div><div style={S.statNum}>{stats.avgDifficulty ?? '-'}</div><div style={S.statFoot}>out of 5</div></div>
            <div style={S.stat}><div style={S.statLabel}>Top mistake</div><div style={{ ...S.statNum, fontSize: 19, lineHeight: 1.25, paddingTop: 6 }}>{top ? top.tag : '-'}</div><div style={S.statFoot}>{top ? `${top.count}×` : 'no tags yet'}</div></div>
          </div>

          <div style={S.twoCol} className="admin-grid">
            <div style={S.card}>
              <div style={S.cardTitle}>Today’s focus</div>
              <p style={S.cardHint}>The hardest question still flagged for review.</p>
              {focus ? (
                <div style={S.focusCard}>
                  <div style={S.focusEyebrow}>Hardest unsolved</div>
                  <div style={S.focusTitle}>{questionTypeLabel(focus.question_type)} · level {focus.difficulty || '-'}</div>
                  <div style={{ fontSize: 13.5, color: C.ink5 }}>{focus.preptest ? `From PT ${focus.preptest}` : 'Self-logged'}{focus.takeaway ? ` · ${focus.takeaway}` : ''}</div>
                </div>
              ) : <div style={S.empty}>Nothing flagged.</div>}
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>What to drill next</div>
              <p style={S.cardHint}>Based on where they miss the most.</p>
              {rec ? (
                <>
                  {rec.weakType && <p style={{ fontSize: 14.5, color: C.ink, marginBottom: 6 }}>Weakest question type: <strong style={{ color: C.navy }}>{questionTypeLabel(rec.weakType.key)}</strong> ({rec.weakType.missed} missed)</p>}
                  {rec.weakStruct && <p style={{ fontSize: 14.5, color: C.ink }}>Weakest structure: <strong style={{ color: C.navy }}>{prettyStructure(rec.weakStruct.key)}</strong> ({rec.weakStruct.missed} missed)</p>}
                </>
              ) : <div style={S.empty}>Not enough data yet.</div>}
            </div>
          </div>

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

          <div style={S.twoCol} className="admin-grid">
            <div style={S.card}>
              <div style={S.cardTitle}>By question type</div>
              <p style={S.cardHint}>Bar = volume · label = missed / total · miss-rate.</p>
              {byType.length ? <BarList rows={byType} /> : <div style={S.empty}>No data yet.</div>}
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>By argument structure</div>
              <p style={S.cardHint}>The dimension most tools ignore.</p>
              {byStruct.length ? <BarList rows={byStruct} color="#c2521f" /> : <div style={S.empty}>No structure data.</div>}
            </div>
          </div>

          <div style={S.twoCol} className="admin-grid">
            <div style={S.card}>
              <div style={S.cardTitle}>Confidence calibration</div>
              <p style={S.cardHint}>“Confident but wrong” reveals real misconceptions.</p>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                <div><div style={{ ...S.statNum, color: C.red }}>{calib.confidentWrong}</div><div style={S.statFoot}>confident but wrong{calib.confidentWrongRate != null ? ` (${calib.confidentWrongRate}%)` : ''}</div></div>
                <div><div style={{ ...S.statNum, color: C.teal }}>{calib.shakyRight}</div><div style={S.statFoot}>right but unsure{calib.shakyRightRate != null ? ` (${calib.shakyRightRate}%)` : ''}</div></div>
              </div>
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>Most common error tags</div>
              <p style={S.cardHint}>Where their points are leaking.</p>
              {tagCounts.length ? tagCounts.slice(0, 8).map((t) => (
                <div key={t.tag} style={S.barRow}>
                  <div style={{ ...S.barLabel, width: 200 }}>{t.tag}</div>
                  <div style={S.barTrack}><div style={S.barFill((t.count / tagCounts[0].count) * 100, C.navy)} /></div>
                  <div style={S.barVal}>{t.count}×</div>
                </div>
              )) : <div style={S.empty}>No tags yet.</div>}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={S.filters}>
            {canLog && (
              <button type="button" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center' }} onClick={() => setLogOpen(true)}>
                + Log entry
              </button>
            )}
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
              <option value="incorrect">Got it wrong</option>
              <option value="correct_guessed">Right, but unsure</option>
              <option value="correct">Right, worth revisiting</option>
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
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={5}><div style={S.empty}>No entries match these filters.</div></td></tr>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {modal}
    </div>
  );
}
