import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { portal } from '../lib/portalClient';
import { useAuth } from '../lib/AuthContext';

/* ============================================================
   Set a new password. Reached two ways:
   1. From a "forgot password" reset link (Supabase signs the
      user in via the URL fragment, then lands them here).
   2. From the portal, by a logged-in user who wants to change it.
   ============================================================ */

const S = {
  wrap: {
    minHeight: '100vh', background: 'var(--cream-100)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', padding: '120px 20px 64px',
  },
  card: {
    width: '100%', maxWidth: 420, background: '#fff', border: '1px solid var(--ink-100)',
    borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '36px 32px 32px',
  },
  h1: { fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 18 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy-900)', marginBottom: 7 },
  input: {
    width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--ink-200)', fontFamily: 'var(--font-sans)', fontSize: 15,
    color: 'var(--ink-900)', background: '#fff', marginBottom: 18, outline: 'none',
  },
  error: {
    background: '#fde7e7', border: '1px solid #f6c6c6', color: '#8a2020',
    borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 13.5, marginBottom: 18,
  },
  notice: {
    background: 'var(--teal-50)', border: '1px solid var(--teal-100)', color: 'var(--navy-800)',
    borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 13.5, marginBottom: 18,
  },
};

const UpdatePassword = () => {
  const { session, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError('');
    if (password.length < 8) {
      setError('Use at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Those passwords don’t match.');
      return;
    }
    setBusy(true);
    const { error: err } = await portal.auth.updateUser({ password });
    if (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    setDone(true);
    setBusy(false);
    setTimeout(() => navigate(isAdmin ? '/admin' : '/portal', { replace: true }), 1200);
  };

  return (
    <div className="v2" style={S.wrap}>
      <Helmet>
        <title>Update Password | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={S.card}>
        <h1 style={S.h1}>Set a new password</h1>

        {!session && (
          <div style={S.notice}>
            Open this page from the reset link in your email, or sign in first.
          </div>
        )}
        {done && <div style={S.notice}>Password updated - taking you to your account…</div>}
        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={submit}>
          <label style={S.label} htmlFor="new-password">New password</label>
          <input
            id="new-password" type="password" autoComplete="new-password" style={S.input}
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          <label style={S.label} htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password" type="password" autoComplete="new-password" style={S.input}
            value={confirm} onChange={(e) => setConfirm(e.target.value)} required
          />
          <button
            type="submit" className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', opacity: busy ? 0.6 : 1 }}
            disabled={busy || !session}
          >
            {busy ? 'Saving…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
