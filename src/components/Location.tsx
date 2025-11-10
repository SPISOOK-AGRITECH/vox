import { MapPin } from "lucide-react";

/**
 * Location component displaying Google Maps embed and address information
 * Provides visitors with location details and an interactive map
 */
const Location = () => {
  return (
    <section id="location" className="py-20 lg:py-32 relative" style={{ background: 'linear-gradient(135deg, hsl(0 0% 8% / 0.92) 0%, hsl(0 0% 5% / 0.95) 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Visit Our Location
          </h2>
          <p className="text-lg text-gray-300">
            Come see us or get directions to our studio
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Map Container */}
            <div className="animate-fade-in">
              <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-card border border-border/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3907.1975435745817!2d76.13902707505544!3d11.68040798852872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDQwJzQ5LjUiTiA3NsKwMDgnMjkuOCJF!5e0!3m2!1sen!2sin!4v1762706258125!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Stellar Homes Studio Location"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Address and Contact Info */}
            <div className="flex flex-col justify-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Our Address
                    </h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Stellar Homes Studio
                    <br />
                    Calicut, Kerala, India
                    <br />
                    Pin: 673001
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Business Hours
                  </h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=11.68040798852872,76.13902707505544"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-accent-foreground rounded-lg font-medium hover:bg-secondary/90 transition-smooth shadow-glow"
                  >
                    <MapPin className="w-5 h-5" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

