import { motion, useInView } from "framer-motion";
import { FaGithub, FaCertificate } from "react-icons/fa";
import { useRef, useState } from "react";
import TermsModal from "./TermsModal";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
    <motion.footer 
      ref={ref}
      className="w-full flex flex-col items-center justify-center mt-16 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0 ? 'bg-purple-400/30' : 
              i % 4 === 1 ? 'bg-pink-400/30' : 
              i % 4 === 2 ? 'bg-blue-400/30' : 'bg-cyan-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.5, 1, 0.5]
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

      <motion.div 
        className="w-full max-w-4xl border border-[rgba(180,120,255,0.15)] rounded-2xl relative overflow-hidden mx-auto"
        style={{ 
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(33, 16, 66, 0.12), rgba(80, 13, 202, 0.06))',
          backdropFilter: 'blur(10px)'
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ 
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
          borderColor: 'rgba(180,120,255,0.3)'
        }}
      >
        {/* Gradient overlay effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center relative z-10">
          {/* Left Section - Brand */}
          <motion.div 
            className="flex flex-col md:items-start items-center gap-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span 
              className="text-xl text-white font-bold font-amerika hover:text-purple-300 transition-colors duration-300"
              whileHover={{ 
                scale: 1.1,
                textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
              }}
              transition={{ duration: 0.3 }}
            >
              HonorBox
            </motion.span>
            <motion.span 
              className="inline-flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-xs font-medium text-white/80"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.25)'
              }}
              transition={{ duration: 0.2 }}
            >
              Open Source 
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaCertificate className="text-pink-400 text-sm" />
              </motion.div>
            </motion.span>
          </motion.div>

          {/* Center Section - Navigation Links */}
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="/about"
              className="footer-link text-white/80 hover:text-blue-400 transition text-sm font-medium"
              whileHover={{ 
                scale: 1.1,
                color: '#60a5fa',
                textShadow: '0 0 15px rgba(96, 165, 250, 0.5)'
              }}
              onHoverStart={() => setHoveredLink('about')}
              onHoverEnd={() => setHoveredLink(null)}
            >
              About
            </motion.a>
            <motion.span 
              className="text-white/40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              •
            </motion.span>
            <motion.a
              href="#terms"
              className="footer-link text-white/80 hover:text-blue-400 transition text-sm font-medium"
              whileHover={{ 
                scale: 1.1,
                color: '#60a5fa',
                textShadow: '0 0 15px rgba(96, 165, 250, 0.5)'
              }}
              onHoverStart={() => setHoveredLink('terms')}
              onHoverEnd={() => setHoveredLink(null)}
            >
              <button
              onClick={() => setShowTerms(true)}
              className="footer-link text-white/90 hover:text-blue-400 transition"
            >
              Terms
            </button>
            </motion.a>
            
            
            <motion.span 
              className="text-white/40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              •
            </motion.span>
            <motion.a
              href="https://github.com/RamakrushnaBiswal/HonorBox"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link flex items-center gap-1 text-white/80 hover:text-pink-400 transition text-sm font-medium"
              whileHover={{ 
                scale: 1.1,
                color: '#f472b6',
                textShadow: '0 0 15px rgba(244, 114, 182, 0.5)'
              }}
              onHoverStart={() => setHoveredLink('github')}
              onHoverEnd={() => setHoveredLink(null)}
            >
              <motion.div
                animate={hoveredLink === 'github' ? {
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <FaGithub className="text-base" />
              </motion.div>
              GitHub
            </motion.a>
          </motion.div>

          {/* Right Section - Copyright */}
          <motion.div 
            className="flex flex-col md:items-end items-center gap-1"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.span 
              className="text-xs text-white/60"
              whileHover={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                scale: 1.05
              }}
            >
              © {new Date().getFullYear()} HonorBox
            </motion.span>
            <motion.span 
              className="text-xs text-white/50"
              whileHover={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                scale: 1.05
              }}
            >
              Made with 
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ['#ef4444', '#f97316', '#ef4444']
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ❤️
              </motion.span>
              {' '}by Ram
            </motion.span>
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-3 left-3 w-2 h-2 bg-purple-400/60 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-pink-400/60 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>
    </motion.footer>
    
    <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
};

export default Footer;