import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-cinema.jpg";

const Hero = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
