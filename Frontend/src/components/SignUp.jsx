import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import DarkVeil from "./DarkVeil";
import Footer from "./Footer";
import "./custom.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Account created successfully! Redirecting...");
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      } else {
        toast.error(data.message || "Failed to create account");
        setError(data.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Network error. Please try again.");
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveUserToDB = async (userData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      setError("");

      const decoded = jwtDecode(response.credential);

      // Save user to database
      const userData = await saveUserToDB({
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
      });

      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.user.id,
          name: userData.user.name,
          email: userData.user.email,
        })
      );

      toast.success("Account created successfully with Google! Redirecting...");
      setSuccess("Account created successfully with Google! Redirecting...");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Failed to create account with Google. Please try again.");
      setError("Failed to create account with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed. Please try again.");
    setError("Google signup failed. Please try again.");
  };

  return (
    <div
      style={{ width: "100%", minHeight: "100vh", position: "relative", overflow: "visible" }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <div
        style={{ position: "relative", zIndex: 1 }}
        className="flex flex-col items-center justify-center min-h-screen py-12 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl bg-[rgba(255,255,255,0.10)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] shadow-2xl p-8">
            <h1 className="text-3xl font-extrabold text-center mb-8 text-white drop-shadow-lg tracking-tight">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/80 text-gray-900 font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/80 text-gray-900 font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/80 text-gray-900 font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/80 text-gray-900 font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Error / Success Messages */}
              {error && (
                <p className="mt-3 text-center text-red-500 font-semibold bg-white/20 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              {success && (
                <p className="mt-3 text-center text-green-400 font-semibold bg-white/20 px-3 py-2 rounded-lg">
                  {success}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-lg font-extrabold shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-white/60 text-sm">or</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Google Login */}
            <div className="mt-6 w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_blue"
                text="signup_with"
                shape="rectangular"
                size="large"
                width="100%"
                disabled={loading}
              />
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-white/80">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
