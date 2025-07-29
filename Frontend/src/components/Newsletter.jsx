import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Newsletter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <motion.section 
      ref={ref}
      className="px-4 sm:px-6 lg:px-12 xl:px-16 mt-16 mx-auto w-full max-w-7xl relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0 ? 'bg-purple-400/40' : 
              i % 4 === 1 ? 'bg-pink-400/40' : 
              i % 4 === 2 ? 'bg-blue-400/40' : 'bg-cyan-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6
            }}
          />
        ))}
      </div>

      <motion.div 
        className="w-full border border-white/10 rounded-3xl relative overflow-hidden group cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 17, 224, 0.3) 0%, rgba(217, 217, 217, 0.15) 100%)',
          minHeight: '200px',
          padding: '2.5rem',
          backdropFilter: 'blur(15px)'
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ 
          scale: 1.02,
          y: -8,
          boxShadow: '0 32px 64px -12px rgba(99, 17, 224, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.3)',
          borderColor: 'rgba(139, 92, 246, 0.6)',
          background: 'linear-gradient(135deg, rgba(99, 17, 224, 0.4) 0%, rgba(217, 217, 217, 0.2) 100%)',
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(45deg, transparent 20%, rgba(139, 92, 246, 0.1) 50%, transparent 80%)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Fully Responsive Centered Layout */}
        <div className="flex flex-col md:flex-row justify-between gap-6 h-full relative z-1">
          {/* Title Section */}
          <motion.div 
            className="flex flex-col items-center text-center max-w-2xl"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold font-inter mb-3 sm:mb-4 leading-tight group-hover:text-white/95 transition-colors duration-300"
              whileHover={{ 
                scale: 1.02,
                textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
              }}
              transition={{ duration: 0.3 }}
            >
              Subscribe our{' '}
              <motion.span 
                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block sm:inline"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Newsletter
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-white/80 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed px-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Stay updated with the latest features and news.
            </motion.p>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-lg justify-center items-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full sm:flex-1 sm:max-w-xs md:max-w-sm h-11 sm:h-12 border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 text-sm sm:text-base font-normal font-inter focus:border-white/80 focus:bg-white/20 hover:border-white/50 transition-all duration-300 rounded-lg sm:rounded-xl px-3 sm:px-4 outline-none"
              placeholder="Enter your email"
              whileFocus={{ 
                scale: 1.02,
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
              }}
              animate={{
                borderColor: isFocused 
                  ? 'rgba(139, 92, 246, 0.8)' 
                  : 'rgba(255, 255, 255, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.button 
              className="w-full sm:w-auto sm:flex-shrink-0 px-4 sm:px-6 md:px-8 h-11 sm:h-12 border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-medium font-inter rounded-lg sm:rounded-xl hover:bg-white/90 hover:text-purple-900 hover:border-white transition-all duration-300 relative overflow-hidden whitespace-nowrap"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsButtonHovered(true)}
              onHoverEnd={() => setIsButtonHovered(false)}
            >
              {/* Button shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                  backgroundSize: '200% 200%'
                }}
                animate={isButtonHovered ? {
                  backgroundPosition: ['0% 0%', '100% 100%']
                } : {}}
                transition={{ duration: 0.8, repeat: isButtonHovered ? Infinity : 0 }}
              />
              <span className="relative z-10">Subscribe</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Decorative Vector */}
        <motion.img
          className="absolute w-[120px] sm:w-[160px] md:w-[200px] h-auto top-3 right-3 pointer-events-none select-none z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500"
          alt="Vector"
          src="./Vector.svg"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-4 left-4 w-2 h-2 bg-purple-400/50 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-pink-400/50 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-8 right-16 w-1 h-1 bg-blue-400/50 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
       </motion.div>
    </motion.section>
  );
};

export default Newsletter;
