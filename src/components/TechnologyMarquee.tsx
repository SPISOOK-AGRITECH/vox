'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Technology Marquee Component
 * Displays technology logos (3D, 4K, iMax, 8K, Dolby Atmos, etc.) in an infinite scrolling marquee
 * Images are white with transparent backgrounds, perfect for dark theme
 */
const TechnologyMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Generate portfolio image paths (Portfolio-1 through Portfolio-16, excluding Portfolio-10)
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
    '/portfolio/Portfolio-10.png',
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
      className="py-2 sm:py-3 lg:py-4 relative overflow-hidden"
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
        {/* Optional Section Header - can be removed if not needed */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-secondary/80 font-semibold mb-2">
            Cutting Edge Cinema Technology
          </p>
        </div>

        {/* Marquee Container */}
        <div 
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Fades on edges for smooth blend - responsive width */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, hsl(0 0% 5% / 0.95), transparent)',
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, hsl(0 0% 5% / 0.95), transparent)',
            }}
          />

          {/* Marquee Track */}
          <div 
            ref={marqueeRef}
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center animate-marquee"
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-[40px] sm:h-[50px] md:h-[60px]"
              >
                <img
                  src={image}
                  alt={`Technology feature ${index + 1}`}
                  className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  style={{
                    willChange: 'transform',
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyMarquee;

