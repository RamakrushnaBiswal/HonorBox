import { Link } from "react-router-dom";
import { FaFileAlt, FaCertificate, FaShieldAlt, FaMagic, FaGithub, FaEnvelope, FaUsers, FaSync, FaTachometerAlt } from "react-icons/fa";
import {useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./custom.css";
import FAQ from "./FAQ";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [tiltTransform, setTiltTransform] = useState({ rotateX: 0, rotateY: 0 });
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    // Set loaded state after a brief delay
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const user = localStorage.getItem("user");
  const authenticated = user !== null;
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
      {/* Animated background particles for hero section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 5 === 0 ? 'bg-purple-400/30' : 
              i % 5 === 1 ? 'bg-pink-400/30' : 
              i % 5 === 2 ? 'bg-blue-400/30' : 
              i % 5 === 3 ? 'bg-cyan-400/30' : 'bg-indigo-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.section
          ref={heroRef}
          className="flex flex-col items-center justify-center min-h-[80vh] pt-32 pb-16 px-4 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Hero floating elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  i % 3 === 0 ? 'bg-purple-500/20' : 
                  i % 3 === 1 ? 'bg-pink-500/20' : 'bg-blue-500/20'
                }`}
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i * 8)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.8, 1.4, 0.8]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8
                }}
              />
            ))}
          </div>

          <motion.h1
            className="text-white text-hero font-normal leading-[90%] tracking-tight mb-4 sm:mb-6 lg:mb-8 drop-shadow-lg text-center font-amerika relative z-10"
            initial={{ opacity: 0, y: -60, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            whileHover={{ 
              scale: 1.02,
              textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
            }}
            style={{ color: '#ffffff' }}
          >
            Honor-box
          </motion.h1>

          <motion.p
            className="text-white/90 text-hero-subtitle font-light leading-[110%] tracking-wide mb-6 sm:mb-8 lg:mb-12 text-center max-w-4xl font-inter px-4 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.02, color: 'rgba(255, 255, 255, 1)' }}
          >
            Build trust with instant verifiable certificates.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            {authenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/generate"
                  className="px-7 py-3 rounded-full bg-white text-black text-lg font-medium font-amerika shadow-lg transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 relative overflow-hidden"
                  tabIndex={0}
                >
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
                      backgroundSize: '200% 200%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <FaFileAlt className="text-2xl" />
                  <span className="relative z-10">Generate Certificate</span>
                </Link>
              </motion.div>
            ) : (
              <Link
                to="/signin"
                className="px-7 py-3 rounded-full bg-white text-black text-lg font-medium font-[Inter] shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
                tabIndex={0}
              >
                <FaFileAlt className="text-2xl" /> Generate Certificate
              </Link>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/verify"
                className="px-7 py-3 rounded-full border border-white/30 text-white text-lg font-medium font-amerika shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 flex items-center gap-2 backdrop-blur-sm relative overflow-hidden"
                tabIndex={0}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%']
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <span className="relative z-10">Verify Certificate</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>


        {/* About Us section */}
        <section
            id="about"
            className="section-padding bg-transparent"
            >
            <div className="container-max">
              <motion.h2 
                className="heading-primary text-center font-extrabold text-white hover:text-purple-300 transition-colors duration-300 mb-16"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              >
                About Us
              </motion.h2>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
                <motion.img
                  className="w-[300px] sm:w-[400px] lg:w-[554px] h-auto object-cover rounded-xl shadow-lg"
                  alt="About us illustration"
                  src="/Certification-rafiki.png"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.3))',
                  }}
                />

                <motion.div 
                  className="flex flex-col justify-center text-center lg:text-left space-y-6"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <div className="space-y-6">
                    <p className="text-body text-white/90 hover:text-white transition-colors duration-300 leading-relaxed">
                      Honor-Box is a modern, user-friendly certificate generator platform designed to
                      simplify the way organizations, institutions, and individuals create and distribute
                      digital certificates. Whether you're hosting a workshop, an online course, a
                      corporate event, or a student recognition program, Honor-Box empowers you to generate
                      and manage certificates effortlessly — in bulk or one-by-one.
                    </p>
                    <p className="text-body text-white/90 hover:text-white transition-colors duration-300 leading-relaxed">
                      Our mission is to eliminate the hassle of manual certificate creation and bring
                      automation, accuracy, and elegance to your credentialing process. With a focus on
                      customization and simplicity, Honor-Box is the perfect companion for educators,
                      event organizers, HR teams, and community leaders.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
        <section 
          id="features"
          className="section-padding"
        >
          <div className="container-max">
            <h2 className="heading-primary text-center font-extrabold text-white hover:text-purple-300 transition-colors duration-300 mb-16">
              Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-equal">
              {newFeatures.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
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
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-12 xl:px-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        >
          <div className="mx-auto w-full max-w-7xl">
            {/* Section Header - Enhanced Centering */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                What Our Users Say
              </motion.h2>
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              />
              <motion.p 
                className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                Discover how HonorBox has transformed certificate generation for our users
              </motion.p>
            </motion.div>

            {/* Testimonials Grid - Enhanced Symmetry */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 place-items-center">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative group w-full h-full max-w-sm"
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15 + 1.6,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Card Background with Glass Effect - Enhanced Uniformity */}
                  <div className="relative h-full min-h-[320px] p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-lg border border-white/10 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:border-purple-400/30 transition-all duration-500 flex flex-col justify-between">
                    
                    {/* Quote Icon - Centered Top */}
                    <div className="flex justify-center mb-4">
                      <div className="text-purple-400/30 group-hover:text-purple-400/50 transition-colors duration-300">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Content Container - Perfectly Centered */}
                    <div className="flex flex-col h-full justify-center text-center space-y-6">
                      
                      {/* Testimonial Message - Centered */}
                      <div className="flex-1 flex items-center justify-center px-2">
                        <p className="text-white/90 group-hover:text-white text-base lg:text-lg leading-relaxed text-center font-medium italic max-w-xs">
                          "{testimonial.message}"
                        </p>
                      </div>

                      {/* Decorative Divider */}
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mx-auto"></div>

                      {/* Author Info - Perfectly Centered */}
                      <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                          <motion.img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white/20 group-hover:border-purple-400/50 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                          />
                          {/* Profile Ring */}
                          <div className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ padding: '2px' }}>
                            <div className="w-full h-full rounded-full bg-gray-900"></div>
                          </div>
                        </div>
                        
                        <div className="text-center space-y-1">
                          <h4 className="text-white font-bold text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                            {testimonial.name}
                          </h4>
                          <p className="text-white/60 group-hover:text-white/80 text-xs font-medium transition-colors duration-300 max-w-[200px] mx-auto">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements - Symmetrically Placed */}
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-purple-400/40 rounded-full group-hover:bg-purple-400/70 group-hover:scale-125 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-pink-400/40 rounded-full group-hover:bg-pink-400/70 group-hover:scale-125 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-blue-400/40 rounded-full group-hover:bg-blue-400/70 group-hover:scale-125 transition-all duration-300"></div>
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-cyan-400/40 rounded-full group-hover:bg-cyan-400/70 group-hover:scale-125 transition-all duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <FAQ />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;