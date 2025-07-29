import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Generate from "./components/Generate";
import Navbar from "./components/Navbar";
import Verify from "./components/Verify";
import NotFound from "./components/NotFound";
import DarkVeil from "./components/DarkVeil";
import About from './components/About';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
