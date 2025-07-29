TermsModal.jsx

import { motion } from "framer-motion";

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="relative bg-white text-black rounded-2xl shadow-lg max-w-2xl w-full mx-4 p-6 overflow-y-auto max-h-[80vh] border border-purple-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Terms & Conditions</h2>

        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            <strong className="text-purple-600">Use of the HonorBox Platform:</strong> You are responsible for using this platform ethically, including for issuing and verifying certificates.
          </p>
          <p>
            <strong className="text-purple-600">Data Privacy:</strong> We do not misuse or store personal data. You're accountable for your content.
          </p>
          <p>
            <strong className="text-purple-600">Certificate Authenticity:</strong> HonorBox does not guarantee the truth or legitimacy of uploaded certificates.
          </p>
          <p>
            <strong className="text-purple-600">License:</strong> HonorBox is open source under the MIT License. You're free to use, modify, and distribute with credit.
          </p>
          <p>
            <strong className="text-purple-600">Liability:</strong> The contributors are not liable for any misuse of this platform.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Close
          </button>
        </div>

        {/* Optional close button top-right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Close"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
}
