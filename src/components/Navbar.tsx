'use client';

import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const Navbar = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/916238476343", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+916238476343";
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo with glow effect */}
          <div className="flex items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-secondary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/assets/voxnobg.png" 
                alt="VOX Cinemas and Interiors - Premium Home Cinema & Interior Solutions" 
                className="relative h-20 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
          </div>

          {/* Service Tagline - Hidden on mobile */}
          <div className="hidden lg:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2">
            <span className="text-xs text-secondary/90 font-medium tracking-widest uppercase">
              Premium
            </span>
            <span className="text-sm text-primary-foreground/80 font-light">
              Cinema & Interior Solutions
            </span>
          </div>

          {/* CTA Buttons with enhanced styling */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="default"
              onClick={handleCall}
              className="hidden sm:flex items-center gap-2 bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-secondary hover:scale-105 transition-all backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </Button>
            
            <Button 
              variant="hero" 
              size="default"
              onClick={handleWhatsApp}
              className="flex items-center gap-2 shadow-lg hover:shadow-secondary/50 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
