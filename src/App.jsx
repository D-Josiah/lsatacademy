import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import ChunkErrorBoundary from "./components/ChunkErrorBoundary";
import { AuthProvider } from "./lib/AuthContext";
import { lazyWithReload as lazy } from "./lib/lazyWithReload";

// Pages are code-split: each route is its own chunk, fetched on demand. This
// keeps the initial download to the shell + the landed page instead of shipping
// every article, the drill finder, the journal and the admin panel up front.
//
// lazyWithReload (not React's bare lazy) wraps each import() so a stale chunk
// after a deploy triggers one auto-reload instead of a white-screen 404 — see
// src/lib/lazyWithReload.js.
const Home = lazy(() => import('./pages/Home'));
// /about is retired (301 -> / in vercel.json). The route below redirects any
// client-side navigation too; the old page component is no longer imported.
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Services = lazy(() => import('./pages/Services'));
const Consultation = lazy(() => import('./pages/Consultation'));
const Resources = lazy(() => import('./pages/Resources'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const SufficientAssumption = lazy(() => import('./pages/SufficientAssumption'));
const IndicatorWords = lazy(() => import('./pages/IndicatorWords'));
const Abc = lazy(() => import('./pages/Abc'));
const Quizlet = lazy(() => import('./pages/Quizlet'));
const Patterns = lazy(() => import('./pages/Patterns'));
const Discord = lazy(() => import('./pages/Discord'));
const Library = lazy(() => import('./pages/Library'));
const GroupTutoring = lazy(() => import('./pages/GroupTutoring'));
const LSATAnswers = lazy(() => import('./pages/LSATAnswers'));
const ThankYouConsultation = lazy(() => import('./pages/ThankYouConsultation'));
const Faq = lazy(() => import('./pages/Faq'));
const LSATExplained = lazy(() => import('./pages/LSATExplained'));
const ThankYouDownload = lazy(() => import('./pages/ThankYouDownload'));
const Payment = lazy(() => import('./pages/Payment'));
const BookSession = lazy(() => import('./pages/BookSession'));
const RCTips = lazy(() => import('./pages/RCTips'));
const GettingStuck = lazy(() => import('./pages/GettingStuck'));
const Premises = lazy(() => import('./pages/Premises'));
const MBTQuestions = lazy(() => import('./pages/MBTQuestions'));
const DrillFinder = lazy(() => import('./pages/DrillFinder'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Portal = lazy(() => import('./pages/Portal'));
const Journal = lazy(() => import('./pages/Journal'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminStudent = lazy(() => import('./pages/AdminStudent'));

// Component to track page views
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Push virtual pageview to dataLayer on every route change
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtual_pageview",
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href
    });
  }, [location]);

  return null;
};

// The marketing header/footer are stripped on the authed portal so it reads as
// a clean standalone dashboard. Add prefixes here to bare other app pages too
// (e.g. '/admin'). These run inside <Router>, so they can read the location.
const BARE_PREFIXES = ['/portal', '/admin', '/update-password'];
const isBarePath = (pathname) =>
  BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

const SiteHeader = () => (isBarePath(useLocation().pathname) ? null : <Header />);
const SiteFooter = () => (isBarePath(useLocation().pathname) ? null : <Footer />);

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <PageViewTracker />
      <SiteHeader />
      <ScrollToTop />
      <ChunkErrorBoundary>
      <Suspense fallback={<div style={{ minHeight: '60vh' }} aria-busy="true" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/services" element={<Services />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/sufficient-assumption" element={<SufficientAssumption />} />
        <Route path="/indicator-words" element={<IndicatorWords />} />
        <Route path="/abc" element={<Abc/>} />
        <Route path="/lsat-quizlet" element={<Quizlet/>} />
        <Route path="/patterns" element={<Patterns/>} />
        <Route path="/discord" element={<Discord/>} />
        <Route path="/group-tutoring" element={<GroupTutoring/>} />
        <Route path="/lsat-answers" element={<LSATAnswers/>} />
        <Route path="/library" element={<Library/>} />
        <Route path="/lsat-explained" element={<LSATExplained/>} />
        <Route path="/thank-you-consultation" element={<ThankYouConsultation/>} />
        <Route path="/thank-you-download" element={<ThankYouDownload/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/book-session" element={<BookSession/>} />
        <Route path="/rc-tips" element={<RCTips/>} />
        <Route path="/getting-stuck" element={<GettingStuck/>} />
        <Route path="/premises" element={<Premises/>} />
        <Route path="/mbt-questions" element={<MBTQuestions/>} />
        <Route path="/drill-finder" element={<DrillFinder/>} />

        {/* Student portal + admin (auth-gated, noindex) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route
          path="/portal"
          element={<ProtectedRoute studentOnly><Portal /></ProtectedRoute>}
        />
        <Route
          path="/portal/journal"
          element={<ProtectedRoute studentOnly><Journal /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>}
        />
        <Route
          path="/admin/students/:id"
          element={<ProtectedRoute requireAdmin><AdminStudent /></ProtectedRoute>}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </ChunkErrorBoundary>
      <SiteFooter />
      </AuthProvider>
    </Router>
  );
};

export default App;
