import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

/* ============================================================
   Public self-serve signup (Supabase Auth). Anyone can create
   an account and set their own password; the on_auth_user_created
   trigger provisions the profiles row. Mirrors the Login layout:
   branded navy panel + clean form.
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
  field: { position: 'relative', marginBottom: 14 },
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
  hint: { fontSize: 12.5, color: 'var(--ink-400)', marginTop: 6, lineHeight: 1.4 },
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
  switchRow: { marginTop: 18, fontSize: 13.5, color: 'var(--ink-500)', textAlign: 'center' },
  switchLink: { color: 'var(--teal-500)', fontWeight: 600, textDecoration: 'none' },
};

const MIN_PASSWORD = 8;

const Signup = () => {
  const { session, isAdmin, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirmSent, setConfirmSent] = useState(false);

  // Already signed in? Skip the form.
  if (!loading && session) {
    const dest = location.state?.from || (isAdmin ? '/admin' : '/portal');
    return <Navigate to={dest} replace />;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError('');

    if (password.length < MIN_PASSWORD) {
      setError(`Your password needs at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('Those passwords don’t match. Please retype them.');
      return;
    }

    setBusy(true);
    // profiles.full_name is a single column, so join the two parts here.
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const { data, error: err } = await signUp(email, password, fullName);
    if (err) {
      setError(
        /already registered/i.test(err.message)
          ? 'An account with that email already exists. Try signing in instead.'
          : err.message
      );
      setBusy(false);
      return;
    }

    // Email confirmation ON: no session yet — the user must click the link
    // we just emailed them. Confirmation OFF: they're signed in, go straight
    // to the portal.
    if (data?.session) {
      navigate('/portal', { replace: true });
    } else {
      setConfirmSent(true);
      setBusy(false);
    }
  };

  return (
    <div className="v2 login-v2" style={S.wrap}>
      <Helmet>
        <title>Create Your Account | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={S.card} className="login-card">
        {/* Brand panel */}
        <div style={S.brand} className="login-brand">
          <div style={S.grain} />
          <h2 style={S.brandHeadline}>Start building your study hub.</h2>
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
            <span style={S.ctaLabel}>Want 1-on-1 tutoring too?</span>
            <Link to="/services" style={S.cta} className="login-cta">See tutoring packages →</Link>
          </div>
        </div>

        {/* Form panel */}
        <div style={S.form}>
          <div style={S.eyebrow}><span style={S.dot} /> LSAT Academy</div>
          <h1 style={S.h1}>Create your account</h1>

          {confirmSent ? (
            <>
              <div style={S.notice}>
                Almost there — we’ve emailed a confirmation link to{' '}
                <strong>{email.trim()}</strong>. Click it to activate your
                account, then sign in.
              </div>
              <div style={S.switchRow}>
                Already confirmed?{' '}
                <Link to="/login" style={S.switchLink}>Sign in</Link>
              </div>
            </>
          ) : (
            <>
              {error && (
                <div style={S.error}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={submit}>
                <div className="signup-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={S.field}>
                    <label style={S.label} htmlFor="signup-first-name">First name</label>
                    <input
                      id="signup-first-name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Jane"
                      style={S.input}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div style={S.field}>
                    <label style={S.label} htmlFor="signup-last-name">Last name</label>
                    <input
                      id="signup-last-name"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      style={S.input}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={S.field}>
                  <label style={S.label} htmlFor="signup-email">Email</label>
                  <input
                    id="signup-email"
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
                  <label style={S.label} htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    style={S.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={MIN_PASSWORD}
                    required
                  />
                  <div style={S.hint}>At least {MIN_PASSWORD} characters.</div>
                </div>

                <div style={S.field}>
                  <label style={S.label} htmlFor="signup-confirm">Confirm password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    style={S.input}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    minLength={MIN_PASSWORD}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 8, opacity: busy ? 0.6 : 1 }}
                  disabled={busy}
                >
                  {busy ? 'Creating account…' : 'Create account'}
                </button>
              </form>

              <div style={S.switchRow}>
                Already have an account?{' '}
                <Link to="/login" style={S.switchLink}>Sign in</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .login-v2 input:focus {
          border-color: var(--teal-400) !important;
          box-shadow: 0 0 0 3px var(--teal-50);
        }
        .login-v2 button:not(.btn) {
          box-shadow: none; background: none; height: auto; min-width: 0;
          border-radius: 0; transition: none;
        }
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
          .login-v2 .signup-name-row { grid-template-columns: 1fr !important; gap: 0 !important; }
          .login-v2 .login-brand { display: none !important; }
          .login-v2 .login-card { box-shadow: var(--shadow-md); }
        }
      `}</style>
    </div>
  );
};

export default Signup;
