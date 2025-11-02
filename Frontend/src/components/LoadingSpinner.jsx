import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "medium", message = "Loading..." }) => {
  const sizes = {
    small: { spinner: "w-6 h-6", text: "text-sm" },
    medium: { spinner: "w-10 h-10", text: "text-base" },
    large: { spinner: "w-16 h-16", text: "text-lg" }
  };

  const { spinner, text } = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className={`${spinner} border-4 border-purple-200 border-t-purple-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {message && (
        <motion.p
          className={`${text} text-white/80 font-semibold`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
