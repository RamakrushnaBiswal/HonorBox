import { Link } from "react-router-dom";

const Home = () => {
  const user = localStorage.getItem("user");

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary-200/40 to-accent-200/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6">
              <span className="text-gradient">Honor</span>Box
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
              A free & open-source web application for 
              <span className="font-semibold text-primary-600"> generating</span> and 
              <span className="font-semibold text-secondary-600"> verifying</span> certificates instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link 
                to="/generate" 
                className="group px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl shadow-lg btn-hover-scale focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Generate Certificate</span>
                </span>
              </Link>
            ) : (
              <button
                onClick={() => alert("Please log in to generate certificates.")}
                className="group px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl shadow-lg btn-hover-scale focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Generate Certificate</span>
                </span>
              </button>
            )}
            <Link 
              to="/verify" 
              className="group px-8 py-4 text-lg font-semibold text-primary-700 bg-white hover:bg-primary-50 border-2 border-primary-200 hover:border-primary-300 rounded-xl shadow-lg btn-hover-scale focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Verify Certificate</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
              Why Choose <span className="text-gradient">HonorBox</span>?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of digital certificate management with our powerful, secure, and user-friendly platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-soft border border-primary-100 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Secure Verification</h3>
              <p className="text-neutral-600 leading-relaxed">
                Advanced cryptographic protection ensures your certificates are tamper-proof and instantly verifiable with unique verification codes.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-white to-secondary-50 rounded-2xl shadow-soft border border-secondary-100 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Fully Customizable</h3>
              <p className="text-neutral-600 leading-relaxed">
                Create stunning, professional certificates with custom templates, branding, and design elements tailored to your needs.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-white to-accent-50 rounded-2xl shadow-soft border border-accent-100 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Open Source</h3>
              <p className="text-neutral-600 leading-relaxed">
                Built with transparency in mind. Free to use, modify, and contribute to. Join our community of developers and users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-xl font-medium opacity-90">Free & Open Source</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold mb-2">∞</div>
              <div className="text-xl font-medium opacity-90">Unlimited Certificates</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl font-medium opacity-90">Always Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img 
                src="./honorbo logo.png" 
                alt="HonorBox Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-2xl font-bold text-gradient">HonorBox</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Empowering digital certificate generation and verification
            </p>
            <p className="text-sm text-neutral-500">
              © 2025 HonorBox. Made with ❤️ by Ram. Open source and free for everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;