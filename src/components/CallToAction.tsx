'use client';

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";

const CallToAction = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/916238476343", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+916238476343";
  };

  return (
    <section className="py-20 lg:py-32 relative" style={{ background: 'linear-gradient(135deg, hsl(0 0% 8% / 0.92) 0%, hsl(0 0% 5% / 0.95) 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-card animate-fade-in border border-gray-800/50">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your vision and create something extraordinary together. Get in touch today for a free consultation.
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
                className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 border-t border-gray-700/50">
              <a 
                href="tel:+916238476343"
                className="flex items-center gap-2 text-gray-200 hover:text-secondary transition-smooth"
              >
                <Phone className="w-4 h-4" />
                <span>+91 6238 476 343</span>
              </a>
              <a 
                href="mailto:info@yourcompany.com"
                className="flex items-center gap-2 text-gray-200 hover:text-secondary transition-smooth"
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
              <p className="text-gray-400">No obligation, expert advice</p>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold text-secondary mb-2">Custom Solutions</div>
              <p className="text-gray-400">Tailored to your needs</p>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold text-secondary mb-2">Quality Guarantee</div>
              <p className="text-gray-400">100% satisfaction assured</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
