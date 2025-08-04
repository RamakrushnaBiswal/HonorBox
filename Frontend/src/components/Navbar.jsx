import { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "./custom.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] =
    useState(false);

  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) verifyToken(token);
  }, []);

  const verifyToken = async (token) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (e) {
      console.error("Token verification failed", e);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const saveUserToDB = async (data) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error("Save user failed:", e);
    }
  };

  const handleLoginSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    saveUserToDB({
      name: decoded.name,
      email: decoded.email,
      googleId: decoded.sub,
    });
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

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      name: displayName,
      bio,
      profilePic,
      signature,
      accentColor,
      certificateTitle,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setShowCustomizeModal(false);
    toast.success("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      setSuccessMessage("Please fill both current and new password.");
      return;
    }
    setShowConfirmPasswordModal(true);
  };
  const confirmChangePassword = async () => {
    try {
      // call your backend API to change password here if you want
      console.log("Password updated:", { currentPassword, newPassword });
      toast.success("Password updated successfully!");
      setShowManageModal(false);
      setShowConfirmPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error("Failed to update password.");
    }
  };

  const handleDeleteAccount = () => {
    console.log("Delete account confirmed");
    setShowDeleteConfirm(false);
    setShowManageModal(false);
  };
  const [signature, setSignature] = useState(user?.signature || "");
  const [accentColor, setAccentColor] = useState(
    user?.accentColor || "#2563eb"
  ); // default violet
  const [certificateTitle, setCertificateTitle] = useState(
    user?.certificateTitle || ""
  );
  const [loginActivity, setLoginActivity] = useState([
    { device: "Chrome", location: "Mumbai, India", date: "2025-08-04" },
    { device: "Firefox", location: "Delhi, India", date: "2025-08-03" },
  ]);

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSignature(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const [isEmailChanged, setIsEmailChanged] = useState(false);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="w-full flex justify-center items-center mt-6 px-2"
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="relative z-[9000] w-full max-w-4xl flex items-center justify-between px-6 py-2 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] shadow-[0_4px_32px_0_rgba(80,80,180,0.10)] rounded-full"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <a
            href="/"
            className="flex items-center gap-2 text-white text-xl font-semibold"
          >
            <img
              src="/honorbo logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-bold tracking-tight">HonorBox</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-white font-semibold text-base px-2 py-1 transition-transform hover:scale-105 hover:underline underline-offset-8"
            >
              Home
            </a>
            {user ? (
              <div className="relative z-50">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center uppercase overflow-hidden"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="avatar"
                      className="w-8 h-8 object-cover"
                    />
                  ) : (
                    user.name?.charAt(0)
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[rgba(30,30,40,0.98)] backdrop-blur-md text-white rounded-md shadow-xl z-[9999]">
                    <button
                      onClick={() => {
                        setShowCustomizeModal(true);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
                    >
                      Customize Profile
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setShowManageModal(true);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
                    >
                      Manage Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-white/10 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-base px-4 py-2 rounded-lg transition hover:scale-105 hover:shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-white text-2xl p-2 rounded hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex flex-col items-end md:hidden">
          <div className="w-2/3 max-w-xs bg-[rgba(30,30,40,0.98)] backdrop-blur-md h-full p-8 flex flex-col gap-6 shadow-2xl">
            <button
              className="self-end text-white text-2xl mb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
            <a
              href="/"
              className="text-white font-semibold text-lg py-2 px-2 rounded hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            {user ? (
              <>
                {/* Mobile: Show avatar and menu directly */}
                {/* Mobile: Avatar and actions stacked */}
                <div className="md:hidden px-4 py-3 border-t border-white/10">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center uppercase overflow-hidden">
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt="avatar"
                          className="w-10 h-10 object-cover"
                        />
                      ) : (
                        user.name?.charAt(0)
                      )}
                    </div>
                    <span className="text-white font-semibold">
                      {user.name}
                    </span>
                  </div>

                  {/* Inline Profile Options */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setShowCustomizeModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-white text-sm hover:bg-white/10 rounded"
                    >
                      Customize Profile
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setShowManageModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-white text-sm hover:bg-white/10 rounded"
                    >
                      Manage Account
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-red-400 text-sm hover:bg-white/10 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/signin"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-lg py-3 px-2 rounded hover:scale-105 w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Customize Profile Modal */}
      {showCustomizeModal && (
        <Modal
          title="🎨 Customize Profile"
          onClose={() => setShowCustomizeModal(false)}
          footer={
            <button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm px-3 py-1.5 rounded hover:scale-105 transition"
            >
              Save Changes
            </button>
          }
          size="lg"
        >
          <p className="text-gray-400 text-xs mb-3">
            Update your profile picture & display name shown on certificates you
            generate.
          </p>

          <div className="flex flex-col items-center gap-2 mb-3">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-violet-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center text-3xl font-bold uppercase">
                {user.name?.charAt(0)}
              </div>
            )}
            <div className="flex items-center gap-3">
              <label
                htmlFor="upload-photo"
                className="cursor-pointer text-xs flex items-center gap-1 text-violet-400 hover:text-violet-300 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-4.553a1.5 1.5 0 00-2.121-2.121L13 7.879l-4.553-4.553a1.5 1.5 0 00-2.121 2.121L10.879 10l-4.553 4.553a1.5 1.5 0 002.121 2.121L13 12.121l4.553 4.553a1.5 1.5 0 002.121-2.121L15.121 10z"
                  />
                </svg>
                Change Photo
              </label>
              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />

              {profilePic && (
                <button
                  type="button"
                  onClick={() => {
                    setProfilePic("");
                    toast.info("Profile photo removed.");
                  }}
                  className="text-red-400 hover:text-red-300 text-xs transition"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>

          <label className="block text-xs text-gray-400 mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black/20 border border-gray-600 text-white text-sm focus:border-violet-500 transition"
          />

          <label className="block text-xs text-gray-400 mt-2 mb-1">
            Short Bio (optional)
          </label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black/20 border border-gray-600 text-white text-sm focus:border-violet-500 transition"
          />
          {/* Signature Upload */}
          <label className="block text-xs text-gray-400 mt-2 mb-1">
            Signature (PNG)-Optional
          </label>
          <div className="flex items-center gap-2 mb-3">
            {signature ? (
              <img
                src={signature}
                alt="Signature"
                className="h-12 object-contain border border-violet-500 rounded"
              />
            ) : (
              <span className="text-gray-500 text-xs">
                No signature uploaded
              </span>
            )}

            <label className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs px-3 py-1.5 rounded cursor-pointer hover:scale-105 transition">
              🖊 Upload Signature
              <input
                type="file"
                accept="image/png"
                onChange={handleSignatureUpload}
                className="hidden"
              />
            </label>

            {signature && (
              <button
                type="button"
                onClick={() => {
                  setSignature("");
                  toast.info("Signature removed.");
                }}
                className="text-red-400 hover:text-red-300 text-xs transition"
              >
                Remove Signature
              </button>
            )}
          </div>

          {/* Accent Color */}
          <label className="block text-xs text-gray-400 mt-2 mb-1">
            Accent Color(optional)
          </label>
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="w-16 h-8 border border-gray-600 rounded"
          />

          {/* Certificate Title */}
          <label className="block text-xs text-gray-400 mt-2 mb-1">
            Certificate Title (e.g., Founder, Trainer)- Optional
          </label>
          <input
            type="text"
            value={certificateTitle}
            onChange={(e) => setCertificateTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black/20 border border-gray-600 text-white text-sm focus:border-violet-500 transition"
          />
          <div className="bg-black/30 border border-violet-500 rounded p-2 mt-2 text-xs text-gray-300">
            <p>Default Preview:</p>
            <p className="font-bold">
              {displayName} ({certificateTitle})
            </p>
            <div className="flex items-center gap-1">
              {signature && <img src={signature} alt="sig" className="h-4" />}
              <span style={{ color: accentColor }}>Accent color preview</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Manage Account Modal */}
      {showManageModal && (
        <Modal
          title="🔒 Manage Account"
          onClose={() => {
            setCurrentPassword("");
            setNewPassword("");
            setShowManageModal(false);
          }}
          footer={
            <div className="flex flex-wrap justify-end gap-2 mt-3">
              <button
                onClick={handleChangePassword}
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm px-3 py-1.5 rounded hover:scale-105 transition"
              >
                Update Password
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="border border-red-500 text-red-500 text-sm px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition"
              >
                Delete Account
              </button>
            </div>
          }
        >
          <p className="text-gray-400 text-xs mb-4">
            Manage your login email & password used to access certificate
            generation and verification.
          </p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailChanged(e.target.value !== user?.email);
                }}
                className="w-full px-3 py-2 rounded bg-black/20 border border-gray-600 text-white text-sm focus:border-green-500 transition"
              />
            </div>
            {isEmailChanged && (
              <button className="bg-green-600 text-white text-xs px-3 py-1.5 rounded hover:bg-green-700 transition mt-5">
                Verify
              </button>
            )}
          </div>

          <p className="text-gray-400 text-xs mt-4 mb-1">Change Password</p>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black/20 border border-gray-600 text-white text-sm focus:border-violet-500 transition mt-1"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black/20 border border-gray-600 text-white text-sm focus:border-violet-500 transition mt-3"
          />
          {/* Download Data */}
        </Modal>
      )}

      {/* Delete Confirm Modal (no Close button) */}
      {showDeleteConfirm && (
        <Modal
          title="⚠ Confirm Delete Account"
          hideClose
          footer={
            <>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:scale-105 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-4 py-2 rounded hover:scale-105 transition"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-gray-300 text-sm">
            Deleting your account will permanently remove your profile and all
            certificates generated under your email. This action cannot be
            undone.
          </p>
        </Modal>
      )}
      {showConfirmPasswordModal && (
        <Modal
          title="Confirm Password Change"
          onClose={() => setShowConfirmPasswordModal(false)}
          footer={
            <>
              <button
                onClick={() => setShowConfirmPasswordModal(false)}
                className="bg-gray-600 text-white px-3 py-1.5 rounded hover:scale-105 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmChangePassword}
                className="bg-green-600 text-white px-3 py-1.5 rounded hover:scale-105 transition"
              >
                Confirm
              </button>
            </>
          }
        >
          <p className="text-gray-300 text-sm">
            Are you sure you want to update your password?
          </p>
        </Modal>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

// Reusable Modal component
// Reusable Modal component
const Modal = ({
  title,
  children,
  onClose,
  footer,
  hideClose = false,
  size,
}) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`bg-[rgba(30,30,40,0.98)] border border-[rgba(180,120,255,0.18)] rounded-xl p-6 w-full ${
        size === "lg" ? "max-w-xl" : "max-w-md"
      } shadow-[0_4px_32px_0_rgba(80,80,180,0.25)]`}
    >
      <div className="relative mb-4">
        {!hideClose && (
          <button
            onClick={onClose}
            className="absolute -top-3 right-0 text-gray-400 hover:text-white transition text-2xl"
          >
            &times;
          </button>
        )}
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {/* Make content scrollable if it overflows */}
      <div className="flex-1 overflow-auto max-h-[53vh] mb-4 space-y-2 pr-1">
        {children}
      </div>
      <div className="flex justify-end flex-wrap gap-2 mt-2">{footer}</div>
    </motion.div>
  </div>
);

export default Navbar;
