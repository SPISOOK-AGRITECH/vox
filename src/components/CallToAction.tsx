import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";

const CallToAction = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  const handleEmail = () => {
    window.location.href = "mailto:info@yourcompany.com";
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="gradient-hero rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-card animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together. Get in touch today for a free consultation.
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 border-t border-primary-foreground/20">
              <a 
                href="tel:+1234567890"
                className="flex items-center gap-2 text-primary-foreground/90 hover:text-secondary transition-smooth"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <a 
                href="mailto:info@yourcompany.com"
                className="flex items-center gap-2 text-primary-foreground/90 hover:text-secondary transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>info@yourcompany.com</span>
              </a>
            </div>
          </div>

          {/* Guarantee Section */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-2xl font-bold text-secondary mb-2">Free Consultation</div>
              <p className="text-muted-foreground">No obligation, expert advice</p>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold text-secondary mb-2">Custom Solutions</div>
              <p className="text-muted-foreground">Tailored to your needs</p>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold text-secondary mb-2">Quality Guarantee</div>
              <p className="text-muted-foreground">100% satisfaction assured</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
