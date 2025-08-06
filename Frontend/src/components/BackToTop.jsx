import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          padding: "10px 15px",
          fontSize: "16px",
          backgroundColor: "#4B5563",
          color: "#fff",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
        aria-label="Back to top"
      >
        ↑
      </button>
    )
  );
};

export default BackToTop;
