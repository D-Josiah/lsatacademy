import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


const App = () => {
  return (
    <Router>
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
        <Route path="/sufficient_assumption" element={<SufficientAssumption />} />
        <Route path="/indicator_words" element={<IndicatorWords />} />
        <Route path="/abc" element={<Abc/>} />
        <Route path="/lsat-quizlet" element={<Quizlet/>} />
        <Route path="/patterns" element={<Patterns/>} />
        <Route path="/discord" element={<Discord/>} />
        <Route path="/group-tutoring" element={<GroupTutoring/>} />
        <Route path="/lsat-answers" element={<LSATAnswers/>} />
        <Route path="/library" element={<Library/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
