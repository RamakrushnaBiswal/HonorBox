import { Link } from "react-router-dom";
const Home = () => {
  const user = localStorage.getItem("user");

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 lg:px-10 mb-20">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold">HonorBox</h1>
            <p className="py-6 text-base sm:text-lg">
              A free & open-source web app for generating and verifying certificates instantly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link to="/generate" className="btn btn-primary w-full sm:w-auto">
                  Generate Certificate
                </Link>
              ) : (
                <button
                  className="btn btn-primary w-full sm:w-auto text-lg p-6 shadow-md"
                  onClick={() => alert("Please log in to generate certificates.")}
                >
                  Generate Certificate
                </button>
              )}
              <Link to="/verify" className="btn btn-secondary w-full sm:w-auto text-lg p-6 shadow-md">
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-100 py-12 px-4 sm:px-6 lg:px-10 relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-full left-0 w-full">
        <path fill="#1D232A" fill-opacity="1" d="M0,160L48,160C96,160,192,160,288,144C384,128,480,96,576,90.7C672,85,768,107,864,133.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-12 relative z-10">
          Why Choose HonorBox?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          <div className="card shadow-lg p-6 bg-slate-800 rounded-lg text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4">🔏 Secure Verification</h3>
            <p className="text-gray-300 text-sm md:text-base text-center">
              Easily verify certificates with a unique verification code.
            </p>
          </div>
          <div className="card shadow-lg p-6 bg-slate-800 rounded-lg text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4">🎨 Customizable</h3>
            <p className="text-gray-300 text-sm md:text-base">
              Generate beautifully designed certificates for any event.
            </p>
          </div>
          <div className="card shadow-lg p-6 bg-slate-800 rounded-lg text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4">📜 Open Source</h3>
            <p className="text-gray-300 text-sm md:text-base">
              Free to use and customize as per your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-base-200 text-neutral-content py-8 px-4 sm:px-6 lg:px-10">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <img src="./honorbo logo.png" alt="HonorBox Logo" className="w-8 h-8" />
                <h3 className="text-xl font-bold">HonorBox</h3>
              </div>
              <p className="text-sm text-gray-300">
                Free & open-source certificate generation and verification platform.
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/generate" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Generate Certificate
                </Link>
                <Link to="/verify" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Verify Certificate
                </Link>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a 
                  href="https://github.com/RamakrushnaBiswal/HonorBox" 
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
                <a 
                  href="https://github.com/RamakrushnaBiswal/HonorBox/issues" 
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Report Issues
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-6 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-300">
                © 2025 HonorBox. Made with ❤️ by{" "}
                <a 
                  href="https://github.com/RamakrushnaBiswal" 
                  className="text-primary hover:text-primary-focus transition-colors font-medium"
                >
                  Ram
                </a>
              </p>
              <p className="text-sm text-gray-300">
                Open Source • MIT License
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;