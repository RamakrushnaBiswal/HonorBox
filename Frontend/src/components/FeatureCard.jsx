import React from 'react';

const FeatureCard = ({ title, description, icon, color, index }) => {
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
    <div 
      className="w-auto h-auto min-w-[200px] min-h-[150px] rounded-[20px] border-3 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
      style={cardStyle}
    >
      {/* Background image with custom dimensions and opacity */}
      <img 
        src={cardConfig.imageSrc} 
        alt="" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
        style={{
          width: cardConfig.imageWidth,
          height: cardConfig.imageHeight,
          opacity: cardConfig.imageOpacity
        }}
      />
      
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
      
      <div className="relative px-10 py-20 h-full flex flex-col justify-between">
        <div className="flex items-center">
          <h3 className="text-white text-2xl font-extrabold font-['Inter'] leading-tight">
            {title}
          </h3>
        </div>
        
        <p className="text-white/90 text-xs font-light leading-relaxed mt-2 group-hover:text-white transition-all duration-300">
          {description}
        </p>
      </div>
      
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default FeatureCard;
