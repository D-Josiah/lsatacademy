import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Services from './pages/Services';
import Consultation from './pages/Consultation';
import Resources from './pages/Resources';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SufficientAssumption from './pages/SufficientAssumption';
import IndicatorWords from './pages/IndicatorWords';
import ScrollToTop from "./components/ScrollToTop";
import Abc from "./pages/Abc";
import Quizlet from "./pages/Quizlet";
import Patterns from "./pages/Patterns";
import Discord from "./pages/Discord";
import Library from "./pages/Library";
import GroupTutoring from "./pages/GroupTutoring";
import LSATAnswers from "./pages/LSATAnswers";
import ThankYouConsultation from "./pages/ThankYouConsultation";
import LSATExplained from './pages/LSATExplained';
import ThankYouDownload from "./pages/ThankYouDownload";
import Payment from "./pages/Payment";
import RCTips from "./pages/RCTips";
import GettingStuck from "./pages/GettingStuck";
import Premises from "./pages/Premises";
import MBTQuestions from "./pages/MBTQuestions";
import NotFound from "./pages/NotFound";

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

const App = () => {
  return (
    <Router>
      <PageViewTracker />
      <Header/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/services" element={<Services />} />
        <Route path="/consultation" element={<Consultation />} />
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
        <Route path="/rc-tips" element={<RCTips/>} />
        <Route path="/getting-stuck" element={<GettingStuck/>} />
        <Route path="/premises" element={<Premises/>} />
        <Route path="/mbt-questions" element={<MBTQuestions/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;