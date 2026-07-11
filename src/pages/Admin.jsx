import { useEffect, useMemo, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { portal } from '../lib/portalClient';
import { useAuth } from '../lib/AuthContext';

/* ============================================================
   Admin home - every student account, with a quick "add student"
   modal that calls the admin-create-student edge function.
   ============================================================ */

const S = {
  page: { background: 'var(--cream-100)', minHeight: '100vh', padding: '110px 0 80px' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 28, flexWrap: 'wrap' },
  eyebrow: { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--teal-500)', fontWeight: 600, marginBottom: 10 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 34, color: 'var(--navy-900)', fontWeight: 400 },
  search: {
    width: '100%', maxWidth: 360, padding: '11px 16px', borderRadius: 'var(--radius-pill)',
    border: '1.5px solid var(--ink-200)', fontFamily: 'var(--font-sans)', fontSize: 14,
    color: 'var(--ink-900)', background: '#fff', marginBottom: 20, outline: 'none',
  },
  tableWrap: { border: '1px solid var(--ink-100)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#fff' },
  scroll: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 640 },
  th: {
    textAlign: 'left', padding: '14px 18px', background: 'var(--cream-50)',
    borderBottom: '1px solid var(--ink-100)', fontFamily: 'var(--font-mono)', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-500)', fontWeight: 600,
  },
  td: { padding: '15px 18px', borderBottom: '1px solid var(--ink-100)', fontSize: 14.5, color: 'var(--ink-900)' },
  row: { cursor: 'pointer' },
  pill: {
    display: 'inline-block', padding: '3px 11px', borderRadius: 'var(--radius-pill)',
    background: 'var(--teal-50)', color: 'var(--navy-800)', fontSize: 13, fontWeight: 600,
  },
  statusTag: (inactive) => ({
    display: 'inline-block', padding: '3px 11px', borderRadius: 'var(--radius-pill)',
    fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
    background: inactive ? 'var(--ink-100)' : 'var(--teal-50)',
    color: inactive ? 'var(--ink-600)' : 'var(--teal-600, #1a7d8c)',
  }),
  noPkg: {
    display: 'inline-block', padding: '3px 11px', borderRadius: 'var(--radius-pill)',
    background: 'var(--ink-100)', color: 'var(--ink-500)', fontSize: 11.5, fontWeight: 600,
  },
  noteBadge: {
    display: 'inline-block', padding: '3px 11px', borderRadius: 'var(--radius-pill)',
    background: '#fff1e8', color: '#c2521f', fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap',
  },
  empty: { padding: '56px 24px', textAlign: 'center', color: 'var(--ink-500)' },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(2,50,71,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modal: { width: '100%', maxWidth: 440, background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: '28px 28px 24px' },
  modalTitle: { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 18 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy-900)', marginBottom: 7 },
  input: {
    width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--ink-200)', fontFamily: 'var(--font-sans)', fontSize: 15,
    color: 'var(--ink-900)', background: '#fff', marginBottom: 16, outline: 'none',
  },
  error: { background: '#fde7e7', border: '1px solid #f6c6c6', color: '#8a2020', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 13.5, marginBottom: 16 },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 },
  ghostBtn: { padding: '11px 20px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--ink-200)', background: '#fff', color: 'var(--ink-700)', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
};

const AddStudentModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', meeting_credits: '0' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    const { data, error: err } = await portal.functions.invoke('admin-create-student', {
      body: {
        email: form.email.trim(),
        password: form.password,
        full_name: form.full_name.trim(),
        meeting_credits: Number(form.meeting_credits) || 0,
      },
    });
    if (err || data?.error) {
      setError(data?.error || err.message || 'Could not create the student.');
      setBusy(false);
      return;
    }
    onCreated();
    onClose();
  };

  return (
    <div style={S.overlay} onMouseDown={onClose}>
      <div style={S.modal} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={S.modalTitle}>Add a student</div>
        {error && <div style={S.error}>{error}</div>}
        <form onSubmit={submit}>
          <label style={S.label}>Full name</label>
          <input style={S.input} value={form.full_name} onChange={set('full_name')} required />
          <label style={S.label}>Email</label>
          <input style={S.input} type="email" value={form.email} onChange={set('email')} required />
          <label style={S.label}>Temporary password</label>
          <input style={S.input} type="text" value={form.password} onChange={set('password')} minLength={8} required />
          <label style={S.label}>Meeting credits</label>
          <input style={S.input} type="number" min="0" value={form.meeting_credits} onChange={set('meeting_credits')} />
          <div style={S.actions}>
            <button type="button" style={S.ghostBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', opacity: busy ? 0.6 : 1 }} disabled={busy}>
              {busy ? 'Creating…' : 'Create student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const logout = async () => { await signOut(); navigate('/'); };
  const [students, setStudents] = useState([]);
  const [counts, setCounts] = useState({}); // student_id -> recap count
  const [journalCounts, setJournalCounts] = useState({}); // student_id -> journal entry count
  const [noteCounts, setNoteCounts] = useState({}); // student_id -> unresolved note count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await portal
      .from('profiles')
      // select * so an optional column (status) is included when present but its
      // absence (pre-migration) doesn't throw and break the list.
      .select('*')
      .eq('role', 'student')
      .order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setStudents(data || []);

    // Recap + journal + unresolved-note counts per student, grouped client-side
    // from id-only rows. Recaps are filtered server-side (non-null, non-empty)
    // so the full recap text of every meeting isn't downloaded just to count it;
    // notes fetch only the three columns the grouping reads instead of `*`.
    const [{ data: mts }, { data: jrn }, { data: nts }] = await Promise.all([
      portal.from('meetings').select('student_id').not('recap', 'is', null).neq('recap', ''),
      portal.from('journal_entries').select('student_id'),
      portal.from('notes').select('student_id, parent_id, resolved'),
    ]);
    const recapMap = {};
    (mts || []).forEach((m) => {
      recapMap[m.student_id] = (recapMap[m.student_id] || 0) + 1;
    });
    setCounts(recapMap);
    const jMap = {};
    (jrn || []).forEach((j) => { jMap[j.student_id] = (jMap[j.student_id] || 0) + 1; });
    setJournalCounts(jMap);
    const nMap = {};
    (nts || []).forEach((n) => { if (!n.parent_id && !n.resolved) nMap[n.student_id] = (nMap[n.student_id] || 0) + 1; });
    setNoteCounts(nMap);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) => (s.full_name || '').toLowerCase().includes(q) || (s.email || '').toLowerCase().includes(q)
    );
  }, [students, query]);

  return (
    <div className="v2 admin-page" style={S.page}>
      <Helmet>
        <title>Admin | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container">
        <div style={S.head}>
          <div>
            <div style={S.eyebrow}>Admin</div>
            <h1 style={S.h1}>Students</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={logout}
              style={{ justifyContent: 'center' }}
            >
              Log out
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setShowAdd(true)}>
              + Add student
            </button>
          </div>
        </div>

        <input
          style={S.search}
          placeholder="Search students by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {error && <div style={{ ...S.error, maxWidth: 'none' }}>{error}</div>}

        <div style={S.tableWrap}>
          <div style={S.scroll}>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Name</th>
                  <th style={S.th}>Status</th>
                  <th style={S.th}>Email</th>
                  <th style={S.th}>Package</th>
                  <th style={S.th}>Notes</th>
                  <th style={S.th}>Recaps</th>
                  <th style={S.th}>Journal</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td style={S.td} colSpan={7}>Loading…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7}><div style={S.empty}>No students yet. Use “Add student” to create one.</div></td></tr>
                ) : (
                  filtered.map((s) => {
                    const inactive = s.status === 'inactive';
                    return (
                    <tr
                      key={s.id}
                      style={S.row}
                      className="admin-row"
                      onClick={() => navigate(`/admin/students/${s.id}`)}
                    >
                      <td style={S.td}>{s.full_name || '-'}</td>
                      <td style={S.td}><span style={S.statusTag(inactive)}>{inactive ? 'Inactive' : 'Active'}</span></td>
                      <td style={S.td}>{s.email}</td>
                      <td style={S.td}>
                        {s.meetings_total > 0
                          ? <span style={S.pill}>{s.meeting_credits} / {s.meetings_total}</span>
                          : <span style={S.noPkg}>No package</span>}
                      </td>
                      <td style={S.td}>
                        {noteCounts[s.id]
                          ? <span style={S.noteBadge}>{noteCounts[s.id]} unresolved</span>
                          : <span style={{ color: 'var(--ink-400)' }}>0</span>}
                      </td>
                      <td style={S.td}>{counts[s.id] || 0}</td>
                      <td style={S.td}>{journalCounts[s.id] || 0}</td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAdd && <AddStudentModal onClose={() => setShowAdd(false)} onCreated={load} />}

      <style>{`
        .admin-page .admin-row:hover { background: var(--cream-50); }
        .admin-page input::placeholder { color: var(--ink-400); }
        /* The site-wide \`form { display:flex; align-items:center; gap:3rem;
           margin-top:5rem }\` rule (from the contact-form styles) leaks in and
           shrink-wraps the Add-student modal fields. Reset it to block flow so
           the inputs fill the modal and spacing comes from their own margins. */
        .admin-page form { display: block; width: 100%; max-width: none; margin: 0; gap: 0; }
        @media (max-width: 760px) { .admin-page { padding: 92px 0 64px !important; } }
      `}</style>
    </div>
  );
};

export default Admin;
