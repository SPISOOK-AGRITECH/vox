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
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="VOX Cinemas and Interiors" 
              className="h-12 w-auto"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCall}
              className="hidden sm:flex"
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
            
            <Button 
              variant="hero" 
              size="sm"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
