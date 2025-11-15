'use client';

import { useEffect, useRef, useState } from 'react';


/**
 * Technology Marquee Component
 * Displays technology logos in a chain-link design with rotating gear wheels
 * Images are connected like chain links and rotate around gear wheels
 */
const TechnologyMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Generate portfolio image paths (Portfolio-1 through Portfolio-10)
  const portfolioImages = [
    '/portfolio/Portfolio-1.png',
    '/portfolio/Portfolio-2.png',
    '/portfolio/Portfolio-3.png',
    '/portfolio/Portfolio-4.png',
    '/portfolio/Portfolio-5.png',
    '/portfolio/Portfolio-6.png',
    '/portfolio/Portfolio-7.png',
    '/portfolio/Portfolio-8.png',
    '/portfolio/Portfolio-9.png',
  ];

  // Duplicate images multiple times for seamless infinite scroll (like a chain loop)
  // Multiple duplicates ensure continuous flow from right to left
  const duplicatedImages = [...portfolioImages, ...portfolioImages, ...portfolioImages, ...portfolioImages];

  useEffect(() => {
    // Ensure smooth animation on mount
    if (marqueeRef.current) {
      marqueeRef.current.style.animation = 'none';
      requestAnimationFrame(() => {
        if (marqueeRef.current) {
          marqueeRef.current.style.animation = '';
        }
      });
    }
  }, []);

  // Handle pause on hover
  useEffect(() => {
    if (marqueeRef.current) {
      if (isPaused) {
        marqueeRef.current.style.animationPlayState = 'paused';
      } else {
        marqueeRef.current.style.animationPlayState = 'running';
      }
    }
  }, [isPaused]);

  return (
    <section 
      className="py-0 pt-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, hsl(0 0% 8% / 0.92) 0%, hsl(0 0% 5% / 0.95) 100%)',
        borderTop: '1px solid rgba(255, 215, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
      }}
    >
      {/* Subtle golden glow overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.05) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-3 sm:mb-4 animate-fade-in px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-secondary/80 font-semibold mb-2">
            Cutting Edge Cinema Technology
          </p>
        </div>

        {/* Chain Container with Gear Wheels */}
        <div 
          className="relative overflow-hidden w-full flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        

          

          {/* Chain Track - with padding for gears */}
          <div 
            className="relative flex items-center w-full"
            style={{ 
              paddingLeft: '60px', 
              paddingRight: '60px',
            }}
          >
            {/* Chain Links */}
            <div 
              ref={marqueeRef}
              className="flex gap-2 sm:gap-3 md:gap-4 items-center animate-marquee-technology"
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="flex items-center gap-2 sm:gap-3"
                >
                
                  {/* Image Container */}
                  <div className="flex-shrink-0 mx-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center">
                    <img
                      src={image}
                      alt={`Technology feature ${index + 1}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                      style={{
                        willChange: 'transform',
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                 
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyMarquee;
