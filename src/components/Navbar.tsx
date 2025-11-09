import logo from "@/assets/vox-logo.jpeg";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const Navbar = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="VOX Cinemas and Interiors" 
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="default"
              onClick={handleCall}
              className="hidden sm:flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </Button>
            
            <Button 
              variant="hero" 
              size="default"
              onClick={handleWhatsApp}
              className="flex items-center gap-2"
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
