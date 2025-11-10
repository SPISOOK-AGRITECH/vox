import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12" style={{ background: 'linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(0 0% 3%) 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4">VOX Cinemas and Interiors</h3>
            <p className="text-gray-300 mb-4">
              Elevating living spaces with expert home cinema installations, sophisticated interior design, and smart automation solutions.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <a href="tel:+918943864943" className="flex items-center gap-2 hover:text-secondary transition-smooth">
                <Phone className="w-4 h-4" />
                <span>+91 8943864943</span>
              </a>
              <a href="tel:+916238476343" className="flex items-center gap-2 hover:text-secondary transition-smooth">
                <Phone className="w-4 h-4" />
                <span>+91 6238476343</span>
              </a>
              <a href="mailto:voxcinemasinteriors@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-smooth">
                <Mail className="w-4 h-4" />
                <span>voxcinemasinteriors@gmail.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Cochin | Wayanad</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Business Hours</h4>
            <div className="space-y-2 text-gray-300">
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
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-secondary transition-smooth cursor-pointer">Residential Interiors</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Custom Furniture & Carpentry</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Ceiling Design</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Home Automation & Cinema</li>
              <li className="hover:text-secondary transition-smooth cursor-pointer">Smart Home Solutions</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} VOX Cinemas and Interiors. All rights reserved. Crafted with precision and passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
