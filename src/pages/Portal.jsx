import { useEffect, useMemo, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { portal, BOOK_SESSION_URL } from '../lib/portalClient';
import { useAuth } from '../lib/AuthContext';
import NotesThread from '../components/NotesThread';

/* ============================================================
   Student dashboard:
   - remaining meetings + Book a session (-> David's Calendly)
   - past meeting recaps
   - notes from David
   - leave a note for David
   ============================================================ */

const S = {
  page: { background: 'var(--cream-100)', minHeight: '100vh', padding: '48px 0 80px' },
  head: { marginBottom: 32 },
  eyebrow: {
    fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
    letterSpacing: '0.14em', color: 'var(--teal-500)', fontWeight: 600, marginBottom: 10,
  },
  h1: { fontFamily: 'var(--font-display)', fontSize: 34, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 6 },
  sub: { fontSize: 16, color: 'var(--ink-600)' },

  tabs: { display: 'flex', flexWrap: 'wrap', marginBottom: 24, borderBottom: '1px solid var(--ink-100)' },
  tab: (active) => ({
    padding: '11px 4px', marginRight: 26, background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-sans)',
    color: active ? 'var(--navy-900)' : 'var(--ink-400)',
    borderBottom: active ? '2px solid var(--teal-500)' : '2px solid transparent',
  }),
  panel: {
    background: '#fff', border: '1px solid var(--ink-100)', borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)', padding: '24px 26px',
    // Keep the box a stable size so switching tabs doesn't make it jump.
    minHeight: 360,
  },
  divider: { borderTop: '1px solid var(--ink-100)', margin: '24px 0 20px' },

  // Sessions timeline (HubSpot-style)
  dayGroup: { marginBottom: 4 },
  dayLabelRow: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', margin: '20px 0 12px' },
  dayLabel: { fontSize: 13, fontWeight: 700, color: 'var(--navy-900)' },
  // Full-width: no left rail inset, so the timeline matches the Notes tab width.
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
  meetingWith: { fontSize: 13.5, color: 'var(--ink-500)', marginLeft: 8, fontWeight: 400 },
  // One shared badge design for both Free and Paid consult.
  consultBadge: {
    display: 'inline-block', padding: '2px 9px', borderRadius: 'var(--radius-pill)',
    fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
    background: 'var(--teal-50)', color: 'var(--teal-600, #1a7d8c)',
  },
  recapBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px',
    borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)', background: '#fff',
    color: 'var(--navy-900)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    whiteSpace: 'nowrap', textDecoration: 'none',
  },

  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, alignItems: 'start' },
  card: {
    background: '#fff', border: '1px solid var(--ink-100)', borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)', padding: '24px 26px',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--navy-900)',
    fontWeight: 400, marginBottom: 4,
  },
  cardHint: { fontSize: 13.5, color: 'var(--ink-500)', marginBottom: 18, lineHeight: 1.5 },

  creditWrap: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18 },
  creditNum: { fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--teal-500)', lineHeight: 1 },
  creditLabel: { fontSize: 15, color: 'var(--ink-600)' },

  recap: { borderTop: '1px solid var(--ink-100)', padding: '16px 0' },
  recapMeta: {
    fontFamily: 'var(--font-mono)', fontSize: 11.5, textTransform: 'uppercase',
    letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 6,
  },
  recapTitle: { fontSize: 15, fontWeight: 600, color: 'var(--navy-900)', marginBottom: 6 },
  recapPreview: { fontSize: 14, color: 'var(--ink-600)', lineHeight: 1.6, marginBottom: 12 },
  viewBtn: { display: 'inline-flex', justifyContent: 'center', padding: '8px 18px', fontSize: 13.5, textDecoration: 'none' },

  noteFromDavid: {
    background: 'var(--teal-50)', border: '1px solid var(--teal-100)',
    borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 12,
  },
  noteOwn: {
    background: 'var(--cream-50)', border: '1px solid var(--ink-100)',
    borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 12,
  },
  noteBody: { fontSize: 14.5, color: 'var(--ink-800)', lineHeight: 1.6, whiteSpace: 'pre-wrap' },
  noteDate: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', marginTop: 8 },

  textarea: {
    width: '100%', minHeight: 96, padding: '12px 14px', borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--ink-200)', fontFamily: 'var(--font-sans)', fontSize: 14.5,
    color: 'var(--ink-900)', resize: 'vertical', outline: 'none', marginBottom: 12,
  },
  empty: { fontSize: 14, color: 'var(--ink-400)', padding: '8px 0' },

  // Recap modal
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(2,50,71,0.45)', zIndex: 200,
    display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto',
  },
  modal: {
    width: '100%', maxWidth: 680, background: '#fff', borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)', padding: '28px 30px 24px', margin: 'auto',
  },
  modalTitle: { fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 4 },
  modalMeta: { fontFamily: 'var(--font-mono)', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 18 },
  recapText: { fontSize: 14.5, color: 'var(--ink-800)', lineHeight: 1.7, whiteSpace: 'pre-wrap' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'center', marginTop: 22 },
  ghostBtn: { padding: '11px 20px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)', background: '#fff', color: 'var(--ink-700)', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
};

// Read-only recap viewer: shows the full Summary / Action items / Discussion the
// tutor logged, with a link out to the recording if there is one.
const RecapModal = ({ meeting, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const url = recapUrl(meeting);
  return (
    <div style={S.overlay} onMouseDown={onClose}>
      <div style={S.modal} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={S.modalTitle}>{meeting.title || 'Session recap'}</div>
        <div style={S.modalMeta}>{fmtDate(meeting.scheduled_at || meeting.ended_at)}</div>
        <div style={S.recapText}>{recapBody(meeting.recap)}</div>
        <div style={S.modalActions}>
          {url && (
            <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', justifyContent: 'center', marginRight: 'auto' }}>
              Watch recording →
            </a>
          )}
          <button type="button" style={S.ghostBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

// The recording link lives in calendly_event_uri (only when it's a real URL —
// some rows store a bare event id), falling back to a URL inside the recap.
const recapUrl = (m) => {
  if (m.calendly_event_uri && /^https?:\/\//i.test(m.calendly_event_uri)) return m.calendly_event_uri;
  return (m.recap && (m.recap.match(/https?:\/\/\S+/) || [])[0]) || null;
};

// The full recap text for the modal: drop the leading "Summary" header (the modal
// already shows a title) and the trailing "Meeting recording: <url>" line (shown
// as its own link), then trim.
const recapBody = (text) =>
  (text || '')
    .replace(/\n*Meeting recording:\s*https?:\/\/\S+\s*$/i, '')
    .replace(/^\s*summary\s*/i, '')
    .trim();

// Timeline formatting (HubSpot-style): "Friday, May 29" headers + "7 PM – 8 PM".
const fmtDayHeader = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : '';
const fmtClock = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  // Date-only rows are stored at 00:00 UTC and would render as a misleading local
  // hour (e.g. "8 AM"); treat midnight-UTC as "no real time" and show only the date.
  if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0) return '';
  // Drop ":00" so 7:00 PM reads as "7 PM", but keep "9:30 PM".
  return d.toLocaleTimeString(undefined, d.getMinutes() ? { hour: 'numeric', minute: '2-digit' } : { hour: 'numeric' });
};
const fmtRange = (m) => {
  const s = fmtClock(m.scheduled_at);
  const e = fmtClock(m.ended_at);
  if (!s && !e) return '';
  return e ? `${s} - ${e}` : s;
};

// Group the (already date-desc) meetings into day buckets for the timeline.
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

const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const Portal = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const logout = async () => { await signOut(); navigate('/'); };
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('sessions');
  const [recapMeeting, setRecapMeeting] = useState(null);
  const [notesUnresolved, setNotesUnresolved] = useState(0);
  const [error, setError] = useState('');

  // Keyed on the user *id*, not the session/user object — token refreshes swap
  // the object but keep the id, and must not flip the dashboard back to
  // "Loading…" and refetch. Notes are owned by <NotesThread>, not fetched here.
  const userId = user?.id;
  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError('');
    try {
      // Scope every read to the signed-in student explicitly. RLS is the real
      // guard, but filtering here means a policy gap can never silently turn into
      // a cross-account leak (defense-in-depth; see SECURITY-AUDIT.md SEC-001).
      const { data, error: err } = await portal
        .from('meetings')
        .select('id, title, recap, scheduled_at, ended_at, status, calendly_event_uri')
        .eq('student_id', userId)
        .order('scheduled_at', { ascending: false, nullsFirst: false })
        .abortSignal(AbortSignal.timeout(15_000));
      if (err) setError(err.message);
      else setMeetings(data || []);
    } catch (err) {
      // A rejected or timed-out query (network drop, expired token, cold
      // connection) must never leave the dashboard stuck on "Loading…".
      // Surface it and clear the spinner.
      setError(err?.message || 'Could not load your dashboard. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // The profile (incl. meeting_credits) is already loaded by AuthContext on
    // mount, so there's no need to refetch it here, just load this page's data.
    load();
  }, [load]);

  const meetingGroups = useMemo(() => groupMeetingsByDay(meetings), [meetings]);

  const bookUrl = () => {
    const email = profile?.calendly_email || profile?.email || user?.email || '';
    const params = new URLSearchParams();
    if (email) params.set('email', email);
    if (profile?.full_name) params.set('name', profile.full_name);
    const qs = params.toString();
    return qs ? `${BOOK_SESSION_URL}?${qs}` : BOOK_SESSION_URL;
  };

  const credits = profile?.meeting_credits ?? 0;
  // Package size lives on the profile (meetings_total). Shown as remaining/total.
  const packageTotal = profile?.meetings_total || 0;
  // The earliest meeting is the free intro consult, labeled as such in the timeline.
  const firstMeetingId = useMemo(() => {
    const dated = meetings.filter((m) => m.scheduled_at);
    if (!dated.length) return null;
    return dated.reduce((a, b) => (a.scheduled_at <= b.scheduled_at ? a : b)).id;
  }, [meetings]);

  return (
    <div className="v2 portal-page" style={S.page}>
      <Helmet>
        <title>My Account | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container">
        <div style={{ ...S.head, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={S.eyebrow}>Student dashboard</div>
            <h1 style={S.h1}>
              {profile?.full_name ? `Welcome, ${profile.full_name.split(' ')[0]}` : 'Welcome'}
            </h1>
            <p style={S.sub}>Your sessions, recaps, and notes, all in one place.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={logout}
            style={{ justifyContent: 'center' }}
          >
            Log out
          </button>
        </div>

        {error && (
          <div style={{ ...S.card, background: '#fde7e7', borderColor: '#f6c6c6', color: '#8a2020', marginBottom: 22 }}>
            {error}
          </div>
        )}

        {/* Tabs replace the old card grid. The Journal tab routes to its own page. */}
        <div style={S.tabs} className="portal-tabs">
          <button type="button" style={S.tab(tab === 'sessions')} onClick={() => setTab('sessions')}>
            Sessions
          </button>
          <button type="button" style={S.tab(tab === 'notes')} onClick={() => setTab('notes')}>
            Notes{notesUnresolved ? ` (${notesUnresolved})` : ''}
          </button>
          <button
            type="button"
            style={S.tab(false)}
            onClick={() => navigate('/portal/journal')}
          >
            Wrong Answer Journal
          </button>
        </div>

        <div style={S.panel}>
          {/* Sessions: remaining meetings + book, then a timeline of past meetings */}
          {tab === 'sessions' && (
            <>
              <div style={{ textAlign: 'center' }}>
                <div style={S.cardTitle}>Remaining meetings</div>
                <p style={S.cardHint}>Sessions left in your current package.</p>
                <div style={{ ...S.creditWrap, justifyContent: 'center' }}>
                  <span style={S.creditNum}>
                    {credits}
                    {packageTotal ? (
                      <span style={{ color: 'var(--ink-300, #b9c0c7)', fontSize: 34 }}>/{packageTotal}</span>
                    ) : null}
                  </span>
                  <span style={S.creditLabel}>{credits === 1 ? 'session left' : 'sessions left'}</span>
                </div>
                <a
                  className="btn btn-primary"
                  href={bookUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', justifyContent: 'center' }}
                >
                  Book a session
                </a>
              </div>

              <div style={S.divider} />

              <div style={S.cardTitle}>Your sessions</div>
              <p style={S.cardHint}>Every meeting you&rsquo;ve had, most recent first.</p>
              {loading ? (
                <div style={S.empty}>Loading…</div>
              ) : meetingGroups.length === 0 ? (
                <div style={S.empty}>No sessions yet. Book your first one above.</div>
              ) : (
                <div>
                  {meetingGroups.map((g) => {
                    const isFree = g.items.some((m) => m.id === firstMeetingId);
                    return (
                    <div key={g.day} style={S.dayGroup}>
                      <div style={S.dayLabelRow}>
                        <span style={S.dayLabel}>{g.label}</span>
                        <span style={S.consultBadge}>
                          {isFree ? 'Free consult' : 'Paid consult'}
                        </span>
                      </div>
                      <div style={S.dayItems}>
                        {g.items.map((m) => {
                          const url = recapUrl(m);
                          const hasRecap = !!(m.recap && m.recap.trim());
                          return (
                            <div key={m.id} style={S.meetingItem}>
                              <div style={S.meetingMetaRow}>
                                <span style={S.meetingMetaLeft}>
                                  <CalIcon /> You had a meeting
                                </span>
                                <span style={S.meetingTime}>{fmtRange(m)}</span>
                              </div>
                              <div style={S.meetingCard}>
                                <span style={S.meetingCardLeft}>
                                  <span style={S.meetingDot} />
                                  <span>
                                    <span style={S.meetingTitle}>{m.title || 'Session'}</span>
                                    {profile?.full_name && (
                                      <span style={S.meetingWith}>with {profile.full_name}</span>
                                    )}
                                  </span>
                                </span>
                                {hasRecap ? (
                                  <button type="button" style={S.recapBtn} className="recap-open" onClick={() => setRecapMeeting(m)}>
                                    View recap
                                  </button>
                                ) : url ? (
                                  <a href={url} target="_blank" rel="noopener noreferrer" style={S.recapBtn}>
                                    View recap
                                  </a>
                                ) : (
                                  <span style={{ fontSize: 12.5, color: 'var(--ink-400)', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                                    No recap
                                  </span>
                                )}
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

          {/* Notes: from David + leave a note + your notes */}
          {tab === 'notes' && user && (
            <NotesThread studentId={user.id} userId={user.id} isAdmin={false} onUnresolved={setNotesUnresolved} />
          )}
        </div>

        <p style={{ marginTop: 30, fontSize: 13.5, color: 'var(--ink-400)' }}>
          Need something else?{' '}
          <Link to="/update-password" style={{ color: 'var(--teal-500)', fontWeight: 600 }}>
            Change your password
          </Link>.
        </p>
      </div>

      {recapMeeting && <RecapModal meeting={recapMeeting} onClose={() => setRecapMeeting(null)} />}

      <style>{`
        .portal-page .portal-textarea::placeholder { color: var(--ink-400); }
        /* Neutralize the site-wide button gradient/pill/shadow rule (and its
           hover/focus/active states) so the tab buttons + the "View recap" toggle
           render flat. Inline styles win for the props we set intentionally. */
        .portal-page button:not(.btn),
        .portal-page button:not(.btn):hover,
        .portal-page button:not(.btn):focus,
        .portal-page button:not(.btn):active {
          box-shadow: none; background: none; height: auto; min-width: 0;
          border-radius: 0; transition: none; transform: none;
        }
        @media (max-width: 760px) {
          .portal-page { padding: 32px 0 64px !important; }
        }
      `}</style>
    </div>
  );
};

export default Portal;
