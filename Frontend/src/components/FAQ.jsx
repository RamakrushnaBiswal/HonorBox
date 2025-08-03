import React from "react";

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

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-8">
        Frequently Asked Questions
      </h2>
      {faqList.map((item, idx) => (
        <details
          key={idx}
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-md transition-all duration-300 ease-in-out"
        >
          <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center">
            {item.question}
            <span className="transition-transform duration-300 group-open:rotate-90">
              ▶
            </span>
          </summary>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            {item.answer}
          </p>
        </details>
      ))}
    </section>
  );
};

export default FAQ;
