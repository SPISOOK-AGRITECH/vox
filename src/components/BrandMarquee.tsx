'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Brand Marquee Component
 * Displays brand logos (Sony, Epson, etc.) in an infinite scrolling marquee
 * Images have transparent backgrounds with original brand colors preserved
 */
const BrandMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Generate brand image paths (brands-1 through brands-32, excluding brands-20)
  const brandImages = Array.from({ length: 32 }, (_, i) => i + 1)
    .filter(num => num !== 20) // Exclude brands-20.png if it doesn't exist
    .map(num => `/brands/brands-${num}.png`);

  // Duplicate images multiple times for seamless infinite scroll (like a chain loop)
  // Multiple duplicates ensure continuous flow from right to left
  const duplicatedImages = [...brandImages, ...brandImages, ...brandImages, ...brandImages];

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
        background: 'var(--gradient-accent)',
        borderTop: '1px solid rgba(255, 215, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
      }}
    >
      {/* Subtle golden glow overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 217, 0, 0.05) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-primary/80 font-semibold mb-2">
          Premium Technology Partners         </p>
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
              background: 'linear-gradient(to right, var(--gradient-accent), transparent)',
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, var(--gradient-accent), transparent)',
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
                className="flex-shrink-0 flex items-center justify-center h-[60px] sm:h-[70px] md:h-[80px]"
              >
                <img
                  src={image}
                  alt={`Brand logo ${index + 1}`}
                  className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))',
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

export default BrandMarquee;

