'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Home, Sofa, Layers, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const services = [
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
  },
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
  }
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [service.images.length, isPaused]);

  const handleDotClick = (dotIndex: number) => {
    setCurrentImageIndex(dotIndex);
    setIsPaused(true);
    // Resume auto-play after 5 seconds of user interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <Card 
      className="overflow-hidden group hover:shadow-card transition-smooth cursor-pointer border-gray-800/50 bg-black/40 backdrop-blur-sm animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Stack Container */}
      <div className="relative h-80 overflow-hidden">
        {/* Stacked Images */}
        <div className="relative w-full h-full">
          {service.images.map((image, imgIndex) => (
            <div
              key={imgIndex}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${(imgIndex - currentImageIndex) * 12}px) scale(${1 - Math.abs(imgIndex - currentImageIndex) * 0.05})`,
                zIndex: service.images.length - Math.abs(imgIndex - currentImageIndex),
                opacity: Math.abs(imgIndex - currentImageIndex) > 1 ? 0 : 1,
                filter: imgIndex !== currentImageIndex ? 'brightness(0.7)' : 'brightness(1)',
              }}
            >
              <img 
                src={image} 
                alt={`${service.title} - Image ${imgIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
          ))}
        </div>
        
        {/* Icon */}
        {/* <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-glow z-10">
          <service.icon className="w-6 h-6 text-accent-foreground" />
        </div> */}

        {/* Vertical Carousel Dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          {service.images.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => handleDotClick(dotIndex)}
              className="group/dot relative"
              aria-label={`View image ${dotIndex + 1}`}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  dotIndex === currentImageIndex 
                    ? 'bg-secondary scale-125 shadow-glow' 
                    : 'bg-white/40 hover:bg-white/60 group-hover/dot:scale-110'
                }`}
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
