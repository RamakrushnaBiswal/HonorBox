import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
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
    localStorage.setItem("user", JSON.stringify(decoded)); // Store user in localStorage
    setIsModalOpen(false);
    saveUserToDB({ name: decoded.name, email: decoded.email, googleId: decoded.sub });
    navigate("/");
    window.location.reload();
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <a 
                href="/" 
                className="flex items-center space-x-3 text-xl font-bold text-neutral-900 hover:text-primary-600 transition-colors duration-200"
              >
                <img 
                  src="./honorbo logo.png" 
                  alt="HonorBox Logo" 
                  className="w-8 h-8 object-contain" 
                />
                <span className="text-gradient">HonorBox</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <a href="/" className="nav-link text-neutral-700">
                  Home
                </a>
                <a href="/generate" className="nav-link text-neutral-700">
                  Generate
                </a>
                <a href="/verify" className="nav-link text-neutral-700">
                  Verify
                </a>
              </nav>

              {/* Auth Section */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-neutral-700 max-w-32 truncate">
                        {user.name}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-lg shadow-sm btn-hover-scale focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <div className="dropdown dropdown-end">
                <label 
                  tabIndex={0} 
                  className="btn btn-ghost btn-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>
                <ul 
                  tabIndex={0} 
                  className="menu dropdown-content mt-3 p-2 shadow-lg bg-white rounded-xl w-52 border border-neutral-200"
                >
                  <li><a href="/" className="rounded-lg hover:bg-primary-50 hover:text-primary-600">Home</a></li>
                  <li><a href="/generate" className="rounded-lg hover:bg-primary-50 hover:text-primary-600">Generate</a></li>
                  <li><a href="/verify" className="rounded-lg hover:bg-primary-50 hover:text-primary-600">Verify</a></li>
                  <li className="border-t border-neutral-200 mt-2 pt-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-sm text-neutral-600 font-medium">
                          {user.name}
                        </div>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full text-left px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        Login
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-soft-lg w-full max-w-md border border-neutral-200 animate-slide-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Welcome Back</h2>
              <p className="text-neutral-600 text-sm">Sign in to continue to HonorBox</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <GoogleLogin 
                onSuccess={handleLoginSuccess} 
                onFailure={(err) => console.log(err)} 
                size="large"
                theme="outline"
                shape="rectangular"
              />
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
