'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Home, Sofa, Layers, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const services = [
  {
    icon: Settings,
    title: "Home Automation & Cinema",
    description: "Smart home integration with luxury home theater setups, acoustic paneling, projector systems, and AV installations for an immersive experience.",
    images: [
      "/assets/service-automation-1.jpg",
      "/assets/service-automation-2.jpg",
      "/assets/service-automation-3.jpg",
      "/assets/service-automation-4.jpg",
      "/assets/service-automation-5.jpg",
      "/assets/service-automation-6.jpg",
    ],
    features: ["Smart Home Systems", "Home Theater Setup", "AV Installation", "Acoustic Paneling"]
  },
  {
    icon: Home,
    title: "Residential Interiors",
    description: "Complete interior design solutions for your home including living rooms, bedrooms, modular kitchens, and dining areas with expert space planning and material selection.",
    images: [
      "/assets/service-residential.jpg",
      "/assets/service-residential-2.jpg",
      "/assets/service-residential-3.jpg",
    ],
    features: ["Living Room Design", "Modular Kitchens", "Bedroom Interiors", "Space Planning"]
  },
  {
    icon: Sofa,
    title: "Custom Furniture & Carpentry",
    description: "Bespoke furniture solutions including wardrobes, TV units, beds, sofas, and dining sets crafted with precision and quality materials.",
    images: [
      "/assets/service-furniture.jpg",
      "/assets/service-furniture-2.jpg",
      "/assets/service-furniture-3.jpg",
    ],
    features: ["Wardrobes & Storage", "TV Units & Panels", "Custom Furniture", "False Ceilings"]
  },
  {
    icon: Layers,
    title: "Ceiling Design",
    description: "Sophisticated ceiling solutions including gypsum, grid, wooden, and acoustic ceilings that add elegance and functionality to your spaces.",
    images: [
      "/assets/service-ceiling.jpg",
      "/assets/service-ceiling-2.jpg",
      "/assets/service-ceiling-3.jpg",
    ],
    features: ["Gypsum Ceilings", "Grid Ceilings", "Wooden Ceilings", "Acoustic Solutions"]
  }
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])); // Preload first image
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Preload all images for this service when it becomes visible
            service.images.forEach((imagePath, imgIndex) => {
              setLoadedImages((prev) => {
                // Skip if already loaded or loading
                if (prev.has(imgIndex)) return prev;
                
                // Start loading the image
                const img = new Image();
                img.src = imagePath;
                img.loading = 'lazy';
                img.onload = () => {
                  setLoadedImages((current) => new Set([...current, imgIndex]));
                };
                
                return prev;
              });
            });
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [service.images]);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [service.images.length, isPaused, isVisible]);

  const handleDotClick = (dotIndex: number) => {
    setCurrentImageIndex(dotIndex);
    setIsPaused(true);
    // Resume auto-play after 5 seconds of user interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <Card 
      ref={cardRef}
      className="overflow-hidden group hover:shadow-card transition-smooth cursor-pointer border-gray-800/50 bg-black/40 backdrop-blur-sm animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Stack Container */}
      <div className="relative h-80 overflow-hidden rounded-t-lg">
        {/* Stacked Images with Smooth Transitions */}
        <div className="relative w-full h-full">
          {service.images.map((image, imgIndex) => {
            const distance = Math.abs(imgIndex - currentImageIndex);
            const isActive = imgIndex === currentImageIndex;
            const isNext = imgIndex === currentImageIndex + 1 || (currentImageIndex === service.images.length - 1 && imgIndex === 0);
            const isPrev = imgIndex === currentImageIndex - 1 || (currentImageIndex === 0 && imgIndex === service.images.length - 1);
            const shouldLoad = loadedImages.has(imgIndex) || isActive || isNext || isPrev;
            
            return (
              <div
                key={imgIndex}
                className="absolute inset-0 transition-all duration-700 ease-in-out rounded-t-lg overflow-hidden"
                style={{
                  transform: isActive 
                    ? 'translateY(0) scale(1)' 
                    : isNext 
                      ? 'translateY(8px) scale(0.98)' 
                      : isPrev
                        ? 'translateY(-4px) scale(0.96)'
                        : `translateY(${distance > 1 ? 12 : 8}px) scale(${Math.max(0.92, 1 - distance * 0.04)})`,
                  zIndex: service.images.length - distance,
                  opacity: distance > 2 ? 0 : distance === 0 ? 1 : distance === 1 ? 0.4 : 0.2,
                  filter: isActive 
                    ? 'brightness(1) blur(0px)' 
                    : `brightness(${0.6 - distance * 0.1}) blur(${distance * 0.5}px)`,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {shouldLoad ? (
                  <img 
                    src={image} 
                    alt={`${service.title} - Image ${imgIndex + 1}`}
                    loading={imgIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={imgIndex === 0 && index < 2 ? 'high' : 'auto'}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${
                      isActive ? 'group-hover:scale-105' : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900/50 animate-pulse" />
                )}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-700"
                  style={{
                    opacity: isActive ? 1 : 0.8,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Vertical Carousel Dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
          {service.images.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => handleDotClick(dotIndex)}
              className="group/dot relative transition-all duration-200"
              aria-label={`View image ${dotIndex + 1}`}
            >
              <div 
                className={`transition-all duration-500 ease-in-out rounded-full ${
                  dotIndex === currentImageIndex 
                    ? 'w-2.5 h-8 bg-secondary shadow-lg shadow-secondary/50' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60 group-hover/dot:scale-125'
                }`}
                style={{
                  boxShadow: dotIndex === currentImageIndex 
                    ? '0 0 8px rgba(255, 215, 0, 0.6)' 
                    : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">
          {service.title}
        </h3>
        <p className="text-gray-300 mb-4">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-visible" style={{ background: 'linear-gradient(135deg, hsl(0 0% 8% / 0.92) 0%, hsl(0 0% 5% / 0.95) 100%)' }}>
      {/* Golden Light Overlay from Hero Section */}
      <div 
        className="absolute -top-32 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at center top, rgba(255, 215, 0, 0.12) 0%, rgba(255, 215, 0, 0.06) 30%, rgba(255, 215, 0, 0.02) 60%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg text-gray-300">
            Delivering excellence in every project with meticulous attention to detail and uncompromising quality
          </p>
        </div>

        {/* Services Grid - 2 per row for larger visibility */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
