import React, { useState, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';

// Lazy loading component for images
const LazyCardImage = React.memo(({ src, opacity, isInView, isHovered }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  if (!isInView && !imageLoaded) {
    return (
      <div 
        className="absolute inset-0 bg-gray-800/20 animate-pulse"
        style={{ opacity: opacity }}
      />
    );
  }

  return (
    <motion.div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
      style={{
        backgroundImage: imageError ? 'none' : `url(${src})`,
        opacity: imageLoaded ? opacity : '0',
        filter: 'blur(0.5px)',
        willChange: isHovered ? 'transform, opacity' : 'auto'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? opacity : 0 }}
      whileHover={{ scale: 1.05, opacity: '0.18' }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img
        src={src}
        alt="Feature background"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="opacity-0 absolute"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
});

const FeatureCard = ({ title, description, icon, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "50px" });
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
  const cardConfig = useMemo(() => getCardConfig(), [index]);
  const cardStyle = useMemo(() => ({
    backgroundColor: cardConfig.backgroundColor,
    border: cardConfig.border,
    borderColor: cardConfig.borderColor
  }), [cardConfig]);

  // Optimized animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <motion.div 
      ref={ref}
      className="w-full relative group cursor-pointer rounded-xl overflow-hidden backdrop-blur-sm border transform-gpu"
      style={{
        background: `linear-gradient(135deg, ${cardStyle.backgroundColor}dd, ${cardStyle.backgroundColor}99)`,
        borderColor: isHovered ? 'rgba(139, 92, 246, 0.6)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered 
          ? '0 10px 25px -5px rgba(139, 92, 246, 0.25)' 
          : '0 5px 15px -3px rgba(0, 0, 0, 0.1)',
        minHeight: '250px',
        aspectRatio: '3/2',
        willChange: 'transform'
      }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={hoverVariants}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Lazy loaded background image */}
      <LazyCardImage 
        src={cardConfig.imageSrc}
        opacity={cardConfig.imageOpacity}
        isInView={isInView}
        isHovered={isHovered}
      />

      {/* Simplified gradient overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/20 transition-all duration-300 ${
          isHovered ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : ''
        }`}
      />
      
      {/* Simplified top accent line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent transition-all duration-300 ${
          isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{ transformOrigin: 'center' }}
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

