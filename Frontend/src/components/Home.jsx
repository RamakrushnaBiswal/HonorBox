import { Link } from "react-router-dom";
import { FaFileAlt, FaCertificate, FaShieldAlt, FaMagic, FaGithub, FaEnvelope, FaUsers, FaSync, FaTachometerAlt } from "react-icons/fa";
import {useEffect } from "react";
import { motion } from "framer-motion";
import "./custom.css";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import FeatureCard from "./FeatureCard";

// Import Amerika Sans font
import amerikaFont from "../assets/fonts/AMERSN__.ttf";

const fontUrl = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap";


const newFeatures = [
  {
    title: "⭐ Single & Bulk Certificate Generation",
    description: "Generate certificates individually or in bulk for large events and courses."
  },
  {
    title: "🧩 Fully Customizable Templates",
    description: "Design certificates with custom templates, fonts, colors, and branding."
  },
  {
    title: "💌 Email Integration",
    description: "Send certificates directly to recipients via email with automated delivery."
  },
  {
    title: "🛡️ Secure & Verifiable",
    description: "Blockchain-based verification ensures authenticity and prevents fraud."
  },
  {
    title: "🔄 Revision & Regeneration",
    description: "Track certificate status, revisions, and maintain detailed registration records."
  },
  {
    title: "👥 Multi-Role Dashboard",
    description: "Role-based access control for administrators, issuers, and recipients."
  }
];

const features = [
  {
    icon: <FaShieldAlt className="text-violet-600 text-3xl mb-2" />,
    title: "Secure & Private",
    desc: "All certificates are cryptographically signed and verifiable. Your data stays private.",
  },
  {
    icon: <FaMagic className="text-blue-600 text-3xl mb-2" />,
    title: "Instant Generation",
    desc: "Create and share certificates in seconds with a beautiful, intuitive UI.",
  },
  {
    icon: <FaCertificate className="text-pink-500 text-3xl mb-2" />,
    title: "Open Source",
    desc: "MIT licensed, fully open, and free to use. Contribute or self-host easily.",
  },
];

const testimonials = [
  {
  name: "Sofia Reyes",
  role: "Product Manager, PixelWorks",
  image: "/person.jpg",
  message: "Incredible experience from start to finish. The UI is clean, fast, and super intuitive.",
},
{
  name: "Liam Chen",
  role: "Co-Founder, DevSphere",
  image: "/person.jpg",
  message: "We’ve cut our deployment time in half. Highly recommend it to any fast-paced dev team.",
},
{
  name: "Aanya Patel",
  role: "Marketing Head, Clickly",
  image: "/person.jpg",
  message: "This tool helped us scale campaigns effortlessly. The support team is just amazing!",
}

];


const Home = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const user = localStorage.getItem("user");
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'visible',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.section
          className="flex flex-col items-center justify-center min-h-[80vh] pt-32 pb-16 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-white text-[200px] font-normal leading-[100%] tracking-[0em] mb-4 drop-shadow-lg text-center font-amerika"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Honor-box
          </motion.h1>

          <motion.p
            className="text-white/90 text-[32px] font-light leading-[100%] tracking-[0em] mb-8 text-center max-w-3xl font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            Build trust with instant verifiable certificates.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            {/*check here */}
            {user ? (
              <Link
                  to="/generate"
                  className="px-7 py-3 rounded-full bg-white text-black text-lg font-medium font-amerika shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
                  tabIndex={0}
                >
                  Generate Certificate
                </Link>
              ) : (
                <button
                  onClick={() => alert("Please log in to generate certificates.")}
                  className="px-7 py-3 rounded-full border border-black bg-white text-black text-lg font-medium font-amerika shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
                  tabIndex={0}
                >
                  Generate Certificate
                </button>
              )}

              <Link
                to="/verify"
                className="px-7 py-3 rounded-full border border-black text-white text-lg font-medium font-amerika shadow-lg transition-transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 flex items-center gap-2"
                tabIndex={0}
              >
                Verify Certificate
              </Link>


          </motion.div>
        </motion.section>


        {/* About Us section */}
        <motion.section
            id="features"
            className="w-full py-20 px-4 sm:px-8 lg:px-16 bg-transparent"
          >
            <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
              <h2 className="text-5xl sm:text-6xl text-center font-extrabold text-white hover:text-purple-300 transition-colors duration-300">
                About Us
              </h2>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
                <img
                  className="w-[300px] sm:w-[400px] lg:w-[554px] h-auto object-cover rounded-xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
                  alt="About us illustration"
                  src="/Certification-rafiki.png"
                />

                <p className="max-w-[800px] text-white text-lg sm:text-xl font-light opacity-90 hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                  Honor-Box is a modern, user-friendly certificate generator platform designed to
                  simplify the way organizations, institutions, and individuals create and distribute
                  digital certificates. Whether you're hosting a workshop, an online course, a
                  corporate event, or a student recognition program, Honor-Box empowers you to generate
                  and manage certificates effortlessly — in bulk or one-by-one.
                  <br /><br />
                  Our mission is to eliminate the hassle of manual certificate creation and bring
                  automation, accuracy, and elegance to your credentialing process. With a focus on
                  customization and simplicity, Honor-Box is the perfect companion for educators,
                  event organizers, HR teams, and community leaders.
                </p>
              </div>
            </div>
          </motion.section>

        {/* Features Section */}
        <section className="w-full px-6 sm:px-12 lg:px-16 mt-24">
          <h2 className="text-center font-extrabold text-white text-[40px] sm:text-[60px] mb-16 hover:text-purple-300 transition-colors duration-300">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-[1500px] mx-auto">
            {newFeatures.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </section>


        {/* Container for Newsletter, Testimonials, and Footer with extended gradient */}
        <div style={{ position: 'relative' }}>
          {/* Extended Bottom Gradient - covers from Newsletter to end of Footer */}
          <div 
            className="w-full"
            style={{
              background: 'linear-gradient(to top, hsl(260, 61%, 17%), transparent)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0
            }}
          />
          
          {/* Content with higher z-index to appear above gradient */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Newsletter />

            {/* Testimonials Section */}
            <section className="w-full px-6 sm:px-12 lg:px-16 mt-32">
              <h2 className="text-center font-extrabold text-white text-[40px] sm:text-[60px] mb-16 hover:text-purple-300 transition-colors duration-300">
                What Our Users Say
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {testimonials.map((t, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300"
                  >
                    <p className="text-white text-base mb-4">"{t.message}"</p>
                    <div className="flex items-center space-x-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-white font-semibold">{t.name}</p>
                        <p className="text-gray-400 text-sm">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;