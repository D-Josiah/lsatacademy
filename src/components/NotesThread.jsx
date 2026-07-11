import { useEffect, useState, useCallback } from 'react';
import { portal } from '../lib/portalClient';

/* ============================================================
   Threaded notes between a student and their tutor (David).
   - Start a new thread, reply within a thread.
   - Either side can Resolve / Reopen the whole thread.
   - Admin can delete a thread (cascades replies).
   Self-contained: fetches + mutates `notes` for one student.

   Props:
     studentId    - whose notes to load
     userId       - the signed-in user's id (author of new messages)
     isAdmin      - true for the tutor view, false for the student
     onUnresolved - optional (count) => void, fired when the open-thread count changes
   ============================================================ */

const fmt = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';

const S = {
  intro: { fontSize: 13.5, color: 'var(--ink-500)', marginBottom: 16, lineHeight: 1.5 },
  composer: { marginBottom: 22 },
  textarea: {
    width: '100%', minHeight: 70, padding: '11px 14px', borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--ink-200)', fontFamily: 'var(--font-sans)', fontSize: 14,
    color: 'var(--ink-900)', resize: 'vertical', outline: 'none', marginBottom: 10,
  },
  thread: {
    border: '1px solid var(--ink-100)', borderRadius: 'var(--radius-md)',
    padding: '14px 16px', marginBottom: 14, background: '#fff',
  },
  threadResolved: { background: 'var(--cream-50)', opacity: 0.85 },
  threadHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 4 },
  msg: (mine) => ({
    background: mine ? 'var(--teal-50)' : 'var(--cream-50)',
    border: `1px solid ${mine ? 'var(--teal-100)' : 'var(--ink-100)'}`,
    borderRadius: 'var(--radius-md)', padding: '10px 13px', marginBottom: 8,
    marginLeft: mine ? 28 : 0, marginRight: mine ? 0 : 28,
  }),
  who: { fontFamily: 'var(--font-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-400)', marginBottom: 4, fontWeight: 600 },
  body: { fontSize: 14.5, color: 'var(--ink-800)', lineHeight: 1.55, whiteSpace: 'pre-wrap' },
  date: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)', marginTop: 6 },
  actions: { display: 'inline-flex', gap: 14, alignItems: 'center', marginTop: 8 },
  link: { background: 'none', border: 'none', padding: 0, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-500)' },
  resolvedTag: {
    display: 'inline-block', padding: '2px 9px', borderRadius: 'var(--radius-pill)',
    background: '#e4f5e9', color: '#1f7a44', fontSize: 10.5, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap',
  },
  error: { background: '#fde7e7', border: '1px solid #f6c6c6', color: '#8a2020', borderRadius: 'var(--radius-sm)', padding: '9px 13px', fontSize: 13, marginBottom: 12 },
  empty: { fontSize: 14, color: 'var(--ink-400)', padding: '8px 0' },
};

// Module scope, not inside NotesThread: defining it per render would make React
// see a brand-new component type each render and remount every message (state
// loss + churn) on each keystroke in the composer.
const who = (n, userId) => (n.author_id === userId ? 'You' : n.author_role === 'admin' ? 'David (tutor)' : 'Student');

const Message = ({ n, userId }) => {
  const mine = n.author_id === userId;
  return (
    <div style={S.msg(mine)}>
      <div style={S.who}>{who(n, userId)}</div>
      <div style={S.body}>{n.body}</div>
      <div style={S.date}>{fmt(n.created_at)}</div>
    </div>
  );
};

export default function NotesThread({ studentId, userId, isAdmin = false, onUnresolved }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newRoot, setNewRoot] = useState('');
  const [replyFor, setReplyFor] = useState(null);
  const [replyDraft, setReplyDraft] = useState('');
  const [busy, setBusy] = useState(false);

  const role = isAdmin ? 'admin' : 'student';

  const load = useCallback(async () => {
    if (!studentId) return;
    setLoading(true);
    setError('');
    try {
      const { data, error: err } = await portal
        .from('notes')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: true })
        .abortSignal(AbortSignal.timeout(15_000));
      if (err) setError(err.message);
      else setNotes(data || []);
    } catch (err) {
      // Timeout / network drop: show the error instead of a spinner that never
      // resolves.
      setError(err?.message || 'Could not load notes. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [studentId]);
  useEffect(() => { load(); }, [load]);

  const roots = notes.filter((n) => !n.parent_id);
  const repliesByParent = {};
  notes.forEach((n) => {
    if (n.parent_id) (repliesByParent[n.parent_id] = repliesByParent[n.parent_id] || []).push(n);
  });
  const unresolved = roots.filter((r) => !r.resolved).length;
  useEffect(() => { if (onUnresolved) onUnresolved(unresolved); }, [unresolved, onUnresolved]);

  const insertNote = async (body, parentId) => {
    const { data, error: err } = await portal
      .from('notes')
      .insert({ student_id: studentId, author_id: userId, author_role: role, body, parent_id: parentId || null })
      .select('*')
      .single();
    if (err) { setError(err.message); return null; }
    setNotes((prev) => [...prev, data]);
    return data;
  };

  const startThread = async () => {
    const body = newRoot.trim();
    if (!body || busy) return;
    setBusy(true); setError('');
    const ok = await insertNote(body, null);
    if (ok) setNewRoot('');
    setBusy(false);
  };

  const sendReply = async (rootId) => {
    const body = replyDraft.trim();
    if (!body || busy) return;
    setBusy(true); setError('');
    const ok = await insertNote(body, rootId);
    if (ok) { setReplyDraft(''); setReplyFor(null); }
    setBusy(false);
  };

  const toggleResolved = async (root) => {
    const next = !root.resolved;
    setNotes((prev) => prev.map((n) => (n.id === root.id ? { ...n, resolved: next } : n)));
    const { error: err } = await portal.from('notes').update({ resolved: next }).eq('id', root.id);
    if (err) {
      setError(err.message);
      setNotes((prev) => prev.map((n) => (n.id === root.id ? { ...n, resolved: !next } : n)));
    }
  };

  const removeThread = async (rootId) => {
    const { error: err } = await portal.from('notes').delete().eq('id', rootId); // cascades replies
    if (err) setError(err.message);
    else setNotes((prev) => prev.filter((n) => n.id !== rootId && n.parent_id !== rootId));
  };

  return (
    <div>
      <p style={S.intro}>
        {isAdmin
          ? 'Conversations with this student. Reply in a thread, and resolve it once it’s handled.'
          : 'Messages between you and your tutor. Start a thread or reply, and resolve it once it’s sorted.'}
      </p>
      {error && <div style={S.error}>{error}</div>}

      {/* New thread */}
      <div style={S.composer}>
        <textarea
          style={S.textarea}
          value={newRoot}
          onChange={(e) => setNewRoot(e.target.value)}
          placeholder={isAdmin ? 'Start a note for this student…' : 'Start a note for your tutor…'}
        />
        <button
          type="button"
          className="btn btn-primary"
          style={{ display: 'inline-flex', justifyContent: 'center', opacity: newRoot.trim() && !busy ? 1 : 0.5 }}
          disabled={!newRoot.trim() || busy}
          onClick={startThread}
        >
          Post note
        </button>
      </div>

      {loading ? (
        <div style={S.empty}>Loading…</div>
      ) : roots.length === 0 ? (
        <div style={S.empty}>No notes yet.</div>
      ) : (
        roots
          .slice()
          .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
          .map((root) => (
            <div key={root.id} style={{ ...S.thread, ...(root.resolved ? S.threadResolved : null) }}>
              <div style={S.threadHead}>
                <span style={S.who}>Thread</span>
                {root.resolved && <span style={S.resolvedTag}>Resolved</span>}
              </div>

              <Message n={root} userId={userId} />
              {(repliesByParent[root.id] || []).map((r) => <Message key={r.id} n={r} userId={userId} />)}

              {replyFor === root.id ? (
                <div style={{ marginTop: 6 }}>
                  <textarea
                    style={S.textarea}
                    value={replyDraft}
                    onChange={(e) => setReplyDraft(e.target.value)}
                    placeholder="Write a reply…"
                    autoFocus
                  />
                  <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', justifyContent: 'center', opacity: replyDraft.trim() && !busy ? 1 : 0.5 }}
                      disabled={!replyDraft.trim() || busy}
                      onClick={() => sendReply(root.id)}
                    >
                      Send reply
                    </button>
                    <button type="button" style={S.link} onClick={() => { setReplyFor(null); setReplyDraft(''); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={S.actions}>
                  <button type="button" style={{ ...S.link, color: 'var(--teal-600, #1a7d8c)' }} onClick={() => { setReplyFor(root.id); setReplyDraft(''); }}>
                    Reply
                  </button>
                  <button type="button" style={{ ...S.link, color: root.resolved ? 'var(--ink-500)' : '#1f7a44' }} onClick={() => toggleResolved(root)}>
                    {root.resolved ? 'Reopen' : 'Mark resolved'}
                  </button>
                  {isAdmin && (
                    <button type="button" style={{ ...S.link, color: '#b3261e' }} onClick={() => removeThread(root.id)}>
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
}
