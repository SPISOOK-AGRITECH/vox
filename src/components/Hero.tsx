'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

/**
 * Hero component with animated background image slideshow
 * Cycles through multiple hero images with smooth crossfade transitions
 */
const Hero = () => {
  // Array of hero images - using public folder paths
  const heroImages = [
    "/assets/hero-9.jpg",
    "/assets/hero-2.jpg",
    "/assets/hero-7.jpg",
    "/assets/hero-3.jpg",
    "/assets/hero-6.jpg",
    "/assets/hero-4.jpg",
    "/assets/hero-8.jpg",
    "/assets/hero-5.jpg",
  ];
  
  // Track current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track which layer (1 or 2) is currently visible
  const [visibleLayer, setVisibleLayer] = useState<1 | 2>(1);
  // Track image indices for each layer
  const [layer1ImageIndex, setLayer1ImageIndex] = useState(0);
  const [layer2ImageIndex, setLayer2ImageIndex] = useState(1);
  // Refs to track transition state and current values
  const isTransitioningRef = useRef(false);
  const currentIndexRef = useRef(0);
  const visibleLayerRef = useRef<1 | 2>(1);
  
  // Keep refs in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  
  useEffect(() => {
    visibleLayerRef.current = visibleLayer;
  }, [visibleLayer]);

  // Preload only the first two images (current and next) for faster initial load
  useEffect(() => {
    // Preload first image with high priority
    const img1 = new Image();
    img1.src = heroImages[0];
    img1.fetchPriority = 'high';
    
    // Preload second image for smooth first transition
    const img2 = new Image();
    img2.src = heroImages[1];
    
    // Lazy load remaining images in background
    const remainingImages = heroImages.slice(2);
    remainingImages.forEach((image, index) => {
      // Stagger loading to avoid blocking
      setTimeout(() => {
        const img = new Image();
        img.src = image;
        img.loading = 'lazy';
      }, index * 200);
    });
  }, [heroImages]);

  // Auto-advance images with smooth crossfade transition
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTransitioningRef.current) return; // Prevent overlapping transitions
      
      isTransitioningRef.current = true;
      
      // Use refs to get current values without causing dependency issues
      const currentIdx = currentIndexRef.current;
      const visible = visibleLayerRef.current;
      
      // Calculate next image index
      const nextIndex = (currentIdx + 1) % heroImages.length;
      
      // Update the hidden layer with the next image first (while it's hidden)
      if (visible === 1) {
        // Update layer 2's image first (it's currently hidden)
        setLayer2ImageIndex(nextIndex);
        // Wait for next frame to ensure image update is rendered, then fade in layer 2
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVisibleLayer(2);
            setCurrentIndex(nextIndex);
          });
        });
      } else {
        // Update layer 1's image first (it's currently hidden)
        setLayer1ImageIndex(nextIndex);
        // Wait for next frame to ensure image update is rendered, then fade in layer 1
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVisibleLayer(1);
            setCurrentIndex(nextIndex);
          });
        });
      }
      
      // Reset transition flag after transition completes
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 2500); // Slightly less than CSS transition duration
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]); // Only depend on heroImages.length

  const handleWhatsApp = () => {
    window.open("https://wa.me/917356264943", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+917356264943";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible pt-24">
      {/* Animated Background Images with Overlay */}
      <div className="absolute inset-0 overflow-hidden z-[5]">
        {/* Layer 1 - Fixed DOM element, never removed */}
        <div
          key="layer1"
          className="hero-slide"
          style={{ 
            backgroundImage: `url(${heroImages[layer1ImageIndex]})`,
            opacity: visibleLayer === 1 ? 1 : 0,
            zIndex: 1
          }}
          aria-hidden={visibleLayer !== 1}
        />
        
        {/* Layer 2 - Fixed DOM element, never removed */}
        <div
          key="layer2"
          className="hero-slide"
          style={{ 
            backgroundImage: `url(${heroImages[layer2ImageIndex]})`,
            opacity: visibleLayer === 2 ? 1 : 0,
            zIndex: 2
          }}
          aria-hidden={visibleLayer !== 2}
        />
        
        {/* Gradient Overlay - Subtle transparent dark overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/45 z-[3]" />
      </div>

      {/* Content */}
      <div className="relative z-[6] container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Elevate Your Living Spaces
            <span className="block text-secondary mt-2">With Cinematic Elegance</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Expert home cinema installations, sophisticated interior design, and smart automation solutions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              variant="hero" 
              size="xl"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              onClick={handleCall}
              className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/50"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Incandescent Bulb Effect - Warm orangish ambient lighting from behind (centered) */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] pointer-events-none overflow-visible">
        {/* Intense glow at the source - Brightest right at the bottom edge, centered */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[45%] h-40"
          style={{
            background: 'radial-gradient(ellipse 80% 100% at center top, rgba(255, 190, 100, 0.6) 0%, rgba(255, 180, 90, 0.45) 15%, rgba(255, 170, 80, 0.3) 30%, rgba(255, 160, 75, 0.18) 50%, rgba(255, 150, 70, 0.1) 70%, rgba(255, 140, 65, 0.05) 90%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />
        
        {/* Medium spread glow - Illuminates immediate area below */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-72"
          style={{
            background: 'radial-gradient(ellipse 75% 100% at center top, rgba(255, 190, 100, 0.35) 0%, rgba(255, 180, 90, 0.25) 15%, rgba(255, 170, 80, 0.16) 30%, rgba(255, 160, 75, 0.1) 50%, rgba(255, 150, 70, 0.06) 70%, rgba(255, 140, 65, 0.03) 90%, transparent 100%)',
            filter: 'blur(35px)',
          }}
        />
        
        {/* Wide ambient glow - Spreads across wider area */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-96"
          style={{
            background: 'radial-gradient(ellipse 70% 100% at center top, rgba(255, 190, 100, 0.2) 0%, rgba(255, 180, 90, 0.14) 18%, rgba(255, 170, 80, 0.09) 35%, rgba(255, 160, 75, 0.05) 55%, rgba(255, 150, 70, 0.03) 75%, rgba(255, 140, 65, 0.015) 95%, transparent 100%)',
            filter: 'blur(50px)',
          }}
        />
        
        {/* Extended ambient illumination - Soft room lighting */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse 65% 100% at center top, rgba(255, 190, 100, 0.12) 0%, rgba(255, 180, 90, 0.08) 22%, rgba(255, 170, 80, 0.05) 42%, rgba(255, 160, 75, 0.03) 62%, rgba(255, 150, 70, 0.015) 82%, transparent 100%)',
            filter: 'blur(65px)',
          }}
        />
        
        {/* Subtle outer ambient - Very soft, wide illumination */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse 60% 100% at center top, rgba(255, 190, 100, 0.06) 0%, rgba(255, 180, 90, 0.04) 28%, rgba(255, 170, 80, 0.025) 48%, rgba(255, 160, 75, 0.015) 68%, transparent 100%)',
            filter: 'blur(85px)',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
