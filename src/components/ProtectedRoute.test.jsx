import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// ProtectedRoute branches entirely on useAuth() — mock it so each test drives a
// specific auth state, then assert which route the guard lands on.
vi.mock('../lib/AuthContext', () => ({ useAuth: vi.fn() }));
import { useAuth } from '../lib/AuthContext';

const student = { role: 'student' };
const admin = { role: 'admin' };

// Render the guard at `entry`, with stub destinations so a redirect is observable.
function renderGuard(authState, props = {}, entry = '/protected') {
  useAuth.mockReturnValue(authState);
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute {...props}>
              <div>PROTECTED CHILD</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>LOGIN PAGE</div>} />
        <Route path="/portal" element={<div>PORTAL PAGE</div>} />
        <Route path="/admin" element={<div>ADMIN PAGE</div>} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => useAuth.mockReset());

describe('ProtectedRoute', () => {
  it('shows the loading placeholder, not the child, while auth is loading', () => {
    renderGuard({ session: null, profile: null, loading: true, isAdmin: false });
    expect(screen.getByText('Loading…')).toBeInTheDocument();
    expect(screen.queryByText('PROTECTED CHILD')).not.toBeInTheDocument();
  });

  it('redirects to /login when there is no session', () => {
    renderGuard({ session: null, profile: null, loading: false, isAdmin: false });
    expect(screen.getByText('LOGIN PAGE')).toBeInTheDocument();
  });

  it('shows a loading message (not a blank) while the profile is still being fetched', () => {
    renderGuard(
      { session: { user: {} }, profile: null, profileError: null, loading: false, isAdmin: false },
      { studentOnly: true }
    );
    expect(screen.getByText('Loading your account…')).toBeInTheDocument();
    expect(screen.queryByText('PROTECTED CHILD')).not.toBeInTheDocument();
  });

  it('shows an error with a retry button when the profile fails to load', async () => {
    const refreshProfile = vi.fn();
    renderGuard(
      {
        session: { user: {} },
        profile: null,
        profileError: 'Could not load your account.',
        refreshProfile,
        loading: false,
        isAdmin: false,
      },
      { studentOnly: true }
    );
    expect(screen.getByText(/couldn’t load your account/i)).toBeInTheDocument();
    expect(screen.getByText('Could not load your account.')).toBeInTheDocument();

    const { default: userEvent } = await import('@testing-library/user-event');
    await userEvent.setup().click(screen.getByRole('button', { name: 'Try again' }));
    expect(refreshProfile).toHaveBeenCalled();
  });

  it('bounces a non-admin away from an admin-only route to /portal', () => {
    renderGuard(
      { session: { user: {} }, profile: student, loading: false, isAdmin: false },
      { requireAdmin: true }
    );
    expect(screen.getByText('PORTAL PAGE')).toBeInTheDocument();
  });

  it('bounces an admin away from a student-only route to /admin', () => {
    renderGuard(
      { session: { user: {} }, profile: admin, loading: false, isAdmin: true },
      { studentOnly: true }
    );
    expect(screen.getByText('ADMIN PAGE')).toBeInTheDocument();
  });

  it('renders the child for a student on a student-only route', () => {
    renderGuard(
      { session: { user: {} }, profile: student, loading: false, isAdmin: false },
      { studentOnly: true }
    );
    expect(screen.getByText('PROTECTED CHILD')).toBeInTheDocument();
  });

  it('renders the child for an admin on an admin-only route', () => {
    renderGuard(
      { session: { user: {} }, profile: admin, loading: false, isAdmin: true },
      { requireAdmin: true }
    );
    expect(screen.getByText('PROTECTED CHILD')).toBeInTheDocument();
  });
});
