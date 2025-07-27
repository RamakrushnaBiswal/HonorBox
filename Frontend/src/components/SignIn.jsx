import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import DarkVeil from "./DarkVeil";
import Footer from "./Footer";
import "./custom.css";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${BACKEND_URL}/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setSuccess("Signed in successfully! Redirecting...");
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 1500);
            } else {
                setError(data.message || "Failed to sign in");
            }
        } catch (error) {
            console.error("Signin error:", error);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google OAuth handler
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
            console.log(data);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleGoogleLoginSuccess = (response) => {
        const decoded = jwtDecode(response.credential);
        localStorage.setItem("user", JSON.stringify(decoded));
        saveUserToDB({ name: decoded.name, email: decoded.email, googleId: decoded.sub });
        setSuccess("Signed in with Google successfully! Redirecting...");
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 1500);
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'visible' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <DarkVeil />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }} className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="rounded-2xl bg-[rgba(255,255,255,0.10)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] shadow-2xl p-8">
                        <h1 className="text-3xl font-extrabold text-center mb-8 text-white drop-shadow-lg tracking-tight">
                            Welcome Back
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            {/* Error Message */}
                            {error && (
                                <p className="text-red-400 text-center font-semibold text-sm">{error}</p>
                            )}

                            {/* Success Message */}
                            {success && (
                                <p className="text-green-400 text-center font-semibold text-sm">{success}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-lg font-extrabold shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-6 flex items-center">
                            <div className="flex-1 border-t border-white/20"></div>
                            <span className="px-4 text-white/60 text-sm">or</span>
                            <div className="flex-1 border-t border-white/20"></div>
                        </div>

                        {/* Google Sign In */}
                        <div className="mt-6 flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onFailure={(err) => console.log("Google login failed:", err)}
                                theme="filled_blue"
                                size="large"
                                width={300}
                            />
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-white/80">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    Sign Up
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

export default SignIn;
