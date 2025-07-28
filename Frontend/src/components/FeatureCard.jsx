import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const FeatureCard = ({ title, description, icon, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const getCardConfig = () => {
    switch (index % 6) {
      case 0: // Single & Bulk - Red/Maroon
        return {
          imageSrc: '/img1.png',
          imageWidth: '450px',
          imageHeight: '270px',
          imageOpacity: '13%',
          backgroundColor: 'hsl(345, 97%, 24%)',
          border: '3px solid rgba(80, 13, 202, 0.78)',
          borderColor: '#500DCAC7'
        };
      case 1: // Fully Customizable - Blue
        return {
          imageSrc: '/img2.png',
          imageWidth: '450px',
          imageHeight: '270px',
          imageOpacity: '13%',
          backgroundColor: 'rgba(25, 25, 112, 0.3)',
          border: '3px solid rgba(80, 13, 202, 0.78)',
          borderColor: '#500DCAC7'
        };
      case 2: // Email Integration - Gray/Silver
        return {
          imageSrc: '/img3.png',
          imageWidth: '460px',
          imageHeight: '270px',
          imageOpacity: '13%',
          backgroundColor: 'rgba(25, 25, 112, 0.3)',
          border: '3px solid rgba(80, 13, 202, 0.78)',
          borderColor: '#500DCAC7'
        };
      case 3: // Secure & Verifiable - Dark Gray
        return {
          imageSrc: '/img4.png',
          imageWidth: '460px',
          imageHeight: '230px',
          imageOpacity: '13%',
          backgroundColor: 'rgba(25, 25, 112, 0.3)',
          border: '3px solid rgba(80, 13, 202, 0.78)',
          borderColor: '#500DCAC7'
        };
      case 4: // Revision & Registration - Dark Blue
        return {
          imageSrc: '/img5.png',
          imageWidth: '460px',
          imageHeight: '240px',
          imageOpacity: '13%',
          backgroundColor: 'rgba(25, 25, 112, 0.3)',
          border: '3px solid rgba(80, 13, 202, 0.78)',
          borderColor: '#500DCAC7'
        };
      case 5: // Multi-Role Dashboard - Dark Gray/Blue
        return {
          imageSrc: '/img6.png',
          imageWidth: '460px',
          imageHeight: '230px',
          imageOpacity: '13%',
          backgroundColor: 'rgba(25, 25, 112, 0.3)',
          border: '3px solid rgba(80, 13, 202, 0.78)',
          borderColor: '#500DCAC7'
        };
      default:
        return {
          imageSrc: '/images/rectangle-default.png',
          imageWidth: '460px',
          imageHeight: '230px',
          imageOpacity: '13%',
          backgroundColor: 'rgba(75, 85, 99, 0.3)',
          border: '3px solid rgba(80, 13, 202, 0.78)',
          borderColor: '#500DCAC7'
        };
    }
  };
  const cardConfig = getCardConfig();
  const cardStyle = {
    backgroundColor: cardConfig.backgroundColor,
    border: cardConfig.border,
    borderColor: cardConfig.borderColor
  };

  return (
    <motion.div 
      ref={ref}
      className="w-full relative group cursor-pointer rounded-xl overflow-hidden backdrop-blur-md border"
      style={{
        background: `linear-gradient(135deg, ${cardStyle.backgroundColor}dd, ${cardStyle.backgroundColor}99, ${cardStyle.backgroundColor}bb)`,
        borderColor: isHovered ? 'rgba(139, 92, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered 
          ? '0 20px 40px -12px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)' 
          : '0 8px 32px -6px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        minHeight: '250px',
        aspectRatio: '3/2'
      }}
      initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 45 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0,
        transition: { 
          duration: 1.2, 
          delay: index * 0.2,
          ease: [0.25, 0.4, 0.25, 1],
          type: "spring",
          stiffness: 100
        }
      } : {}}
      whileHover={{ 
        scale: 1.05,
        y: -15,
        rotateY: 5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.3 + 0.5 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${15 + (i * 12)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>

      {/* Enhanced background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url(${cardConfig.imageSrc})`,
          opacity: cardConfig.imageOpacity,
          filter: 'blur(0.5px)'
        }}
        whileHover={{ scale: 1.1, opacity: '0.2' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Dynamic gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/20 group-hover:from-transparent group-hover:to-black/10 transition-all duration-500"
        animate={{
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))'
            : 'linear-gradient(135deg, transparent, rgba(0, 0, 0, 0.2))'
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Subtle top accent line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.2 + 1, duration: 1 }}
      />

      {/* Content container with centered layout */}
      <div className="relative h-full flex flex-col justify-center p-8 z-10">
        {/* Card index */}
        <motion.div 
          className="absolute top-4 right-4 text-xs font-mono text-white/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.7, duration: 0.6 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        {/* Main content centered */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Title Section */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
          >
            <motion.h3 
              className="text-white font-bold font-inter text-xl lg:text-2xl leading-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.div 
              className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: index * 0.2 + 1.2, duration: 0.8 }}
            />
          </motion.div>

          {/* Description Section */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.8, duration: 0.8 }}
          >
            <p className="text-white/85 group-hover:text-white/95 transition-all duration-300 leading-relaxed text-sm lg:text-base max-w-sm mx-auto">
              {description}
            </p>
          </motion.div>
        </div>
        
        {/* Minimalistic bottom indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 1, duration: 0.8 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 rounded-full bg-white/30"></div>
            <div className="w-1 h-1 rounded-full bg-white/30"></div>
          </div>
        </motion.div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-purple-400/60 transition-colors duration-300"></div>
      <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/15 rounded-full group-hover:bg-pink-400/40 transition-colors duration-300"></div>
    </motion.div>
  );
};

export default FeatureCard;

