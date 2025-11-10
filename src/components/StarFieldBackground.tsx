'use client';

import { useEffect, useRef, useState } from "react";

/**
 * StarFieldBackground component
 * Creates a subtle starlight canvas animation similar to Rolls Royce starlight headliner
 * Features twinkling stars and subtle service-related visual elements
 * Positioned to exclude the hero section
 */
interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  baseOpacity: number;
  targetOpacity: number;
}

interface ServiceIcon {
  x: number;
  y: number;
  icon: string;
  opacity: number;
  scale: number;
  fadeDirection: 1 | -1;
  delay: number;
}

const StarFieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const serviceIconsRef = useRef<ServiceIcon[]>([]);
  const [heroHeight, setHeroHeight] = useState<number>(0);
  const heroHeightRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Service icons/representations - subtle and elegant
  const serviceSymbols = ["✨", "🏠", "🛋️", "🎬", "💡"];

  /**
   * Convert HSL to RGB
   */
  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    h /= 360;
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h * 12) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return [f(0), f(8), f(4)];
  };

  /**
   * Get star color optimized for dark background
   * Uses bright golden, white, and light blue colors for visibility on dark
   */
  const getStarColor = (opacity: number, variant: 'golden' | 'blue' | 'white' = 'golden') => {
    let r: number, g: number, b: number;
    
    switch (variant) {
      case 'blue':
        // Light cyan-blue for dark backgrounds (hsl(195 70% 70%))
        [r, g, b] = hslToRgb(195, 70, 70);
        break;
      case 'white':
        // Bright white/light gray for dark backgrounds
        [r, g, b] = [255, 255, 255];
        break;
      case 'golden':
      default:
        // Bright golden/yellow for dark backgrounds (hsl(40 96% 70%)) - much brighter
        [r, g, b] = hslToRgb(40, 96, 70);
        break;
    }
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  /**
   * Initialize stars with random positions and properties
   */
  const initStars = (width: number, height: number, starCount: number = 300) => {
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      // Bright opacity for dark backgrounds - stars should be clearly visible
      const baseOpacity = Math.random() * 0.6 + 0.4;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8, // Larger stars for better visibility
        opacity: baseOpacity,
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        baseOpacity,
        targetOpacity: baseOpacity,
      });
    }
    starsRef.current = stars;
  };

  /**
   * Initialize service icons that fade in and out subtly
   */
  const initServiceIcons = (width: number, height: number, count: number = 8) => {
    const icons: ServiceIcon[] = [];
    for (let i = 0; i < count; i++) {
      icons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        icon: serviceSymbols[Math.floor(Math.random() * serviceSymbols.length)],
        opacity: 0,
        scale: 0.6 + Math.random() * 0.3,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        delay: Math.random() * 200, // Staggered appearance
      });
    }
    serviceIconsRef.current = icons;
  };

  /**
   * Update hero section height
   */
  const updateHeroHeight = () => {
    const hero = document.querySelector("section.relative.min-h-screen");
    if (hero) {
      const height = hero.getBoundingClientRect().height;
      heroHeightRef.current = height;
      setHeroHeight(height);
    }
  };

  /**
   * Main animation loop
   */
  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get current scroll position and viewport info
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentHeroHeight = heroHeightRef.current || heroHeight;
    
    // Clear canvas first (use logical coordinates after scaling)
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    
    timeRef.current = timestamp;

    // Calculate visible area in star field coordinate system
    // Stars are positioned from 0 to (documentHeight - heroHeight)
    // Scroll position in star field = scrollY - heroHeight (when scrolled past hero)
    // Ensure we only draw when scrolled past hero
    if (scrollY < currentHeroHeight || currentHeroHeight === 0) {
      // Still in hero section or hero not initialized, don't draw stars but continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const starFieldScrollY = scrollY - currentHeroHeight;
    const visibleStart = starFieldScrollY;
    const visibleEnd = starFieldScrollY + viewportHeight;

    // Draw only stars that are in or near the visible area for performance
    starsRef.current.forEach((star, index) => {
      // Check if star is in visible range (with some buffer)
      if (star.y < visibleStart - 200 || star.y > visibleEnd + 200) {
        return; // Skip stars far from viewport
      }

      // Smooth twinkle using sine wave - more pronounced for dark backgrounds
      const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + index) * 0.5 + 0.5;
      star.opacity = star.baseOpacity * (0.7 + twinkle * 0.3);

      // Calculate position relative to viewport (for fixed positioning)
      const viewportY = star.y - visibleStart;

      // Choose color variant based on star index for variety
      // Mix of golden, white, and blue for beautiful starlight effect
      const variantIndex = index % 5;
      const colorVariant = variantIndex === 0 ? 'blue' : variantIndex === 1 ? 'white' : 'golden';

      // Draw star with glowing effect - optimized for dark backgrounds
      const glowRadius = star.radius * 6;
      const gradient = ctx.createRadialGradient(
        star.x,
        viewportY,
        0,
        star.x,
        viewportY,
        glowRadius
      );
      
      const centerColor = getStarColor(Math.min(star.opacity * 1.1, 1), colorVariant);
      const midColor = getStarColor(star.opacity * 0.6, colorVariant);
      const edgeColor = getStarColor(star.opacity * 0.2, colorVariant);
      const outerColor = getStarColor(0, colorVariant);
      
      gradient.addColorStop(0, centerColor);
      gradient.addColorStop(0.3, midColor);
      gradient.addColorStop(0.6, edgeColor);
      gradient.addColorStop(1, outerColor);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, viewportY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Bright center point - very prominent on dark
      ctx.fillStyle = getStarColor(Math.min(star.opacity * 1.3, 1), colorVariant);
      ctx.beginPath();
      ctx.arc(star.x, viewportY, star.radius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Add a small bright core for extra sparkle
      ctx.fillStyle = getStarColor(Math.min(star.opacity * 1.5, 1), colorVariant);
      ctx.beginPath();
      ctx.arc(star.x, viewportY, star.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw and animate service icons with staggered timing
    serviceIconsRef.current.forEach((icon, index) => {
      // Only animate after delay
      if (timeRef.current < icon.delay * 1000) return;

      // Check if icon is in visible range
      if (icon.y < visibleStart - 200 || icon.y > visibleEnd + 200) {
        return;
      }

      // Slow fade in/out animation - more visible on dark
      icon.opacity += 0.005 * icon.fadeDirection;
      if (icon.opacity <= 0) {
        icon.fadeDirection = 1;
        icon.opacity = 0;
        // Random delay before next appearance
        icon.delay = timeRef.current / 1000 + Math.random() * 8 + 3;
      } else if (icon.opacity >= 0.3) {
        icon.fadeDirection = -1;
        icon.opacity = 0.3;
      }

      if (icon.opacity > 0.01) {
        const viewportY = icon.y - visibleStart;
        ctx.save();
        ctx.globalAlpha = icon.opacity;
        ctx.font = `${22 * icon.scale}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Add bright glow to icons for dark backgrounds
        ctx.shadowColor = getStarColor(0.8, 'golden');
        ctx.shadowBlur = 20;
        ctx.fillText(icon.icon, icon.x, viewportY);
        ctx.restore();
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  /**
   * Handle window resize and scroll
   */
  const handleResize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    updateHeroHeight();
    
    // Canvas matches viewport size (since we handle scroll in animation)
    const width = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const currentHeroHeight = heroHeightRef.current || heroHeight;
    
    // Get full document height for star distribution
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.scrollHeight,
      document.body.offsetHeight,
      viewportHeight
    );
    
    // Canvas size matches viewport (fixed container)
    // Ensure canvas height is always positive
    const canvasHeight = Math.max(viewportHeight - currentHeroHeight, viewportHeight * 0.5);
    const starFieldHeight = Math.max(documentHeight - currentHeroHeight, viewportHeight);

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = width;
    const logicalHeight = Math.max(canvasHeight, 1);
    
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;

    // Scale context for retina displays
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);
    }

    // Initialize stars across full document height (for scroll-through effect)
    if (starFieldHeight > 0 && width > 0) {
      initStars(width, starFieldHeight, 300);
      initServiceIcons(width, starFieldHeight, 12);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup - get hero height first
    updateHeroHeight();
    
    // Function to initialize and start animation
    const initialize = () => {
      // Ensure hero height is set
      if (heroHeightRef.current === 0) {
        updateHeroHeight();
      }
      
      handleResize();
      
      // Start animation loop
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Wait for DOM to settle
    const initTimeout = setTimeout(initialize, 100);
    
    // Also try after a longer delay for images to load
    const delayedInit = setTimeout(initialize, 500);

    // Handle window resize
    const resizeHandler = () => {
      handleResize();
    };
    
    // Handle scroll to update hero height if needed
    const scrollHandler = () => {
      updateHeroHeight();
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", scrollHandler);
    
    // Also update on load to handle dynamic content
    window.addEventListener("load", initialize);
    
    // Use IntersectionObserver to detect when hero is in view for better height calculation
    const heroObserver = new IntersectionObserver(
      () => {
        updateHeroHeight();
        handleResize();
      },
      { threshold: 0 }
    );
    
    const hero = document.querySelector("section.relative.min-h-screen");
    if (hero) {
      heroObserver.observe(hero);
    }

    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      clearTimeout(delayedInit);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("load", initialize);
      heroObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [heroHeight]);

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-0"
      style={{
        top: heroHeight > 0 ? `${heroHeight}px` : 0,
        left: 0,
        width: "100%",
        height: heroHeight > 0 ? `calc(100vh - ${heroHeight}px)` : "100vh",
        opacity: 1, // Full opacity - stars are bright and visible on dark
        zIndex: 0, // Behind all content
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default StarFieldBackground;

