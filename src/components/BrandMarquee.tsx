'use client';

import { useEffect, useRef, useState } from 'react';


/**
 * Brand Marquee Component
 * Displays brand logos in a chain-link design with rotating gear wheels
 * Images are connected like chain links and rotate around gear wheels
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
      className="py-0 pt-4 relative overflow-hidden"
      style={{ 
        background: 'var(--gradient-accent)',
        borderTop: '1px solid rgba(255, 215, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
      }}
    >
   

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-0 animate-fade-in px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-primary/80 font-semibold mb-2">
            Premium Technology Partners
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
              paddingLeft: '80px', 
              paddingRight: '80px',
            }}
          >
            {/* Chain Links */}
            <div 
              ref={marqueeRef}
              className="flex gap-2 sm:gap-3 md:gap-4 items-center animate-marquee-brand "
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="flex items-center gap-2 sm:gap-3 md:gap-4"
                >
                    {/* Image */}
                    <div className="relative mx-4 z-10 h-32 w-32 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36 flex items-center justify-center">
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
               
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;

