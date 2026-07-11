import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { portal } from './portalClient';

// Auth + profile state for the whole app. Wrap <App> in <AuthProvider> and read
// it anywhere with useAuth(). `profile` carries role + meeting_credits so guards
// and the portal can branch on student vs admin without an extra fetch.

const AuthContext = createContext(null);

// A profile query that never settles (mid-token-refresh network drop, dead
// connection) must surface as an error with a Retry button, not an eternal
// "Loading your account…" — so every fetch is capped.
const PROFILE_TIMEOUT_MS = 10_000;

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  // `loading` covers the initial session check. `profileError` lets the UI tell
  // "profile still loading" (null profile, no error) apart from "profile failed
  // to load" (error set) — so guards never render a silent blank.
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  // Monotonic id per profile fetch: a slow response that lands after a newer
  // fetch (or after logout) is dropped instead of clobbering fresher state.
  const profileReqRef = useRef(0);

  const fetchProfile = useCallback(async (userId) => {
    const reqId = ++profileReqRef.current;
    if (!userId) {
      setProfile(null);
      setProfileError(null);
      return null;
    }
    setProfileError(null);
    try {
      // select('*') so an optional column (e.g. meetings_total, which may not be
      // migrated yet) is simply absent rather than throwing "column does not
      // exist" and blocking the whole portal. RLS limits this to the user's row.
      const { data, error } = await portal
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .abortSignal(AbortSignal.timeout(PROFILE_TIMEOUT_MS))
        .single();
      if (reqId !== profileReqRef.current) return null; // superseded
      if (error) {
        console.error('Failed to load profile:', error.message);
        setProfile(null);
        setProfileError(error.message || 'Could not load your account.');
        return null;
      }
      setProfile(data);
      setProfileError(null);
      return data;
    } catch (e) {
      // A rejected query (network drop, expired token, timeout) must not
      // propagate and leave the app stuck — record the failure so the guard can
      // offer a retry.
      if (reqId !== profileReqRef.current) return null;
      console.error('Failed to load profile:', e?.message || e);
      setProfile(null);
      setProfileError(e?.message || 'Could not load your account.');
      return null;
    }
  }, []);

  useEffect(() => {
    let active = true;

    // 0. Watchdog. Belt-and-braces: if getSession() somehow never settles, force
    //    the gate open after a few seconds so ProtectedRoute can proceed on
    //    whatever session state we have instead of showing "Loading…" forever.
    const watchdog = setTimeout(() => {
      if (active) setLoading(false);
    }, 8000);

    // 1. Initial session on mount. ALWAYS clear `loading`, even if getSession
    //    rejects — otherwise ProtectedRoute is stuck on the "Loading…" screen
    //    for the whole app, forever. The profile fetch is NOT chained here; the
    //    user-id effect below owns it (single code path, no double fetch).
    portal.auth
      .getSession()
      .then(({ data: { session: s } }) => {
        if (active) setSession(s);
      })
      .catch((e) => {
        console.error('Initial session check failed:', e?.message || e);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // 2. React to login / logout / token refresh.
    //
    //    The callback MUST stay synchronous. supabase-js dispatches these events
    //    while holding the auth client's internal lock; any awaited portal.*
    //    query inside the callback needs getSession() → queues behind that same
    //    lock → deadlocks the whole client (the classic "portal randomly hangs
    //    until refresh"). The custom no-op `lock:` in portalClient only bypasses
    //    navigator.locks, not this internal queue — so no awaits in here, ever.
    //    Profile loading reacts to the session state change instead (below).
    const { data: { subscription } } = portal.auth.onAuthStateChange((_event, s) => {
      if (!active) return;
      // TOKEN_REFRESHED / focus-triggered SIGNED_IN events fire with the same
      // session; bail out when nothing changed so the whole consumer tree
      // doesn't re-render (and effects keyed on session don't churn).
      setSession((prev) =>
        prev?.access_token === s?.access_token && prev?.user?.id === s?.user?.id ? prev : s
      );
      setLoading(false);
    });

    return () => {
      active = false;
      clearTimeout(watchdog);
      subscription?.unsubscribe();
    };
  }, []);

  // 3. Profile follows the signed-in user id — not the session object. Token
  //    refreshes swap the session but keep the id, so they no longer trigger a
  //    refetch; only an actual login/logout/user-switch does.
  const userId = session?.user?.id ?? null;
  useEffect(() => {
    fetchProfile(userId);
  }, [userId, fetchProfile]);

  const signIn = useCallback(
    (email, password) =>
      portal.auth.signInWithPassword({ email: email.trim(), password }),
    []
  );

  // Public self-serve signup. The on_auth_user_created trigger creates the
  // profiles row (role derived from email, full_name from user metadata).
  // If email confirmation is on, data.session comes back null and the user
  // must click the link in their inbox before signing in.
  const signUp = useCallback(
    (email, password, fullName) =>
      portal.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName?.trim() || '' },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      }),
    []
  );

  const signOut = useCallback(async () => {
    // 'local' clears the stored session without a network round-trip — a global
    // sign-out can throw on an expired/invalid token and leave the user stuck
    // "logged in". Clear local state regardless of the result.
    try {
      await portal.auth.signOut({ scope: 'local' });
    } catch {
      /* ignore — we clear state below either way */
    }
    profileReqRef.current += 1; // drop any in-flight profile fetch
    setSession(null);
    setProfile(null);
  }, []);

  const resetPassword = useCallback(
    (email) =>
      portal.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/update-password`,
      }),
    []
  );

  const refreshProfile = useCallback(
    () => fetchProfile(userId),
    [fetchProfile, userId]
  );

  // Memoized so a provider re-render without a state change doesn't re-render
  // every useAuth() consumer in the app.
  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      role: profile?.role ?? null,
      isAdmin: profile?.role === 'admin',
      loading,
      profileError,
      signIn,
      signUp,
      signOut,
      resetPassword,
      refreshProfile,
    }),
    [session, profile, loading, profileError, signIn, signUp, signOut, resetPassword, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
