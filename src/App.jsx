import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Services from './pages/Services';
import Resources from './pages/Resources';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SufficientAssumption from './pages/SufficientAssumption';
import IndicatorWords from './pages/IndicatorWords';
import ScrollToTop from "./components/ScrollToTop";
import Abc from "./pages/Abc";
import Quizlet from "./pages/Quizlet";


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
        <Route path="/resources" element={<Resources />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/sufficient_assumption" element={<SufficientAssumption />} />
        <Route path="/indicator_words" element={<IndicatorWords />} />
        <Route path="/abc" element={<Abc/>} />
        <Route path="/lsat-quizlet" element={<Quizlet/>} />
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
