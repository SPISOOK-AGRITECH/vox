import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4">VOX Cinemas and Interiors</h3>
            <p className="text-primary-foreground/80 mb-4">
              Elevating living spaces with expert home cinema installations, sophisticated interior design, and smart automation solutions.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-secondary transition-smooth">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <a href="mailto:info@yourcompany.com" className="flex items-center gap-2 hover:text-secondary transition-smooth">
                <Mail className="w-4 h-4" />
                <span>info@yourcompany.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Cinema Street, Entertainment District, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon - Fri: 9:00 AM - 7:00 PM</span>
              </div>
              <div className="ml-6">Saturday: 10:00 AM - 5:00 PM</div>
              <div className="ml-6">Sunday: Closed</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="hover:text-secondary transition-smooth cursor-pointer">Residential Interiors</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Custom Furniture & Carpentry</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Ceiling Design</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Home Automation & Cinema</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Smart Home Solutions</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60">
          <p>© {new Date().getFullYear()} VOX Cinemas and Interiors. All rights reserved. Crafted with precision and passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
