import { motion, useInView } from "framer-motion";
import {
  FaGithub,
  FaCertificate,
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { useRef, useState } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <motion.footer
      ref={ref}
      className="w-full flex flex-col items-center justify-center mt-16 relative pt-12 pb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0
                ? "bg-purple-400/30"
                : i % 4 === 1
                ? "bg-pink-400/30"
                : i % 4 === 2
                ? "bg-blue-400/30"
                : "bg-cyan-400/30"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full relative overflow-hidden"
        style={{
          padding: "2rem 0",
          background:
            "linear-gradient(135deg, rgba(33, 16, 66, 0.12), rgba(80, 13, 202, 0.06))",
          backdropFilter: "blur(10px)",
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Gradient overlay effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
            {/* Brand Section */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                className="text-2xl text-white font-bold hover:text-purple-300 transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                HonorBox
              </motion.span>
              <motion.p
                className="text-white/70 text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Bridging talent with opportunity
              </motion.p>
              <motion.span
                className="inline-flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-xs font-medium text-white/80 mt-2 w-fit"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                }}
                transition={{ duration: 0.2 }}
              >
                OpenSource
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaCertificate className="text-pink-400 text-sm" />
                </motion.div>
              </motion.span>

              {/* Social Icons */}
              <div className="flex gap-4 mt-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-lg"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-lg"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-lg"
                >
                  <FaGithub />
                </a>
                <a
                  href="mailto:contact@placementsystem.com"
                  className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-lg"
                >
                  <FaEnvelope />
                </a>
              </div>
            </motion.div>

            {/* Navigation Section */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-white font-semibold mb-2 text-lg">
                Navigation
              </h3>
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "FAQs", path: "/faq" },
                { name: "Sign Up", path: "/signup" },
                { name: "Generate", path: "/generate" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-sm font-medium py-1"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>

            {/* Legal Section */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="text-white font-semibold mb-2 text-lg">Legal</h3>
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Newsletter",
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-sm font-medium py-1"
                >
                  {item}
                </a>
              ))}
            </motion.div>

            {/* Contact Section */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-white font-semibold mb-2 text-lg">Contact</h3>
              <p className="text-white/70 text-sm py-1">
                Honarbox Technologies Pvt. Ltd.
              </p>

              <a
                href="mailto:support@honarbox.com"
                className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-sm py-1"
              >
                support@honarbox.com
              </a>

              <a
                href="tel:+911234567890"
                className="text-white/70 hover:text-blue-400 transition-colors duration-300 text-sm py-1"
              >
                +91 12345 67890
              </a>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.span
              className="text-xs text-white/60"
              whileHover={{
                color: "rgba(255, 255, 255, 0.8)",
                scale: 1.05,
              }}
            >
              © 2025 HonarBox Open Source
            </motion.span>

            <motion.div
              className="flex items-center gap-4 mt-4 md:mt-0"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link flex items-center gap-1 text-white/70 hover:text-pink-400 transition text-sm py-1 px-2 rounded-md"
                whileHover={{
                  scale: 1.1,
                  color: "#f472b6",
                  textShadow: "0 0 15px rgba(244, 114, 182, 0.5)",
                  backgroundColor: "rgba(244, 114, 182, 0.1)",
                }}
                onHoverStart={() => setHoveredLink("github")}
                onHoverEnd={() => setHoveredLink(null)}
              >
                <motion.div
                  animate={
                    hoveredLink === "github"
                      ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <FaGithub className="text-base" />
                </motion.div>
                GitHub
              </motion.a>

              <motion.span
                className="text-xs text-white/50 flex items-center py-1 px-2 rounded-md"
                whileHover={{
                  color: "rgba(255, 255, 255, 0.7)",
                  scale: 1.05,
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                }}
              >
                Made with
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    color: ["#ef4444", "#f97316", "#ef4444"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mx-1"
                >
                  <FaHeart className="inline text-xs" />
                </motion.span>
                by Ram
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-3 left-6 w-2 h-2 bg-purple-400/60 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-3 right-6 w-1.5 h-1.5 bg-pink-400/60 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
