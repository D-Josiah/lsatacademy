import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

/* ============================================================
   Student / admin sign-in. Email + password (Supabase Auth),
   with a "forgot password" magic-reset fallback.
   Two-panel layout: branded navy panel + clean form.
   ============================================================ */

const FEATURES = [
  'Your wrong answer journal & analytics',
  'Meeting recaps from every session',
  'Remaining sessions & one-tap booking',
  'Notes to and from your tutor',
];

const S = {
  wrap: {
    minHeight: '100vh',
    background: 'var(--cream-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '72px 20px 56px',
  },
  card: {
    width: '100%',
    maxWidth: 1040,
    background: '#fff',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    display: 'grid',
    // Give the form panel more room than the brand panel so the inputs read wide.
    gridTemplateColumns: '0.85fr 1fr',
  },

  /* ---- brand panel ---- */
  brand: {
    position: 'relative',
    background: 'linear-gradient(165deg, var(--navy-900) 0%, var(--navy-700) 100%)',
    color: '#fff',
    padding: '48px 44px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    opacity: 0.6,
    pointerEvents: 'none',
    backgroundImage:
      'radial-gradient(circle at 12% 88%, rgba(42,142,158,0.28), transparent 45%), radial-gradient(circle at 92% 6%, rgba(42,142,158,0.16), transparent 55%)',
  },
  brandHeadline: {
    position: 'relative',
    fontFamily: 'var(--font-display)',
    fontSize: 30,
    fontWeight: 400,
    lineHeight: 1.2,
    margin: '0 0 24px',
  },
  featureList: { position: 'relative', listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 },
  feature: { display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14.5, color: 'rgba(255,255,255,0.86)', lineHeight: 1.4 },
  ctaWrap: { position: 'relative', marginTop: 36, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,0.14)' },
  ctaLabel: { display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.6)', marginBottom: 12 },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '11px 22px',
    borderRadius: 'var(--radius-pill)',
    border: '1.5px solid rgba(255,255,255,0.5)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    textDecoration: 'none',
    transition: 'background .15s ease, border-color .15s ease',
  },
  tick: {
    flexShrink: 0,
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'rgba(42,142,158,0.25)',
    color: 'var(--teal-300)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },

  /* ---- form panel ---- */
  form: { padding: '46px 44px' },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'var(--teal-500)',
    fontWeight: 600,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--teal-500)' },
  h1: { fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy-900)', fontWeight: 400, marginBottom: 22 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy-900)', marginBottom: 8 },
  field: { position: 'relative', marginBottom: 8 },
  input: {
    width: '100%',
    padding: '13px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--ink-200)',
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    color: 'var(--ink-900)',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color .15s ease, box-shadow .15s ease',
  },
  error: {
    display: 'flex',
    gap: 9,
    alignItems: 'flex-start',
    background: '#fdecec',
    border: '1px solid #f6c6c6',
    color: '#8a2020',
    borderRadius: 'var(--radius-md)',
    padding: '11px 14px',
    fontSize: 13.5,
    marginBottom: 20,
    lineHeight: 1.45,
  },
  notice: {
    background: 'var(--teal-50)',
    border: '1px solid var(--teal-100)',
    color: 'var(--navy-800)',
    borderRadius: 'var(--radius-md)',
    padding: '11px 14px',
    fontSize: 13.5,
    marginBottom: 20,
    lineHeight: 1.45,
  },
  forgotRow: { textAlign: 'right', marginTop: 6 },
  forgot: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    height: 'auto',
    minWidth: 0,
    lineHeight: 1.3,
    color: 'var(--ink-500)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
  },
};

const Login = () => {
  const { session, isAdmin, signIn, resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Already signed in? Skip the form.
  if (!loading && session) {
    const dest = location.state?.from || (isAdmin ? '/admin' : '/portal');
    return <Navigate to={dest} replace />;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(
        err.message === 'Invalid login credentials'
          ? 'That email and password don’t match. Please try again.'
          : err.message
      );
      setBusy(false);
      return;
    }
    navigate(location.state?.from || '/portal', { replace: true });
  };

  const forgot = async () => {
    setError('');
    if (!email.trim()) {
      setError('Enter your email above first, then tap “Forgot password”.');
      return;
    }
    const { error: err } = await resetPassword(email);
    if (err) setError(err.message);
    else setResetSent(true);
  };

  return (
    <div className="v2 login-v2" style={S.wrap}>
      <Helmet>
        <title>Student Login | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={S.card} className="login-card">
        {/* Brand panel */}
        <div style={S.brand} className="login-brand">
          <div style={S.grain} />
          <h2 style={S.brandHeadline}>Welcome back to your study hub.</h2>
          <ul style={S.featureList}>
            {FEATURES.map((f) => (
              <li key={f} style={S.feature}>
                <span style={S.tick}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div style={S.ctaWrap}>
            <span style={S.ctaLabel}>Not a student yet?</span>
            <Link to="/signup" style={S.cta} className="login-cta">Create an account →</Link>
          </div>
        </div>

        {/* Form panel */}
        <div style={S.form}>
          <div style={S.eyebrow}><span style={S.dot} /> LSAT Academy</div>
          <h1 style={S.h1}>Student sign-in</h1>

          {resetSent && (
            <div style={S.notice}>
              Check your inbox - we’ve sent a link to reset your password.
            </div>
          )}
          {error && (
            <div style={S.error}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit}>
            <div style={S.field}>
              <label style={S.label} htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                style={S.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={S.field}>
              <label style={S.label} htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                style={S.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div style={S.forgotRow}>
                <button type="button" style={S.forgot} onClick={forgot}>
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, opacity: busy ? 0.6 : 1 }}
              disabled={busy}
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div style={{ marginTop: 18, fontSize: 13.5, color: 'var(--ink-500)', textAlign: 'center' }}>
            New here?{' '}
            <Link to="/signup" style={{ color: 'var(--teal-500)', fontWeight: 600, textDecoration: 'none' }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .login-v2 input:focus {
          border-color: var(--teal-400) !important;
          box-shadow: 0 0 0 3px var(--teal-50);
        }
        /* Neutralize the site-wide button gradient/pill/shadow rule for plain
           login buttons (e.g. "Forgot password?"). Inline styles win elsewhere. */
        .login-v2 button:not(.btn) {
          box-shadow: none; background: none; height: auto; min-width: 0;
          border-radius: 0; transition: none;
        }
        /* The contact-form stylesheet defines a bare \`form { display:flex;
           align-items:center }\` rule that leaks site-wide and shrink-wraps the
           login fields. Reset the login form back to block flow so the inputs
           fill their container. */
        .login-v2 form { display: block; width: 100%; max-width: none; margin: 0; gap: 0; }
        .login-v2 input { box-sizing: border-box; width: 100%; }
        .login-v2 input::placeholder { color: var(--ink-400); }
        .login-v2 .login-cta:hover { background: rgba(255,255,255,0.12); border-color: #fff; }
        @media (max-width: 820px) {
          .login-v2 .login-card { grid-template-columns: 1fr !important; max-width: 460px; }
          .login-v2 .login-brand {
            padding: 32px 32px !important;
          }
          .login-v2 .login-brand h2 { font-size: 24px !important; margin: 24px 0 18px !important; }
        }
        @media (max-width: 480px) {
          .login-v2 .login-brand { display: none !important; }
          .login-v2 .login-card { box-shadow: var(--shadow-md); }
        }
      `}</style>
    </div>
  );
};

export default Login;
