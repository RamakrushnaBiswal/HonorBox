import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Generate from "./components/Generate";
import Certificate from "./components/Certificate";
import Navbar from "./components/Navbar";
import Verify from "./components/Verify";
import NotFound from "./components/NotFound";
import DarkVeil from "./components/DarkVeil";
import About from './components/About';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import BackToTop from "./components/BackToTop";


function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Router>
          <Navbar />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "rgba(40,40,60,0.98)",
                color: "#fff",
                borderRadius: "1rem",
                fontWeight: "bold",
                fontFamily: "Inter, Poppins, sans-serif",
                boxShadow: "0 4px 32px 0 rgba(80,80,180,0.10)",
              },
              success: {
                iconTheme: {
                  primary: "#4ade80",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#f87171",
                  secondary: "#fff",
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/certificates" element={<Certificate />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTop />
        </Router>
      </div>
    </div>
  );
}

export default App;
