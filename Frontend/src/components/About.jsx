import Footer from "./Footer";
import "./custom.css";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <section className="min-h-screen about-background text-white px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto backdrop-blur-md bg-black/30 border border-white/10 shadow-lg rounded-3xl p-10 space-y-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
            <u>About</u>
          </h1>

          {/* What is HonorBox */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">🎓 What is HonorBox?</h2>
            <p className="text-white/90">
              <strong>HonorBox</strong> is an open-source platform that makes generating and verifying digital certificates fast, secure, and elegant — built for events, hackathons, and communities.
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">✨ Key Features</h2>
            <ul className="space-y-2 text-white/90">
              <li>✅ Instant certificate generation</li>
              <li>🔐 Secure verification using digital signatures</li>
              <li>🎨 Sleek and responsive interface</li>
              <li>🧑‍💻 Google login integration</li>
              <li>📜 Open-source (MIT Licensed)</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">🛠 Tech Stack Used</h2>
            <ul className="text-white/90 space-y-1 list-disc list-inside">
              <li><strong>Frontend:</strong> React, Tailwind CSS, Framer Motion</li>
              <li><strong>Backend:</strong> Node.js, Express.js</li>
              <li><strong>Database:</strong> MongoDB</li>
              <li><strong>Auth:</strong> Google OAuth</li>
            </ul>
          </div>

          {/* Project Goal */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">🎯 Project Goal & Motivation</h2>
            <p className="text-white/90">
              This project was built as part of <strong>GirlScript Summer of Code (GSSoC)</strong> to promote open-source contributions and simplify the process of managing event certificates.
            </p>
          </div>

          {/* Contribute */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">🤝 Contribute</h2>
            <p className="text-white/90">
              We love collaboration! Developers of all skill levels are welcome to contribute.
            </p>
            <a
              href="https://github.com/RamakrushnaBiswal/HonorBox"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-pink-400 underline hover:text-pink-300 transition"
            >
              → Visit GitHub Repository
            </a>
          </div>

          {/* Credits */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">💖 Made With Passion</h2>
            <p className="text-white/90">
              Crafted by <strong>Ramakrushna Biswal</strong>
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
