import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="navbar bg-black/60 text-neutral-content px-6 py-4 fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <div className="flex-1">
          <a className="text-xl align-middle font-bold flex gap-4 h-10 items-center" href="/"> <img src="./honorbo logo.png" alt="HonorBox Logo" className="h-16" />HonorBox</a>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <ul className="menu menu-horizontal gap-4">
            <li><a className="text-white text-lg" href="/">Home</a></li>
            <li>
              {user ? (
                <Link to="/generate" className="text-white text-lg">
                  Generate Certificate
                </Link>
              ) : (
                <button
                  className="text-white text-lg"
                  onClick={() => alert("Please log in to generate certificates.")}
                >
                  Generate Certificate
                </button>
              )}
            </li>
            <li><Link to="/verify" className="text-white text-lg">Verify Certificate</Link></li>
            {user ? (
              <>
                <li><Link className="text-white text-lg" >{user?.name}</Link></li>
                <li>
                  <button className="text-lg btn btn-error px-10" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  className="text-lg btn btn-primary px-10 " 
                  onClick={() => setIsModalOpen(true)}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-xl">
            ☰
          </label>
          <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
            <li><a href="/" className="justify-center my-2">Home</a></li>
            <li>
              {user ? (
                <Link to="/generate" className="justify-center my-2">
                  Generate Certificate
                </Link>
              ) : (
                <button
                  className="justify-center my-2"
                  onClick={() => alert("Please log in to generate certificates.")}
                >
                  Generate Certificate
                </button>
              )}
            </li>
            <li><Link to="/verify" className="justify-center my-2">Verify Certificate</Link></li>
            {user ? (
              <>
                <li><Link className="justify-center my-2">{user.name}</Link></li>
                <li>
                  <button className="btn btn-error btn-md" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <a className="justify-center my-2 btn btn-primary" onClick={() => setIsModalOpen(true)}>Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4">
    <div className="bg-white p-6 md:p-8 flex justify-center flex-col rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-amber-500 text-center">Login</h2>
      <div className="flex justify-center">
        <GoogleLogin onSuccess={handleLoginSuccess} onFailure={(err) => console.log(err)} />
      </div>
      <div className="flex justify-center mt-6">
        <button className="btn btn-primary w-full sm:w-auto" onClick={() => setIsModalOpen(false)}>Close</button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
