import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

// Mock the auth hook so we can assert sign-in/reset calls and drive redirects.
vi.mock('../lib/AuthContext', () => ({ useAuth: vi.fn() }));
import { useAuth } from '../lib/AuthContext';

// react-helmet-async needs a provider; stub Helmet to a no-op to keep tests lean.
vi.mock('react-helmet-async', () => ({ Helmet: () => null }));

const baseAuth = {
  session: null,
  isAdmin: false,
  loading: false,
  signIn: vi.fn(),
  resetPassword: vi.fn(),
};

function renderLogin(authOverrides = {}, entry = { pathname: '/login' }) {
  useAuth.mockReturnValue({ ...baseAuth, ...authOverrides });
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<div>PORTAL PAGE</div>} />
        <Route path="/admin" element={<div>ADMIN PAGE</div>} />
        <Route path="/services" element={<div>SERVICES PAGE</div>} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Login redirects when already signed in', () => {
  it('sends a signed-in student to /portal', () => {
    renderLogin({ session: { user: {} }, isAdmin: false });
    expect(screen.getByText('PORTAL PAGE')).toBeInTheDocument();
  });

  it('sends a signed-in admin to /admin', () => {
    renderLogin({ session: { user: {} }, isAdmin: true });
    expect(screen.getByText('ADMIN PAGE')).toBeInTheDocument();
  });

  it('honors a "from" location over the default destination', () => {
    renderLogin(
      { session: { user: {} }, isAdmin: false },
      { pathname: '/login', state: { from: '/admin' } }
    );
    expect(screen.getByText('ADMIN PAGE')).toBeInTheDocument();
  });
});

describe('Login form', () => {
  it('calls signIn and navigates to /portal on success', async () => {
    const signIn = vi.fn().mockResolvedValue({ error: null });
    renderLogin({ signIn });
    const user = userEvent.setup();

    // type="email" inputs sanitize surrounding whitespace per the HTML spec, so
    // the value reaching signIn is already trimmed (AuthContext.signIn also trims).
    await user.type(screen.getByLabelText('Email'), '  me@test.com  ');
    await user.type(screen.getByLabelText('Password'), 'hunter2');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(signIn).toHaveBeenCalledWith('me@test.com', 'hunter2');
    await waitFor(() => expect(screen.getByText('PORTAL PAGE')).toBeInTheDocument());
  });

  it('shows a friendly message on invalid credentials', async () => {
    const signIn = vi.fn().mockResolvedValue({ error: { message: 'Invalid login credentials' } });
    renderLogin({ signIn });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'me@test.com');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText(/don’t match/)).toBeInTheDocument();
  });

  it('surfaces the raw error message for other failures', async () => {
    const signIn = vi.fn().mockResolvedValue({ error: { message: 'Network unreachable' } });
    renderLogin({ signIn });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'me@test.com');
    await user.type(screen.getByLabelText('Password'), 'pw');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Network unreachable')).toBeInTheDocument();
  });

  it('forgot-password with an empty email warns and does not call resetPassword', async () => {
    const resetPassword = vi.fn();
    renderLogin({ resetPassword });
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));

    expect(resetPassword).not.toHaveBeenCalled();
    expect(screen.getByText(/Enter your email above first/)).toBeInTheDocument();
  });

  it('forgot-password with an email calls resetPassword and shows the inbox notice', async () => {
    const resetPassword = vi.fn().mockResolvedValue({ error: null });
    renderLogin({ resetPassword });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'me@test.com');
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));

    expect(resetPassword).toHaveBeenCalledWith('me@test.com');
    expect(await screen.findByText(/sent a link to reset your password/)).toBeInTheDocument();
  });

  it('disables the submit button and shows progress text while signing in', async () => {
    // Keep signIn pending so the busy state is observable.
    let resolve;
    const signIn = vi.fn(() => new Promise((r) => { resolve = r; }));
    renderLogin({ signIn });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'me@test.com');
    await user.type(screen.getByLabelText('Password'), 'pw');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    const busyBtn = await screen.findByRole('button', { name: 'Signing in…' });
    expect(busyBtn).toBeDisabled();
    resolve({ error: null }); // let it settle so there's no act() warning
  });
});
