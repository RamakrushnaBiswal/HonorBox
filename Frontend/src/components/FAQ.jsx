import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqList = [
    {
      question: "What is Honor-Box?",
      answer:
        "Honor-Box is a digital certificate generator platform that allows individuals and organizations to create, customize, and distribute certificates easily and efficiently.",
    },
    {
      question: "Who can use Honor-Box?",
      answer:
        "Honor-Box is perfect for educators, event organizers, corporate HR teams, and anyone needing to issue digital certificates for workshops, online courses, events, and recognitions.",
    },
    {
      question: "Do I need to create an account to generate certificates?",
      answer:
        "Yes, you need to create an account or log in to manage and download your certificates.",
    },
    {
      question: "Can I generate multiple certificates at once?",
      answer:
        "Absolutely! Honor-Box supports bulk generation using CSV upload, making it ideal for large-scale events or courses.",
    },
    {
      question: "Can I customize the certificate design?",
      answer:
        "Yes, you can personalize templates, add your logo, select fonts, and adjust layouts to match your brand or event.",
    },
    {
      question: "How are certificates delivered?",
      answer:
        "Certificates can be downloaded directly from the dashboard or emailed to recipients if configured.",
    },
    {
      question: "Is Honor-Box free to use?",
      answer:
        "Honor-Box provides a free tier with basic features. Advanced customization and high-volume generation may require a premium plan (coming soon).",
    },
    {
      question: "Is my data safe on Honor-Box?",
      answer:
        "Yes, we prioritize user data security and follow best practices for encryption and data protection.",
    },
    {
      question: "What formats are the certificates available in?",
      answer:
        "Certificates are generated as high-quality PDF files, suitable for sharing and printing.",
    },
    {
      question: "Can I revoke or update a certificate after issuing?",
      answer:
        "Currently, once a certificate is generated, it cannot be edited or revoked. You can, however, regenerate a new one with updated details.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const arrowVariants = {
    closed: { rotate: 0, scale: 1 },
    open: {
      rotate: 90,
      scale: [1, 1.3, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-8">
        Frequently Asked Questions
      </h2>

      {faqList.map((item, idx) => (
        <motion.div
          key={idx}
          onClick={() => toggleFAQ(idx)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleFAQ(idx);
            }
          }}
          aria-expanded={openIndex === idx}
          aria-controls={`faq-answer-${idx}`}
          aria-labelledby={`faq-question-${idx}`}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-md cursor-pointer
            hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)" }}
        >
          <button
            id={`faq-question-${idx}`}
            className="w-full text-left text-lg font-semibold flex justify-between items-center focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              toggleFAQ(idx);
            }}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-answer-${idx}`}
          >
            {item.question}
            <motion.span
              aria-hidden="true"
              variants={arrowVariants}
              initial="closed"
              animate={openIndex === idx ? "open" : "closed"}
              className="inline-block ml-3 text-indigo-400"
            >
              ▶
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                id={`faq-answer-${idx}`}
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-3"
                aria-hidden={openIndex !== idx}
              >
                <p className="text-sm text-white/80 leading-relaxed">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  );
};

export default FAQ;
