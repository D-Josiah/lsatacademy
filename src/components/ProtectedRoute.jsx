import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

// Route guard. Wrap protected elements:
//   <ProtectedRoute studentOnly><Portal /></ProtectedRoute>
//   <ProtectedRoute requireAdmin><Admin /></ProtectedRoute>
//
// - No session   -> bounce to /login (remembering where they were headed).
// - requireAdmin but not admin -> bounce to /portal.
// - studentOnly but admin       -> bounce to /admin (admins oversee students;
//   they have no journal or remaining meetings of their own).
const center = (children) => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      color: 'var(--ink-500)',
      fontFamily: 'var(--font-sans)',
      textAlign: 'center',
      padding: '0 24px',
    }}
  >
    {children}
  </div>
);

const ProtectedRoute = ({ children, requireAdmin = false, studentOnly = false }) => {
  const { session, profile, loading, profileError, isAdmin, refreshProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return center('Loading…');
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Session exists but the profile row isn't loaded. Distinguish the two cases
  // instead of rendering a silent blank between the header and footer:
  if ((requireAdmin || studentOnly) && !profile) {
    if (profileError) {
      // The fetch finished but failed — show it and let them retry.
      return center(
        <>
          <div style={{ fontSize: 16, color: 'var(--navy-900)', fontWeight: 600 }}>
            We couldn’t load your account.
          </div>
          <div style={{ fontSize: 13.5, maxWidth: 420 }}>{profileError}</div>
          <button type="button" className="btn btn-primary" onClick={refreshProfile}>
            Try again
          </button>
        </>
      );
    }
    // Still fetching the profile row — show a real loading state, not a blank.
    return center('Loading your account…');
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/portal" replace />;
  }

  if (studentOnly && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
