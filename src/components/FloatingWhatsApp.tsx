'use client';

import { MessageCircle } from "lucide-react";
import { useState } from "react";

const FloatingWhatsApp = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/918943864943", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 gradient-accent text-accent-foreground rounded-full shadow-glow hover:shadow-xl transition-smooth group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span 
          className={`font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
            isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          Chat with us!
        </span>
      </div>
      
      {/* Notification Dot */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
    </button>
  );
};

export default FloatingWhatsApp;
