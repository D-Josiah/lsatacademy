import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the Supabase portal client at the module boundary. AuthContext only ever
// touches portal.auth.* and portal.from('profiles')...single().
vi.mock('./portalClient', () => ({
  portal: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
    },
    from: vi.fn(),
  },
}));

import { portal } from './portalClient';
import { AuthProvider, useAuth } from './AuthContext';

// Build the .select().eq().abortSignal().single() chain the profile fetch walks.
const profileQuery = (result) => ({
  select: () => ({
    eq: () => ({
      abortSignal: () => ({ single: () => Promise.resolve(result) }),
    }),
  }),
});

let authCallback; // captured from onAuthStateChange so tests can fire login/logout

function setup({ initialSession = null, profileResult } = {}) {
  portal.auth.getSession.mockResolvedValue({ data: { session: initialSession } });
  portal.auth.onAuthStateChange.mockImplementation((cb) => {
    authCallback = cb;
    return { data: { subscription: { unsubscribe: vi.fn() } } };
  });
  portal.from.mockReturnValue(
    profileQuery(profileResult ?? { data: null, error: null })
  );
}

function Consumer() {
  const a = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(a.loading)}</span>
      <span data-testid="role">{a.role ?? 'none'}</span>
      <span data-testid="isAdmin">{String(a.isAdmin)}</span>
      <span data-testid="user">{a.user ? a.user.id : 'no-user'}</span>
      <button onClick={() => a.signIn('  a@b.com  ', 'pw')}>signin</button>
      <button onClick={() => a.signOut()}>signout</button>
      <button onClick={() => a.resetPassword('  a@b.com  ')}>reset</button>
    </div>
  );
}

const renderAuth = () =>
  render(
    <AuthProvider>
      <Consumer />
    </AuthProvider>
  );

const waitReady = () =>
  waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'));

beforeEach(() => {
  vi.clearAllMocks();
  authCallback = undefined;
});

describe('AuthContext mount', () => {
  it('starts with no user when there is no initial session', async () => {
    setup({ initialSession: null });
    renderAuth();
    await waitReady();
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    expect(screen.getByTestId('role')).toHaveTextContent('none');
  });

  it('fetches the profile when an initial session exists', async () => {
    setup({
      initialSession: { user: { id: 'u1' } },
      profileResult: { data: { id: 'u1', role: 'admin' }, error: null },
    });
    renderAuth();
    await waitReady();
    expect(screen.getByTestId('user')).toHaveTextContent('u1');
    // The profile loads via an effect keyed on the user id, so it can land a
    // tick after `loading` clears.
    await waitFor(() => expect(screen.getByTestId('role')).toHaveTextContent('admin'));
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('true');
    expect(portal.from).toHaveBeenCalledWith('profiles');
  });

  it('still clears loading when getSession itself rejects (regression: stuck on Loading…)', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    portal.auth.getSession.mockRejectedValue(new Error('Failed to fetch'));
    portal.auth.onAuthStateChange.mockImplementation((cb) => {
      authCallback = cb;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });
    renderAuth();
    // Must not hang on loading=true forever.
    await waitReady();
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    errSpy.mockRestore();
  });

  it('clears loading on a sign-in event even if getSession never settles (regression: stuck on Loading… while signed in)', async () => {
    // getSession hangs forever — only the auth-state-change path can rescue us.
    portal.auth.getSession.mockReturnValue(new Promise(() => {}));
    portal.auth.onAuthStateChange.mockImplementation((cb) => {
      authCallback = cb;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });
    portal.from.mockReturnValue(
      profileQuery({ data: { id: 'u9', role: 'student' }, error: null })
    );

    renderAuth();

    // A sign-in arrives via onAuthStateChange while getSession is still pending.
    await act(async () => {
      await authCallback('SIGNED_IN', { user: { id: 'u9' } });
    });

    // Must NOT be stuck on loading — the guard would otherwise show "Loading…".
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('u9');
  });

  it('leaves profile null (and does not throw) when the profile fetch errors', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    setup({
      initialSession: { user: { id: 'u1' } },
      profileResult: { data: null, error: { message: 'boom' } },
    });
    renderAuth();
    await waitReady();
    expect(screen.getByTestId('role')).toHaveTextContent('none');
    await waitFor(() => expect(errSpy).toHaveBeenCalled());
    errSpy.mockRestore();
  });
});

describe('AuthContext onAuthStateChange', () => {
  it('sets session + profile on a login event and clears them on logout', async () => {
    setup({
      initialSession: null,
      profileResult: { data: { id: 'u2', role: 'student' }, error: null },
    });
    renderAuth();
    await waitReady();
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');

    // Fire a login through the captured listener.
    await act(async () => {
      await authCallback('SIGNED_IN', { user: { id: 'u2' }, access_token: 't2' });
    });
    expect(screen.getByTestId('user')).toHaveTextContent('u2');
    await waitFor(() => expect(screen.getByTestId('role')).toHaveTextContent('student'));

    // Fire a logout.
    await act(async () => {
      await authCallback('SIGNED_OUT', null);
    });
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    expect(screen.getByTestId('role')).toHaveTextContent('none');
  });
});

describe('AuthContext actions', () => {
  it('signIn passes a trimmed email to Supabase', async () => {
    setup();
    portal.auth.signInWithPassword.mockResolvedValue({ error: null });
    renderAuth();
    await waitReady();
    await userEvent.click(screen.getByText('signin'));
    expect(portal.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'a@b.com',
      password: 'pw',
    });
  });

  it('resetPassword trims the email and passes the update-password redirect', async () => {
    setup();
    portal.auth.resetPasswordForEmail.mockResolvedValue({ error: null });
    renderAuth();
    await waitReady();
    await userEvent.click(screen.getByText('reset'));
    expect(portal.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      'a@b.com',
      { redirectTo: `${window.location.origin}/update-password` }
    );
  });

  it('signOut clears local state even when Supabase signOut throws', async () => {
    setup({
      initialSession: { user: { id: 'u3' } },
      profileResult: { data: { id: 'u3', role: 'student' }, error: null },
    });
    portal.auth.signOut.mockRejectedValue(new Error('expired token'));
    renderAuth();
    await waitReady();
    expect(screen.getByTestId('user')).toHaveTextContent('u3');

    await userEvent.click(screen.getByText('signout'));

    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('no-user'));
    expect(screen.getByTestId('role')).toHaveTextContent('none');
    expect(portal.auth.signOut).toHaveBeenCalledWith({ scope: 'local' });
  });
});
