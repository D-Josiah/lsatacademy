import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Blogs from './pages/Blogs';
import Services from './pages/Services';
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
  return (
    <Router>
      <Header/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
