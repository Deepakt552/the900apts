import React, { useRef, useEffect, useState } from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroFooter from './HeroFooter';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({
          x: (e.clientX - centerX) * 0.01,
          y: (e.clientY - centerY) * 0.01,
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#1a73b5] 
                 shadow-[0_25px_80px_rgba(0,0,0,0.8)] max-w-full
                 transform-gpu flex flex-col justify-between"
    >
      <HeroBackground mousePosition={mousePosition} />
      <div className="relative z-10 pointer-events-auto flex flex-col justify-between h-full min-h-full px-4 sm:px-6 md:px-10 pt-[58px] sm:pt-16 md:pt-20 pb-3 sm:pb-6">
        <HeroContent />
        <HeroFooter />
      </div>
    </div>
  );
};

export default HeroSection;