import { motion } from "framer-motion";
import { FaGithub, FaCertificate } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="w-full flex flex-col items-center justify-center mt-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full max-w-4xl mx-auto rounded-2xl bg-[rgba(33, 16, 66, 0.10)] backdrop-blur-md border border-[rgba(180,120,255,0.18)] shadow-[0_4px_32px_0_rgba(80,80,180,0.10)] px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <span className="text-white text-lg font-bold tracking-tight">
            HonorBox
          </span>
          <span className="hidden md:inline text-white/70">|</span>
          <a
            href="/about"
            className="footer-link text-white/90 hover:text-blue-400 transition"
          >
            About
          </a>
          <a
            href="#terms"
            className="footer-link text-white/90 hover:text-blue-400 transition"
          >
            Terms
          </a>
          <a
            href="https://github.com/RamakrushnaBiswal/HonorBox"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link flex items-center gap-1 text-white/90 hover:text-pink-400 transition"
          >
            <FaGithub className="text-xl" /> GitHub
          </a>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-xs font-semibold text-white">
            Open Source <FaCertificate className="text-pink-500" />
          </span>
          <span className="text-xs text-white/60">
            © {new Date().getFullYear()} HonorBox. Made by Ram
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;