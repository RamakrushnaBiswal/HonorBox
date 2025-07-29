import { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "./custom.css";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Check for JWT token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      // Verify JWT token
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const saveUserToDB = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    setIsModalOpen(false);
    saveUserToDB({ name: decoded.name, email: decoded.email, googleId: decoded.sub });
    navigate("/");
    window.location.reload();
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <motion.nav
        className="w-full flex justify-center items-center mt-6 px-2"
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-4xl flex items-center justify-between px-6 py-2 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] shadow-[0_4px_32px_0_rgba(80,80,180,0.10)] rounded-full"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ fontFamily: 'Inter, Poppins, sans-serif' }}
        >
          <a href="/" className="flex items-center gap-2 text-white text-xl font-semibold select-none">
            <img src="/honorbo logo.png" alt="logo" className="w-10 h-10 object-contain rounded-full bg-transparent" style={{ background: 'none' }} />
            <span className="font-bold tracking-tight">HonorBox</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-white font-semibold text-base px-2 py-1 transition-transform duration-150 hover:scale-105 hover:underline underline-offset-8"
            >
              Home
            </a>
            {user ? (
              <>
                <span className="text-white mx-2 font-semibold hidden sm:inline">{user.name}</span>
                <button className="btn btn-error btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link
                to="/signin"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-base px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-white text-2xl p-2 rounded hover:bg-white/10 focus:outline-none"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex flex-col items-end md:hidden">
          <div className="w-2/3 max-w-xs bg-[rgba(30,30,40,0.98)] backdrop-blur-md h-full p-8 flex flex-col gap-6 shadow-2xl">
            <button
              className="self-end text-white text-2xl mb-4"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
            <a
              href="/"
              className="text-white font-semibold text-lg py-2 px-2 rounded transition hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            {user ? (
              <>
                <span className="text-white font-semibold py-2 px-2 rounded">{user.name}</span>
                <button className="btn btn-error btn-sm w-full" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>Logout</button>
              </>
            ) : (
              <Link
                to="/signin"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-lg py-3 px-2 rounded transition hover:scale-105 w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
